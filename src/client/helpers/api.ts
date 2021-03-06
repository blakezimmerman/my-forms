import axios, { AxiosError, AxiosResponse } from 'axios';
import { Action, AsyncActionDispatcher } from './redux';
import { match, is } from './misc';

export const apiBase = window.location.origin + '/api/';

export const api = (endpoint: string) => apiBase + endpoint;

export const httpPost = (url: string, body: object, action: AsyncActionDispatcher<any, any>) =>
  axios.post(url, body)
    .then((response) => action.SUCCESS(response.data))
    .catch((err) => action.FAILURE(err.response.data));

export const httpGet = (url: string, action: AsyncActionDispatcher<any, any>) =>
  axios.get(url)
    .then((response) => action.SUCCESS(response.data))
    .catch((err) => action.FAILURE(err.response.data));

export const httpPut = (url: string, body: object, action: AsyncActionDispatcher<any, any>) =>
  axios.put(url, body)
    .then((response) => action.SUCCESS(response.data))
    .catch((err) => action.FAILURE(err.response.data));

export const httpDelete = (url: string, action: AsyncActionDispatcher<any, any>) =>
  axios.delete(url)
    .then((response) => action.SUCCESS(response.data))
    .catch((err) => action.FAILURE(err.response.data));

export const refreshSession = (action: AsyncActionDispatcher<any, any>) =>
  axios.get(api('auth/refresh'))
    .then((response) => response.data !== 'Not Authorized'
      ? action.SUCCESS(response.data)
      : action.FAILURE(undefined)
    );
