export interface IModel {
    save<T>(data: T | Partial<T>): Promise<Partial<T>>;
    findOne<T>(data: Partial<T>): Promise<Partial<T> | null>;
    remove<T>(data: Partial<T>): Promise<boolean>;
    exists<T>(data: Partial<T>): Promise<boolean>;
}
