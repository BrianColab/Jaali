import type { TrafficPoint } from "@/types/analytics";

type TrafficChartProps = Readonly<{
  points: readonly TrafficPoint[];
}>;

const CHART_WIDTH = 640;
const CHART_HEIGHT = 240;
const PADDING_X = 8;
const PADDING_TOP = 16;
const PADDING_BOTTOM = 28;
const USABLE_WIDTH = CHART_WIDTH - PADDING_X * 2;
const USABLE_HEIGHT = CHART_HEIGHT - PADDING_TOP - PADDING_BOTTOM;

function xFor(index: number, count: number): number {
  if (count <= 1) return PADDING_X;
  return PADDING_X + (USABLE_WIDTH / (count - 1)) * index;
}

function yFor(value: number, max: number): number {
  if (max === 0) return PADDING_TOP + USABLE_HEIGHT;
  return PADDING_TOP + USABLE_HEIGHT - (value / max) * USABLE_HEIGHT;
}

function buildPath(values: readonly number[], max: number): string {
  return values
    .map((value, index) => {
      const command = index === 0 ? "M" : "L";
      return `${command}${xFor(index, values.length).toFixed(2)},${yFor(value, max).toFixed(2)}`;
    })
    .join(" ");
}

export function TrafficChart({ points }: TrafficChartProps) {
  if (points.length === 0) {
    return (
      <p className="analytics-chart__empty">No traffic data for this period.</p>
    );
  }

  const visitorValues = points.map((point) => point.visitors);
  const pageViewValues = points.map((point) => point.pageViews);
  const max = Math.max(1, ...visitorValues, ...pageViewValues);
  const labelStep = Math.max(1, Math.ceil(points.length / 6));

  return (
    <div className="analytics-chart">
      <svg
        viewBox={`0 0 ${CHART_WIDTH} ${CHART_HEIGHT}`}
        role="img"
        aria-label="Visitors and page views over the selected period"
        className="analytics-chart__svg"
        preserveAspectRatio="none"
      >
        <path
          d={buildPath(pageViewValues, max)}
          className="analytics-chart__line analytics-chart__line--pageviews"
        />
        <path
          d={buildPath(visitorValues, max)}
          className="analytics-chart__line analytics-chart__line--visitors"
        />
        {points.map((point, index) => (
          <circle
            key={`point-${point.label}-${index}`}
            cx={xFor(index, points.length)}
            cy={yFor(point.visitors, max)}
            r={2.5}
            className="analytics-chart__dot"
          >
            <title>{`${point.label}: ${point.visitors} visitors, ${point.pageViews} page views`}</title>
          </circle>
        ))}
        {points.map((point, index) => {
          const isLast = index === points.length - 1;
          if (index % labelStep !== 0 && !isLast) return null;
          return (
            <text
              key={`label-${point.label}-${index}`}
              x={xFor(index, points.length)}
              y={CHART_HEIGHT - 6}
              className="analytics-chart__axis-label"
              textAnchor={isLast ? "end" : index === 0 ? "start" : "middle"}
            >
              {point.label}
            </text>
          );
        })}
      </svg>
      <div className="analytics-chart__legend">
        <span className="analytics-chart__legend-item analytics-chart__legend-item--visitors">
          Visitors
        </span>
        <span className="analytics-chart__legend-item analytics-chart__legend-item--pageviews">
          Page views
        </span>
      </div>
    </div>
  );
}
