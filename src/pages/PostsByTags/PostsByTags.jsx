import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { fetchPostsByTags } from '../../redux/slices/posts'
import { useParams } from 'react-router-dom'
import { Post } from '../../components'

const PostsByTags = () => {
	const dispatch = useDispatch()
	const userData = useSelector(state => state.auth.data)
	const { posts } = useSelector(state => state.posts)
	const isPostsLoading = posts.status === 'loading'
	const { id } = useParams()

	useEffect(() => {
		dispatch(fetchPostsByTags(id))
	}, [])

	return (
		<div>
			<h1>Posts with tag "{id}"</h1>
			{posts.items.length > 0 &&
				!isPostsLoading &&
				(isPostsLoading ? [...Array(5)] : posts.items).map((obj, index) =>
					isPostsLoading ? (
						<Post key={index} isLoading={true} />
					) : (
						<Post
							key={index}
							_id={obj._id}
							title={obj.title}
							imageUrl={obj.imageUrl && `http://localhost:4444${obj.imageUrl}`}
							user={obj.user}
							createdAt={obj.createdAt}
							viewsCount={obj.viewsCount}
							commentsCount={3}
							tags={obj.tags}
							isEditable={userData?._id === obj.user._id}
						/>
					)
				)}
			{!posts.items.length &&
				!isPostsLoading &&
				'Sorry, but there are no posts with this tag'}
		</div>
	)
}

export default PostsByTags
