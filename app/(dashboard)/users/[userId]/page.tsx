import { AccountDetailsForm } from "@/sections/users/AccountDetailForm";
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

const boxStyle = {
  my: 4,
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  gap: 1,
};

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

export default function Page({
  params: { userId },
}: {
  params: { userId: string };
}) {
  const user = getUser(userId);
  return (
    <Container sx={{ mt: 5 }} maxWidth="xl">
      <Stack spacing={5}>
        <Box sx={boxStyle} color="#6b7280">
          <Iconify icon="mdi:account-cog-outline" width={30} />
          <Typography variant="h4" component="h1" align="left" color="#6b7280">
            Actualizar #
            {`${user.firstName} ${user.lastName}`}
          </Typography>
        </Box>
        <Grid container gap={5}>
          <Grid lg={4} md={6} xs={12}>
            <AccountInfo user={user}  />
          </Grid>
          <Grid lg={7} md={5} xs={12}>
            <AccountDetailsForm user={user} />
          </Grid>
        </Grid>
      </Stack>
    </Container>
  );
}
