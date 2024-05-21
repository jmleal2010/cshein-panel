import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Divider from "@mui/material/Divider";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

type Info = {
  addressLine1: string;
  city: string;
  country: string;
  postalCode: string;
  state: string;
}


export function AddressInfo({ addressInfo }: { addressInfo: Info }) {
  return (
    <Card className="cshein-card">
      <CardContent>
        <Stack spacing={2} sx={{ alignItems: "center" }}>
          <div>
            <Avatar
              src={"/assets/images/pages/mapa-ciudad-calles.jpg"}
              sx={{ height: "80px", width: "80px" }}
            />
          </div>
          <Stack spacing={1} sx={{ textAlign: "center" }}>
            <Typography variant="h5">{`${addressInfo.city}, ${addressInfo.state}`}</Typography>
            <Typography color="text.secondary" variant="body2">
              {addressInfo.country}
            </Typography>
            <Typography color="text.secondary" variant="body2">
              {addressInfo.addressLine1}
            </Typography>
            <Typography color="text.secondary" variant="body2">
              {addressInfo.postalCode}
            </Typography>
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  );
}
