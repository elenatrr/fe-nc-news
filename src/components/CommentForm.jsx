import React, { useRef, useState } from 'react';
import { useUser } from '../contexts/UserContext';
import '../styles/comment-form.scss'
import { postComment } from '../../api';

const CommentForm = ({ setComments, articleId }) => {
  const { loggedInUser } = useUser();
  const textareaRef = useRef(null)
  const [text, setText] = useState('')
  const [submitStatus, setSubmitStatus] = useState({isSubmitting: false, isSubmitted: false})
  let submitBtnClass = "comment-form__btn"

  if (submitStatus.isSubmitted) {
    submitBtnClass = "comment-form__btn comment-form__btn_submitted"
  } else if (!text || submitStatus.isSubmitting) {
    submitBtnClass = "comment-form__btn"
  } else {
    submitBtnClass = "comment-form__btn comment-form__btn_active"
  }

  const handleChange = (e) => {
    setText(e.target.value)
    textareaRef.current.style.height = "auto"
    textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!text || submitStatus.isSubmitting) {
      return
    }

    setSubmitStatus({isSubmitting: true, isSubmitted: false})
    postComment(articleId, loggedInUser.username, text)
      .then((newComment) => {
        setComments((currentComments) => [newComment, ...currentComments])
      })
      .finally(() => {
        setText('')
        setSubmitStatus({isSubmitting: false, isSubmitted: true})
        setTimeout(() => {
          setSubmitStatus({isSubmitting: false, isSubmitted: false})
        }, 3000);
      })
  }

  return (
    <form onSubmit={handleSubmit} className='comment-form'>
      <label className="comment-form__label" htmlFor="comment">Comment as <span className='comment-form__username'>{loggedInUser?.username}:</span></label>
      <textarea
        className="comment-form__textarea"
        name="comment"
        id="comment"
        maxLength={280}
        value={text}
        ref={textareaRef}
        placeholder='What are your thoughts?'
        onChange={handleChange}
      ></textarea>
      <button className={submitBtnClass} type='submit'>{submitStatus.isSubmitting ? 'Submitting...' : submitStatus.isSubmitted ? 'Submitted ✔' : 'Submit'}</button>
    </form>
  );
};

export default CommentForm;