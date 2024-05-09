import * as React from "react";
import Container from "@mui/material/Container";
import FilterForm from "@/components/pages/order/table/FilterForm";
import Table from "@/components/pages/order/table/OrderTable/server/Table";
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


export default function Page () { 
    const query = "";
    const currentPage = 1;
    const params = {categoryId: "pending"};
    return (
      <Container maxWidth="xl" sx={{ marginTop: 10 }}>
        <FilterForm placeholder="usuario" />
        <Table
          type="users"
          query={query}
          currentPage={currentPage}
          status={params.categoryId}
          columns={tableColumns}
          icon={EditIcon}
        />
      </Container>
    );
}
