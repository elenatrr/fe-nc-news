import React, { useState } from 'react';
import { formatDistanceToNow } from 'date-fns';
import '../styles/comment-item.scss'
import { useUser } from '../contexts/UserContext';
import { deleteComment } from '../../api';

const CommentItem = ({ comment }) => {
  const timeAgo = formatDistanceToNow(new Date(comment.created_at), { addSuffix: true });
  const areVotesNegative = comment.votes < 0
  const { loggedInUser } = useUser()
  const isAllowedToDelete = comment.author === loggedInUser.username
  const [deleteStatus, setDeleteStatus] = useState({ isDeleting: false, isDeleted: false, isClosed: false });

  const handleDelete = () => {
    if (deleteStatus.isDeleting) {
      return
    }

    setDeleteStatus(current => ({ ...current, isDeleting: true }))
    deleteComment(comment.comment_id)
      .then(() => {
        setDeleteStatus({ isDeleting: false, isDeleted: true, isClosed: false })
        setTimeout(() => {
          setDeleteStatus(current => ({ ...current, isClosed: true }))
        }, 3000);
      })
      .catch(() => {
        setDeleteStatus({ ...deleteStatus, isDeleting: false });
      })
  }

  return (deleteStatus.isDeleted
    ? <div className={deleteStatus.isClosed ? 'comment comment_deleted comment_closed' : 'comment comment_deleted'}>
      Your comment has been successfully deleted ✔
    </div>
    : <div className='comment'>
      <div className='comment__top'>
        <div className='comment__info'>
          <p className='comment__author'>{comment.author}</p>
          <span className='comment__date'>{timeAgo}</span>
        </div>
        {isAllowedToDelete && <button className={deleteStatus.isDeleting ? 'comment__delete comment__delete_load' : 'comment__delete'} onClick={handleDelete}></button>}
      </div>
      <div className='comment__main'>
        <p className='comment__body'>{comment.body}</p>
        <span className={areVotesNegative ? 'comment__votes comment__votes_negative' : 'comment__votes'}>{comment.votes}</span>
      </div>
    </div>
  );
};

export default CommentItem;