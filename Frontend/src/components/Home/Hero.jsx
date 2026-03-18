import React from "react";
import { useNavigate } from "react-router-dom";
import { Upload } from "lucide-react";

function Hero() {
  const navigate = useNavigate();

  return (
    <section className="relative bg-gray-50 dark:bg-black min-h-screen  flex flex-col items-center  px-6 lg:px-20 pt-24 text-center overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-green-100/20 to-transparent dark:from-green-500/10"></div>
      <div className="absolute top-20 left-10 w-72 h-72 bg-green-400/20 dark:bg-green-500/20 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-10 right-10 w-72 h-72 bg-green-300/20 dark:bg-green-600/20 rounded-full blur-3xl animate-pulse"></div>

      {/* Heading */}
      <h1 className="text-4xl md:text-5xl font-bold leading-tight tracking-tight text-gray-900 dark:text-white ">
        Empower Your Knowledge with{" "}
        <span className="bg-gradient-to-r from-green-400 via-green-500 to-emerald-500 bg-clip-text text-transparent">
          Next-Gen AI Search
        </span>
      </h1>

      {/* Subtext */}
      <p className="mt-8 max-w-3xl mx-auto text-lg md:text-xl text-gray-600 dark:text-gray-300">
     Instantly extract insights from unstructured data sources like PDFs, videos, and web pages. Powered by OpenAI’s advanced LLMs and scalable Vector Databases (Qdrant).
      </p>
      <p className="mt-3 max-w-2xl mx-auto text-base md:text-lg text-gray-500 dark:text-gray-400">
        No more endless scrolling or manual reading. Get precise, relevant
        answers in seconds, boost productivity, and focus on what matters most.
      </p>

      {/* CTA Buttons */}
      <div className="mt-10 flex flex-col sm:flex-row justify-center gap-5">
        <button
          onClick={() => navigate("/dashboard")}
          className="group relative overflow-hidden bg-green-500 text-white px-8 py-4 rounded-2xl text-lg font-semibold shadow-lg hover:scale-105 hover:shadow-green-500/40 transition-all duration-300 flex items-center"
        >
          <span className="mr-3">
            <Upload />
          </span>{" "}
          Get Started Free
          <span className="absolute inset-0 bg-gradient-to-r from-green-400 to-emerald-500 opacity-0 group-hover:opacity-20 transition-all"></span>
        </button>
      </div>

      {/* Features */}
      <div className="mt-16 flex flex-col md:flex-row justify-center gap-6">
        {[
          "✅ Secure & Private",
          "⚡ Instant Analysis",
          "🔒 No Registration Required",
        ].map((feature, i) => (
          <p
            key={i}
            className="px-6 py-2 rounded-full bg-white/60 dark:bg-gray-800/50 backdrop-blur-md text-gray-800 dark:text-gray-200 shadow-md text-base font-medium hover:scale-105 transition"
          >
            {feature}
          </p>
        ))}
      </div>
    </section>
  );
}

export default Hero;
