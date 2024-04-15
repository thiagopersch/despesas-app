"use client";

import { Button } from "@mui/material";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="grid content-center justify-items-center gap-8 h-screen bg-zinc-600 text-white">
      <p className="text-4xl font-bold">Não encontrada</p>
      <p className="text-sm">Sorry, this page does not exist 🥺</p>
      <Link href="/">
        <Button variant="text" color="primary" className="font-bold">
          Return Home
        </Button>
      </Link>
    </div>
  );
}
