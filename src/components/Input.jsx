import { Container, InputBase, Paper, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import SearchIcon from "@mui/icons-material/Search";

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
        <Container sx={{ width: "100%", position: "relative" }}>
            <Paper
                component="form"
                sx={{ p: "2px 4px", display: "flex", alignItems: "center" }}
                onSubmit={handleSubmit}
            >
                <SearchIcon sx={{ color: "action.active", mr: 1 }} onClick={handleSubmit} />
                <InputBase
                    disabled={isLoading}
                    autoComplete="off"
                    id="filled-basic"
                    placeholder="Type your question here"
                    sx={{ width: "100%" }}
                    value={userInput}
                    onChange={handleChange}
                />
            </Paper>
            {isError && (
                <Typography
                    variant="caption"
                    color="error"
                    sx={{ position: "absolute", bottom: "-20px" }}
                >
                    Question must be at least 5 characters long.
                </Typography>
            )}
        </Container>
    );
}
