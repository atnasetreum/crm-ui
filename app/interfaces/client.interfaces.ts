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
  status: string;
  birthdate: Date;
  reasonRejection: string;
  origin: string;
  campaignType: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface SearchParamsClientsProps {
  searchParam?: string;
  page?: number;
  limit?: number;
}
