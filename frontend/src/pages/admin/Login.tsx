import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { login } from '../../services/authService';

export default function AdminLogin() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await login(email, password);
      navigate('/admin');
    } catch (err: any) {
      setError(err?.response?.data?.message || 'No pudimos iniciar sesión. Revisá tus datos.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center p-6 selection:bg-[#ff3c00] selection:text-white relative overflow-hidden">
      {/* Elemento gráfico de fondo */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-[120%] pointer-events-none opacity-20">
        <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="w-full h-full fill-white/10">
          <polygon points="0,0 100,50 0,100" />
        </svg>
      </div>

      <div className="w-full max-w-md relative z-10">
        <div className="mb-8 flex flex-col items-center">
          <Link to="/" className="font-display text-3xl uppercase tracking-tighter text-white hover:text-[#ff3c00] transition-colors mb-2">
            GM EVENTS
          </Link>
          <div className="bg-[#ff3c00] text-black px-3 py-1 font-mono text-xs uppercase font-bold tracking-widest">
            SISTEMA DE ADMINISTRACIÓN
          </div>
        </div>

        <div className="bg-[#f5f1e8] border-4 border-white shadow-[8px_8px_0px_#ff3c00] p-8 lg:p-10 relative">
          
          <h1 className="font-display text-4xl lg:text-5xl uppercase tracking-tighter text-black leading-none mb-2">
            ACCESO<br/>
            <span className="text-black/30">RESTRINGIDO</span>
          </h1>
          <p className="font-mono text-xs text-neutral-600 mb-8 uppercase tracking-widest font-bold">
            Identificación requerida para operar la cartelera
          </p>

          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            {error && (
              <div className="bg-black text-[#ff3c00] p-4 font-mono text-xs font-bold uppercase tracking-widest border-l-4 border-[#ff3c00]">
                ERR: {error}
              </div>
            )}

            <div className="flex flex-col gap-2">
              <label className="font-mono text-[10px] text-black uppercase tracking-widest font-black">
                Identidad (Email)
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoFocus
                required
                className="bg-transparent border-b-2 border-black/20 focus:border-[#ff3c00] outline-none text-xl font-display text-black px-0 py-2 transition-colors rounded-none placeholder-black/20"
                placeholder="admin@eventostucuman.com"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="font-mono text-[10px] text-black uppercase tracking-widest font-black">
                Clave de Seguridad
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="bg-transparent border-b-2 border-black/20 focus:border-[#ff3c00] outline-none text-xl font-mono text-black px-0 py-2 transition-colors rounded-none placeholder-black/20 tracking-[0.3em]"
                placeholder="••••••••"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="mt-6 w-full bg-black text-white py-4 font-display text-2xl uppercase tracking-widest hover:bg-[#ff3c00] hover:text-black transition-all disabled:opacity-50 border-2 border-black hover:shadow-[4px_4px_0px_#000]"
            >
              {loading ? 'VERIFICANDO...' : 'INICIAR SESIÓN ↗'}
            </button>
          </form>

        </div>
        
        <div className="mt-8 text-center text-[10px] text-neutral-500 font-mono uppercase tracking-widest">
          ESTRICTAMENTE CONFIDENCIAL • GM EVENTS VOL. 2026
        </div>
      </div>
    </div>
  );
}
