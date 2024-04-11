import React from 'react';
import {Button, IconButton, Stack, Typography} from '@mui/material';
import {Box} from '@mui/system';
import {Order, orderType} from "@/interfaces";
import {ChevronLeft} from "@mui/icons-material";

const OrderItem = ({order}: { order:Order }) => {
    return (
        <Stack direction="row" alignItems="center" justifyContent="space-between" spacing={2} className="MuiStack-root css-1h4qx8h">
            <Stack direction="row" alignItems="center" spacing={2} className="MuiStack-root css-13xiveh">
                <IconButton className="MuiButtonBase-root MuiIconButton-root MuiIconButton-sizeMedium css-10ygcul"
                            href="/dashboard/order">
                  <ChevronLeft />
                    </svg>
                </IconButton>
                <Stack direction="column" alignItems="flex-start" spacing={1} className="MuiStack-root css-1kkt86i">
                    <Stack direction="row" alignItems="center" spacing={1} className="MuiStack-root css-hp68mp">
                        <Typography variant="h4" className="MuiTypography-root MuiTypography-h4 css-sko12q">Order
                            #6011</Typography>
                        <Box className="MuiBox-root css-1r7dlkq">completed</Box>
                    </Stack>
                    <Typography variant="body2" className="MuiTypography-root MuiTypography-body2 css-j1x1ao">07 Apr
                        2024 4:29 PM</Typography>
                </Stack>
            </Stack>
            <Stack direction="row" spacing={1} className="MuiStack-root css-1ubfx2m">
                <Button variant="outlined" size="medium"
                        className="MuiButtonBase-root MuiButton-root MuiButton-outlined MuiButton-outlinedInherit MuiButton-sizeMedium MuiButton-outlinedSizeMedium MuiButton-colorInherit MuiButton-disableElevation css-p9fww6">completed</Button>
                <Button variant="outlined" size="medium"
                        className="MuiButtonBase-root MuiButton-root MuiButton-outlined MuiButton-outlinedInherit MuiButton-sizeMedium MuiButton-outlinedSizeMedium MuiButton-colorInherit MuiButton-disableElevation css-1ioq8no">Print</Button>
                <Button variant="contained" size="medium"
                        className="MuiButtonBase-root MuiButton-root MuiButton-contained MuiButton-containedInherit MuiButton-sizeMedium MuiButton-containedSizeMedium MuiButton-colorInherit MuiButton-disableElevation css-3h2xnl">Edit</Button>
            </Stack>
        </Stack>
    );
}

export default OrderItem;
