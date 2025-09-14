import Image from "next/image";
import Button from "@/app/components/button/button";
export default function Home() {
  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <div>
          page.tsx
        </div>
        <Button index={1}>按钮</Button>
        <Image
          src="https://i2.hdslb.com/bfs/face/10248bfd9cd95557373011a90b9838a9c0dc9613.jpg@120w_120h_1c.avif"
          alt="Picture of the author"
          width={500}
          height={300}
          priority
          className="rounded-lg shadow-lg"
        />
      </main>
    </div>
  );
}
