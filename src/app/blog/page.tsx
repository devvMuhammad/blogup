export const dynamic = "force-dynamic";
import { client } from "@/sanity/lib/client";
import React from "react";
import { BlogQueryResult, SingleBlogQueryResult } from "../../../sanity.types";
import { groq } from "next-sanity";
import BlogCard from "@/components/blog/blog-card";
import { revalidatePath } from "next/cache";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default async function Component() {
  const blogQuery = groq`*[ _type == "blog" ]{_id,slug,title,titleImage}`;
  const data = await client.fetch<BlogQueryResult>(blogQuery);
  return (
    <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8 space-y-8">
      {/* {JSON.stringify(data, null, 2)} */}
      <p className="text-lg font-bold">
        Looking to book a call?{" "}
        <Link href="/consult" className="text-blue-500 hover:underline">
          Consult Here
        </Link>
      </p>
      <h1 className="font-bold text-3xl">Checkout My Blogs</h1>
      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {data.map((blog) => (
          <BlogCard key={blog._id} blog={blog} />
        ))}
      </div>

      <form
        action={async () => {
          "use server";
          revalidatePath("/blog");
        }}
      >
        <Button type="submit">Refresh</Button>
      </form>
    </div>
  );
}
