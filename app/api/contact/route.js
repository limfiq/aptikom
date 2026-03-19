import { NextResponse } from 'next/server';
import { ContactMessage } from '@/models';
import DOMPurify from 'isomorphic-dompurify';

// Rate limiting storage (in production, use Redis or database)
const rateLimitMap = new Map();

// Clean up old rate limit entries every 5 minutes
setInterval(() => {
    const now = Date.now();
    for (const [key, value] of rateLimitMap.entries()) {
        if (now - value.timestamp > 3600000) { // 1 hour
            rateLimitMap.delete(key);
        }
    }
}, 300000);

function checkRateLimit(ip) {
    const now = Date.now();
    const userLimit = rateLimitMap.get(ip);

    if (!userLimit) {
        rateLimitMap.set(ip, { count: 1, timestamp: now });
        return true;
    }

    // Reset if more than 1 hour has passed
    if (now - userLimit.timestamp > 3600000) {
        rateLimitMap.set(ip, { count: 1, timestamp: now });
        return true;
    }

    // Check if limit exceeded (5 submissions per hour)
    if (userLimit.count >= 5) {
        return false;
    }

    userLimit.count++;
    return true;
}

function getClientIp(request) {
    const forwarded = request.headers.get('x-forwarded-for');
    const realIp = request.headers.get('x-real-ip');

    if (forwarded) {
        return forwarded.split(',')[0].trim();
    }

    if (realIp) {
        return realIp;
    }

    return 'unknown';
}

function sanitizeInput(input) {
    if (typeof input !== 'string') return '';

    // Remove any HTML tags and scripts
    const cleaned = DOMPurify.sanitize(input, {
        ALLOWED_TAGS: [], // No HTML tags allowed
        ALLOWED_ATTR: []
    });

    // Trim and limit length
    return cleaned.trim().substring(0, 5000);
}

export async function POST(request) {
    try {
        // Get client IP and user agent
        const ipAddress = getClientIp(request);
        const userAgent = request.headers.get('user-agent') || 'unknown';

        // Check rate limit
        if (!checkRateLimit(ipAddress)) {
            return NextResponse.json(
                {
                    success: false,
                    message: 'Terlalu banyak pengiriman. Silakan coba lagi dalam 1 jam.'
                },
                { status: 429 }
            );
        }

        // Parse request body
        const body = await request.json();
        const { name, email, subject, message, recaptchaToken } = body;

        if (!recaptchaToken) {
            return NextResponse.json(
                {
                    success: false,
                    message: 'Silakan verifikasi reCAPTCHA terlebih dahulu.'
                },
                { status: 400 }
            );
        }

        // Verify reCAPTCHA token
        const recaptchaSecretKey = process.env.RECAPTCHA_SECRET_KEY || '6LeIxAcTAAAAAGG-vFI1TnRWxMZNFuojJ4WifJWe';
        const recaptchaVerifyUrl = `https://www.google.com/recaptcha/api/siteverify?secret=${recaptchaSecretKey}&response=${recaptchaToken}`;

        const recaptchaRes = await fetch(recaptchaVerifyUrl, { method: 'POST' });
        const recaptchaData = await recaptchaRes.json();

        if (!recaptchaData.success) {
            return NextResponse.json(
                {
                    success: false,
                    message: 'Verifikasi reCAPTCHA gagal. Silakan coba lagi.'
                },
                { status: 400 }
            );
        }

        // Validate required fields
        if (!name || !email || !subject || !message) {
            return NextResponse.json(
                {
                    success: false,
                    message: 'Semua field harus diisi.'
                },
                { status: 400 }
            );
        }

        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return NextResponse.json(
                {
                    success: false,
                    message: 'Format email tidak valid.'
                },
                { status: 400 }
            );
        }

        // Sanitize all inputs
        const sanitizedData = {
            name: sanitizeInput(name),
            email: sanitizeInput(email),
            subject: sanitizeInput(subject),
            message: sanitizeInput(message),
            ipAddress,
            userAgent: userAgent.substring(0, 500), // Limit user agent length
            status: 'unread'
        };

        // Validate sanitized data is not empty
        if (!sanitizedData.name || !sanitizedData.email ||
            !sanitizedData.subject || !sanitizedData.message) {
            return NextResponse.json(
                {
                    success: false,
                    message: 'Input tidak valid setelah sanitasi.'
                },
                { status: 400 }
            );
        }

        // Save to database
        const contactMessage = await ContactMessage.create(sanitizedData);

        return NextResponse.json(
            {
                success: true,
                message: 'Pesan Anda berhasil dikirim. Kami akan segera menghubungi Anda.',
                id: contactMessage.id
            },
            { status: 201 }
        );

    } catch (error) {
        console.error('Error saving contact message:', error);

        return NextResponse.json(
            {
                success: false,
                message: 'Terjadi kesalahan saat mengirim pesan. Silakan coba lagi.'
            },
            { status: 500 }
        );
    }
}

// GET endpoint for admin to retrieve messages (optional)
export async function GET(request) {
    try {
        const { searchParams } = new URL(request.url);
        const status = searchParams.get('status');
        const limit = parseInt(searchParams.get('limit') || '50');
        const offset = parseInt(searchParams.get('offset') || '0');

        const where = status ? { status } : {};

        const messages = await ContactMessage.findAll({
            where,
            limit: Math.min(limit, 100), // Max 100 per request
            offset,
            order: [['createdAt', 'DESC']]
        });

        const total = await ContactMessage.count({ where });

        return NextResponse.json({
            success: true,
            data: messages,
            total,
            limit,
            offset
        });

    } catch (error) {
        console.error('Error fetching contact messages:', error);

        return NextResponse.json(
            {
                success: false,
                message: 'Terjadi kesalahan saat mengambil data.'
            },
            { status: 500 }
        );
    }
}
