import {SEND_HW} from '../actions';

export default (state = [], action) => {

  switch (action.type){
    case SEND_HW:
      const { hwAssets } = action;

      return hwAssets;

      default :
        return state;
  }
}
