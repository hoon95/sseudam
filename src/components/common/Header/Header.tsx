import { NavLink } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import useScrollTrigger from '@mui/material/useScrollTrigger';
import Slide from '@mui/material/Slide';
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
      { children || <div /> }
    </Slide>
  );
}

export const Header = (props: Props) => {
  return (
    <HeaderContainer>
      <HideOnScroll {...props}>
        <AppBar sx={{ bgcolor: 'var(--light)' }}>
          <Toolbar>
            <section className='box'>
              <h1>
                <NavLink to='/' className="logo">쓰담</NavLink>
              </h1>
              <ul>
                <li>
                  <NavLink to="/search" className={({ isActive }) => (isActive ? "active" : "")}>
                    반려동물 찾기
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/share" className={({ isActive }) => (isActive ? "active" : "")}>
                    일상 공유
                  </NavLink>
                </li>
                <li className="login">
                  <NavLink to="/login" className={({ isActive }) => (isActive ? "active" : "")}>
                    로그인/회원가입
                  </NavLink>
                </li>
              </ul>
            </section>

          </Toolbar>
        </AppBar>
      </HideOnScroll>
    </HeaderContainer>
  );
}
