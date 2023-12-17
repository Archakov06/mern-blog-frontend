import React from "react";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import {useForm} from 'react-hook-form';
import styles from "./Login.module.scss";

export const Login = () => {

    // REACT useForm HOOK:
    const {register,
        handleSubmit,
        setError,
        formState: {errors, isValid} } = useForm({
        defaultValues: {
            email:'',
            password:''
        },

        mode: 'onChange'

    });

    const onSubmit = (values) => {
        console.log(values);
    }

    return (
        <Paper classes={{root: styles.root}}>

            <Typography classes={{root: styles.title}} variant="h5">
                Login into your account
            </Typography>

            <form action="" onSubmit={handleSubmit(onSubmit)}>
                <TextField
                    className={styles.field}
                    label="E-Mail"
                    error
                    helperText={'errors'}
                    fullWidth
                    {...register('email', {required: 'Enter email!', })}
                />
                <TextField
                    className={styles.field}
                    label="password"
                    {...register('password', {required: 'Enter password!', })}
                    fullWidth/>


                <Button size="large" variant="contained" fullWidth> Login </Button>
            </form>

        </Paper>
    );
};
