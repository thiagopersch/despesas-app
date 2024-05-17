import Base from "@/templates/Base";

type IndexProps = {
  children: React.ReactNode;
};

export default async function HomePage({ children }: IndexProps) {
  return <Base>{children}</Base>;
}
