
import { GenBuilders, Generators, TypeClasses, Shrinkers, KelesCheck } from "./KelesCheck";


export module Json {

    export type Json =
        | string
        | number
        | boolean
        | null
        | undefined
        | Json[]
        | { [key: string]: Json };

    export type JsonGenerator = TypeClasses.Gen<Json>;

    export const generateJsonArray: TypeClasses.GenBuilder<Json> = (size: number) => () => {
        const log = Math.log(size);
        const rest = Math.floor(size / log);
        const length = Math.floor(Math.random() * log);
        const arr: Json[] = [];
        for (let i = 0; i < length; i++) {
            arr.push(generateJson(rest));
        }
        return arr;
    }



    export const generateJsonObject: TypeClasses.GenBuilder<Json> = (size: number) => () => {
        const log = Math.log(size);
        const rest = Math.floor(size / log);
        const obj: { [key: string]: Json } = {};
        for (let i = 0; i < log; i++) {
            obj[Generators.generateString()] = generateJson(rest);
        }
        return obj;
    }

    export const generateJson = (size: number) => {
        return GenBuilders.freqOf<Json>([
            [Generators.generateString as JsonGenerator, 1],
            [Generators.generateNumber as JsonGenerator, 1],
            [Generators.generateBoolean as JsonGenerator, 1],
            [Generators.generateNull as JsonGenerator, 1],
            // [Generators.generateUndefined as JsonGenerator, 1],
            [generateJsonArray(size) as JsonGenerator, size - 1],
            [generateJsonObject(size) as JsonGenerator, size - 1],
        ])();
    }

    export const genJson : JsonGenerator = () => {
        return generateJson(5);
    }

    const json_stringify = (obj: Json): string => {
        if (typeof obj == 'undefined') {
            return 'undefined';
        }
        if (obj == null) {
            return "null";
        } else if (Array.isArray(obj)) {
            return "[" + obj.map(json_stringify).join(",") + "]";
        } else {
            const typ = typeof obj;
            switch (typ) {
                case "string":
                    return '"' + obj + '"';
                case "number":
                case "boolean":
                    return obj.toString();
                case "object":
                    return "{" + Object.keys(obj as any).map(k => '"' + k + '":' + json_stringify((obj as any)[k])).join(",") + "}";
                default:
                    throw new Error("Unknown type: " + typ);
            }
        }

    }
    export const propJsonStringify = (json: Json) => {
        return JSON.stringify(JSON.parse(JSON.stringify(json))) === JSON.stringify(json);
    }

    export const propJsonMyStringify = (json: Json) => {
        return (json_stringify(json) === JSON.stringify(json));
    }

    export const testJsonStringify = () => {   
        return KelesCheck.quickCheck(propJsonStringify, genJson, Shrinkers.id, (a: number[], b: number[]) => false);
    }

    export const testJsonMyStringify = () => {
        return KelesCheck.quickCheck(propJsonMyStringify, genJson, Shrinkers.id, (a: number[], b: number[]) => false);
    }

}
