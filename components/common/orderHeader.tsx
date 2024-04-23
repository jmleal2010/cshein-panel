import React from "react";
import { Button, IconButton, Stack, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { Order, orderType } from "@/interfaces";
import { ChevronLeft, Edit, Print } from "@mui/icons-material";
import moment from "moment";
import Chip from "@mui/material/Chip";

const OrderHeader = ({ order }: { order: Order }) => {
  return (
    <Stack
      direction="row"
      alignItems="center"
      justifyContent="space-between"
      spacing={2}
      className="MuiStack-root css-1h4qx8h"
    >
      <Stack
        direction="row"
        alignItems="center"
        spacing={2}
        className="MuiStack-root css-13xiveh"
      >
        <IconButton
          className="MuiButtonBase-root MuiIconButton-root MuiIconButton-sizeMedium css-10ygcul"
          href="/dashboard/order"
        >
          <ChevronLeft />
        </IconButton>
        <Stack
          direction="column"
          alignItems="flex-start"
          spacing={1}
          className="MuiStack-root css-1kkt86i"
        >
          <Stack
            direction="row"
            alignItems="center"
            spacing={1}
            className="MuiStack-root css-hp68mp"
          >
            <Typography
              variant="h6"
              className="MuiTypography-root MuiTypography-h4 css-sko12q"
            >
              Order #{order.code}
            </Typography>
            <Box className="MuiBox-root css-1r7dlkq">
              <Chip color="primary" label={order.status} />
            </Box>
          </Stack>
          <Typography
            sx={{ marginTop: " 0 !important" }}
            variant="subtitle2"
            className="MuiTypography-root MuiTypography-body2 css-j1x1ao"
          >
            {moment(order.createdAt).format("YYYY-MM-DD HH:mm:ss")}
          </Typography>
        </Stack>
      </Stack>
      <Stack direction="row" spacing={1} className="MuiStack-root css-1ubfx2m">
        <IconButton aria-label="delete">
          <Print />
        </IconButton>
        <IconButton aria-label="delete">
          <Edit />
        </IconButton>
      </Stack>
    </Stack>
  );
};

export default OrderHeader;
