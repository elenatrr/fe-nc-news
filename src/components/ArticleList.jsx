import React, { useEffect, useState, useRef } from "react";
import { fetchArticles } from "../../api";
import { Link } from "react-router-dom";
import Loader from "./Loader";
import ArticleItem from "./ArticleItem";
import "../styles/article-list.scss";

const ArticleList = ({
  articles,
  setArticles,
  isLoaderShown,
  topicName,
  areArticlesLoading,
  setAreArticlesLoading,
  setIsNonExistentTopic,
  setIsBadRequest,
  order,
  sortBy
}) => {
  const [pageNumber, setPageNumber] = useState(1);
  const articlesTotalCount = useRef(null);
  const defaultLimit = 10;
  const isLoadMoreShown = !isLoaderShown && pageNumber * defaultLimit < articlesTotalCount.current;

  const loadMoreArticles = () => {
    setPageNumber((prevPageNumber) => prevPageNumber + 1);
  };

  const fetchAndSetArticles = async (reset = false) => {
    if (areArticlesLoading) {
      return;
    }
    setAreArticlesLoading(true);
    setIsNonExistentTopic(false);

    try {
      const { articles, total_count } = await fetchArticles(reset ? 1 : pageNumber, topicName || "", order || "", sortBy || "");
      articlesTotalCount.current = total_count;
      setArticles(currentList => reset ? articles : [...currentList, ...articles]);
    } catch (error) {
      if (error.response?.status === 404) {
        setIsNonExistentTopic(true);
      } else if (error.response?.status === 400) {
        setIsBadRequest(true);
      }
    } finally {
      setAreArticlesLoading(false);
    }
  };

  useEffect(() => {
    setPageNumber(1);
    fetchAndSetArticles(true);
  }, [topicName, order, sortBy]);

  useEffect(() => {
    if (pageNumber > 1) {
      fetchAndSetArticles();
    }
  }, [pageNumber]);

  return isLoaderShown
    ? <Loader />
    : (
      <div className='articles'>
        <div className='articles__list'>
          {articles.map((article) => {
            return (
              <Link
                className="articles__link"
                key={article.article_id}
                to={`/article/${article.article_id}`}
              >
                <ArticleItem article={article} isArticlePreview={true} />
              </Link>
            );
          })}
        </div>
        {areArticlesLoading ? <Loader /> : isLoadMoreShown && <button className="articles__btn" onClick={() => { loadMoreArticles(); }}>Load More</button>}
      </div>
    );
};

export default ArticleList;