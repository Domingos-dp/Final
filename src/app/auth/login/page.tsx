"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Eye, EyeOff, Mail, Lock, ArrowRight, Chrome, Facebook, Apple, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Checkbox } from '@/components/ui/checkbox';
import { useAuth } from '@/hooks/useAuth';
import { isValidEmail } from '@/utils';
import { toast } from 'sonner';

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});

  const { login } = useAuth();
  const router = useRouter();

  const validateForm = () => {
    const newErrors: { email?: string; password?: string } = {};
    if (!email) newErrors.email = 'Email é obrigatório';
    else if (!isValidEmail(email)) newErrors.email = 'Email inválido';

    if (!password) newErrors.password = 'Senha é obrigatória';
    else if (password.length < 6) newErrors.password = 'Senha muito curta';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);
    try {
      await login({ email, password, rememberMe });
      toast.success('Login realizado com sucesso');
      router.push('/dashboard');
    } catch {
      toast.error('Credenciais inválidas');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex bg-background">
      <div className="flex-1 flex items-center justify-center p-8">
        <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-md">
          <div className="text-center mb-6">
            <h1 className="text-2xl font-bold">Bem-vindo de volta</h1>
            <p className="text-muted-foreground">Entre na sua conta para continuar</p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="text-center">Entrar</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-2">
                <Button variant="outline" onClick={() => toast('Login social não implementado')} disabled={isLoading}> 
                  <Chrome className="w-4 h-4 mr-2" /> Continuar com Google
                </Button>
                <Button variant="outline" onClick={() => toast('Login social não implementado')} disabled={isLoading}> 
                  <Facebook className="w-4 h-4 mr-2" /> Continuar com Facebook
                </Button>
                <Button variant="outline" onClick={() => toast('Login social não implementado')} disabled={isLoading}> 
                  <Apple className="w-4 h-4 mr-2" /> Continuar com Apple
                </Button>
              </div>

              <div className="relative">
                <div className="absolute inset-0 flex items-center"><Separator className="w-full" /></div>
                <div className="relative flex justify-center text-xs uppercase"><span className="bg-background px-2 text-muted-foreground">ou</span></div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="email">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4" />
                    <Input id="email" type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="seu@email.com" className="pl-10" disabled={isLoading} />
                  </div>
                  {errors.email && <p className="text-sm text-destructive">{errors.email}</p>}
                </div>

                <div>
                  <Label htmlFor="password">Senha</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4" />
                    <Input id="password" type={showPassword ? 'text' : 'password'} value={password} onChange={e => setPassword(e.target.value)} placeholder="Sua senha" className="pl-10 pr-10" disabled={isLoading} />
                    <button type="button" className="absolute right-3 top-1/2 -translate-y-1/2" onClick={() => setShowPassword(s => !s)} disabled={isLoading}>{showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}</button>
                  </div>
                  {errors.password && <p className="text-sm text-destructive">{errors.password}</p>}
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Checkbox id="remember" checked={rememberMe} onCheckedChange={(c) => setRememberMe(Boolean(c))} />
                    <Label htmlFor="remember" className="text-sm">Lembrar-me</Label>
                  </div>
                  <Link href="/auth/forgot-password" className="text-sm text-primary hover:underline">Esqueceu a senha?</Link>
                </div>

                <Button type="submit" className="w-full" disabled={isLoading}>{isLoading ? 'Entrando...' : <>Entrar <ArrowRight className="w-4 h-4 ml-2"/></>}</Button>
              </form>

              <div className="text-center text-sm">
                Ainda não tem conta? <Link href="/auth/register" className="text-primary font-medium hover:underline">Criar conta</Link>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      <div className="hidden lg:flex flex-1 relative overflow-hidden bg-gradient-to-br from-primary to-secondary text-white p-12">
        <div className="max-w-lg">
          <h2 className="text-3xl font-bold mb-4">Explore Angola</h2>
          <p className="text-lg mb-6 text-white/90">Descubra acomodações, experiências e guias locais. Planeje sua viagem com facilidade.</p>
          <div className="space-y-3">
            <div className="flex items-center space-x-3"><div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center"><MapPin className="w-4 h-4" /></div><span>Mais de 1.200 acomodações</span></div>
            <div className="flex items-center space-x-3"><div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center"><MapPin className="w-4 h-4" /></div><span>Guias locais e experiências</span></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;