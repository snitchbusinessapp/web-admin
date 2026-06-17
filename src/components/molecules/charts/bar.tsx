import { useRef, useState } from "react";
import {
  Bar,
  BarChart as BarChartRechart,
  CartesianGrid,
  Rectangle,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { formatThousands } from "../../../lib/helpers/format-number";
import { CartesianLayout } from "recharts/types/util/types";

interface ChartDataPoint {
  label: string;
  value: number;
}

interface ChartTooltipProps {
  active?: boolean;
  payload?: { payload: ChartDataPoint }[];
  coordinate?: { x: number; y: number };
}

interface BarLayout {
  x: number;
  y: number;
  width: number;
}

interface BarShapeProps {
  x?: number;
  y?: number;
  width?: number;
  height?: number;
  index?: number;
  originalDataIndex?: number;
}

interface ChartMouseState {
  isTooltipActive?: boolean;
  activeTooltipIndex?: number | string | null;
}

const ChartTooltip = ({ active, payload, coordinate }: ChartTooltipProps) => {
  if (!active || !payload?.length || !coordinate) return null;

  const { label } = payload[0].payload;
  return (
    <div
      className="pointer-events-none flex flex-col items-center"
      style={{ transform: "translate(-50%, calc(-100% - 6px))" }}
    >
      <div className="rounded-md bg-surface-container-inverse p-s8 text-sm font-normal leading-normal text-surface-on-surface-inverse whitespace-nowrap">
        {label}
      </div>
      <div
        className="h-0 w-0 border-x-[6px] border-x-transparent border-t-[6px] border-t-surface-container-inverse"
        aria-hidden
      />
    </div>
  );
};

const cacheBarLayout = (
  layouts: Map<number, BarLayout>,
  props: BarShapeProps,
) => {
  const dataIndex = props.originalDataIndex ?? props.index;
  if (
    dataIndex == null ||
    props.x == null ||
    props.y == null ||
    props.width == null
  ) {
    return;
  }

  layouts.set(Number(dataIndex), {
    x: props.x,
    y: props.y,
    width: props.width,
  });
};

const getBarCenterFromLayout = (
  layouts: Map<number, BarLayout>,
  activeIndex: number | string,
): { x: number; y: number } | null => {
  const layout = layouts.get(Number(activeIndex));
  if (!layout) return null;

  return { x: layout.x + layout.width / 2, y: layout.y };
};
const estimateTextWidth = (text: string, fontSize = 12) =>
  Math.ceil(text.length * fontSize * 0.6) + 8;

const getCategoryAxisWidths = (data: ChartDataPoint[]) => ({
  left: Math.max(...data.map((point) => estimateTextWidth(point.label)), 40),
  right: Math.max(
    ...data.map((point) => estimateTextWidth(formatThousands(point.value))),
    32,
  ),
});

const getValueAxisConfig = (
  data: ChartDataPoint[],
  domain?: number[],
  ticks?: number[],
) => {
  if (domain && ticks) {
    return { domain, ticks };
  }

  const maxValue = Math.max(...data.map((point) => point.value), 0);
  const ceiling = Math.ceil(maxValue / 100) * 100 || 100;
  const step = ceiling / 5;

  return {
    domain: [0, ceiling],
    ticks: Array.from({ length: 6 }, (_, index) => index * step),
  };
};

export const BarChart = ({
  data,
  domain,
  ticks,
  layout = "horizontal",
  radius,
  width,
  activeBarColor = "--color-primary",
  barColor = "--primary-30",
  showYValueAxis,
  showCartesianGrid = true,
  trackBarColor = "--surface-container-subtle",
  showTrackBar = false,
}: {
  data: ChartDataPoint[];
  domain?: number[];
  ticks?: number[];
  layout?: CartesianLayout;
  radius?: [number, number, number, number];
  width?: number;
  activeBarColor?: string;
  barColor?: string;
  showYValueAxis?: boolean;
  showCartesianGrid?: boolean;
  trackBarColor?: string;
  showTrackBar?: boolean;
}) => {
  const barLayoutsRef = useRef<Map<number, BarLayout>>(new Map());
  const [barGraphPosition, setBarGraphPosition] = useState<{
    x: number;
    y: number;
  } | null>(null);
  const isVertical = layout === "vertical";
  const valueAxis = getValueAxisConfig(data, domain, ticks);
  const categoryAxisWidths = isVertical ? getCategoryAxisWidths(data) : null;
  const barRadius = radius ?? (isVertical ? [4, 4, 4, 4] : [4, 4, 0, 0]);
  const barThickness = width ?? (isVertical ? 8 : undefined);

  const renderBarShape = (props: BarShapeProps) => {
    cacheBarLayout(barLayoutsRef.current, props);
    return <Rectangle {...props} />;
  };

  const handleMouseMove = (state: ChartMouseState | null) => {
    if (!state?.isTooltipActive || state.activeTooltipIndex == null) {
      return;
    }
    const position = getBarCenterFromLayout(
      barLayoutsRef.current,
      state.activeTooltipIndex,
    );
    if (position) {
      setBarGraphPosition(position);
    }
  };

  const valueAxisProps = {
    domain: valueAxis.domain,
    ticks: valueAxis.ticks,
    tickFormatter: (value: number) => formatThousands(value),
    axisLine: false,
    tickLine: false,
    tick: { fill: "var(--color-surface-on-surface-subtle)", fontSize: 12 },
  };

  return (
    <BarChartRechart
      style={{ width: "100%", height: "100%" }}
      responsive
      data={data}
      margin={{
        top: 0,
        right: 0,
        left: 0,
        bottom: 0,
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setBarGraphPosition(null)}
      layout={layout}
    >
      {showCartesianGrid && (
        <CartesianGrid
          strokeDasharray="4 4"
          vertical={isVertical}
          horizontal={!isVertical}
          className="stroke-border"
        />
      )}
      {isVertical ? (
        <>
          <XAxis type="number" {...valueAxisProps} height={32} hide />
          <YAxis
            yAxisId="category"
            dataKey="label"
            type="category"
            axisLine={false}
            tickLine={false}
            width={categoryAxisWidths?.left}
            tick={{
              fill: "var(--color-surface-on-surface-subtle)",
              fontSize: 12,
            }}
          />
          {showYValueAxis && (
            <YAxis
              yAxisId="value"
              orientation="right"
              dataKey="label"
              type="category"
              axisLine={false}
              tickLine={false}
              width={categoryAxisWidths?.right}
              interval={0}
              tickFormatter={(_, index) =>
                formatThousands(data[index]?.value ?? 0)
              }
              tick={{
                fill: "var(--color-surface-on-surface-subtle)",
                fontSize: 12,
              }}
            />
          )}
        </>
      ) : (
        <>
          <XAxis dataKey="label" hide />
          <YAxis {...valueAxisProps} width={48} />
        </>
      )}
      <Tooltip
        content={<ChartTooltip />}
        axisId={isVertical ? "category" : undefined}
        cursor={{ fill: "transparent" }}
        wrapperStyle={{ outline: "none", zIndex: 10 }}
        position={
          barGraphPosition
            ? {
                x: barGraphPosition.x,
                y: barGraphPosition.y,
              }
            : undefined
        }
        contentStyle={{
          background: "transparent",
          border: "none",
          padding: 0,
          boxShadow: "none",
        }}
      />
      <Bar
        yAxisId={isVertical ? "category" : undefined}
        dataKey="value"
        radius={barRadius}
        fill={`var(${barColor})`}
        shape={renderBarShape}
        barSize={barThickness}
        maxBarSize={isVertical ? barThickness : undefined}
        background={
          showTrackBar && trackBarColor
            ? {
                fill: `var(${trackBarColor})`,
                radius: barRadius[0],
              }
            : undefined
        }
        activeBar={{
          fill: `var(${activeBarColor})`,
        }}
      />
    </BarChartRechart>
  );
};

export default BarChart;
