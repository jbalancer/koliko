import {
  QueryConfig,
  QueryConfigValues,
  QueryResult,
  QueryResultRow
} from "pg";

export type DBQuery = <R extends QueryResultRow, I>(
  queryTextOrConfig: string | QueryConfig<I>,
  values?: QueryConfigValues<I>,
) => Promise<QueryResult<R>>