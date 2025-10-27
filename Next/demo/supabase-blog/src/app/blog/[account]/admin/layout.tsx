import SetLayout from "@/components/set-layout";
import Nav from "@/app/blog/[account]/admin/components/nav"
export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const extraClass = `h-[100%] max-md:min-w-[500px]`;
  return (
    <div className="h-[calc(100vh-60px)]">
      <SetLayout header={<Nav></Nav>} extraClass={extraClass} screenPage direction="level" safeArea>
        <div className="content-box">
          {children}
        </div>
      </SetLayout>
    </div>
  );
}
