import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "../schemas/userSchema";
import { useUser } from "../context/UserContext";
import { Link, useNavigate } from "react-router";

const Login = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(loginSchema), mode: "onTouched" });
  const { user, login, loading, error } = useUser();
  if (user) {
    navigate("/dashboard");
  }
  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-gray-800 p-8 rounded-xl shadow-md">
        <h1 className="text-2xl font-bold text-center text-cyan-400 mb-6">
          Login to TaskStorm
        </h1>
        <form onSubmit={handleSubmit(login)} className="space-y-4">
          <div>
            <label className="block text-gray-300 mb-1">Email</label>
            <input
              type="email"
              {...register("userEmail")}
              className="w-full px-4 py-2 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
            />
            {errors.userEmail && (
              <p className="text-red-400 text-sm mt-1">
                {errors.userEmail.message}
              </p>
            )}
          </div>
          <div>
            <label className="block text-gray-300 mb-1">Password</label>
            <input
              type="password"
              {...register("userPassword")}
              className="w-full px-4 py-2 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
            />
            {errors.userPassword && (
              <p className="text-red-400 text-sm mt-1">
                {errors.userPassword.message}
              </p>
            )}
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full py-2 mt-2 rounded-full font-semibold bg-cyan-700 text-white hover:bg-cyan-500 transition-transform hover:scale-105 shadow-md"
          >
            {loading ? "loading" : "Log In"}
          </button>
          {error && <p className="text-red-400 text-sm">{error}</p>}
        </form>
        <p className="text-center text-gray-400 mt-4 text-sm">
          Don't have an account?{" "}
          <Link to="/signup" className="text-cyan-400 hover:underline">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
