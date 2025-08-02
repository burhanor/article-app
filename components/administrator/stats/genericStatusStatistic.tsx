"use client";

import React, { useEffect, useState } from "react";
import { PieChart, Pie, LabelList } from "recharts";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartConfig,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Status } from "@/enums/Status";
import { statusOptions } from "@/lib/enumHelper";
import { StatusCount } from "@/models/statistics/StatusCount";

interface CustomChartData {
  stateText: string;
  count: number;
  fill: string;
}

interface GenericStatusStatisticProps {
  fetchStatusCount: () => Promise<StatusCount[]>;
  title: string;
  footerText: string;
}
export function GenericStatusStatistic(props: GenericStatusStatisticProps) {
  const [chartData, setChartData] = useState<CustomChartData[]>([]);
  const [chartConfig, setChartConfig] = useState<ChartConfig>({});
  async function fetchChartData(): Promise<{
    chartData: CustomChartData[];
    chartConfig: ChartConfig;
  }> {
    const statusCounts = await props.fetchStatusCount();

    const chartData: CustomChartData[] = [];
    const chartConfig: ChartConfig = {};

    for (const { status, count } of statusCounts) {
      const label = Status[status];
      const color = `var(--status-${label.toLowerCase()})`;

      const stateText =
        statusOptions.find((m) => m.value === status.toString())?.label ||
        label;
      chartData.push({
        stateText: stateText,
        count,
        fill: color,
      });
      chartConfig[label] = { label: stateText, color };
    }

    return { chartData, chartConfig };
  }
  useEffect(() => {
    fetchChartData().then(({ chartData, chartConfig }) => {
      setChartData(chartData);
      setChartConfig(chartConfig);
    });
  }, []);

  const totalCount = chartData.reduce((sum, item) => sum + item.count, 0);

  return (
    <Card className="flex flex-col flex-1 h-full">
      <CardHeader className="items-center pb-0">
        <CardTitle>{props.title}</CardTitle>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="[&_.recharts-text]:fill-background mx-auto aspect-square max-h-[250px]"
        >
          <PieChart>
            <ChartTooltip
              content={<ChartTooltipContent nameKey="stateText" />}
            />
            <Pie
              data={chartData}
              dataKey="count"
              nameKey="stateText"
              labelLine={false}
            >
              <LabelList
                dataKey="stateText"
                className="fill-background"
                stroke="none"
                fontSize={12}
                formatter={(value: keyof typeof chartConfig) => `${value}  `}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm font-medium">
        <div className="flex items-center gap-2 leading-none">
          {props.footerText}: {totalCount}
        </div>
      </CardFooter>
    </Card>
  );
}
