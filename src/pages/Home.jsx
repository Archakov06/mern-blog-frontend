import React, { useEffect, useState } from 'react'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import Grid from '@mui/material/Grid'
import { Post } from '../components/Post'
import { TagsBlock } from '../components/TagsBlock'
import { CommentsBlock } from '../components/CommentsBlock'
import { useDispatch, useSelector } from 'react-redux'
import {
	fetchPosts,
	fetchPostsByPopularity,
	fetchTags,
} from '../redux/slices/posts'
import { fetchLastComment } from '../redux/slices/comment'

export const Home = () => {
	const dispatch = useDispatch()
	const userData = useSelector(state => state.auth.data)
	const { posts, tags } = useSelector(state => state.posts)
	const comments = useSelector(state => state.comments.data)
	const commentsStatus = useSelector(state => state.comments)
	const [isPopularPosts, setIsPopularPosts] = useState(false)
	const isPostsLoading = posts.status === 'loading'
	const isTagsLoading = tags.status === 'loading'
	const isCommentsLoading = commentsStatus.status === 'loading'

	useEffect(() => {
		dispatch(fetchTags())
		dispatch(fetchLastComment())
		isPopularPosts ? dispatch(fetchPostsByPopularity()) : dispatch(fetchPosts())
	}, [isPopularPosts])

	return (
		<>
			<Tabs
				style={{ marginBottom: 15 }}
				value={isPopularPosts ? 1 : 0}
				aria-label='basic tabs example'
			>
				<Tab label='Новые' onClick={() => setIsPopularPosts(false)} />
				<Tab label='Популярные' onClick={() => setIsPopularPosts(true)} />
			</Tabs>
			<Grid container spacing={4}>
				<Grid xs={8} item>
					{(isPostsLoading ? [...Array(5)] : posts.items).map((obj, index) =>
						isPostsLoading ? (
							<Post key={index} isLoading={true} />
						) : (
							<Post
								key={index}
								_id={obj._id}
								title={obj.title}
								imageUrl={
									obj.imageUrl && `http://localhost:4444${obj.imageUrl}`
								}
								user={obj.user}
								createdAt={obj.createdAt}
								viewsCount={obj.viewsCount}
								commentsCount={3}
								tags={obj.tags}
								isEditable={userData?._id === obj.user._id}
							/>
						)
					)}
				</Grid>
				<Grid xs={4} item>
					<TagsBlock items={tags.items} isLoading={isTagsLoading} />
					<CommentsBlock
						items={
							!isCommentsLoading &&
							comments.map(obj => ({
								user: {
									fullName: obj?.user?.fullName,
									avatarUrl: obj?.user?.avatarUrl,
								},
								text: obj.text,
							}))
						}
						isLoading={isCommentsLoading}
					/>
				</Grid>
			</Grid>
		</>
	)
}
