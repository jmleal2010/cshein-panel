import { getClient } from "@/config/apollo";
import { LOAD_ORDERS_QUERY } from "@/graphql/queries/order";
import { Order } from "@/interfaces";
import { ITEMS_X_PAGE } from "@/utils/consts";
import React, { Suspense } from "react";
import { OrderTableSkeleton } from "@/components/skeletons";
import { Paginator } from "@/components/navigation";
import { CTable as ClientTable } from "@/components/pages/order";

const getData = async (
  input:
    | {
        page: number;
        pageSize: number;
        status: string;
      }
    | undefined
) => {
  try {
    return await getClient().query({
      query: LOAD_ORDERS_QUERY,
      variables: {
        input,
      },
    });
  } catch (e: any) {
    console.log(e);
  }
};

const getFilterOrders = (orders: Order[], query: string) =>
  orders.filter((order) =>
    order.code.toLowerCase().includes(query.toLowerCase())
  );

const columns = [
  {
    title: "Code",
    field: "code",
    type: "string",
  },
  {
    title: "Service Type",
    field: "serviceType",
    type: "string",
  },
  {
    title: "Status",
    field: "status",
    type: "string",
  },
  {
    title: "Created At",
    field: "createdAt",
    type: "date",
    format: "YYYY-MM-DD HH:mm:ss",
  },
  {
    title: "Updated At",
    field: "updatedAt",
    type: "date",
    format: "YYYY-MM-DD HH:mm:ss",
  },
  {
    title: "Beneficiary",
    field: "beneficiary.firstName",
    type: "string",
  },
];

type TableProps = {
  status: string;
  query?: string;
  currentPage: number;
  popover?: boolean;
};

export async function Table({ status, query, currentPage }: TableProps) {
  const input = {
    page: currentPage,
    pageSize: ITEMS_X_PAGE,
    status: status === "pending" ? "PENDING" : "ACCEPTED",
  };
  let response, data, pageInfo;

  response = await getData(input);

  if (response?.data) {
    data = response?.data.orders.edges;
    pageInfo = response?.data.orders.pageInfo;
  }

  const totalItems = data;
  const items = query ? getFilterOrders(totalItems, query) : totalItems;
  const queryLength =
    items.length / ITEMS_X_PAGE > 1 ? items.length / ITEMS_X_PAGE : 1;
  const totalPages = query ? queryLength : pageInfo.totalPages;

  return (
    totalItems && (
      <React.Fragment>
        <Suspense
          fallback={<OrderTableSkeleton />}
          key={query! + currentPage + totalItems}
        >
          <ClientTable rows={items} columns={columns} showPopover />
        </Suspense>
        <Paginator currentPage={currentPage} totalPages={totalPages} />
      </React.Fragment>
    )
  );
}
