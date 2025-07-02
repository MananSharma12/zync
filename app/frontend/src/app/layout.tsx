import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "next-themes"
import { ReactQueryProvider } from "@/lib/react-query-provider";
import { AuthProvider } from "@/lib/auth-context";
import { Toaster } from "@/components/ui/sonner"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
    title: "Zync",
    description: "Zync is a modern automation platform inspired by Zapier. It lets users connect apps and services together using triggers and actions—no manual work needed.",
}

export default function RootLayout({ children, }: { children: React.ReactNode }) {
    return (
        <html lang="en" suppressHydrationWarning>
        <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
            <ReactQueryProvider>
                <AuthProvider>
                    {children}
                </AuthProvider>
            </ReactQueryProvider>
            <Toaster />
        </ThemeProvider>
        </body>
        </html>
    )
}
