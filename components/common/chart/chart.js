import { memo } from 'react';
import ApexChart from 'react-apexcharts';

import { alpha, styled } from '@mui/material/styles';

import { bgBlur } from '@/theme/css';

// ----------------------------------------------------------------------

const Chart = styled(ApexChart)(({ theme }) => { 
  console.log(theme)
})
export default memo(Chart);
