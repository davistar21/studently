import {
  Mail,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Github,
} from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import Logo from "../logo";

export default function Footer() {
  return (
    <footer className="bg-gray-950 text-gray-300">
      <div className="w-full mx-auto grid grid-cols-1 md:grid-cols-[2fr_1fr_1fr] gap-16 p-12">
        <div className="flex flex-col items-center md:items-start gap-2">
          <Logo className="!text-indigo-500 md:!text-3xl" />
          <p className="text-sm md:text-lg mb-4 text-center md:text-left">
            Your all-in-one AI-powered student assistant for smarter studying,
            GPA tracking, and focus.
          </p>
          <div className="flex items-center gap-2">
            <Mail className="w-5 h-5" />
            <a
              href="mailto:hello@studently.app"
              className="hover:text-indigo-600 transition"
            >
              eyitayobembe@gmail.com
            </a>
          </div>
        </div>

        <div className="flex flex-col items-center md:items-start gap-2">
          <h3 className="text-xl font-semibold mb-3 text-white">Quick Links</h3>
          <ul className="space-y-2 text-sm md:text-lg text-center md:text-left">
            <li>
              <a href="#about" className="hover:text-indigo-600 transition">
                About
              </a>
            </li>
            <li>
              <a href="#features" className="hover:text-indigo-600 transition">
                Features
              </a>
            </li>
            <li>
              <a href="#why" className="hover:text-indigo-600 transition">
                Why Studently
              </a>
            </li>
            <li>
              <a href="#contact" className="hover:text-indigo-600 transition">
                Contact
              </a>
            </li>
          </ul>
        </div>

        <div className="flex flex-col items-center md:items-start gap-2">
          <h3 className="text-xl font-semibold mb-3 text-white">
            Connect With Us
          </h3>
          <div className="flex gap-4">
            <a href="#" className="hover:text-indigo-600 transition">
              <Facebook className="w-6 h-6" />
            </a>
            <a href="#" className="hover:text-indigo-600 transition">
              <Twitter className="w-6 h-6" />
            </a>
            <a href="#" className="hover:text-indigo-600 transition">
              <Instagram className="w-6 h-6" />
            </a>
            <a href="#" className="hover:text-indigo-600 transition">
              <Linkedin className="w-6 h-6" />
            </a>
            <a href="#" className="hover:text-indigo-600 transition">
              <FaWhatsapp className="w-6 h-6" />
            </a>
            <a
              href="https://github.com/davistar21"
              aria-label="Instagram"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-indigo-600 transition"
            >
              <Github className="w-6 h-6" />
            </a>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-300 dark:border-gray-700 py-16 text-center text-sm md:text-lg flex flex-col md:flex-row gap-4  justify-evenly">
        <div>
          Crafted with ❤️ by{" "}
          <span className="font-semibold">Obembe Eyitayo</span>{" "}
        </div>
        <div className="flex items-center justify-center gap-2">
          <a
            href="#hire"
            className="hover:text-indigo-600 transition underline"
          >
            Hire me
          </a>{" "}
          &nbsp;
          <a
            href="#portfolio"
            className="hover:text-indigo-600 transition underline"
          >
            View Portfolio
          </a>{" "}
        </div>
      </div>

      <div className="border-t border-gray-300 dark:border-gray-700 py-4 text-center text-xs md:text-sm text-gray-500 dark:text-gray-400">
        <p className="font-semibold">
          &copy; {new Date().getFullYear()} Studently - All rights reserved.
        </p>
        <p className="mt-2">
          Unauthorized use, duplication, or distribution of content is strictly
          prohibited.
        </p>
        <p className="mt-3 italic text-gray-400">
          "Studently — study smarter, not harder."
        </p>
      </div>
    </footer>
  );
}
