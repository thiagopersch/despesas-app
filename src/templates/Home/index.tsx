"use client";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import Base from "../Base";

const Home = () => {
  const { data } = useSession();

  if (!data?.id) {
    redirect("/login");
  }

  return <Base />;
};

export default Home;
