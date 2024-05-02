import { Avatar, Box, Divider, Grid, Paper, Typography } from "@mui/material"


const CustomerInfo = ({beneficiary}:{
    beneficiary: {
        fullName: string,
        email: string,
        phone: string,
    }
}) => {
    return (
        <Paper sx={{ml: 2, p: 2}}>
             
           <Typography variant = "h6" marginBottom={1}>
               Información del cliente
            </Typography> 
            <Box display="flex" gap={2}>
                    <Box sx= {{display: "flex", flexDirection: "column", justifyContent: "center"}}>
                        <Avatar src="/broken-image.jpg" />
                    </Box>
                    <Box>
                        <Typography variant="body2" display="block" gutterBottom>
                            <span style={{ color: 'rgba(80, 80, 80, 0.9)' }}>nombre:</span> {beneficiary.fullName}
                        </Typography>
                        <Typography variant="body2" display="block" gutterBottom>
                            <span style={{ color: 'rgba(80, 80, 80, 0.9)' }}>mail:</span> {beneficiary.email}
                        </Typography>
                        <Typography variant="body2" display="block" gutterBottom>
                            <span style={{ color: 'rgba(80, 80, 80, 0.9)' }}>teléfono:</span> {beneficiary.phone}
                        </Typography>
                    </Box>
                    
            </Box>
            
                

        </Paper>
    )
}

export default CustomerInfo;