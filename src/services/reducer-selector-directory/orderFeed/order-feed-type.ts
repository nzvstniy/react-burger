export enum WebSocketStatus {
    CONNECTING = 'CONNECTING',
    ONLINE = 'ONLINE',
    OFFLINE = 'OFFLINE',
  }
  
  export type TWebSocketSingleOrder = {
    _id: string;
    ingredients: string[];
    status: 'created' | 'pending' | 'done';
    name: string;
    createdAt: string;
    updatedAt: string;
    number: number;
  };
  
  export type TWebSocketOrders = {
    success: boolean;
    orders: TWebSocketSingleOrder[];
    total: number;
    totalToday: number;
  };