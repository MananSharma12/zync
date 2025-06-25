import { Zap } from "lucide-react";

export const Footer = () => {
    return (
        <footer className="bg-gray-50 dark:bg-gray-900 py-12">
            <div className="container mx-auto px-4 text-center">
                <div className="flex items-center justify-center gap-2 mb-4">
                    <Zap className="h-6 w-6 text-blue-600" />
                    <span className="text-xl font-bold">Zync</span>
                </div>
                <p className="text-gray-600 dark:text-gray-300">© 2024 Zync. All rights reserved.</p>
            </div>
        </footer>
    );
};
