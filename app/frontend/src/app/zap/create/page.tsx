"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation";
import axios from "axios";
import { Zap, ArrowRight, Plus, X, ChevronLeft } from "lucide-react"
import { BACKEND_URL } from "@/config";
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ThemeToggle } from "@/components/theme-toggle"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useAvailableActionsAndTriggers } from "@/app/zap/create/useAvailableActionsAndTriggers";
import type { Step, Action, Trigger } from "@/types";

export default function CreateZapPage() {
    const { data, isLoading, isError } = useAvailableActionsAndTriggers()
    const [currentStep, setCurrentStep] = useState<Step>("name")

    const router = useRouter()

    const [zapData, setZapData] = useState<{
        name: string,
        trigger: Trigger | null,
        actions: Action[],
    }>({
        name: "",
        trigger: null,
        actions: [],
    })

    const handleNext = () => {
        const steps: Step[] = ["name", "trigger", "actions", "review"]
        const currentIndex = steps.indexOf(currentStep)
        if (currentIndex < steps.length - 1) {
            setCurrentStep(steps[currentIndex + 1])
        }
    }

    const handleBack = () => {
        const steps: Step[] = ["name", "trigger", "actions", "review"]
        const currentIndex = steps.indexOf(currentStep)
        if (currentIndex > 0) {
            setCurrentStep(steps[currentIndex - 1])
        }
    }

    const addAction = (action: Action) => {
        setZapData({
            ...zapData,
            actions: [...zapData.actions, action],
        })
    }

    const removeAction = (actionId: string) => {
        setZapData({
            ...zapData,
            actions: zapData.actions.filter((action) => action.id !== actionId),
        })
    }

    const handleCreateZap = async () => {
        toast.promise(axios.post(`${BACKEND_URL}/api/v1/zap`, {
            name: zapData.name,
            availableTriggerId: zapData.trigger?.id,
            triggerMetadata: {},
            actions: zapData.actions.map((action) => ({
                availableActionId: action.id,
                actionMetadata: {},
            })),
        }, {
            headers: {
                Authorization: localStorage.getItem("token"),
            },
        }), {
            loading: 'Creating Zap...',
            success: () => {
                router.push("/dashboard");
                return 'Zap created successfully';
            },
            error: 'Error creating zap',
        });

    }

    if (isLoading) return <p className="p-8">Loading...</p>;
    if (isError || !data) return <p className="p-8 text-red-500">Failed to load triggers/actions.</p>;

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
            {/* Header */}
            <header className="bg-white dark:bg-gray-800 border-b">
                <div className="container mx-auto px-4 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <Link href="/dashboard">
                            <Button variant="ghost" size="sm">
                                <ChevronLeft className="mr-2 h-4 w-4" />
                                Back to Dashboard
                            </Button>
                        </Link>
                        <div className="flex items-center gap-2">
                            <Zap className="h-6 w-6 text-blue-600" />
                            <span className="text-xl font-bold">Create Zap</span>
                        </div>
                    </div>
                    <ThemeToggle />
                </div>
            </header>

            <div className="container mx-auto px-4 py-8 max-w-4xl">
                {/* Progress Steps */}
                <div className="flex items-center justify-center mb-8">
                    <div className="flex items-center gap-4">
                        {["Name", "Trigger", "Actions", "Review"].map((step, index) => {
                            const stepKeys: Step[] = ["name", "trigger", "actions", "review"]
                            const isActive = stepKeys[index] === currentStep
                            const isCompleted = stepKeys.indexOf(currentStep) > index

                            return (
                                <div key={step} className="flex items-center">
                                    <div
                                        className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                                            isActive
                                                ? "bg-blue-600 text-white"
                                                : isCompleted
                                                    ? "bg-green-600 text-white"
                                                    : "bg-gray-200 text-gray-600 dark:bg-gray-700 dark:text-gray-300"
                                        }`}
                                    >
                                        {index + 1}
                                    </div>
                                    <span
                                        className={`ml-2 text-sm ${
                                            isActive ? "text-blue-600 font-medium" : "text-gray-600 dark:text-gray-300"
                                        }`}
                                    >
                    {step}
                  </span>
                                    {index < 3 && <ArrowRight className="ml-4 h-4 w-4 text-gray-400" />}
                                </div>
                            )
                        })}
                    </div>
                </div>

                {/* Step Content */}
                <Card className="mb-8">
                    <CardContent className="p-8">
                        {currentStep === "name" && (
                            <div className="space-y-6">
                                <div className="text-center">
                                    <h2 className="text-2xl font-bold mb-2">Name Your Zap</h2>
                                    <p className="text-gray-600 dark:text-gray-300">Give your automation a descriptive name</p>
                                </div>
                                <div className="max-w-md mx-auto">
                                    <Label htmlFor="zapName">Zap Name</Label>
                                    <Input
                                        id="zapName"
                                        placeholder="e.g., Email to Slack Notification"
                                        value={zapData.name}
                                        onChange={(e) => setZapData({ ...zapData, name: e.target.value })}
                                        className="mt-2"
                                    />
                                </div>
                            </div>
                        )}

                        {currentStep === "trigger" && (
                            <div className="space-y-6">
                                <div className="text-center">
                                    <h2 className="text-2xl font-bold mb-2">Choose a Trigger</h2>
                                    <p className="text-gray-600 dark:text-gray-300">What should start this automation?</p>
                                </div>
                                <div className="grid md:grid-cols-2 gap-4">
                                    {data.availableTriggers.map((trigger) => (
                                        <Card
                                            key={trigger.id}
                                            className={`cursor-pointer transition-all hover:shadow-md ${
                                                zapData.trigger?.id === trigger.id ? "ring-2 ring-blue-600" : ""
                                            }`}
                                            onClick={() => setZapData({ ...zapData, trigger })}
                                        >
                                            <CardHeader>
                                                <CardTitle className="text-lg">{trigger.name}</CardTitle>
                                                <CardDescription>{trigger.description}</CardDescription>
                                            </CardHeader>
                                        </Card>
                                    ))}
                                </div>
                            </div>
                        )}

                        {currentStep === "actions" && (
                            <div className="space-y-6">
                                <div className="text-center">
                                    <h2 className="text-2xl font-bold mb-2">Add Actions</h2>
                                    <p className="text-gray-600 dark:text-gray-300">What should happen when the trigger fires?</p>
                                </div>

                                {zapData.actions.length > 0 && (
                                    <div className="space-y-4">
                                        <h3 className="font-semibold">Selected Actions:</h3>
                                        {zapData.actions.map((action, index) => (
                                            <div
                                                key={`${action.id}-${index}`}
                                                className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-lg"
                                            >
                                                <div>
                                                    <span className="font-medium">{action.name}</span>
                                                    <p className="text-sm text-gray-600 dark:text-gray-300">{action.description}</p>
                                                </div>
                                                <Button variant="ghost" size="sm" onClick={() => removeAction(action.id)}>
                                                    <X className="h-4 w-4" />
                                                </Button>
                                            </div>
                                        ))}
                                    </div>
                                )}

                                <div>
                                    <h3 className="font-semibold mb-4">Available Actions:</h3>
                                    <div className="grid md:grid-cols-2 gap-4">
                                        {data.availableActions.map((action) => (
                                            <Card
                                                key={action.id}
                                                className="cursor-pointer transition-all hover:shadow-md"
                                                onClick={() => addAction(action)}
                                            >
                                                <CardHeader>
                                                    <div className="flex items-center justify-between">
                                                        <div>
                                                            <CardTitle className="text-lg">{action.name}</CardTitle>
                                                            <CardDescription>{action.description}</CardDescription>
                                                        </div>
                                                        <Plus className="h-5 w-5 text-blue-600" />
                                                    </div>
                                                </CardHeader>
                                            </Card>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        )}

                        {currentStep === "review" && (
                            <div className="space-y-6">
                                <div className="text-center">
                                    <h2 className="text-2xl font-bold mb-2">Review Your Zap</h2>
                                    <p className="text-gray-600 dark:text-gray-300">Make sure everything looks correct before creating</p>
                                </div>

                                <div className="max-w-2xl mx-auto space-y-6">
                                    <div>
                                        <Label className="text-base font-semibold">Zap Name</Label>
                                        <p className="mt-1 text-gray-600 dark:text-gray-300">{zapData.name}</p>
                                    </div>

                                    <div>
                                        <Label className="text-base font-semibold">Trigger</Label>
                                        <div className="mt-2 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                                            <div className="font-medium">{zapData.trigger?.name}</div>
                                            <div className="text-sm text-gray-600 dark:text-gray-300">{zapData.trigger?.description}</div>
                                        </div>
                                    </div>

                                    <div>
                                        <Label className="text-base font-semibold">Actions ({zapData.actions.length})</Label>
                                        <div className="mt-2 space-y-2">
                                            {zapData.actions.map((action, index) => (
                                                <div key={`${action.id}-${index}`} className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                                                    <div className="font-medium">{action.name}</div>
                                                    <div className="text-sm text-gray-600 dark:text-gray-300">{action.description}</div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </CardContent>
                </Card>

                {/* Navigation Buttons */}
                <div className="flex justify-between">
                    <Button variant="outline" onClick={handleBack} disabled={currentStep === "name"}>
                        Back
                    </Button>

                    {currentStep === "review" ? (
                        <Button onClick={handleCreateZap} size="lg">
                            Create Zap
                        </Button>
                    ) : (
                        <Button
                            onClick={handleNext}
                            disabled={
                                (currentStep === "name" && !zapData.name) ||
                                (currentStep === "trigger" && !zapData.trigger) ||
                                (currentStep === "actions" && zapData.actions.length === 0)
                            }
                        >
                            Next
                        </Button>
                    )}
                </div>
            </div>
        </div>
    )
}
