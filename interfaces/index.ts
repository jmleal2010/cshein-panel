export interface dataType {
  id: string;
  code: string;
  deliveryAt: string;
  stage: string;
  createdAt: string;
  status: string;
  total: number;
}

export interface columnType {
  field: string;
  title: string;
  type?: string | "text";
}

export interface orderType {
  order: Order;
}

export interface Order {
  id: string;
  arrivalAt: string;
  beneficiary: BeneficiaryType;
  deliveryOrder: DeliveryOrder;
  code: string;
  createdAt: string;
  deliveryAt: string;
  deliveryFee: number;
  deliveryFeeStatus: string;
  orderItems: orderItemType[];
  qvapayInvoices: qvapayType[];
  stage: string;
  status: string;
  total: number;
  updatedAt: string;
  userId: string;
}

export interface BeneficiaryType {
  address: string;
  email: string;
  firstName: string;
  id: string;
  lastName: string;
  phone: string;
}

export interface orderItemType {
  product: productType;
  quantity: number;
}

export interface qvapayType {
  amount: number;
  createdAt: string;
  id: string;
  orderId: string;
  qvapayId: string;
  status: string;
  updateAt: string;
  utl: string;
}

export interface productType {
  categoryId: string;
  color: string;
  discount: number;
  image: string;
  link: string;
  name: string;
  price: number;
  size: string;
  skucode: string;
}

export interface Navigation {
  id: number;
  title: string;
  icon?: any;
  iconSize?: string;
  children?: Navigation[];
  nested?: boolean;
  isOpen?: boolean;
  href: string;
  selected: boolean;
  slug?: string;
}

export interface DeliveryOrder {
  code: string;
  createdAt: string;
  id: string;
  order: Order;
  packageType: string;
  status: string;
  updatedAt: string;
}

export interface StatusType {
  label: string;
  value: string;
}

export interface User {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  role: string;
  emailNotifications: boolean;
};