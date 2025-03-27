import React, { useState, memo, useCallback } from 'react';
import Vote from './Vote';
import styles from './AnswerItem.module.css';

const AnswerItem = memo(({ answer, onVote, addReply, level = 0 }) => {
  const [showReplies, setShowReplies] = useState(true);
  const [replyText, setReplyText] = useState('');
  const [showReplyInput, setShowReplyInput] = useState(false);

  const handleSendReply = useCallback(() => {
    if (replyText.trim()) {
      addReply(answer.id, replyText);
      setReplyText('');
      setShowReplyInput(false);
    }
  }, [replyText, addReply, answer.id]);

  const colorClass = styles[`level${level % 4}`]; // Alternância de cores

  return (
    <div className={`${styles.answerItem} ${colorClass}`}>
      <div className={styles.header}>
        <p className={styles.text}>{answer.text}</p>
        <Vote
          answerId={answer.id}
          onVote={onVote}
          upvotes={answer.upvotes}
          downvotes={answer.downvotes}
        />
      </div>

      <div className={styles.actions}>
        <button onClick={() => setShowReplyInput(prev => !prev)} className={styles.replyButton}>
          {showReplyInput ? 'Cancelar' : 'Responder'}
        </button>
        <button onClick={() => setShowReplies(prev => !prev)} className={styles.replyButton}>
          {showReplies ? '▲ Ocultar' : '▼ Mostrar'} Respostas
        </button>
      </div>

      {showReplyInput && (
        <div className={styles.replyBox}>
          <textarea
            value={replyText}
            onChange={(e) => setReplyText(e.target.value)}
            placeholder="Escreva sua resposta..."
            className={styles.textarea}
          />
          <button onClick={handleSendReply} className={styles.sendButton}>
            Enviar
          </button>
        </div>
      )}

      {showReplies && answer.replies?.map(reply => (
        <AnswerItem
          key={reply.id}
          answer={reply}
          onVote={onVote}
          addReply={addReply}
          level={level + 1}
        />
      ))}
    </div>
  );
});

export default AnswerItem;
