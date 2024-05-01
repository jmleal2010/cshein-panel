import { LOAD_ORDER_QUERY } from "@/graphql/queries";
import * as React from "react";
import Box from "@mui/material/Box";
import {
  Card,
  CardContent,
  CardHeader,
  Collapse,
  Grid,
  ListItemAvatar,
  ListItemText,
  Stack,
  Typography,
} from "@mui/material";
import { getClient } from "@/config/apollo";
import Avatar from "@mui/joy/Avatar";
import { red } from "@mui/material/colors";
import IconButton from "@mui/joy/IconButton";
import { Edit } from "@mui/icons-material";
import OrderHeader from "@/components/common/orderHeader";
import ListItem from "@mui/joy/ListItem";
import { Order } from "@/interfaces";
import { Fragment } from "react";
import OrderItemTable from "@/components/client/table/OrderItemTable";

const activity = [
  { id: 1, type: "creada", date: "7d ago", dateTime: "2023-01-23T10:32" },
  { id: 2, type: "editada", date: "6d ago", dateTime: "2023-01-23T11:03" },
  { id: 3, type: "enviada", date: "6d ago", dateTime: "2023-01-23T11:24" },
  { id: 4, type: "pagada", date: "1d ago", dateTime: "2023-01-24T09:20" },
];

const getOrder = async (params: any) => {
  try {
    return await getClient().query({
      query: LOAD_ORDER_QUERY,
      variables: {
        orderId: params.id,
      },
    });
  } catch (err) {}
};

const Header = async () => {
  return (
    <Box sx={{ flexGrow: 2 }}>
      <Grid
        container
        spacing={{ xs: 2, md: 3 }}
        direction={{
          xs: "row",
          md: "column",
        }}
      ></Grid>
    </Box>
  );
};

export default async function OrderId({ params }: { params: { id: string } }) {
  const response = await getOrder(params);
  const order = response?.data.order || {};

  console.log(order.orderItems[0]);
  let orderItems = order.orderItems.map((item: any) => {
    const { product, quantity } = item;
    return { ...product, quantity };
  });

  return (
    <>
      <OrderHeader order={order} />
      <Box sx={{ flexGrow: 2 }}>
        <Grid
          container
          spacing={{ xs: 2, md: 3 }}
          direction={{
            xs: "row",
            md: "column",
          }}
        >
          <Grid xs={8} sx={{ marginTop: 4 }}>
            <Card elevation={6} className="cshein-card">
              <CardHeader title="Detalles" />
              <CardContent>
                <Stack
                  spacing={{ xs: 2, md: 4 }}
                  direction={{
                    xs: "column",
                    md: "column",
                  }}
                >
                  <OrderItemTable rows={orderItems} />
                </Stack>
              </CardContent>
            </Card>
          </Grid>
          <Grid xs={4}></Grid>
        </Grid>
      </Box>
    </>
  );
}
