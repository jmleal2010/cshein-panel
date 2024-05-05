import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import {
  Button,
  Typography,
} from "@mui/material";
import moment from "moment";

const TAX_RATE = 0.07;

function ccyFormat(num: number) {
  return `${num.toFixed(2)}`;
}

function priceRow(qty: number, unit: number) {
  return qty * unit;
}

interface Package {
  code: string;
  content: string;
  id: string;
  isFragile: string;
  orderId: string;
  size: string;
  type: string;
  weight: number;
}

function subtotal(items: readonly any[]) {
  return items.map(({ weight }) => weight).reduce((sum, i) => sum + i, 0);
}

const columns = [
  {
    title: "Code",
    field: "code",
    type: "string",
  },
  {
    title: "Contenido",
    field: "content",
    type: "string",
  },
  {
    title: "Fecha ordenado",
    field: "createdAt",
    type: "date",
    format: "DD/MM/YYYY HH:mm:ss",
  },
  {
    title: "Fecha entregado",
    field: "deliveredAt",
    type: "date",
    format: "DD/MM/YYYY HH:mm:ss",
  },
  {
    title: "Type",
    field: "type",
    type: "category",
  },
  {
    title: "Peso (lb)",
    field: "weight",
    type: "string",
  },
  {
    title: "Tamaño",
    field: "size",
    type: "string",
  },
];

const getCategory = (category: string) => {
  switch (category) {
    case "FOOD_MEDICINE":
      return "MEDICINA Y ALIMENTOS";
    case "DELIVERED":
      return "success";
    case "REJECTED":
      return "error";
    default:
      return "POR DEFECTO";
  }
};
export default function PackageTable({ items }: { items: Package[] }) {

  const invoiceSubtotal = subtotal(items);
  const invoiceTaxes = TAX_RATE * invoiceSubtotal;
  const invoiceTotal =  invoiceSubtotal;

  return (
    <React.Fragment>
      <TableContainer elevation={0} component={Paper} className="cshein-card">
        <Table sx={{ minWidth: 650 }} aria-label="order table" size="small">
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
            </TableRow>
          </TableHead>
          <TableBody>
            {items.map((row: any, index: number) => (
              <TableRow
                key={index}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                {columns.map((column, index) => (
                  <TableCell
                    align="center"
                    key={index}
                    sx={{
                      py: 1,
                      px: 0,
                    }}
                  >
                    {column.type === "date" ? (
                      moment(row[column.field]).format(column.format)
                    ) : column.field === "status" ? (
                      <Button>{row[column.field]}</Button>
                    ) : column.type === "category" ? (
                      getCategory(row[column.field])
                    ) : column.type === "string" ? (
                      column.field
                        .split(".")
                        .reduce((acc: any[], part: any) => acc[part], row)
                    ) : null}
                  </TableCell>
                ))}
              </TableRow>
            ))}
            <TableRow>
              <TableCell rowSpan={3} colSpan={4} sx={{pt:4, border:'none'}}/>
              <TableCell colSpan={2} sx={{pt:4}}>Subtotal</TableCell>
              <TableCell align="right"  sx={{pt:4}}>{ccyFormat(invoiceSubtotal)}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell colSpan={2} style={{border: 'none'}}>Total</TableCell>
              <TableCell align="right" style={{border:'none'}}>{ccyFormat(invoiceTotal)}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </React.Fragment>
  );
}
