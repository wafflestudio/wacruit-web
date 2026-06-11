export type LoginRequest = {
  email: string;
  password: string;
};

export type CheckEmailRequest = {
  email: string;
};

export type LoginResponse = {
  access_token: string;
  refresh_token: string;
};

export type ApiErrorResponse = {
  detail:
    | string
    | Array<{ loc: (string | number)[]; msg: string; type: string }>;
};

export type PasswordResetEmailRequest = { email: string };
export type PasswordResetVerifyRequest = { email: string; code: string };
export type PasswordResetRequest = {
  email: string;
  code: string;
  new_password: string;
};
