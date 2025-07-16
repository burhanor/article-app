import { Status } from "@/enums/Status";

export interface TagDto {
  name: string;
  slug: string;
  status: Status;
}
