import React, { useRef, useState } from "react";
import { useUser } from "../contexts/UserContext";
import "../styles/comment-form.scss";
import { postComment } from "../../api";
import SubmitButton from "./SubmitButton";

const CommentForm = ({ setComments, articleId }) => {
  const { loggedInUser } = useUser();
  const textareaRef = useRef(null);
  const [text, setText] = useState("");
  const [submitStatus, setSubmitStatus] = useState({ isSubmitting: false, isSubmitted: false, isFailed: false });
  const isSubmitActive = Boolean(text);

  const handleChange = (e) => {
    setText(e.target.value);
    textareaRef.current.style.height = "auto";
    textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!text || submitStatus.isSubmitting || submitStatus.isFailed) {
      return;
    }

    setSubmitStatus(current => ({ ...current, isSubmitting: true }));

    postComment(articleId, loggedInUser?.username, text)
      .then((newComment) => {
        setSubmitStatus(current => ({ ...current, isSubmitting: false, isSubmitted: true }));
        setComments((currentComments) => [newComment, ...currentComments]);
        setText("");
      })
      .catch(() => {
        setSubmitStatus(current => ({ ...current, isSubmitting: false, isFailed: true }));
      })
      .finally(() => {
        setTimeout(() => {
          setSubmitStatus(current => ({ ...current, isSubmitted: false, isFailed: false }));
        }, 3000);
      });
  };

  return (loggedInUser
    ? <form onSubmit={handleSubmit} className='comment-form'>
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
      <SubmitButton submitStatus={submitStatus} isActive={isSubmitActive}/>
    </form>
    : null);
};

export default CommentForm;