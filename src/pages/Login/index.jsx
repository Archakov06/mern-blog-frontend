import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import axios from '../../axios';
import { useForm } from 'react-hook-form';

import styles from './Login.module.scss';
import { setUserData } from '../../redux/slices/auth';

export const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    setError,
    watch,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: {
      email: 'aa@aa.aa',
      password: '123456',
    },
    mode: 'onChange',
  });

  const onSubmit = async (fields) => {
    try {
      const { data } = await axios.post('/auth/login', fields);
      dispatch(setUserData(data));
      window.localStorage.setItem('token', data.token);
      navigate('/');
    } catch (error) {
      console.log(error);
      if (error.isAxiosError) {
        if (error.response.data.errors) {
          error.response.data.errors.forEach((obj) => {
            setError(obj.param, { message: obj.msg }, { shouldFocus: true });
          });
        }
        if (error.response.data.message) {
          setError('email', { message: error.response.data.message }, { shouldFocus: true });
        }
      }
    }
  };

  return (
    <Paper classes={{ root: styles.root }}>
      <Typography classes={{ root: styles.title }} variant="h5">
        Вход в аккаунт
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          className={styles.field}
          label="E-Mail"
          error={!!errors.email}
          helperText={errors.email?.message}
          {...register('email', { required: 'Укажите почту' })}
          fullWidth
        />
        <TextField
          className={styles.field}
          label="Пароль"
          error={!!errors.password}
          helperText={errors.password?.message}
          {...register('password', { required: 'Укажите пароль' })}
          fullWidth
        />
        <Button disabled={!isValid} type="submit" size="large" variant="contained" fullWidth>
          Войти
        </Button>
      </form>
    </Paper>
  );
};
