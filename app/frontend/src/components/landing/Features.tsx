import { Clock, Shield, Users } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card"

export const Features = () => {
    return (
        <section className="container mx-auto px-4 py-20">
            <div className="text-center mb-16">
                <h2 className="text-3xl font-bold mb-4">Why Choose Zync?</h2>
                <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                    Build powerful automations that save time and eliminate repetitive tasks
                </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
                <Card className="border-0 shadow-lg">
                    <CardContent className="p-8 text-center">
                        <Clock className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                        <h3 className="text-xl font-semibold mb-2">Save Time</h3>
                        <p className="text-gray-600 dark:text-gray-300">
                            Automate repetitive tasks and focus on what matters most
                        </p>
                    </CardContent>
                </Card>

                <Card className="border-0 shadow-lg">
                    <CardContent className="p-8 text-center">
                        <Shield className="h-12 w-12 text-green-600 mx-auto mb-4" />
                        <h3 className="text-xl font-semibold mb-2">Reliable</h3>
                        <p className="text-gray-600 dark:text-gray-300">
                            Enterprise-grade reliability with 99.9% uptime guarantee
                        </p>
                    </CardContent>
                </Card>

                <Card className="border-0 shadow-lg">
                    <CardContent className="p-8 text-center">
                        <Users className="h-12 w-12 text-purple-600 mx-auto mb-4" />
                        <h3 className="text-xl font-semibold mb-2">Easy to Use</h3>
                        <p className="text-gray-600 dark:text-gray-300">
                            No coding required. Build automations with our visual editor
                        </p>
                    </CardContent>
                </Card>
            </div>
        </section>
    );
};
