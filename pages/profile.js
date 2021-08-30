import { getSession } from "next-auth/client";
import UserProfile from "../components/profile/UserProfile";

function ProfilePage() {
  return <UserProfile />;
}

export async function getServerSideProps(context) {
  // context 在getServerSideProps可以access到request
  const result = await getSession({ req: context.req }); // 會檢查session cookie
  // result = null 代表not authenticated
  if (!result) {
    return {
      // notFound: true,
      redirect: {
        destination: "/auth",
        premanent: false, // 只有這次，下次如果有login就不要
      },
    };
  }

  return {
    props: { session: result },
  };
}

export default ProfilePage;
