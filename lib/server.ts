import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { TOKENS } from './constants';

export const checkToken = (name?: string): string | undefined => {
    const token = cookies().get(name || TOKENS.AUTH_TOKEN)?.value;
    return token;
}

export const protect = () => {
    const isLoggedIn = checkToken();
    if (!isLoggedIn) redirect("/login");
}