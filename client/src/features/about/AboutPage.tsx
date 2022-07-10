import { Alert, AlertTitle, Button, ButtonGroup, Container, List, ListItem, Typography } from "@mui/material";
import { useState } from "react";
import agent from "../../app/api/agent";

export default function AboutPage() {
    const [validationError, setValidationError] = useState<string[]>([]);

    function getValidationError() {
        agent.TestErrors.getValidationError()
            .then(() => console.log('should not see'))
            .catch(error => setValidationError(error));
    }
    return (
        <Container>
            <Typography variant="h2" gutterBottom>Errors for testing purposes</Typography>
            <ButtonGroup fullWidth>
                <Button variant="contained" onClick={() => agent.TestErrors.get400Error().catch(error => console.log(error))}>Test 400 error</Button>
                <Button variant="contained" onClick={() => agent.TestErrors.get401Error().catch(error => console.log(error))}>Test 401 error</Button>
                <Button variant="contained" onClick={() => agent.TestErrors.get404Error().catch(error => console.log(error))}>Test 404 error</Button>
                <Button variant="contained" onClick={() => agent.TestErrors.get500Error().catch(error => console.log(error))}>Test 500 error</Button>
                <Button variant="contained" onClick={getValidationError}>Test validation error</Button>
            </ButtonGroup>
            {
                validationError.length > 0 &&
                <Alert severity="error">
                    <AlertTitle>Validation error</AlertTitle>
                    <List>
                        {
                            validationError.map((error) => (
                                <ListItem key={error}>{error}</ListItem>
                            ))
                        }
                    </List>
                </Alert>
            }
        </Container>
    )
}