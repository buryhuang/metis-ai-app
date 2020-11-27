/* tslint:disable */
/* eslint-disable */
//  This file was automatically generated and should not be edited.

export type CreateDataSourceInput = {
  user_id: string,
  table_name: string,
  data_source?: string | null,
  refresh_request?: string | null,
};

export type ModelDataSourceConditionInput = {
  data_source?: ModelStringInput | null,
  refresh_request?: ModelStringInput | null,
  and?: Array< ModelDataSourceConditionInput | null > | null,
  or?: Array< ModelDataSourceConditionInput | null > | null,
  not?: ModelDataSourceConditionInput | null,
};

export type ModelStringInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  size?: ModelSizeInput | null,
};

export enum ModelAttributeTypes {
  binary = "binary",
  binarySet = "binarySet",
  bool = "bool",
  list = "list",
  map = "map",
  number = "number",
  numberSet = "numberSet",
  string = "string",
  stringSet = "stringSet",
  _null = "_null",
}


export type ModelSizeInput = {
  ne?: number | null,
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
};

export type UpdateDataSourceInput = {
  user_id: string,
  table_name: string,
  data_source?: string | null,
  refresh_request?: string | null,
};

export type DeleteDataSourceInput = {
  user_id: string,
  table_name: string,
};

export type ModelStringKeyConditionInput = {
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
};

export type ModelDataSourceFilterInput = {
  user_id?: ModelIDInput | null,
  table_name?: ModelStringInput | null,
  data_source?: ModelStringInput | null,
  refresh_request?: ModelStringInput | null,
  and?: Array< ModelDataSourceFilterInput | null > | null,
  or?: Array< ModelDataSourceFilterInput | null > | null,
  not?: ModelDataSourceFilterInput | null,
};

export type ModelIDInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  size?: ModelSizeInput | null,
};

export enum ModelSortDirection {
  ASC = "ASC",
  DESC = "DESC",
}


export type CreateDataSourceMutationVariables = {
  input: CreateDataSourceInput,
  condition?: ModelDataSourceConditionInput | null,
};

export type CreateDataSourceMutation = {
  createDataSource:  {
    __typename: "DataSource",
    user_id: string,
    table_name: string,
    data_source: string | null,
    refresh_request: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type UpdateDataSourceMutationVariables = {
  input: UpdateDataSourceInput,
  condition?: ModelDataSourceConditionInput | null,
};

export type UpdateDataSourceMutation = {
  updateDataSource:  {
    __typename: "DataSource",
    user_id: string,
    table_name: string,
    data_source: string | null,
    refresh_request: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type DeleteDataSourceMutationVariables = {
  input: DeleteDataSourceInput,
  condition?: ModelDataSourceConditionInput | null,
};

export type DeleteDataSourceMutation = {
  deleteDataSource:  {
    __typename: "DataSource",
    user_id: string,
    table_name: string,
    data_source: string | null,
    refresh_request: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type GetDataSourceQueryVariables = {
  user_id: string,
  table_name: string,
};

export type GetDataSourceQuery = {
  getDataSource:  {
    __typename: "DataSource",
    user_id: string,
    table_name: string,
    data_source: string | null,
    refresh_request: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type ListDataSourcesQueryVariables = {
  user_id?: string | null,
  table_name?: ModelStringKeyConditionInput | null,
  filter?: ModelDataSourceFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
  sortDirection?: ModelSortDirection | null,
};

export type ListDataSourcesQuery = {
  listDataSources:  {
    __typename: "ModelDataSourceConnection",
    items:  Array< {
      __typename: "DataSource",
      user_id: string,
      table_name: string,
      data_source: string | null,
      refresh_request: string | null,
      createdAt: string,
      updatedAt: string,
    } | null > | null,
    nextToken: string | null,
  } | null,
};

export type OnCreateDataSourceSubscription = {
  onCreateDataSource:  {
    __typename: "DataSource",
    user_id: string,
    table_name: string,
    data_source: string | null,
    refresh_request: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnUpdateDataSourceSubscription = {
  onUpdateDataSource:  {
    __typename: "DataSource",
    user_id: string,
    table_name: string,
    data_source: string | null,
    refresh_request: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnDeleteDataSourceSubscription = {
  onDeleteDataSource:  {
    __typename: "DataSource",
    user_id: string,
    table_name: string,
    data_source: string | null,
    refresh_request: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};
