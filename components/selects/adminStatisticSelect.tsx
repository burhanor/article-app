import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

type Props = {
  onChange: (value: number) => void;
  value: number;
};
// Admin Statistic componentlerinde kac tane veri gosterilecegini secmek icin kullanilir
const AdminStatisticSelect = ({ value, onChange }: Props) => {
  return (
    <Select
      value={value.toString()}
      onValueChange={(value) => onChange(Number(value))}
    >
      <SelectTrigger className="w-[100px]">
        <SelectValue placeholder="5" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="5">5</SelectItem>
        <SelectItem value="10">10</SelectItem>
        <SelectItem value="20">20</SelectItem>
        <SelectItem value="50">50</SelectItem>
        <SelectItem value="10000">Tümü</SelectItem>
      </SelectContent>
    </Select>
  );
};

export default AdminStatisticSelect;
