import * as React from "react";
import Container from "@mui/material/Container";
import { CardTitle, FilterForm } from "@/components/common";
import { STable as Table } from "@/components/pages/promos";

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
        icon="mynaui:cog"
        title="Herramientas"
        subtitle="Promociones"
      />

      <FilterForm placeholder="promociones" />
      <Table
        query={query}
        currentPage={currentPage}
        status={params.categoryId}
      />
    </Container>
  );
}