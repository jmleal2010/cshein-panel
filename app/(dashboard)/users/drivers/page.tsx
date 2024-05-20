import * as React from "react";
import Container from "@mui/material/Container";
import { CardTitle, FilterForm } from "@/components/common";
import { STable as Table } from "@/components/pages/users/";
import { Box, Typography } from "@mui/material";
import { Iconify } from "@/components/common";

type UserPageProps = {
  params: { categoryId: string };
  searchParams?: { query?: string; page?: string; rows?: string };
};

export default function OrdersPage({ params, searchParams }: UserPageProps) {
  const currentPage = Number(searchParams?.page) || 1;
  const query = searchParams?.query || "";
  const pageTitle = `Drivers`;

  return (
    <Container maxWidth="xl">
      <CardTitle icon="mynaui:users" title={pageTitle} />
      <FilterForm placeholder="usuario" />
      <Table
        query={query}
        currentPage={currentPage}
        status={params.categoryId}
      />
    </Container>
  );
}
