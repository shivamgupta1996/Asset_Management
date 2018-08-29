import {SEND_REQUEST} from '../actions';

export default (state = [], action) => {

  switch (action.type){
    case SEND_REQUEST:
      const { requests } = action;

      return requests;

      default :
        return state;
  }
}
