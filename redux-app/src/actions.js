
/*  Actions are payloads of information that send data from your application to your store. 
**  They are the only source of information for the store.
** Actions determines the step to be taken in processing data

*/
export const LOAD_DATA = 'LOAD_DATA';
export const UPDATE_DATA = 'UPDATE_DATA';

export function loadData(payload=''){
    return {
        /*
        ** Actions must have a type property that indicates the type of action being performed.
        **  Types should typically be defined as string constants
        ** payload is the data to be processed
        */
        type:LOAD_DATA,
        payload
    }
}

export function updateData(payload){
    return {
        type:UPDATE_DATA,
        payload
    }
}
