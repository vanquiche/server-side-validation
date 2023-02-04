export interface NameResponse {
  message: string;
  validated: boolean;
}

export interface ValidationResponse {
  message: string;
  validated: boolean;
}

export interface ValidationCheck {
  message: string;
  validated: boolean;
}

export interface SubmitResponse {
  message: string;
  validation: Record<string, ValidationCheck>;
  submitted: boolean;
}

export interface SubmitData {
  data: { name: string; email: string; phone: string };
}

export enum ErrorMessages {
  name = 'Name must contain only alphabet chars',
  email = 'Please enter a valid email',
  phone = 'Please enter a valid phone number',
  submitSuccess = 'Data successfully submited!',
  submitFailure = 'Data could not be submitted',
}
