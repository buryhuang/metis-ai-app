/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getDataSource = /* GraphQL */ `
  query GetDataSource($user_id: ID!, $table_name: String!) {
    getDataSource(user_id: $user_id, table_name: $table_name) {
      user_id
      table_name
      data_source
      refresh_request
      createdAt
      updatedAt
    }
  }
`;
export const listDataSources = /* GraphQL */ `
  query ListDataSources(
    $user_id: ID
    $table_name: ModelStringKeyConditionInput
    $filter: ModelDataSourceFilterInput
    $limit: Int
    $nextToken: String
    $sortDirection: ModelSortDirection
  ) {
    listDataSources(
      user_id: $user_id
      table_name: $table_name
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      sortDirection: $sortDirection
    ) {
      items {
        user_id
        table_name
        data_source
        refresh_request
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
