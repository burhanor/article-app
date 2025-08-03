import { UserType } from "@/enums/UserType";

export interface TokenPayload {
  id: number;
  name: string;
  email: string;
  image: string;
  userType: UserType;
}
