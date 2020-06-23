import client from './client';

const BASE_WEBHOOK_URL = '/webhook/task';

const taskDone = ({ task, token }) => {
  const endpoint = `${BASE_WEBHOOK_URL}/completed`;
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
