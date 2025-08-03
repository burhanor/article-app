import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Link from "next/link";
import React, { useEffect, useCallback, useState } from "react";

import { ArticleRate } from "@/models/statistics/ArticleRate";
import AdminStatisticSelect from "@/components/selects/adminStatisticSelect";
import AdminStatisticDateSelect from "@/components/selects/adminStatisticDateSelect";

interface TopSlugProps {
  title: string;
  fetchFunction: (
    startDate: Date,
    endDate: Date,
    limit?: number
  ) => Promise<ArticleRate[]>;
}

const ArticleRateStatistic = ({ title, fetchFunction }: TopSlugProps) => {
  const [data, setData] = useState<ArticleRate[]>([]);
  const [count, setCount] = useState<number>(5);
  const [startDate, setStartDate] = useState<Date>(new Date());

  const fetchData = useCallback(async () => {
    const result = await fetchFunction(startDate, new Date(), count);
    setData(result);
  }, [fetchFunction, startDate, count]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <Card className="flex flex-col h-full">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>

      <CardContent className="flex-1">
        <div className="flex justify-end mb-4 space-x-2">
          <AdminStatisticSelect value={count} onChange={setCount} />
          <AdminStatisticDateSelect setStartDate={setStartDate} />
        </div>

        <div className={data.length > 10 ? "overflow-y-auto max-h-96" : ""}>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Makale</TableHead>
                <TableHead>Yazar</TableHead>
                <TableHead className="text-right">Ortalama Puan</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.map((item) => (
                <TableRow key={item.slug}>
                  <TableCell className="font-medium">
                    <Link href={`makale/${item.slug}`} target="_blank">
                      {item.title}
                    </Link>
                  </TableCell>
                  <TableCell>
                    <span className="text-muted-foreground">
                      {item.nickname}
                    </span>
                  </TableCell>
                  <TableCell className="text-right">
                    {item.averageVote.toFixed(2)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};

export default ArticleRateStatistic;
