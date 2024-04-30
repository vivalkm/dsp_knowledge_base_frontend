import { Card, CardContent, Container, Typography } from "@mui/material";

import React from "react";

export default function Source({ source, question }) {
    const renderedSource = source?.map((src, i) => {
        return (
            <Typography
                key={i}
                variant="body2"
                component="div"
                color="text.secondary"
                sx={{ marginBottom: "20px" }}
            >
                {src}
            </Typography>
        );
    });
    return source.length > 0 ? (
        <Container sx={{ marginTop: "10px" }}>
            <Card sx={{ borderRadius: "10px" }}>
                <CardContent>
                    <Typography key={-1} variant="h5" component="div" gutterBottom>
                        Source chuncks for question "{question}"
                    </Typography>
                    {renderedSource}
                </CardContent>
            </Card>
        </Container>
    ) : (
        <></>
    );
}
