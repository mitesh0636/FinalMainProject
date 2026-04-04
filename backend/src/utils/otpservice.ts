const otpCache = new Map<string, { otp: string; expiresAt: number }>();

export const generateOTP = (email: string): string => {
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const expiresAt = Date.now() + 5 * 60 * 1000;
    otpCache.set(email, { otp, expiresAt})
    return otp;
};


export const verifyOTP = (email: string, userentered: string): boolean => {
    const record = otpCache.get(email);
    if (!record) return false;
    if (Date.now() > record.expiresAt) {
        otpCache.delete(email);
        return false;
    }
    return record.otp === userentered;
};

export const clearOTP = (email: string) => otpCache.delete(email);