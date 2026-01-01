import { writeFile, mkdir } from 'fs/promises';
import { join } from 'path';

/**
 * Uploads an image file to the designated directory
 * @param {File} file - The file object to upload
 * @param {string} type - The subdirectory name (e.g., 'achievements', 'partners')
 * @returns {Promise<string|null>} - The public URL of the uploaded image
 */
export async function uploadImage(file, type = 'general') {
    if (!file) return null;

    try {
        // Get file buffer
        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);

        // Create upload directory if it doesn't exist
        const uploadDir = join(process.cwd(), 'public', 'uploads', type);
        await mkdir(uploadDir, { recursive: true });

        // Generate unique filename
        const timestamp = Date.now();
        const originalName = file.name.replace(/[^a-zA-Z0-9.-]/g, '_');
        const filename = `${timestamp}-${originalName}`;
        const filepath = join(uploadDir, filename);

        // Write file
        await writeFile(filepath, buffer);

        // Return public URL
        return `/uploads/${type}/${filename}`;
    } catch (error) {
        console.error('Upload helper error:', error);
        throw new Error('Failed to upload image');
    }
}
