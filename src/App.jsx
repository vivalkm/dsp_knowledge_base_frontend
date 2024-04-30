import { useState } from "react";
import Input from "./components/Input";
import ChatArea from "./components/ChatArea";
import { AppBar, Container, Grid, Toolbar, Typography } from "@mui/material";
import Source from "./components/Source";
import { response as res } from "./mockRes";
import "./App.css";
import SourceItem from "./components/SourceItem";
import CircularDeterminate from "./components/CircularDeterminate";
import getResponse from "./auth/GetResponse";

const MAX_Q_SHOWN = 10;

function App() {
    const [data, setData] = useState({
        questions: [], // [q1, q2, q3...]
        responses: [], // [[res1_1, res1_2], [res2_1, res2_2, res2_3], ...]
        references: [], // [[[ref1_1_1, ref1_1_2], [ref1_2_1]], [[ref2_1_1], [ref2_2_1], [ref2_3_1]], ...]
        showSourceID: -1,
    });
    const [isLoading, setIsLoading] = useState(false);

    const handleSearch = async (newQuestion) => {
        try {
            setIsLoading(true);
            const responseData = await getResponse(newQuestion);
            // const responseData = res.data;
            // console.log(responseData);
            const newRes = responseData.map((part) => {
                return part["generatedResponsePart"]["textResponsePart"]["text"];
            });
            const newRef = responseData.map((part, i) => {
                return part["retrievedReferences"].map((ref, j) => {
                    const id = `${i + 1}.${j + 1}`;
                    return <SourceItem key={id} source={ref} id={id} />;
                });
            });
            setData({
                questions: [newQuestion, ...data.questions.slice(0, MAX_Q_SHOWN - 1)],
                responses: [newRes, ...data.responses.slice(0, MAX_Q_SHOWN - 1)],
                references: [newRef, ...data.references.slice(0, MAX_Q_SHOWN - 1)],
                showSourceID: 0,
            });
        } catch (err) {
            console.log(err);
        } finally {
            setIsLoading(false);
        }
    };

    const showDetail = (i) => {
        setData({ ...data, showSourceID: i });
    };

    return (
        <>
            <AppBar
                position="sticky"
                sx={{
                    backgroundColor: "white",
                    boxShadow: "none",
                }}
            >
                <Toolbar
                    disableGutters
                    sx={{
                        width: "100%",
                        marginTop: "15px",
                    }}
                >
                    <Input handleSearch={handleSearch} isLoading={isLoading} />
                </Toolbar>
                {/* Conditionally render loading icon */}
                <Container sx={{ marginBottom: "30px", marginTop: "10px" }}>
                    {isLoading && (
                        <Typography
                            variant="body2"
                            className="loading"
                            sx={{
                                textAlign: "center",
                            }}
                        >
                            <CircularDeterminate />
                            <span> </span>
                            <span className="loading loading_text">
                                Retrieving and generating response...
                            </span>
                        </Typography>
                    )}
                </Container>
            </AppBar>
            <Grid
                container
                direction="row"
                justifyContent="center"
                alignItems="flex-start"
                marginX="auto"
                sx={{
                    maxWidth: "1800px",
                }}
            >
                <Grid item xs={12} sx={{ display: { xs: "flex", sm: "none" } }}>
                    <ChatArea
                        questions={data.questions.slice(0, 1)}
                        responses={data.responses.slice(0, 1)}
                        showDetail={showDetail}
                    />
                </Grid>
                <Grid item sm={6} md={5} lg={4} sx={{ display: { xs: "none", sm: "flex" } }}>
                    <ChatArea
                        questions={data.questions}
                        responses={data.responses}
                        showDetail={showDetail}
                    />
                </Grid>
                <Grid item xs={12} sm={6} md={7} lg={8}>
                    {data.showSourceID >= 0 && (
                        <Source
                            source={data.references[data.showSourceID]}
                            question={data.questions[data.showSourceID]}
                        />
                    )}
                </Grid>
            </Grid>
        </>
    );
}

export default App;
