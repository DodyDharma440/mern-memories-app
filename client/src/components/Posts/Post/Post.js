import React, { useState } from "react";
import useStyles from "./styles";
import { useDispatch } from "react-redux";
import { deletePost } from "../../../actions/posts";
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,
} from "@material-ui/core";
import { ThumbUpAlt, Delete, MoreHoriz } from "@material-ui/icons";
import moment from "moment";

const Post = ({ post, setCurrentId }) => {
  const classes = useStyles();
  const {
    _id,
    selectedFile,
    title,
    creator,
    createdAt,
    tags,
    message,
    likeCount,
  } = post;

  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);

  const handleDelete = () => {
    setLoading(true);
    dispatch(
      deletePost(_id, () => {
        setLoading(false);
      })
    );
  };

  return (
    <Card className={classes.card}>
      <CardMedia className={classes.media} image={selectedFile} title={title} />
      <div className={classes.overlay}>
        <Typography variant="h6">{creator}</Typography>
        <Typography variant="body2">{moment(createdAt).fromNow()}</Typography>
      </div>
      <div className={classes.overlay2}>
        <Button
          style={{ color: "white" }}
          size="small"
          onClick={() => setCurrentId(_id)}
        >
          <MoreHoriz fontSize="default" />
        </Button>
      </div>
      <div className={classes.details}>
        <Typography variant="body2" color="textSecondary">
          {tags[0].split(" ").map((tag) => `#${tag} `)}
        </Typography>
      </div>
      <Typography className={classes.title} variant="h5">
        {title}
      </Typography>
      <CardContent>
        <Typography variant="body1" gutterBottom>
          {message}
        </Typography>
      </CardContent>
      <CardActions className={classes.cardActions}>
        <Button size="small" color="primary" onClick={() => {}}>
          <ThumbUpAlt fontSize="small" />
          {`${likeCount} Likes`}
        </Button>
        <Button
          size="small"
          color="primary"
          onClick={handleDelete}
          disabled={loading ? true : false}
        >
          <Delete fontSize="small" />
          {loading ? "Deleting..." : "Delete"}
        </Button>
      </CardActions>
    </Card>
  );
};

export default Post;
