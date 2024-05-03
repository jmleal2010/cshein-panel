import React from 'react';
import { Grid, Typography, Button } from '@mui/material';

const OrderHistory = ({ orderId, orderTime, paymentTime, deliveryTime, completionTime, onPrint, onEdit }: any) => {
  return (
    <Grid container sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', padding: 16 }}>
      <Grid item xs={12}>
        <Typography variant="h6" sx={{ fontSize: 18, fontWeight: 600 }}>
          Order #{orderId}
        </Typography>
      </Grid>

      <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'space-between', marginTop: 16 }}>
        <div style={{ fontSize: 16, fontWeight: 500 }}>Order Time:</div>
        <div style={{ fontSize: 16 }}>{orderTime}</div>
      </Grid>

      <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'space-between', marginTop: 16 }}>
        <div style={{ fontSize: 16, fontWeight: 500 }}>Payment Time:</div>
        <div style={{ fontSize: 16 }}>{paymentTime}</div>
      </Grid>

      <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'space-between', marginTop: 16 }}>
        <div style={{ fontSize: 16, fontWeight: 500 }}>Delivery Time for Carrier:</div>
        <div style={{ fontSize: 16 }}>{deliveryTime}</div>
      </Grid>

      <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'space-between', marginTop: 16 }}>
        <div style={{ fontSize: 16, fontWeight: 500 }}>Completion Time:</div>
        <div style={{ fontSize: 16 }}>{completionTime}</div>
      </Grid>

      <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'flex-end', marginTop: 16 }}>
        <Button variant="outlined" onClick={onPrint} sx={{ marginLeft: 16 }}>
          Print
        </Button>
        <Button variant="contained" onClick={onEdit} sx={{ marginLeft: 16 }}>
          Edit
        </Button>
      </Grid>
    </Grid>
  );
};

export default OrderHistory;
