import React, { useState } from 'react';
import '../styles/vote-reactions.scss'
import { patchArticle } from '../../api';

const VoteReactions = ({ votes, setVotes, areVotesNegative, articleId }) => {
  const [userVote, setUserVote] = useState(0)
  const [isVoting, setIsVoting] = useState(false)

  const handleVote = (voteClicked) => {
    if (voteClicked === userVote || isVoting) {
      return
    }

    const voteChange = voteClicked - userVote;

    setIsVoting(true)
    setUserVote(voteClicked)
    setVotes((currentVotes) => currentVotes + voteChange);

    patchArticle(articleId, voteChange)
      .then(() => {
        setIsVoting(false)
      })
  }

  return (
    <div className='reactions'>
      <button
        disabled={isVoting}
        className={userVote === 1 ? 'reactions__btn reactions__btn_upvote reactions__btn_clicked' : 'reactions__btn reactions__btn_upvote'}
        onClick={() => handleVote(1)}
      >
        <img className="reactions__image" src="https://i.gstatvb.com/4eb3123b4c6d3bb0794f36fb9964c5261710336800.rng.png" alt="Pink heart" />
        <span className='reactions__number'>{areVotesNegative ? null : votes}</span>
      </button>
      <button
        disabled={isVoting}
        className={userVote === -1 ? 'reactions__btn reactions__btn_downvote reactions__btn_clicked' : 'reactions__btn reactions__btn_downvote'}
        onClick={() => handleVote(-1)}
      >
        <span className='reactions__number'>{areVotesNegative ? votes : null}</span>
        <img className="reactions__image" src="https://i.gstatvb.com/05cceec9b029ec7a69cc4a19d598b5671710336819.rng.png" alt="Broken heart" />
      </button>
    </div>
  );
};

export default VoteReactions;