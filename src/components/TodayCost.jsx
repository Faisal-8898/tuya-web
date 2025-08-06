"use client";

import * as React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function TodayCost() {
  const [initialLoading, setInitialLoading] = React.useState(true);
  const [todayCost, setTodayCost] = React.useState(0);

  React.useEffect(() => {
    const fetchTodayCost = async () => {
      try {
        const response = await fetch("https://toda-backend-tr28.onrender.com/today-consumption");
        const result = await response.json();

        if (result.success) {
          setTodayCost(result.data.cost);
        } else {
          console.error("Failed to fetch today's cost:", result.error);
        }
      } catch (error) {
        console.error("Error fetching today's cost:", error);
      } finally {
        setInitialLoading(false);
      }
    };

    fetchTodayCost();
  }, []);

  return (
    <Card className="w-[600px] ml-4">
      <CardHeader className="pb-3">
        <CardTitle className="font-semibold text-xl">
          Today's Electricity Cost for AC
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between">
          <div className="flex gap-1">
            <span className="text-xl font-medium text-gray-700">
              {initialLoading ? "Loading..." : todayCost.toFixed(2)}
            </span>
            <span className="text-lg text-gray-500">Taka</span>
          </div>
        </div>
        <div className="flex items-center justify-end">
          <span className="text-xs text-gray-500">
            Today's Cost When per unit is 10 taka
          </span>
        </div>
      </CardContent>
    </Card>
  );
}
