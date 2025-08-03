"use client";

import { Bar, BarChart, XAxis } from "recharts";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { UserType } from "@/enums/UserType";
import { GetUserTypeCount } from "@/services/statisticService";
import { useEffect, useState } from "react";
import { userTypeOptions } from "@/lib/enumHelper";

interface CustomChartData {
  userTypeText: string;
  activeCount: number;
  passiveCount: number;
}

function GetLegend(name: string): string {
  if (name === "activeCount") return "Aktif Kullanıcı";
  if (name === "passiveCount") return "Pasif Kullanıcı";
  return name;
}
async function fetchChartData(): Promise<{
  chartData: CustomChartData[];
  chartConfig: ChartConfig;
}> {
  const userTypeCounts = await GetUserTypeCount();

  const chartDataMap = new Map<string, CustomChartData>();
  const chartConfig: ChartConfig = {};

  for (const { userType, isActive, count } of userTypeCounts) {
    const label = UserType[userType];
    const key = label;
    const color = `var(--user-${label.toLowerCase()})`;
    const userTypeText =
      userTypeOptions.find((m) => m.value === userType.toString())?.label ||
      label;
    const existing = chartDataMap.get(key) ?? {
      userTypeText: userTypeText,
      activeCount: 0,
      passiveCount: 0,
    };

    if (isActive) {
      existing.activeCount += count;
    } else {
      existing.passiveCount += count;
    }

    chartDataMap.set(key, existing);
    chartConfig[label] = { label, color };
  }

  return {
    chartData: Array.from(chartDataMap.values()),
    chartConfig,
  };
}

export function UserTypeStatistic() {
  const [chartData, setChartData] = useState<CustomChartData[]>([]);
  const [chartConfig, setChartConfig] = useState<ChartConfig>({});

  useEffect(() => {
    fetchChartData().then(({ chartData, chartConfig }) => {
      setChartData(chartData);
      setChartConfig(chartConfig);
    });
  }, []);

  const totalActiveCount = chartData.reduce(
    (sum, item) => sum + item.activeCount,
    0
  );
  const totalPassiveCount = chartData.reduce(
    (sum, item) => sum + item.passiveCount,
    0
  );

  return (
    <Card className="flex flex-col h-full">
      <CardHeader>
        <CardTitle>Kullanıcı Tip Dağılımı</CardTitle>
      </CardHeader>
      <CardContent className="flex-1">
        <ChartContainer config={chartConfig}>
          <BarChart data={chartData}>
            <XAxis
              dataKey="userTypeText"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
            />
            <ChartTooltip
              content={
                <ChartTooltipContent
                  formatter={(value, name, props) => {
                    return [
                      <div key={name} className="flex items-center gap-2">
                        <div
                          className="w-3 h-3 border"
                          style={{ backgroundColor: props.fill }}
                        />
                        <span>
                          {GetLegend(name.toLocaleString())} : {value}
                        </span>
                      </div>,
                    ];
                  }}
                />
              }
            />
            <ChartLegend
              formatter={(value) => {
                return (
                  <div className="flex items-center gap-2">
                    <span>{GetLegend(value)}</span>
                  </div>
                );
              }}
            />
            <Bar
              dataKey="activeCount"
              stackId="a"
              fill="var(--color-user-active)"
            />
            <Bar
              dataKey="passiveCount"
              stackId="a"
              fill="var(--color-user-passive)"
            />
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex flex-col items-center justify-center gap-2 text-sm font-medium">
        <div>Toplam Aktif Kullanıcı Sayısı: {totalActiveCount}</div>
        <div>Toplam Pasif Kullanıcı Sayısı: {totalPassiveCount}</div>
      </CardFooter>
    </Card>
  );
}
