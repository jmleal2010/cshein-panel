import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Divider from "@mui/material/Divider";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

type Props = {
  info: {
    title: string;
    avatarSrc: string;
    rest: string[]
  }
}


export function FormPageInfo({ info }: Props) {
  return (
    <Card className="cshein-card">
      <CardContent>
        <Stack spacing={2} sx={{ alignItems: "center" }}>
          <div>
            <Avatar
              src={info.avatarSrc}
              sx={{ height: "80px", width: "80px" }}
            />
          </div>
          <Stack spacing={1} sx={{ textAlign: "center" }}>

            <Typography variant="h5">{info.title}</Typography>
            {info.rest.map((elem, index) => (
              <Typography key={index} color="text.secondary" variant="body2">
                {elem}
              </Typography>
            ))}

          </Stack>
        </Stack>
      </CardContent>
    </Card>
  );
}
