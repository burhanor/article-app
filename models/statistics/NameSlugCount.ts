import { Status } from "@/enums/Status";

export interface NameSlugCount {
  count: number;
  name: string;
  slug: string;
  status: Status;
}
