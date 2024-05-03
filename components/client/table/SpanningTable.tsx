import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Link from "next/link";
import Image from "next/image";
import { Box } from "@mui/material";
import { BorderAllRounded } from "@mui/icons-material";

const TAX_RATE = 0.07;

function ccyFormat(num: number) {
  return `${num.toFixed(2)}`;
}

function priceRow(qty: number, unit: number) {
  return qty * unit;
}

interface Row {
  desc: string;
  qty: number;
  unit: number;
  price: number;
  img: string;
}

interface Item {
  product: {
    name: string;
    price: number;
    image: string;
    link: string;
  };
  quantity: number;
  // Otras propiedades de Item si las hay
}

function subtotal(items: readonly Row[]) {
  return items.map(({ price }) => price).reduce((sum, i) => sum + i, 0);
}

export default function SpanningTable({ items }: { items: Item[] }) {
  console.log(items);
  const rows2 = items.map((item) => {
    return {
      desc: item.product.name,
      qty: item.quantity,
      unit: item.product.price,
      price: priceRow(item.quantity, item.product.price),
      img: item.product.image,
      link: item.product.link,
    };
  });
  console.log(rows2);
  const invoiceSubtotal = subtotal(rows2);
  const invoiceTaxes = TAX_RATE * invoiceSubtotal;
  const invoiceTotal = invoiceTaxes + invoiceSubtotal;

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="spanning table">
        <TableHead>
          <TableRow>
            <TableCell align="center" colSpan={3}>
              Detalles
            </TableCell>
            <TableCell align="right">Precio</TableCell>
            <TableCell align="right"></TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Desc</TableCell>
            <TableCell align="right">Qty.</TableCell>
            <TableCell align="right">Unit</TableCell>
            <TableCell align="right">Sum</TableCell>
            <TableCell align="right"></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows2.map((row) => (
            <TableRow key={row.desc}>
              <TableCell>
                <Box display="flex" gap={1}>
                  <Image
                    src={row.img}
                    alt="imagen del producto"
                    width={50}
                    height={50}
                    style={{ borderRadius: "15%" }}
                  />
                  <Link href={row.link}>{row.desc}</Link>
                </Box>
              </TableCell>
              <TableCell align="right">{row.qty}</TableCell>
              <TableCell align="right">{row.unit}</TableCell>
              <TableCell align="right">{ccyFormat(row.price)}</TableCell>
              <TableCell align="right">
                <div
                  style={{
                    backgroundColor: "#FFE8CC", // Color de fondo naranja claro
                    border: "1px solid #FFA500", // Borde fino y más oscuro
                    borderRadius: "8px", // Borde redondeado
                    color: "#804000", // Color de texto más oscuro
                    padding: "3px", // Espacio interior
                    fontSize: "0.8em", // Tamaño de fuente
                  }}
                >
                  Pendiente
                </div>
                {/* <div style={{
  backgroundColor: '#DFF0D8', // Color de fondo verde claro
  border: '1px solid #3C763D', // Borde fino y más oscuro
  borderRadius: '8px', // Borde redondeado
  color: '#3C763D', // Color de texto más oscuro
  padding: '3px', // Espacio interior
  fontSize: '0.8em', // Tamaño de fuente
}}>
  Pagado
</div> */}
              </TableCell>
            </TableRow>
          ))}
          <TableRow>
            <TableCell rowSpan={3} />
            <TableCell colSpan={2}>Subtotal</TableCell>
            <TableCell align="right">{ccyFormat(invoiceSubtotal)}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Tax</TableCell>
            <TableCell align="right">{`${(TAX_RATE * 100).toFixed(
              0
            )} %`}</TableCell>
            <TableCell align="right">{ccyFormat(invoiceTaxes)}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell colSpan={2}>Total</TableCell>
            <TableCell align="right">{ccyFormat(invoiceTotal)}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
}
