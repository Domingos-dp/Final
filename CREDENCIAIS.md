# Credenciais para Acesso - Angola Travel Platform

## Usuários de Teste Disponíveis

Para acessar as páginas de autenticação e dashboard, você pode usar as seguintes credenciais de teste:

### 1. Host/Anfitrião - João Silva
- **Email:** `joao.silva@email.com`
- **Senha:** `123456` (padrão para desenvolvimento)
- **Tipo:** Host/Anfitrião
- **Permissões:** Acesso ao dashboard de host, gerenciamento de propriedades
- **Status:** Verificado

### 2. Usuário Regular - Maria Santos
- **Email:** `maria.santos@email.com`
- **Senha:** `123456` (padrão para desenvolvimento)
- **Tipo:** Usuário regular
- **Permissões:** Dashboard de usuário, reservas, avaliações
- **Status:** Verificado

### 3. Super Host - Carlos Mendes
- **Email:** `carlos.mendes@email.com`
- **Senha:** `123456` (padrão para desenvolvimento)
- **Tipo:** Super Host
- **Permissões:** Dashboard avançado de host, múltiplas propriedades
- **Status:** Verificado, Super Host

### 4. Usuário Regular - Ana Costa
- **Email:** `ana.costa@email.com`
- **Senha:** `123456` (padrão para desenvolvimento)
- **Tipo:** Usuário regular
- **Permissões:** Dashboard básico de usuário
- **Status:** Verificado

### 5. Usuário Regular - Pedro Oliveira
- **Email:** `pedro.oliveira@email.com`
- **Senha:** `123456` (padrão para desenvolvimento)
- **Tipo:** Usuário regular
- **Permissões:** Dashboard básico de usuário
- **Status:** Verificado

### 6. Admin (Acesso Administrativo)
- **Email:** Qualquer email contendo "admin" (ex: `admin@angolatravel.com`)
- **Senha:** `123456` (padrão para desenvolvimento)
- **Tipo:** Administrador
- **Permissões:** Acesso completo ao painel administrativo
- **Status:** Acesso total ao sistema

## URLs de Acesso

### Páginas de Autenticação
- **Login:** `http://localhost:3002/auth/login`
- **Registro:** `http://localhost:3002/auth/register`
- **Recuperar Senha:** `http://localhost:3002/auth/forgot-password`

### Dashboards
- **Dashboard Usuário:** `http://localhost:3002/dashboard`
- **Dashboard Host:** `http://localhost:3002/host`
- **Painel Admin:** `http://localhost:3002/admin`
- **Perfil:** `http://localhost:3002/profile`
- **Chat:** `http://localhost:3002/chat`
- **Avaliações:** `http://localhost:3002/reviews`

## Notas Importantes

1. **Senha Padrão:** Todos os usuários de teste usam a senha `123456` para facilitar o desenvolvimento.

2. **Sistema Mock (Sem Backend Real):**
   - O sistema funciona inteiramente com dados simulados (mock data)
   - Não há servidor backend real rodando
   - A API está configurada para `http://localhost:3001/api` mas não é necessária
   - Todos os dados são carregados do arquivo `/src/data/mockData.ts`

3. **Dados Mock Incluem:**
   - 6 usuários de teste com diferentes perfis
   - 3 propriedades de exemplo (Villa, Apartamento, Lodge)
   - 2 experiências turísticas
   - Reservas simuladas
   - Avaliações de teste
   - Conversas de chat
   - Notificações
   - Estatísticas de dashboard

4. **Permissões:**
   - Usuários regulares: Acesso ao dashboard básico, podem fazer reservas
   - Hosts: Podem gerenciar propriedades e ver estatísticas de hospedagem
   - Super Hosts: Recursos avançados de host
   - Admins: Acesso total ao sistema (emails contendo "admin")

5. **Autenticação Simulada:**
   - O sistema simula autenticação JWT
   - Dados são armazenados no localStorage
   - Qualquer email dos usuários mock + senha `123456` funcionará
   - Para admin: qualquer email com "admin" + senha `123456`

6. **Desenvolvimento:**
   - As credenciais são apenas para ambiente de desenvolvimento
   - Em produção, implemente autenticação real com hash de senhas
   - Configure variáveis de ambiente para segurança
   - Substitua os dados mock por API real

## Como Testar

1. **Certifique-se que o servidor está rodando:**
   ```bash
   npm run dev
   ```
   O servidor deve estar disponível em `http://localhost:3002`

2. **Acesse a página de login:**
   - URL: `http://localhost:3002/auth/login`

3. **Use as credenciais de teste:**
   - Email: qualquer um dos emails listados acima
   - Senha: `123456`

4. **Você será redirecionado automaticamente:**
   - Usuários regulares → `/dashboard`
   - Hosts → `/host` (se disponível) ou `/dashboard`
   - Admins → `/admin`

5. **Teste diferentes funcionalidades:**
   - Navegue entre as páginas
   - Teste o chat, reservas, avaliações
   - Todos os dados são simulados e funcionais

## Funcionalidades Disponíveis por Tipo de Usuário

### Usuário Regular
- Visualizar e fazer reservas
- Gerenciar perfil
- Chat com hosts
- Deixar avaliações
- Ver histórico de viagens

### Host/Super Host
- Todas as funcionalidades de usuário
- Gerenciar propriedades
- Ver estatísticas de ocupação
- Responder avaliações
- Dashboard de earnings

### Admin
- Acesso total ao sistema
- Gerenciar usuários
- Moderar conteúdo
- Ver estatísticas globais
- Configurações do sistema