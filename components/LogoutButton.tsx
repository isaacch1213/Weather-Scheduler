/* 
component to allow users to sign out and return to login page

Isaac added logoutAction, all else is Rohan
*/

'use client';
import { logoutAction } from '@/lib/logout';
import styled from 'styled-components';

const StyledLogoutButton = styled.button`
  background-color: #1e3a8a;
  color: white;
  border: none;
  border-radius: 10px;
  padding: 20% 10%;
  font-size: 100%;
  cursor: pointer;
  font-family: 'Quicksand', sans-serif;
  white-space: nowrap; /* prevents text from wrapping */


  &:hover { /*changes background color when hovering over button */
    background-color: #3459c0;
  }
`;

export default function LogoutButton() {
  return (
    <form action={logoutAction}>
      <StyledLogoutButton type="submit">
        Log Out
      </StyledLogoutButton>
    </form>
  );
}
