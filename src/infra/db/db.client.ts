import { globalConfig } from "@/shared/configs";
import { DBQuery } from "@/shared/types/db.types";
import {
  Client,
  Pool,
  QueryConfig,
  QueryConfigValues,
  QueryResult,
  QueryResultRow
} from "pg";

export class DBClient {

  protected static client = new Client({
    ...globalConfig.postgres
  });

  static async init() {
    await DBClient.client.connect();
  }

  static async query<R extends QueryResultRow, I>(
    queryTextOrConfig: string | QueryConfig<I>,
    values?: QueryConfigValues<I>,
  ): Promise<QueryResult<R>> {
    return DBClient.client.query(queryTextOrConfig, values);
  }

  static async transaction(
    callback: (query: DBQuery) => Promise<void>
  ) {
    const pool = new Pool({
      ...globalConfig.postgres
    });

    const client = await pool.connect();

    try {
      await client.query('BEGIN');
      await callback(client.query.bind(client));
      await client.query('COMMIT');
    } catch (error) {
      await client.query('ROLLBACK');

      throw error;
    } finally {
      client.release();
      await pool.end();
    }
  }

}