export default function Button({
  children,
  index,
}: {
  children: React.ReactNode;
  index: number;
}) {
  return (
    <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition">
      {children}{index}
    </button>
  );
}
