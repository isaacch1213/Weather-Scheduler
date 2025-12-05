'use client';

import { Box, Paper, Typography, Button } from "@mui/material";
import githubLoginAction from "@/lib/githubAction";

export default function GitHubAuthForm() {
    return (
        <Box sx={{ width: "100vw", height: "90vh", display: "flex", justifyContent: "center", alignItems: "center" }}>
            <Paper elevation={3} sx={{ width: "35%", height: "60%", display: "flex", flexDirection: "column", gap: "30%"}}>
                <Typography variant="h4" component="h3" sx={{ width: "100%", textAlign: "center", paddingTop: "2%"}}>
                    Sign In With
                </Typography>

                <form action={githubLoginAction}>
                    <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                        <Button type="submit" variant="contained" sx={{ width: "60%" }}>
                            Sign in with GitHub
                        </Button>
                    </Box>
                </form>
            </Paper>
        </Box>
    );
}
