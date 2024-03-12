import React, { useEffect, useState, useRef } from 'react';
import { fetchArticles } from '../../api';
import Loader from './Loader';
import ArticleItem from './ArticleItem'
import "../styles/article-list.scss"
import { Link } from 'react-router-dom';

const ArticleList = () => {
  const [articles, setArticles] = useState([])
  const [areArticlesLoading, setAreArticlesLoading] = useState(true)
  const [pageNumber, setPageNumber] = useState(1)
  const articlesTotalCount = useRef(null);
  const defaultLimit = 10
  const isLoaderShown = areArticlesLoading && articles.length === 0
  const isLoadMoreShown = !isLoaderShown && pageNumber * defaultLimit < articlesTotalCount.current

  const nextPage = () => {
    setPageNumber((currentPage) => currentPage + 1)
  }

  const loadArticles = async () => {
    setAreArticlesLoading(true)
    fetchArticles(pageNumber)
      .then(({ articles, total_count }) => {
        articlesTotalCount.current = total_count
        setArticles((currentList) => [...currentList, ...articles])
        setAreArticlesLoading(false)
      })
  }

  useEffect(() => {
    loadArticles()
  }, [pageNumber])

  return isLoaderShown ? <Loader /> : (
    <div className='articles'>
      <div className='articles__list'>
        {articles.map((article) => {
          return (
            <Link
              className="articles__link"
              key={article.article_id}
              to={`/articles/${article.article_id}`}
            >
              <ArticleItem article={article} isArticlePreview={true} />
            </Link>
          )
        })}
      </div>
      {isLoadMoreShown && <button className="articles__btn" onClick={() => { nextPage() }}>Load More</button>}
    </div>
  )
};

export default ArticleList;