const ContactUsService = {
    getContacts: async() => {
        const requestHeaders = getNotionHeaders();
        const res = await fetch('https://api.notion.com/v1/databases/888c6b8706cf4924be581aa7c2e7918b/query', {
            method: 'POST',
            credentials: 'include',
            headers: requestHeaders,
            cache: 'no-store'
        })
        if(!res.ok) throw Error('Failed to fetch data');
        return res.json();
    },
    getContactByFirstName: async(name: string) => {
        // TODO: Build interface to strictly type the body.
        const body = `{
            "filter": {
              "property": "first_name",
              "rich_text": {
                "contains": "${name}"
              }
            }
        }`;
        const requestHeaders = getNotionHeaders();
        const res = await fetch('https://api.notion.com/v1/databases/888c6b8706cf4924be581aa7c2e7918b/query', {
            method: 'POST',
            credentials: 'include',
            headers: requestHeaders,
            cache: 'no-store',
            body: body,
        });
        if(!res.ok) throw Error('Failed to fetch data');
        return res.json();
    }

}

const getNotionHeaders = () => {
    const requestHeaders: HeadersInit = new Headers();
    // Not a fan of this 'as' approach...
    const token: string = (process.env["NOTION_BEARER_TOKEN"] as string)
    const version: string = (process.env["NOTION_VERSION"] as string)

    requestHeaders.set('Content-Type', 'application/json');
    requestHeaders.set('Authorization', token);
    requestHeaders.set('Notion-Version', version);

    return requestHeaders;
}

export default ContactUsService;