"use client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Base from "../Base";

const Home = () => {
  const { data } = useSession();
  const routes = useRouter();

  if (!data?.id) {
    routes.push("/login");
  }

  return <Base />;
};

export default Home;
