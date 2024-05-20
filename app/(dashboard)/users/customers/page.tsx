import * as React from "react";
import Container from "@mui/material/Container";
import {FilterForm} from "@/components/pages/order";
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
      <List>
        <Typography variant="h4">Usuarios</Typography>
      </List>
      {/* <UserCard user={user} />
        <UserModal/> */}
      <FilterForm placeholder="usuario" />
      <Table
        type="users"
        query={query}
        currentPage={currentPage}
        status={params.categoryId}
        columns={tableColumns}
        icon={EditIcon}
        popover={true}
      />
    </Container>
  );
}
