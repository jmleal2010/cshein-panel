"use client";
import React from "react";
import { Box, Pagination } from "@mui/material";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

const options = [5, 10, 15, 20];

type PaginatorProps = {
  currentPage: number;
  totalPages: number;
};

export default function Paginator({ currentPage, totalPages }: PaginatorProps) {
  const [page, setPage] = React.useState<number>(0);

  /* Hooks */
  const searchParams = useSearchParams();
  const { replace } = useRouter();
  const pathname = usePathname();

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
