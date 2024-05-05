"use client";
import React, { Fragment, useState } from "react";
import { Box, Pagination } from "@mui/material";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

const options = [5, 10, 15, 20];

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export default function Paginator({
  currentPage,
  totalPages,
}: {
  currentPage: number;
  totalPages: number;
}) {
  const [page, setPage] = React.useState<number>(0);

  /* Hooks */
  const searchParams = useSearchParams();
  const { replace } = useRouter();
  const pathname = usePathname();
  const router = useRouter();

  /* Functions */
  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
    replace(createPageURL(newPage));
  };

  const createPageURL = (page: number) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", page.toString());
    return `${pathname}?${params}`;
  };

  return (
    <Box
      justifyContent="flex-end"
      alignItems="flex-end"
      display="flex"
      sx={{ mt: 2 }}
    >
      <Pagination
        page={currentPage}
        count={totalPages}
        variant="outlined"
        shape="rounded"
        onChange={handleChangePage}
      />
    </Box>
  );
}
