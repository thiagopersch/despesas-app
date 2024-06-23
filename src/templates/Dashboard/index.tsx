'use client';

import Bars from '@/components/Charts/Bars';
import Line from '@/components/Charts/Line';
import Pie from '@/components/Charts/Pie';
import { Box } from '@mui/material';

export default function Dashboard() {
  return (
    <Box className="flex flex-col items-center content-center h-full w-screen">
      <Bars />
      <Pie />
      <Line />
    </Box>
  );
}
