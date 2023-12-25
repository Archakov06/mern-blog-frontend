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
import {useParams} from "react-router-dom";


export const Home = (props) => {
    const {currentUrl} = useParams();
    const dispatch = useDispatch();
    const {posts, tags} = useSelector(state => state.posts);
    const userData = useSelector((state) => state.auth.data);
    const arePostsLoading = posts.status === 'loading';
    const areTagsLoading = tags.status === 'loading';

    if (Boolean(currentUrl)) { see("CURRENT URL IS: " + currentUrl); }


    React.useEffect(() => {
        try {
            dispatch(getPosts());
            dispatch(getTags());
        }
        catch (err) { see(err); }
    }, [])



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
                                    imageUrl={obj.imageUrl ? `${process.env.REACT_APP_API_URL}${obj.imageUrl}` : ''}
                                    user={obj.user}
                                    createdAt={obj.createdAt}
                                    viewsCount={obj.viewsCount}
                                    commentsCount={obj.comments.length}
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
                                    fullName: 'MongoDB',
                                    avatarUrl: 'data:image/png;base64,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',
                                },
                                text: 'Using MongoDB to store data on cloud',
                            },


                            {
                                user: {
                                    fullName: 'Express',
                                    avatarUrl: 'data:image/png;base64,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',
                                },
                                text: 'Express JS for handling the BackEnd',
                            },

                            {
                                user: {
                                    fullName: 'React',
                                    avatarUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/2300px-React-icon.svg.png"
                                },
                                text: 'Using React for UI',
                            },

                            {
                                user: {
                                    fullName: 'Redux',
                                    avatarUrl: "https://miro.medium.com/v2/resize:fit:500/1*tOI6UC5EaS2fPItCesI-AQ.png"
                                },
                                text: 'Redux for UI state management',
                            },

                            {
                                user: {
                                    fullName: 'Material UI',
                                    avatarUrl: 'https://icons.veryicon.com/png/o/object/material-design-icons-1/material-ui.png'
                                },
                                text: 'Using Material UI for elements styling',
                            },
                        ]}
                        isLoading={false}
                        currentUrl={currentUrl}
                    />


                </Grid>

            </Grid>
        </>
    );
};
