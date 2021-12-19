import axios from "axios";

export const createUser = (user) =>
  axios({
    method: "post",
    url: "http://localhost:4000/api/user/signup",
    headers: {},
    data: user,
  });

export const LogIn = (user) =>
  axios({
    method: "post",
    url: "http://localhost:4000/api/user/login",
    headers: {},
    data: user,
  });

export const GetEvents = (token) =>
  axios({
    method: "get",
    url: "http://localhost:4000/api/event/?offset=0&limit=100",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

export const CreateEvent = (data, token) =>
  axios({
    method: "post",
    url: "http://localhost:4000/api/event",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    data: {
      from: data.from,
      to: data.to,
      content: data.content,
      isCompleted: data.isCompleted,
      creator: data.creator,
    },
  });

export const DeleteEvent = (data, token) =>
  axios({
    method: "delete",
    url: `http://localhost:4000/api/event/${data}`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

export const UpdateEvent = (data, token) =>
  axios({
    method: "put",
    url: `http://localhost:4000/api/event/${data.id}`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
    data: data,
  });
