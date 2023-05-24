import ContactUsService from "./api/ContactUsService";
import ContactUs from "./ContactUs";

const Page = async () =>{
    const getData = async() => {
        // TODO: Update so that this field is driven by and input box
        return ContactUsService.getContactByFirstName("John");
    }

    const data = await getData();

    return <div className="flex flex-col items-center justify-center pt-5">
        <ContactUs data={data}/>
    </div>
}

export default Page;