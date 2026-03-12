import React, { useState } from 'react';
import { HelpCircle, ChevronDown } from 'lucide-react';

interface FAQItemProps {
  question: string;
  answer: string;
  isOpen: boolean;
  onClick: () => void;
}

const FAQItem: React.FC<FAQItemProps> = ({ question, answer, isOpen, onClick }) => {
  return (
    <div className="border-b border-slate-200">
      <button
        className="w-full py-6 flex items-center justify-between text-left hover:text-indigo-600 transition-colors group"
        onClick={onClick}
      >
        <span className="text-lg font-medium text-slate-900 group-hover:text-indigo-600">
          {question}
        </span>
        <ChevronDown 
          className={`w-5 h-5 text-slate-500 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} 
        />
      </button>
      <div 
        className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-96 pb-6' : 'max-h-0'}`}
      >
        <p className="text-slate-600 leading-relaxed">
          {answer}
        </p>
      </div>
    </div>
  );
};

const FAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      question: "What programming languages are supported?",
      answer: "8BIT currently supports C, C++, Python, Java, JavaScript, and more. We are constantly adding new languages to our platform."
    },
    {
      question: "Is there a limit on execution time?",
      answer: "To ensure fair usage, we have a standard execution timeout. For enterprise users, we offer extended processing limits."
    },
    {
      question: "Can I save and share my code?",
      answer: "Yes! Once logged in, you can save your projects and generate shareable links for collaboration or demonstration."
    },
    {
      question: "How does the AI assistance work?",
      answer: "Our AI assistant leverages Gemini to help debug, explain, and optimize your code directly within the IDE."
    }
  ];

  return (
    <section className="py-24 bg-white">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4 flex items-center justify-center gap-3">
            <HelpCircle className="w-8 h-8 text-indigo-600" />
            Common Questions
          </h2>
          <p className="text-slate-500">Everything you need to know about 8BIT Compiler.</p>
        </div>

        <div className="space-y-1">
          {faqs.map((faq, index) => (
            <FAQItem
              key={index}
              question={faq.question}
              answer={faq.answer}
              isOpen={openIndex === index}
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
