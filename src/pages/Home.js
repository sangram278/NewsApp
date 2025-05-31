import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import NewsCard from '../component/NewsCard';
import axios from 'axios';

const Home = () => {
  const [articles, setArticles] = useState([]);
  const [totalResults, setTotalResults] = useState(0);
  const pageSize = 16;
  const navigate = useNavigate();

  const { category = "general", page = "1" } = useParams();
  const currentPage = Number(page);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await axios.get(
          `https://newsapi.org/v2/top-headlines?country=us&category=${category}&pageSize=${pageSize}&page=${currentPage}&apiKey=1da42f5237974818b81f0b7c188ab7b8`
        );

        const validArticles = response.data.articles.filter(
          article => article.title && article.urlToImage
        );

        setArticles(validArticles);
        setTotalResults(response.data.totalResults);
      } catch (error) {
        console.error('Error fetching news:', error);
      }
    };

    fetchNews();
  }, [category, currentPage]);

  const totalPages = Math.ceil(totalResults / pageSize);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      navigate(`/news/${newPage}/${category}`);
    }
  };

  return (
    <div>
      <div className='news-container'>
        {articles.map((article, index) => (
          <NewsCard key={index} article={article} index={index} />
        ))}
      </div>

      <div className="pagination">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          &lt; Prev
        </button>

        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages || totalResults < (currentPage * pageSize)}
        >
          Next &gt;
        </button>
      </div>
    </div>
  );
};

export default Home;
