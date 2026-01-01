/**
 * Simple In-Memory Rate Limiter
 * Prevents abuse by limiting requests per IP address
 */

class RateLimiter {
    constructor(options = {}) {
        this.windowMs = options.windowMs || 60000; // 1 minute default
        this.maxRequests = options.maxRequests || 100; // 100 requests per window
        this.requests = new Map();

        // Clean up old entries every minute
        setInterval(() => this.cleanup(), 60000);
    }

    // Check if request should be allowed
    isAllowed(identifier) {
        const now = Date.now();
        const userRequests = this.requests.get(identifier) || [];

        // Filter out requests outside the current window
        const recentRequests = userRequests.filter(
            timestamp => now - timestamp < this.windowMs
        );

        // Check if limit exceeded
        if (recentRequests.length >= this.maxRequests) {
            return {
                allowed: false,
                retryAfter: Math.ceil((recentRequests[0] + this.windowMs - now) / 1000)
            };
        }

        // Add current request
        recentRequests.push(now);
        this.requests.set(identifier, recentRequests);

        return {
            allowed: true,
            remaining: this.maxRequests - recentRequests.length
        };
    }

    // Clean up old entries
    cleanup() {
        const now = Date.now();
        for (const [identifier, timestamps] of this.requests.entries()) {
            const recentRequests = timestamps.filter(
                timestamp => now - timestamp < this.windowMs
            );
            if (recentRequests.length === 0) {
                this.requests.delete(identifier);
            } else {
                this.requests.set(identifier, recentRequests);
            }
        }
    }

    // Reset rate limit for identifier
    reset(identifier) {
        this.requests.delete(identifier);
    }
}

// Create rate limiters for different endpoints
const globalLimiter = new RateLimiter({
    windowMs: 60000, // 1 minute
    maxRequests: 100 // 100 requests per minute
});

const authLimiter = new RateLimiter({
    windowMs: 900000, // 15 minutes
    maxRequests: 5 // 5 login attempts per 15 minutes
});

const apiLimiter = new RateLimiter({
    windowMs: 60000, // 1 minute
    maxRequests: 60 // 60 API requests per minute
});

// Get client IP from request
function getClientIp(request) {
    // Try to get real IP from headers (for proxies/load balancers)
    const forwarded = request.headers.get('x-forwarded-for');
    if (forwarded) {
        return forwarded.split(',')[0].trim();
    }

    const realIp = request.headers.get('x-real-ip');
    if (realIp) {
        return realIp;
    }

    // Fallback to connection remote address
    return 'unknown';
}

// Middleware to apply rate limiting
function rateLimitMiddleware(limiter = globalLimiter) {
    return async (request) => {
        const ip = getClientIp(request);
        const result = limiter.isAllowed(ip);

        if (!result.allowed) {
            return {
                allowed: false,
                response: Response.json(
                    {
                        error: 'Too many requests',
                        retryAfter: result.retryAfter
                    },
                    {
                        status: 429,
                        headers: {
                            'Retry-After': result.retryAfter.toString(),
                            'X-RateLimit-Limit': limiter.maxRequests.toString(),
                            'X-RateLimit-Remaining': '0'
                        }
                    }
                )
            };
        }

        return {
            allowed: true,
            headers: {
                'X-RateLimit-Limit': limiter.maxRequests.toString(),
                'X-RateLimit-Remaining': result.remaining.toString()
            }
        };
    };
}

module.exports = {
    RateLimiter,
    globalLimiter,
    authLimiter,
    apiLimiter,
    getClientIp,
    rateLimitMiddleware
};
