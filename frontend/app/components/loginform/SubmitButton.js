// SubmitButton.js
const SubmitButton = ({ isLoading }) => {
  return (
    <button
      type="submit"
      className={`${
        isLoading ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-600"
      } bg-blue-500 text-white rounded-md py-2 transition-colors duration-300`}
      disabled={isLoading}
    >
      {isLoading ? "Logging in..." : "Log In"}
    </button>
  );
};

export default SubmitButton;
