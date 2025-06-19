import Link from 'next/link';

const Header = () => {
  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <nav className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="text-2xl font-bold text-blue-600 hover:text-blue-700 transition-colors">
            Translation Demo
          </Link>
          <div className="flex space-x-8">
            <Link 
              href="/" 
              className="text-gray-600 hover:text-gray-900 font-medium transition-colors duration-200"
            >
              Articles
            </Link>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;