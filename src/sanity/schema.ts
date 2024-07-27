import { type SchemaTypeDefinition } from "sanity";

import { blockContentType } from "./schemaTypes/blockContentType";
import { categoryType } from "./schemaTypes/categoryType";
import { postType } from "./schemaTypes/postType";
import { authorType } from "./schemaTypes/authorType";
import { blogType } from "./schemaTypes/blogType";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [authorType, blogType],
};
