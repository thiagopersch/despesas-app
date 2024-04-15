"use client"; // Error components must be Client Components

import { Button } from "@mui/material";
import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div>
      <p className="text-6xl font-bold">Something went wrong!</p>
      <>{error}</>
      <Button variant="text" color="inherit" onClick={() => reset()}>
        Tentar novamente
      </Button>
    </div>
  );
}
