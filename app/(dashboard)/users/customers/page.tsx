import * as React from "react";
import Container from "@mui/material/Container";
import { CardTitle, FilterForm } from "@/components/common";
import {STable as Table} from "@/components/pages/order";
import { Box, List, Typography } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";

const tableColumns = [
  {
    title: "Nombre",
    field: "fullName",
    type: "string",
  },
  {
    title: "Email",
    field: "email",
    type: "string",
  },
  {
    title: "Teléfono",
    field: "phone",
    type: "string",
  },
  {
    title: "Verificado",
    field: "verified",
    type: "boolean",
  },
];

export default function Page() {
  const query = "";
  const currentPage = 1;
  const params = { categoryId: "pending" };
  return (
    <Container maxWidth="xl" sx={{ marginTop: 10 }}>
      <CardTitle icon="mynaui:users" title="Usuarios" subtitle="pageTitle" />
      <FilterForm placeholder="usuario" />
      <Table
        query={query}
        currentPage={currentPage}
        status={params.categoryId}
      />
    </Container>
  );
}
