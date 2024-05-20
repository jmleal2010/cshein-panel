import { AccountDetailsForm } from "@/sections/users/AccountDetailForm";
import { AccountInfo } from "@/sections/users/AccountInfo";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import { Box, Container, Grid, Stack, Typography } from "@mui/material";

const boxStyle = {
  my: 4,
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  gap: 1,
};

export default function Page({
  params: { userId },
}: {
  params: { userId: string };
  }) {
  console.log(userId);
  return (
    <Container sx={{ mt: 5 }} maxWidth="xl">
      <Stack spacing={5}>
        <Box sx={boxStyle} color="#6b7280">
          <ManageAccountsIcon fontSize="large" sx={{ alignSelf: "start" }} />
          <Typography variant="h4" component="h1" align="left" color="#6b7280">
            User
            <Typography
              variant="h5"
              component="span"
              align="left"
              color="#6b7280"
              style={{ marginLeft: 4 }}
            >
              {"#"} {"123456778898"}
            </Typography>
          </Typography>
        </Box>
        <Grid container spacing={3}>
          <Grid lg={4} md={6} xs={12}>
            <AccountInfo />
          </Grid>
          <Grid lg={8} md={6} xs={12}>
            <AccountDetailsForm />
          </Grid>
        </Grid>
      </Stack>
    </Container>
  );
}
