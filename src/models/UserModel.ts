import { Model } from 'src/models/Model';
import { Role, User, DefaultUserData } from 'src/@types';

export class UserModel extends Model {
  static tableName = 'users';

  public static async create<Payload>(data: Payload) {
    return super.insert<Payload & DefaultUserData>({
      ...data,
      role: Role.Blogger,
    });
  }

  public static findByEmail(email: string): Promise<User | null> {
    return this.findOneBy<
      {
        email: string;
      },
      User
    >({ email });
  }

  public static findByUsername(username: string): Promise<User | null> {
    return this.findOneBy<
      {
        username: string;
      },
      User
    >({ username });
  }
}
