import { Button, CircularProgress } from "@mui/material";
import { changeStatus } from "@/lib/actions/order";
import { startTransition, useState } from "react";
import { usePathname } from "next/navigation";

const OrderStatusSelect = ({
  ignore,
  handleClick,
  setIsLoading,
  orderId,
}: {
  ignore: string;
  handleClick: () => void;
  setIsLoading: (value: boolean) => void;
  orderId: string;
}) => {
  const pathname = usePathname();
  const orderstatus = ["ACCEPTED", "REJECTED", "PENDING"];

  return (
    <>
      {orderstatus.map((status) => {
        if (status !== ignore) {
          return (
            <Button
              key={status}
              variant="outlined"
              size="small"
              color={status === "ACCEPTED" ? "primary" : "error"}
              // type="submit"
              // name="status"
              // value={status}
              onClick={async (e) => {
                setIsLoading(true);
                changeStatus(status, pathname);
                setIsLoading(false);
                handleClick();
              }}
            >
              {status}
            </Button>
          );
        }
      })}
    </>

    // </form>
  );
};

export default OrderStatusSelect;
