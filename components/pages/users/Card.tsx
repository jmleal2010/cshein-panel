import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";

const bull = (
  <Box
    component="span"
    sx={{ display: "inline-block", mx: "2px", transform: "scale(0.8)" }}
  >
    •
  </Box>
);

export function UserCard({
  user,
}: {
  user?: { fullName: string; email: string; phone: string; verified: boolean };
}) {
  return (
    <Box>
      <Card variant="outlined" sx={{ width: "fit-content" }}>
        <React.Fragment>
          <CardContent sx={{ display: "flex", flexDirection: "column" }}>
            <Typography variant="h6" component="div">
              {user?.fullName}
            </Typography>
            <Typography
              sx={{ fontSize: 14 }}
              color="text.secondary"
              gutterBottom
            >
              {user?.email}
            </Typography>
            <Typography sx={{ mb: 1.5 }}>{user?.phone}</Typography>
            {user?.verified ? (
              <CheckIcon color="success" />
            ) : (
              <CloseIcon color="error" />
            )}
          </CardContent>
          {/* <CardActions>
              <Button size="small" color="error">
                Borrar
              </Button>
              <Button size="small">Editar</Button>
            </CardActions> */}
        </React.Fragment>
      </Card>
    </Box>
  );
}
