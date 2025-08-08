// library code

function createStore(){

  let state;
  let listeners=[];


  const getState= () => state;

  const subscribe=(listener)=>{
    listeners.push(listener);

    return ()=>{
      listeners=listeners.filter((l)=> l !== listener);
    };
  };

  const dispatch=(action) => {
    state= reducer(state,action);
    listeners.forEach((listener)=> listener());

  };

  return {
    getState,
    subscribe,
    dispatch,
  };
};

//app code

const ADD_TODO = "ADD_TODO";
const REMOVE_TODO = "REMOVE_TODO";
const TOGGLE_TODO = "TOGGLE_TODO";
const ADD_GOAL = "ADD_GOAL";
const REMOVE_GOAL = "REMOVE_GOAL";


function addToDo(todo) {
  return {
    type: ADD_TODO,
    todo,
  };
};
function removeToDo(id) {
  return{
    type:REMOVE_TODO,
    id,
  };
};

function toggleToDo(id) {
  return{
    type:TOGGLE_TODO,
    id,
  };
};
function addGoal(goal) {
  return{
    type:ADD_GOAL,
    goal,
  };
};
function removeGoal(id) {
  return{
    type:REMOVE_GOAL,
    id,
  };
};


