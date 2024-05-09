import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

const bull = (
  <Box
    component="span"
    sx={{ display: "inline-block", mx: "2px", transform: "scale(0.8)" }}
  >
    •
  </Box>
);



export default function UserCard({ user }:
    { user: { name: string; email: string; phone: string; verified: boolean } }
) {
  return (
    <Box sx={{ minWidth: 275, width: "max-content"}}>
          <Card variant="outlined">
              <React.Fragment>
    <CardContent>
      <Typography variant="h6" component="div">
       Juan miguel perez
      </Typography>
      <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
        juanmi@gmail.com
      </Typography>
      <Typography sx={{ mb: 1.5 }}>
        1234566789
      </Typography>
      <Typography variant="body2">
        verified
      </Typography>
    </CardContent>
    <CardActions>
      <Button size="small" color="error">
        Borrar
      </Button>
      <Button size="small">Editar</Button>
    </CardActions>
  </React.Fragment>
      </Card>
    </Box>
  );
}
