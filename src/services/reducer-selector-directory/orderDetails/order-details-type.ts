export interface IOrderSuccess {
    success: true;
    name: string;
    order: {
      number: number;
    };
  }
  
  export interface IOrderFail {
    success: false;
    message: string;
  }