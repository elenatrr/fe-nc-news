import React, { useState } from "react";
import { formatDistanceToNow } from "date-fns";
import "../styles/comment-item.scss";
import { useUser } from "../contexts/UserContext";
import { deleteComment } from "../../api";

const CommentItem = ({ comment }) => {
  const timeAgo = formatDistanceToNow(new Date(comment.created_at), { addSuffix: true });
  const areVotesNegative = comment.votes < 0;
  const { loggedInUser } = useUser();
  const isAllowedToDelete = comment.author === loggedInUser?.username;
  const [deleteStatus, setDeleteStatus] = useState({ isDeleting: false, isDeleted: false, isFailed: false });

  const handleDelete = () => {
    if (deleteStatus.isDeleting || deleteStatus.isFailed) {
      return;
    }

    setDeleteStatus(current => ({ ...current, isDeleting: true }));

    deleteComment(comment.comment_id)
      .then(() => {
        setDeleteStatus(current => ({ ...current, isDeleting: false, isDeleted: true }));
        setTimeout(() => {
          setDeleteStatus(current => ({ ...current, isDeleted: true }));
        }, 3000);
      })
      .catch(() => {
        setDeleteStatus(current => ({ ...current, isDeleting: false, isFailed: true }));
        setTimeout(() => {
          setDeleteStatus(current => ({ ...current, isFailed: false }));
        }, 3000);
      });
  };

  return (deleteStatus.isDeleted
    ? <div className='comment comment_deleted'>
      Your comment has been successfully deleted ✔
    </div>
    : <div className='comment'>
      {deleteStatus.isFailed && <div className='comment__error'>Failed to delete comment</div>}
      <div className='comment__top'>
        <div className='comment__info'>
          <p className='comment__author'>{comment.author}</p>
          <span className='comment__date'>{timeAgo}</span>
        </div>
        {isAllowedToDelete && <button className={deleteStatus.isDeleting ? "comment__delete comment__delete_load" : "comment__delete"} onClick={handleDelete}></button>}
      </div>
      <div className='comment__main'>
        <p className='comment__body'>{comment.body}</p>
        <span className={areVotesNegative ? "comment__votes comment__votes_negative" : "comment__votes"}>{comment.votes}</span>
      </div>
    </div>
  );
};

export default CommentItem;