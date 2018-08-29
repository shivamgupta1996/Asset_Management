export const SIGNED_IN = "signed_in";
export const SEND_REQUEST = "send_request";
export const SEND_HW = "send_hw";
export const SEND_AS = "send_as";


export function logUser(email) {

  const action = {
    type : SIGNED_IN,
    email
  }
  return action;
}

export function sendRequest(requests) {

  const action = {
    type : SEND_REQUEST,
    requests
  }
  return action;
}

export function sendHwAssets(hwAssets) {

  const action = {
    type : SEND_HW,
    hwAssets
  }
  return action;
}

export function sendAllAssets(allAssets){

  const action = {
    type : SEND_AS,
    allAssets
  }
  return action;

}
