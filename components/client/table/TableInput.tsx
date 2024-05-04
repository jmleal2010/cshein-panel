"use client";
import { Search } from "@mui/icons-material"
import { Box, FormControl, InputAdornment, InputLabel, OutlinedInput } from "@mui/material"
import { DatePicker } from "@mui/x-date-pickers";
import { usePathname, useSearchParams,useRouter } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";

const TableInput = () => {
    const WAIT_BETWEEN_CHANGE = 1000;
    const searchParams = useSearchParams();
    const { replace } = useRouter();
    const pathname = usePathname();

    const handleSearch =  useDebouncedCallback((value: string) => {
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
        <Box>
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
            placeholder="Buscar ordenes..."
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
        //   value={startDate}
        //   onChange={(newValue) => setStartDate(newValue)}
        />
        <DatePicker
          className="datepicker"
          label="Fecha Fin"
        //   value={endDate}
        //   onChange={(newValue) => setEndDate(newValue)}
        />
        </Box>

    )
}

export default TableInput;