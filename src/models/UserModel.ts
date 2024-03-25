import { Model } from 'src/models/Model';
import { Role, User, DefaultUserData } from 'src/@types';

export class UserModel extends Model {
  static tableName = 'users';
  static context: UserModel;

  public static async create<Payload>(data: Payload) {
    return super.insert<Payload & DefaultUserData>({
      ...data,
      role: Role.Blogger,
    });
  }

  public static findByEmail(email: string) {
    return this.findOneBy<
      {
        email: string;
      },
      User
    >({ email });
  }

  public static async findByUsername(username: string): Promise<User | null> {
    return this.findOneBy<
      {
        username: string;
      },
      User
    >({ username });
  }
}
