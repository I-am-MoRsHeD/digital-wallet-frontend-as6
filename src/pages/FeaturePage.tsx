import { CheckCircle2 } from "lucide-react";

const Features = () => {
    const features = [
        { title: "Instant Transfers", desc: "Send money to anyone in seconds, anytime, anywhere." },
        { title: "Secure Authentication", desc: "Protected with JWT, bcrypt, and role-based access." },
        { title: "Agent Services", desc: "Cash-in and cash-out through verified agents with ease." },
        { title: "Transaction History", desc: "Track and filter all your transactions in real time." },
        { title: "Admin Control", desc: "Admins can manage users, agents, and set system limits." },
        { title: "Cross-Platform Access", desc: "Responsive design ensures smooth usage on all devices." },
    ];


    return (
        <div className="max-w-6xl mx-auto px-4 py-12">
            <h1 className="text-3xl font-bold text-center mb-10">Our Features</h1>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {features.map((f, i) => (
                    <div key={i} className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow hover:shadow-lg transition">
                        <CheckCircle2 className="w-8 h-8 text-green-500 mb-3" />
                        <h2 className="text-xl font-semibold mb-2">{f.title}</h2>
                        <p className="text-gray-600 dark:text-gray-300">{f.desc}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Features;
