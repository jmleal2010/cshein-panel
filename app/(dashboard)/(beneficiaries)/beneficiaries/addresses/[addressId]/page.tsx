import * as React from "react";
import Container from "@mui/material/Container";
import { CardTitle, FilterForm } from "@/components/common";
import { STable as Table } from "@/components/pages/services";
import { Box, List, Typography } from "@mui/material";
import { Iconify } from "@/components/common";

type PageProps = {
  params: { categoryId: string };
  searchParams?: { query?: string; page?: string; rows?: string };
};

export default function Page({ params, searchParams }: PageProps) {
  const currentPage = Number(searchParams?.page) || 1;
  const query = searchParams?.query || "";

  return (
    <Container maxWidth="xl">
      <CardTitle icon="mynaui:cog" title="Herramientas" subtitle="Services" />

      <FilterForm placeholder="servicios" />
      <Table
        query={query}
        currentPage={currentPage}
        status={params.categoryId}
      />
    </Container>
  );
}
