import Info from "../components/info/Info";
import { ProfilePageLayout } from "../components/styles/layout/ProfilePageLayout";
import UserInfo from "../components/user/UserInfo";
import { useAppSelector } from "../store";

function Profile() {
  const {
    userId: _id,
    userEmail: email,
    userRole: role,
    userUsername: username,
  } = useAppSelector((state) => state.user);

  return _id && email && role && username ? (
    <ProfilePageLayout>
      <Info>
        Before updating the user credentials, please make sure that you are
        entering the correct information. Incorrect user information can result
        in permanent loss of access to your account. To avoid this, please
        double check that the information you are entering is accurate and
        up-to-date. Thank you for your attention to this important matter.
      </Info>
      <UserInfo userData={{ _id, email, role, username }} />
    </ProfilePageLayout>
  ) : null;
}

export default Profile;
