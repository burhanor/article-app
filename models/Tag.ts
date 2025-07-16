import { Status } from "@/enums/Status";
export interface Tag {
  id: number;
  name: string;
  slug: string;
  status: Status;
}
