"use strict"
const { createStore } = require('redux');


// reducer
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

// store
const store = createStore(myReducer);

// Action
store.dispatch({ type: 'UP' });
console.log(store.getState());
store.dispatch({ type: 'DOWN' });
console.log(store.getState());