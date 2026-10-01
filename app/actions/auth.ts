'use server';

import { signIn, signOut } from '@/auth';
import { AuthError } from 'next-auth';
import type { AppUserRole } from '@/types/chat';

function getErrorMessage(error: unknown) {
    return error instanceof Error ? error.message : 'Something went wrong';
}

export async function handleGoogleSignIn(role: 'learner' | 'mentor') {
    try {
        await signIn('google', {
            redirect: true,
            redirectTo: role === 'learner' ? '/learner' : '/mentor',
        });
    } catch (error) {
        if (error instanceof AuthError) {
            console.error('Auth error:', error);
        }
        throw error;
    }
}

export async function handleLinkedInSignIn(role: 'learner' | 'mentor') {
    try {
        await signIn('linkedin', {
            redirect: true,
            redirectTo: role === 'learner' ? '/learner' : '/mentor',
        });
    } catch (error) {
        if (error instanceof AuthError) {
            console.error('Auth error:', error);
        }
        throw error;
    }
}

export async function handleSignOut() {
    try {
        await signOut({
            redirect: true,
            redirectTo: '/login',
        });
    } catch (error) {
        console.error('Sign out error:', error);
        throw error;
    }
}

import { findUserByEmail, createUser } from '@/lib/r2';

export async function handleCredentialsSignUp(formData: FormData) {
    const firstName = formData.get('firstName') as string;
    const lastName = formData.get('lastName') as string;
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;
    const role = (formData.get('role') as AppUserRole | null) ?? 'learner';

    if (!firstName || !lastName || !email || !password || !role) {
        return { error: "All fields are required" };
    }

    try {
        const existingUser = await findUserByEmail(email);
        if (existingUser) {
            return { error: "User already registered" };
        }

        await createUser(email, {
            firstName,
            lastName,
            email,
            password,
            role,
            createdAt: new Date().toISOString()
        });

        return { success: true };
    } catch (error: unknown) {
        console.error('Signup error:', error);
        return { error: getErrorMessage(error) || 'Something went wrong during signup' };
    }
}

export async function handleCredentialsSignIn(
    formData: FormData,
    expectedRole?: AppUserRole
) {
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    if (!email || !password) {
        return { error: "Email and password are required" };
    }

    try {
        const user = await findUserByEmail(email);
        if (!user) {
            return { error: "User not registered and Sign up first" };
        }

        if (user.password !== password) {
            return { error: "Invalid credentials" };
        }

        if (expectedRole && user.role !== expectedRole) {
            return { error: `This account is registered as ${user.role || 'learner'}` };
        }

        await signIn('credentials', {
            email,
            password,
            redirect: false,
        });
        return {
            success: true,
            role: user.role || 'learner',
            redirectTo: user.role === 'mentor' ? '/mentor' : '/learner',
        };
    } catch (error: unknown) {
        if (error instanceof AuthError) {
            // NextAuth specific errors or our CustomAuthError code map to type/cause
            // error.type is usually 'CredentialsSignin'
            // and error.cause?.err?.message is the custom error message we threw
            const errMessage =
                error.cause && typeof error.cause === 'object' && 'err' in error.cause
                    ? (error.cause.err instanceof Error ? error.cause.err.message : error.message)
                    : error.message;
            if (errMessage.includes("User not registered and Sign up first")) {
                return { error: "User not registered and Sign up first" };
            }
            return { error: errMessage || "Invalid credentials" };
        }
        return { error: getErrorMessage(error) || "Something went wrong during sign in" };
    }
}
