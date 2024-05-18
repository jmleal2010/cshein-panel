import { getClient } from "@/config/apollo";
import ClientOrderTable from "@/components/pages/order/table/OrderTable/client/Table";
import { LOAD_ORDERS_QUERY } from "@/graphql/queries/order";
import { Order } from "@/interfaces";
import { ITEMS_X_PAGE } from "@/utils/consts";
import React, { Suspense } from "react";
import {OrderTableSkeleton} from "@/components/skeletons";
import {Paginator} from "@/components/navigation";

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

const users = {
  data: [
    {
      firstName: "John",
      lastName: "Doe",
      email: "johndoe@example.com",
      phone: "1234567890",
      verified: true,
    },
    {
      firstName: "Jane",
      lastName: "Smith",
      email: "janesmith@example.com",
      phone: "9876543210",
      verified: false,
    },
    {
      firstName: "Alice",
      lastName: "Johnson",
      email: "alice@email",
      phone: "1234567890",
      verified: true,
    },
    {
      firstName: "Bob",
      lastName: "Brown",
      email: "bobo@email",
      phone: "1234567890",
      verified: false,
    },
    {
      firstName: "Charlie",
      lastName: "White",
      email: "char@email",
      phone: "1234567890",
      verified: true,
    },
    {
      firstName: "David",
      lastName: "Black",
      email: "dave@email",
      phone: "1234567890",
      verified: false,
    },
    {
      firstName: "Eve",
      lastName: "Green",
      email: "eve@email",
      phone: "1234567890",
      verified: true,
    },
    {
      firstName: "Frank",
      lastName: "Blue",
      email: "frank@email",
      phone: "1234567890",
      verified: false,
    },
    {
      firstName: "Grace",
      lastName: "Red",
      email: "grace@email",
      phone: "1234567890",
      verified: true,
    },
    {
      firstName: "Helen",
      lastName: "Yellow",
      email: "helen@email",
      phone: "1234567890",
      verified: false,
    },
    {
      firstName: "Ivy",
      lastName: "Purple",
      email: "ivy@email",
      phone: "1234567890",
      verified: true,
    },
    {
      firstName: "Jack",
      lastName: "Orange",
      email: "jack@email",
      phone: "1234567890",
      verified: false,
    },
    {
      firstName: "Kate",
      lastName: "Violet",
      email: "kate@email",
      phone: "1234567890",
      verified: true,
    },
    {
      firstName: "Liam",
      lastName: "Indigo",
      email: "liam@email",
      phone: "1234567890",
      verified: false,
    },
    {
      firstName: "Mia",
      lastName: "Cyan",
      email: "mia@email",
      phone: "1234567890",
      verified: true,
    },
    {
      firstName: "Nathan",
      lastName: "Azure",
      email: "nathan@email",
      phone: "1234567890",
      verified: false,
    },
    {
      firstName: "Olivia",
      lastName: "Cerulean",
      email: "olivia@email",
      phone: "1234567890",
      verified: true,
    },
    {
      firstName: "Peter",
      lastName: "Sky",
      email: "peter@email",
      phone: "1234567890",
      verified: false,
    },
    {
      firstName: "Quinn",
      lastName: "Ocean",
      email: "quinn@email",
      phone: "1234567890",
      verified: true,
    },
    {
      firstName: "Ryan",
      lastName: "Sea",
      email: "ryan@email",
      phone: "1234567890",
      verified: false,
    },
    {
      firstName: "Samantha",
      lastName: "Aqua",
      email: "samantha@email",
      phone: "1234567890",
      verified: true,
    },
    {
      firstName: "Thomas",
      lastName: "Teal",
      email: "thomas@email",
      phone: "1234567890",
      verified: false,
    },
    {
      firstName: "Ursula",
      lastName: "Turquoise",
      email: "ursula@email",
      phone: "1234567890",
      verified: true,
    },
    {
      firstName: "Victor",
      lastName: "Aquamarine",
      email: "victor@email",
      phone: "1234567890",
      verified: false,
    },
    {
      firstName: "Wendy",
      lastName: "Blue-green",
      email: "wendy@email",
      phone: "1234567890",
      verified: true,
    },
    {
      firstName: "Xander",
      lastName: "Cyan-blue",
      email: "xander@email",
      phone: "1234567890",
      verified: false,
    },
    {
      firstName: "Yvonne",
      lastName: "Cerulean-blue",
      email: "yvonne@email",
      phone: "1234567890",
      verified: true,
    },
    {
      firstName: "Zach",
      lastName: "Azure-blue",
      email: "zach@email",
      phone: "1234567890",
      verified: true,
    },
  ],
  pageInfo: {
    totalPages: 2,
  },
};

export default async function Table({
  type,
  status,
  query,
  currentPage,
  columns,
  icon,
 // iconFunction,
}: {
  type: string;
  status: string;
  query?: string;
  currentPage: number;
  columns: any[];
  icon: any;
  //iconFunction: () => void;
}) {
  const input = {
    page: currentPage,
    pageSize: ITEMS_X_PAGE,
    status: status === "pending" ? "PENDING" : "ACCEPTED",
  };
  let response, data, pageInfo;
  switch (type) {
    case "orders":
      response = await getData(input);
      if (response?.data) {
        data = response?.data.orders.edges;
        pageInfo = response?.data.orders.pageInfo;
      }
      break;
    case "users":
      data = users.data.map((user: any) => {
        return {
          fullName: `${user.firstName} ${user.lastName}`,
          email: user.email,
          phone: user.phone,
          verified: user.verified,
        };
      });
      pageInfo = users.pageInfo;
      break;
    default:
      break;
  }

  const totalOrders = data;
  const orders = query ? getFilterOrders(totalOrders, query) : totalOrders;
  const queryLength =
    orders.length / ITEMS_X_PAGE > 1 ? orders.length / ITEMS_X_PAGE : 1;
  const totalPages = query ? queryLength : pageInfo.totalPages;
  const rows = orders.map((order: any) => [
    order.code,
    order.serviceType,
    order.status,
    order.createdAt,
    order.updatedAt,
    order.beneficiary?.firstName,
  ]);

  return (
    totalOrders && (
      <React.Fragment>
        <Suspense
          fallback={<OrderTableSkeleton />}
          key={query! + currentPage + totalOrders}
        >
          <ClientOrderTable
            rows={orders}
            totalPages={totalPages}
            columns={columns}
            currentPage={currentPage}
            rowIcon={icon}
          />
        </Suspense>
        <Paginator currentPage={currentPage} totalPages={totalPages} />
      </React.Fragment>
    )
  );
}
