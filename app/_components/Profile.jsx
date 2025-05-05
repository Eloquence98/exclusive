"use client";

import { useSession } from "next-auth/react";

function Profile() {
  const session = useSession();

  if (session.data?.user) {
    return <div className="">FROM Client: {JSON.stringify(session.data.user)}</div>;
  }
  return <div className="">FROM Client: User is not signed in</div>;
}

export default Profile;
