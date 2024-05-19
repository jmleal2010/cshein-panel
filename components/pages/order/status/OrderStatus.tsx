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
import { height } from "@fortawesome/free-brands-svg-icons/fa42Group";

const OrderStatus = ({
  status,
  checked,
}: {
  status: string;
  checked: boolean;
}) => {
  const [isChecked, setIsChecked] = React.useState(checked);
  const [isLoading, setIsLoading] = React.useState(false);
  // const theme = useTheme();

  const handleClick = () => {
    setIsChecked((prev) => !prev);
  };
  return (
    <Box style={{ position: "relative", display: "flex" }}>
      <Button
        variant="outlined"
        style={{ height: 30, alignSelf: "center"}}
        size="small"
        color={
          checked ? "info": status === "ACCEPTED" ? "primary" : "error"
        }
      >
        {" "}
        {status}
      </Button>
      {isLoading ? (
        <CircularProgress style={{ marginLeft: 15 , width: 30, color: "grey"}} />
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
            top: 35,
            width: "min-content",
            display: "flex",
            flexDirection: "column",
            gap: 4,
          }}
        >
          <OrderStatusSelect
            ignore={status}
            handleClick={handleClick}
            setIsLoading={setIsLoading}
          />
        </Paper>
      </Fade>
    </Box>
  );
};

export default OrderStatus;
