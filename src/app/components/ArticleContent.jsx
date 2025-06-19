'use client';

import { useEffect, useRef } from 'react';
import { processTextWithTooltips } from '../utils/textProcessor';

const ArticleContent = ({ content }) => {
  const contentRef = useRef(null);

  useEffect(() => {
    if (contentRef.current) {
      const processedContent = processTextWithTooltips(content);
      contentRef.current.innerHTML = processedContent;

      // Add event listeners for tooltips
      const tooltipWords = contentRef.current.querySelectorAll('.tooltip-word');
      
      tooltipWords.forEach(word => {
        const tooltip = document.createElement('div');
        tooltip.className = 'custom-tooltip';
        tooltip.textContent = word.getAttribute('data-tooltip');
        tooltip.style.display = 'none';
        document.body.appendChild(tooltip);

        word.addEventListener('mouseenter', (e) => {
          const rect = e.target.getBoundingClientRect();
          tooltip.style.display = 'block';
          tooltip.style.left = rect.left + (rect.width / 2) - (tooltip.offsetWidth / 2) + 'px';
          tooltip.style.top = rect.top - tooltip.offsetHeight - 10 + 'px';
        });

        word.addEventListener('mouseleave', () => {
          tooltip.style.display = 'none';
        });

        // Store tooltip reference for cleanup
        word._tooltip = tooltip;
      });

      // Cleanup function
      return () => {
        tooltipWords.forEach(word => {
          if (word._tooltip && document.body.contains(word._tooltip)) {
            document.body.removeChild(word._tooltip);
          }
        });
      };
    }
  }, [content]);

  return (
    <div 
      ref={contentRef}
      className="article-content"
    />
  );
};

export default ArticleContent;