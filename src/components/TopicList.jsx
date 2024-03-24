import React, { useEffect, useState } from "react";
import { fetchTopics } from "../../api";
import TopicItem from "./TopicItem";
import { useNavigate, Link } from "react-router-dom";
import "../styles/topic-list.scss";

const TopicList = ({ topicName, areArticlesLoading, order, sortBy }) => {
  const [topics, setTopics] = useState(null);
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(location.search);
  searchParams.set("order", order);
  searchParams.set("sortBy", sortBy);
  const handleClick = () => {
    navigate("/articles");
  };

  useEffect(() => {
    fetchTopics()
      .then((topics) => {
        setTopics(topics);
      });
  }, []);

  return (
    topics && <div className="topics">
      <div className="topics__list">
        <div className={!topicName ? "topic topic_selected" : "topic"} onClick={handleClick}>
          #all
        </div>
        {topics.map((topic) => {
          return <Link
            className="topics__link"
            key={topic.slug}
            to={areArticlesLoading ? "#" : `/articles/${topic.slug}?${searchParams.toString()}`}
          >
            <TopicItem topic={topic} topicName={topicName} />
          </Link>;
        })}
      </div>
    </div>
  );
};

export default TopicList;