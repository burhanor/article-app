import React from "react";
import { Select, SelectContent, SelectItem, SelectValue } from "../ui/select";
import { SelectTrigger } from "@radix-ui/react-select";
import { Status } from "@/enums/Status";

type Props = {
  status: Status;
  onChange: (value: Status) => void;
};

const StatusSelect = ({ status, onChange }: Props) => {
  return (
    <Select
      value={status.toString()}
      onValueChange={(val) => onChange(parseInt(val, 10) as Status)}
    >
      <SelectTrigger className="app-select">
        <SelectValue placeholder="Durum Seçin" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value={Status.Pending.toString()}>Beklemede</SelectItem>
        <SelectItem value={Status.Published.toString()}>Yayınlandı</SelectItem>
        <SelectItem value={Status.Rejected.toString()}>Reddedildi</SelectItem>
      </SelectContent>
    </Select>
  );
};

export default StatusSelect;
