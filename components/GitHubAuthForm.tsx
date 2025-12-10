/*
Entire GitHub auth file done by Isaac
Minor styling changes by Rohan
*/
'use client';

import { Box, Paper, Typography, Button } from "@mui/material";
import githubLoginAction from "@/lib/githubLoginAction";
import GitHubIcon from "@/public/github-icon.png"

export default function GitHubAuthForm() {
    return (
        <Box sx={{ width: "100vw", height: "80vh", display: "flex", justifyContent: "center", alignItems: "center" }}>
            <Paper elevation={3} sx={{ width: "30%", minWidth: "350px", height: "35%", display: "flex", flexDirection: "column", gap: "20%", backgroundColor: "#5ea7f6ff", borderRadius:"16px"}}>
                <Typography variant="h5" component="h3" sx={{ width: "100%", textAlign: "center", paddingTop: "5%", color: "#ffffffff", fontFamily: "'Quicksand', sans-serif"}}>
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
                                width: "30%", 
                                textTransform: "none", 
                                borderColor: "#ffffffff", 
                                color: "white",
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
                            GitHub
                        </Button>
                    </Box>
                </form>
            </Paper>
        </Box>
    );
}
