import { ArrowRight, Play } from "lucide-react";
import { Link } from "react-router";

const TopSection = () => {
  return (
    <div className="hero top-hero py-12 bg-[url('/images/bg-soft-light.png')] dark:bg-[url('/images/bg-soft-dark.png')] bg-cover bg-repeat bg-center relative">
      <span className="text-sm md:text-lg font-medium text-indigo-600 bg-indigo-100 dark:bg-indigo-900 dark:text-indigo-300 px-3 py-1 md:px-5 md:py-2 rounded-full mb-4 flex items-center gap-1 ">
        <div className="w-[10px] h-[10px] rounded-full bg-gradient-dark animate-pulse"></div>
        AI-Powered
      </span>
      <h1 className="">
        <span className="dark:text-gray-400">Your All-in-One</span>
        <span className="text-gradient-light-blue dark:!text-gradient-2 animate-pulse block">
          AI Study Companion
        </span>
      </h1>
      <h2 className="text-lg md:text-xl text-gray-700 dark:text-gray-300 lg:w-[60%] mb-8">
        Stay on top of courses, track GPA, and get smarter study recommendations
        — all in one app.{" "}
      </h2>
      <div className="flex gap-0 md:gap-12 items-center justify-evenly md:justify-center my-16 w-full">
        <button className="cta-button text-black dark:text-white bg-glass border-gray-400 dark:border-gray-100 ">
          <Play className="w-4 h-4" />
          Watch Demo
        </button>
        <Link
          to="/auth"
          className="transition duration-500 cta-button primary-gradient text-white group hover:primary-gradient-hover scale-100 hover:scale-105 flex items-center gap-2"
        >
          Get Started
          <ArrowRight className="w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-300" />
        </Link>
      </div>
      <div className="flex w-full md:flex-row flex-col gap-10 justify-evenly items-center my-12">
        <div className="flex flex-col gap-2 justify-center md:justify-evenly items-center">
          <span className="text-5xl text-gray-800 dark:text-white font-bold">
            10K+
          </span>
          <span className="text-xl text-gray-400 dark:text-gray-400 font-semibold">
            Active Students
          </span>
        </div>
        <div className="flex flex-col gap-2 justify-center md:justify-evenly items-center">
          <span className="text-5xl text-gray-800 dark:text-white font-bold">
            99.9%
          </span>
          <span className="text-xl text-gray-400 dark:text-gray-400 font-semibold">
            Accuracy
          </span>
        </div>
        <div className="flex flex-col gap-2 justify-center md:justify-evenly items-center">
          <span className="text-5xl text-gray-800 dark:text-white font-bold">
            24/7
          </span>
          <span className="text-xl text-gray-400 dark:text-gray-400 font-semibold">
            Available
          </span>
        </div>
      </div>
    </div>
  );
};

export default TopSection;
