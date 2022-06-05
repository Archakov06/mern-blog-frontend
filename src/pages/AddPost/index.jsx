import React from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import SimpleMDE from 'react-simplemde-editor';
import axios from '../../axios';

import 'easymde/dist/easymde.min.css';
import styles from './AddPost.module.scss';

export const AddPost = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const inputFileRef = React.useRef(null);
  const [isLoading, setIsLoading] = React.useState(false);
  const [fields, setFields] = React.useState({
    title: '',
    tags: '',
    text: '',
    imageUrl: '',
  });

  const isEditing = Boolean(id);

  React.useEffect(() => {
    if (id) {
      axios
        .get(`/posts/${id}`)
        .then(({ data }) => {
          setFields({
            ...data,
            tags: data.tags.join(','),
          });
        })
        .catch((err) => {
          alert('Ошибка при получении статьи');
          console.warn(err);
        });
    }
  }, []);

  const isEmptyFields = Object.values({ title: fields.title, text: fields.text }).some((v) => !v);

  const setFieldValue = (name, value) => {
    setFields((prev) => ({ ...prev, [name]: value }));
  };

  const onChange = React.useCallback((value) => {
    setFieldValue('text', value);
  }, []);

  const options = React.useMemo(
    () => ({
      spellChecker: false,
      maxHeight: '400px',
      autofocus: true,
      placeholder: 'Введите текст...',
      status: false,
      autosave: {
        enabled: true,
        delay: 1000,
      },
    }),
    [],
  );

  const handleChangeFile = async (e) => {
    try {
      const formData = new FormData();
      formData.append('image', e.target.files[0]);
      const { data } = await axios.post('/upload', formData);
      setFieldValue('imageUrl', data.url);
      e.target.value = '';
    } catch (e) {
      console.warn(e);
      alert('Ошибка при загрузке файла');
    }
  };

  const onSubmit = async () => {
    try {
      setIsLoading(true);
      console.log(fields, fields.tags);

      const apiMethod = isEditing
        ? axios.patch.bind(this, `/posts/${id}`)
        : axios.post.bind(this, '/posts');

      const { data } = await apiMethod({
        title: fields.title,
        text: fields.text,
        imageUrl: 'http://localhost:4444' + fields.imageUrl,
        tags: fields.tags.split(','),
      });

      const postId = id || data._id;

      navigate(`/posts/${postId}`);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Paper style={{ padding: 30 }}>
      <Button onClick={() => inputFileRef.current.click()} variant="outlined" size="large">
        Загрузить превью
      </Button>
      <input ref={inputFileRef} hidden type="file" onChange={handleChangeFile} />
      {fields.imageUrl && (
        <Button
          variant="contained"
          color="error"
          onClick={() => {
            setFieldValue('imageUrl', '');
          }}>
          Удалить
        </Button>
      )}
      {fields.imageUrl && (
        <img className={styles.image} src={`http://localhost:4444${fields.imageUrl}`} />
      )}
      <br />
      <br />
      <TextField
        value={fields.title}
        onChange={(e) => setFieldValue('title', e.target.value)}
        classes={{ root: styles.title }}
        variant="standard"
        placeholder="Заголовок статьи..."
        fullWidth
      />
      <TextField
        value={fields.tags}
        onChange={(e) => setFieldValue('tags', e.target.value)}
        classes={{ root: styles.tags }}
        variant="standard"
        placeholder="Тэги"
        fullWidth
      />
      <SimpleMDE
        className={styles.editor}
        value={fields.text}
        onChange={onChange}
        options={options}
      />
      <div className={styles.buttons}>
        <Button onClick={onSubmit} disabled={isEmptyFields} size="large" variant="contained">
          {!isEditing ? 'Опубликовать' : 'Сохранить'}
        </Button>
        <Link to="/">
          <Button disabled={isLoading} size="large">
            Отмена
          </Button>
        </Link>
      </div>
    </Paper>
  );
};
