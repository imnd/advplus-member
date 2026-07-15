import { CheckoutEnvironment } from '@/app/types/types';

const baseAppUrl = 'http://localhost:8080/';
const apiUrl = 'http://localhost:8100/api/member-portal';

export const environment = {
  production: false,
  useMockApi: false,
  checkoutPublicKey: "",
  checkoutEnvironment: "sandbox" as CheckoutEnvironment,
  baseAppUrl,
  apiUrl,
};
