import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { useUserStore, useChatStore } from "@store/store";
import { logout } from "@services/auth";
import { getCurrentUser } from "@services/auth";
import { Avatar, Menu, MenuItem, ListItemIcon } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import LogoutIcon from "@mui/icons-material/Logout";
import TelegramIcon from "@mui/icons-material/Telegram";
import useScrollTrigger from "@mui/material/useScrollTrigger";
import Slide from "@mui/material/Slide";
import { HeaderContainer } from "./Header.styled";
import { getAdminUser } from "@services/auth";

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

  const { setIsOpen, setOpen } = useChatStore();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleNavigate = () => {
    setOpen(false);
    setIsOpen(true);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const { user } = await getCurrentUser();
        const { adminUser } = await getAdminUser(user.id);

        if (user) {
          setUserData(
            user.id,
            true,
            user.user_metadata?.avatar_url,
            user.user_metadata?.full_name,
          );
          setRecentSns(user.app_metadata?.provider);

          if (user.app_metadata.provider === "email") {
            setUserData(user.id, true, null, adminUser[0].center);
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
      <li>
        <NavLink
          to="/test"
          className={({ isActive }) => (isActive ? "active" : "")}
        >
          취향 테스트
        </NavLink>
      </li>
      <li className="login">
        {userLogin ? (
          <>
            <div className="profile" onClick={handleClick}>
              <Avatar src={profile ?? undefined} alt="사용자 프로필사진" />
              <p>{username} 님</p>
            </div>
            <Menu
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "center",
              }}
              transformOrigin={{
                vertical: "top",
                horizontal: "center",
              }}
            >
              <MenuItem onClick={handleClose}>{username} 님 환영해요!</MenuItem>
              <MenuItem onClick={handleNavigate}>
                <ListItemIcon>
                  <TelegramIcon fontSize="small" />
                </ListItemIcon>
                채팅 관리
              </MenuItem>
              <MenuItem onClick={handleLogout}>
                <ListItemIcon>
                  <LogoutIcon fontSize="small" />
                </ListItemIcon>
                로그아웃
              </MenuItem>
            </Menu>
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
