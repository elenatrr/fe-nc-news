import React from 'react';
import "../styles/article-item.scss"
import { formatDistanceToNow } from 'date-fns';

const ArticleItem = ({ article }) => {
  const timeAgo = formatDistanceToNow(new Date(article.created_at), { addSuffix: true });

  return (
    <div className='article'>
      <div className='article__top'>
        <p className='article__author'>
          {article.author}
        </p>
        <div className='article__reactions'>
          <span className='article__comments'>{article.comment_count}</span>
          <span className='article__votes'>{article.votes}</span>
        </div>
      </div>
      <div className='article__main'>
        <h4 className='article__title'>{article.title}</h4>
        <img className="article__image" src={article.article_img_url} alt={`${article.topic}`} />
      </div>
      <div className='article__bottom'>
        <span className='article__topic'>{article.topic}</span>
        <span className='article__date'>{timeAgo}</span>
      </div>
    </div>
  );
};

export default ArticleItem;