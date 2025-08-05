"use client";

import { Activity, TrendingUp } from "lucide-react";
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

export const description = "A step area chart";

const chartData = [
  { day: "Wed", unit: 1500 },
  { day: "Thu", unit: 1600 },
  { day: "Fri", unit: 1700 },
  { day: "Sat", unit: 1800 },
  { day: "Sun", unit: 1900 },
  { day: "Mon", unit: 1100 },
  { day: "Tue", unit: 1200 },
];

const chartConfig = {
  unit: {
    label: "Unit",
    color: "var(--chart-1)",
    icon: Activity,
  },
};

export function UnitkwhChart() {
  return (
    <Card className="w-[600px] h-[420px] p-3 pt-5 flex-col">
      <CardHeader>
        <CardTitle>Area Chart - Step</CardTitle>
        <CardDescription>
          Showing total visitors for the last 6 months
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <AreaChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="day"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Area
              dataKey="unit"
              type="step"
              fill="black"
              fillOpacity={0.4}
              stroke="black"
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
