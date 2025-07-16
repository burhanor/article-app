import { Status } from "@/enums/Status";

export interface CategoryDto {
  name: string;
  slug: string;
  status: Status;
}
