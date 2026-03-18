import React from 'react'
import { FileText, HelpCircle, Zap, Video, Globe, Bot } from 'lucide-react'

function Features() {
  const features = [
    {
      icon: <FileText size={32} className="text-green-500" />,
      title: "Smart Summarization",
      desc: "Generate concise, accurate summaries from large documents in seconds. Ideal for research papers, reports, and legal texts, reducing time spent reading."
    },
    {
      icon: <HelpCircle size={32} className="text-green-500" />,
      title: "Intelligent Q&A",
      desc: "Interact with your documents using natural language. Ask questions and receive precise, context-aware answers powered by advanced AI models."
    },
    {
      icon: <Zap size={32} className="text-green-500" />,
      title: "Lightning-Fast Processing",
      desc: "Analyze large documents, videos, or web pages in seconds using optimized vector embeddings and parallel AI processing for instant insights."
    },
    {
      icon: <Video size={32} className="text-green-500" />,
      title: "YouTube Content Analysis",
      desc: "Paste a YouTube URL and extract key insights, summarized transcripts, and context-relevant answers without watching the full video."
    },
    {
      icon: <Bot size={32} className="text-green-500" />,
      title: "AI-Powered Query Enhancement",
      desc: "Automatically improve your search queries for deeper and more accurate results. Transform vague questions into precise, context-aware prompts."
    },
    {
      icon: <Globe size={32} className="text-green-500" />,
      title: "Web URL Knowledge Extraction",
      desc: "Input any web page URL and automatically extract structured knowledge from articles, blogs, or reports, making web data instantly searchable."
    }
  ]

  return (
    <section className="bg-white dark:bg-gray-950 py-20 px-6 lg:px-20 transition-colors duration-300">
      
      {/* Heading */}
      <div className="text-center max-w-3xl mx-auto">
        <h2 className="text-4xl font-bold text-gray-900 dark:text-white">
          Next-Gen AI-Driven Data Insights
        </h2>
        <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
          Instantly retrieve relevant answers from large documents, videos, and web content without manual searching.
        </p>
      </div>

      {/* Feature Cards */}
      <div className="mt-14 grid gap-10 md:grid-cols-2 lg:grid-cols-3">
        {features.map((feature, idx) => (
          <div
            key={idx}
            className="group relative bg-white dark:bg-gray-900 p-8 rounded-3xl shadow-lg hover:shadow-2xl transition-transform duration-500 hover:-translate-y-3 border border-gray-200 dark:border-gray-700 text-center"
          >
            {/* Icon */}
            <div className="flex items-center justify-center w-16 h-16 mx-auto bg-green-100 rounded-full mb-6">
              {feature.icon}
            </div>

            {/* Title */}
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
              {feature.title}
            </h3>

            {/* Description */}
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
              {feature.desc}
            </p>

            {/* Bottom Decorative Bar */}
            <span className="absolute bottom-0 left-0 w-0 h-1 bg-green-500 group-hover:w-full transition-all duration-500 rounded-full"></span>
          </div>
        ))}
      </div>

    </section>
  )
}

export default Features
