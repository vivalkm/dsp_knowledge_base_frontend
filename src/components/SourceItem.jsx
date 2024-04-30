import { Link } from "@mui/material";
import React from "react";

export default function SourceItem({ source, id }) {
    const sourceLink = source?.location?.s3Location?.uri;
    const S3LinkBase = "https://us-east-1.console.aws.amazon.com/s3/object/";
    return (
        <div>
            <div>
                <b>{`Source ${id}:`}</b>
            </div>
            <div>
                <Link
                    href={sourceLink.replace("s3://", S3LinkBase)}
                    target="_blank"
                    color="primary"
                >
                    {sourceLink}
                </Link>
            </div>
            <div>{source?.content?.text}</div>
            <br></br>
        </div>
    );
}
