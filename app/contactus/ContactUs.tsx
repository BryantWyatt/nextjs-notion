'use client';

interface ContactUsProps {
    data: any;
}

const ContactUs = ({data}: ContactUsProps) => {
    // TODO: Create interfaces to clean this up.
    const {
        firstName = data.results[0].properties.first_name.title[0].plain_text,
        lastName = data.results[0].properties.last_name.rich_text[0].plain_text,
        email = data.results[0].properties.email.email,
        phone = data.results[0].properties.phone.phone_number,
        reason = data.results[0].properties.reason.select.name
     } = data;
    return <div>
        <h1 className="pb-5">Contacts</h1>
        <p className="text-lg">First Name</p>
        <p className="pb-2 indent-1">{firstName}</p>
        <p className="text-lg">Last Name</p>
        <p className="pb-2 indent-1">{lastName}</p>
        <p className="text-lg">Email</p>
        <p className="pb-2 indent-1">{email}</p>
        <p className="text-lg">Phone</p>
        <p className="pb-2 indent-1">{phone}</p>
        <p className="text-lg">Reason</p>
        <p className="pb-2 indent-1">{reason}</p>
    </div>
}

export default ContactUs;