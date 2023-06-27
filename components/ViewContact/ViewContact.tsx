interface Contact {
  firstName: string
  lastName: string
  email: string
  phone: string
  channel: string
}

interface ViewContactProps {
  contact: Contact
}

const ViewContact = ({ contact }: ViewContactProps) => {
  return (
    <div className="flex items-center justify-center">
      <div className="grid grid-cols-2 pl-8">
        <div>First Name:</div>
        <div>{contact.firstName}</div>
        <div>Last Name:</div>
        <div>{contact.lastName}</div>
        <div>Email:</div>
        <div>{contact.email}</div>
        <div>Phone:</div>
        <div>{contact.phone}</div>
        <div>Channel:</div>
        <div>{contact.channel}</div>
      </div>
    </div>
  )
}

export default ViewContact
