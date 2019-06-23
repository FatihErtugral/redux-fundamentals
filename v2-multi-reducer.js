"use strict"
const { createStore, combineReducers } = require('redux');

// Reducer BEGIN
/////////////////////////////////////////////////////////
const initialState = {
   age: 30
};

const myReducer = (state = initialState, action) => {
   switch (action.type) {
      case 'UP':
         return Object.assign({}, state, { age: state.age + 1 });
      case 'DOWN':
         return Object.assign({}, state, { age: state.age - 1 });
      default:
         return state;
   }
}

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
// Reducer END

// Store
/////////////////////////////////////////////////////////
const rootReducer = combineReducers({ myReducer, youReducer });
const store = createStore(rootReducer);


// Action
/////////////////////////////////////////////////////////
store.dispatch({ type: 'UP' });
console.log(store.getState());
store.dispatch({ type: 'DOWN' });
store.dispatch({ type: 'NEW_NAME', name: 'Emre', lastname: 'test' });
console.log(store.getState());

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