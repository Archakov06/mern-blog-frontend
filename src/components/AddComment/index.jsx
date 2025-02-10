import styles from './AddComment.module.scss'
import TextField from '@mui/material/TextField'
import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import { useDispatch, useSelector } from 'react-redux'
import { selectIsAuth } from '../../redux/slices/auth'
import { fetchAllComments, fetchTextComment } from '../../redux/slices/comment'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import axios from '../../axios'

export const Index = () => {
	const dispatch = useDispatch()
	const isAuth = useSelector(selectIsAuth)
	const userData = useSelector(state => state.auth.data)
	const [text, setText] = useState('')
	const [isCommentAdded, setIsCommentAdded] = useState(false)

	const onSubmit = async () => {
		const { data } = await axios.post('/comment', { text })
		setIsCommentAdded(true)
		setText('')

		return data
	}

	useEffect(() => {
		dispatch(fetchAllComments())
	}, [isCommentAdded])

	return (
		<>
			<div className={styles.root}>
				<Avatar
					classes={{ root: styles.avatar }}
					src={isAuth ? userData.avatarUrl : ''}
				/>
				<form className={styles.form}>
					<TextField
						label='Написать комментарий'
						variant='outlined'
						maxRows={10}
						multiline
						value={text}
						onChange={e => setText(e.target.value)}
						fullWidth
					/>
					<Button onClick={onSubmit} variant='contained'>
						Отправить
					</Button>
				</form>
			</div>
		</>
	)
}
