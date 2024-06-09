import axios from 'axios';

export const api = axios.create({
  baseURL: 'https://api.themoviedb.org/3',
  params: {
    api_key: 'a928e2aa4026ce8c08b475315deb079a',
    language: 'pt-BR',
  },
});
