import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../services/authService';
import cnMerge from './../utils/cnMerge';

export const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login(email, password);
      navigate('/');
    } catch (error) {
      setError('Falha ao fazer login, verifique suas credenciais.');
    }
  };

  return (
    <section className={cnMerge('ezy__signin1 light h-screen py-14 md:py-24 bg-white dark:bg-[#0b1727] text-zinc-900 dark:text-white')}>
      <div className="container mx-auto px-4 flex items-center justify-center">
        <div className={cnMerge('w-full max-w-lg bg-white dark:bg-slate-800 rounded-2xl shadow-xl')}>
          <div className={cnMerge('p-8 lg:p-10')}>
            <h2 className={cnMerge('text-3xl leading-none font-bold mb-8 text-center')}>Log In</h2>
            <form onSubmit={handleSubmit}>
              <div className={cnMerge('mb-6')}>
                <label className={cnMerge('block mb-2 font-normal')} htmlFor="email">Email Address</label>
                <input
                  type="email"
                  id="email"
                  className={cnMerge('w-full bg-blue-50 dark:bg-slate-700 min-h-[48px] leading-10 px-4 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600')}
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className={cnMerge('mb-6')}>
                <label className={cnMerge('block mb-2 font-normal')} htmlFor="password">Password</label>
                <input
                  type="password"
                  id="password"
                  className={cnMerge('w-full bg-blue-50 dark:bg-slate-700 min-h-[48px] leading-10 px-4 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600')}
                  placeholder="Senha"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              {error && <p className="text-red-500">{error}</p>}
              <button
                type="submit"
                className={cnMerge('bg-accent text-white py-3 px-6 rounded w-full hover:bg-indigo-700 transition duration-300')}
              >
                LogIn
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};
