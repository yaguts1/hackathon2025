import React, { useState } from 'react';
import Vote from './Vote';
import CommentSection from './commentSection';



const Question = ({ questionData }) => {
  const { title, body, upvotes, downvotes, comments } = questionData;

  return (
    <div className="question">
      <h2>{title}</h2>
      <p>{body}</p>
      <Vote upvotes={upvotes} downvotes={downvotes} />
      <CommentSection comments={comments} />
    </div>
  );
};

export default Question;
