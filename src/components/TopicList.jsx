import React, { useEffect, useState } from "react";
import { fetchTopics } from "../../api";
import TopicItem from "./TopicItem";
import { useNavigate, Link} from "react-router-dom";
import "../styles/topic-list.scss";

const TopicList = ({ topicName }) => {
  const [topics, setTopics] = useState(null);
  const navigate = useNavigate();
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
      <h4 className="topics__title">Choose a topic:</h4>
      <div className="topics__list">
        <div className={!topicName ? "topic topic_selected" : "topic"} onClick={handleClick}>
          #all
        </div>
        {topics.map((topic) => {
          return <Link
            className="topics__link"
            key={topic.slug}
            to={`/articles/${topic.slug}`}
          >
            <TopicItem topic={topic} topicName={topicName}/>
          </Link>;
        })}
      </div>
    </div>
  );
};

export default TopicList;