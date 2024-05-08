import * as React from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import OrderTableSkeleton from "@/components/skeletons/order-table-skeleton";
import Table from "@/components/pages/order/table/OrderTable/server/Table";
import FilterForm from "@/components/pages/order/table/FilterForm";
import Iconify from "@/components/common/iconify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { title } from "process";
import { fi } from "@faker-js/faker";
import { chain } from "lodash";

const tableColumns = [
  {
    title: "Code",
    field: "code",
    type: "string",
  },
  {
    title: "Service Type",
    field: "serviceType",
    type: "string",
  },
  {
    title: "Status",
    field: "status",
    type: "string",
  },
  {
    title: "Created At",
    field: "createdAt",
    type: "date",
    format: "YYYY-MM-DD HH:mm:ss",
  },
  {
    title: "Updated At",
    field: "updatedAt",
    type: "date",
    format: "YYYY-MM-DD HH:mm:ss",
  },
  {
    title: "Beneficiary",
    field: "beneficiary.firstName",
    type: "string",
  },
];

{
  /* <FontAwesomeIcon size="xs" icon={faEye} /> */
}

export default function OrdersPage({
  params,
  searchParams,
}: {
  params: {
    categoryId: string;
  };
  searchParams?: {
    query?: string;
    page?: string;
    rows?: string;
  };
}) {
  //console.log(params, searchParams);
  const currentPage = Number(searchParams?.page) || 1;
  const query = searchParams?.query || "";
  const pageTitle = `${params.categoryId
    ?.charAt(0)
    .toUpperCase()}${params.categoryId?.slice(1)}`;
  const rows = searchParams?.rows || "10";
  const boxStyle = {
    my: 4,
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
  };

  return (
    <Container maxWidth="xl">
      <Box sx={boxStyle}>
        <Iconify
          icon="mynaui:clipboard"
          width={40}
          sx={{
            color: "#6b7280",
          }}
        />
        <Typography variant="h4" component="h1" align="left" color="#6b7280">
          Orders
        </Typography>

        <Typography
          variant="h5"
          component="span"
          align="left"
          color="#6b7280"
          style={{ marginLeft: 4 }}
        >
          -{">"} {pageTitle}
        </Typography>
      </Box>
      <FilterForm placeholder="orden" />

      <Table
        type="orders"
        query={query}
        currentPage={currentPage}
        status={params.categoryId}
        columns={tableColumns}
        icon={VisibilityIcon} //<FontAwesomeIcon size="xs" icon={faEye} />
      />
    </Container>
  );
}
