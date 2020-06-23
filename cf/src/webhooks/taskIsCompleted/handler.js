import gql from 'graphql-tag';

const UPDATE_TASK = gql`
  mutation UpdateTask($data: TaskUpdateInput!) {
    taskUpdate(data: $data) {
      id
      completed
      name
      user {
        id
        email
      }
    }
  }
`;

module.exports = async (event, ctx) => {
  const data = JSON.parse(event.body);
  const { task, token } = data;

  const options = {
    headers: {
      Authorization: `Bearer ${token}`
    },
  };
  
  try {
    const taskUpdated = await ctx.api.gqlRequest(UPDATE_TASK, {
      data: task
    }, options);

    return {
      statusCode: 200,
      body: JSON.stringify({
        data: taskUpdated
      }),
    };
  } catch (error) {
    return {
      statusCode: 422,
      body:JSON.stringify({ error }),
    };
  }
};
