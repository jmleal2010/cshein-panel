
import { FormPageData } from "@/interfaces/index";
import { getClient } from "@/config/apollo";
import { LOAD_PICKUP_ORDER_QUERY } from "@/graphql/queries/pickupOrders";
import { usaStates } from "@/utils/data";
import { PAGE_IMAGES } from "@/utils/consts";
import { Alert, Box, Container, Grid, Stack, Typography } from "@mui/material";
import { Iconify } from "@/components/common";
import { FormPageInfo } from "@/components/common/FormPageInfo";
import { PageForm } from "@/components/common/PageForm";

type Props = {
  params: { pickupId: string };
};

type PickUpOrder = {
  id: string;
  userId: string;
  description: string;
  addressLine1: string;
  addressLine2: string;
  city: string;
  state: string;
  country: string;
  postalCode: string;
  latitude: string;
  longitude: string;
  isDefault: boolean;

}


const getData = async (input: {}) => {
  try {
    return await getClient().query({
      query: LOAD_PICKUP_ORDER_QUERY,
      variables: {
        input,
      },
    });
  } catch (e: any) {
    console.log(e);
  }
};



export default async function Page({ params: { pickupId } }: Props) {
  const response: any = await getData({ id: pickupId });
  const pickUpOrder: PickUpOrder = response?.data?.address;
  const formData: FormPageData = {
    action: "updateOrder",
    inputs: [
      {
        type: "text",
        required: true,
        name: "addressLine1",
        label: "Dirección 1",
        defaultValue: pickUpOrder.addressLine1,
      },
      {
        type: "text",
        required: false,
        name: "addressLine2",
        label: "Dirección 2",
        defaultValue: pickUpOrder.addressLine2,
      },
      {
        type: "text",
        required: true,
        name: "city",
        label: "Ciudad",
        defaultValue: pickUpOrder.city,
      },
      {
        type: "autocomplete",
        required: true,
        name: "state",
        label: "Estado",
        defaultValue: pickUpOrder.state,
        options: usaStates,
      },
      {
        type: "text",
        required: true,
        name: "country",
        label: "País",
        defaultValue: pickUpOrder.country,
      },
      {
        type: "text",
        required: true,
        name: "postalCode",
        label: "Código Postal",
        defaultValue: pickUpOrder.postalCode,
      },
      {
        type: "text",
        required: true,
        name: "latitude",
        label: "Latitud",
        defaultValue: pickUpOrder.latitude,
      },
      {
        type: "text",
        required: true,
        name: "longitude",
        label: "Longitud",
        defaultValue: pickUpOrder.longitude,
      },
      {
        type: "switch",
        required: true,
        name: "isDefault",
        label: "Es Default",
        defaultValue: pickUpOrder.isDefault,
      },
    ],
  };

  const pickUpInfo = {
    title: `${pickUpOrder.id}`,
    avatarSrc: `${PAGE_IMAGES}/pickup-order.jpg`,
    rest: [ pickUpOrder.city, pickUpOrder.country, pickUpOrder.description],
  };
 return (
   <Container sx={{ mt: 5 }} maxWidth="xl">
    

     <Stack spacing={5}>
       <Box
         sx={{
           my: 4,
           display: "flex",
           flexDirection: "row",
           alignItems: "center",
           gap: 1,
         }}
         color="#6b7280"
       >
         <Iconify icon="mdi:account-cog-outline" width={30} />
         <Typography variant="h4" component="h1" align="left" color="#6b7280">
           Actualizar Direccion
         </Typography>
       </Box>
       <Grid container gap={5}>
         <Grid lg={4} md={6} xs={12}>
           <FormPageInfo info={pickUpInfo} />
         </Grid>
         <Grid lg={7} md={5} xs={12}>
           <PageForm
             formPageData={formData}
           />
         </Grid>
       </Grid>
     </Stack>
   </Container>
 );
}
