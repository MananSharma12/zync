"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Zap, Plus, Search, Pause, Settings, MoreHorizontal } from "lucide-react"
import Link from "next/link"
import { ThemeToggle } from "@/components/theme-toggle"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import axios from "axios";
import { BACKEND_URL, HOOKS_URL } from "@/config";
import type { Zaps } from "@/types";
import { useAuth } from "@/lib/auth-context";
import { toast } from "sonner"

function useZaps () {
    const [zaps, setZaps] = useState<Zaps[]>([])

    useEffect(() => {
        axios.get(`${BACKEND_URL}/api/v1/zap`, {
            headers: {
                Authorization: localStorage.getItem("token")
            }
        }).then(res => {
            setZaps(res.data.zaps)
        }).catch(err => {
            console.log(err)
        })
    }, []);

    return zaps
}

export default function DashboardPage() {
    const [searchQuery, setSearchQuery] = useState("")
    const zaps = useZaps()
    const { user, logout } = useAuth()

    const handleCopyWebhook = (url: string) => {
        navigator.clipboard.writeText(url)
            .then(() => {
                toast.success('Copied to clipboard');
            });
    }

    const filteredZaps = zaps.filter((zap) => {
        const triggerName = zap.name || '';
        const actionNames = zap.actions.map(action => action.type.name).join(' ');
        const searchableText = `${triggerName} ${actionNames}`.toLowerCase();

        return searchableText.includes(searchQuery.toLowerCase());
    });

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
            {/* Header */}
            <header className="bg-white dark:bg-gray-800 border-b">
                <div className="container mx-auto px-4 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <Zap className="h-8 w-8 text-blue-600" />
                        <Link href="/">
                            <span className="text-2xl font-bold">Zync</span>
                        </Link>
                    </div>
                    <div className="flex items-center gap-4">
                        <ThemeToggle />
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="sm">
                                    {user?.name || "User"}
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                                <DropdownMenuItem>Profile</DropdownMenuItem>
                                <DropdownMenuItem>Settings</DropdownMenuItem>
                                <DropdownMenuItem onClick={logout}>Sign Out</DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                </div>
            </header>

            <div className="container mx-auto px-4 py-8">
                {/* Page Header */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
                    <div>
                        <h1 className="text-3xl font-bold">My Zaps</h1>
                        <p className="text-gray-600 dark:text-gray-300">Manage your automations and workflows</p>
                    </div>
                    <Link href="/zap/create">
                        <Button size="lg">
                            <Plus className="mr-2 h-5 w-5" />
                            Create Zap
                        </Button>
                    </Link>
                </div>

                {/* Search and Filters */}
                <div className="flex flex-col sm:flex-row gap-4 mb-6">
                    <div className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <Input
                            placeholder="Search zaps..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="pl-10"
                        />
                    </div>
                    <Button variant="outline">Filter</Button>
                </div>

                {/* Zaps Grid */}
                {filteredZaps.length === 0 ? (
                    <Card className="text-center py-12">
                        <CardContent>
                            <Zap className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                            <h3 className="text-lg font-semibold mb-2">No zaps found</h3>
                            <p className="text-gray-600 dark:text-gray-300 mb-4">
                                {searchQuery ? "Try adjusting your search" : "Create your first automation to get started"}
                            </p>
                            <Link href="/zap/create">
                                <Button>
                                    <Plus className="mr-2 h-4 w-4" />
                                    Create Your First Zap
                                </Button>
                            </Link>
                        </CardContent>
                    </Card>
                ) : (
                    <div className="grid lg:grid-cols-2 gap-6">
                        {filteredZaps.map((zap) => {
                            const triggerName = zap.name || 'No Trigger';
                            const actionNames = zap.actions.map(action => action.type.name);
                            let zapName;
                            if(triggerName === 'No Trigger') {
                                zapName = `${triggerName} → ${actionNames.join(' → ')}`;
                            } else {
                                zapName = triggerName;
                            }

                            return (
                                <Card key={zap.id} className="hover:shadow-md transition-shadow">
                                    <CardHeader>
                                        <div className="flex items-start justify-between">
                                            <div className="flex-1">
                                                <CardTitle className="text-lg mb-2 capitalize">{zapName}</CardTitle>
                                                <CardDescription className="flex items-center gap-2">
                                                    <span className="font-medium capitalize">{triggerName}</span>
                                                    <span>→</span>
                                                    <span className="capitalize">{actionNames.join(" → ")}</span>
                                                </CardDescription>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <Badge variant="default">Active</Badge>
                                                <DropdownMenu>
                                                    <DropdownMenuTrigger asChild>
                                                        <Button variant="ghost" size="sm">
                                                            <MoreHorizontal className="h-4 w-4" />
                                                        </Button>
                                                    </DropdownMenuTrigger>
                                                    <DropdownMenuContent align="end">
                                                        <DropdownMenuItem>
                                                            <Settings className="mr-2 h-4 w-4" />
                                                            Edit
                                                        </DropdownMenuItem>
                                                        <DropdownMenuItem>
                                                            <Pause className="mr-2 h-4 w-4" />
                                                            Pause
                                                        </DropdownMenuItem>
                                                        <DropdownMenuItem className="text-red-600">Delete</DropdownMenuItem>
                                                    </DropdownMenuContent>
                                                </DropdownMenu>
                                            </div>
                                        </div>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="mb-2 text-sm">
                                            <span>Webhook URL:</span>
                                            <br/>
                                            <Button
                                                variant="link"
                                                className="p-0 text-blue-400"
                                                onClick={() => handleCopyWebhook(`${HOOKS_URL}/hooks/catch/1/${zap.id}`)}
                                            >
                                                {`${HOOKS_URL}/hooks/catch/1/${zap.id}`}
                                            </Button>
                                        </div>
                                        <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-300">
                                            <span>ID: {zap.id}</span>
                                            <span>{zap.actions.length} action{zap.actions.length !== 1 ? 's' : ''}</span>
                                        </div>
                                    </CardContent>
                                </Card>
                            );
                        })}
                    </div>
                )}
            </div>
        </div>
    )
}
