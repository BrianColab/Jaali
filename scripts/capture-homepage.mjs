import { spawn } from "node:child_process";
import { mkdir, mkdtemp, readdir, rm, writeFile } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";

const projectRoot = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  "..",
);
const outputRoot = path.join(projectRoot, "artifacts", "homepage-screenshots");
const routeArgument = process.argv.find((argument) =>
  argument.startsWith("--route="),
);
const nameArgument = process.argv.find((argument) =>
  argument.startsWith("--name="),
);
const captureRoute = routeArgument?.slice("--route=".length) || "/";
const captureName = (nameArgument?.slice("--name=".length) || "homepage")
  .toLowerCase()
  .replaceAll(/[^a-z0-9-]/g, "-");
const edgePath =
  "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe";
const debuggingPort = 9223;
const systemTempRoot = path.resolve(os.tmpdir());
await removeStaleProfiles();
const profileRoot = await mkdtemp(path.join(systemTempRoot, "jaali-edge-"));
if (
  !path
    .resolve(profileRoot)
    .startsWith(`${systemTempRoot}${path.sep}jaali-edge-`)
) {
  throw new Error(`Refusing to use unexpected browser profile: ${profileRoot}`);
}
const viewports = [
  { height: 900, mobile: false, name: "desktop", width: 1440 },
  { height: 768, mobile: false, name: "tablet", width: 1024 },
  { height: 844, mobile: true, name: "mobile", width: 390 },
];

function wait(milliseconds) {
  return new Promise((resolve) => setTimeout(resolve, milliseconds));
}

async function removeDirectory(directory) {
  const resolvedDirectory = path.resolve(directory);
  if (
    !resolvedDirectory.startsWith(`${systemTempRoot}${path.sep}jaali-edge-`)
  ) {
    throw new Error(`Refusing to remove unexpected path: ${resolvedDirectory}`);
  }

  for (let attempt = 0; attempt < 20; attempt += 1) {
    try {
      await rm(resolvedDirectory, { force: true, recursive: true });
      return;
    } catch (error) {
      if (error.code !== "EBUSY" || attempt === 19) throw error;
      await wait(250);
    }
  }
}

async function removeStaleProfiles() {
  const entries = await readdir(systemTempRoot, { withFileTypes: true });
  const staleProfiles = entries.filter(
    (entry) =>
      entry.isDirectory() && /^jaali-edge-[a-zA-Z0-9]+$/.test(entry.name),
  );

  for (const profile of staleProfiles) {
    await removeDirectory(path.join(systemTempRoot, profile.name));
  }
}

async function waitForEdge() {
  for (let attempt = 0; attempt < 40; attempt += 1) {
    try {
      const response = await fetch(
        `http://127.0.0.1:${debuggingPort}/json/version`,
      );
      if (response.ok) return;
    } catch {
      // Edge is still starting.
    }
    await wait(250);
  }

  throw new Error("Edge remote debugging did not become ready.");
}

async function openPage(url) {
  const response = await fetch(
    `http://127.0.0.1:${debuggingPort}/json/new?${encodeURIComponent(url)}`,
    { method: "PUT" },
  );

  if (!response.ok) {
    throw new Error(`Unable to open capture page: ${response.status}`);
  }

  return response.json();
}

async function capture(viewport) {
  const page = await openPage("about:blank");
  const socket = new WebSocket(page.webSocketDebuggerUrl);
  const pending = new Map();
  let commandId = 0;

  socket.addEventListener("message", (event) => {
    const message = JSON.parse(event.data);
    if (!message.id) return;

    const request = pending.get(message.id);
    if (!request) return;

    pending.delete(message.id);
    if (message.error) request.reject(new Error(message.error.message));
    else request.resolve(message.result);
  });

  await new Promise((resolve, reject) => {
    socket.addEventListener("open", resolve, { once: true });
    socket.addEventListener("error", reject, { once: true });
  });

  function send(method, params = {}) {
    commandId += 1;
    return new Promise((resolve, reject) => {
      pending.set(commandId, { reject, resolve });
      socket.send(JSON.stringify({ id: commandId, method, params }));
    });
  }

  try {
    await send("Page.enable");
    await send("Runtime.enable");
    await send("Emulation.setDeviceMetricsOverride", {
      deviceScaleFactor: 1,
      height: viewport.height,
      mobile: viewport.mobile,
      width: viewport.width,
    });
    await send("Emulation.setEmulatedMedia", {
      features: [{ name: "prefers-reduced-motion", value: "reduce" }],
    });
    await send("Page.navigate", {
      url: new URL(captureRoute, "http://127.0.0.1:3210").href,
    });
    await send("Runtime.evaluate", {
      awaitPromise: true,
      expression: `new Promise((resolve) => {
        const ready = async () => {
          await document.fonts.ready;
          const motionOverride = document.createElement("style");
          motionOverride.textContent = ".motion-reveal{opacity:1!important;transform:none!important}";
          document.head.append(motionOverride);
          for (let y = 0; y < document.documentElement.scrollHeight; y += window.innerHeight) {
            window.scrollTo(0, y);
            await new Promise((done) => setTimeout(done, 80));
          }
          window.scrollTo(0, 0);
          await new Promise((done) => setTimeout(done, 250));
          await Promise.race([
            Promise.all(Array.from(document.images, (image) => image.complete
              ? Promise.resolve()
              : new Promise((done) => {
                  image.addEventListener("load", done, { once: true });
                  image.addEventListener("error", done, { once: true });
                }))),
            new Promise((done) => setTimeout(done, 5000))
          ]);
          resolve();
        };
        if (document.readyState === "complete") ready();
        else window.addEventListener("load", ready, { once: true });
      })`,
    });

    const { contentSize } = await send("Page.getLayoutMetrics");
    const screenshot = await send("Page.captureScreenshot", {
      captureBeyondViewport: true,
      clip: {
        height: Math.ceil(contentSize.height),
        scale: 1,
        width: Math.ceil(contentSize.width),
        x: 0,
        y: 0,
      },
      format: "png",
      fromSurface: true,
    });

    await writeFile(
      path.join(outputRoot, `${captureName}-${viewport.name}.png`),
      Buffer.from(screenshot.data, "base64"),
    );
  } finally {
    socket.close();
    await fetch(`http://127.0.0.1:${debuggingPort}/json/close/${page.id}`);
  }
}

await mkdir(outputRoot, { recursive: true });
const edge = spawn(
  edgePath,
  [
    "--headless=new",
    `--remote-debugging-port=${debuggingPort}`,
    `--user-data-dir=${profileRoot}`,
    "--disable-extensions",
    "--hide-scrollbars",
    "--no-first-run",
    "about:blank",
  ],
  { stdio: "ignore", windowsHide: true },
);

try {
  await waitForEdge();
  for (const viewport of viewports) await capture(viewport);
  console.log(
    `Captured ${viewports.length} ${captureName} screenshots in ${outputRoot}.`,
  );
} finally {
  edge.kill();
  await removeDirectory(profileRoot);
}
