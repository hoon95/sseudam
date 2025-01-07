import { useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useUserStore } from "@store/store";
import { logout } from "@services/auth";
import { getCurrentUser } from "@services/auth";
import { Avatar } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import useScrollTrigger from "@mui/material/useScrollTrigger";
import Slide from "@mui/material/Slide";
import { HeaderContainer } from "./Header.styled";

interface Props {
  window?: () => Window;
  children?: React.ReactElement;
}

const HideOnScroll = (props: Props) => {
  const { children, window } = props;
  const trigger = useScrollTrigger({
    target: window ? window() : undefined,
  });

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children || <div />}
    </Slide>
  );
};

const HeaderList = () => {
  const { userLogin, profile, username, setUserData, setRecentSns } =
    useUserStore();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const { user } = await getCurrentUser();

        if (user) {
          setUserData(
            true,
            user.user_metadata?.avatar_url,
            user.user_metadata?.full_name,
          );
          setRecentSns(user.app_metadata?.provider);

          if (user.app_metadata.provider === "email") {
            setUserData(true, null, "관리자");
          }
        }
      } catch (err) {
        console.error(err);
      }
    };

    fetchUser();
  }, [setUserData, setRecentSns]);

  const handleLogout = async () => {
    try {
      useUserStore.getState().setUserData(false, null, null);
      await logout();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <ul>
      <li>
        <NavLink
          to="/search"
          className={({ isActive }) => (isActive ? "active" : "")}
        >
          반려동물 찾기
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/share"
          className={({ isActive }) => (isActive ? "active" : "")}
        >
          일상 공유
        </NavLink>
      </li>
      <li className="login">
        {userLogin ? (
          <>
            <Avatar src={profile ?? undefined} alt="사용자 프로필사진" />
            <p>{username} 님</p>
            <p onClick={handleLogout} className="logout">
              로그아웃
            </p>
          </>
        ) : (
          <NavLink
            to="/login"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            로그인&가입하기
          </NavLink>
        )}
      </li>
    </ul>
  );
};

export const Header = (props: Props) => {
  return (
    <HeaderContainer>
      <HideOnScroll {...props}>
        <AppBar sx={{ bgcolor: "var(--light)" }}>
          <Toolbar>
            <section className="box">
              <h1>
                <NavLink to="/" className="logo">
                  쓰담
                </NavLink>
              </h1>
              <HeaderList />
            </section>
          </Toolbar>
        </AppBar>
      </HideOnScroll>
    </HeaderContainer>
  );
};
