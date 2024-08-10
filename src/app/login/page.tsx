'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleLogin = async () => {
    try {
      const response = await fetch('http://localhost:8000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username,
          password,
        }),
      });
  
      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || 'Login failed');
      }
  
      const data = await response.json();
      console.log(data); // トークンを取得
  
      // トークンをローカルストレージやクッキーに保存する場合
      localStorage.setItem('token', data.access_token);
  
      // ログイン成功後のリダイレクト
      router.push('/dashboard'); // 例えばダッシュボードページにリダイレクト
    } catch (error: any) {
      setError(error.message);
    }
  };
  

  return (
    <div>
      <h1>Login</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Username"
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
      />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
};

export default LoginPage;
    