const setError = (code, message) => {
  const error = new Error();
  error.code = code;
  error.message = message;
  console.log("Server launched or captured the following error:", error);
  return error;
};

module.exports = { setError };
