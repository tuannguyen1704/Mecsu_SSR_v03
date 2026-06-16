export interface MockAuthUser {
  id: string;
  fullName: string;
  email: string;
  phone?: string;
  createdAt: string;
}

export interface MockAuthAccount extends MockAuthUser {
  password: string;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface RegisterAccountPayload {
  fullName: string;
  email: string;
  phone?: string;
  password: string;
  confirmPassword: string;
}

export interface RegisterAddressPayload {
  province?: string;
  district?: string;
  ward?: string;
  addressLine?: string;
  note?: string;
}

export interface RegisterPayload extends RegisterAccountPayload {
  address?: RegisterAddressPayload;
}

export type AuthServiceResult<T> =
  | {
      ok: true;
      data: T;
    }
  | {
      ok: false;
      error: string;
    };
