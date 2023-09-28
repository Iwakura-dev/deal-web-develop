import React, {createContext, PropsWithChildren, useReducer} from 'react';
import TronWebService from './tronWebService';

export type TronWebServiceContextState = {
  ready: boolean;
  tronWebService?: TronWebService;
  setReady?: VoidFunction;
  setService?: (payload: TronWebService) => void;
};

const initialState: TronWebServiceContextState = {
  ready: false,
};
export const TronWebServiceContext =
  createContext<TronWebServiceContextState>(initialState);

export enum TronWebServiceActionKind {
  SET_READY = 'SET_READY',
  SET_SERVICE = 'SET_SERVICE',
}

interface TronWebServiceActionAction {
  type: TronWebServiceActionKind;
  payload?: TronWebService;
}

const reducer = (
  state: TronWebServiceContextState,
  action: TronWebServiceActionAction,
) => {
  switch (action.type) {
    case TronWebServiceActionKind.SET_READY:
      return {
        ...state,
        ready: true,
      };
    case TronWebServiceActionKind.SET_SERVICE:
      return {
        ...state,
        tronWebService: action.payload,
      };
  }
};

export const TronWebServiceProvider = ({children}: PropsWithChildren) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const {ready, tronWebService} = state;

  const setReady = () => dispatch({type: TronWebServiceActionKind.SET_READY});
  const setService = (payload: TronWebService) =>
    dispatch({type: TronWebServiceActionKind.SET_SERVICE, payload});

  return (
    <TronWebServiceContext.Provider
      value={{ready, tronWebService, setReady, setService}}>
      {children}
    </TronWebServiceContext.Provider>
  );
};
