import { groq } from "next-sanity";
import BlogCard from "./blog-card";
import { client } from "@/sanity/lib/client";
import { BlogQueryResult } from "../../../sanity.types";

export default async function RelatedBlogs() {
  //! write the query here later to fetch related blogs
  // const query = groq`*[_type == "blog"]{_id,slug,title,titleImage}`;
  // const data = await client.fetch<BlogQueryResult>(query);

  return (
    <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
      {/* @Blog Cards */}
      <BlogCard key={1} blog={{} as any} />
      <BlogCard key={2} blog={{} as any} />
    </div>
  );
}
