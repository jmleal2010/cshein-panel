"use client";
import { Search } from "@mui/icons-material";
import {
  Box,
  FormControl,
  InputAdornment,
  InputLabel,
  OutlinedInput,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";
import * as React from "react";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import moment, { Moment } from "moment/moment";

const FilterForm = ({ placeholder }: { placeholder: string }) => {
  /* State */
  const [startDate, setStartDate] = React.useState<Moment | null>(moment());
  const [endDate, setEndDate] = React.useState<Moment | null>(moment());

  /* Consts */
  const WAIT_BETWEEN_CHANGE = 500;
  const searchParams = useSearchParams();

  /* Hooks */
  const { replace } = useRouter();
  const pathname = usePathname();
  const theme = useTheme();
  const isLargeScreen = useMediaQuery(theme.breakpoints.up("md"));

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
            //value={query}
            defaultValue={searchParams.get("query") || ""}
            placeholder={`Buscar ${placeholder}...`}
            onChange={(e) => handleSearch(e.target.value)} //(e) => setQuery(e.target.value)
            startAdornment={
              <InputAdornment position="start">
                {/* <IconButton
                  aria-label="search orders"
                  edge="start"
                  onClick={(e) => handleSearch(query)}
                > */}
                <Search />
                {/* </IconButton> */}
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
    </React.Fragment>
  );
};

export default FilterForm;
