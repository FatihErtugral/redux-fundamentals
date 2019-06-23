"use strict"
const {
   createStore,
   combineReducers,
   applyMiddleware,
} = require('redux');
const thunk = require('redux-thunk').default;
const fetch = require('node-fetch');
//#region Reducer
/////////////////////////////////////////////////////////
const initialState = {
   data: {}
};

const myReducer = (state = initialState, action) => {
   switch (action.type) {
      case 'FETCH_DATA':
         return Object.assign({}, state, { data: action.data });
      default:
         return state;
   };
};

const initialState2 = {
   name: 'Fatih',
   lastname: 'Ertuğral'
};

const youReducer = (state = initialState2, action) => {
   switch (action.type) {
      case 'NEW_NAME':
         return Object.assign({}, state, { name: action.name, lastname: action.lastname });
      default:
         return state;
   }
}
//#endregion

//#region Store
/////////////////////////////////////////////////////////
const rootReducer = combineReducers({ myReducer, youReducer });
const store = createStore(rootReducer, applyMiddleware(thunk));
//#endregion

//#region Action
/////////////////////////////////////////////////////////
function fetchSecretSauce() {
   return fetch('https://www.google.com/search?q=fatih+ertugral');
}

const myAction = (data) => {
   return {
      type: 'FETCH_DATA',
      data
   }
}

const myActionAsync = dispatch => fetchSecretSauce()
   .then(data => dispatch(myAction(data)), err => dispatch(myAction(err)));

store.dispatch(myActionAsync);
store.dispatch({ type: 'NEW_NAME', name: 'Emre', lastname: 'test' });
console.log(store.getState());
setTimeout(() => {
   console.log(store.getState())
},
1000)
//#endregion

// Console
/*
 $ node v2.js
{
   myReducer: { age: 31 },
  youReducer: { name: 'Fatih', lastname: 'Ertuğral' }
}
{
   myReducer: { age: 30 },
  youReducer: { name: 'Emre', lastname: 'test' }
}
*/