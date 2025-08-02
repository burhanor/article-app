import { UserType } from "@/enums/UserType";

export interface UserTypeCount {
  count: number;
  userType: UserType;
  isActive: boolean;
}
