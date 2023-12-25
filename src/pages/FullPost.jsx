import React from "react";
import {useParams} from 'react-router-dom';
import {Post} from "../components/Post";
import {Index} from "../components/AddComment";
import {CommentsBlock} from "../components/CommentsBlock";
import instance from './../axios';
import ReactMarkdown from "react-markdown";
import {see} from "../utilities/myUtils";
import {useDispatch, useSelector} from "react-redux";
import {getAuthMe, selectIsAuth} from "../redux/slices/auth";


export const FullPost = (props) => {

    // destructurization of object. getting ID:
    const {id} = useParams();
    const [data, setData] = React.useState();
    const [isLoading, setLoading] = React.useState(true);
    const [authorizedUser, setAuthorizedUser] = React.useState('');
    const dispatch = useDispatch();
    const isAuth = useSelector(selectIsAuth);


      // FIXME [EASY] (low priority): we might want to refactor this;
     //  Network requests logic in a dumb component?
    //  you can still use the effect but encapsulate that logic somewhere in a THUNK;
    // NETWORK REQUEST TO GET THE FULL POST CONTENT:
    React.useEffect(() => {
        try {
            instance
                .get(`/posts/${id}`)
                .then((res) => {
                    setData(res.data);
                    setLoading(false);
                });
        } catch (e) {
            console.warn(e);
            alert("AN ERROR OCCURRED WHEN GETTING POST DATA");
        }
    }, []);

    // NETWORK REQUEST TO GET DATA OF AUTHORIZED USER:
    React.useEffect(() => {
        const fetchAuthData = async () => {
            try {
                const action = await dispatch(getAuthMe());
                const authData = action.payload;

                if (Boolean(authData)) {
                    setAuthorizedUser(authData.fullName);
                }

            } catch (error) {
                see('Error:', error);
            }
        };

          // FIXME: its better if WE TRIGGER THE getAuthMe() network request
         //  ONLY if we know a user is authorized
        // otherwise we're not wasting network resources
        fetchAuthData();

    }, []);



    if (isLoading) {
        return <Post isLoading={isLoading} isFullPost/>
    }

    return (
        <>
            <Post
                id={data._id}
                title={data.title}
                imageUrl={data.imageUrl ? `http://localhost:4444${data.imageUrl}` : ''}
                user={data.user}
                createdAt={data.createdAt}
                viewsCount={data.viewsCount}
                commentsCount={data.comments.length}
                tags={data.tags}
                isFullPost
            >
                <p>

                    <ReactMarkdown children={data.text}/>

                </p>

            </Post>


            <CommentsBlock

                items={data.comments} // the comments are fetched successfully
                isLoading={false}
            >
                <Index
                    isAuth={isAuth}
                    dbComments={data.comments}
                    authorizedUser={authorizedUser}
                    id={id}
                />
            </CommentsBlock>
        </>
    );
};
