import { getClient } from "@/config/apollo";
import { Order } from "@/interfaces";
import { ITEMS_X_PAGE } from "@/utils/consts";
import React, { Suspense } from "react";
import { OrderTableSkeleton } from "@/components/skeletons";
import { Paginator } from "@/components/navigation";
import { CTable as ClientTable } from "@/components/pages/addresses";
import { LOAD_PICKUP_ORDERS_QUERY } from "@/graphql/queries/pickupOrders";

const getData = async (
  input:
    | {
        status: string;
      }
    | undefined
) => {
  try {
    return await getClient().query({
      query: LOAD_PICKUP_ORDERS_QUERY,
      variables: {
        input,
      },
    });
  } catch (e: any) {
    console.log(e);
  }
};

const filterItems = (items: Order[], query: string) =>
  items.filter((item: any) =>
    item.addressLine1.toLowerCase().includes(query.toLowerCase())
  );

type TableProps = {
  status: string;
  query?: string;
  currentPage: number;
  popover?: boolean;
};

const columns = [
  {
    title: "Dirección 1",
    field: "addressLine1",
    type: "image",
  },
  {
    title: "Dirección 2",
    field: "addressLine2",
    type: "string",
  },
  {
    title: "Ciudad",
    field: "city",
    type: "string",
  },
  {
    title: "País",
    field: "country",
    type: "boolean",
  },
  {
    title: "Descripción",
    field: "description",
    type: "string",
  },
  {
    title: "Predeterminado",
    field: "isDefault",
    type: "string",
  },
  {
    title: "Código Postal",
    field: "postalCode",
    type: "string",
  },
];

export async function Table({ status, query, currentPage }: TableProps) {
  const input = {
    status: "DELIVERED",
  };
  let response, data, pageInfo;

  response = await getData(input);

  console.log(response)
  if (response?.data) {
    data = response?.data.pickupOrders;
    console.log(data)
    pageInfo = { totalPages: 10 } /* response?.data.orders.pageInfo */;
  }

  const totalItems = data;
  const items = query ? filterItems(totalItems, query) : totalItems;
  const queryLength =
    items.length / ITEMS_X_PAGE > 1 ? items.length / ITEMS_X_PAGE : 1;
  const totalPages = query ? queryLength : pageInfo!.totalPages;

  return (
    totalItems && (
      <React.Fragment>
        <Suspense
          fallback={<OrderTableSkeleton />}
          key={query! + currentPage + totalItems}
        >
          <ClientTable rows={items} columns={columns} showPopover />
        </Suspense>
        {/* <Paginator currentPage={currentPage} totalPages={totalPages} /> */}
      </React.Fragment>
    )
  );
}
