export interface IEnumItem {
    readonly value: number;
    readonly key?: string;
    readonly text?: string;
    readonly parser?: {
        exp: string;
    };
}

export interface IEnum<T extends IEnumItem> {
    get(predicate: (item: T) => boolean): Promise<T>;
}

export interface IEnumFactory {
    build<T extends IEnumItem>(name: string): IEnum<T>;
}