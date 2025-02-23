const ErrorMessage = ({ message }: { message: string }) => {
  return (
    <div className="mb-4 p-4 text-red-800 bg-red-200 rounded-md flex items-center">
      <span className="mr-2 text-xl">❗</span>
      <strong>Error: </strong>
      <span className="ml-2">{message}</span>
    </div>
  );
};

export default ErrorMessage;
