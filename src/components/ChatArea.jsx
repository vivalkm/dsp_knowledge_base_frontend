import React from "react";
import ResponseCard from "./ResponseCard";
import { Container } from "@mui/material";

export default function ChatArea({ questions, responses, showDetail }) {
    const renderedChat = [];
    for (let i = 0; i < questions.length; i++) {
        renderedChat.push(
            <ResponseCard
                key={i}
                qId={i}
                question={questions[i]}
                response={responses[i]}
                showDetail={showDetail}
            />
        );
    }
    return <Container sx={{ marginTop: "10px" }}>{renderedChat}</Container>;
}
