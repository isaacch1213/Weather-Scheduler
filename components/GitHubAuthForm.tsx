'use client';

import { Box, Paper, Typography, Button } from "@mui/material";
import githubLoginAction from "@/lib/githubLoginAction";
import GitHubIcon from "@/public/github-icon.png"

export default function GitHubAuthForm() {
    return (
        <Box sx={{ width: "100vw", height: "90vh", display: "flex", justifyContent: "center", alignItems: "center" }}>
            <Paper elevation={3} sx={{ width: "45%", minWidth: "350px", height: "35%", display: "flex", flexDirection: "column", gap: "20%", backgroundColor: "#f2f2f2" }}>
                <Typography variant="h4" component="h3" sx={{ width: "100%", textAlign: "center", paddingTop: "5%", color: "#1b2a49"}}>
                    Sign In With
                </Typography>

                <form action={githubLoginAction}>
                    <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                        
                        <Button 
                            type="submit" 
                            variant="outlined" 
                            sx={{
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                gap: "2%",
                                width: "60%", 
                                textTransform: "none", 
                                borderColor: "#1b2a49", 
                                color: "#1b2a49",
                                "&:hover": {
                                    backgroundColor: "rgba(0,0,0,0.04)",
                                    borderColor: "#1b2a49",
                                }
                            }}
                        >
                            <Box
                                component="img"
                                src={GitHubIcon.src}
                                alt="GitHub Icon"
                                sx={{ width: 22, height: 22 }}
                            />
                            Sign in with GitHub
                        </Button>
                    </Box>
                </form>
            </Paper>
        </Box>
    );
}
