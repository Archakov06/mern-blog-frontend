import React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Grid from '@mui/material/Grid';
import {useDispatch, useSelector} from "react-redux";
import {Post} from '../components/Post';
import {TagsBlock} from '../components/TagsBlock';
import {CommentsBlock} from '../components/CommentsBlock';
import axios from '../axios';
import {getPosts, getTags} from "../redux/slices/posts";
import {see} from "../utilities/myUtils";


export const Home = (props) => {
    const dispatch = useDispatch();
    const {posts, tags} = useSelector(state => state.posts);
    const userData = useSelector((state) => state.auth.data);
    const arePostsLoading = posts.status === 'loading';
    const areTagsLoading = tags.status === 'loading';

    React.useEffect(() => {
        try {
            dispatch(getPosts());
            dispatch(getTags());
        }
        catch (err) { see(err); }
    }, []);


    return (
        <>
            <Tabs style={{marginBottom: 15}} value={0} aria-label="basic tabs example">
                <Tab label="New"/>
                <Tab label="Popular"/>
            </Tabs>

            <Grid container spacing={4}>

                <Grid xs={8} item>
                    {
                        (arePostsLoading ? [...Array(5)] : posts.items).map((obj, index) => arePostsLoading
                            ? (<Post key={index} isLoading={true}/>)
                            : (
                                <Post
                                    id={obj._id}
                                    title={obj.title}
                                    imageUrl={obj.imageUrl ? `http://localhost:4444${obj.imageUrl}` : ''}
                                    user={obj.user}
                                    createdAt={obj.createdAt}
                                    viewsCount={obj.viewsCount}
                                    commentsCount='undefined'
                                    tags={obj.tags}
                                    isEditable={userData?._id === obj.user._id}
                                />
                            )
                        )
                    }
                </Grid>

                <Grid xs={4} item>

                    <TagsBlock items={tags.items} isLoading={areTagsLoading}/>

                    <CommentsBlock
                        items={[
                            {
                                user: {
                                    fullName: 'Вася Пупкин',
                                    avatarUrl: 'https://mui.com/static/images/avatar/1.jpg',
                                },
                                text: 'Это тестовый комментарий',
                            },
                            {
                                user: {
                                    fullName: 'Иван Иванов',
                                    avatarUrl: 'https://mui.com/static/images/avatar/2.jpg',
                                },
                                text: 'When displaying three lines or more, the avatar is not aligned at the top. You should set the prop to align the avatar at the top',
                            },
                        ]}
                        isLoading={false}
                    />


                </Grid>

            </Grid>
        </>
    );
};
