import { getClient } from "@/config/apollo";
import { Order } from "@/interfaces";
import { ITEMS_X_PAGE } from "@/utils/consts";
import React, { Suspense } from "react";
import { OrderTableSkeleton } from "@/components/skeletons";
import { Paginator } from "@/components/navigation";
import { CTable as ClientTable } from "@/components/pages/users";
import { LOAD_USERS_QUERY } from "@/graphql/queries/users";

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
      query: LOAD_USERS_QUERY,
    });
  } catch (e: any) {
    console.log(e);
  }
};

const filterItems = (items: Order[], query: string) => 
   items.filter((item: any) =>
     item.email.toLowerCase().includes(query.toLowerCase())
   );


type TableProps = {
  status: string;
  query?: string;
  currentPage: number;
  popover?: boolean;
};

const columns = [
  {
    title: "Nombre",
    field: "firstName",
    type: "string",
  },
  {
    title: "Apellidos",
    field: "lastName",
    type: "string",
  },
  {
    title: "Movil",
    field: "phone",
    type: "string",
  },
  {
    title: "Email",
    field: "email",
    type: "string",
  },

  {
    title: "Activo",
    field: "active",
    type: "string",
  },
  {
    title: "Teléfono",
    field: "phone",
    type: "string",
  },
];

export async function Table({
  status,
  query,
  currentPage,
}:
TableProps) {
  const input = {
    page: currentPage,
    pageSize: ITEMS_X_PAGE,
    status: status === "pending" ? "PENDING" : "ACCEPTED",
  };
  let response, data, pageInfo;

  response = await getData(input);
  
  if (response?.data) {
    data = response?.data.adminListUsers;
    pageInfo = { totalPages: 10} /* response?.data.orders.pageInfo */;
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
