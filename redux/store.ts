import { setupListeners } from '@reduxjs/toolkit/dist/query'
import { contactsApi } from './slices/contactsSlice'
import { configureStore } from '@reduxjs/toolkit'

export const store = configureStore({
  // Add the generated reducer as a specific top-level slice
  reducer: {
    [contactsApi.reducerPath]: contactsApi.reducer,
  },
  // Adding the api middleware enables caching, invlidation, polling
  // other useful features of `rtk-query`.
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(contactsApi.middleware),
})

// optional, but required for refetchOnFocus/refetchOnReconnect behaviors
// see `setupListeners` docs - takes an optional callback as the 2nd arg for customization
setupListeners(store.dispatch)

export default store

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
