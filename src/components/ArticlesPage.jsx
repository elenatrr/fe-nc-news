import React from "react";
import ArticleList from "./ArticleList";
import TopicList from "./TopicList";
import { useParams } from "react-router-dom";

const ArticlesPage = () => {
  const { topicName } = useParams();

  return (
    <main className='wrapper'>
      <TopicList topicName={topicName || null}/>
      <ArticleList topicName={topicName || null}/>
    </main>
  );
};

export default ArticlesPage;