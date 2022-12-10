export interface PostResetPasswordBody {
  token: string;
  password: string;
  passwordConfirmation: string;
}

export interface signupProps {
  email: string;
  password: string;
  passwordConfirmation: string;
  nickname: string;
}
