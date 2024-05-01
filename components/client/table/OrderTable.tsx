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
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import moment, { Moment } from "moment";
import { height } from "@fortawesome/free-brands-svg-icons/fa42Group";

const WAIT_BETWEEN_CHANGE = 1000;

export default function OrderTable({
  rows,
  totalPages,
}: {
  rows: any;
  totalPages: number;
}) {
  const [startDate, setStartDate] = React.useState<Moment | null>(moment());
  const [endDate, setEndDate] = React.useState<Moment | null>(moment());
  const [query, setQuery] = React.useState<string>("");
  const [rowsPerPage, setRowsPerPage] = React.useState<number>(10);
  const [page, setPage] = React.useState<number>(0);
  const [selected, setSelected] = React.useState<readonly string[]>([]);
  const [open, setOpen] = React.useState(false);
  const searchParams = useSearchParams();
  const { replace } = useRouter();
  const pathname = usePathname();
  const currentPage = Number(searchParams.get("page")) || 1;

  /*Hooks*/
  const router = useRouter();

  /*Functions*/
  const onViewOrder = (id: string) => {
    console.log(id);
    router.push(`${routes.orders}/${id}`);
  };

  const renderFilters = () => (
    <React.Fragment>
      <FormControl size="sm">
        <FormLabel>Status</FormLabel>
        <Select
          size="sm"
          placeholder="Filter by status"
          slotProps={{ button: { sx: { whiteSpace: "nowrap" } } }}
        >
          <Option value="paid">Paid</Option>
          <Option value="pending">Pending</Option>
          <Option value="refunded">Refunded</Option>
          <Option value="cancelled">Cancelled</Option>
        </Select>
      </FormControl>
      <FormControl size="sm">
        <FormLabel>Category</FormLabel>
        <Select size="sm" placeholder="All">
          <Option value="all">All</Option>
          <Option value="refund">Refund</Option>
          <Option value="purchase">Purchase</Option>
          <Option value="debit">Debit</Option>
        </Select>
      </FormControl>
      <FormControl size="sm">
        <FormLabel>Customer</FormLabel>
        <Select size="sm" placeholder="All">
          <Option value="all">All</Option>
          <Option value="olivia">Olivia Rhye</Option>
          <Option value="steve">Steve Hampton</Option>
          <Option value="ciaran">Ciaran Murray</Option>
          <Option value="marina">Marina Macdonald</Option>
          <Option value="charles">Charles Fulton</Option>
          <Option value="jay">Jay Hoper</Option>
        </Select>
      </FormControl>
    </React.Fragment>
  );

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
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const createPageURL = (page: number) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", page.toString());
    return `${pathname}?${params}`;
  };

  const visibleRows = React.useMemo(
    () => rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage),
    [rows, page, rowsPerPage]
  );

  const theme = useTheme();
  const isLargeScreen = useMediaQuery(theme.breakpoints.up("md"));

  return (
    <React.Fragment>
      <Box
        display="flex"
        flexDirection={isLargeScreen ? "row" : "column"}
        alignItems="center"
        alignContent="center"
        component="form"
        sx={{
          "& .MuiTextField-root": { m: 1, width: "25ch" },
        }}
        noValidate
        autoComplete="off"
      >
        <FormControl
          sx={{ m: 1, width: "25ch" }}
          variant="outlined"
          size="small"
        >
          <InputLabel htmlFor="outlined-adornment-search">Búsqueda</InputLabel>
          <OutlinedInput
            id="outlined-adornment-search"
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            startAdornment={
              <InputAdornment position="start">
                <IconButton
                  aria-label="search orders"
                  edge="start"
                  onClick={(e) => handleSearch(query)}
                >
                  <Search />
                </IconButton>
              </InputAdornment>
            }
            label="Búsqueda"
          />
        </FormControl>
        <DatePicker
          className="datepicker"
          label="Fecha de inicio"
          value={startDate}
          onChange={(newValue) => setStartDate(newValue)}
        />
        <DatePicker
          className="datepicker"
          label="Fecha Fin"
          value={endDate}
          onChange={(newValue) => setEndDate(newValue)}
        />

        {/* <OrderList /> */}
      </Box>
      <TableContainer elevation={0} component={Paper} style={{ marginTop: 25 }}>
        <Table sx={{ minWidth: 650 }} aria-label="order table" size="small">
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell align="right" color="gray">
                <Typography component="h1" variant="h5"></Typography>
              </TableCell>
              <TableCell align="right">Status</TableCell>
              <TableCell align="right">Created at</TableCell>
              <TableCell align="right">Delivery at</TableCell>
              <TableCell align="right"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {visibleRows.map((row: any, index: number) => (
              <TableRow
                key={index}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.code}
                </TableCell>
                <TableCell align="right">{row.stage}</TableCell>
                <TableCell align="right">{row.status}</TableCell>
                <TableCell align="right">{row.createdAt}</TableCell>
                <TableCell align="right">{row.deliveryAt}</TableCell>
                <TableCell align="right">
                  <IconButton
                    size="small"
                    color="primary"
                    onClick={() => onViewOrder(row.id)}
                  >
                    <Visibility />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </React.Fragment>
  );
}
