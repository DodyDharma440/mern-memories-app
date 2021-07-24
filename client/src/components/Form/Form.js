import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { TextField, Button, Typography, Paper } from "@material-ui/core";
import { createPost, updatePost } from "../../actions/posts";
import FileBase from "react-file-base64";
import useStyles from "./styles";

const Form = ({ currentId, setCurrentId }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const post = useSelector((state) =>
    currentId ? state.posts.posts.find((p) => p._id === currentId) : null
  );
  const userData = JSON.parse(localStorage.getItem("userDataMemories"));

  const [postData, setPostData] = useState({
    title: "",
    message: "",
    tags: "",
    selectedFile: "",
  });

  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    if (currentId) {
      dispatch(
        updatePost(
          currentId,
          { ...postData, name: userData?.result?.name },
          () => {
            setLoading(false);
            clearForm();
          }
        )
      );
    } else {
      dispatch(
        createPost({ ...postData, name: userData?.result?.name }, () => {
          setLoading(false);
          clearForm();
        })
      );
    }
  };

  const clearForm = () => {
    setPostData({
      title: "",
      message: "",
      tags: "",
      selectedFile: "",
    });
    setCurrentId(null);
  };

  useEffect(() => {
    if (post) {
      setPostData(post);
    }
  }, [post]);

  if (!userData?.result?.name) {
    return (
      <Paper className={classes.paper}>
        <Typography variant="h6" align="center">
          Please Sign In to create and like memories
        </Typography>
      </Paper>
    );
  }

  return (
    <Paper className={classes.paper} elevation={6}>
      <form
        autoComplete="off"
        noValidate
        className={`${classes.root} ${classes.form}`}
        onSubmit={handleSubmit}
        encType="multipart/form-data"
      >
        <Typography variant="h6">
          {currentId ? "Edit memory" : "Create a memory"}
        </Typography>
        <TextField
          name="title"
          variant="outlined"
          label="Title"
          fullWidth
          value={postData.title}
          onChange={(e) => setPostData({ ...postData, title: e.target.value })}
        />
        <TextField
          name="message"
          variant="outlined"
          label="Message"
          fullWidth
          value={postData.message}
          onChange={(e) =>
            setPostData({ ...postData, message: e.target.value })
          }
        />
        <TextField
          name="tags"
          variant="outlined"
          label="Tags"
          fullWidth
          value={postData.tags}
          onChange={(e) =>
            setPostData({ ...postData, tags: e.target.value.split(",") })
          }
        />
        <div>
          {postData.selectedFile !== "" && (
            <img
              src={postData.selectedFile}
              alt="preview"
              className={classes.imagePreview}
            />
          )}
        </div>
        <div className={classes.fileInput}>
          <FileBase
            type="file"
            multiple={false}
            onDone={({ base64 }) =>
              setPostData({ ...postData, selectedFile: base64 })
            }
          />
        </div>
        <Button
          className={classes.buttonSubmit}
          variant="contained"
          color="primary"
          size="large"
          type="submit"
          fullWidth
          disabled={loading ? true : false}
        >
          {loading ? "Submiting..." : "Submit"}
        </Button>
        <Button
          variant="contained"
          color="secondary"
          size="large"
          fullWidth
          type="button"
          onClick={clearForm}
        >
          Clear
        </Button>
      </form>
    </Paper>
  );
};

export default Form;
