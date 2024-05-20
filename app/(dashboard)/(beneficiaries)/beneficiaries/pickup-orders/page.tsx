import * as React from "react";
import Container from "@mui/material/Container";
import { CardTitle, FilterForm } from "@/components/common";
import { STable as Table } from "@/components/pages/pickupOrders";

type PageProps = {
  params: { categoryId: string };
  searchParams?: { query?: string; page?: string; rows?: string };
};

export default function Page({ params, searchParams }: PageProps) {
  const currentPage = Number(searchParams?.page) || 1;
  const query = searchParams?.query || "";

  return (
    <Container maxWidth="xl">
      <CardTitle
        icon="mynaui:dollar-square"
        title="Beneficiarios"
        subtitle="Direcciones"
      />

      <FilterForm placeholder="direcciones" />
      <Table
        query={query}
        currentPage={currentPage}
        status={params.categoryId}
      />
    </Container>
  );
}
