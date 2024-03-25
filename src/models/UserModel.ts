import { Model } from 'src/models/Model';
import { Role, User, DefaultUserData } from 'src/@types';

export class UserModel extends Model {
  static tableName = 'users';
  protected static data: User;

  public static async create<Payload>(data: Payload) {
    return super.insert<Payload & DefaultUserData>({
      ...data,
      role: Role.Blogger,
    });
  }

  public static async findByEmail(email: string): Promise<User | null> {
    this.data = await this.findOneBy<
      {
        email: string;
      },
      User
    >({ email });

    return this.data;
  }

  public static async findByUsername(username: string): Promise<User | null> {
    this.data = await this.findOneBy<
      {
        username: string;
      },
      User
    >({ username });

    return this.data;
  }

  public static async createPasswordResetToken(token: string) {
    return super.updateOneById(this.data.id, { forgot_password_token: token });
  }
}
