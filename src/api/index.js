import { Delete, Get, Patch, Post } from './base-api';

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

export const DeleteObject = async (id) => {
  return Delete(`/objects/${id}`);
};

export default {
  LoginRequest,
  GetObjects,
  GetObjectById,
  CreateObject,
  UpdateObject,
  DeleteObject,
};
