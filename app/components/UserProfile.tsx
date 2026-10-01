import { auth } from '@/auth';
import Image from 'next/image';
import LogoutButton from './LogoutButton';

export default async function UserProfile() {
    const session = await auth();

    if (!session?.user) {
        return null;
    }

    return (
        <div className="flex items-center gap-3 p-4 bg-white rounded-lg shadow-sm border border-gray-200">
            {/* User Avatar */}
            <div className="relative w-10 h-10 rounded-full overflow-hidden bg-gray-200">
                {session.user.image ? (
                    <Image
                        src={session.user.image}
                        alt={session.user.name || 'User'}
                        width={40}
                        height={40}
                        className="object-cover rounded-full"
                    />
                ) : (
                    <div className="w-full h-full flex items-center justify-center bg-blue-500 text-white font-semibold">
                        {session.user.name?.charAt(0).toUpperCase() || 'U'}
                    </div>
                )}
            </div>

            {/* User Info */}
            <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-gray-900 truncate">
                    {session.user.name || 'User'}
                </p>
                <p className="text-xs text-gray-500 truncate">
                    {session.user.email}
                </p>
            </div>

            {/* Logout Button */}
            <LogoutButton />
        </div>
    );
}
