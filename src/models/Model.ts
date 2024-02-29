import { database } from 'root/database';

export abstract class Model {
  protected static tableName?: string;

  protected static get table() {
    if (!this.tableName) {
      throw new Error('The table name must be defined for the model.');
    }
    return database(this.tableName);
  }

  public static async insert<Payload>(data: Payload): Promise<{
    id: number;
  }> {
    const [result] = await this.table.insert(data).returning('id');
    return result;
  }

  public static async updateOneById<Payload>(
    id: number,
    data: Payload
  ): Promise<{
    id: number;
  }> {
    const [result] = await this.table.where({ id }).update(data).returning('id');
    return result;
  }

  public static async delete(id: number): Promise<number> {
    return this.table.where({ id }).del();
  }

  public static async findOneById<Result>(id: number): Promise<Result> {
    return this.table.where('id', id).first();
  }

  public static async findOneBy<Payload, Result>(data: Payload): Promise<Result> {
    return this.table.where(data as string).first();
  }
}
