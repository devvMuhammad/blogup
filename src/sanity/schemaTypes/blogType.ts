import { defineField, defineType } from "sanity";

export const blogType = defineType({
  name: "blog",
  title: "Blog",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation(rule) {
        return rule
          .required()
          .max(96)
          .error("Tile cannot exceed 96 characters")
          .error("Title is required");
      },
    }),

    defineField({
      name: "slug",
      type: "slug",
      options: {
        source: "title",
        maxLength: 96,
      },
    }),

    defineField({
      name: "description",
      title: "Description",
      type: "string",
      validation: (rule) =>
        rule
          .required()
          .max(200)
          .error("Description is required")
          .error("Description cannot exceed 200 characters"),
    }),

    defineField({
      name: "author",
      title: "Author",
      type: "reference",
      to: { type: "author" },
    }),

    defineField({
      name: "titleImage",
      title: "Title Image",
      type: "image",
      fields: [
        {
          name: "alt",
          type: "string",
          title: "Alternative Text",
          validation(rule) {
            return rule.required().error("Alternative Text is required");
          },
        },
      ],
    }),

    defineField({
      name: "text",
      title: "Text",
      type: "array",
      of: [
        // rich text
        {
          type: "block",
          styles: [
            { title: "Normal", value: "normal" },
            { title: "Heading 1", value: "h1" },
            { title: "Heading 2", value: "h2" },
            { title: "Heading 3", value: "h3" },
            { title: "Quote", value: "blockquote" },
          ],
          lists: [
            { title: "Bullet", value: "bullet" },
            { title: "Numbered", value: "number" },
          ],
          marks: {
            decorators: [
              { title: "Strong", value: "strong" },
              { title: "Emphasis", value: "em" },
            ],
          },
        },
        // image
        {
          type: "image",
          fields: [
            {
              name: "alt",
              type: "string",
              title: "Alternative Text",
            },
            {
              name: "caption",
              type: "string",
              title: "Caption",
            },
          ],
          options: {
            hotspot: true,
          },
        },
      ],
    }),
  ],
});
