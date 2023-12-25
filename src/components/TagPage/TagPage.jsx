import React, {useEffect, useState} from "react";
import {see} from "../../utilities/myUtils";
import {useParams} from 'react-router-dom';
import styles from './TagPage.module.css';
import {useDispatch, useSelector} from "react-redux";
import {getPosts, getTags} from "../../redux/slices/posts";
import Grid from "@mui/material/Grid";
import {Post} from "../Post";

const TagPage = () => {

     // FIXME[MEDIUM]: we're doing a lot of stupid trimming here;
    //  this should be done on the server's side and be fixed beautifully on front-end;

      // FIXME[HARD]: OPTIMIZATION
     // we can't keep getting ALL THE posts - huge performance cost. A separate API is required to get posts by tag;
    // all the filtrations and trimming stuff should be done on the server side;

    // Getting all the Data and setting up the Hooks:
    let {tag} = useParams(); // getting the tag from the URL
    tag = tag.trim(); // we have to get the "CLEAN" tag for propper comparison
    const dispatch = useDispatch();
    const {posts, tags} = useSelector(state => state.posts);
    const userData = useSelector((state) => state.auth.data);
    const arePostsLoading = posts.status === 'loading';
    const areTagsLoading = tags.status === 'loading';
    let filteredPosts = []; // here we will store the posts related to the necessary tag;

    useEffect(() => {
        try {
            dispatch(getPosts());
            dispatch(getTags());
        } catch (err) {
            see(err);
        }
    }, []);


    if (posts.status === 'loaded') {
        try {
            filteredPosts = posts.items
                .filter((post) => post.tags
                    .some( (i) => i.trim() === tag)
                );
        } catch (e) {
            see("CAUGHT ERROR: " + e)
        }
    }

    return (
        <>
            <div>
                <h1 className={styles.tagStyle}># {tag}</h1>
            </div>

            <Grid container spacing={4}>

                <Grid xs={12} item>
                    {
                        (arePostsLoading ? [...Array(5)] : filteredPosts).map((obj, index) => arePostsLoading
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


            </Grid>
        </>
    )

};

export default TagPage;