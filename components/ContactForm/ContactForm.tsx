'use client'

// TODO: Component is far too large! Split data out into container component.
import { useEffect, useState } from 'react'
import { FieldValues, useForm } from 'react-hook-form'

import {
  useCreateContactMutation,
  useUpdateContactMutation,
} from '@/redux/slices/contactsSlice'
import Link from 'next/link'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import ContactFormFields from './ContactFormFields'
import { ContractFormMode, create, edit, primary, secondary } from './Types'

import { redirect } from 'next/navigation'
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner'
import Button from '../Button/Button'

interface ContactFormProps {
  id: string | null
  mode: ContractFormMode
  data: any
}

const ContactForm = ({ id = '', mode = null, data }: ContactFormProps) => {
  const [createContact, { isLoading: isCreating, isSuccess: contactCreated }] =
    useCreateContactMutation()
  const [updateContact, { isLoading: isUpdating, isSuccess: contactUpdated }] =
    useUpdateContactMutation()

  // Controls when fields are enabled or disabled
  const [inlineEdit, setInlineEdit] = useState(false)
  // Stores values for form
  const [formFieldValues, setFormFieldValues] = useState<FieldValues>()
  const form = useForm()
  const { handleSubmit, getValues, setValue } = form

  useEffect(() => {
    mode == create ? setInlineEdit(true) : setInlineEdit(false)
  }, [])

  useEffect(() => {
    setFormState(data)
  }, [data])

  useEffect(() => {
    if (contactCreated) {
      toast.success('Contact created successfully')
      redirect('/contacts')
    }

    if (contactUpdated) {
      toast.success('Contact updated successfully')
      redirect('/contacts')
    }
  }, [contactCreated, contactUpdated])

  /*
   * Form values are stored when...
   * The form initial loads
   * The user cancels their edits via the cancel edit button
   * A save action is performed
   */
  const setFormState = (data: any) => {
    for (let key in data) {
      let value: any = data[key]
      setValue(key, value)
      setFormFieldValues(getValues())
    }
  }

  const onSubmit = (formData: any) => {
    if (mode == create) {
      try {
        createContact(formData).unwrap()
      } catch (e) {
        console.log(e)
      }
    }

    if (mode == edit) {
      setInlineEdit(false)
      try {
        updateContact({ id, formData }).unwrap()
      } catch (e) {
        console.log(e)
      }
    }
    setFormFieldValues(getValues())
  }

  return (
    <div className="flex justify-center">
      <div className="w-full max-w-xs">
        <div className="flex flex-col justify-content items-center">
          {mode == edit && (
            <Button
              buttonHierarchy={inlineEdit ? primary : secondary}
              buttonText={mode == edit ? 'Edit Contact' : 'Cancel Edit'}
              onClick={() => {
                inlineEdit ? setInlineEdit(false) : setInlineEdit(true)
                setFormState(formFieldValues)
              }}
            />
          )}
        </div>
        {mode == 'create' && (
          <div>
            <h1 className="flex justify-center pt-2 font-bold text-3xl">
              Create Contact
            </h1>
            <Link
              className="
                flex justify-center pt-4 text-green-500 font-bold underline"
              href="/contacts"
            >
              Back to Contacts
            </Link>
          </div>
        )}
        <form
          className="shadow-md rounded px-8 pt-2 pb-8 mb-4"
          onSubmit={handleSubmit(onSubmit)}
        >
          <ContactFormFields form={form} inlineEdit={inlineEdit} />
          <div className="flex flex-col justify-center items-center pt-2">
            <input
              className={
                inlineEdit == false || isCreating || isUpdating
                  ? ` justify-content items-center bg-gray-500
                  text-white font-bold rounded py-2 px-4 w-40`
                  : ` justify-content items-center bg-green-500 hover:bg-green-700
                  text-white font-bold py-2 px-4 rounded w-40`
              }
              value={isUpdating ? 'Saving...' : 'Save Changes'}
              disabled={
                inlineEdit == false || isUpdating || isCreating ? true : false
              }
              type="submit"
            />
            {(isUpdating || isCreating) && <LoadingSpinner />}
          </div>
        </form>
      </div>
    </div>
  )
}

export default ContactForm
