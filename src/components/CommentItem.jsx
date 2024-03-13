import React from 'react';
import { formatDistanceToNow } from 'date-fns';
import '../styles/comment-item.scss'

const CommentItem = ({ comment }) => {
  const timeAgo = formatDistanceToNow(new Date(comment.created_at), { addSuffix: true });
  const areVotesNegative = comment.votes < 0

  return (
    <div className='comment'>
      <div className='comment__top'>
        <p className='comment__author'>{comment.author}</p>
        <span className='comment__date'>{timeAgo}</span>
      </div>
      <div className='comment__main'>
        <p className='comment__body'>{comment.body}</p>
        <span className={areVotesNegative ? 'comment__votes comment__votes_negative' : 'comment__votes'}>{comment.votes}</span>
      </div>
    </div>
  );
};

export default CommentItem;