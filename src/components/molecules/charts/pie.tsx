import { Legend, Pie, PieChart as PieChartRechart } from "recharts";
interface ChartDataPoint {
  name: string;
  value: number;
  fill: string;
}
const PieChart = ({ data }: { data: ChartDataPoint[] }) => {
  return (
    <PieChartRechart
      style={{
        width: "100%",
        height: 250,
        aspectRatio: 1,
      }}
      responsive
    >
      <Pie
        data={data}
        innerRadius="65%"
        outerRadius="100%"
        cornerRadius="15%"
        fill="#8884d8"
        paddingAngle={5}
        dataKey="value"
      />
      <Legend
        layout="vertical"
        align="right"
        verticalAlign="bottom"
        iconType="circle"
        iconSize={10}
        wrapperStyle={{ fontSize: 14, lineHeight: "24px" }}
      />
    </PieChartRechart>
  );
};

export default PieChart;
