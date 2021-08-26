import MainNav from "./MainNav";

function Layout(props) {
  return (
    <>
      <MainNav />
      <main>{props.children}</main>
    </>
  );
}

export default Layout;
