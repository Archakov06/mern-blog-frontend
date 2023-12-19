import React from "react";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import {useForm} from 'react-hook-form';
import styles from "./Login.module.scss";
import {useDispatch, useSelector} from "react-redux";
import {getAuthData, selectIsAuth} from "../../redux/slices/auth";
import {Navigate} from 'react-router-dom';

export const Login = () => {

    const isAuth = useSelector(selectIsAuth);
    const dispatch = useDispatch();

    // REACT useForm HOOK:
    const {
        register,
        handleSubmit,
        setError,
        formState: {errors, isValid}
    } = useForm({
        defaultValues: {
            email:'viorel.harabaru@gmail.com',
            password:'standart1'
        },
        mode: 'all'
        //we might have to change this to onChange if the form bugs out
    });


    if (isAuth) {
        // if the user is authorized it will be redirected to Home;
        return <Navigate to={'/'} />
    }


    const onSubmit = async (values) => {
        const data = await dispatch(getAuthData(values));

        if (!data.payload) {
            return alert('LOGIN failed for some reason whatsoever');
        }

        if ('token' in data.payload) {
            window.localStorage.setItem('token', data.payload.token);
        }
    }

    return (
        <Paper classes={{root: styles.root}}>

            <Typography classes={{root: styles.title}} variant="h5">
                Login into your account
            </Typography>

            <form onSubmit={handleSubmit(onSubmit)}>
                <TextField
                    className={styles.field}
                    label="E-Mail"
                    type='email'
                    error={Boolean(errors.email?.message)}
                    helperText={errors.email?.message}
                    {...register('email', {required: 'Enter email!', })}
                    fullWidth
                />

                <TextField
                    className={styles.field}
                    label="password"
                    error={Boolean(errors.password?.message)}
                    helperText={errors.password?.message}
                    {...register('password', {required: 'Enter password!', })}
                    fullWidth/>


                <Button size="large"
                        variant="contained"
                        type='submit'
                        fullWidth>
                    Login
                </Button>
            </form>

        </Paper>
    );
};
