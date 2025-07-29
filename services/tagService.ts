import { createGenericService } from "./genericService";
import { Tag } from "@/models/Tag";
import { TagFormValues } from "@/schemas/tagSchema";

const tagService = createGenericService<Tag, TagFormValues>("/tag");

export default tagService;
