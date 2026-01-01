import { writeFile, mkdir } from 'fs/promises';
import { join } from 'path';
import { authenticateAdmin, unauthorizedResponse } from '../../../../lib/middleware';

export const config = {
    api: {
        bodyParser: false,
    },
};

export async function POST(request) {
    const auth = await authenticateAdmin(request);
    if (!auth.authenticated) {
        return unauthorizedResponse(auth.error);
    }

    try {
        const formData = await request.formData();
        const file = formData.get('file');
        const type = formData.get('type') || 'general'; // image, document, logo, etc.

        if (!file) {
            return Response.json(
                { error: 'No file provided' },
                { status: 400 }
            );
        }

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
        const fileUrl = `/uploads/${type}/${filename}`;

        return Response.json({
            success: true,
            url: fileUrl,
            filename,
            size: buffer.length,
            type: file.type
        });

    } catch (error) {
        console.error('Upload error:', error);
        return Response.json(
            { error: 'Failed to upload file' },
            { status: 500 }
        );
    }
}
