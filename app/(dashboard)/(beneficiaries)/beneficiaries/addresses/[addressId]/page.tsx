import * as React from "react";
import { getClient } from "@/config/apollo";
import { LOAD_ADDRESS_QUERY } from "@/graphql/queries/addresses";
import { FormPageData } from "@/interfaces";
import { usaStates } from "@/utils/data";
import { updateAddress } from "@/lib/actions/address";
import { Box, Container, Grid, Stack, Typography } from "@mui/material";
import { Iconify } from "@/components/common";
import { FormPageInfo } from "@/components/common/FormPageInfo";
import { PageForm } from "@/components/common/PageForm";

type Props = {
  params: { addressId: string };
};

type Address = {
  id: string;
  userId: string;
  state: string;
  postalCode: string;
  longitude: string;
  latitude: string;
  isDefault: boolean;
  description: string;
  country: string;
  city: string;
  addressLine1: string;
  addressLine2: string;
};

const getData = async (input: {}) => {
  try {
    return await getClient().query({
      query: LOAD_ADDRESS_QUERY,
      variables: {
        input,
      },
    });
  } catch (e: any) {
    console.log(e);
  }
};

export default async function Page({ params: { addressId } }: Props) {
  const response: any = await getData({ id: addressId });
  const address: Address = response?.data?.address;
  const formData: FormPageData = {
    action: updateAddress,
    inputs: [
      {
        type: "text",
        required: true,
        name: "addressLine1",
        label: "Dirección 1",
        defaultValue: address.addressLine1,
      },
      {
        type: "text",
        required: false,
        name: "addressLine2",
        label: "Dirección 2",
        defaultValue: address.addressLine2,
      },
      {
        type: "text",
        required: true,
        name: "city",
        label: "Ciudad",
        defaultValue: address.city,
      },
      {
        type: "autocomplete",
        required: true,
        name: "state",
        label: "Estado",
        defaultValue: address.state,
        options: usaStates,
      },
      {
        type: "text",
        required: true,
        name: "country",
        label: "País",
        defaultValue: address.country,
      },
      {
        type: "textarea",
        required: true,
        name: "description",
        label: "Descripción",
        defaultValue: address.description,
      },
      {
        type: "text",
        required: true,
        name: "postalCode",
        label: "Código Postal",
        defaultValue: address.postalCode,
      },
      {
        type: "number",
        required: false,
        name: "latitude",
        label: "Latitud",
        defaultValue: address.postalCode,
      },
      {
        type: "number",
        required: false,
        name: "longitude",
        label: "Longitud",
        defaultValue: address.postalCode,
      },

      {
        type: "switch",
        required: true,
        name: "isDefault",
        label: "Predeterminado",
        defaultValue: address.isDefault,
      },
    ],
  };
  const addressInfo = {
    title: `${address.city} ${address.state}`,
    avatarSrc: "/assets/images/pages/mapa-ciudad-calles.jpg",
    rest: [address.country, address.addressLine1, address.postalCode],
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
           <FormPageInfo info={addressInfo} />
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
