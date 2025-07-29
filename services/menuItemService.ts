import { createGenericService } from "./genericService";
import { MenuItem } from "@/models/MenuItem";
import { MenuItemFormValues } from "@/schemas/menuItemSchema";

const menuService = createGenericService<MenuItem, MenuItemFormValues>("/menu");

export default menuService;
