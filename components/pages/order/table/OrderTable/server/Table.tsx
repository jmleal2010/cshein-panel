import { getClient } from "@/config/apollo";
import ClientOrderTable from "@/components/pages/order/table/OrderTable/client/Table";
import { LOAD_ORDERS_QUERY } from "@/graphql/queries";
import { Order } from "@/interfaces";
import { usePathname } from "next/navigation";
import { format } from "path";

const ITEMS_X_PAGE = 5;

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

const getTotalPages = async (rows: number) => {
  return Math.ceil(rows / ITEMS_X_PAGE);
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

export default async function Table({
  status,
  query,
  currentPage,
}: {
  status: string;
  query?: string;
  currentPage: number;
}) {
  const input = {
    page: currentPage,
    pageSize: ITEMS_X_PAGE,
    status: status === "pending" ? "PENDING" : "ACCEPTED",
  };

  const response = await getData(input);

  let data, pageInfo;

  if (response?.data) {
    data = response?.data.orders.edges;
    pageInfo = response?.data.orders.pageInfo;
  }
  const totalOrders = data;
  const orders = query ? getFilterOrders(totalOrders, query) : totalOrders;
  const startIndex = ITEMS_X_PAGE * (pageInfo.currentPage - 1);
  // const pageItems = orders?.slice(startIndex, startIndex + ITEMS_X_PAGE);
  // const pageItems = orders;
  const totalPages = pageInfo.totalPages;

  return (
    totalOrders && (
      <ClientOrderTable
        rows={orders}
        totalPages={totalPages}
        columns={columns}
        currentPage={currentPage}
      />
    )
  );
}
