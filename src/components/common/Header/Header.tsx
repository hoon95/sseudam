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
            <p className='logo'>쓰담</p>
          </Toolbar>
        </AppBar>
      </HideOnScroll>
    </HeaderContainer>
  );
}
