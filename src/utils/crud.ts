import { FindOptions, Model, } from "sequelize";


/**
 * TODO: add proper type definition
 */
export class Crud {
    async getOne<B>(model: any, options: B) {
        return await model.findOne(options)
    }

    async getAll<B>(model: any, options: B) {
        return await model.findAll(options);
    }

    async update<T, B>(model: any, query: T, options: B) {
        return await model.update({ ...options }, { ...query, individualHooks: true })
    }

    async delete<B>(model: any, options: B) {
        return await model.destroy(options)
    }

    async create<B>(model: any, options: B) {
        return await model.create(options)
    }
}
