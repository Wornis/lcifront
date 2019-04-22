export default function processResponse(response) {
    return response.json()
        .then(body => {
            if (response.status >= 400)
                throw body;
            return body;
        });
}
