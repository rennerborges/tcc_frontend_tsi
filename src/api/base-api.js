/* eslint-disable import/no-anonymous-default-export */
import env from '../../environment';
const baseUrl = env.REACT_APP_LINK_API;
import Cookie from 'js-cookie';

const headers = {
  'Content-Type': 'application/json',
};

const logout = (req, response) => {
  Cookie.remove('token');
  throw { status: req.status, message: response?.message };
};

const BaseRequest = async (method, url, body) => {
  const myInit = {
    method: method,
    headers,
  };

  if (body) {
    myInit.body = JSON.stringify(body);
  }

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

export const Post = async (url, body) => {
  return BaseRequest('POST', url, body);
};

export const Patch = async (url, body) => {
  return BaseRequest('PATCH', url, body);
};

export const Get = async (url) => {
  return BaseRequest('GET', url);
};

export default {
  Post,
  Patch,
  Get,
};
