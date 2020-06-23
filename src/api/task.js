import client from './client';

const BASE_WEBHOOK_URL = '/webhook/task';

const taskDone = ({ task }) => {
  const endpoint = `${BASE_WEBHOOK_URL}/completed`;
  const token = localStorage.getItem('token');
  const data = { task, token };

  try {
    const response = client.post(endpoint, data);

    return response;
  } catch(error) {
    return Promise.reject(error);
  }
};

export default {
  taskDone,
};
