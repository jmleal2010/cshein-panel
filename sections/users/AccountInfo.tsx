"use client"
import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Divider from "@mui/material/Divider";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { User } from "@/interfaces/index";
import { useTheme } from "@mui/material/styles";

const userr = {
  name: "Sofia Rivers",
  avatar: "/assets/avatar.png",
  jobTitle: "Senior Developer",
  country: "USA",
  city: "Los Angeles",
  timezone: "GTM-7",
};

export function AccountInfo({ user }: { user: User }) {
  const theme = useTheme();
  return (
    <Card className="cshein-card">
      <CardContent>
        <Stack spacing={2} sx={{ alignItems: "center" }}>
          <div>
            <Avatar
              src={"/assets/images/avatars/avatar_14.jpg"}
              sx={{ height: "80px", width: "80px" }}
            />
          </div>
          <Stack spacing={1} sx={{ textAlign: "center" }}>
            <Typography variant="h5">{`${user.firstName} ${user.lastName}`}</Typography>
            <Typography color="text.secondary" variant="body2">
              {user.role === "admin"
                ? "Administrador"
                : user.role === "driver"
                ? "Driver"
                : "Cliente"}
            </Typography>
            <Typography color="text.secondary" variant="body2">
              {user.email}
            </Typography>
          </Stack>
        </Stack>
      </CardContent>
      <Divider />
      <CardActions>
        <Button fullWidth variant="text">
          Cambiar foto de perfil
        </Button>
      </CardActions>
    </Card>
  );
}
