import { getClient } from "@/lib/client";
import ClientOrderTable from "../clientComponents/Client-Order-Table";
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
    // console.log(data);
  return(
    <ClientOrderTable data = {data}/>
  )
}