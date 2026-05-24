export interface RegisterRequest {
  Name: string;
  Email: string;
  Rut: string;
  PhoneNumber: string;
  BirthDate: string; // (YYYY-MM-DD)
  Gender: string;
  Password: string;
  ConfirmPassword: string;
}
