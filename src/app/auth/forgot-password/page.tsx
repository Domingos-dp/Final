'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { 
  Mail, 
  ArrowRight,
  ArrowLeft,
  Check,
  Clock
} from 'lucide-react';
import { CustomButton as Button } from '@/components/ui/button-custom';
import { Card } from '@/components/ui/Card';
import { CustomInput as Input } from '@/components/ui/input-custom';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isEmailSent, setIsEmailSent] = useState(false);
  const [error, setError] = useState('');
  const [countdown, setCountdown] = useState(0);

  const validateEmail = (email: string) => {
    return /\S+@\S+\.\S+/.test(email);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email) {
      setError('Email é obrigatório');
      return;
    }
    
    if (!validateEmail(email)) {
      setError('Email inválido');
      return;
    }
    
    setError('');
    setIsLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      console.log('Password reset request for:', email);
      setIsEmailSent(true);
      startCountdown();
    } catch (error) {
      console.error('Password reset error:', error);
      setError('Erro ao enviar email. Tente novamente.');
    } finally {
      setIsLoading(false);
    }
  };

  const startCountdown = () => {
    setCountdown(60);
    const timer = setInterval(() => {
      setCountdown(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const handleResendEmail = () => {
    if (countdown > 0) return;
    
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      startCountdown();
    }, 1000);
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    if (error) setError('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-secondary-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Back Button */}
          <div className="mb-6">
            <Link 
              href="/auth/login" 
              className="inline-flex items-center text-primary-600 hover:text-primary-500 transition-colors"
            >
              <ArrowLeft size={20} className="mr-2" />
              Voltar ao login
            </Link>
          </div>

          {!isEmailSent ? (
            <>
              {/* Header */}
              <div className="text-center mb-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-2 font-serif">
                  Esqueceu sua senha?
                </h1>
                <p className="text-gray-600">
                  Não se preocupe! Digite seu email e enviaremos 
                  instruções para redefinir sua senha.
                </p>
              </div>

              <Card className="p-8">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <Input
                      type="email"
                      placeholder="Seu email"
                      value={email}
                      onChange={handleEmailChange}
                      icon={<Mail size={20} />}
                      error={error}
                      required
                    />
                  </div>

                  <Button
                    type="submit"
                    className="w-full"
                    size="lg"
                    loading={isLoading}
                    icon={!isLoading ? <ArrowRight size={20} /> : undefined}
                  >
                    {isLoading ? 'Enviando...' : 'Enviar instruções'}
                  </Button>
                </form>

                {/* Additional Help */}
                <div className="mt-6 text-center">
                  <p className="text-sm text-gray-600 mb-4">
                    Lembrou da sua senha?
                  </p>
                  <Link 
                    href="/auth/login" 
                    className="text-primary-600 hover:text-primary-500 font-medium transition-colors"
                  >
                    Fazer login
                  </Link>
                </div>
              </Card>
            </>
          ) : (
            <>
              {/* Success State */}
              <div className="text-center mb-8">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Check className="text-green-600" size={32} />
                </div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2 font-serif">
                  Email enviado!
                </h1>
                <p className="text-gray-600">
                  Enviamos instruções para redefinir sua senha para:
                </p>
                <p className="text-primary-600 font-medium mt-2">
                  {email}
                </p>
              </div>

              <Card className="p-8">
                <div className="text-center space-y-6">
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <div className="flex items-center justify-center mb-2">
                      <Mail className="text-blue-600 mr-2" size={20} />
                      <span className="text-blue-800 font-medium">Verifique sua caixa de entrada</span>
                    </div>
                    <p className="text-blue-700 text-sm">
                      O email pode levar alguns minutos para chegar. 
                      Não esqueça de verificar sua pasta de spam.
                    </p>
                  </div>

                  <div className="space-y-4">
                    <p className="text-gray-600 text-sm">
                      Não recebeu o email?
                    </p>
                    
                    <Button
                      variant="outline"
                      className="w-full"
                      onClick={handleResendEmail}
                      disabled={countdown > 0 || isLoading}
                      loading={isLoading}
                      icon={countdown > 0 ? <Clock size={20} /> : <Mail size={20} />}
                    >
                      {countdown > 0 
                        ? `Reenviar em ${countdown}s` 
                        : isLoading 
                        ? 'Reenviando...' 
                        : 'Reenviar email'
                      }
                    </Button>
                  </div>

                  <div className="pt-4 border-t border-gray-200">
                    <p className="text-sm text-gray-600 mb-4">
                      Ainda com problemas?
                    </p>
                    <div className="space-y-2">
                      <Link 
                        href="/support" 
                        className="block text-primary-600 hover:text-primary-500 transition-colors text-sm"
                      >
                        Entrar em contato com o suporte
                      </Link>
                      <Link 
                        href="/auth/login" 
                        className="block text-gray-600 hover:text-gray-500 transition-colors text-sm"
                      >
                        Voltar ao login
                      </Link>
                    </div>
                  </div>
                </div>
              </Card>
            </>
          )}

          {/* Footer */}
          <div className="mt-8 text-center text-sm text-gray-500">
            <p>
              Precisa de ajuda?{' '}
              <Link href="/support" className="text-primary-600 hover:underline">
                Entre em contato conosco
              </Link>
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}