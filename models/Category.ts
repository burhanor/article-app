import { Status } from "@/enums/Status";
export interface Category {
  id: number;
  name: string;
  slug: string;
  status: Status;
}
