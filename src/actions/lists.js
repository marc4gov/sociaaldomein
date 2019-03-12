export const GET_LISTS_START = 'GET_LISTS_START';
export const GET_LISTS = 'GET_LISTS';
export const MOVE_CARD = 'MOVE_CARD';
export const MOVE_LIST = 'MOVE_LIST';
export const TOGGLE_DRAGGING = 'TOGGLE_DRAGGING';

const wmoPng = require('../assets/images/wmo.png');
const uwvPng = require('../assets/images/uwv.png');
const idPng = require('../assets/images/id.png');
const partnerPng = require('../assets/images/partner.png');
const gezinPng = require('../assets/images/gezin.png');
const cvPng = require('../assets/images/cv.png');
const schuldenPng = require('../assets/images/schulden.png');
const bankPng = require('../assets/images/bank.png');
const kindPng = require('../assets/images/kinderen.png');
const emptyPng = require('../assets/images/empty.png');

export function makeCard(id, img, title, text, gals = [emptyPng], dels = [emptyPng] ) {
  return {
    id: id,
    img: img,
    title: title,
    text: text,
    gals: gals,
    dels: dels
    // idimg: idPng,
    // partner: partnerPng,
    // gezin: gezinPng
  }
}

function getCards(listType) {
  const cards = [];
  switch(listType) {
    case "inkomen": {
      cards.push(makeCard(1, uwvPng, "Aanvraag Bijstand", "Alleenstaand", [idPng], [partnerPng, gezinPng, cvPng]));
      cards.push(makeCard(2, uwvPng, "Aanvraag Bijstand", "Gezamenlijk", [idPng, partnerPng], [gezinPng, cvPng]));
      cards.push(makeCard(3, schuldenPng, "Overzicht", "Schulden", [idPng, bankPng], [partnerPng, gezinPng, cvPng]));
      break;
    };
    case "werk": {
      cards.push(makeCard(5, cvPng, "Inschrijven werk.nl", "CV uploaden", [idPng, cvPng], [partnerPng, gezinPng]));
      break;     
    };
    case "persoon": {
      cards.push(makeCard(6, idPng, "ID kaart", "nodig voor alles"));
      cards.push(makeCard(7, cvPng, "Curriculum Vitae", "nodig voor werk"));
      cards.push(makeCard(8, gezinPng, "Gezinssituatie", "nodig voor aanvraag"));
      cards.push(makeCard(9, partnerPng, "Persoonsgegevens", "nodig voor aanvraag"));
      cards.push(makeCard(10, bankPng, "Bankgegevens", "nodig voor overzicht"));
      break;     
    };
    case "wmo": {
      cards.push(makeCard(11, wmoPng, "Aanvraag WMO", "Gezin", [idPng, partnerPng, gezinPng], [cvPng]));
      cards.push(makeCard(12, kindPng, "Kinderopvang", "Jeugd", [idPng, gezinPng], [partnerPng, cvPng]));
      break;
    }    
    default: {
      cards.push(makeCard(13, wmoPng, "Aanvraag WMO", "Alleenstaand"));
      break;
    }

  }
  return cards;
}


export function getLists(quantity) {
  return dispatch => {
    dispatch({ type: GET_LISTS_START, quantity });
    setTimeout(() => {
      const lists = [];
      let cards = getCards("persoon");
      lists.push({id: 1, name: "Persoon", cards});
      cards = getCards("werk");
      lists.push({id: 2, name: "Werk", cards});
      cards = getCards("inkomen");
      lists.push({id: 3, name: "Inkomen", cards});
      cards = getCards("wmo");
      lists.push({id: 4, name: "Zorg-WMO-Jeugd", cards});
      cards = [];
      lists.push({id: 5, name: "Match bord", cards});

      dispatch({ type: GET_LISTS, lists, isFetching: true });
    }, 1000); // fake delay
    dispatch({ type: GET_LISTS_START, isFetching: false });
  };
}

export function moveList(lastX, nextX) {
  return (dispatch) => {
    dispatch({ type: MOVE_LIST, lastX, nextX });
  };
}

export function moveCard(lastX, lastY, nextX, nextY) {
  return (dispatch) => {
    dispatch({ type: MOVE_CARD, lastX, lastY, nextX, nextY });
  };
}

export function toggleDragging(isDragging) {
  return (dispatch) => {
    dispatch({ type: TOGGLE_DRAGGING, isDragging });
  };
}
