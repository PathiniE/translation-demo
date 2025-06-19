import Link from 'next/link';

const ArticleCard = ({ article }) => {
  // Function to create a preview of the article content
  const getPreview = (content, maxLength = 200) => {
    if (!content) return '';
    
    // Clean up the content by removing extra whitespace and newlines
    const cleanContent = content.trim().replace(/\s+/g, ' ');
    
    if (cleanContent.length <= maxLength) {
      return cleanContent;
    }
    
    // Truncate at the last complete word before maxLength
    const truncated = cleanContent.substring(0, maxLength);
    const lastSpaceIndex = truncated.lastIndexOf(' ');
    
    return truncated.substring(0, lastSpaceIndex) + '...';
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-200 hover:-translate-y-1 border border-gray-100">
      <h2 className="text-xl font-bold text-gray-800 mb-3">
        {article.title}
      </h2>
      <div className="flex justify-between items-center text-sm text-gray-600 mb-3">
        <span className="font-medium">By {article.author}</span>
        <span className="text-gray-500">{article.date}</span>
      </div>
      <p className="text-gray-600 mb-4 leading-relaxed">
        {getPreview(article.content)}
      </p>
      <Link 
        href={`/article/${article.id}`} 
        className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium transition-colors duration-200 group"
      >
        Read More 
        <svg className="w-4 h-4 ml-1 transition-transform duration-200 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </Link>
    </div>
  );
};

export default ArticleCard;