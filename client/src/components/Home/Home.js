import React, { useState, useEffect } from "react";
import {
  Grow,
  Grid,
  Container,
  Paper,
  AppBar,
  TextField,
  Button,
} from "@material-ui/core";
import { useHistory, useLocation } from "react-router-dom";
import ChipInput from "material-ui-chip-input";
import { useDispatch } from "react-redux";
import { getPosts, searchPosts } from "../../actions/posts";
import Posts from "../Posts/Posts";
import Pagination from "../Pagination/Pagination";
import Form from "../Form/Form";
import useStyles from "./styles";

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

const Home = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();
  const query = useQuery();
  const page = query.get("page") || 1;
  const searchQuery = query.get("searchQuery");

  const [currentId, setCurrentId] = useState(null);
  const [searchValue, setSearchValue] = useState("");
  const [tags, setTags] = useState([]);

  const handleKeyPress = (e) => {
    if (e.which === 13) {
      handleSearch();
    }
  };

  const handleAddTag = (tag) => {
    setTags([...tags, tag]);
  };

  const handleRemoveTag = (tagToDelete) => {
    const filteredTags = tags.filter((tag) => tag !== tagToDelete);

    setTags(filteredTags);
  };

  const handleSearch = (searchValue, tags) => {
    if (searchValue.trim() || tags.length > 0) {
      dispatch(
        searchPosts({
          searchValue,
          tags: tags.join(","),
        })
      );
      history.push(
        `/posts/search?searchQuery=${searchValue || "none"}&tags=${tags.join(
          ","
        )}`
      );
    }
  };

  // useEffect(() => {
  //   dispatch(getPosts());
  // }, [currentId, dispatch]);

  // useEffect(() => {
  //   console.log("search ->", searchQuery);
  //   console.log("page ->", page);
  // }, [searchQuery, page]);

  // useEffect(() => {
  //   console.log(searchQuery);

  //   // if (searchQuery) {
  //   //   setSearchValue(searchQuery.searchQuery);
  //   //   setTags(searchQuery.tags.split(","));
  //   //   handleSearch(searchQuery.searchQuery, searchQuery.tags.split(","));
  //   // }
  // }, [searchQuery]);

  return (
    <Grow in>
      <Container maxWidth="xl">
        <Grid
          container
          justify="space-between"
          alignItems="stretch"
          spacing={3}
          className={classes.mainContainer}
        >
          <Grid item xs={12} sm={6} md={9}>
            <Posts setCurrentId={setCurrentId} />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <AppBar
              className={classes.appBarSearch}
              position="static"
              color="inherit"
            >
              <TextField
                name="search"
                variant="outlined"
                label="Search Memories"
                onKeyPress={handleKeyPress}
                fullWidth
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
              />
              <ChipInput
                style={{
                  margin: "10px 0",
                }}
                value={tags}
                onAdd={handleAddTag}
                onDelete={handleRemoveTag}
                label="Search Tags"
                variant="outlined"
              />
              <Button
                onClick={() => handleSearch(searchValue, tags)}
                className={classes.searchButton}
                color="primary"
                variant="contained"
              >
                Search
              </Button>
            </AppBar>
            <Form currentId={currentId} setCurrentId={setCurrentId} />
            {!searchQuery && !tags.length && (
              <Paper elevation={6} className={classes.pagination}>
                <Pagination page={page} />
              </Paper>
            )}
          </Grid>
        </Grid>
      </Container>
    </Grow>
  );
};

export default Home;
