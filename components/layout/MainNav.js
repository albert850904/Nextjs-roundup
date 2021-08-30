import Link from "next/link";
import { useSession, signOut } from "next-auth/client";
import classes from "./MainNav.module.css";
import Logo from "./Logo";

function MainNav() {
  const [session, loading] = useSession(); // call /api/auth/session api
  // 檢查session cookie 是否valid

  const logoutHandler = () => {
    signOut(); // 會trigger useSession 改變，會清除cookie的session token
  };

  return (
    <header className={classes.header}>
      {/* 記得這樣link不會自動幫你建立一個anchor tag, 但會幫你pass down to 你自己寫的anchor */}
      <Link href="/">
        <a>
          <Logo />
        </a>
      </Link>
      <nav>
        <ul>
          {!session && !loading && (
            <li>
              <Link href="/auth">Login</Link>
            </li>
          )}
          <li>
            <Link href="/posts">Posts</Link>
          </li>
          <li>
            <Link href="/contact">Contact Me</Link>
          </li>
          {session && (
            <li>
              <Link href="/profile">Profile</Link>
            </li>
          )}
          {session && (
            <li>
              <button onClick={logoutHandler}>Logout</button>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
}

export default MainNav;
