import { cookies, headers } from 'next/headers';
import { redirect } from 'next/navigation';
import { TOKENS } from './constants';
import { getDetails } from '@/services/auth.service';

export const checkToken = (name?: string): string | undefined => {
    const token = cookies().get(name || TOKENS.AUTH_TOKEN)?.value;
    return token;
}

export const protect = async (redirectTo = "/login") => {
    const headerList = headers();
    const token = checkToken();
    const isLoggedIn = await getDetails(token);
    if (!isLoggedIn) {
        const currentUrl = headerList.get("x-current-path");
        const encodedCurrentUrl = encodeURIComponent(currentUrl || "");
        const redirectUrl = `${redirectTo}?from=${encodedCurrentUrl}`;
        redirect(redirectUrl);
    }
}