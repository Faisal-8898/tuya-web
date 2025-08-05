"use client";

import { TrendingUp } from "lucide-react";
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

export const description = "A linear area chart";

const chartData = [
  { day: "Wed", taka: 1500 },
  { day: "Thu", taka: 1600 },
  { day: "Fri", taka: 1700 },
  { day: "Sat", taka: 1800 },
  { day: "Sun", taka: 1900 },
  { day: "Mon", taka: 1100 },
  { day: "Tue", taka: 1200 },
];

const chartConfig = {
  taka: {
    label: "Taka",
    color: "var(--chart-1)",
  },
};

export function UnitMoneyChart() {
    return (
        <Card className="w-[600px] h-[420px] p-3 pt-5 flex">
      <CardHeader>
        <CardTitle>Electricity Cost</CardTitle>
        <CardDescription>
          Showing total electricity cost for the last 6 days
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
              content={<ChartTooltipContent indicator="dot" hideLabel />}
            />
            <Area
              dataKey="taka"
              type="linear"
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
