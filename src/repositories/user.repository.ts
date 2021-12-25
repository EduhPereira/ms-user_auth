import { db } from "../db";
import { DatabaseError } from "../models/errors/database.error.model";
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
    try {
      const query = `
        SELECT uuid, username 
        FROM application_user 
        WHERE uuid = $1
      `;

      const { rows } = await db.query<User>(query, [uuid]);
      const [user] = rows;
      return user || {};
    } catch (error) {
      throw new DatabaseError("error searching by ID", error);
    }
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

  async remove(uuid: string): Promise<void> {
    const query = `
      DELETE FROM application_user 
      WHERE uuid = $1
    `;

    await db.query(query, [uuid]);
  }

  async findByUsernameAndPassword(
    username: string,
    password: string
  ): Promise<User | null> {
    try {
      const query = `
            SELECT uuid, username
            FROM application_user
            WHERE username = $1
            AND password = crypt($2, 'my_salt')
        `;
      const values = [username, password];
      const { rows } = await db.query<User>(query, values);
      const [user] = rows;
      return user || null;
    } catch (error) {
      throw new DatabaseError(
        "Error in searching by username and password",
        error
      );
    }
  }
}

export default new UserRepository();
