import { configureStore } from '@reduxjs/toolkit'

import contactsSlice from './slices/contactsSlice'

export const store = configureStore({
  reducer: {
    contacts: contactsSlice,
  },
})

export default store

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
