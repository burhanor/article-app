import { MenuItem } from "@/models/MenuItem";
import { createGenericStore } from "./genericStore";

export const useMenuStore = createGenericStore<MenuItem>();
