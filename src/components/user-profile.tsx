'use client';

import { UserCircle, LogOut, Bell, User } from 'lucide-react';
import { Button } from './ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from './ui/dropdown-menu';
import { createClient } from '../../supabase/client';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Image from 'next/image';

export default function UserProfile() {
    const supabase = createClient();
    const router = useRouter();
    const [user, setUser] = useState<any>(null);

    useEffect(() => {
        const fetchUser = async () => {
            const { data: { user } } = await supabase.auth.getUser();
            setUser(user);
        };
        fetchUser();
    }, [supabase.auth]);
    const handleSignOut = async () => {
        await supabase.auth.signOut();
        router.refresh();
    };

    
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full">
                    {user?.user_metadata?.avatar_url ? (
                        <Image
                            src={user.user_metadata.avatar_url}
                            alt="User Avatar"
                            width={32}
                            height={32}
                            className="rounded-full"
                        />
                    ) : (
                        <UserCircle className="h-6 w-6" />
                    )}
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>
                    {user ? (
                        <div className="flex flex-col space-y-1">
                            <p className="font-medium">{user.email}</p>
                            <p className="text-sm text-gray-500">Welcome back!</p>
                        </div>
                    ) : (
                        'Guest'
                    )}
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => router.push('/dashboard/profile')}>
                    <User className="mr-2 h-4 w-4" />
                    <span>Profile</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => router.push('/dashboard/notification')}>
                    <Bell className="mr-2 h-4 w-4" />
                    <span>Notification</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleSignOut}>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Sign out</span>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}