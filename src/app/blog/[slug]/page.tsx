export const dynamic = "force-dynamic";
import { Author } from "@/components/blog/author";
import RelatedBlogs from "@/components/blog/related-blogs";
import { Separator } from "@/components/ui/separator";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import { PortableText, PortableTextReactComponents, groq } from "next-sanity";
import { Image } from "next-sanity/image";

const myPortableTextComponents: Partial<PortableTextReactComponents> = {
  types: {
    image: ({ value }: { value: File }) => (
      <img
        className="w-full max-w-3xl mx-auto my-8 rounded-lg shadow-md"
        src={urlFor(value).url()}
        alt="Blog Image"
      />
    ),
  },
  block: {
    h1: ({ children }: any) => (
      <h1 className="text-4xl font-extrabold text-gray-800 leading-tight mb-6">
        {children}
      </h1>
    ),
    h2: ({ children }: any) => (
      <h2 className="text-3xl font-bold text-gray-700 leading-snug mb-5">
        {children}
      </h2>
    ),
    h3: ({ children }: any) => (
      <h3 className="text-2xl font-semibold text-gray-600 leading-relaxed mb-4">
        {children}
      </h3>
    ),
    h4: ({ children }: any) => (
      <h4 className="text-xl font-medium text-gray-600 leading-normal">
        {children}
      </h4>
    ),
    normal: ({ children }: any) => (
      <p className="text-lg text-gray-700 leading-loose mb-4">{children}</p>
    ),
    blockquote: ({ children }: any) => (
      <blockquote className="border-l-4 border-gray-500 pl-4 italic text-gray-600 mb-4">
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }: any) => (
      <ul className="list-disc list-outside pl-5 mb-4 text-gray-700">
        {children}
      </ul>
    ),
    number: ({ children }: any) => (
      <ol className="list-decimal list-outside pl-5 mb-4 text-gray-700">
        {children}
      </ol>
    ),
  },
  listItem: {
    bullet: ({ children }: any) => (
      <li className="text-lg text-gray-700 leading-loose mb-4">{children}</li>
      // <li><p>{children}</p></li>
    ),
    number: ({ children }: any) => (
      <li className="mb-3 leading-relaxed text-lg">{children}</li>
    ),
  },
  marks: {
    em: ({ children }: any) => (
      <em className="text-gray-600 italic">{children}</em>
    ),
    strong: ({ children }: any) => (
      <strong className="text-gray-900 font-semibold">{children}</strong>
    ),
    link: ({ children, value }: any) => (
      <a
        href={value.href}
        className="text-blue-600 underline hover:text-blue-800"
        target="_blank"
      >
        {children}
      </a>
    ),
  },
};

export default async function BlogPage({
  params: { slug },
}: {
  params: { slug: string };
}) {
  const SingleBlogQuery = groq`*[_type == "blog" && slug.current == $slug]{
    title,
    slug,
    author->{name,headline,image},
    titleImage, 
    text
  }`;
  const data = await client.fetch(SingleBlogQuery, { slug });
  const { title, author, titleImage, text } = data[0];
  return (
    <>
      {/* <pre className="text-xs">{JSON.stringify(text, null, 2)}</pre> */}
      <div className="max-w-4xl mx-auto px-5 py-12 sm:px-6 lg:px-8 mt-10 flex flex-col gap-10">
        {/* @Title */}
        <h1 className="text-2xl font-bold">Blog</h1>
        <h1 className="text-3xl sm:text-5xl font-bold">{title}</h1>
        {/* @Author */}
        <Author author={author} />
        {/* @Blog Title Image */}
        {/* <div className="relative w-full h-[400px]"> */}
        <Image
          className="h-auto w-full border border-muted rounded-lg"
          width={2000}
          height={1000}
          alt={titleImage?.alt || ""}
          src={urlFor(titleImage)?.height(1000).width(2000).url() as string}
          sizes="100vw"
          priority
        />
        {/* @Blog Content */}
        <div>
          <PortableText value={text} components={myPortableTextComponents} />
        </div>
        {/* @Separator Line */}
        <Separator />
        {/* @Related Blogs */}
        <h1 className="text-xl text-center font-bold">Related Blogs</h1>
        <RelatedBlogs />
      </div>
    </>
  );
}
