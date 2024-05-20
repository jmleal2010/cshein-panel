"use client";
import * as React from "react";
import { usePathname, useRouter } from "next/navigation";
import Typography from "@mui/material/Typography";
import {
  Button,
  Paper,
  Table as MTable,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Box,
} from "@mui/material";

import { Order, columnType } from "@/interfaces";
import { Iconify, Popover } from "@/components/common";

const WAIT_BETWEEN_CHANGE = 1000;

type TableProps = {
  rows: Order[];
  columns: columnType[];
  showPopover?: boolean;
};
export function Table({ rows, columns, showPopover = false }: TableProps) {
  /*States*/

  /* Hooks */
  const pathname = usePathname();
  const router = useRouter();

  /* Consts */

  /*Functions*/
  const onView = (id: string) => {
    router.push(`${pathname}/${id}`);
  };

  return (
    <React.Fragment>
      <TableContainer
        component={Paper}
        sx={{ mt: 4, py: 2, px: 1.5 }}
        elevation={0}
        className="cshein-card"
      >
        <MTable sx={{ minWidth: 650 }} aria-label="order table" size="small">
          <TableHead>
            <TableRow>
              {columns.map((column, index) => (
                <TableCell
                  align="center"
                  key={index}
                  sx={{
                    pb: 2,
                    pt: 1,
                  }}
                >
                  <Typography
                    component="span"
                    fontWeight={700}
                    color="#6b7280"
                    variant="caption"
                  >
                    {column.title}
                  </Typography>
                </TableCell>
              ))}
              <TableCell align="center"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row: any, index: number) => (
              <TableRow
                key={index}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell align="center">{row.name}</TableCell>
                <TableCell align="center">
                  <Typography
                    variant="caption"
                    component="span"
                    sx={{ cursor: "pointer" }}
                  >
                    {row.pricePerLb}
                  </Typography>
                </TableCell>
                <TableCell align="center">
                  <Typography
                    border="thin"
                    borderColor="error"
                    variant="caption"
                    component="span"
                    sx={{ cursor: "pointer" }}
                  >
                    {row.size}
                  </Typography>
                </TableCell>
                <TableCell align="center">
                  <Box
                    component="span"
                    sx={{
                      width: 24,
                      height: 24,
                      cursor: "pointer",
                    }}
                  >
                    {row.active ? (
                      <Iconify icon="mynaui:check-circle" color="green" />
                    ) : (
                      <Iconify icon="mynaui:x-circle" color="red" />
                    )}
                  </Box>
                </TableCell>
                <TableCell align="center">
                  <Box
                    sx={{ width: 24, height: 24, cursor: "pointer" }}
                    component="span"
                  >
                    {row.description ?? "-"}
                  </Box>
                </TableCell>
                <TableCell align="center">
                  <Box
                    component="span"
                    sx={{ width: 24, height: 24, mr: 2, cursor: "pointer" }}
                    onClick={() => onView(row.id)}
                  >
                    <Iconify icon="mynaui:pencil" color="#60a5fa" />
                    <Iconify icon="mynaui:trash" color="red" />
                  </Box>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </MTable>
      </TableContainer>
    </React.Fragment>
  );
}
