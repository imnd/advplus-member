export default interface SubscriptionDetailInterface {
  fee: string;
  next_invoice_date: string;
  card_last4_digits: string;
  card_expiry_date: string;
  card_scheme: string;
  status: boolean;
}
