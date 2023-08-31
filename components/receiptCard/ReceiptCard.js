import React from 'react';
import PropTypes from 'prop-types';
import './ReceiptCard.css';

const ReceiptCard = ({ imageUrl, title, amount, category, date }) => {
  return (
    <div className="receipt-card">
      <div className={category}>{category}</div>
      <img className="receipt-image" src={imageUrl} alt={title} />
      <div className="overlay">
        <h2 className="title">{title}</h2>
        <p className="amount">$ {amount}</p>
        <p className="date">{date}</p>
      </div>
    </div>
  );
};

ReceiptCard.propTypes = {
  imageUrl: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  amount: PropTypes.number.isRequired,
  category: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
};

export default ReceiptCard;
