export const handleErrorResponse = async (response: Response) => {
  const contentType = response.headers.get('Content-Type');
  let errorMessage = 'Failed to fetch data';

  if (contentType?.includes('application/json')) {
    try {
      const errorData = await response.json();
      if (errorData?.error) errorMessage = errorData.error;
    } catch (e) {
      if (e instanceof Error) errorMessage = 'Error parsing JSON response';
    }
  } else if (contentType?.includes('text/plain')) {
    errorMessage = await response.text();
  } else {
    errorMessage = 'The server returned an unknown error format';
  }
  throw new Error(errorMessage);
};
