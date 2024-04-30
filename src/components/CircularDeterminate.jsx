import * as React from "react";
import CircularProgress from "@mui/material/CircularProgress";

export default function CircularDeterminate() {
    const [progress, setProgress] = React.useState(0);

    React.useEffect(() => {
        const timer = setInterval(() => {
            setProgress((prevProgress) => (prevProgress >= 100 ? 0 : prevProgress + 10));
        }, 800);

        return () => {
            clearInterval(timer);
        };
    }, []);

    return <CircularProgress className="loading" variant="determinate" size={15} thickness={8} value={progress} />;
}
