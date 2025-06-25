import Link from "next/link";
import { Zap } from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";

export const Header = () => {
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
                    <Link href="/signin">
                        <Button variant="ghost">Sign In</Button>
                    </Link>
                    <Link href="/signup">
                        <Button>Get Started</Button>
                    </Link>
                </div>
            </div>
        </header>
    );
};
