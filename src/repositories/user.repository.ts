import { db } from "../db";
import { User } from "../models/user.model";

class UserRepository {
  async getAll(): Promise<User[]> {
    const query = `
        SELECT uuid, username
        FROM application_user;
    `;
    const { rows: users } = await db.query<User>(query);
    return users || [];
  }

  async getById(uuid: string): Promise<User> {
    const query = `
        SELECT uuid, username 
        FROM application_user 
        WHERE uuid = $1
      `;

    const { rows } = await db.query<User>(query, [uuid]);
    const [user] = rows;
    return user || {};
  }
}

export default new UserRepository();
