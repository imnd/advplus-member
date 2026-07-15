import { CheckoutEnvironment } from '@/app/types/types';

const baseAppUrl = 'http://api.example.com/';
const apiUrl = baseAppUrl + 'api/member-portal';

export const environment = {
  production: true,
  useMockApi: false,
  checkoutPublicKey: "",
  checkoutEnvironment: "production" as CheckoutEnvironment,
  baseAppUrl,
  apiUrl,
};
