export interface succesAuthDto {
  user: {
    userId: number;
    phone: string;
  };
  accessToken: string;
  refreshToken: string;
}
