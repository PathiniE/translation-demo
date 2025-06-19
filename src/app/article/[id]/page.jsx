import Link from 'next/link';
import ArticleContent from '@/app/components/ArticleContent';
import articles from '@/app/data/articles';

export default function Article({ params }) {
  const article = articles.find(a => a.id === parseInt(params.id));

  if (!article) {
    return (
      <div className="text-center py-12">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Article not found</h1>
        <Link href="/" className="text-blue-600 hover:text-blue-800 font-medium">
          ← Back to Articles
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-6">
        <Link 
          href="/" 
          className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium transition-colors duration-200 group"
        >
          <svg className="w-4 h-4 mr-2 transition-transform duration-200 group-hover:-translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Articles
        </Link>
      </div>
      
      <article className="bg-white rounded-lg shadow-md p-8 lg:p-12">
        <header className="mb-8 pb-6 border-b border-gray-200">
          <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4 leading-tight">
            {article.title}
          </h1>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 text-gray-600">
            <span className="font-medium">By {article.author}</span>
            <span className="text-gray-500">{article.date}</span>
          </div>
        </header>
        
        <div className="prose prose-lg max-w-none">
          <ArticleContent content={article.content} />
        </div>
      </article>
    </div>
  );
}