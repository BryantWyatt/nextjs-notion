import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { RootState } from '../store'
import ContactsService from '@/services/ContactsService'
import FormatUtils from '@/utils/FormatUtils'

interface ContactsState {
  loading: 'idle' | 'pending' | 'fulfilled' | 'rejected'
  contacts: any[]
  contact: any
  error: string | null | undefined
}

const initialState: ContactsState = {
  contacts: [],
  contact: {},
  loading: 'idle',
  error: null,
}

export const fetchContacts = createAsyncThunk('/contacts/api', async () => {
  const response = await ContactsService.getContacts()
  const formattedResponse = FormatUtils.formatContacts(response)
  return formattedResponse
})

export const fetchContact = createAsyncThunk(
  'contacts/[slug]/api',
  async (id: string) => {
    const response = await ContactsService.getContact(id)
    const formattedResponse = FormatUtils.formatContact(response)
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
      .addCase(fetchContact.pending, (state) => {
        state.loading = 'pending'
      })
      .addCase(fetchContact.fulfilled, (state, action) => {
        state.loading = 'idle'
        state.contact = action.payload
      })
      .addCase(fetchContact.rejected, (state, action) => {
        state.loading = 'idle'
        state.error = action.error.message
      })
  },
})

export const selectContacts = (state: RootState) => state.contacts.contacts
export const selectContact = (state: RootState) => state.contacts.contact
export const selectErrors = (state: RootState) => state.contacts.error
export const selectLoading = (state: RootState) => state.contacts.loading
export default contactsSlice.reducer
