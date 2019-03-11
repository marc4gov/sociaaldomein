import React, { PropTypes } from 'react';

const propTypes = {
  item: PropTypes.object.isRequired,
  style: PropTypes.object
};

const galPng = require('../../../assets/images/gal.png');
const delPng = require('../../../assets/images/del.png');

const Performer = (props) => {
  const {img} = props;

  return (
      <div className="perfomer">
        <img
          src={img}
          alt="Performer"
        />
      </div>
  )
}


const Card = (props) => {
  const { style, item } = props;

  return (
    <div style={style} className="item" id={style ? item.id : null}>
      <div className="item-name">{item.title}</div>
      <div className="item-container">
        <div className="item-avatar-wrap">
          <img src={item.img} alt="" />
        </div>
        <div className="item-content">
          <div className="item-author">{item.text}</div>
        </div>
      </div>
      <div className="item-perfomers">
        <div className="add-perfomers">
          <a href="#"><img src={galPng} alt="Add perfomers" /></a>
          {item.gals.map((img) => <Performer img={img} />)}
        </div>
        <div className="delete-perfomers">
          <a href="#"><img src={delPng} alt="Delete perfomers" /></a>
          {item.dels.map((img) => <Performer img={img} />)}
        </div>
      </div>
    </div>
  );
};

Card.propTypes = propTypes;

export default Card;
