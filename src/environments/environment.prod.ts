import * as pass from "./pass.json";

export const environment = {
  production: true,
  apiKey: pass.apiKey,
  account: pass.db.credential,
  host: pass.db.host,
  port: pass.db.port,
  db: pass.db.dbName
};
