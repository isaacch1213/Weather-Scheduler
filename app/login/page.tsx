/* login page, styled with "wallpaper" and contains auth */

'use client';
import Header from '@/components/Header';
import GitHubAuthForm from '@/components/GitHubAuthForm';
import styled from "styled-components";

/* tile background of cloud images for login page
slightly offset so it doesn't look weirdly organized
style done by Rohan
*/
export const CloudBackground = styled.div`
  min-height: 100vh;
  background-image: url('/cloud.png');
  background-repeat: repeat; /* horizontal and vertical tiling */
  background-size: 100px;;
  background-position: 20px 40px;
`;
export default function LoginPage() {
  return (
    <>
      <Header />
      <CloudBackground>
      <main>
        <GitHubAuthForm />
      </main>
      </CloudBackground>
    </>
  );
}
