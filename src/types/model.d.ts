export {};
declare global {
  interface IBackendRes<T> {
    error?: string | string[];
    message: string | string[];
    statusCode: number | string;
    data?: T;
  }

  interface IRegister {
    _id: string;
  }

  interface IUserLogin {
    user: {
      email: string;
      _id: string;
      name: string;
      role: string;
      address: string;
      avatar: string;
      phone: string;
    };
    access_token: string;
  }
}
