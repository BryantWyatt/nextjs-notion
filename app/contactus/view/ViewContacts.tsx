'use client';

import { useAppSelector, useAppDispatch } from "@/redux/hooks";
import { fetchContacts, selectContacts } from "@/redux/slices/contactUsSlice";
import { useEffect } from "react";


const ViewContacts = () => {
    const dispatch = useAppDispatch();
    const contacts = useAppSelector(selectContacts);

    useEffect(() => {
        const fetchData = () => {
            dispatch(fetchContacts());
        }
        fetchData();
    },[])

    return (
        <div className="flex justify-center">
            <div className="w-full max-w-xs">
                <h1 className="flex justify-center pt-8 pb-4 underline">View Contacts</h1>
                <div className="flex flex-col space-y-4 justify-center">
                {contacts.map((contact) => {
                    return (
                        <div key={`contact-${contact.firstName}`} className="bg-white rounded outline-none py-4 px-4">
                            <p className="text-black font-bold">{contact.firstName} {contact.lastName}</p>
                        </div>
                        )
                })}
                </div>
            </div>
        </div>)
}

export default ViewContacts;