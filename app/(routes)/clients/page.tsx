import Grid from "@mui/material/Grid";
import { gql } from "@apollo/client";

import { getClient } from "@lib/apollo-client";
import { ResponseClients, SearchParamsClientsProps } from "@interfaces";
import ClientsTable from "./components/ClientsTable";
import ClientsFilters from "./components/ClientsFilters";

const query = gql`
  query Clients($page: Int!, $limit: Int!, $searchParam: String) {
    clients(page: $page, limit: $limit, searchParam: $searchParam) {
      count
      data {
        id
        name
        phone
        email
        status
        birthdate
        reasonRejection
        origin
        campaignType
        isActive
        createdAt
        updatedAt
      }
    }
  }
`;

async function loadData(searchParams: SearchParamsClientsProps) {
  const { searchParam, page = 1, limit = 5 } = searchParams;

  const { data } = await getClient().query<ResponseClients>({
    query,
    variables: {
      ...(searchParam && { searchParam }),
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
    <Grid container spacing={3}>
      <Grid item xs={12} md={12} lg={12}>
        <ClientsFilters />
      </Grid>
      <Grid item xs={12} md={12} lg={12}>
        <ClientsTable data={clients} count={count} />
      </Grid>
    </Grid>
  );
}
