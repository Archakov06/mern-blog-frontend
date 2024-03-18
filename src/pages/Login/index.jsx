import React from "react";
import {useDispatch} from 'react-redux';
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import {useForm} from 'react-hook-form';

import styles from "./Login.module.scss";
import {fetchAuth} from "../../redux/slices/auth";

export const Login = () => {
    /*
    Нужно вытащить Диспатч
     */
    const dispatch = useDispatch();

    /*
    Теперь нужно вытащить специальный объект со свойствами\функциями
    который вернет нам хук.
    Функция register позволит зарегистрировать два поля ниже, которые теперь увидит РеактХукФорм
     */
    const {
        register, handleSubmit, setError,
        formState: {errors, isValid}
    } = useForm({
        /*
        Изначально все параметры формы - эмейл и пароль будут пустыми
         */
        defaultValues: {
            email: 'test3@test.ru',
            password: '1234567',
        },
        mode: 'onChange',
    });

    /*
    Эта функция будет выполнятся только в том случае, если РеактХукФорм
    понял, что валидация прошла корректно
     */
    const onSubmit = (values) => {
        /*
        Dispatch must to do fetch
        for object with email and password
         */
        dispatch(fetchAuth(values));
    };

    console.log(errors, isValid);

    return (
        <Paper classes={{root: styles.root}}>
            <Typography classes={{root: styles.title}} variant="h5">
                Вход в аккаунт
            </Typography>
            <form onSubmit={handleSubmit(onSubmit)}>
                <TextField
                    className={styles.field}
                    label="E-Mail"
                    error={Boolean(errors.email?.message)}
                    helperText={errors.email?.message}
                    {...register('email', {required: 'Укажите почту'})}
                    fullWidth
                />
                <TextField className={styles.field}
                           label="Пароль"
                           error={Boolean(errors.password?.message)}
                           helperText={errors.password?.message}
                           {...register('password', {required: 'Введите пароль'})}
                           fullWidth/>
                <Button type="submit" size="large" variant="contained" fullWidth>
                    Войти
                </Button>
            </form>
        </Paper>
    );
};
