/**
 * Typings for the https://wicg.github.io/file-system-access
 *
 * Use `supported(window)` to find out if the browser supports this kind of API.
 */
export declare namespace WebFileSystemAccess {
    function supported(obj: any & Window): boolean;
    function isFileSystemHandle(handle: unknown): handle is FileSystemHandle;
    function isFileSystemFileHandle(handle: FileSystemHandle): handle is FileSystemFileHandle;
    function isFileSystemDirectoryHandle(handle: FileSystemHandle): handle is FileSystemDirectoryHandle;
}
