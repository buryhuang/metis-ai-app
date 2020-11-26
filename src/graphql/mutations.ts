/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createDataSource = /* GraphQL */ `
  mutation CreateDataSource(
    $input: CreateDataSourceInput!
    $condition: ModelDataSourceConditionInput
  ) {
    createDataSource(input: $input, condition: $condition) {
      user_id
      table_name
      data_source
      createdAt
      updatedAt
    }
  }
`;
export const updateDataSource = /* GraphQL */ `
  mutation UpdateDataSource(
    $input: UpdateDataSourceInput!
    $condition: ModelDataSourceConditionInput
  ) {
    updateDataSource(input: $input, condition: $condition) {
      user_id
      table_name
      data_source
      createdAt
      updatedAt
    }
  }
`;
export const deleteDataSource = /* GraphQL */ `
  mutation DeleteDataSource(
    $input: DeleteDataSourceInput!
    $condition: ModelDataSourceConditionInput
  ) {
    deleteDataSource(input: $input, condition: $condition) {
      user_id
      table_name
      data_source
      createdAt
      updatedAt
    }
  }
`;
