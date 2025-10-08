import {
  BookOpen,
  Calculator,
  MessageSquare,
  Sparkles,
  FileText,
  Bell,
  Layers,
} from "lucide-react";
import { motion } from "framer-motion";

const features = [
  {
    title: "Track Courses & Grades",
    icon: <BookOpen className="w-8 h-8" />,
    gradient: "from-pink-200 to-pink-400",
    gradient_n: "#fce7f3, #f9a8d4", // very light pink
  },
  {
    title: "Smart GPA Calculator",
    icon: <Calculator className="w-8 h-8" />,
    gradient: "from-blue-200 to-blue-400",
    gradient_n: "#dbeafe, #60a5fa", // light sky blue
  },
  {
    title: "AI-Powered Q&A",
    icon: <MessageSquare className="w-8 h-8" />,
    gradient: "from-green-200 to-green-400",
    gradient_n: "#d1fae5, #6ee7b7", // minty green
  },
  {
    title: "Personalized Recommendations",
    icon: <Sparkles className="w-8 h-8" />,
    gradient: "from-purple-200 to-purple-400",
    gradient_n: "#ede9fe, #c4b5fd", // soft lavender
  },
  {
    title: "Note Summarization",
    icon: <FileText className="w-8 h-8" />,
    gradient: "from-yellow-200 to-yellow-400",
    gradient_n: "#fef9c3, #fde047", // pale yellow
  },
  {
    title: "Flashcard Generation",
    icon: <Layers className="w-8 h-8" />,
    gradient: "from-orange-200 to-orange-400",
    gradient_n: "#ffedd5, #fdba74", // light peach
  },
];

export default function HowItWorks() {
  return (
    <section className="py-20 bg-gray-50 dark:bg-gray-900" id="about">
      <div className="max-w-6xl mx-auto text-center px-6">
        <h1 className="text-3xl md:text-4xl font-bold">How Studently Works</h1>
        <p className="text-lg text-gray-500 mt-2">
          Your all-in-one study partner, made simple in six steps.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className="relative group min-h-[250px]"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ delay: index * 0.2, duration: 0.4 }}
            >
              {/* Glow effect */}
              <div
                className="absolute inset-0 rounded-xl opacity-20 blur-[6px] z-0 transition-all duration-500 group-hover:opacity-50 group-hover:blur-sm"
                style={{
                  backgroundImage: `linear-gradient(to bottom right, ${feature.gradient_n})`,
                }}
              ></div>

              {/* Actual Card */}
              <div className="relative h-full z-2 flex flex-col justify-evenly items-center p-6 rounded-2xl bg-neumorphic dark:bg-neumorphic-dark-2 transition-all duration-500">
                <div
                  className="w-14 h-14 flex items-center justify-center rounded-xl mb-4 dark:text-black"
                  style={{
                    backgroundImage: `linear-gradient(to bottom right, ${feature.gradient_n})`,
                  }}
                >
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 text-center">
                  {feature.title} made simple with AI-powered efficiency.
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
