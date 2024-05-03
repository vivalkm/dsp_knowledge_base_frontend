import axios from "axios";
import getSignedHeaders from "./GetSignedHeaders";

export default async function getResponse(question) {
    const credentials = {
        accessKeyId: import.meta.env.VITE_IAM_ACCESSKEY,
        secretAccessKey: import.meta.env.VITE_IAM_SECRETKEY,
    };

    const region = "us-east-1";
    const apiUrl = {
        hostname: import.meta.env.VITE_BACKEND_HOSTNAME,
        url: import.meta.env.VITE_BACKEND_URL,
        path: import.meta.env.VITE_BACKEND_APIPATH,
    };

    
    const headers = getSignedHeaders(
        credentials,
        region,
        apiUrl.hostname,
        apiUrl.path,
        `prompt=${encodeURIComponent(question)}`
    );

    try {
        const res = await axios.get(apiUrl.url, {
            params: {
                prompt: question,
            },
            headers: headers,
        });
        // console.log(res);
        return res.data;
    } catch (err) {
        console.log(err);
    }
}

// use my header generater deployed on vercel
// export default async function getResponse(question) {
//     const headerAPI = import.meta.env.VITE_HEADER_API;
// const apiUrl = {
//     hostname: import.meta.env.VITE_BACKEND_HOSTNAME,
//     url: import.meta.env.VITE_BACKEND_URL,
//     path: import.meta.env.VITE_BACKEND_APIPATH,
// };

//     const headers = await axios.get(`${headerAPI}${encodeURIComponent(question)}`);

//     try {
//         const res = await axios.get(apiUrl.url, {
//             params: {
//                 prompt: question,
//             },
//             headers: headers.data,
//         });
//         return res.data;
//     } catch (err) {
//         console.log(err);
//     }
// }
