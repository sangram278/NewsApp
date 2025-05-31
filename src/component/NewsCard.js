import React from 'react'
function NewsCard({article,index}){
    const shortDescription = article.description
    ? article.description.slice(0, 100)
    : 'No description available.';
  return (

    <div className="news-card">
      <img src={article.urlToImage || 'https://via.placeholder.com/150'} alt="news" />
      <h3>{article.title}</h3>
      <p>{shortDescription}...</p>
      <a
        href={article.url}
        target="_blank"
        rel="noopener noreferrer"
        className="readmore"
      >
        Read More
      </a>
    </div>
  )
}

export default NewsCard
