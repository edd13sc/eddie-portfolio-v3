// @ts-ignore
import { googleBucket } from "./google.service";
import { File, GetFilesOptions, GetFilesResponse } from '@google-cloud/storage';

interface FileMetadata {
    readonly name: string;
    readonly size: string;
    readonly timeCreated: string;
    readonly updated: string;
    readonly contentType: string | null;
    readonly etag: string;
}

interface ListFilesResult {
    readonly files: ReadonlyArray<FileMetadata>;
    readonly prefixes: ReadonlyArray<string>;
    readonly nextPageToken?: string;
}

export async function listFiles(prefix = ''): Promise<ListFilesResult> {
    try {
        // Configuration with explicit typing
        const options: GetFilesOptions = {
            prefix,        // only objects whose names start with this
            delimiter: '/',// to get "sub-folder" prefixes in the response
            maxResults: 1000,
        };

        const response: GetFilesResponse = await googleBucket.getFiles(options);
        const [files, nextQuery, apiResponse] = response;

        console.log('Files:');
        const fileDetails: FileMetadata[] = files.map((file: File) => {
            console.log(file.name);

            // Safe property access with null checks
            const metadata = file.metadata;
            return {
                name: file.name,
                size: metadata?.size?.toString() ?? '0',
                timeCreated: metadata?.timeCreated ?? '',
                updated: metadata?.updated ?? '',
                contentType: metadata?.contentType ?? null,
                etag: metadata?.etag ?? ''
            };
        });

        // Safe array processing with type guards
        const prefixes: string[] = [];
        if (Array.isArray(apiResponse.prefixes) && apiResponse.prefixes.length > 0) {
            console.log('\nSub-folders:');
            apiResponse.prefixes.forEach((p: unknown) => {
                if (typeof p === 'string') {
                    console.log(p);
                    prefixes.push(p);
                }
            });
        }

        return {
            files: Object.freeze(fileDetails),
            prefixes: Object.freeze(prefixes),
            nextPageToken: typeof apiResponse.nextPageToken === 'string'
                ? apiResponse.nextPageToken
                : undefined
        };

    } catch (error: unknown) {
        const errorMessage = error instanceof Error
            ? error.message
            : 'Unknown error occurred';

        console.error('Error listing files:', error);
        throw new Error(`Failed to list files with prefix "${prefix}": ${errorMessage}`);
    }
}

// Enhanced version with strict type safety and pagination
export async function listAllFiles(
    prefix = '',
    maxFiles?: number
): Promise<ListFilesResult> {
    try {
        const allFiles: FileMetadata[] = [];
        const allPrefixes: string[] = [];
        let nextPageToken: string | undefined;
        let totalProcessed = 0;

        // Input validation
        if (maxFiles != null && (maxFiles <= 0 || !Number.isInteger(maxFiles))) {
            throw new Error('maxFiles must be a positive integer');
        }

        do {
            const options: GetFilesOptions = {
                prefix,
                delimiter: '/',
                maxResults: maxFiles
                    ? Math.min(1000, maxFiles - totalProcessed)
                    : 1000,
            };

            // Add pageToken only if it exists
            if (nextPageToken) {
                options.pageToken = nextPageToken;
            }

            const response: GetFilesResponse = await googleBucket.getFiles(options);
            const [files, , apiResponse] = response;

            // Process files with safe property access
            for (const file of files) {
                const metadata = file.metadata;
                allFiles.push({
                    name: file.name,
                    size: metadata?.size?.toString() ?? '0',
                    timeCreated: metadata?.timeCreated ?? '',
                    updated: metadata?.updated ?? '',
                    contentType: metadata?.contentType ?? null,
                    etag: metadata?.etag ?? ''
                });
            }

            // Process prefixes with type safety
            if (Array.isArray(apiResponse.prefixes)) {
                for (const p of apiResponse.prefixes) {
                    if (typeof p === 'string' && !allPrefixes.includes(p)) {
                        allPrefixes.push(p);
                    }
                }
            }

            nextPageToken = typeof apiResponse.nextPageToken === 'string'
                ? apiResponse.nextPageToken
                : undefined;

            totalProcessed += files.length;

            // Break if we've reached the max files limit
            if (maxFiles != null && totalProcessed >= maxFiles) {
                break;
            }

        } while (nextPageToken != null);

        console.log(`Total files found: ${allFiles.length}`);
        console.log(`Total sub-folders found: ${allPrefixes.length}`);

        return {
            files: Object.freeze(allFiles),
            prefixes: Object.freeze(allPrefixes),
            nextPageToken: undefined
        };

    } catch (error: unknown) {
        const errorMessage = error instanceof Error
            ? error.message
            : 'Unknown error occurred';

        console.error('Error listing all files:', error);
        throw new Error(`Failed to list all files with prefix "${prefix}": ${errorMessage}`);
    }
}

// Type-safe file filtering by extension
export async function listFilesByExtension(
    prefix = '',
    extensions: ReadonlyArray<string>
): Promise<ListFilesResult> {
    try {
        // Input validation
        if (!Array.isArray(extensions) || extensions.length === 0) {
            throw new Error('Extensions array cannot be empty');
        }

        // Validate all extensions are strings
        for (const ext of extensions) {
            if (typeof ext !== 'string' || ext.trim() === '') {
                throw new Error('All extensions must be non-empty strings');
            }
        }

        const result = await listFiles(prefix);

        // Safe extension filtering with proper type checking
        const normalizedExtensions = extensions.map(ext =>
            ext.toLowerCase().replace(/^\./, '') // Remove leading dot if present
        );

        const filteredFiles = result.files.filter((file): file is FileMetadata => {
            const fileName = file.name;
            const lastDotIndex = fileName.lastIndexOf('.');

            if (lastDotIndex === -1 || lastDotIndex === fileName.length - 1) {
                return false; // No extension or ends with dot
            }

            const fileExtension = fileName.substring(lastDotIndex + 1).toLowerCase();
            return normalizedExtensions.includes(fileExtension);
        });

        return {
            files: Object.freeze(filteredFiles),
            prefixes: result.prefixes,
            nextPageToken: result.nextPageToken
        };

    } catch (error: unknown) {
        const errorMessage = error instanceof Error
            ? error.message
            : 'Unknown error occurred';

        console.error('Error filtering files by extension:', error);
        throw new Error(`Failed to filter files by extension: ${errorMessage}`);
    }
}

// Type-safe utility function to check if a file exists
export async function fileExists(fileName: string): Promise<boolean> {
    try {
        if (typeof fileName !== 'string' || fileName.trim() === '') {
            throw new Error('File name must be a non-empty string');
        }

        const file = googleBucket.file(fileName);
        const [exists] = await file.exists();
        return exists;

    } catch (error: unknown) {
        const errorMessage = error instanceof Error
            ? error.message
            : 'Unknown error occurred';

        console.error('Error checking file existence:', error);
        throw new Error(`Failed to check if file exists "${fileName}": ${errorMessage}`);
    }
}