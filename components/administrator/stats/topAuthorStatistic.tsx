"use client";

import { Bar, BarChart, XAxis } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { GetTopAuthors } from "@/services/statisticService";
import { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
interface CustomChartData {
  nickname: string;
  pendingCount: number;
  publishedCount: number;
  rejectedCount: number;
  totalCount: number;
}

async function fetchChartData(limit?: number): Promise<{
  chartData: CustomChartData[];
  chartConfig: ChartConfig;
}> {
  const topAuthors = await GetTopAuthors(limit);

  const chartDataMap = new Map<string, CustomChartData>();
  const chartConfig: ChartConfig = {};

  for (const {
    nickname,
    pendingCount,
    publishedCount,
    rejectedCount,
    totalCount,
  } of topAuthors) {
    const label = nickname;
    const color = `var(--user-${label.toLowerCase()})`;

    chartDataMap.set(label, {
      nickname: label,
      pendingCount,
      publishedCount,
      rejectedCount,
      totalCount,
    });
    chartConfig[label] = { label, color };
  }

  return {
    chartData: Array.from(chartDataMap.values()),
    chartConfig,
  };
}

function GetLegend(name: string): string {
  if (name === "pendingCount") return "Bekleyen Makale";
  if (name === "publishedCount") return "Yayınlanan Makale";
  if (name === "rejectedCount") return "Reddedilen Makale";
  return name;
}

export function TopAuthorStatistic() {
  const [chartData, setChartData] = useState<CustomChartData[]>([]);
  const [chartConfig, setChartConfig] = useState<ChartConfig>({});
  const [count, setCount] = useState<number>(5);

  useEffect(() => {
    fetchChartData(count).then(({ chartData, chartConfig }) => {
      setChartData(chartData);
      setChartConfig(chartConfig);
    });
  }, []);

  useEffect(() => {
    fetchChartData(count).then(({ chartData, chartConfig }) => {
      setChartData(chartData);
      setChartConfig(chartConfig);
    });
  }, [count]);

  return (
    <Card className="flex flex-col h-full">
      <CardHeader>
        <CardTitle>En İyi Yazarlar</CardTitle>
      </CardHeader>
      <CardContent className="flex-1">
        <div className="flex justify-end mb-4">
          <Select
            value={count.toString()}
            onValueChange={(value) => setCount(Number(value))}
          >
            <SelectTrigger className="w-[100px]">
              <SelectValue placeholder="5" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="5">5</SelectItem>
              <SelectItem value="10">10</SelectItem>
              <SelectItem value="20">20</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <ChartContainer config={chartConfig}>
          <BarChart data={chartData}>
            <XAxis
              dataKey="nickname"
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
              dataKey="pendingCount"
              stackId="a"
              fill="var(--color-pending)"
            />
            <Bar
              dataKey="publishedCount"
              stackId="a"
              fill="var(--color-published)"
            />
            <Bar
              dataKey="rejectedCount"
              stackId="a"
              fill="var(--color-rejected)"
            />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
