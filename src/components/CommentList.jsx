import React, { useEffect, useState } from 'react';
import { fetchComments } from '../../api';
import CommentItem from './CommentItem';
import Loader from './Loader';
import "../styles/comment-list.scss"

const CommentList = ({ articleId, commentCount }) => {
  const [comments, setComments] = useState([])
  const [areCommentsLoading, setAreCommentsLoading] = useState(true)
  const [pageNumber, setPageNumber] = useState(1)
  const defaultLimit = 10
  const isLoaderShown = areCommentsLoading && comments.length === 0
  const isLoadMoreShown = !isLoaderShown && pageNumber * defaultLimit < commentCount

  const nextPage = () => {
    setPageNumber((currentPage) => currentPage + 1)
  }

  const loadComments = async () => {
    setAreCommentsLoading(true)
    fetchComments(articleId, pageNumber)
      .then((comments) => {
        setComments((currentComments) => [...currentComments, ...comments])
        setAreCommentsLoading(false)
      })
  }

  useEffect(() => {
    loadComments()
  }, [pageNumber])

  return isLoaderShown ? <Loader/> : (
    <div className='comments'>
      <div className='comments__list'>
        <div className='comments__top'>
          <h4 className='comments__title'>{!commentCount ? 'No comments yet' : 'Comments'}</h4>
          <span className='comments__count'>{commentCount}</span>
        </div>
        {comments.map((comment) => {
          return <CommentItem key={comment.comment_id} comment={comment} />
        })}
      </div>
      {areCommentsLoading ? <Loader/> : isLoadMoreShown && <button className="comments__btn" onClick={() => { nextPage() }}>Load More</button>}
    </div>
  );
};

export default CommentList;