import React from 'react'
import { Upload, Cpu, BarChart2 } from 'lucide-react'

function Working() {
  const steps = [
    {
      icon: <Upload size={32} className="text-green-500" />,
      title: "Upload Documents & Links",
      desc: "Drag & drop PDFs, DOCX, or text files, or simply paste YouTube or web URLs to instantly prepare content for AI processing."
    },
    {
      icon: <Cpu size={32} className="text-green-500" />,
      title: "AI-Powered Content Analysis",
      desc: "Our intelligent system uses advanced LLMs and vector embeddings to analyze and structure your document, video transcripts, or web data in seconds."
    },
    {
      icon: <BarChart2 size={32} className="text-green-500" />,
      title: "Explore Insights & Get Answers",
      desc: "Interact with your content using smart Q&A, detailed summaries, and semantic search for deep insights, without endless scrolling."
    }
  ]

  return (
    <section className="bg-gray-50 dark:bg-black py-24 px-6 lg:px-20 transition-colors duration-300">
      
      {/* Heading */}
      <div className="text-center max-w-3xl mx-auto">
        <h2 className="text-4xl font-extrabold text-gray-900 dark:text-white">
          Simplified Workflow for Intelligent Insights
        </h2>
        <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
          Experience a seamless process that converts unstructured documents, videos, and web pages into searchable knowledge in just a few clicks.
        </p>
      </div>

      {/* Steps */}
      <div className="mt-16 grid gap-12 md:grid-cols-3">
        {steps.map((step, idx) => (
          <div
            key={idx}
            className="bg-white dark:bg-gray-900 p-8 rounded-3xl shadow-lg hover:shadow-2xl transition-transform duration-500 hover:-translate-y-3 border border-transparent hover:border-green-500 text-center"
          >
            {/* Icon */}
            <div className="flex items-center justify-center w-16 h-16 mx-auto bg-green-100 rounded-full mb-6">
              {step.icon}
            </div>

            {/* Title */}
            <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              {step.title}
            </h3>

            {/* Description */}
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
              {step.desc}
            </p>
          </div>
        ))}
      </div>
    </section>
  )
}

export default Working
