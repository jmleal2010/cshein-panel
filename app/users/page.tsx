import * as React from "react";
import Container from "@mui/material/Container";
import FilterForm from "@/components/pages/order/table/FilterForm";
import Table from "@/components/pages/order/table/OrderTable/server/Table";

const users = [
    { firstName: "John", lastName: "Doe", email: "johndoe@example.com", phone: "1234567890", verified: true },
    { firstName: "Jane", lastName: "Smith", email: "janesmith@example.com", phone: "9876543210", verified: false },
    { firstName: "Alice", lastName: "Johnson", email: "alice@email", phone: "1234567890", verified: true},
    { firstName: "Bob", lastName: "Brown", email: "bobo@email", phone: "1234567890", verified: false},
    { firstName: "Charlie", lastName: "White", email: "char@email", phone: "1234567890", verified: true},
    { firstName: "David", lastName: "Black", email: "dave@email", phone: "1234567890", verified: false},
    { firstName: "Eve", lastName: "Green", email: "eve@email" , phone: "1234567890", verified: true},
    { firstName: "Frank", lastName: "Blue", email: "frank@email" ,  phone: "1234567890", verified: false},
    { firstName: "Grace", lastName: "Red", email: "grace@email", phone: "1234567890", verified: true},
    { firstName: "Helen", lastName: "Yellow", email: "helen@email"  , phone: "1234567890", verified: false},
    { firstName: "Ivy", lastName: "Purple", email: "ivy@email"  , phone: "1234567890", verified: true},
    { firstName: "Jack", lastName: "Orange", email: "jack@email"        , phone: "1234567890", verified: false},
    { firstName: "Kate", lastName: "Violet", email: "kate@email"  , phone: "1234567890", verified: true},
    { firstName: "Liam", lastName: "Indigo", email: "liam@email" , phone: "1234567890", verified: false},
    { firstName: "Mia", lastName: "Cyan", email: "mia@email" , phone: "1234567890", verified: true},
    { firstName: "Nathan", lastName: "Azure", email: "nathan@email" , phone: "1234567890", verified: false},
    { firstName: "Olivia", lastName: "Cerulean", email: "olivia@email"  , phone: "1234567890", verified: true},
    { firstName: "Peter", lastName: "Sky", email: "peter@email"  , phone: "1234567890", verified: false},
    { firstName: "Quinn", lastName: "Ocean", email: "quinn@email" , phone: "1234567890", verified: true},
    { firstName: "Ryan", lastName: "Sea", email: "ryan@email" , phone: "1234567890", verified: false},
    { firstName: "Samantha", lastName: "Aqua", email: "samantha@email"  , phone: "1234567890", verified: true},
    { firstName: "Thomas", lastName: "Teal", email: "thomas@email"  , phone: "1234567890", verified: false},
    { firstName: "Ursula", lastName: "Turquoise", email: "ursula@email"  , phone: "1234567890", verified: true},
    { firstName: "Victor", lastName: "Aquamarine", email: "victor@email"  , phone: "1234567890", verified: false},
    { firstName: "Wendy", lastName: "Blue-green", email: "wendy@email"  , phone: "1234567890", verified: true}, 
    { firstName: "Xander", lastName: "Cyan-blue", email: "xander@email"     , phone: "1234567890", verified: false},
    { firstName: "Yvonne", lastName: "Cerulean-blue", email: "yvonne@email"  , phone: "1234567890", verified: true},
    { firstName: "Zach", lastName: "Azure-blue", email: "zach@email"  , phone: "1234567890", verified: false},
]


const Page = () => { 
    const query = "";
    const currentPage = 1;
    const params = {categoryId: "pending"};
    return (
        <Container maxWidth="xl" sx= {{marginTop: 10}}>
            <FilterForm />
            <Table
                query={query}
                currentPage={currentPage}
                status={params.categoryId}
            />
        </Container>
        
    )
}
export default Page;