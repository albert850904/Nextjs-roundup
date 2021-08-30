import { useState } from "react";
import { signIn } from "next-auth/client";
import classes from "./AuthForm.module.css";
import { useRouter } from "next/router";

async function createUserHandler(email, password) {
  const result = await fetch("/api/auth/signup", {
    method: "POST",
    body: JSON.stringify({ email, password }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await result.json();

  if (!result.ok) {
    throw new Error(data.message || "something went wrong");
  }

  return data;
}

function AuthForm() {
  const router = useRouter();
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function switchAuthModeHandler() {
    setIsLogin((prevState) => !prevState);
  }

  async function submitHandler(e) {
    e.preventDefault();
    if (isLogin) {
      // next auth 接到error 會自動redirect, 因此要關掉
      // signin 不會reject
      const result = await signIn("credentials", {
        redirect: false,
        email,
        password,
      });
      if (!result.error) {
        // set auth state (context / redux) >> reload 就會消失(因為開啟新的SPA)
        // next 會自動幫你加入一些cookie
        router.replace("/profile");
      }
    } else {
      try {
        const result = await createUserHandler(email, password);
        console.log(result);
      } catch (error) {
        console.log("error", error);
      }
    }
  }

  return (
    <section className={classes.auth}>
      <h1>{isLogin ? "Login" : "Sign Up"}</h1>
      <form onSubmit={submitHandler}>
        <div className={classes.control}>
          <label htmlFor="email">Your Email</label>
          <input
            type="email"
            id="email"
            required
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
        </div>
        <div className={classes.control}>
          <label htmlFor="password">Your Password</label>
          <input
            type="password"
            id="password"
            required
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </div>
        <div className={classes.actions}>
          <button>{isLogin ? "Login" : "Create Account"}</button>
          <button
            type="button"
            className={classes.toggle}
            onClick={switchAuthModeHandler}
          >
            {isLogin ? "Create new account" : "Login with existing account"}
          </button>
        </div>
      </form>
    </section>
  );
}

export default AuthForm;
