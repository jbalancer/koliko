import { DBClient } from "@/infra/db";
import { usersTableSQL } from "./users.sql";

export class PaymentUsersDB {

  static async init() {
    await DBClient.query(usersTableSQL.createTable);
    await DBClient.query(usersTableSQL.createDefaultUser);
  }

}