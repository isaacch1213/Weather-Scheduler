'use client';
import Header from '@/components/Header';
import GitHubAuthForm from '@/components/GitHubAuthForm';

export default function LoginPage() {
  return (
    <>
      <Header />
      <main>
        <GitHubAuthForm />
      </main>
    </>
  );
}
