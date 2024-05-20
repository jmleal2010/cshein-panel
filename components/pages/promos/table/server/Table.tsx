import { getClient } from "@/config/apollo";
import { Order } from "@/interfaces";
import { ITEMS_X_PAGE } from "@/utils/consts";
import React, { Suspense } from "react";
import { OrderTableSkeleton } from "@/components/skeletons";
import { Paginator } from "@/components/navigation";
import { CTable as ClientTable } from "@/components/pages/promos";
import { LOAD_PROMOS_QUERY } from "@/graphql/queries/promos";

const getData = async (
  input:
    | {
        active: boolean;
      }
    | undefined
) => {
  try {
    return await getClient().query({
      query: LOAD_PROMOS_QUERY,
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
    item.name.toLowerCase().includes(query.toLowerCase())
  );

type TableProps = {
  status: string;
  query?: string;
  currentPage: number;
  popover?: boolean;
};

const columns = [
  {
    title: "Imagen",
    field: "image",
    type: "image",
  },
  {
    title: "Título",
    field: "title",
    type: "string",
  },
  {
    title: "Código",
    field: "code",
    type: "string",
  },
  {
    title: "Activo",
    field: "active",
    type: "boolean",
  },
  {
    title: "Descuento",
    field: "discount",
    type: "string",
  },
  {
    title: "Descripción",
    field: "description",
    type: "string",
  },
];

export async function Table({ status, query, currentPage }: TableProps) {
  const input = {
    active: true,
  };
  let response, data, pageInfo;

  response = await getData(input);

  if (response?.data) {
    data = response?.data.promos;
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
