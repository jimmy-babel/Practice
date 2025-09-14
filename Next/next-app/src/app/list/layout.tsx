export default function LIST_Layout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <div>LIST header layout</div>
      <div>{children}</div>
      <div>LIST footer layout</div>
    </>
  )
}