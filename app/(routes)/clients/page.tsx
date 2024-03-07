import { gql } from "@apollo/client";

import { getClient } from "@lib/apollo-client";
import ClientsTable from "./components/ClientsTable";
import { ResponseClients, SearchParamsClientsProps } from "@interfaces";

const query = gql`
  query Clients($page: Int!, $limit: Int!) {
    clients(page: $page, limit: $limit) {
      count
      data {
        id
        name
        phone
        email
        isActive
        createdAt
        updatedAt
      }
    }
  }
`;

async function loadData(searchParams: SearchParamsClientsProps) {
  const { page = 1, limit = 5 } = searchParams;

  const { data } = await getClient().query<ResponseClients>({
    query,
    variables: {
      page: Number(page),
      limit: Number(limit),
    },
  });
  return data.clients;
}

export default async function ClientsPage({
  searchParams,
}: {
  searchParams: SearchParamsClientsProps;
}) {
  const { data: clients, count } = await loadData(searchParams);

  return (
    <main>
      <ClientsTable data={clients} count={count} />
    </main>
  );
}
