"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/lib/auth-context";

export const CTA = () => {
    const { isAuthenticated } = useAuth();

    return (
        <section className="bg-blue-800 text-white py-20">
            <div className="container mx-auto px-4 text-center">
                <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
                <p className="text-xl mb-8 opacity-90">Join thousands of users who are already automating their workflows</p>
                {isAuthenticated ? (
                    <Link href="/zap/create">
                        <Button size="lg" variant="secondary" className="text-lg px-8 py-6">
                            Create Your First Zap
                        </Button>
                    </Link>
                ) : (
                    <Link href="/signup">
                        <Button size="lg" variant="secondary" className="text-lg px-8 py-6">
                            Create Your First Zap
                        </Button>
                    </Link>
                )}
            </div>
        </section>
    );
};
