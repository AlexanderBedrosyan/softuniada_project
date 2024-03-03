// SignupLink.js
import Link from "next/link";

const SignupLink = () => {
  return (
    <p>
      Don't have an account yet?
      <Link href="/">
        <span className="text-blue-500 ml-2">Sign Up</span>
      </Link>
    </p>
  );
};

export default SignupLink;
