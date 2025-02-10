import React, { useEffect } from 'react'
import TextField from '@mui/material/TextField'
import Paper from '@mui/material/Paper'
import Button from '@mui/material/Button'
import SimpleMDE from 'react-simplemde-editor'

import 'easymde/dist/easymde.min.css'
import styles from './AddPost.module.scss'
import { useSelector } from 'react-redux'
import { selectIsAuth } from '../../redux/slices/auth'
import { Navigate, useNavigate, useParams } from 'react-router-dom'
import axios from '../../axios.js'

export const AddPost = () => {
	const { id } = useParams()
	const isEditing = Boolean(id)
	const navigate = useNavigate()
	const isAuth = useSelector(selectIsAuth)
	const [text, setText] = React.useState('')
	const [title, setTitle] = React.useState('')
	const [tags, setTags] = React.useState('')
	const [imageUrl, setImageUrl] = React.useState('')
	const [isLoading, setIsLoading] = React.useState(false)
	const inputFileRef = React.useRef()

	const handleChangeFile = async event => {
		try {
			const formData = new FormData()
			const file = event.target.files[0]
			formData.append('image', file)
			const { data } = await axios.post('/upload', formData)
			setImageUrl(data.url)
		} catch (err) {
			console.warn(err)
			alert('Не удалось загрузить изображение')
		}
	}

	const onClickRemoveImage = () => {
		setImageUrl('')
	}

	const onSubmit = async () => {
		try {
			setIsLoading(true)

			const fields = {
				title,
				tags,
				text,
				imageUrl,
			}
			const { data } = isEditing
				? await axios.patch(`/posts/${id}`, fields)
				: await axios.post('/posts', fields)
			const postId = isEditing ? id : data._id

			navigate(`/posts/${postId}`)
		} catch (err) {
			console.warn(err)
			alert('Ошибка при создании статьи')
		}
	}

	const onChange = React.useCallback(value => {
		setText(value)
	}, [])

	React.useEffect(() => {
		if (id) {
			axios
				.get(`posts/${id}`)
				.then(res => {
					setTitle(res.data.title)
					setText(res.data.text)
					setTags(res.data.tags.join(','))
					setImageUrl(res.data.imageUrl)
				})
				.catch(err => {
					console.log(err)
					alert('Ошибка при получении статьи')
				})
		}
	}, [])

	const options = React.useMemo(
		() => ({
			spellChecker: false,
			maxHeight: '400px',
			autofocus: true,
			placeholder: 'Введите текст...',
			status: false,
			autosave: {
				enabled: true,
				delay: 1000,
			},
		}),
		[]
	)

	if (!window.localStorage.getItem('token') && !isAuth) {
		return <Navigate to='/' />
	}

	return (
		<Paper style={{ padding: 30 }}>
			<Button
				onClick={() => inputFileRef.current.click()}
				variant='outlined'
				style={{ marginRight: '20px' }}
				size='large'
			>
				Загрузить превью
			</Button>
			<input
				ref={inputFileRef}
				type='file'
				onChange={handleChangeFile}
				hidden
			/>
			{imageUrl && (
				<>
					<Button
						variant='contained'
						color='error'
						onClick={onClickRemoveImage}
					>
						Удалить
					</Button>
					<img
						className={styles.image}
						src={`http://localhost:4444${imageUrl}`}
						alt='Uploaded'
					/>
				</>
			)}
			<br />
			<br />
			<TextField
				classes={{ root: styles.title }}
				variant='standard'
				placeholder='Заголовок статьи...'
				value={title}
				onChange={e => setTitle(e.target.value)}
				fullWidth
			/>
			<TextField
				classes={{ root: styles.tags }}
				variant='standard'
				placeholder='Тэги'
				value={tags}
				onChange={e => setTags(e.target.value)}
				fullWidth
			/>
			<SimpleMDE
				className={styles.editor}
				value={text}
				onChange={onChange}
				options={options}
			/>
			<div className={styles.buttons}>
				<Button
					onClick={onSubmit}
					type='submit'
					size='large'
					variant='contained'
				>
					{isEditing ? 'Сохранить' : 'Опубликовать'}
				</Button>
				<a href='/'>
					<Button size='large'>Отмена</Button>
				</a>
			</div>
		</Paper>
	)
}
