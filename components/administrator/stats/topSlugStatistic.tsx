import StatusBadge from "@/components/badges/status-badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { NameSlugCount } from "@/models/statistics/NameSlugCount";
import Link from "next/link";
import React, { useEffect } from "react";

import AdminStatisticSelect from "@/components/selects/adminStatisticSelect";
interface TopSlugProps {
  title: string;
  type: string;
  fetchFunction: (limit?: number) => Promise<NameSlugCount[]>;
}

const TopSlugStatistic = ({ title, type, fetchFunction }: TopSlugProps) => {
  const [data, setData] = React.useState<NameSlugCount[]>([]);
  const [count, setCount] = React.useState<number>(5);

  async function fetchData(): Promise<NameSlugCount[]> {
    const data = await fetchFunction(count);

    return data;
  }
  useEffect(() => {
    fetchData().then((data) => {
      setData(data);
    });
    console.log("TopSlug data fetched:", data);
  }, []);
  useEffect(() => {
    fetchData().then((data) => {
      setData(data);
    });
  }, [count]);

  return (
    <Card className="flex flex-col h-full">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent className="flex-1">
        <div className="flex justify-end mb-4">
          <AdminStatisticSelect value={count} onChange={setCount} />
        </div>
        <div className={data.length > 10 ? "overflow-y-auto max-h-96" : ""}>
          <Table>
            <TableCaption></TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead>{type}</TableHead>
                <TableHead>Durum</TableHead>
                <TableHead className="text-right">Adet</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.map((item) => (
                <TableRow key={item.slug}>
                  <TableCell className="font-medium">
                    <Link
                      href={`${type.toLocaleLowerCase()}/${item.slug}`}
                      target="_blank"
                    >
                      {item.name}
                    </Link>
                  </TableCell>
                  <TableCell>
                    <StatusBadge status={item.status} key={item.slug} />
                  </TableCell>
                  <TableCell className="text-right">{item.count}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};

export default TopSlugStatistic;
