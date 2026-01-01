import { NextResponse } from 'next/server';
import { ContactMessage } from '@/models';

// PATCH - Update message status
export async function PATCH(request, { params }) {
    try {
        const { id } = await params;
        const body = await request.json();
        const { status } = body;

        // Validate status
        const validStatuses = ['unread', 'read', 'replied'];
        if (!validStatuses.includes(status)) {
            return NextResponse.json(
                { success: false, message: 'Status tidak valid' },
                { status: 400 }
            );
        }

        // Find and update message
        const message = await ContactMessage.findByPk(id);

        if (!message) {
            return NextResponse.json(
                { success: false, message: 'Pesan tidak ditemukan' },
                { status: 404 }
            );
        }

        await message.update({ status });

        return NextResponse.json({
            success: true,
            message: 'Status berhasil diupdate',
            data: message
        });

    } catch (error) {
        console.error('Error updating message:', error);
        return NextResponse.json(
            { success: false, message: 'Terjadi kesalahan saat mengupdate pesan' },
            { status: 500 }
        );
    }
}

// DELETE - Delete message
export async function DELETE(request, { params }) {
    try {
        const { id } = await params;

        // Find message
        const message = await ContactMessage.findByPk(id);

        if (!message) {
            return NextResponse.json(
                { success: false, message: 'Pesan tidak ditemukan' },
                { status: 404 }
            );
        }

        // Delete message
        await message.destroy();

        return NextResponse.json({
            success: true,
            message: 'Pesan berhasil dihapus'
        });

    } catch (error) {
        console.error('Error deleting message:', error);
        return NextResponse.json(
            { success: false, message: 'Terjadi kesalahan saat menghapus pesan' },
            { status: 500 }
        );
    }
}

// GET - Get single message
export async function GET(request, { params }) {
    try {
        const { id } = await params;

        const message = await ContactMessage.findByPk(id);

        if (!message) {
            return NextResponse.json(
                { success: false, message: 'Pesan tidak ditemukan' },
                { status: 404 }
            );
        }

        return NextResponse.json({
            success: true,
            data: message
        });

    } catch (error) {
        console.error('Error fetching message:', error);
        return NextResponse.json(
            { success: false, message: 'Terjadi kesalahan saat mengambil pesan' },
            { status: 500 }
        );
    }
}
