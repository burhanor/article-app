import { UserType } from "@/enums/UserType";
import { User } from "../User";

export const defaultUser: User = {
  nickname: "",
  emailAddress: "",
  userType: UserType.Guest,
  isActive: false,
  avatarPath: "",
  password: "",

  id: 0,
};
