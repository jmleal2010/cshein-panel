"use client";

import { useSuspenseQuery } from "@apollo/experimental-nextjs-app-support/ssr";
import Datatable from "@/components/data/Datatable";
import { LOAD_ORDERS_QUERY } from "@/graphql/queries";
import { useRouter } from "next/navigation";
import {routes} from "@/config/consts";

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
  const input = { status: "" };

  /*Hooks*/
  const router = useRouter();

  /*Queries*/
  const { data }: any = useSuspenseQuery(LOAD_ORDERS_QUERY, {
    variables: {
      input,
    },
  });

  /*Functions*/
  const onViewOrder = (id: string) => {
    router.push(`${routes.orders}/${id}`);
  };

  return (
    <div className="-mx-4 mt-24  shadow-lg sm:mx-0 sm:rounded-lg rounded bg-white p-10 ">
      <Datatable
        columns={columns}
        data={data.orders}
        onView={(id: string) => onViewOrder(id)}
      />
    </div>
  );
}
