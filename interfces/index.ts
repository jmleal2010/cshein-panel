export interface dataType {
    id: string,
    code: string,
    deliveryAt: string,
    stage: string,
    createdAt: string,
    status: string,
    total: number
}

export interface columnType {
    name: string,
    title: string,
    type?: string | 'text'
}

export interface orderType {
    order: {
        arrivalAt: string,
        beneficiary: beneficiaryType,
        code: string,
        createdAt: string,
        deliveryAt: string,
        deliveryFee: number,
        deliveryFeeStatus: string,
        orderItems: orderItemType[],
        qvapayInvoices: qvapayType[],
        stage: string,
        status: string,
        total: number,
        updatedAt: string,
        userId: string,
    }
}

export interface beneficiaryType {
    email: string,
    fullName: string,
    id: string,
    phone: string,
}

export interface orderItemType {
    product: productType,
    quantity: number
}


export interface qvapayType {
    amount: number,
    createdAt: string,
    id: string,
    orderId: string,
    qvapayId: string,
    status: string,
    updateAt: string,
    utl: string,
}


export interface productType {
    categoryId: string,
    color: string,
    discount: number,
    image: string,
    link: string,
    name: string,
    price: number,
    size: string,
    skucode: string,
}
