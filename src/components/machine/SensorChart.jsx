import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Line,
  Legend,
} from "recharts";

export default function SensorChart({
  title,
  description,
  icon: Icon,
  data,
  dataKey,
  color,
  unit,
}) {
  const gradientId = `gradient-${title.replace(/\s+/g, "")}`;

  return (
    <Card className="bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-slate-900 dark:text-slate-100">
          <Icon className={`w-5 h-5 ${color.text}`} />
          {title}
        </CardTitle>
        <CardDescription className="text-slate-600 dark:text-slate-400">
          {description}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={250}>
          <AreaChart data={data}>
            <defs>
              <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={color.hex} stopOpacity={0.3} />
                <stop offset="95%" stopColor={color.hex} stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="#334155"
              opacity={0.1}
            />
            <XAxis
              dataKey="time"
              stroke="#94a3b8"
              tick={{ fill: "#94a3b8", fontSize: 12 }}
            />
            <YAxis stroke="#94a3b8" tick={{ fill: "#94a3b8", fontSize: 12 }} />
            <Tooltip
              contentStyle={{
                backgroundColor: "#1e293b",
                border: "1px solid #334155",
                borderRadius: "8px",
                color: "#f1f5f9",
              }}
            />
            <Line
              type="monotone"
              dataKey="threshold"
              stroke="#ef4444"
              strokeDasharray="5 5"
              strokeWidth={2}
              dot={false}
              name="Threshold"
            />
            <Area
              type="monotone"
              dataKey="value"
              stroke={color.hex}
              strokeWidth={2}
              fill={`url(#${gradientId})`}
              name={`${unit}`}
            />
            <Legend />
          </AreaChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
