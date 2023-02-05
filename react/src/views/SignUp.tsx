import { Box, Button, TextField, Typography } from '@mui/material';
import Grid from '@mui/material/Grid';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import axiosClient from '../axios-client'
import { useStateContext } from '../context/ContextProvider';

interface formSubmitType {
    name:string
    email:string
    password:string,
    passswordConfirmation:string
}

export default function SignUp(){
    const 
        {setToken,setUser} = useStateContext(),
        [form, setForm] = useState<formSubmitType>({
            name:'',
            email:'',
            password:'',
            passswordConfirmation:''
        }),

        handleFormChange = (event:React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>{
            setForm({...form, [event.currentTarget.name]: event.currentTarget.value})
        },

        handleSubmit = (event:React.FormEvent<HTMLFormElement>) =>{
            event.preventDefault();
            const payload = {
                name: form.name,
                email: form.email,
                password: form.password,
                passsword_confirmation: form.passswordConfirmation
            }
            axiosClient.post('/signup',payload).then(({data})=>{
                console.log(data)
                setUser(data.user)
                setToken(data.token)
            }).catch( error =>{
                const response = error.response;
                if(response && response.status===422){
                    console.log(response.data.error)
                }
            })
        };

    return(
        <Grid 
        container 
        flexDirection={'column'} 
        justifyContent={'center'}
        alignItems={'center'}
    >
        <Box justifyContent={'center'}>
            <h1>Ceate Your Account</h1>
            <form onSubmit={e => handleSubmit(e)}>
                <Grid 
                    container
                    spacing={2}
                    flexDirection={'column'} 
                >
                    <Grid p={1}>
                        <TextField
                            fullWidth
                            name={'name'}
                            value={form.name}
                            placeholder={'Name'}
                            onChange={e=>handleFormChange(e)}
                        />
                    </Grid>
                    <Grid p={1}>
                        <TextField
                            fullWidth
                            name={'email'}
                            value={form.email}
                            placeholder={'Email'}
                            onChange={e=>handleFormChange(e)}
                            type={'email'}
                        />
                    </Grid>
                    <Grid p={1}>
                        <TextField
                            fullWidth
                            name={'password'}
                            value={form.password}
                            placeholder={'Password'}
                            onChange={e=>handleFormChange(e)}
                            type={'password'}
                        />
                    </Grid>
                    <Grid p={1}>
                        <TextField
                            fullWidth
                            name={'passwordConfirmation'}
                            value={form.passswordConfirmation}
                            placeholder={'Password Confirmation'}
                            onChange={e=>handleFormChange(e)}
                            type={'password'}
                        />
                    </Grid>
                    <Grid p={1}>
                        <Button
                            fullWidth
                            variant='contained'
                            type={'submit'}
                        >
                            SignUp
                        </Button>
                    </Grid>
                    <Grid p={1}>
                        <Typography>
                               You already have an account? <Link to={'/login'}>Login to yor account </Link>
                        </Typography>
                    </Grid>
                </Grid>
            </form>
        </Box>
    </Grid>
    )
}