import React, { useState } from "react";
import useStyles from "./styles";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { deletePost, likePost } from "../../../actions/posts";
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,
  ButtonBase,
} from "@material-ui/core";
import {
  ThumbUpAlt,
  ThumbUpAltOutlined,
  Delete,
  MoreHoriz,
} from "@material-ui/icons";
import moment from "moment";

const Post = ({ post, setCurrentId }) => {
  const classes = useStyles();
  const {
    _id,
    selectedFile,
    title,
    name,
    createdAt,
    tags,
    message,
    likes,
    creator,
  } = post;
  const userData = JSON.parse(localStorage.getItem("userDataMemories"));

  const dispatch = useDispatch();
  const history = useHistory();

  const [loading, setLoading] = useState(false);

  const handleDelete = () => {
    setLoading(true);
    dispatch(
      deletePost(_id, () => {
        setLoading(false);
      })
    );
  };

  const openPost = () => {
    history.push(`/posts/${post._id}`);
  };

  const Likes = () => {
    if (post.likes.length > 0) {
      return post.likes.find(
        (like) => like === (userData?.result?.googleId || userData?.result?._id)
      ) ? (
        <>
          <ThumbUpAlt fontSize="small" />
          &nbsp;
          {post.likes.length > 2
            ? `You and ${post.likes.length - 1} others`
            : `${post.likes.length} like${post.likes.length > 1 ? "s" : ""}`}
        </>
      ) : (
        <>
          <ThumbUpAltOutlined fontSize="small" />
          &nbsp;{likes.length} {likes.length === 1 ? "Like" : "Likes"}
        </>
      );
    }

    return (
      <>
        <ThumbUpAltOutlined fontSize="small" />
        &nbsp;Like
      </>
    );
  };

  return (
    <Card className={classes.card}>
      <ButtonBase
        className={classes.cardAction}
        onClick={openPost}
        component="span"
      >
        <CardMedia
          className={classes.media}
          image={selectedFile}
          title={title}
        />
        <div className={classes.overlay}>
          <Typography variant="h6">{name}</Typography>
          <Typography variant="body2">{moment(createdAt).fromNow()}</Typography>
        </div>
        <div className={classes.overlay2}>
          {(userData?.result?.googleId === creator ||
            userData?.result?._id === creator) && (
            <Button
              style={{ color: "white" }}
              size="small"
              onClick={() => setCurrentId(_id)}
            >
              <MoreHoriz fontSize="default" />
            </Button>
          )}
        </div>
        <div className={classes.details}>
          <Typography variant="body2" color="textSecondary">
            {tags.map((tag) => `#${tag} `)}
          </Typography>
        </div>
        <Typography className={classes.title} variant="h5">
          {title}
        </Typography>
        <CardContent>
          <Typography variant="body2" paragraph color="textSecondary">
            {message}
          </Typography>
        </CardContent>
      </ButtonBase>
      <CardActions className={classes.cardActions}>
        <Button
          size="small"
          color="primary"
          onClick={() => dispatch(likePost(_id))}
          disabled={!userData?.result ? true : false}
        >
          <Likes />
        </Button>
        {(userData?.result?.googleId === creator ||
          userData?.result?._id === creator) && (
          <Button
            size="small"
            color="primary"
            onClick={handleDelete}
            disabled={loading || !userData?.result ? true : false}
          >
            <Delete fontSize="small" />
            {loading ? "Deleting..." : "Delete"}
          </Button>
        )}
      </CardActions>
    </Card>
  );
};

export default Post;
