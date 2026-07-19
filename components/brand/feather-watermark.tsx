export function FeatherWatermark() {
  return (
    <span className="feather-watermark" aria-hidden="true">
      <svg
        className="feather-watermark__art"
        viewBox="0 0 1200 420"
        preserveAspectRatio="xMaxYMid slice"
        role="presentation"
        focusable="false"
      >
        <defs>
          <symbol id="jf-feather" viewBox="0 0 90 260">
            <g fill="none" stroke="currentColor" strokeLinecap="round">
              <path strokeWidth="3" d="M45 8 C 52 70, 52 150, 44 250" />
              <g strokeWidth="2">
                <path d="M47 40 C 34 36, 24 44, 18 60" />
                <path d="M47 68 C 32 64, 21 74, 15 92" />
                <path d="M48 98 C 32 94, 20 106, 15 126" />
                <path d="M48 128 C 33 125, 22 138, 17 160" />
                <path d="M47 160 C 34 158, 25 170, 21 192" />
                <path d="M46 192 C 35 191, 28 202, 25 222" />
                <path d="M49 40 C 62 36, 72 44, 78 60" />
                <path d="M49 68 C 64 64, 75 74, 81 92" />
                <path d="M48 98 C 64 94, 76 106, 81 126" />
                <path d="M48 128 C 63 125, 74 138, 79 160" />
                <path d="M49 160 C 62 158, 71 170, 75 192" />
                <path d="M50 192 C 61 191, 68 202, 71 222" />
              </g>
            </g>
          </symbol>

          <symbol id="jf-dreamcatcher" viewBox="0 0 200 340">
            <g fill="none" stroke="currentColor" strokeLinecap="round">
              <circle cx="100" cy="100" r="90" strokeWidth="3" />
              <circle cx="100" cy="100" r="72" strokeWidth="1.4" />
              <path
                strokeWidth="1.2"
                d="M100 28 L150 66 L168 126 L128 172 L72 172 L32 126 L50 66 Z"
              />
              <path strokeWidth="1.2" d="M100 58 L130 90 L118 132 L82 132 L70 90 Z" />
              <circle cx="100" cy="100" r="7" strokeWidth="1.4" />
              <path
                strokeWidth="1.4"
                d="M62 184 L60 232 M100 190 L100 250 M138 184 L140 232"
              />
            </g>
            <use href="#jf-feather" x="44" y="226" width="34" height="98" />
            <use href="#jf-feather" x="83" y="244" width="34" height="98" />
            <use href="#jf-feather" x="122" y="226" width="34" height="98" />
          </symbol>
        </defs>

        <g>
          <use href="#jf-dreamcatcher" x="836" y="-8" width="264" height="449" />
          <use
            href="#jf-feather"
            x="1058"
            y="36"
            width="128"
            height="370"
            transform="rotate(16 1122 221)"
          />
          <use
            href="#jf-feather"
            x="742"
            y="150"
            width="96"
            height="277"
            transform="rotate(-12 790 288)"
          />
        </g>
      </svg>
    </span>
  );
}
