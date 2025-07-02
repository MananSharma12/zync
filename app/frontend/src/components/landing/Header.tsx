"use client";

import Link from "next/link";
import { Zap, LogOut } from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/lib/auth-context";

export const Header = () => {
    const { isAuthenticated, logout } = useAuth();

    return (
        <header className="border-b bg-white/80 backdrop-blur-sm dark:bg-gray-900/80">
            <div className="container mx-auto px-4 py-4 flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <Zap className="h-8 w-8 text-blue-600" />
                    <Link href="/">
                        <span className="text-2xl font-bold">Zync</span>
                    </Link>
                </div>
                <div className="flex items-center gap-4">
                    <ThemeToggle />
                    {isAuthenticated ? (
                        <>
                            <Link href="/dashboard">
                                <Button variant="ghost">Dashboard</Button>
                            </Link>
                            <Button variant="outline" onClick={logout}>
                                <LogOut className="mr-2 h-4 w-4" />
                                Sign Out
                            </Button>
                        </>
                    ) : (
                        <>
                            <Link href="/signin">
                                <Button variant="ghost">Sign In</Button>
                            </Link>
                            <Link href="/signup">
                                <Button>Get Started</Button>
                            </Link>
                        </>
                    )}
                </div>
            </div>
        </header>
    );
};
