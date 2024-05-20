"use client";
import {
  Box,
  Button,
  CircularProgress,
  Fade,
  FormControlLabel,
  IconButton,
  Paper,
} from "@mui/material";
import React from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import "/theme/palette.js";
import { statusTypes } from "@/utils/consts";
import { StatusType } from "@/interfaces";
import { usePathname } from "next/navigation";
import { changeStatus } from "@/lib/actions/order";


type OrderStatusProps = {
  status: string;
  checked: boolean;
  orderId: string;
};

type OrderStatusSelectProps = {
  ignoreStatus: string;
  handleClick: () => void;
  setIsLoading: (value: boolean) => void;
  orderId: string;
  statusTypes: StatusType[];
};


export const OrderStatus = ({ status, checked, orderId }: OrderStatusProps) => {
  const [isChecked, setIsChecked] = React.useState(checked);
  const [isLoading, setIsLoading] = React.useState(false);
 
  const handleClick = () => {
    setIsChecked((prev) => !prev);
  };

  const getStatus = statusTypes.find((s) => s.value === status);
  
  return (
    <Box style={{ position: "relative", display: "flex" }}>
      {isChecked ? (
        <Button
          variant="outlined"
          style={{
            height: 30,
            alignSelf: "center",
            color: "grey",
            borderColor: "grey",
          }}
          size="small"
        >
          {!isLoading ? getStatus!.label : "Cargando..."}
        </Button>
      ) : !isLoading ? (
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
          {!isLoading ? getStatus!.label : "Cargando.."}
        </Button>
      ) : (
        <Button
          variant="outlined"
          style={{
            height: 30,
            alignSelf: "center",
            color: "grey",
            borderColor: "grey",
          }}
          size="small"
        >
          {"Cargando..."}
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
          <StatusSelect
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

export const StatusSelect = ({
  ignoreStatus,
  handleClick,
  setIsLoading,
  orderId,
  statusTypes,
}: OrderStatusSelectProps) => {
  const pathname = usePathname();

  return (
    <>
      {statusTypes.map((status) => {
        if (status.value !== ignoreStatus) {
          return (
            <Button
              key={status.value}
              variant="outlined"
              size="small"
              style={{ minWidth: 150 }}
              onClick={async (e) => {
                setIsLoading(true);
                await changeStatus(status.value, pathname, orderId);
                setTimeout(() => {
                  setIsLoading(false);
                }, 1200);
                handleClick();
              }}
            >
              {status.label}
            </Button>
          );
        }
      })}
    </>
  );
};
