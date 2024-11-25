import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../services/authService'; // Importando o serviço de login
import cnMerge from './../utils/cnMerge';

export const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate(); // Hook para navegação

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Chama o serviço de login
      await login(email, password);
      navigate('/'); // ou a rota que você definir após login
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
                  placeholder="Enter Email Address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)} // Atualiza o valor de email
                  required
                />
              </div>
              <div className={cnMerge('mb-6')}>
                <label className={cnMerge('block mb-2 font-normal')} htmlFor="password">Password</label>
                <input
                  type="password"
                  id="password"
                  className={cnMerge('w-full bg-blue-50 dark:bg-slate-700 min-h-[48px] leading-10 px-4 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600')}
                  placeholder="Enter Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)} // Atualiza o valor da senha
                  required
                />
              </div>
              {error && <p className="text-red-500">{error}</p>}
              <div className={cnMerge('mb-6 flex items-center justify-between')}>
                <div className={cnMerge('flex items-center')}>
                  <input type="checkbox" className={cnMerge('mr-2')} id="remember-me" />
                  <label className={cnMerge('font-normal')} htmlFor="remember-me">Remember me</label>
                </div>
                <a href="#" className={cnMerge('text-blue-600 hover:text-blue-800 text-sm')}>Forgot your password?</a>
              </div>
              <button
                type="submit"
                className={cnMerge('bg-indigo-900 text-white py-3 px-6 rounded w-full hover:bg-indigo-700 transition duration-300')}
              >
                Log In
              </button>
              <div className={cnMerge('text-center mt-6')}>
                <p className={cnMerge('opacity-50 text-sm')}>Não tem conta?</p>
                <a href="#" className={cnMerge('text-blue-600 hover:text-blue-800 font-medium')}>Criar Conta</a>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};
