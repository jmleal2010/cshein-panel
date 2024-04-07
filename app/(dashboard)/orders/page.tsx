"use client";

import {useSuspenseQuery} from "@apollo/experimental-nextjs-app-support/ssr";
import {LOAD_ORDERS_QUERY} from "@/graphql/queries";
import {useRouter} from "next/navigation";
import {routes} from "@/config/consts";
import Box from "@mui/joy/Box";
import Typography from "@mui/joy/Typography";
import Button from "@mui/joy/Button";
import DownloadRoundedIcon from "@mui/icons-material/DownloadRounded";
import OrderTable from "@/components/common/OrderTable";
import OrderList from "@/components/common/OrderList";
import * as React from "react";
import {Fragment} from "react";

const columns = [
    {
        name: "stage",
        title: "Stage ",
    },
    {
        name: "status",
        title: "Status",
    },
    {
        name: "code",
        title: "Code",
    },
    {
        name: "createdAt",
        title: "Fecha creada",
    },
    {
        name: "deliveryAt",
        title: "Fecha entrega",
    },
    {
        name: "",
        title: "Operaciones",
    },
];

export default function OrdersPage() {
    const input = {status: ""};

    /*Hooks*/
    const router = useRouter();

    /*Queries*/
    const {data}: any = useSuspenseQuery(LOAD_ORDERS_QUERY, {
        variables: {
            input,
        },
    });

    /*Functions*/
    const onViewOrder = (id: string) => {
        router.push(`${routes.orders}/${id}`);
    };

    return (
        <Fragment>
            <Box
                sx={{
                    display: 'flex',
                    mb: 1,
                    gap: 1,
                    flexDirection: { xs: 'column', sm: 'row' },
                    alignItems: { xs: 'start', sm: 'center' },
                    flexWrap: 'wrap',
                    justifyContent: 'space-between',
                }}
            >
                <Typography level="h2" component="h1">
                    Orders
                </Typography>
                <Button
                    color="primary"
                    startDecorator={<DownloadRoundedIcon />}
                    size="sm"
                >
                    Download PDF
                </Button>
            </Box>
            <OrderTable />
            <OrderList />
        </Fragment>
    );
}
