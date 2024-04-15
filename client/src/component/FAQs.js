
import React, { useState } from 'react';
import './FAQs.css';

const Accordion = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleAccordion = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const faqItems = [
    {
      question: 'What is Flowbite?',
      answer:
        'Flowbite is a platform which provide you the facility of Analysing you call/voice messages and Stay alert from any king of Frauds ',
    },
    {
      question: 'How to use Flowbite?',
      answer:
        'Flowbite provide you with two features , Live audio Capturing and Uploading an audio file which our system analysis and present you the output.',
    },
    {
      question: 'How does Flowbite works?',
      answer:
        'The main difference between Flowbites and other models is that Flowbite not only examines the words but also the sentiments behind them and give you most accuate result.',
    },
  ];

  return (
    <div className="accordion">

     <h1 className="faqheading">Frequently Asked Questions (FAQs) :</h1>
      {faqItems.map((item, index) => (
        <div key={index} className="accordion-item">
          <button
            className="accordion-btn"
            onClick={() => toggleAccordion(index)}
            aria-expanded={activeIndex === index}
            aria-controls={`accordion-body-${index}`}
          >
            <span>{item.question}</span>
            <svg
              className={`accordion-icon ${activeIndex === index ? 'rotate' : ''}`}
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <path
                fill="currentColor"
                d="M6 9l4 4 4-4"
              />
            </svg>
          </button>
          <div
            className={`accordion-content ${activeIndex === index ? 'open' : ''}`}
            id={`accordion-body-${index}`}
            aria-hidden={activeIndex !== index}
          >
            <p style={{color:'white'}}>{item.answer}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Accordion;

