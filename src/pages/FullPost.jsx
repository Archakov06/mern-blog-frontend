import React, { useEffect, useState } from 'react'

import { Post } from '../components/Post'
import { Index } from '../components/AddComment'
import { CommentsBlock } from '../components/CommentsBlock'
import { useParams } from 'react-router-dom'
import axios from '../axios.js'
import { ReactMarkdown } from 'react-markdown/lib/react-markdown'
import { useDispatch, useSelector } from 'react-redux'
import { fetchAllComments, isData } from '../redux/slices/comment'

export const FullPost = () => {
	const [data, setData] = useState()
	const [isLoading, setIsLoading] = useState(true)
	const { id } = useParams()
	const dispatch = useDispatch()
	const comments = useSelector(state => state.comments)
	const commentData = useSelector(state => state.comments.data)
	const isDataLoading = comments.status === 'loading'

	useEffect(() => {
		axios
			.get(`/posts/${id}`)
			.then(res => {
				setData(res.data)
				setIsLoading(false)
			})
			.catch(err => {
				console.warn(err)
				alert('Ошибка')
			})
		dispatch(fetchAllComments())
	}, [])

	if (isLoading) {
		return <Post isLoading={isLoading} isFullPost />
	}

	return (
		<>
			<Post
				id={data._id}
				title={data.title}
				user={data.user}
				imageUrl={data.imageUrl && `http://localhost:4444${data.imageUrl}`}
				createdAt={data.createdAt}
				viewsCount={data.viewsCount}
				commentsCount={3}
				tags={data.tags}
				isFullPost
			>
				<ReactMarkdown children={data.text} />
			</Post>
			<CommentsBlock
				items={
					!isDataLoading &&
					commentData.map(obj => ({
						user: {
							fullName: obj?.user?.fullName,
							avatarUrl: obj?.user?.avatarUrl,
						},
						text: obj.text,
					}))
				}
				isLoading={isDataLoading}
			>
				<Index />
			</CommentsBlock>
		</>
	)
}
