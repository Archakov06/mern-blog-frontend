import React, {useState} from "react";
import styles from "./AddComment.module.scss";
import TextField from "@mui/material/TextField";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import {see} from "../../utilities/myUtils";
import {useForm} from "react-hook-form";
import {getAuthData} from "../../redux/slices/auth";
import {useDispatch} from "react-redux";
import instance from "../../axios";

export const Index = ({isAuth, dbComments, authorizedUser, id}) => {

    const [comments, setComments] = useState(dbComments);

    if (dbComments) {
        see(dbComments)
    }
    //const dispatch = useDispatch();
    const token = localStorage.getItem('token')


    const {
        register,
        handleSubmit,
        setError,
        formState: {errors, isValid}
    } = useForm({mode: 'all'});

    const onSubmit = async (text) => {

        try {
            const headers = {token}
            const newComment = {
                user: {fullName: authorizedUser},
                ...text,
            }

            setComments(comments.push(newComment));

            const payload = { comments: comments }

            const { data } = await instance.patch(`/posts/${id}/comments`, payload, {headers});
        }
        catch (e) { see(e) }
    }

    return (
        <>
            <div className={styles.root}>
                <Avatar
                    classes={{root: styles.avatar}}
                    src="https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/271deea8-e28c-41a3-aaf5-2913f5f48be6/de7834s-6515bd40-8b2c-4dc6-a843-5ac1a95a8b55.jpg/v1/fill/w_300,h_300,q_75,strp/default_user_icon_4_by_karmaanddestiny_de7834s-fullview.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9MzAwIiwicGF0aCI6IlwvZlwvMjcxZGVlYTgtZTI4Yy00MWEzLWFhZjUtMjkxM2Y1ZjQ4YmU2XC9kZTc4MzRzLTY1MTViZDQwLThiMmMtNGRjNi1hODQzLTVhYzFhOTVhOGI1NS5qcGciLCJ3aWR0aCI6Ijw9MzAwIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmltYWdlLm9wZXJhdGlvbnMiXX0.W7L0Rf_YqFzX9yxDfKtIMFnnRFdjwCHxi7xeIISAHNM"
                />
                <div className={styles.form}>

                    <form onSubmit={handleSubmit(onSubmit)}>
                        <TextField
                            label={isAuth ? "Write a comment" : "Please log in to write a comment"}
                            variant="outlined"
                            maxRows={10}
                            multiline
                            fullWidth
                            InputProps={{readOnly: !isAuth}}
                            {...register('text', {required: 'Enter email!',})}
                        />

                        <Button variant="contained" type='submit' disabled={!isAuth}>
                            Post Comment
                        </Button>
                    </form>
                </div>
            </div>
        </>
    );
};
