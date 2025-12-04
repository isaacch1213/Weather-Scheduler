'use client';
import { usePathname } from 'next/navigation';
import LogoutButton from './LogoutButton';
import ClearEventsButton from './ClearEventsButton';
import styled from 'styled-components';

const StyledHeader = styled.header`
  background-color: #a3d3f5;
  text-align: center;
  padding: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
`;

const StyledH2 = styled.h2`
  font-weight: 700;
  color: #1b2a49;
  text-align: center;
  font-size: 2rem;
`;

const HeaderButtonRight = styled.div`
  position: absolute;
  right: 1rem;
`;

const HeaderButtonLeft = styled.div`
  position: absolute;
  left: 1rem;
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
