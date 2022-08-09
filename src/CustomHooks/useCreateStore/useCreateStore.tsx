/* eslint-disable max-len */
/* eslint-disable no-use-before-define */
import React, { PropsWithChildren } from 'react'
import { AStoreActions } from './BaseClasses/AStoreActions'
import { AStoreSelectors } from './BaseClasses/AStoreSelectors'

export interface IUseCreateStoreReturn<
  TInitialState,
  TActions extends AStoreActions<TInitialState>,
  TSelectors extends AStoreSelectors<TInitialState>
> {
  $store : TInitialState
  actions? : TActions
  selectors? : TSelectors
}

/**
 *
 * @param storeCreationCallback Callback which is responsable for creating store using useState, generating actions, selectors and creating useEffects if necessary
 * @param initialState Store initial state
 * @returns Store: {$store, actions?, selectors?}
 */
export function useCreateStore<
  TInitialState,
  TActions extends AStoreActions<TInitialState>,
  TSelectors extends AStoreSelectors<TInitialState>
>(
  storeCreationCallback : (props : PropsWithChildren) => IUseCreateStoreReturn<TInitialState, TActions, TSelectors>,
  initialState : TInitialState,
) {
  const Context = React.createContext<IUseCreateStoreReturn<TInitialState, TActions, TSelectors>>({ $store: initialState })

  const Provider = (props : PropsWithChildren) => {
    const { children } = props
    const value = storeCreationCallback(props)

    return <Context.Provider value={value}>{children}</Context.Provider>
  }

  const useContext = () => React.useContext(Context)

  useContext.Context = Context

  useContext.Provider = Provider

  return useContext
}
