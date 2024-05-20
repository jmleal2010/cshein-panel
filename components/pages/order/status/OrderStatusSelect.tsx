import { Button } from "@mui/material";

import { usePathname } from "next/navigation";
import { changeStatus } from "@/lib/actions/order";

const OrderStatusSelect = ({
  ignoreStatus,
  handleClick,
  setIsLoading,
  orderId,
  statusTypes,
}: {
  ignoreStatus: string;
  handleClick: () => void;
  setIsLoading: (value: boolean) => void;
    orderId: string;
    statusTypes: string[];
}) => {
  const pathname = usePathname();
 

  return (
    <>
      {statusTypes.map((status) => {
        if (status !== ignoreStatus) {
          return (
         
            <Button
              key={status}
              variant="outlined"
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
              onClick={async (e) => {
                setIsLoading(true);
                await changeStatus(status, pathname, orderId);
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
