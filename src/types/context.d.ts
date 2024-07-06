export type Action = {
  type: string;
  payload: any;
};

export type ErrorType = {
  message: string;
  response?: {
    data: {
      message: string;
    };
  };
};
