import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft } from '@fortawesome/free-solid-svg-icons';
import logo from '../../assets/logo.png';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const OPENED_WIDTH_PX = 191;
const CLOSED_WIDTH_REM = 4.6;
const REM_TO_PX_RATIO = 16;
const CLOSED_WIDTH_PX = CLOSED_WIDTH_REM * REM_TO_PX_RATIO;
const INITIAL_MARGIN_LEFT_PX = 75;

const SidebarContainer = styled.div`
  background-color: ${(props) => {
    if (props.$color === 'light') {
      return 'var(--color-sidebar-background-light-default)';
    } else {
      return 'var(--color-sidebar-background-dark-default)';
    }
  }};

  border-radius: 15px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  margin-top: 80px;
  padding: 20px 0 30px 17px;
  box-sizing: border-box;
  box-shadow: 0 0 0 2px #e2e8f0, 0 0 0 3px #ffffff;

  box-shadow: ${(props) => {
    if (props.$color === 'light') {
      return '0 0 0 2px var(--color-button-background-light-active), 0 0 0 3px var(--color-sidebar-background-light-default);';
    } else {
      return '0 0 0 2px var(--color-button-background-dark-active), 0 0 0 3px var(--color-sidebar-background-dark-default);';
    }
  }};

  overflow: ${(props) => (props.$isOpened ? 'hidden' : 'visible')};

  transition: width 0.3s ease-out, margin-left 0.3s ease-out;

  width: ${(props) =>
    props.$isOpened ? `${OPENED_WIDTH_PX}px` : `${CLOSED_WIDTH_REM}rem`};

  margin-left: ${(props) => {
    if (props.$isOpened) {
      return `${INITIAL_MARGIN_LEFT_PX}px`;
    } else {
      const widthDecrease = OPENED_WIDTH_PX - CLOSED_WIDTH_PX;
      return `${INITIAL_MARGIN_LEFT_PX + widthDecrease / 2}px`;
    }
  }};
`;

const ToggleButton = styled.div`
  width: 25px;
  height: 25px;
  margin-left: 40px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  z-index: 100;
  position: absolute;
  transition: background 0.3s ease-out;
  top: -3px;
  right: ${(props) => (props.$isOpened ? '-65px' : '-50px')};

  background: ${(props) => {
    if (props.$color == 'light') {
      return props.$isOpened
        ? 'var(--color-button-background-light-active)'
        : 'var(--color-button-background-light-default)';
    } else {
      return props.$isOpened
        ? 'var(--color-button-background-dark-active)'
        : 'var(--color-button-background-dark-default)';
    }
  }};
`;

const AnimatedFontAwesomeIcon = styled(FontAwesomeIcon)`
  color: ${(props) => {
    if (props.$color === 'light') {
      return 'var( --color-text-light-default)';
    } else {
      return 'var(--color-text-dark-default)';
    }
  }};

  transition: transform 0.5s ease-in-out;
  transform: rotate(${(props) => (props.$isOpened ? '0deg' : '180deg')});
`;

const routes = [
  { title: 'Home', icon: 'fas-solid fa-house', path: '/' },
  { title: 'Sales', icon: 'chart-line', path: '/sales' },
  { title: 'Costs', icon: 'chart-column', path: '/costs' },
  { title: 'Payments', icon: 'wallet', path: '/payments' },
  { title: 'Finances', icon: 'chart-pie', path: '/finances' },
  { title: 'Messages', icon: 'envelope', path: '/messages' },
];

const RouteLogoText = styled.span`
  color: ${(props) => {
    if (props.$color === 'light') {
      return 'var(--color-text-light-active)';
    } else {
      return 'var(--color-text-dark-active)';
    }
  }};

  display: inline-block;
  margin-top: -2px;
  margin-left: 12px;
  font-size: 13px;
  vertical-align: middle;

  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  opacity: ${(props) => (props.$isOpened ? 1 : 0)};
  transition: opacity 0.3s ease-out;
  pointer-events: ${(props) => (props.$isOpened ? 'auto' : 'none')};

  max-width: ${(props) => (props.$isOpened ? '150px' : '0')};
  transition: max-width 0.3s ease-out, opacity 0.3s ease-out;
`;

const RouteText = styled.span`
  color: ${(props) => {
    if (props.$color === 'light') {
      return '#394e6b';
    } else {
      return '#bdd0eb';
    }
  }};

  display: inline-block;
  margin-top: -2px;
  margin-left: 12px;
  font-size: 13px;
  vertical-align: middle;

  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  opacity: ${(props) => (props.$isOpened ? 1 : 0)};
  pointer-events: ${(props) => (props.$isOpened ? 'auto' : 'none')};

  max-width: ${(props) => (props.$isOpened ? '150px' : '0')};
  transition: max-width 0.3s ease-out, opacity 0.3s ease-out;
`;

