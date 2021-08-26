import Link from "next/link";
import classes from "./MainNav.module.css";
import Logo from "./Logo";

function MainNav() {
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
          <li>
            <Link href="/posts">Posts</Link>
          </li>
          <li>
            <Link href="/contact">Contact Me</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default MainNav;
