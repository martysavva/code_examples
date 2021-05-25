const addMethod = (state) => ({
  add: (item) => {
    state.queue.push(item); //add to end of array
    if(state.isInitialRun) {
      state.queue[0]();
      state.isInitialRun = false;
    }
  }
});

const nextMethod = (state) => ({
  next: () => {
    state.queue.shift(); //remove first item in array
    if(state.queue.length > 0){
      state.queue[0]()
    }
  }
});

const resetMethod = (state) => ({
  reset: () => {
    state.isInitialRun = true;
    state.queue = [];
  }
});



// Object //////
const queue = () => {
  let state = {
    queue: [],
    isInitialRun: true
  };

  return Object.assign(
    {},
    addMethod(state),
    nextMethod(state),
    resetMethod(state)
  )
};

export default queue