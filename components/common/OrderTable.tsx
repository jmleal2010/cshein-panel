import { getClient } from "@/config/apollo";
import ClientOrderTable from "../client/table/OrderTable";
import { LOAD_ORDERS_QUERY } from "@/graphql/queries";

const input = {status: ""};
const getData = async () =>{

  try{
    return await getClient().query({
      query: LOAD_ORDERS_QUERY,
      variables:{
          input,
      }
    })
  }catch(e){
    console.log(e);
  }
}

const getTotalPages = async () => {
  //query para traer total pages?
  return 3;
}

export default async function OrderTable({query, currentPage}:
  {
    query? : string
    currentPage? : number
  }
) {
    const response = await getData();
    const totalPages = await getTotalPages() || 1;

    const data = response?.data || {};
    // console.log(query,currentPage);

  return data && (
   <ClientOrderTable rows = {data.orders} totalPages = {totalPages}/>
  //  <ClientPagination></ClientPagination>
  )
}
