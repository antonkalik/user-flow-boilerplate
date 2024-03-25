import { database } from 'root/database';

export abstract class Model {
  protected static tableName?: string;
  protected static _id: number | null = null;

  protected static get table() {
    if (!this.tableName) {
      throw new Error('The table name must be defined for the model.');
    }
    return database(this.tableName);
  }

  protected static applyContext<Result>(
    result: Result & { id: number }
  ): Result & { context: typeof Model } {
    this._id = result.id;

    return Object.assign(result, { context: this });
  }

  public static async insert<Payload>(data: Payload) {
    const [result] = await this.table.insert(data).returning('id');
    return this.applyContext<{ id: number }>(result);
  }

  public static async delete(id: number): Promise<number> {
    return this.table.where({ id }).del();
  }

  public static async update<Payload>(data: Payload, id?: number) {
    const [result] = await this.table
      .where('id', id || this._id)
      .update(data)
      .returning('*');
    return this.applyContext<{ id: number } & Payload>(result);
  }

  public static async findOneById<Result>(id: number) {
    const result = await this.table.where('id', id).first();

    return this.applyContext<Result>(result);
  }

  public static async findOneBy<Payload, Result>(data: Payload) {
    const result = await this.table.where(Object.assign({}, data)).first();

    return this.applyContext<Result>(result);
  }

  public static async updateById<Payload>(id: number, data: Payload) {
    return this.update(data, id);
  }
}
