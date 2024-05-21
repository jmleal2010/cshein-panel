import { PageForm } from "@/components/common/PageForm";
import { AccountInfo } from "@/sections/users/AccountInfo";
import {
  Box,
  Container,
  Grid,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import { stat } from "fs";
import { User } from "@/interfaces/index";
import { Iconify } from "@/components/common";
import { update } from "lodash";
import { updateUser } from "@/lib/actions/user";
import { action } from "@/theme/palette";
import { FormData } from "@/interfaces/index";



const getUser = (userId: string): User => {
  return {
    firstName: "Juan",
    lastName: "Miguel",
    email: "juancho@gmail",
    phone: "1234567890",
    role: "admin",
    emailNotifications: false,
  };
};

const formData: FormData = {
  action: updateUser,
  inputs: [
    {
      type: "text",
      required: true,
      name: "nombre",
      label:"Nombre",
      defaultValue: "Juan",
    },
    {
      type: "text",
      required: true,
      name: "apellidos",
      label:"Apellidos",
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

export default function Page({
  params: { userId },
}: {
  params: { userId: string };
}) {
  const user = getUser(userId);
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
            Actualizar #{`${user.firstName} ${user.lastName}`}
          </Typography>
        </Box>
        <Grid container gap={5}>
          <Grid lg={4} md={6} xs={12}>
            <AccountInfo user={user} />
          </Grid>
          <Grid lg={7} md={5} xs={12}>
            <PageForm formData={formData} />
          </Grid>
        </Grid>
      </Stack>
    </Container>
  );
}
