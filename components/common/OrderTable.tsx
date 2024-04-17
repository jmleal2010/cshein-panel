import { getClient } from "@/config/apollo";
import ClientOrderTable from "../client/table/OrderTable";
import { LOAD_ORDERS_QUERY } from "@/graphql/queries";

const ITEMS_X_PAGE = 15;

type Order = {
  __typename: string,
    id: string,
    stage: string,
    status: string,
    total: number,
    code: string,
    createdAt: string,
    deliveryAt: string
}

const input = { status: "" };
const getData = async () => {
  try {
    return await getClient().query({
      query: LOAD_ORDERS_QUERY,
      variables: {
        input,
      },
    });
  } catch (e) {
    console.log(e);
  }
};

const getTotalPages = async (rows:number) => {

  return (Math.ceil(rows/ITEMS_X_PAGE));
}

const getFilterOrders = (orders: Order[], query: string) =>
 orders.filter(order =>
     (order.code.toLowerCase().includes(query.toLowerCase()) )
  )


export default async function OrderTable({query, currentPage}:
  {
    query? : string
    currentPage : number
  }
) {
  const response = await getData();

    const totalOrders = response?.data.orders;

  const orders = query ? getFilterOrders(totalOrders,query) : totalOrders;

    const startIndex = ITEMS_X_PAGE * (currentPage-1); //inidice del primer item de la pagina Actual

    const pageItems = orders?.slice(startIndex, startIndex + ITEMS_X_PAGE); //sacas las filas de la pagina actual

    const totalPages = await getTotalPages(orders.length);

  return totalOrders && <ClientOrderTable rows={pageItems} totalPages = {totalPages}/>
  //  <ClientPagination></ClientPagination>;
}
