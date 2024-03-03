// LoginForm.js
const LoginForm = ({
  setUsername,
  setPassword,
  errors,
  username,
  password,
}) => {
  return (
    <>
      <input
        type="text"
        placeholder="example@example"
        name="username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-blue-500"
      />
      {errors.username && (
        <span className="text-red-500">{errors.username}</span>
      )}{" "}
      {/* Display username error */}
      <input
        type="password"
        placeholder="Password"
        name="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-blue-500"
      />
      {errors.password && (
        <span className="text-red-500">{errors.password}</span>
      )}{" "}
      {/* Display password error */}
    </>
  );
};

export default LoginForm;
