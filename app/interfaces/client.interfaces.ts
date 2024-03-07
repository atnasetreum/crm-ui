export interface ResponseClients {
  clients: Clients;
}

interface Clients {
  data: Client[];
  count: number;
}

export interface Client {
  id: string;
  name: string;
  phone: string;
  email: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface SearchParamsClientsProps {
  page?: number;
  limit?: number;
}
