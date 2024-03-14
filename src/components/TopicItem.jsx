import React from "react";

const TopicItem = ({ topic, topicName }) => {
  return (
    <div className={topicName === topic.slug ? "topic topic_selected" : "topic"}>
      #{topic.slug}
    </div>
  );
};

export default TopicItem;