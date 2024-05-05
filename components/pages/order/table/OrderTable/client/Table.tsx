"use client";
import * as React from "react";
import InputAdornment from "@mui/material/InputAdornment";
import { routes } from "@/utils/consts";
import IconButton from "@mui/material/IconButton";
import InputLabel from "@mui/material/InputLabel";
import OutlinedInput from "@mui/material/OutlinedInput";
import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { useDebouncedCallback } from "use-debounce";
import { Search, Visibility, VisibilityOff } from "@mui/icons-material";
import TablePagination from "@mui/material/TablePagination";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import {
  Box,
  Button,
  Paper,
  Table as MTable,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Stack,
  Pagination,
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
  const [rowsPerPage, setRowsPerPage] = React.useState<number>(10);
  const [page, setPage] = React.useState<number>(0);

  /* Hooks */
  const searchParams = useSearchParams();
  const { replace } = useRouter();
  const pathname = usePathname();
  const router = useRouter();

  /*Functions*/
  const onViewOrder = (id: string) => {
    router.push(`${pathname}/${id}`);
  };

  const handleSearch = useDebouncedCallback((value: string) => {
    const params = new URLSearchParams(searchParams);
    if (value) {
      params.set("query", value);
    } else {
      params.delete("query");
    }
    params.set("page", "1");
    replace(`${pathname}?${params.toString()}`);
  }, WAIT_BETWEEN_CHANGE);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
    replace(createPageURL(newPage));
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (parseInt(event.target.value, 10) < pageSize) {
    }
    replace(createRowsPerPageURL(parseInt(event.target.value, 10)));
  };

  const createPageURL = (page: number) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", page.toString());
    return `${pathname}?${params}`;
  };

  const createRowsPerPageURL = (rows: number) => {
    const params = new URLSearchParams(searchParams);
    params.set("rows", rows.toString());
    return `${pathname}?${params}`;
  };

  const visibleRows = React.useMemo(
    () => rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage),
    [rows, page, rowsPerPage]
  );

  return (
    <React.Fragment>
      <TableContainer elevation={0} component={Paper} style={{ marginTop: 25 }}>
        <MTable sx={{ minWidth: 650 }} aria-label="order table" size="small">
          <TableHead>
            <TableRow>
              {columns.map((column, index) => (
                <TableCell
                  align="center"
                  key={index}
                  sx={{
                    pb: 2,
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
            {visibleRows.map((row: any, index: number) => (
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
                    ) : null}
                    {/* {column.field
                      .split(".")
                      .reduce((acc: any[], part: any) => acc[part], row)} */}
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
      <Box justifyContent="flex-end" alignItems="flex-end" display="flex" sx={{mt: 2}}>
        <Pagination page={currentPage} count={totalPages} variant="outlined" shape="rounded" onChange={handleChangePage}/>
      </Box>
      {/* <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={totalPages * pageSize}
        rowsPerPage={pageSize}
        page={currentPage - 1}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      /> */}
    </React.Fragment>
  );
}
