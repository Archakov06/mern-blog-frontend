import React from 'react';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import SimpleMDE from 'react-simplemde-editor';
import 'easymde/dist/easymde.min.css';
import styles from './AddPost.module.scss';
import {useSelector} from "react-redux";
import {selectIsAuth} from "../../redux/slices/auth";
import {useNavigate, Navigate, useParams} from "react-router-dom";
import instance from "../../axios";
import {see} from "../../utilities/myUtils";

export const AddPost = () => {
    // checking if a user is authenticated:
    const isAuth = useSelector(selectIsAuth);
    // using a navigation hook to redirect where we need:
    const navigate = useNavigate();

    const {id} = useParams();

    // creating a local state for the future content;
    const [title, setTitle] = React.useState('');
    const [isLoading, setLoading] = React.useState(false);
    const [text, setText] = React.useState('');
    const [tags, setTags] = React.useState('');
    const [imageUrl, setImageUrl] = React.useState('');
    const inputFileRef = React.useRef(null);

    const isEditing = Boolean(id);

    const handleChangeFile = async (event) => {

        try {
            // preparing the file:
            const formData = new FormData();
            const file = event.target.files[0];
            formData.append('image', file);

            // making the post network request with the payload:
            const {data} = await instance.post('/upload', formData);

            // setting the image url as per the response we receive in data:
            setImageUrl(data.url);

        } catch (err) {
            alert("Some error has occurred when uploading file. Check console!");
            see(err);
        }
    };
    const onClickRemoveImage = () => {
        if (window.confirm("Are you sure you want to delete this picture? ")) {
            // if user confirms, we nullify the image address:
            setImageUrl('');
        }
    };

    const onSubmit = async () => {

        try {
            // we're indicating that the process has begun and the request is loading:
            setLoading(true);

            // Indicating the payload. It is mapped to the data that server is expecting:
            const fields = {
                title: title,
                tags: tags.split(","),
                text: text,
                imageUrl: imageUrl
            }

            // making the post server request with the payload: fields;
            const {data} = isEditing
                ? await instance.patch(`/posts/${id}`, fields)
                : await instance.post('/posts', fields)

            // checking if we are CREATING or EDITING a post:
            const newPostId = isEditing ? id : data._id;

            // navigating to the fresh created article:
            navigate(`/posts/${newPostId}`);
        }
        catch (e) {
            alert('Some error has occurred when SENDING the article to the server. Check console!');
            see(e);
        }
    }

    // IMPORTANT stuff for SimpleMDE library (redactor)
    const onChange = React.useCallback((value) => {
        setText(value);
    }, []);

    React.useEffect(() => {
        if (id) {
            instance.get(`/posts/${id}`)
                .then(({data}) => {
                    setTitle(data.title);
                    setTags(data.tags.join(','));
                    setText(data.text);
                    setImageUrl(data.imageUrl);
                }).catch(err => {
                see(err);
                alert("An error occurred when getting a post!")
            });
        }
    }, []);

    const options = React.useMemo(
        () => ({
            spellChecker: false,
            maxHeight: '400px',
            autofocus: true,
            placeholder: "Don't be shy, tell us what you think... ",
            status: false,
            autosave: {
                enabled: true,
                delay: 1000,
            },
        }),
        [],
    );

    if (!window.localStorage.getItem('token') && !isAuth) {
        return navigate('/')
    }

    return (
        <Paper style={{padding: 30}}>
            <Button onClick={() => inputFileRef.current.click()} variant="outlined" size="large">
                Upload preview picture
            </Button>
            <input type="file" ref={inputFileRef} onChange={handleChangeFile} hidden/>
            {imageUrl && (
                <>
                    <img className={styles.image} src={`${process.env.REACT_APP_API_URL}${imageUrl}`} alt="Uploaded"/>
                    <Button variant="contained" color="error" onClick={onClickRemoveImage}>
                        Delete
                    </Button>
                </>
            )}
            <br/>
            <br/>
            <TextField
                classes={{root: styles.title}}
                variant="standard"
                placeholder="Enter title..."
                value={title}
                onChange={e => setTitle(e.target.value)}
                fullWidth
            />
            <TextField
                classes={{root: styles.tags}}
                variant="standard"
                placeholder="Please separate your tags with: , "
                value={tags}
                onChange={e => setTags(e.target.value)}
                fullWidth
            />

            <SimpleMDE
                className={styles.editor}
                value={text}
                onChange={onChange} options/>

            <div className={styles.buttons}>
                <Button
                    size="large"
                    variant="contained"
                    onClick={onSubmit}
                >
                    {isEditing ? 'Save' : 'Publish'}
                </Button>
                <a href="/">
                    <Button size="large">Cancel</Button>
                </a>
            </div>
        </Paper>
    );
};
