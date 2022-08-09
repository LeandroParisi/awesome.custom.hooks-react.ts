import React from 'react'

export abstract class AStoreActions<TStore> {
  protected store : TStore

  protected setStore : React.Dispatch<React.SetStateAction<TStore>>

  /**
   *
   */
  constructor(store : TStore, setStore : React.Dispatch<React.SetStateAction<TStore>>) {
    this.store = store
    this.setStore = setStore
  }
}
