class MyRedux {
    constructor(stateReducer, initialState) {

        let listners = [];
        let state = initialState;
        let reducer = stateReducer;
        this.getStote = () => {
            return state;
        }

        this.subscribe = (listner) => {
            listners.push(listner);
            const unsubscribe = () => {
                listners = listners.filter((item) => listner != item);
            }
            return unsubscribe;
        }

        this.dispatch = (action) => {
            if (!validateAction(action))
                throw (`Action should have type property.`);
            state = reducer(state, action);
            listners.forEach((listner) => listner(state));
        }

    }
}

const validateAction = (action) => {
    if (!action || !action.type)
        return false;
    return true;
}


const INCREAMENT = "INCREAMENT";
const DECREAMENT = "DECREAMENT";


const reducer = (state = 0, action) => {
    switch (action.type) {
        case INCREAMENT:
            return state + 1;
        case INCREAMENT:
            return state - 1;
    }
    return state;
}



/**
 * Example how to use
 */

// const store = new MyRedux(reducer, 0);

// console.log("Initial state ", store.getStote());
// store.dispatch({ type: INCREAMENT });
// console.log("State after INCREAMENT dispatch ", store.getStote());

// const unsub = store.subscribe((state) => {
//     console.log("Inside subscribe and state is ", state);
// });

// let count = 0;
// let interver = setInterval(() => {
//     if (count >= 5)
//         unsub();
//     store.dispatch({ type: INCREAMENT });
//     count++;
//     if(count >= 10){
//          clearInterval(interver);
//          console.log("State in the end  ", store.getStote());
//     }
// }, 500);