const RouteItem = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  font-size: 13px;
  transition: color 0.3s ease, width 0.3s ease-out;
  width: ${(props) => (props.$isOpened ? '156px' : '36px')};
  padding: 7px 12px;
  box-sizing: border-box;
  border-radius: 10px;
  overflow: hidden;

  & + & {
    margin-top: 14px;
  }

  &:hover {
    background-color: ${(props) => {
      if (props.$color === 'light') {
        return 'var(--color-sidebar-background-light-hover)';
      } else {
        return 'var(--color-sidebar-background-dark-hover)';
      }
    }};
  }

  &:hover span {
    color: ${(props) => {
      if (props.$color === 'light') {
        return '#212f45';
      } else {
        return '#ffffff';
      }
    }};
  }

  &:hover .svg-inline--fa {
    color: ${(props) => {
      if (props.$color === 'light') {
        return '#212f45';
      } else {
        return '#ffffff';
      }
    }};
  }

  &:active {
    background-color: ${(props) => {
      if (props.$color === 'light') {
        return 'var(--color-sidebar-background-light-active)';
      } else {
        return 'var(--color-sidebar-background-dark-active)';
      }
    }};
  }

  &:active span {
    color: ${(props) => {
      if (props.$color === 'light') {
        return '#0000b5';
      } else {
        return '#ffffff';
      }
    }};
  }

  .svg-inline--fa {
    color: ${(props) => {
      if (props.$color === 'light') {
        return '#334866';
      } else {
        return '#bdd0eb';
      }
    }};

    font-size: 14px;
    flex-shrink: 0;
  }

  &:active .svg-inline--fa {
    color: ${(props) => {
      if (props.$color === 'light') {
        return '#0000b5';
      } else {
        return '#ffffff';
      }
    }};
  }

  ${RouteText} {
    flex-grow: 1;
    flex-shrink: 1;
    flex-basis: auto;
    min-width: 0;
  }
`;

const bottomRoutes = [
  { title: 'Settings', icon: 'sliders', path: '/settings' },
  { title: 'Support', icon: 'phone-volume', path: '/support' },
];

const dotsStyles = [
  { backgroundColor: '#ec6a5e' },
  { backgroundColor: '#f5bf4f', marginLeft: '6px' },
  { backgroundColor: '#61c554', marginLeft: '6px' },
];

const Sidebar = (props) => {
  const { color } = props;
  const [isOpened, setIsOpened] = useState(true);

  const goToRoute = (path) => {
    console.log(`going to "${path}"`);
  };

  const toggleSidebar = () => {
    setIsOpened((v) => !v);
  };

  return (
    <SidebarContainer $isOpened={isOpened} $color={color}>
      <div
        className='dots'
        style={{
          display: 'flex',
          justifyContent: 'flex-start',
          alignItems: 'center',
          marginBottom: '22px',
        }}
      >
        {dotsStyles.map((_, index) => (
          <div
            key={index}
            style={{
              width: '9px',
              height: '9px',
              borderRadius: '50%',
              ...dotsStyles[index],
            }}
          ></div>
        ))}
      </div>
      <div
        className='logo'
        style={{
          display: 'flex',
          justifyContent: 'flex-start',
          alignItems: 'center',
          marginBottom: '35px',
          position: 'relative',
          cursor: 'pointer',
        }}
      >
        <img
          src={logo}
          alt='TensorFlow logo'
          style={{ width: '32px', height: '23px' }}
        />
        <RouteLogoText $isOpened={isOpened} $color={color}>
          TensorFlow
        </RouteLogoText>
        <ToggleButton
          onClick={toggleSidebar}
          $isOpened={isOpened}
          $color={color}
        >
          <AnimatedFontAwesomeIcon
            icon={faAngleLeft}
            $isOpened={isOpened}
            $color={color}
          />
        </ToggleButton>
      </div>
      <div className='routes' style={{ marginBottom: '200px' }}>
        {routes.map((route) => (
          <RouteItem
            $isOpened={isOpened}
            $color={color}
            key={route.title}
            onClick={() => {
              goToRoute(route.path);
            }}
          >
            <FontAwesomeIcon icon={route.icon} />
            <RouteText $isOpened={isOpened} $color={color}>
              {route.title}
            </RouteText>
          </RouteItem>
        ))}
      </div>
      <div className='bottom-routes'>
        {bottomRoutes.map((route) => (
          <RouteItem
            $isOpened={isOpened}
            $color={color}
            key={route.title}
            onClick={() => {
              goToRoute(route.path);
            }}
          >
            <FontAwesomeIcon icon={route.icon} />
            <RouteText $isOpened={isOpened} $color={color}>
              {route.title}
            </RouteText>
          </RouteItem>
        ))}
      </div>
    </SidebarContainer>
  );
};

Sidebar.propTypes = {
  color: PropTypes.string,
};

export default Sidebar;
