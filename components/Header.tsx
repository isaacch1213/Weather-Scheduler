/* 
standard header component for title of website and conditionally rendered buttons

fully made by Rohan
*/

'use client';
import { usePathname } from 'next/navigation';
import LogoutButton from './LogoutButton';
import ClearEventsButton from './ClearEventsButton';
import styled from 'styled-components';

const StyledHeader = styled.header`
  width: 100vw;
  height: 10vh;
  background-color: #a3d3f5;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StyledH2 = styled.h2`
  font-weight: 1000;
  font-size: 175%;
  color: #1b2a49;
`;

const HeaderButtonRight = styled.div`
  position: absolute;
  right: 3%;
`;

const HeaderButtonLeft = styled.div`
  position: absolute;
  left: 3%;
`;

export default function Header() {
  const pathname = usePathname();

  return (
    <StyledHeader>
      <StyledH2>Weather Planner</StyledH2>

      {pathname !== '/login' && (
        <HeaderButtonRight>
          <LogoutButton/>
        </HeaderButtonRight>
      )}
      {pathname !== '/login' && (
        <HeaderButtonLeft>
          <ClearEventsButton/>
        </HeaderButtonLeft>
      )}
    </StyledHeader>
  );
}
