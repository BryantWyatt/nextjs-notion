import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from '../store';
import ContactUsService from "@/services/ContactUsService";
import FomatUtils from "@/utils/FormatUtils";

const domain = window.location.origin;

interface ContactsState {
    loading: string;
    contacts: any[]
}

const initialState: ContactsState = {
    loading: 'idle',
    contacts: []
}

export const fetchContacts = createAsyncThunk(`${domain}/contactus/view/api`, async () => {
    const response = await ContactUsService.getContacts();
    const formattedResponse = FomatUtils.formatContacts(response);
    return formattedResponse;
})

export const contactUsSlice = createSlice({
    name: "contactUs",
    initialState,
    reducers: {
        loadingContacts(state, action) {
            if (state.loading === 'idle') {
                state.loading = 'pending'
            }
        },
        contactsReceived(state, action) {
            if (state.loading === 'idle') {
                state.contacts = action.payload
            }
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchContacts.fulfilled, (state, action) => {
            state.contacts = action.payload;
        })
    }
});

export const {loadingContacts, contactsReceived } = contactUsSlice.actions

export const selectContacts = (state: RootState) => state.contactUs.contacts
export default contactUsSlice.reducer;