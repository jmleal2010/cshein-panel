import * as React from "react";
import Container from "@mui/material/Container";
import FilterForm from "@/components/pages/order/table/FilterForm";
import Table from "@/components/pages/order/table/OrderTable/server/Table";
import MouseOverPopover from "@/components/pages/users/Popover";
import { Box, List, Typography } from "@mui/material";
import UserCard from "@/components/pages/users/UserCard";
import UserModal from "@/components/pages/users/UserModal";
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
//quitar 
const user = {
  name: "Juan miguel perez",
  email: "juanmi@gmail.com",
  phone: "1234566789",
  verified: true,
}

export default function Page () { 
    const query = "";
    const currentPage = 1;
    const params = {categoryId: "pending"};
    return (
      <Container maxWidth="xl" sx={{ marginTop: 10 }}>
        <List>
          <Typography variant="h4">Usuarios</Typography>

        </List>
        {/* <Box>
          <MouseOverPopover />
        </Box>
        <UserCard user={user} />
        <UserModal/> */}
        <FilterForm placeholder="usuario" />
        <Table
          type="users"
          query={query}
          currentPage={currentPage}
          status={params.categoryId}
          columns={tableColumns}
          icon = {EditIcon}
        />
      </Container>
    );
}

