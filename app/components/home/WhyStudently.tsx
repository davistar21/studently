import { Layers, Brain, Focus, BarChart3, ArrowRight } from "lucide-react";
import { Link } from "react-router";

const features = [
  {
    title: "All-in-One Platform",
    description:
      "No need to juggle multiple apps — everything you need in one place.",
    icon: <Layers className="w-8 h-8" />,
    gradient: "var(--tw-gradient-from), var(--tw-gradient-to)",
    gradient_n: "rgba(255,182,193,0.6), rgba(255,105,180,0.6)", // pink gradient
  },
  {
    title: "AI That Understands You",
    description:
      "Smart tools tailored to your courses, grades, and study style.",
    icon: <Brain className="w-8 h-8" />,
    gradient_n: "rgba(173,216,230,0.6), rgba(70,130,180,0.6)", // blue gradient
  },
  {
    title: "Stay Focused",
    description:
      "Eliminate distractions with reminders, summaries, and streamlined tasks.",
    icon: <Focus className="w-8 h-8" />,
    gradient_n: "rgba(152,251,152,0.6), rgba(34,139,34,0.6)", // green gradient
  },
  {
    title: "Results That Matter",
    description:
      "Track progress, improve performance, and hit your academic goals.",
    icon: <BarChart3 className="w-8 h-8" />,
    gradient_n: "rgba(255,228,181,0.6), rgba(255,165,0,0.6)", // warm amber gradient
  },
];

export default function WhyStudently() {
  return (
    <section className="py-20 bg-gray-50 dark:bg-gray-900" id="why">
      <div className="max-w-6xl mx-auto text-center px-6">
        <h1 className="text-3xl md:text-4xl font-bold">Why Studently?</h1>
        <div className="flex mt-4 gap-6 md-gap-12 items-center justify-evenly">
          <span className="w-fit text-sm md:text-lg font-medium text-indigo-600 bg-indigo-100 dark:bg-indigo-900 dark:text-indigo-300 px-3 py-1 md:px-5 md:py-2 rounded-full mb-4 flex items-center gap-1 ">
            <div className="w-[10px] h-[10px] rounded-full bg-gradient-dark animate-pulse"></div>
            Built for students
          </span>
          <span className="w-fit text-sm md:text-lg font-medium text-indigo-600 bg-indigo-100 dark:bg-indigo-900 dark:text-indigo-300 px-3 py-1 md:px-5 md:py-2 rounded-full mb-4 flex items-center gap-1 ">
            <div className="w-[10px] h-[10px] rounded-full bg-gradient-dark animate-pulse"></div>
            AI-Powered
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mt-12">
          {features.map((feature, index) => (
            <div key={index} className="relative group min-h-[250px]">
              {/* Glow effect */}
              <div
                className="absolute inset-0 rounded-2xl opacity-40 blur-[6px] z-0 transition-all duration-500 group-hover:opacity-70 group-hover:blur-sm"
                style={{
                  backgroundImage: `linear-gradient(to bottom right, ${feature.gradient_n})`,
                }}
              ></div>

              {/* Actual Card */}
              <div className="relative h-full z-10 flex flex-col justify-evenly items-center p-6 rounded-2xl bg-white dark:bg-gray-800 shadow-[8px_8px_16px_#d1d5db,-8px_-8px_16px_#ffffff] dark:shadow-none bg-neumorphic dark:bg-neumorphic-dark-2 transition-all duration-500 hover:shadow-md ">
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
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
        <Link
          to="/auth"
          className="transition-all cta-button primary-gradient text-white group my-16 mx-auto"
        >
          Get Started
          <ArrowRight className="w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-300" />
        </Link>
      </div>
    </section>
  );
}
