type IndexProps = {
  children: React.ReactNode;
};

export default async function HomePage({ children }: IndexProps) {
  return <>{children}</>;
}
