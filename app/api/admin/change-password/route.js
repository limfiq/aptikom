import { NextResponse } from 'next/server';
import { Admin, ActivityLog } from '@/models';
import { comparePassword } from '@/lib/auth';
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'aptikom-secret-key-2025';

export async function POST(request) {
    try {
        // Get authorization header
        const authHeader = request.headers.get('authorization');
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return NextResponse.json(
                { success: false, message: 'Token tidak valid' },
                { status: 401 }
            );
        }

        // Verify token
        const token = authHeader.substring(7);
        let decoded;
        try {
            decoded = jwt.verify(token, JWT_SECRET);
        } catch (error) {
            return NextResponse.json(
                { success: false, message: 'Token tidak valid atau kadaluarsa' },
                { status: 401 }
            );
        }

        const adminId = decoded.id;
        const { currentPassword, newPassword } = await request.json();

        // Validate input
        if (!currentPassword || !newPassword) {
            return NextResponse.json(
                { success: false, message: 'Password lama dan baru harus diisi' },
                { status: 400 }
            );
        }

        if (newPassword.length < 6) {
            return NextResponse.json(
                { success: false, message: 'Password minimal 6 karakter' },
                { status: 400 }
            );
        }

        // Find admin
        const admin = await Admin.findByPk(adminId);
        if (!admin) {
            return NextResponse.json(
                { success: false, message: 'Admin tidak ditemukan' },
                { status: 404 }
            );
        }

        // Verify current password
        const passwordMatch = await comparePassword(currentPassword, admin.password);
        if (!passwordMatch) {
            return NextResponse.json(
                { success: false, message: 'Password lama tidak sesuai' },
                { status: 400 }
            );
        }

        // Check if new password is same as old
        const samePassword = await comparePassword(newPassword, admin.password);
        if (samePassword) {
            return NextResponse.json(
                { success: false, message: 'Password baru harus berbeda dengan password lama' },
                { status: 400 }
            );
        }

        // Hash new password
        const hashedPassword = await bcryptjs.hash(newPassword, 10);

        // Update password
        await admin.update({ password: hashedPassword });

        // Log activity
        await ActivityLog.create({
            adminId: adminId,
            action: 'CHANGE_PASSWORD',
            details: `Admin ${admin.username} mengubah password`
        });

        return NextResponse.json({
            success: true,
            message: 'Password berhasil diubah'
        });
    } catch (error) {
        console.error('Error changing password:', error);
        return NextResponse.json(
            { success: false, message: 'Terjadi kesalahan pada server' },
            { status: 500 }
        );
    }
}
