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

export default async function OrderTable() {
    const response = await getData();

    const data = response?.data || {};

  return data && (
   <ClientOrderTable rows = {data.orders}/>
  )
}
