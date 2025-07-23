import React from "react";
import { Select, SelectContent, SelectItem, SelectValue } from "../ui/select";
import { SelectTrigger } from "@radix-ui/react-select";
import { UserType } from "@/enums/UserType";

type Props = {
  userType: UserType;
  onChange: (value: UserType) => void;
};

const UserTypeSelect = ({ userType, onChange }: Props) => {
  return (
    <Select
      value={userType.toString()}
      onValueChange={(val) => onChange(parseInt(val, 10) as UserType)}
    >
      <SelectTrigger className="app-select">
        <SelectValue placeholder="Durum Seçin" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value={UserType.Admin.toString()}>Admin</SelectItem>
        <SelectItem value={UserType.Author.toString()}>Yazar</SelectItem>
        <SelectItem value={UserType.Editor.toString()}>Editör</SelectItem>
        <SelectItem value={UserType.Guest.toString()}>Misafir</SelectItem>
        <SelectItem value={UserType.Subscriber.toString()}>Abone</SelectItem>
      </SelectContent>
    </Select>
  );
};

export default UserTypeSelect;
