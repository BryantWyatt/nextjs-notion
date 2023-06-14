import { configureStore } from '@reduxjs/toolkit'

import contactUsSlice from './slices/contactUsSlice'

export const store = configureStore({
  reducer: {
    contactUs: contactUsSlice,
  },
})

export default store

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
