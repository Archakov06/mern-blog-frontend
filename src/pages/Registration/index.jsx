import React from 'react';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import {useDispatch, useSelector} from "react-redux";
import styles from './Login.module.scss';
import { requestRegistration, selectIsAuth} from "../../redux/slices/auth";
import {useForm} from "react-hook-form";
import {Navigate} from "react-router-dom";

export const Registration = () => {

    const isAuth = useSelector(selectIsAuth);
    const dispatch = useDispatch();

    // REACT useForm HOOK:
    const {
        register,
        handleSubmit,
        formState: {errors, isValid}
    } = useForm({
        defaultValues: {
            fullName: '', email: '', password: ''
        },
        mode: 'all'
        //we might have to change this to onChange if the form bugs out
    });

    if (isAuth) {
        // FIXME[SUPER EASY]: this might be refactored as UTILITY; We use the same code in Login/index.jsx as well;
        // if the user is authorized it will be redirected to Home;
        return <Navigate to={'/'} />
    }



    const onSubmit = async (values) => {

        const data = await dispatch(requestRegistration(values));

        if (!data.payload) {
            return alert('Registration failed for some reason whatsoever');
        }

        if ('token' in data.payload) {
            window.localStorage.setItem('token', data.payload.token);
        }
    }

    return (
        <Paper classes={{root: styles.root}}>
            <Typography classes={{root: styles.title}} variant="h5">
                Create an account
            </Typography>
            <div className={styles.avatar}>
                <Avatar sx={{width: 100, height: 100}}/>
            </div>

            <form onSubmit={handleSubmit(onSubmit)}>
                <TextField
                    className={styles.field}
                    label="Full Name"
                    type='text'
                    error={Boolean(errors.fullName?.message)}
                    helperText={errors.fullName?.message}
                    {...register('fullName', {required: 'Enter your full name!'})}
                    fullWidth
                />

                <TextField
                    className={styles.field}
                    label="E-Mail"
                    type='email'
                    error={Boolean(errors.email?.message)}
                    helperText={errors.email?.message}
                    {...register('email', {required: 'Enter email!',})}
                    fullWidth
                />

                <TextField
                    className={styles.field}
                    label="password"
                    type='password'
                    error={Boolean(errors.password?.message)}
                    helperText={errors.password?.message}
                    {...register('password', {required: 'Enter password!',})}
                    fullWidth
                />

                <Button
                    disabled={!isValid} // ! conditionally enabling the button IF the form is filled with data.
                    size="large"
                    variant="contained"
                    type='submit'
                    fullWidth>

                    Register
                </Button>

            </form>
        </Paper>
    );
};
