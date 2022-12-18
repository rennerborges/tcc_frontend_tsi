/* eslint-disable import/no-anonymous-default-export */
import env from '../../environment';
const baseUrl = env.REACT_APP_LINK_API;
import Cookie from 'js-cookie';

const headers = {
  'Content-Type': 'application/json',
};

const Post = async (url, body) => {
  const myInit = {
    method: 'POST',
    headers,
    body: JSON.stringify(body),
  };

  const token = Cookie.get('token');

  if (token) {
    myInit.headers.token = token;
  }

  const req = await fetch(`${baseUrl}${url}`, myInit);

  const response = await req.json();

  if (req.status === 401) {
    logout(req, response);
  }

  if (!req.ok) {
    throw { status: req.status, message: response?.message };
  }

  return response;
};

const Patch = async (url, body) => {
  const myInit = {
    method: 'PATCH',
    headers,
    body: JSON.stringify(body),
  };

  const token = Cookie.get('token');

  if (token) {
    myInit.headers.token = token;
  }

  const req = await fetch(`${baseUrl}${url}`, myInit);

  let response;
  try {
    response = await req.json();
  } catch (error) {
    response = req;
  }

  if (req.status === 401) {
    logout(req, response);
  }

  if (!req.ok) {
    throw { status: req.status, message: response?.message };
  }

  return response;
};

const Get = async (url) => {
  const myInit = {
    method: 'GET',
    headers,
  };

  const token = Cookie.get('token');

  if (token) {
    myInit.headers.token = token;
  }

  const req = await fetch(`${baseUrl}${url}`, myInit);

  const response = await req.json();

  if (req.status === 401) {
    logout(req, response);
  }

  if (!req.ok) {
    throw { status: req.status, message: response?.message || response };
  }

  return response;
};

const logout = (req, response) => {
  Cookie.remove('token');
  throw { status: req.status, message: response?.message };
};

export const LoginRequest = async (body) => {
  return Post('/login', body);
};

export const GetObjects = async () => {
  return Get('/objects');
};

export const GetObjectById = async (id) => {
  return Get(`/objects/${id}`);
};

export const CreateObject = async (body) => {
  return Post('/objects', body);
};

export const UpdateObject = async (id, body) => {
  return Patch(`/objects/${id}`, body);
};

export default {
  LoginRequest,
  GetObjects,
  GetObjectById,
  CreateObject,
  UpdateObject,
};
