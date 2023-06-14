import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { RootState } from '../store'
import ContactUsService from '@/services/ContactUsService'
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
  '/contactus/view/api',
  async () => {
    const response = await ContactUsService.getContacts()
    const formattedResponse = FomatUtils.formatContacts(response)
    return formattedResponse
  }
)

export const contactUsSlice = createSlice({
  name: 'contactUs',
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

// export const {loadingContacts, contactsReceived } = contactUsSlice.actions

export const selectContacts = (state: RootState) => state.contactUs.contacts
export const selectErrors = (state: RootState) => state.contactUs.error
export const selectLoading = (state: RootState) => state.contactUs.loading
export default contactUsSlice.reducer
