"use client";

import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// Tariff slabs (step-wise rates)
const tariffSlabs = [
  { limit: 75, rate: 4.5 },
  { limit: 125, rate: 5.5 },
  { limit: 100, rate: 6.5 },
  { limit: 100, rate: 8.5 },
  { limit: Infinity, rate: 11.0 },
];

// Calculate cost based on slabs
function calculateTariffCost(units) {
  let cost = 0;
  let remaining = units;

  for (let i = 0; i < tariffSlabs.length; i++) {
    if (remaining <= 0) break;

    const slab = tariffSlabs[i];
    const slabUnits = Math.min(remaining, slab.limit);
    cost += slabUnits * slab.rate;
    remaining -= slabUnits;
  }

  return cost;
}

export function TodayCost() {
  const [initialLoading, setInitialLoading] = useState(true);
  const [kwh, setKwh] = useState(0);
  const [tariffCost, setTariffCost] = useState(0);

  useEffect(() => {
    const fetchTodayConsumption = async () => {
      try {
        const response = await fetch(
          "https://toda-backend-tr28.onrender.com/today-consumption"
        );
        const result = await response.json();

        if (result.success) {
          const units = result.data.kwh;
          const cost = calculateTariffCost(units);

          setKwh(units);
          setTariffCost(cost);
        } else {
          console.error("Failed to fetch:", result.error);
        }
      } catch (error) {
        console.error("Fetch error:", error);
      } finally {
        setInitialLoading(false);
      }
    };

    fetchTodayConsumption();
  }, []);

  return (
    <Card className="w-[600px] ml-4">
      <CardHeader className="pb-3">
        <CardTitle className="font-semibold text-xl">
          Today's Electricity Cost for AC
        </CardTitle>
      </CardHeader>
      <CardContent>
        {initialLoading ? (
          <div className="text-lg text-gray-600">Loading...</div>
        ) : (
          <>
            <div className="text-xl font-medium text-gray-800">
              {tariffCost.toFixed(2)} Taka
            </div>
            <div className="text-sm text-gray-600">
              Units consumed: {kwh.toFixed(2)} kWh
            </div>
            <div className="text-xs text-gray-500 mt-2">
              Accorting to Bangladeshi official tariff slabs
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
}
