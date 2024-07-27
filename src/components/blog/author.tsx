import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { urlFor } from "@/sanity/lib/image";

export function Author({ author }: { author: any }) {
  return (
    <div className="flex items-center gap-4">
      <Avatar className="md:h-20 md:w-20">
        <AvatarImage
          src={urlFor(author.image).url() || ("" as string)}
          alt="@shadcn"
        />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
      <div>
        <h1 className="text-xl sm:text-2xl font-bold">
          {author.name} ·{" "}
          <span className="text-base sm:text-lg text-muted-foreground">
            {new Date().toLocaleDateString("en-US", {
              day: "2-digit",
              month: "short",
              year: "numeric",
            })}
          </span>
        </h1>
        <p className="text-sm sm:text-base text-muted-foreground">
          {author.headline || "Author"}
        </p>
      </div>
    </div>
  );
}

// {blog.titleImage?.asset?._ref ? (
//   <Image
//     src={urlFor(blog.titleImage).height(400).width(600).url() as string}
//     alt={blog.titleImage?.alt || ""}
//     width={600}
//     height={400}
//     className="w-full h-48 object-cover border-b"
//     sizes="100vw"
//   />
// ) : (
//   <div className="bg-cyan-200 ">no image</div>
// )}
