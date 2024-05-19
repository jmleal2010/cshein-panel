import { Button, CircularProgress } from "@mui/material";
import { changeStatus } from "../../../../actions/changeStatus";
import { startTransition, useState } from "react";
import { usePathname } from "next/navigation";

const OrderStatusSelect = ({
  ignore,
  handleClick,
  setIsLoading,
}: {
  ignore: string;
    handleClick: () => void;
    setIsLoading: (value: boolean) => void;
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
                await changeStatus(status, pathname);
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
