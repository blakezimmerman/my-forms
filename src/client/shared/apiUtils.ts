import axios, { AxiosError, AxiosResponse } from 'axios';
import { Action, AsyncActionDispatcher } from './reduxUtils';
import { ClientConfig } from 'server/clientConfig';
import { match, is } from './miscUtils';

declare const APP_CONFIG: ClientConfig;

export const apiBase = APP_CONFIG.host + 'api/';

export const api = (endpoint: string) => apiBase + endpoint;

export const get = (url: string, action: AsyncActionDispatcher<any, any>) =>
  axios.get(url)
    .then((response) => action.SUCCESS(response.data))
    .catch((err) => action.FAILURE(err.response.data));

export const post = (url: string, body: object, action: AsyncActionDispatcher<any, any>) =>
  axios.post(url, body)
    .then((response) => action.SUCCESS(response.data))
    .catch((err) => action.FAILURE(err.response.data));