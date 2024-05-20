"use client";
import {
  Box,
  Button,
  CircularProgress,
  Fade,
  FormControlLabel,
  IconButton,
  Paper,
  Switch,
  useTheme,
} from "@mui/material";
import React from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import OrderStatusSelect from "./OrderStatusSelect";
import "/theme/palette.js";

const statusTypes = [
  "ACCEPTED",
  "PENDING",
  "OUT_FOR_DELIVERY",
  "PICKED_UP",
  "DELIVERED",
  "CANCELLED",
  "IN_PROGRESS",
];

const OrderStatus = ({
  status,
  checked,
  orderId,
}: {
  status: string;
  checked: boolean;
  orderId: string;
}) => {
  const [isChecked, setIsChecked] = React.useState(checked);
  const [isLoading, setIsLoading] = React.useState(false);
  // const theme = useTheme();

  const handleClick = () => {
    console.log("clicked");
    setIsChecked((prev) => !prev);
  };
  return (
    <Box style={{ position: "relative", display: "flex" }}>
      {isChecked ? (
        <Button
          variant="outlined"
          style={{ height: 30, alignSelf: "center", color: "grey", borderColor: "grey"}}
          size="small"
        >
          {" "}
          {status}
        </Button>
      ) : (
        <Button
          variant="outlined"
          style={{ height: 30, alignSelf: "center" }}
          size="small"
          color={
            status === "ACCEPTED"
              ? "primary"
              : status === "PENDING"
              ? "secondary"
              : status === "OUT_FOR_DELIVERY"
              ? "info"
              : status === "PICKED_UP"
              ? "warning"
              : status === "DELIVERED"
              ? "success"
              : status === "IN_PROGRESS"
              ? "inherit"
              : "error"
          }
        >
          {" "}
          {status}
        </Button>
      )}

      {isLoading ? (
        <CircularProgress
          style={{ marginLeft: 15, width: 25, color: "grey" }}
        />
      ) : (
        <FormControlLabel
          style={{ marginLeft: 15 }}
          control={
            <IconButton onClick={handleClick}>
              <ExpandMoreIcon />
            </IconButton>
          }
          label=""
        />
      )}

      <Fade in={isChecked}>
        <Paper
          style={{
            position: "absolute",
            padding: 5,
            zIndex: 1,
            left: -5,
            top: 42,
            width: "min-content",
            display: "flex",
            flexDirection: "column",
            gap: 4,
          }}
        >
          <OrderStatusSelect
            ignoreStatus={status}
            handleClick={handleClick}
            setIsLoading={setIsLoading}
            orderId={orderId}
            statusTypes={statusTypes}
          />
        </Paper>
      </Fade>
    </Box>
  );
};

export default OrderStatus;
