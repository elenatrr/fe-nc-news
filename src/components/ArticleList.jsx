import React, { useEffect, useState, useRef } from "react";
import { fetchArticles } from "../../api";
import { Link } from "react-router-dom";
import Loader from "./Loader";
import ArticleItem from "./ArticleItem";
import "../styles/article-list.scss";

const ArticleList = ({topicName}) => {
  const [articles, setArticles] = useState([]);
  const [areArticlesLoading, setAreArticlesLoading] = useState(true);
  const [pageNumber, setPageNumber] = useState(1);
  const [isNonExistentTopic, setIsNonExistentTopic] = useState(false);
  const articlesTotalCount = useRef(null);
  const defaultLimit = 10;
  const isLoaderShown = areArticlesLoading && articles.length === 0;
  const isLoadMoreShown = !isLoaderShown && pageNumber * defaultLimit < articlesTotalCount.current;

  const loadMoreArticles = () => {
    setPageNumber((prevPageNumber) => prevPageNumber + 1);
  };

  const fetchAndSetArticles = async (reset = false) => {
    setAreArticlesLoading(true);
    setIsNonExistentTopic(false);

    try {
      const { articles, total_count } = await fetchArticles(reset ? 1 : pageNumber, topicName ? topicName : "");
      articlesTotalCount.current = total_count;
      setArticles(currentList => reset ? articles : [...currentList, ...articles]);
    } catch (error) {
      if (error.response?.status === 404) {
        setIsNonExistentTopic(true);
      }
    } finally {
      setAreArticlesLoading(false);
    }
  };

  useEffect( () => {
    setPageNumber(1);
    fetchAndSetArticles(true);
  }, [topicName]);

  useEffect(() => {
    if (pageNumber > 1) {
      fetchAndSetArticles();
    }
  }, [pageNumber]);

  return isLoaderShown
    ? <Loader />
    : isNonExistentTopic
      ? <div className="wrapper">Sorry, the selected topic &quot;{topicName}&quot; does not exist. Please choose one from the list above!</div>
      :(
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
          {areArticlesLoading ? <Loader/> : isLoadMoreShown && <button className="articles__btn" onClick={() => { loadMoreArticles(); }}>Load More</button>}
        </div>
      );
};

export default ArticleList;