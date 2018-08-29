import { combineReducers } from 'redux';
import user from './reducer-user';
import requests from './reducer-requests';
import hwAssets from './reducer-hw';
import allAssets from './reducer-all-assets';

export default combineReducers({
user,
requests,
hwAssets,
allAssets
})
