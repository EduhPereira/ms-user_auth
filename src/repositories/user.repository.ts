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

  async create(user: User): Promise<string> {
    const script = `
        INSERT INTO application_user (
            username,
            password
        )
        VALUES ($1, crypt($2, 'my_salt'))
        RETURNING uuid
    `;

    const { rows } = await db.query<{ uuid: string }>(script, [
      user.username,
      user.password,
    ]);
    const [newUser] = rows;
    return newUser.uuid;
  }

  async update(user: User): Promise<void> {
    const script = `
        UPDATE application_user 
        SET 
          username = $1,
          password = crypt($2, 'my_salt') 
        WHERE uuid = $3
    `;

    await db.query<{ uuid: string }>(script, [
      user.username,
      user.password,
      user.uuid,
    ]);
  }
}

export default new UserRepository();
