import PropTypes from "prop-types";

import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";

import Chart, { useChart } from "../../components/chart";

// ----------------------------------------------------------------------
type AppWebsiteVisitsProps = {
  title: string;
  subheader: string;
  chart: object;
};

export default function AppWebsiteVisits({
  title,
  subheader,
  chart,
  ...other
}: AppWebsiteVisitsProps & any) {
  const { labels, colors, series, options } = chart;

  const chartOptions = useChart({
    colors,
    plotOptions: {
      bar: {
        columnWidth: "16%",
      },
    },
    fill: {
      type: series.map((i: any) => i.fill),
    },
    labels,
    xaxis: {
      type: "datetime",
    },
    tooltip: {
      shared: true,
      intersect: false,
      y: {
        formatter: (value: number) => {
          if (typeof value !== "undefined") {
            return `${value.toFixed(0)} visits`;
          }
          return value;
        },
      },
    },
    ...options,
  });

  return (
    <Card {...other}>
      <CardHeader title={title} subheader={subheader} />

      <Box sx={{ p: 3, pb: 1 }}>
        <Chart
          dir="ltr"
          type="line"
          series={series}
          options={chartOptions}
          width="100%"
          height={364}
          theme={chartOptions.theme}
        />
      </Box>
    </Card>
  );
}
