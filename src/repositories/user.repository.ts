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
}

export default new UserRepository();
