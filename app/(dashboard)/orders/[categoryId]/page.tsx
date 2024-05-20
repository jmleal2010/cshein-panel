import * as React from "react";
import Container from "@mui/material/Container";
import { STable as Table } from "@/components/pages/order";
import { CardTitle, FilterForm } from "@/components/common";

type OrderPageProps = {
  params: { categoryId: string };
  searchParams?: { query?: string; page?: string; rows?: string };
};
export default function OrdersPage({ params, searchParams }: OrderPageProps) {
  const currentPage = Number(searchParams?.page) || 1;
  const query = searchParams?.query || "";
  const pageTitle = `${params.categoryId
    ?.charAt(0)
    .toUpperCase()}${params.categoryId?.slice(1)}`;

  return (
    <Container maxWidth="xl">
      <CardTitle icon="mynaui:clipboard" title="Ordenes" subtitle={pageTitle} />
      <FilterForm placeholder="orden" />

      <Table
        query={query}
        currentPage={currentPage}
        status={params.categoryId}
      />
    </Container>
  );
}
