'use client'
import React from "react";
import {
  Box,
  Button,
  Paper,
  Step,
  StepContent,
  StepLabel,
  Stepper,
  Typography,
} from "@mui/material";
import { Order } from "@/interfaces";
import moment from "moment";



const OrderHistory = ({data: order}: any) => {
  const [activeStep, setActiveStep] = React.useState(0);

  const steps = [
  
    {
      label: "Order paid",
      description: `Order was paid on ${moment(order.createdAt).format('YYYY-MM-DD H:mm:ss')}`
    },
    {
      label: "Order created",
      description: `Order was created on ${moment(order.createdAt).format('YYYY-MM-DD H:mm:ss')} `, 
    },
    {
      label: "Order edited",
      description: `Order was edited on ${moment(order.updatedAt).format('YYYY-MM-DD H:mm:ss')} `,
    },
    {
      label: "Order sent",
      description: "Order was sent on 2023-01-23T11:24",
    },
  ];

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  return (
    <Paper sx={{ maxWidth: 400 }} className="cshein-card">
      <Stepper activeStep={1} orientation="vertical" >
        {steps.map((step, index) => (
          <Step key={step.label}>
            <StepLabel
              optional={
                index === steps.length-1 ? (
                  <Typography variant="caption">Last step</Typography>
                ) : null
              }
            >
              {step.label}
            </StepLabel>
            <StepContent>
              <Typography>{step.description}</Typography>
            </StepContent>
          </Step>
        ))}
      </Stepper>
      {activeStep === steps.length && (
        <Paper square elevation={0} sx={{ p: 3 }}>
          <Typography>All steps completed - you&apos;re finished</Typography>
          <Button onClick={handleReset} sx={{ mt: 1, mr: 1 }}>
            Reset
          </Button>
        </Paper>
      )}
    </Paper>
  );
};

export default OrderHistory;
