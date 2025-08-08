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

function todos(state=[],action){
  switch(action.type){
    case  ADD_TODO:
      return state.concat([action.todo]);
    case REMOVE_TODO:
      return state.filter((todo) => todo.id !== action.id);
    case TOGGLE_TODO:
      return state.map((todo) =>
        todo.id !== action.id
          ? todo
          : Object.assign({}, todo, { complete: !todo.complete })
      );
    default:
      return state;
  }
   
}

function goals(state=[],action){
  switch (action.type) {
    case ADD_GOAL:
      return state.concat([action.goal]);
    case REMOVE_GOAL:
      return state.filter((goal) => goal.id !== action.id);
    default:
      return state;
  }
}

function app(state={},action){
  return {
    todos: todos(state.todos,action),
    goals: goals(state.goals,action),
  };
};

const store=createStore(app);

store.subscribe(() => {
  console.log("The new state is: ", store.getState());
});


