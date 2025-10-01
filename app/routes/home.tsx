import type { Route } from "./+types/home";
import { Welcome } from "../welcome/welcome";
import NavBar from "~/components/NavBar";
import { useEffect, useState } from "react";
import { Link } from "react-router";
import { ArrowRight, Play } from "lucide-react";
import TopSection from "~/components/home/TopSection";
import HowItWorks from "~/components/home/HowItWorks";
import WhyStudently from "~/components/home/WhyStudently";
import PoweredByAWS from "~/components/home/PoweredByAWS";
import Footer from "~/components/home/Footer";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Studently" },
    { name: "description", content: "Your All-in-One AI Assistant" },
  ];
}
// export function meta({}: Route.MetaArgs) {
//   return [
//     { title: "Studently" },
//     { name: "description", content: "Your All-in-One AI Assistant" },

//     // Open Graph (for Facebook, LinkedIn, etc.)
//     { property: "og:title", content: "Studently" },
//     { property: "og:description", content: "Your All-in-One AI Assistant" },
//     { property: "og:image", content: "https://yourdomain.com/og-image.jpg" },
//     { property: "og:url", content: "https://yourdomain.com" },
//     { property: "og:type", content: "website" },

//     // Twitter Card
//     { name: "twitter:card", content: "summary_large_image" },
//     { name: "twitter:title", content: "Studently" },
//     { name: "twitter:description", content: "Your All-in-One AI Assistant" },
//     { name: "twitter:image", content: "https://yourdomain.com/og-image.jpg" },
//   ];
// }

export default function Home() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
      <div className="">
        <TopSection/>
        <HowItWorks/>
        <WhyStudently/>
        <PoweredByAWS/>
        <Footer/>
      </div>
      
  );
}
