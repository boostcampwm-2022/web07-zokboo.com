export interface UserState {
  isLoading: boolean;
  isSuccess: boolean;
  isError: boolean;
  error: string | null;
  isLogined: boolean;
  avatar: string;
  nickname: string;
  userId: string;
}

export interface LoginAPIInputState {
  email: string;
  password: string;
}
export interface LoginAPIReturnState {
  isLogined: boolean;
  avatar: string;
  nickname: string;
  userId: string;
}

export interface UpdateUser {
  avatar: string;
}
