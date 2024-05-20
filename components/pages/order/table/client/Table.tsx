"use client";
import * as React from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import Typography from "@mui/material/Typography";
import {
  Paper,
  Table as MTable,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Box,
} from "@mui/material";
import moment from "moment";
import { Order, columnType } from "@/interfaces";
import { Iconify } from "@/components/common";

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
  const onViewOrder = (id: string) => {
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
              <TableCell align="center">
                {" "}
                <Typography
                  component="span"
                  fontWeight={700}
                  color="#6b7280"
                  variant="caption"
                >
                  Info
                </Typography>
              </TableCell>
              <TableCell align="center"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row: any, index: number) => (
              <TableRow
                key={index}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell align="center">{row.code}</TableCell>
                <TableCell align="center">
                  <Typography
                    variant="caption"
                    component="span"
                    color="primary"
                    sx={{ cursor: "pointer" }}
                  >
                    {row.serviceType}
                  </Typography>
                </TableCell>
                <TableCell align="center">
                  <Typography
                    border="thin"
                    borderColor="error"
                    variant="caption"
                    component="span"
                    sx={{ cursor: "pointer" }}
                    fontWeight="bold"
                    color={row.status === "PENDING" ? "error" : "black"}
                  >
                    {row.status}
                  </Typography>
                </TableCell>
                <TableCell align="center">
                  <Typography
                    variant="caption"
                    component="span"
                    sx={{ cursor: "pointer" }}
                  >
                    {moment(row.createdAt).format("YYYY-MM-DD")}
                  </Typography>
                </TableCell>
                <TableCell align="center">
                  <Typography
                    variant="caption"
                    component="span"
                    sx={{ cursor: "pointer" }}
                  >
                    {moment(row.deliveredAt).format("YYYY-MM-DD")}
                  </Typography>
                </TableCell>
                <TableCell align="center">
                  <Typography
                    variant="caption"
                    component="span"
                    sx={{ cursor: "pointer" }}
                  >
                    {row.beneficiary.firstName} {row.beneficiary.lastName}
                  </Typography>
                </TableCell>
                <TableCell align="center">
                  <Box
                    sx={{ width: 24, height: 24, cursor: "pointer" }}
                    component="span"
                  >
                    <Iconify icon="mynaui:info-circle" />
                  </Box>
                </TableCell>
                <TableCell align="center">
                  <Box
                    component="span"
                    sx={{ width: 24, height: 24, mr: 2, cursor: "pointer" }}
                    onClick={() => onViewOrder(row.id)}
                  >
                    <Iconify icon="mynaui:pencil" />
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
