'use client';

import { Button } from '@mui/material';
import { useRouter } from 'next/navigation';

export default function NotFound() {
  const router = useRouter();

  const handleBack = () => {
    return router.back();
  };

  return (
    <div className="grid content-center justify-items-center gap-8 h-screen bg-zinc-600 text-white">
      <p className="text-4xl font-bold">Não encontrada</p>
      <p className="text-sm">Sorry, this page does not exist 🥺</p>
      <Button
        variant="text"
        color="primary"
        className="font-bold"
        onClick={handleBack}
      >
        Return Home
      </Button>
    </div>
  );
}
