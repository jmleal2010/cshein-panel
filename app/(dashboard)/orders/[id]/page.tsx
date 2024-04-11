import {LOAD_ORDER_QUERY} from "@/graphql/queries";
import * as React from 'react';
import Box from '@mui/material/Box';
import {Card, CardContent, CardHeader, Collapse, Grid} from "@mui/material";
import {getClient} from "@/config/apollo";
import Typography from "@mui/joy/Typography";
import Avatar from "@mui/joy/Avatar";
import {red} from "@mui/material/colors";
import IconButton from "@mui/joy/IconButton";
import {Edit} from '@mui/icons-material';
import OrderItem from "@/components/common/orderItem";


const activity = [
    {id: 1, type: "creada", date: "7d ago", dateTime: "2023-01-23T10:32"},
    {id: 2, type: "editada", date: "6d ago", dateTime: "2023-01-23T11:03"},
    {id: 3, type: "enviada", date: "6d ago", dateTime: "2023-01-23T11:24"},
    {id: 4, type: "pagada", date: "1d ago", dateTime: "2023-01-24T09:20"},
];

const getOrder = async (params: any) => {
    try {
        return await getClient().query({
            query: LOAD_ORDER_QUERY,
            variables: {
                orderId: params.id,
            },
        });

    } catch (err) {

    }
}

const Header = async () => {

    return (
        <Box sx={{flexGrow: 2}}>

            <Grid container spacing={{xs: 2, md: 3}} direction={{
                xs: 'row', md: 'column'
            }}>
            </Grid>
        </Box>
    )
}

export default async function OrderId({params}: { params: { id: string } }) {
    const response = await getOrder(params);
    const order = response?.data.order || {};

    console.log(order)
    let orderItems = order.orderItems.map((item: any) => {
        const {product, quantity} = item;
        return {...product, quantity};
    });


    return (
        <>
            <OrderItem />
            <Box sx={{flexGrow: 2}}>

                <Grid container spacing={{xs: 2, md: 3}} direction={{
                    xs: 'row', md: 'column'
                }}>
                    <Grid xs={8} sx={{marginTop: 4}}>
                        <Card>
                            <CardHeader
                                avatar={
                                    <Avatar sx={{bgcolor: red[500]}} aria-label="recipe">
                                        R
                                    </Avatar>
                                }
                                action={
                                    <IconButton aria-label="settings">
                                        <Edit/>
                                    </IconButton>
                                }
                                title="Detalles"
                                subheader={`Order no ${order.code}`}
                            />
                            <CardContent>
                                <Typography variant="plain" color="neutral">
                                    This impressive paella is a perfect party dish and a fun meal to cook
                                    together with your guests. Add 1 cup of frozen peas along with the mussels,
                                    if you like.
                                </Typography>
                            </CardContent>

                            <Collapse in={true} timeout="auto" unmountOnExit>
                                <CardContent>
                                    <Typography paragraph>Method:</Typography>
                                    <Typography paragraph>
                                        Heat 1/2 cup of the broth in a pot until simmering, add saffron and set
                                        aside for 10 minutes.
                                    </Typography>
                                    <Typography paragraph>
                                        Heat oil in a (14- to 16-inch) paella pan or a large, deep skillet over
                                        medium-high heat. Add chicken, shrimp and chorizo, and cook, stirring
                                        occasionally until lightly browned, 6 to 8 minutes. Transfer shrimp to a
                                        large plate and set aside, leaving chicken and chorizo in the pan. Add
                                        pimentón, bay leaves, garlic, tomatoes, onion, salt and pepper, and cook,
                                        stirring often until thickened and fragrant, about 10 minutes. Add
                                        saffron broth and remaining 4 1/2 cups chicken broth; bring to a boil.
                                    </Typography>
                                    <Typography paragraph>
                                        Add rice and stir very gently to distribute. Top with artichokes and
                                        peppers, and cook without stirring, until most of the liquid is absorbed,
                                        15 to 18 minutes. Reduce heat to medium-low, add reserved shrimp and
                                        mussels, tucking them down into the rice, and cook again without
                                        stirring, until mussels have opened and rice is just tender, 5 to 7
                                        minutes more. (Discard any mussels that don&apos;t open.)
                                    </Typography>
                                    <Typography>
                                        Set aside off of the heat to let rest for 10 minutes, and then serve.
                                    </Typography>
                                </CardContent>
                            </Collapse>
                        </Card>
                    </Grid>
                    <Grid xs={4}>

                    </Grid>
                </Grid>
            </Box>
        </>

    );

}
