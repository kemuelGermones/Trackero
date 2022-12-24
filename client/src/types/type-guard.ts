import { IProject } from "./interface";

export function isArrayOfIProject(data: any): data is IProject[] {
    return Array.isArray(data);
}

export function instanceOfIProject(data: any): data is IProject {
    return data instanceof Object && !Array.isArray(data);
} 