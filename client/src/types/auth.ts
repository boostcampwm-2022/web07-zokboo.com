interface PostResetPasswordBody {
  token: string;
  password: string;
  passwordConfirmation: string;
}

export default PostResetPasswordBody;
