import { Tag } from "@/models/Tag";
import { createGenericStore } from "./genericStore";

export const useTagStore = createGenericStore<Tag>();
