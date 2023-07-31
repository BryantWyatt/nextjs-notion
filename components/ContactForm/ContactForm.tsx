'use client'

// TODO: Component is far too large! Split data out into container component.

import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { skipToken } from '@reduxjs/toolkit/query'

import ContactFormData from './ContactForm.json'
import {
  useCreateContactMutation,
  useGetContactQuery,
  useUpdateContactMutation,
} from '@/redux/slices/contactsSlice'
import Link from 'next/link'
import { ContractFormMode, create, edit, readOnly } from './Types'

const formData = JSON.parse(JSON.stringify(ContactFormData, null, 2))

interface ContactFormProps {
  id: string | null
  mode: ContractFormMode
}

const ContactForm = ({ id = '', mode = null }: ContactFormProps) => {
  const { data, isLoading, error } = useGetContactQuery(id ? id : skipToken)
  const [createContact, { isLoading: isCreating, isSuccess: contactCreated }] =
    useCreateContactMutation()
  const [updateContact, { isLoading: isUpdating, isSuccess: contactUpdated }] =
    useUpdateContactMutation()
  const [formMode, setFormMode] = useState<ContractFormMode>(mode)
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm()
  const form = formData

  useEffect(() => {
    setInitialFormState()
  }, [data])

  const setInitialFormState = () => {
    for (let key in data) {
      let value: any = data[key]
      setValue(key, value)
    }
  }

  if (error) {
    if ('status' in error) {
      // you can access all properties of `FetchBaseQueryError` here
      const errMsg = 'error' in error ? error.error : JSON.stringify(error.data)

      return (
        <div>
          <div>An error has occurred:</div>
          <div>{errMsg}</div>
        </div>
      )
    } else {
      // you can access all properties of `SerializedError` here
      return <div>{error.message}</div>
    }
  }

  const onSubmit = async (formData: any) => {
    if (formMode == create) {
      try {
        await createContact(formData).unwrap()
      } catch (e) {
        console.log(e)
      }
    }

    if (formMode == edit) {
      try {
        await updateContact({ id, formData })
          .unwrap()
          .then(() => {
            setFormMode(readOnly)
          })
      } catch (e) {
        console.log(e)
      }
    }
  }

  return (
    <div className="flex justify-center">
      <div className="w-full max-w-xs">
        <div className="flex flex-col justify-content items-center">
          {formMode != create && (
            <button
              className={
                formMode == readOnly
                  ? `
              items-center
              bg-green-500
              hover:bg-green-700
              text-white
              font-bold
              py-2
              px-4
              rounded`
                  : `justify-content
              items-center
              bg-gray-500
              hover:bg-gray-700
              text-white
              font-bold
              rounded
              py-2
              px-4
              w-1/2`
              }
              onClick={(e) => {
                e.preventDefault()
                formMode == readOnly ? setFormMode(edit) : setFormMode(readOnly)
                setInitialFormState()
              }}
            >
              {formMode == readOnly ? 'Edit Contact' : 'Cancel Edit'}
            </button>
          )}
        </div>
        {mode == 'create' && (
          <div>
            <h1 className="flex justify-center pt-2 font-bold text-3xl">
              Create Contact
            </h1>
            <Link
              className="flex
                justify-center
                pt-4
                text-green-500
                font-bold
                underline
              "
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
          <div className="flex flex-col">
            <div className="flex flex-col pb-4 justify-content items-center"></div>
            {isLoading ? (
              <div className="flex justify-center">Loading</div>
            ) : error ? (
              <div className="flex justify-center">{error}</div>
            ) : (
              <>
                {form.fields.inputs.map((field: any) => {
                  return (
                    <div key={field.id}>
                      <label className="py-2">{field.text}</label>
                      <input
                        className="mb-4 dark:text-slate-700 py-2 px-4 rounded"
                        placeholder={field.placeholder}
                        disabled={formMode == readOnly ? true : false}
                        {...register(field.registerName, { required: true })}
                      />
                      {errors?.[`${field.registerName}`] && (
                        <p className="text-red-700">{field.text} is required</p>
                      )}
                    </div>
                  )
                })}
                <label className="flex flex-col">
                  {' '}
                  Channel
                  <select
                    id="channel"
                    className="
                mb-4
                rounded
                dark:text-slate-700
                p-2
                w-1/2
              "
                    disabled={formMode == readOnly ? true : false}
                    {...register('channel')}
                  >
                    {form.fields.dropdowns.channel.map((field: any) => {
                      return (
                        <option key={field.value} value={field.text}>
                          {field.text}
                        </option>
                      )
                    })}
                  </select>
                </label>
              </>
            )}
          </div>
          <div className="flex flex-col justify-center items-center pt-2">
            <input
              className={
                formMode != readOnly
                  ? `
                items-center
                bg-green-500
                hover:bg-green-700
                text-white
                font-bold
                py-2
                px-4
                rounded`
                  : `justify-content
                items-center
                bg-gray-500
                text-white
                font-bold
                rounded
                py-2
                px-4`
              }
              value={'Save Changes'}
              disabled={formMode == readOnly ? true : false}
              type="submit"
            />
          </div>
        </form>
        {contactCreated && (
          <h1 className="flex justify-center">Contact Created!</h1>
        )}
        {contactUpdated && (
          <h1 className="flex justify-center pb-4">Contact Updated!</h1>
        )}
      </div>
    </div>
  )
}

export default ContactForm
