import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

function addFootnotesToStrings(strings) {
    return strings.map((string, index) => (
        <span key={index}>
            {string}
            <sup>[{index + 1}]</sup>
            <> </>
        </span>
    ));
}

export default function ResponseCard({ question, response, qId, showDetail }) {
    const handleDetail = () => {
        showDetail(qId);
    };

    return (
        <Card
            className="card"
            sx={{ marginBottom: "20px", borderRadius: "10px" }}
            onClick={handleDetail}
        >
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                    {question[0].toUpperCase() + question.slice(1)}
                </Typography>
                <Typography variant="body2" component="div" color="text.secondary">
                    {addFootnotesToStrings(response)}
                </Typography>
            </CardContent>
            <CardActions>
                <Button
                    size="small"
                    onClick={async () => {
                        await navigator.clipboard.writeText(answer);
                    }}
                >
                    Copy
                </Button>
                <Button size="small" onClick={handleDetail}>
                    Detail
                </Button>
            </CardActions>
        </Card>
    );
}
