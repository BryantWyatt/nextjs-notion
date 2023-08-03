'use client'

import { FieldValues, UseFormReturn } from 'react-hook-form'
import ContactFormData from './ContactForm.json'

const formData = JSON.parse(JSON.stringify(ContactFormData, null, 2))

interface ContactFormFieldsProps {
  form: UseFormReturn<FieldValues, any, undefined>
  inlineEdit: boolean
}

const ContactFormFields = ({ form, inlineEdit }: ContactFormFieldsProps) => {
  const {
    register,
    formState: { errors },
  } = form

  return (
    <div className="flex flex-col">
      <div className="flex flex-col pb-4 justify-content items-center"></div>
      {formData.fields.inputs.map((field: any) => {
        return (
          <div key={field.id}>
            <label className="py-2">{field.text}</label>
            <input
              className="mb-4 dark:text-slate-700 py-2 px-4 rounded"
              placeholder={field.placeholder}
              disabled={inlineEdit ? false : true}
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
          disabled={inlineEdit ? false : true}
          {...register('channel')}
        >
          {formData.fields.dropdowns.channel.map((field: any) => {
            return (
              <option key={field.value} value={field.text}>
                {field.text}
              </option>
            )
          })}
        </select>
      </label>
    </div>
  )
}

export default ContactFormFields
