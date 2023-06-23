import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { RootState } from '../store'
import ContactsService from '@/services/ContactsService'
import FomatUtils from '@/utils/FormatUtils'

interface ContactsState {
  loading: 'idle' | 'pending' | 'fulfilled' | 'rejected'
  contacts: any[]
  error: string | null | undefined
}

const initialState: ContactsState = {
  contacts: [],
  loading: 'idle',
  error: null,
}

export const fetchContacts = createAsyncThunk(
  '/contacts/view/api',
  async () => {
    const response = await ContactsService.getContacts()
    const formattedResponse = FomatUtils.formatContacts(response)
    return formattedResponse
  }
)

export const contactsSlice = createSlice({
  name: 'contacts',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchContacts.pending, (state) => {
        state.loading = 'pending'
      })
      .addCase(fetchContacts.fulfilled, (state, action) => {
        state.loading = 'idle'
        state.contacts = action.payload
      })
      .addCase(fetchContacts.rejected, (state, action) => {
        state.loading = 'idle'
        state.error = action.error.message
      })
  },
})

export const selectContacts = (state: RootState) => state.contacts.contacts
export const selectErrors = (state: RootState) => state.contacts.error
export const selectLoading = (state: RootState) => state.contacts.loading
export default contactsSlice.reducer
