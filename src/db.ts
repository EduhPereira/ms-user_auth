import { Pool, Client } from "pg";

const connectionString =
  "postgres://navzztaf:FYRG8rsH9qquGI_viQjxZVe0TbVmcBIT@abul.db.elephantsql.com/navzztaf";

export const db = new Pool({ connectionString });
