import React, { useEffect } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

type Props = {
  setStartDate: (date: Date) => void;
};
// Admin Statistic componentlerinde hangi tarih araligini secmek icin kullanilir
const AdminStatisticDateSelect = ({ setStartDate }: Props) => {
  const [period, setPeriod] = React.useState<string>("4");

  useEffect(() => {
    const start = new Date();
    switch (period) {
      case "1":
        start.setMonth(start.getMonth() - 1); // Son 1 ay
        break;
      case "2":
        start.setMonth(start.getMonth() - 3); // Son 3 ay
        break;
      case "3":
        start.setFullYear(start.getFullYear(), 0, 1); // Bu yılın başı
        break;
      case "4":
        start.setFullYear(2000); // Tüm zamanlar
        break;
      default:
        break;
    }
    setStartDate(start);
  }, [period]);

  return (
    <Select value={period} onValueChange={(value) => setPeriod(value)}>
      <SelectTrigger className="w-[120px]">
        <SelectValue placeholder="Tüm Zamanlar" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="1">Son 1 Ay</SelectItem>
        <SelectItem value="2">Son 3 Ay</SelectItem>
        <SelectItem value="3">Bu Yıl</SelectItem>
        <SelectItem value="4">Tüm Zamanlar</SelectItem>
      </SelectContent>
    </Select>
  );
};

export default AdminStatisticDateSelect;
