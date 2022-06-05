import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Grid from '@mui/material/Grid';

import { Post } from '../components/Post';
import { TagsBlock } from '../components/TagsBlock';
import { CommentsBlock } from '../components/CommentsBlock';

import { fetchPosts, fetchTags } from '../redux/slices/posts';

export const Home = () => {
  const { posts, postStatus, tags, tagStatus } = useSelector((state) => state.posts);
  const user = useSelector((state) => state.auth.data);
  const dispatch = useDispatch();

  const postsLoading = postStatus === 'loading';
  const tagsLoading = tagStatus === 'loading';

  React.useEffect(() => {
    dispatch(fetchPosts());
    dispatch(fetchTags());
  }, []);

  return (
    <>
      <Tabs style={{ marginBottom: 15 }} value={0} aria-label="basic tabs example">
        <Tab label="Новые" />
        <Tab label="Популярные" />
      </Tabs>
      <Grid container spacing={4}>
        <Grid xs={8} item>
          {(postsLoading ? [...Array(5)] : posts).map((obj, index) => (
            <Post
              key={index}
              {...obj}
              user={obj && obj.user}
              commentsCount={3}
              isLoading={postsLoading}
              isEditable={obj && user ? user._id === obj.user._id : false}
            />
          ))}
        </Grid>
        <Grid xs={4} item>
          <TagsBlock items={tags} isLoading={tagsLoading} />
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
