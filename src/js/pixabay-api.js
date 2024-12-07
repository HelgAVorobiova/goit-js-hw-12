import axios from 'axios';

const base_url = 'https://pixabay.com/api/';
const key = '47358602-d5490533da2bc88f2f38f5bcb';
const per_page = 15;

export async function fetchImages(query, page = 1) {
  const url = `${base_url}?key=${key}&q=${encodeURIComponent(
    query
  )}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=${per_page}`;

  const response = await axios.get(url);

  if (response.status !== 200) {
    throw new Error('Failed to fetch images');
  }

  return response.data;
}
