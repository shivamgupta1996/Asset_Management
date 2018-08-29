import {SEND_AS} from '../actions';

export default (state = [], action) => {

  switch (action.type){
    case SEND_AS:
      const { allAssets } = action;

      return allAssets;

      default :
        return state;
  }
}
