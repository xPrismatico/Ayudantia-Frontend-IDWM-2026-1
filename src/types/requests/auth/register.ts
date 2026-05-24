export interface RegisterRequest {
  name: string;
  email: string;
  rut: string;
  phoneNumber: string;
  birthDate: string; // (YYYY-MM-DD)
  gender: string;
  password: string;
  confirmPassword: string;
}
