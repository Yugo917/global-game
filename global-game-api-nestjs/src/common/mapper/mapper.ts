import { arraysEqual } from "../assertion/assertion.helper";

/* eslint-disable @typescript-eslint/no-explicit-any */
export interface IMappingOptions {
    ignore?: string[]; // List of properties to ignore
    ignorePattern?: RegExp; // Pattern to ignore properties by regex
    transforms?: { [key: string]: (value: any) => any }; // Transformations for properties
}

export interface IMapperOptions {
    strict: boolean;
    undefinedIsAValue: boolean;
}

export abstract class MapperProfile {
    private readonly mapper: Mapper
    public constructor(mapper: Mapper) {
        this.mapper = mapper;
    }
}

/**
 * Mapper
 * it's an object mapper
 * !!! warning it works well only if you are in "strict" type script with "strictPropertyInitialization": true
 * because the targetClass constructor must initialize the object with default value properties to be reflectable (without metaData)
 */
export class Mapper {
    private profiles = new Map<string, IMappingOptions | undefined>();
    private mapperOption: IMapperOptions;

    /**
     * Constructor to initialize the Mapper with or without strict mode.
     * @param mapperOption Enable or disable strict mode. If true, missing properties will throw an error. Enable or disable  undefinedIsAValue to considarate undefined as a value on source properties
     */
    public constructor(mapperOption: IMapperOptions) {
        this.mapperOption = mapperOption;
    }

    /**
     * Adds a mapping profile for a specific source-target pair.
     * @param sourceClass The source class constructor.
     * @param targetClass The target class constructor.
     * @param options The mapping options for the specific source-target pair.
     */
    public addProfile<TSource, TTarget>(
        sourceClass: new () => TSource,
        targetClass: new () => TTarget,
        options?: IMappingOptions
    ): void {
        const key = this.getProfileKey(sourceClass, targetClass);
        this.profiles.set(key, options);
    }

    /**
    * Maps properties from the source object to the target class, using the profile.
    * @param source The source object.
    * @param sourceClass The source class constructor.
    * @param targetClass The target class constructor.
    */
    public mapArray<TSource, TTarget>(
        source: TSource[],
        sourceClass: new () => TSource,
        targetClass: new () => TTarget
    ): TTarget[] {
        return source.map(m => this.map(m, sourceClass, targetClass))
    }

    /**
     * Maps properties from the source object to the target class, using the profile
     * @param source The source object.
     * @param sourceClass The source class constructor.
     * @param targetClass The target class constructor.
     */
    public map<TSource, TTarget>(
        source: TSource,
        sourceClass: new () => TSource,
        targetClass: new () => TTarget
    ): TTarget {
        // Verify that the source object
        this.validateStructuralInstanceOrProtoypeInstance(source as object, sourceClass)

        const keyProfil = this.getProfileKey(sourceClass, targetClass);
        // Verify if the profile exist for this mapping
        if (!this.profiles.has(keyProfil)) {
            throw new Error(`Missing profile for this mapping  ${keyProfil}`);
        }
        const mappingOptions = this.profiles.get(keyProfil);


        // Manage the mapping
        const target = new targetClass();
        this.validateStrictTypeScript(target as object);
        const targetPorps = Object.getOwnPropertyNames(target);

        for (const key of targetPorps) {
            if ((source as any)[key] === undefined && !this.mapperOption.undefinedIsAValue) continue;

            if (mappingOptions === undefined) {
                this.mapWithoutOption(key, source, target);
            }
            else {
                this.mapWithOption(key, mappingOptions, source, target);
            }
        }

        return target;
    }

    private mapWithoutOption(key: string, source: any, target: any): void {
        this.validateStrictMapping(key, source as object);
        (target as any)[key] = (source as any)[key];
    }

    private mapWithOption(key: string, mappingOptions: IMappingOptions, source: any, target: any): void {
        // Ignore properties explicitly listed or matching the regex pattern
        if (mappingOptions.ignore?.includes(key) || (mappingOptions.ignorePattern && mappingOptions.ignorePattern.test(key))) {
            return;
        }

        this.validateStrictMapping(key, source as object);

        // Manage transformations
        if (mappingOptions.transforms && mappingOptions.transforms[key]) {
            (target as any)[key] = mappingOptions.transforms[key]((source as any)[key]);
            return;
        }

        this.mapWithoutOption(key, source, target);
    }


    private validateStructuralInstanceOrProtoypeInstance<TSource>(source: object, sourceClass: new () => TSource): void {
        const sourceClassProps = Object.getOwnPropertyNames(new sourceClass());
        const sourceProps = Object.getOwnPropertyNames(source);
        const isStructuralInstance = arraysEqual(sourceProps, sourceClassProps);

        if (!(source instanceof sourceClass || isStructuralInstance)) {
            throw new Error(`Source object must be an instance of ${sourceClass.name}`);
        }
    }

    private validateStrictMapping(key: string, source: object): void {
        if (this.mapperOption.strict && !source.hasOwnProperty(key)) {
            throw new Error(`Missing property mapping for ${key}`);
        }
    }

    private validateStrictTypeScript(target: object): void {
        if (Object.getOwnPropertyNames(target).length == 0) {
            throw new Error("the target class have no properties or the props not have defaut value for the runtime initialization");
        }
    }


    /**
     * Constructs a unique key for a source-target class pair.
     */
    private getProfileKey<TSource, TTarget>(sourceClass: new () => TSource, targetClass: new () => TTarget): string {
        return `${sourceClass.name}->${targetClass.name}`;
    }
}
