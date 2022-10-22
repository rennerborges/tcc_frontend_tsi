/* eslint-disable import/no-anonymous-default-export */
import env from '../../environment';
const baseUrl = env.REACT_APP_LINK_API;

const headers = {
  'Content-Type': 'application/json',
};

const Post = async (url, body) => {
  const myInit = {
    method: 'POST',
    headers,
    body: JSON.stringify(body),
  };

  const req = await fetch(`${baseUrl}${url}`, myInit);

  const response = await req.json();

  if (!req.ok) {
    throw { status: req.status, message: response?.message };
  }

  return response;
};

export const LoginRequest = async (body) => {
  return Post('/login', body);
};

export default {
  LoginRequest,
};
