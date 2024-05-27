import Dashboard from '@/templates/Dashboard';

type IndexProps = {
  children: React.ReactNode;
};

export default function HomePage({ children }: IndexProps) {
  return <Dashboard />;
}
