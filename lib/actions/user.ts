import { User } from "@/interfaces";


export async function updateUser(formData: FormData) {

    console.log(formData.get("firstName"));
}