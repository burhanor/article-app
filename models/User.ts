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

export interface UserRequestDto {
  id: number;
  emailAddress: string;
  nickname: string;
  isActive: boolean;
  password: string;
  userType: UserType;
  file: File | null;
}
