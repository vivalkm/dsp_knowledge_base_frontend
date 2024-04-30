import { Container, TextField } from "@mui/material";
import React, { useState } from "react";

export default function Input({ handleSearch, isLoading }) {
    const [userInput, setUserInput] = useState("");
    const [isError, setIsError] = useState(false);

    const handleChange = (event) => {
        setIsError(false);
        setUserInput(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if (userInput.length >= 5) {
            event.preventDefault();
            handleSearch(userInput);
            setUserInput("");
        } else {
            setIsError(true);
        }
    };

    return (
        <Container sx={{ width: "100%" }}>
            <form onSubmit={handleSubmit}>
                <TextField
                    disabled={isLoading}
                    id="filled-basic"
                    label="Type your question here"
                    sx={{ width: "100%" }}
                    value={userInput}
                    onChange={handleChange}
                    error={isError}
                    helperText={isError ? "Question must contains at least 5 letters" : ""}
                />
                {/* <button onClick={handleSubmit}>Ask a question</button> */}
            </form>
        </Container>
    );
}
