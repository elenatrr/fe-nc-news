import React from "react";
import "../styles/submit-button.scss";

const SubmitButton = ({submitStatus, isActive}) => {
  let submitBtnClass = "comment-form__btn";
  let submitBtnText = "Submit";

  if (submitStatus.isSubmitting) {
    submitBtnText = "Submitting...";
  } else if (submitStatus.isSubmitted) {
    submitBtnClass += " comment-form__btn_submitted";
    submitBtnText = "Submitted ✔";
  } else if (submitStatus.isFailed) {
    submitBtnClass += " comment-form__btn_failed";
    submitBtnText = "Failed to submit";
  } else if (isActive) {
    submitBtnClass += " comment-form__btn_active";
  }

  return (
    <button className={submitBtnClass} type='submit'>{submitBtnText}</button>
  );
};

export default SubmitButton;