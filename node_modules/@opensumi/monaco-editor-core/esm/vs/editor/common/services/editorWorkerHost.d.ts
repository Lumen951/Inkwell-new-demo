export interface IEditorWorkerHost {
    fhr(method: string, args: any[]): Promise<any>;
}
