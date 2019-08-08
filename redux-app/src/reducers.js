//Reducers specify how the application's state changes in response to actions sent to the store.

import {combineReducers,createStore} from 'redux';
import {LOAD_DATA, UPDATE_DATA} from './actions';
// import { fetchData } from './util';



/*UPDATE DATA updates redux store using filter function
** action.payload.id corresponds to array index of the new user data
**  Checks for element with index and changes the fields to match input fields
*/
export function userDataReducer(state=[],action){
    switch(action.type){
        case LOAD_DATA:
            // console.log(state);
            return Object.assign([],[...action.payload,...state]);
            break;

        case UPDATE_DATA:
            let update = state.filter((item,index)=>{
                if(index==action.payload.id){
                    item['name'] = action.payload.data.name;
                    item['email'] = action.payload.data.email;
                    item['address']['city'] = action.payload.data.city;
                    item['phone'] = action.payload.data.phone;
                    item['website'] = action.payload.data.website;
                    item['company']['name'] = action.payload.data.company;
                    return item;
                }
                return item;
            });
            return Object.assign([],[...update])
            break;

        default:
            return state;
    }
}

// Create reducer; this method combines all reducers to a single entity to be used
// for the store.
let reducers = combineReducers({userDataReducer});

// Create store; store is responsible for dispatching actions
export let store = createStore(reducers);

