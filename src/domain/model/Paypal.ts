export interface PayPalOrderStatusResponse {
  status: string;
  purchase_units: PurchaseUnit[];
}

export interface PurchaseUnit {
  invoice_id:   string;
}
