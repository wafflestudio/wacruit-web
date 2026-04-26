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
