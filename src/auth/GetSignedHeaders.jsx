import crypto from "crypto-js";
import moment from "moment";

export default function getSignedHeaders(credentials, region, host, path, queryStr, axiosConfig = null) {
    // Task 1: Create a canonical request for Signature Version 4
    // Arrange the contents of your request (host, action, headers, etc.) into a standard (canonical) format. The canonical request is one of the inputs used to create a string to sign.
    const t = moment().utc();
    const { accessKeyId, secretAccessKey } = credentials;

    const amzDate = t.format("YYYYMMDDTHHmmss") + "Z";
    const httpRequestMethod = axiosConfig?.method ? axiosConfig.method.toUpperCase() : "GET";
    const canonicalURI = path;
    const canonicalQueryString = queryStr;
    const canonicalHeaders = "host:" + host + "\n" + "x-amz-date:" + amzDate + "\n";
    const signedHeaders = "host;x-amz-date";
    const payload = axiosConfig?.data ? JSON.stringify(axiosConfig?.data) : "";
    const hashedPayload = createHash(payload);

    const canonicalRequest =
        httpRequestMethod +
        "\n" +
        canonicalURI +
        "\n" +
        canonicalQueryString +
        "\n" +
        canonicalHeaders +
        "\n" +
        signedHeaders +
        "\n" +
        hashedPayload;

    // console.log("canonicalRequest: ", canonicalRequest);

    const hashedCanonicalRequest = createHash(canonicalRequest);

    //   if you used SHA256, you will specify AWS4-HMAC-SHA256 as the signing algorithm

    // Task 2: Create a string to sign for Signature Version 4
    // Create a string to sign with the canonical request and extra information such as the algorithm, request date, credential scope, and the digest (hash) of the canonical request.
    const algorithm = "AWS4-HMAC-SHA256";
    const requestDateTime = amzDate;
    const dateStamp = t.format("YYYYMMDD"); // Date w/o time, used in credential scope
    const service = "execute-api";
    const credentialScope = dateStamp + "/" + region + "/" + service + "/" + "aws4_request";

    const stringToSign =
        algorithm + "\n" + requestDateTime + "\n" + credentialScope + "\n" + hashedCanonicalRequest;

    // console.log("stringToSign: ", stringToSign);

    // Task 3: Calculate the signature for AWS Signature Version 4
    // Derive a signing key by performing a succession of keyed hash operations (HMAC operations) on the request date, Region, and service, with your AWS secret access key as the key for the initial hashing operation. After you derive the signing key, you then calculate the signature by performing a keyed hash operation on the string to sign. Use the derived signing key as the hash key for this operation.

    var kDate = crypto.HmacSHA256(dateStamp, "AWS4" + secretAccessKey);
    var kRegion = crypto.HmacSHA256(region, kDate);
    var kService = crypto.HmacSHA256(service, kRegion);
    var kSigning = crypto.HmacSHA256("aws4_request", kService);
    // console.log("kSigning: ", crypto.enc.Hex.stringify(kSigning));

    const signature = crypto.enc.Hex.stringify(crypto.HmacSHA256(stringToSign, kSigning));

    // Task 4: Add the signature to the HTTP request
    // After you calculate the signature, add it to an HTTP header or to the query string of the request.
    const authorizationHeader =
        algorithm +
        " Credential=" +
        accessKeyId +
        "/" +
        credentialScope +
        ", SignedHeaders=" +
        signedHeaders +
        ", Signature=" +
        signature;

    const headers = {
        "X-Amz-Date": amzDate,
        Authorization: authorizationHeader,
    };

    return headers;
}

function createHash(input) {
    return crypto.enc.Hex.stringify(crypto.SHA256(input));
}