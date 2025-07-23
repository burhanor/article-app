import { UserType } from "@/enums/UserType";

export interface User {
  id: number;
  emailAddress: string;
  nickname: string;
  password: string;
  avatarPath: string;
  isActive: boolean;
  userType: UserType;
}
