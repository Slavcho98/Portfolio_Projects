export const state = {
  credentials: {},
};

export async function handleFormSubmission(form) {
  const url = 'http://127.0.0.1:5000/api/authentication';

  const formData = new FormData(form);
  state.credentials = {
      username: formData.get('username'),
      password: formData.get('password'),
  };

  try {
      const response = await fetch(url, {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify(state.credentials),
      });

      if (!response.ok) {
          throw new Error('*Погрешно корисничко име или лозинка');
      }

      const data = await response.json();

      return data;
  } catch (error) {
      console.error(`${error} 💥💥💥`);
     throw error;
     
  }
}
