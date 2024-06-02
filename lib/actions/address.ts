"use server"

import { routes } from "@/utils/consts";
import { revalidatePath } from "next/cache";


export async function updateAddress(formData: FormData) {

    try {
        //console.log(formData.get("addressLine1"));
        revalidatePath(routes.beneficiaries.addresses);
        return { successMessage: "La operacion se ha realizado con exito" };
    } catch (e: any) {
        console.log(e);
        return { errorMessage: e.message };
    }
    
}