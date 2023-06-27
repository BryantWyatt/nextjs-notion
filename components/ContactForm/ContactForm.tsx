'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'

import ContactFormData from './ContactForm.json'
import ContactsService from '@/services/ContactsService'

const formData = JSON.parse(JSON.stringify(ContactFormData, null, 2))

const ContactForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()
  const [form, setFormData] = useState(formData)
  const [contact, setContact] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(false)

  const onSubmit = (data: any) => {
    const fetchData = async () => {
      setIsLoading(true)
      ContactsService.createContact(data).then((res) => {
        setContact(res)
      })
      setIsLoading(false)
    }

    fetchData()
  }

  return (
    <div className="flex justify-center">
      <div className="w-full max-w-xs">
        <h1 className="flex justify-center pt-8">Create Contact</h1>
        <form
          className="shadow-md rounded px-8 pt-6 pb-8 mb-4"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="flex flex-col">
            {form.fields.inputs.map((field: any) => {
              return (
                <div key={field.id}>
                  <label className="py-2">{field.text}</label>
                  <input
                    className="mb-4 dark:text-slate-700 py-2 px-4 rounded"
                    placeholder={field.placeholder}
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
            <input
              className="

                bg-green-500
                hover:bg-green-700
                text-white
                font-bold
                py-2
                px-4
                rounded
                w-1/3
              "
              value="Save"
              type="submit"
            />
          </div>
        </form>
      </div>
    </div>
  )
}

export default ContactForm
