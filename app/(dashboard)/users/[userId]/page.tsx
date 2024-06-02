import { PageForm } from "@/components/common/PageForm";
import { Box, Container, Grid, Stack, Typography } from "@mui/material";
import { Iconify } from "@/components/common";
import { updateUser } from "@/lib/actions/user";
import { FormPageData } from "@/interfaces/index";
import { FormPageInfo } from "@/components/common/FormPageInfo";
import { PAGE_IMAGES } from "@/utils/consts";

type Props = {
  params: { userId: string };
};

const formData: FormPageData = {
  action: updateUser,
  inputs: [
    {
      type: "text",
      required: true,
      name: "nombre",
      label: "Nombre",
      defaultValue: "Juan",
    },
    {
      type: "text",
      required: true,
      name: "apellidos",
      label: "Apellidos",
      defaultValue: "Miguel",
    },
    {
      type: "email",
      required: true,
      name: "email",
      label: "Email",
      defaultValue: "juancho@gmail",
    },
    {
      type: "tel",
      required: true,
      name: "numero",
      label: "Número",
      defaultValue: "1234567890",
    },
    {
      type: "select",
      required: true,
      name: "role",
      label: "Role",
      defaultValue: "admin",
      options: [
        { value: "admin", label: "Admin" },
        { value: "user", label: "User" },
      ],
    },
    {
      type: "switch",
      required: true,
      name: "notificaciones",
      label: "Notificaciones",
      defaultValue: false,
    },
  ],
};



export default async function Page({ params: { userId } }: Props) {
  const userInfo = {
    title: "Juan Miguel",
    avatarSrc: `${PAGE_IMAGES}/avatar_10.jpg`,
    rest: ["juancho@gmail", "1234567890"],
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
            <FormPageInfo info={userInfo} />
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
