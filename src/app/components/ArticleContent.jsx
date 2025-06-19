'use client';

import { useEffect, useRef } from 'react';
import dictionary from '../data/dictionary';

const ArticleContent = ({ content }) => {
  const contentRef = useRef(null);

  useEffect(() => {
    if (contentRef.current) {
      // Display content normally without pre-processing
      contentRef.current.innerHTML = content;

      // Add mouse event listener to the entire content area
      const handleMouseMove = (e) => {
        // Remove any existing tooltips
        const existingTooltips = document.querySelectorAll('.hover-tooltip');
        existingTooltips.forEach(tooltip => tooltip.remove());

        // Get the word under the cursor
        const range = document.caretRangeFromPoint(e.clientX, e.clientY);
        if (!range) return;

        const textNode = range.startContainer;
        if (textNode.nodeType !== Node.TEXT_NODE) return;

        const text = textNode.textContent;
        const offset = range.startOffset;

        // Find word boundaries
        let start = offset;
        let end = offset;

        // Find start of word
        while (start > 0 && /\w/.test(text[start - 1])) {
          start--;
        }

        // Find end of word
        while (end < text.length && /\w/.test(text[end])) {
          end++;
        }

        const word = text.substring(start, end).toLowerCase();
        
        // Check if word exists in dictionary
        if (dictionary[word]) {
          // Create a temporary range to get the exact word position
          const wordRange = document.createRange();
          wordRange.setStart(textNode, start);
          wordRange.setEnd(textNode, end);
          
          // Create and show tooltip
          const tooltip = document.createElement('div');
          tooltip.className = 'hover-tooltip';
          tooltip.textContent = dictionary[word];
          
          // Style the tooltip
          tooltip.style.cssText = `
            position: absolute;
            background: #1f2937;
            color: white;
            padding: 8px 12px;
            border-radius: 6px;
            font-size: 14px;
            max-width: 250px;
            z-index: 1000;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
            pointer-events: none;
            line-height: 1.4;
          `;

          // Add arrow
          const arrow = document.createElement('div');
          arrow.style.cssText = `
            position: absolute;
            top: 100%;
            left: 50%;
            transform: translateX(-50%);
            width: 0;
            height: 0;
            border-left: 6px solid transparent;
            border-right: 6px solid transparent;
            border-top: 6px solid #1f2937;
          `;
          tooltip.appendChild(arrow);

          document.body.appendChild(tooltip);

          // Position tooltip directly above the word
          const wordRect = wordRange.getBoundingClientRect();
          const tooltipRect = tooltip.getBoundingClientRect();
          
          let left = wordRect.left + (wordRect.width / 2) - (tooltipRect.width / 2);
          let top = wordRect.top - tooltipRect.height - 10;

          // Adjust if tooltip goes off screen horizontally
          if (left < 10) left = 10;
          if (left + tooltipRect.width > window.innerWidth - 10) {
            left = window.innerWidth - tooltipRect.width - 10;
          }
          
          // If tooltip goes off screen vertically, show it below the word
          if (top < 10) {
            top = wordRect.bottom + 10;
            // Flip arrow to point up
            arrow.style.cssText = `
              position: absolute;
              bottom: 100%;
              left: 50%;
              transform: translateX(-50%);
              width: 0;
              height: 0;
              border-left: 6px solid transparent;
              border-right: 6px solid transparent;
              border-bottom: 6px solid #1f2937;
            `;
          }

          tooltip.style.left = left + 'px';
          tooltip.style.top = top + 'px';
          
          // Clean up the temporary range
          wordRange.detach();
        }
      };

      const handleMouseLeave = () => {
        // Remove tooltips when mouse leaves the content area
        const existingTooltips = document.querySelectorAll('.hover-tooltip');
        existingTooltips.forEach(tooltip => tooltip.remove());
      };

      contentRef.current.addEventListener('mousemove', handleMouseMove);
      contentRef.current.addEventListener('mouseleave', handleMouseLeave);

      // Cleanup function
      return () => {
        if (contentRef.current) {
          contentRef.current.removeEventListener('mousemove', handleMouseMove);
          contentRef.current.removeEventListener('mouseleave', handleMouseLeave);
        }
        // Remove any remaining tooltips
        const existingTooltips = document.querySelectorAll('.hover-tooltip');
        existingTooltips.forEach(tooltip => tooltip.remove());
      };
    }
  }, [content]);

  return (
    <div 
      ref={contentRef}
      className="article-content leading-relaxed"
      style={{ cursor: 'default' }}
    />
  );
};

export default ArticleContent;