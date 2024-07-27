import Link from "next/link";

export default async function Home() {
  // data[0].
  return (
    <main className="flex flex-col items-center justify-between p-24">
      Test this later bichse
      <Link href="/blog">Blog page</Link>
    </main>
  );
}
