"use client";
import * as React from "react";
import Avatar from "@mui/joy/Avatar";
import Chip from "@mui/joy/Chip";
import Divider from "@mui/joy/Divider";
import Link from "@mui/joy/Link";
import Input from "@mui/joy/Input";
import Modal from "@mui/joy/Modal";
import ModalDialog from "@mui/joy/ModalDialog";
import ModalClose from "@mui/joy/ModalClose";
import Sheet from "@mui/joy/Sheet";
import Checkbox from "@mui/joy/Checkbox";
import IconButton, { iconButtonClasses } from "@mui/joy/IconButton";
import Typography from "@mui/joy/Typography";
import Menu from "@mui/joy/Menu";
import MenuButton from "@mui/joy/MenuButton";
import MenuItem from "@mui/joy/MenuItem";
import Dropdown from "@mui/joy/Dropdown";

import FilterAltIcon from "@mui/icons-material/FilterAlt";
import SearchIcon from "@mui/icons-material/Search";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import CheckRoundedIcon from "@mui/icons-material/CheckRounded";
import BlockIcon from "@mui/icons-material/Block";
import AutorenewRoundedIcon from "@mui/icons-material/AutorenewRounded";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import MoreHorizRoundedIcon from "@mui/icons-material/MoreHorizRounded";
import Image from "next/image";
import { routes } from "@/config/consts";
import { usePathname,useRouter , useSearchParams} from "next/navigation";
import { useSuspenseQuery } from "@apollo/experimental-nextjs-app-support/ssr";
import { LOAD_ORDERS_QUERY } from "@/graphql/queries";
import { Simulate } from "react-dom/test-utils";
import input = Simulate.input;
import moment from "moment";
import { Order as oType, orderType } from "@/interfaces";

import { useDebouncedCallback } from "use-debounce";
import { Box, Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from "@mui/material";

const WAIT_BETWEEN_CHANGE = 1000;



export default function OrderTable({ rows,
  totalPages,
}: {rows : any;
  totalPages: number;
}) {
  const [order, setOrder] = React.useState<any>("desc");
  const [selected, setSelected] = React.useState<readonly string[]>([]);
  const [open, setOpen] = React.useState(false);
  const searchParams = useSearchParams();
  const { replace } = useRouter();
  const pathname = usePathname();
  const currentPage = Number(searchParams.get("page")) || 1;


  /*Hooks*/
  const router = useRouter();

  console.log(rows)
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

  const createPageURL = (page: number) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", page.toString());
    return `${pathname}?${params}`;
  };

  const handlePage = (page: number) => {
    router.push(createPageURL(page));
  };

  return (
    <React.Fragment>
      <Box
        component="form"
        sx={{
          "& .MuiTextField-root": { m: 1, width: "25ch" },
        }}
        noValidate
        autoComplete="off"
      >
        <div>
          <TextField
            size="small"
            required
            id="outlined-required"
            label="Required"
            defaultValue="Hello World"
          />
          <TextField
            size="small"
            required
            id="outlined-required"
            label="Required"
            defaultValue="Hello World"
          />
        </div>

        {/* <OrderList /> */}
      </Box>
     
    </React.Fragment>
  );
}
