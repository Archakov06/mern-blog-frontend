import React, { useRef, useState } from 'react'
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'
import Paper from '@mui/material/Paper'
import Button from '@mui/material/Button'
import Avatar from '@mui/material/Avatar'

import styles from './Login.module.scss'
import { useDispatch, useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { fetchRegister, selectIsAuth } from '../../redux/slices/auth'
import axios from '../../axios'

export const Registration = () => {
	const isAuth = useSelector(selectIsAuth)
	const dispatch = useDispatch()
	const [imageUrl, setImageUrl] = useState('')
	const inputFileRef = useRef()

	const {
		register,
		handleSubmit,
		setValue,
		formState: { isValid, errors },
	} = useForm({
		defaultValues: {
			fullName: 'Гусляков Глеб',
			email: 'gleb@gmail.com',
			password: '12345',
			avatarUrl: '',
		},
		mode: 'onChange',
	})

	const onSubmit = async values => {
		const data = await dispatch(fetchRegister(values))

		if (!data.payload) {
			alert('Не удалось зарегистрироваться')
		}

		if ('token' in data.payload) {
			window.localStorage.setItem('token', data.payload.token)
		}
	}

	const handleChangeFile = async event => {
		try {
			const formData = new FormData()
			formData.append('image', event.target.files[0])
			const { data } = await axios.post('/upload', formData)
			setImageUrl(data.url)
			setValue('avatarUrl', `http://localhost:4444${data.url}`)
		} catch (err) {
			console.log(err)
			alert('Не удалось загрузить изображение')
		}
	}

	const onClickRemoveImage = () => {
		setImageUrl('')
		setValue('avatarUrl', '')
	}

	if (isAuth) {
		return <Navigate to='/' />
	}

	return (
		<Paper classes={{ root: styles.root }}>
			<Typography classes={{ root: styles.title }} variant='h5'>
				Создание аккаунта
			</Typography>
			<form onSubmit={handleSubmit(onSubmit)}>
				<div className={styles.avatar}>
					<Button
						onClick={() => inputFileRef.current.click()}
						variant='outlined'
						style={{ marginRight: '20px' }}
						size='large'
					>
						Загрузить аватар
					</Button>
					<input
						ref={inputFileRef}
						type='file'
						onChange={handleChangeFile}
						hidden
					/>
					<div>
						{imageUrl && (
							<>
								<Button
									variant='contained'
									color='error'
									onClick={onClickRemoveImage}
								>
									Удалить
								</Button>
							</>
						)}
					</div>
				</div>
				{imageUrl && (
					<img
						className={styles.image}
						src={`http://localhost:4444${imageUrl}`}
						alt='Uploaded'
					/>
				)}
				<TextField
					error={Boolean(errors.fullName?.message)}
					helperText={errors.fullName?.message}
					type='text'
					{...register('fullName', { required: 'Укажите полное имя' })}
					className={styles.field}
					label='Полное имя'
					fullWidth
				/>
				<TextField
					error={Boolean(errors.email?.message)}
					helperText={errors.email?.message}
					type='email'
					{...register('email', { required: 'Укажите почту' })}
					className={styles.field}
					label='E-Mail'
					fullWidth
				/>
				<TextField
					error={Boolean(errors.password?.message)}
					helperText={errors.password?.message}
					type='password'
					{...register('password', { required: 'Укажите пароль' })}
					className={styles.field}
					label='Пароль'
					fullWidth
				/>
				<Button
					disabled={!isValid}
					type='submit'
					size='large'
					variant='contained'
					fullWidth
				>
					Зарегистрироваться
				</Button>
			</form>
		</Paper>
	)
}
