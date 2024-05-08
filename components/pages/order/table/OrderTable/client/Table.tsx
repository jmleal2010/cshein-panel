"use client";
import * as React from "react";
import { ITEMS_X_PAGE, routes } from "@/utils/consts";
import IconButton from "@mui/material/IconButton";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import Typography from "@mui/material/Typography";
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import {
  Button,
  Paper,
  Table as MTable,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import moment, { Moment } from "moment";
import { height } from "@fortawesome/free-brands-svg-icons/fa42Group";
import { faEye } from "@fortawesome/free-solid-svg-icons";

const WAIT_BETWEEN_CHANGE = 1000;



export default function Table({
  rows,
  totalPages,
  columns,
  currentPage,
}: {
    rows: any;
  totalPages: number;
  columns: any[];
  currentPage: number;
}) {
  /*States*/
  const [page, setPage] = React.useState<number>(0);

  // console.log(rows);

  /* Hooks */
  const searchParams = useSearchParams();
  const { replace } = useRouter();
  const pathname = usePathname();
  const router = useRouter();

  /*Functions*/
  const onViewOrder = (id: string) => {
    router.push(`${pathname}/${id}`);
  };

  // const visibleRows = React.useMemo(
  //   () => rows.slice(page * ITEMS_X_PAGE, page * ITEMS_X_PAGE + ITEMS_X_PAGE),
  //   [rows, page]
  // );

  return (
    <React.Fragment>
      <TableContainer  component={Paper} style={{ marginTop: 25 }}>
        <MTable sx={{ minWidth: 650 }} aria-label="order table" size="small">
          <TableHead>
            <TableRow>
              {columns.map((column, index) => (
                <TableCell
                  align="center"
                  key={index}
                  sx={{
                    pb: 2,
                    pt:1
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
                {columns.map((column, index) => (
                  <TableCell
                    align="center"
                    key={index}
                    sx={{
                      py: 0.3,
                      px: 0,
                    }}
                  >
                    {column.type === "date" ? (
                      moment(row[column.field]).format(column.format)
                    ) : column.field === "status" ? (
                      <Button>{row[column.field]}</Button>
                    ) : column.type === "string" ? (
                      column.field
                        .split(".")
                        .reduce((acc: any[], part: any) => acc[part], row)
                    ) : column.type === "boolean" ? (
                      (row[column.field]) ? <CheckIcon color="success"/> : <CloseIcon color="error"/>
                    ) : null}
                  </TableCell>
                ))}
                <TableCell align="center">
                  <IconButton onClick={() => onViewOrder(row.id)}>
                    <FontAwesomeIcon size="xs" icon={faEye} />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </MTable>
        </TableContainer>
    </React.Fragment>
  );
}
