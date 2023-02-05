import { Box, Divider, formControlClasses, Grid, TextField } from '@mui/material';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useState } from 'react';
import { Link } from 'react-router-dom';

interface formSubmitType {
    email:string
    password:string
}

export default function Login(){
    const 
        [form, setForm] = useState<formSubmitType>({
            email:'',
            password:''
        }),

        handleFormChange = (event:React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>{
            setForm({...form, [event.currentTarget.name]: event.currentTarget.value})
        },

        handleSubmit = (event:React.FormEvent<HTMLFormElement>) =>{
            event.preventDefault()
            console.log(form)
        };

    return(
        <Grid 
            container 
            flexDirection={'column'} 
            justifyContent={'center'}
            alignItems={'center'}
        >
            <Box>
                <h1>Login into Your Account</h1>
                <form onSubmit={e => handleSubmit(e)}>
                    <Grid 
                        container
                        spacing={2}
                        flexDirection={'column'} 
                    >
                        <Grid p={1}>
                            <TextField
                                fullWidth
                                name={'email'}
                                value={form.email}
                                placeholder={'Email'}
                                onChange={e=>handleFormChange(e)}
                            />
                        </Grid>
                        <Grid p={1}>
                            <TextField
                                fullWidth
                                name={'password'}
                                value={form.password}
                                placeholder={'Password'}
                                onChange={e=>handleFormChange(e)}
                            />
                        </Grid>
                        <Grid p={1}>
                        <Button
                            fullWidth
                            variant='contained'
                            type={'submit'}
                        >
                            Login
                        </Button>
                        </Grid>
                        <Grid p={1}>
                            <Typography>
                                    Not Registered? <Link to={'/signup'}>Create an account</Link>
                            </Typography>
                        </Grid>
                    </Grid>
                </form>
            </Box>
        </Grid>
    )
}