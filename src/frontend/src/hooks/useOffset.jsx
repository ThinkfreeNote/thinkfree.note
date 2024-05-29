import {useReducer} from 'react';

const offsetReducer = (state,action) => {
    switch (action.type){
        case "updateOffset" : {
            return  {
                x : action.x || state.x,
                y : action.y || state.y
            }
        }
        case "clearOffset" : {
            return {
                x : 0,
                y : 0
            }
        }
        default : {
            return state;
        }
    }
}


/**
 * @Description x,y offset 관리하는 커스텀 훅
 * @param {{x : number, y:number}} [init={x :0, y:0}]
 * @returns {[{x:number,y:number}|Dispatch]}
 */
function useOffset(init = {x : 0 , y: 0}) {
    const [offset, dispatch] = useReducer(offsetReducer, init);

    return [offset,dispatch];
}

export default useOffset;