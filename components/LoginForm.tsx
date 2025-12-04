'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { loginOrRegister } from '@/lib/mockAuth';
import styled from 'styled-components';

const LoginContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 50vh;
`;

const LoginBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.3rem;
`;

const StyledLabel = styled.label`
  font-size: 0.75rem;
  font-family: 'Quicksand', sans-serif;
  color: #1b2a49;
`;

const StyledH4 = styled.h4`
  font-weight: 700;
  color: #1b2a49;
  text-align: center;
  font-size: 1.25rem;
  padding: 0.5rem;
`;

const StyledButton = styled.button`
  background-color: #1e3a8a;
  color: white;
  border: none;
  border-radius: 10px;
  padding: 0.6rem 1.2rem;
  font-size: 1rem;
  cursor: pointer;

  display: block;
  margin: 0.5rem auto 0 auto;

  &:hover {
    background-color: #3459c0;
  }
`;

export default function LoginForm() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const result = await loginOrRegister(username.trim(), password.trim());

    if (result === 'success') {
      localStorage.setItem('user', username);
      router.push('/dashboard');
    } else if (result === 'incorrect') {
      setError('Incorrect password');
    } else if (result === 'empty') {
      setError('Please enter a password');
    }
  };

  return (
    <LoginContainer>
    <LoginBox>
    <StyledH4>Log In / Register</StyledH4>
    <form onSubmit={handleSubmit}>
      <StyledLabel>
        <div>Username:</div>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
      </StyledLabel>
      <br />
      <StyledLabel>
        <div><p>Password:</p></div>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </StyledLabel>
      <br />
      <StyledButton type="submit" style={{ display: 'block', margin: '0.5rem auto 0 auto'}}>Go!</StyledButton>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </form>
    </LoginBox>
    </LoginContainer>
  );
}
