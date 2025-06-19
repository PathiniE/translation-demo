import ArticleCard from './components/ArticleCard';
import articles from './data/articles';

export default function Home() {
  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Articles with Interactive Dictionary
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Hover over highlighted words in articles to see their definitions. 
          our collection of educational content with built-in learning tools.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {articles.map(article => (
          <ArticleCard key={article.id} article={article} />
        ))}
      </div>
    </div>
  );
}