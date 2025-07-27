import React, { useEffect, useState } from "react";

const NEWS_API_KEY = "d61de2342e2f4d3ca8490079eb868f10";
const PAGE_SIZE = 12;
const NEWS_API_URL = (page) => `https://newsapi.org/v2/top-headlines?category=technology&country=us&pageSize=${PAGE_SIZE}&page=${page}&apiKey=${NEWS_API_KEY}`;
const DEFAULT_IMAGE = "https://via.placeholder.com/600x300?text=No+Image";

function truncate(str, n) {
  return str && str.length > n ? str.slice(0, n - 1) + "..." : str;
}

const LatestTechNews = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const fetchNews = async (pageNum = 1, append = false) => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(NEWS_API_URL(pageNum));
      const data = await res.json();
      if (data.status === "ok") {
        if (append) {
          setArticles(prev => [...prev, ...data.articles]);
        } else {
          setArticles(data.articles);
        }
        // NewsAPI returns totalResults, but only up to 100 results are available
        if (data.articles.length < PAGE_SIZE || (pageNum * PAGE_SIZE) >= Math.min(data.totalResults, 100)) {
          setHasMore(false);
        } else {
          setHasMore(true);
        }
      } else {
        setError("Failed to fetch news.");
      }
    } catch (err) {
      setError("Failed to fetch news.");
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchNews(1, false);
  }, []);

  const handleLoadMore = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    fetchNews(nextPage, true);
  };

  return (
    <section className="py-12 bg-gray-50" id="news">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-gray-900 mb-2 text-center">Latest Tech News</h2>
        <p className="mb-10 text-center text-gray-500">Stay updated with the most recent developments in technology</p>
        {loading && articles.length === 0 && <div className="text-center text-lg">Loading...</div>}
        {error && <div className="text-center text-red-500">{error}</div>}
        <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 my-8">
          {articles.map((article, idx) => (
            <div
              key={idx}
              className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden flex flex-col min-h-[420px] transition-transform hover:scale-105 duration-200"
            >
              <div className="aspect-w-16 aspect-h-9 w-full bg-gray-200 flex items-center justify-center overflow-hidden">
                <img
                  src={article.urlToImage || DEFAULT_IMAGE}
                  alt={article.title}
                  className="w-full h-full object-cover object-center"
                  onError={e => { e.target.onerror = null; e.target.src = DEFAULT_IMAGE; }}
                />
              </div>
              <div className="p-6 flex flex-col flex-1">
                <h3 className="text-lg font-semibold mb-2 text-gray-800 line-clamp-2">
                  {truncate(article.title, 90)}
                </h3>
                <p className="text-gray-600 mb-4 flex-1 line-clamp-3">
                  {truncate(article.description, 120) || "No description available."}
                </p>
                <a
                  href={article.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-auto inline-block text-blue-600 hover:underline font-medium"
                >
                  Read More
                </a>
              </div>
            </div>
          ))}
        </div>
        {hasMore && !loading && (
          <div className="flex justify-center mt-6">
            <button
              onClick={handleLoadMore}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold shadow hover:bg-blue-700 transition"
            >
              More
            </button>
          </div>
        )}
        {loading && articles.length > 0 && (
          <div className="text-center text-lg mt-4">Loading more...</div>
        )}
      </div>
    </section>
  );
};

export default LatestTechNews; 