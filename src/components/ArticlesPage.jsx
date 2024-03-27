import React, { useState } from "react";
import ArticleList from "./ArticleList";
import TopicList from "./TopicList";
import { useLocation, useParams } from "react-router-dom";
import SortArticles from "./SortArticles";
import OrderArticles from "./OrderArticles";
import "../styles/articles-page.scss";
import ErrorPage from "./ErrorPage";
import ScrollUpBtn from "./ScrollUpBtn";

const ArticlesPage = ({topics, setTopics}) => {
  const { topicName } = useParams();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const initialOrder = searchParams.get("order") || "desc";
  const initialSortBy = searchParams.get("sortBy") || "created_at";
  const [areArticlesLoading, setAreArticlesLoading] = useState(false);
  const [order, setOrder] = useState(initialOrder);
  const [sortBy, setSortBy] = useState(initialSortBy);
  const [articles, setArticles] = useState([]);
  const [isNonExistentTopic, setIsNonExistentTopic] = useState(false);
  const [isBadRequest, setIsBadRequest] = useState(false);
  const isLoaderShown = areArticlesLoading && articles.length === 0;

  return (isNonExistentTopic || isBadRequest
    ? <ErrorPage isNotFound={isNonExistentTopic} />
    : <div className='articles-page'>
      <div className="articles-page__top">
        <TopicList
          topics={topics}
          setTopics={setTopics}
          topicName={topicName || null}
          areArticlesLoading={areArticlesLoading}
          order={order}
          sortBy={sortBy}
        />
        {!isLoaderShown && <div className="articles-page__sort">
          <OrderArticles areArticlesLoading={areArticlesLoading} order={order} setOrder={setOrder} />
          <SortArticles areArticlesLoading={areArticlesLoading} sortBy={sortBy} setSortBy={setSortBy} />
        </div>}
      </div>
      <ArticleList
        articles={articles}
        setArticles={setArticles}
        isLoaderShown={isLoaderShown}
        topicName={topicName || null}
        areArticlesLoading={areArticlesLoading}
        setAreArticlesLoading={setAreArticlesLoading}
        setIsNonExistentTopic={setIsNonExistentTopic}
        setIsBadRequest={setIsBadRequest}
        order={order}
        sortBy={sortBy}
      />
      <ScrollUpBtn/>
    </div>
  );
};

export default ArticlesPage;