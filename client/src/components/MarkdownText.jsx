import React from 'react';

const MarkdownText = ({ text, className = "" }) => {
  // Simple markdown formatter for chatbot responses
  const formatText = (text) => {
    if (!text) return '';
    
    return text
      // Convert **bold** to <strong>
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      // Convert bullet points • to proper list items
      .replace(/^• (.+)$/gm, '<li>$1</li>')
      // Convert multiple newlines to paragraph breaks
      .replace(/\n\n+/g, '</p><p>')
      // Convert single newlines to line breaks
      .replace(/\n/g, '<br>')
      // Wrap in paragraph tags
      .replace(/^(.+)/, '<p>$1')
      .replace(/(.+)$/, '$1</p>')
      // Wrap list items in ul tags
      .replace(/(<li>.*<\/li>)/s, '<ul>$1</ul>')
      // Clean up nested paragraphs in lists
      .replace(/<p>(<ul>.*<\/ul>)<\/p>/s, '$1')
      .replace(/<br>(<\/li>)/g, '$1');
  };

  const formattedText = formatText(text);

  return (
    <div 
      className={`markdown-content ${className}`}
      dangerouslySetInnerHTML={{ __html: formattedText }}
      style={{
        lineHeight: '1.6',
      }}
    />
  );
};

export default MarkdownText;