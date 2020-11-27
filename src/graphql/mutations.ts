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
      refresh_request
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
      refresh_request
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
      refresh_request
      createdAt
      updatedAt
    }
  }
`;
export const createPipelineJob = /* GraphQL */ `
  mutation CreatePipelineJob(
    $input: CreatePipelineJobInput!
    $condition: ModelPipelineJobConditionInput
  ) {
    createPipelineJob(input: $input, condition: $condition) {
      pk
      timestamp
      state_code
      state_message
      state_status
      createdAt
      updatedAt
    }
  }
`;
export const updatePipelineJob = /* GraphQL */ `
  mutation UpdatePipelineJob(
    $input: UpdatePipelineJobInput!
    $condition: ModelPipelineJobConditionInput
  ) {
    updatePipelineJob(input: $input, condition: $condition) {
      pk
      timestamp
      state_code
      state_message
      state_status
      createdAt
      updatedAt
    }
  }
`;
export const deletePipelineJob = /* GraphQL */ `
  mutation DeletePipelineJob(
    $input: DeletePipelineJobInput!
    $condition: ModelPipelineJobConditionInput
  ) {
    deletePipelineJob(input: $input, condition: $condition) {
      pk
      timestamp
      state_code
      state_message
      state_status
      createdAt
      updatedAt
    }
  }
`;
