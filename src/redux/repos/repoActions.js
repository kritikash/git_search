import {
  FETCH_REPOS_FAILURE,
  FETCH_REPOS_REQUEST,
  FETCH_REPOS_SUCCESS,
} from "./repoTypes";
import axios from "axios";
// import { type } from "@testing-library/user-event/dist/type";

export const fetchReposRequest = () => {
  return {
    type: FETCH_REPOS_REQUEST,
  };
};

export const fetchReposSuccess = (repos) => {
  return {
    type: FETCH_REPOS_SUCCESS,
    payload: repos,
  };
};

export const fetchReposFailure = (error) => {
  return {
    type: FETCH_REPOS_FAILURE,
    payload: error,
  };
};


var github_token = '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'


export const fetchRepos = (searchTerm, pageNo) => {
  return (dispatch) => {
    dispatch(fetchReposRequest());
    axios
      .get(`https://api.github.com/search/repositories?q=${searchTerm}&page=${pageNo}`,{
        auth:{
          username:"Animesh-chaturvedi",
          password:github_token
        }
      })
      .then((response) => {
        if (response.status !== 200) {
          console.log("something went wrong", response);
        } else {
          dispatch(fetchReposSuccess(response.data.items));
        }
      })
      .catch((err) => {
        const errMsg = err.message;
        dispatch(fetchReposFailure(errMsg));
      });
  };
};
