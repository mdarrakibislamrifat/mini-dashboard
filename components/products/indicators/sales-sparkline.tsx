import { LineChart, Line, ResponsiveContainer } from "recharts";

interface SalesSparklineProps {
  data: number[];
}

export function SalesSparkline({ data }: SalesSparklineProps) {
  const chartData = data.map((value, index) => ({
    index,
    value,
  }));

  return (
    <div className="h-10 w-32">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={chartData}>
          <Line
            type="monotone"
            dataKey="value"
            stroke="hsl(var(--color-chart-1))"
            dot={false}
            strokeWidth={2}
            isAnimationActive={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
