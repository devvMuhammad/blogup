import { urlFor } from "@/sanity/lib/image";
import { BlogQueryResult } from "../../../sanity.types";
import { Image } from "next-sanity/image";
import Link from "next/link";

export default function BlogCard({ blog }: { blog: BlogQueryResult[number] }) {
  return (
    <div
      key={blog._id}
      className="cursor-pointer bg-white rounded-lg shadow-lg overflow-hidden grid grid-rows-[auto_1fr] hover:-translate-y-1 transition-all duration-300 ease-in"
    >
      {blog.titleImage?.asset?._ref ? (
        <Image
          src={urlFor(blog.titleImage).height(400).width(600).url() as string}
          alt={blog.titleImage?.alt || ""}
          width={600}
          height={400}
          className="w-full h-48 object-cover border-b"
          sizes="100vw"
        />
      ) : (
        <div className="h-48 bg-cyan-200 "></div>
      )}
      <div className="p-6 grid grid-rows-[1fr_auto] gap-4">
        <div className="flex flex-col gap-2">
          <h3 className="text-xl font-bold mb-2">{blog.title}</h3>
          <p className="text-muted-foreground mb-4">
            Discover the power of simplicity and how to create stunning designs
            that captivate your audience.
          </p>
        </div>
        <Link
          href={`/blog/${blog.slug?.current || ""}`}
          className="inline-flex items-center text-primary hover:text-blue-500"
          prefetch={false}
        >
          Read More
          <ArrowRightIcon className="ml-1 w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}

function XIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>
  );
}

function ArrowRightIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5 12h14" />
      <path d="m12 5 7 7-7 7" />
    </svg>
  );
}
