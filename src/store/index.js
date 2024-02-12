import React, { createContext, useReducer } from 'react'

//initial state 初期状態
const initialState = {
    popular: [],
    related: [],
    searched: [],
    selected: {},
    term: '',
}

// データを更新する
const reducer = (state, action) => {
    switch(action.type) {
        case 'SET_POPULAR':
            return { ...state, popular: action.payload.popular }
        case 'SET_RELATED':
            return {...state, related: action.payload.related}
        case 'SET_SELECTED':
            return {...state, selected: action.payload.selected}
        case 'SET_SEARCHED':
            return {...state, searched: action.payload.searched}
        case 'SET_TERM':
            return {...state, term: action.payload.term}
        default:
            return state
    }
}

//contextAPI　globalStateに初期値をセット
export const Store = createContext({
    globalState: initialState,
    setGlobalState: () => null
})

export const StoreProvider = ({children}) => {
    const [globalState, setGlobalState] = useReducer(reducer, initialState)
    // 子コンポーネントでvalueの値を共有する
    return (
        <Store.Provider value={{ globalState, setGlobalState }}>{children}</Store.Provider>
    )
}
