import React from "react";
import {useParams} from 'react-router-dom';
import {Post} from "../components/Post";
import {Index} from "../components/AddComment";
import {CommentsBlock} from "../components/CommentsBlock";
import instance from './../axios';
import ReactMarkdown from "react-markdown";


export const FullPost = () => {

    // destructurization of object. getting ID:
    const {id} = useParams();
    const [data, setData] = React.useState();
    const [isLoading, setLoading] = React.useState(true);


      // FIXME [EASY] (low priority): we might want to refactor this;
     //  Network requests logic in a dumb component?
    //  you can still use the effect but encapsulate that logic somewhere in a THUNK;
    React.useEffect(() => {
        try {
            instance
                .get(`/posts/${id}`)
                .then( (res) => {
                    setData(res.data);
                    setLoading(false);
                });
        }
        catch (e) {
            console.warn(e);
            alert("AN ERROR OCCURRED WHEN GETTING POST DATA");
        }
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
                commentsCount='undefined'
                tags={data.tags}
                isFullPost
            >
                <p>

                    <ReactMarkdown children={data.text}/>
                    {/*{data.text}*/}

                    {   // FIXME: BUG; For some reason some keywords are highlighted when adding the text.
                        // this is definitely not the right behavior;
                        // We might wanna add this line bellow instead of the one above;
                       // {data.text}
                    }

                </p>

            </Post>


            <CommentsBlock
                items={[
                    {
                        user: {
                            fullName: "Вася Пупкин",
                            avatarUrl: "https://mui.com/static/images/avatar/1.jpg",
                        },
                        text: "Это тестовый комментарий 555555",
                    },
                    {
                        user: {
                            fullName: "Иван Иванов",
                            avatarUrl: "https://mui.com/static/images/avatar/2.jpg",
                        },
                        text: "When displaying three lines or more, the avatar is not aligned at the top. You should set the prop to align the avatar at the top",
                    },
                ]}
                isLoading={false}
            >
                <Index/>
            </CommentsBlock>
        </>
    );
};
