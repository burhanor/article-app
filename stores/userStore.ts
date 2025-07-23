import { createGenericStore } from "./genericStore";
import { User } from "@/models/User";

export const useUserStore = createGenericStore<User>();
