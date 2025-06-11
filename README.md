# 🗂️ Projeto Kanban

## 📖 Sobre o Projeto

Este é um projeto de um quadro **Kanban** desenvolvido para otimizar o gerenciamento de tarefas em equipe.  
A aplicação permite a **criação, atribuição e acompanhamento** do progresso das atividades de forma intuitiva e organizada, com diferentes níveis de permissão para administradores e usuários comuns.

> O layout e a estrutura do projeto foram inspirados no template **Minimals UI**, buscando uma interface limpa, moderna e funcional.

---

## ✨ Funcionalidades Principais

### 🔐 Regras de Usuário

O sistema possui dois níveis de acesso com permissões distintas:

#### 👑 Admin
- Criar, editar e deletar tarefas (tasks).
- Atribuir tasks a qualquer usuário.
- Mover os cards de qualquer usuário entre as colunas do Kanban.
- **Exclusivo:** Apenas administradores podem mover um card para a coluna **"Completed"**.
- Visualizar o quadro Kanban de cada colaborador individualmente.

#### 👤 Usuário Comum
- Visualizar suas próprias tasks.
- Visualizar o Kanban dos demais usuários e administradores do time.
- Mover seus próprios cards e os cards de outros membros do time entre as colunas permitidas.

> ℹ️ **Observação:** Toda movimentação de card é registrada no banco de dados, indicando qual usuário realizou a ação.

---

### 🧩 Regras do Kanban

Para garantir a integridade do fluxo de trabalho, as seguintes regras foram implementadas:

- **Conteúdo do Card:** Cada card exibe a descrição da tarefa e sua respectiva data de entrega (_Due date_).
- **Movimentação de Cards:**  
  Um card só pode ser movido para a **coluna imediatamente seguinte ou anterior** à sua posição atual.  
  Exemplo: um card na coluna **"TESTING"** pode ser movido para **"DONE"** (próxima) ou **"DOING"** (anterior), mas **não diretamente para "TODO"**.
- **Conclusão de Tarefas:**  
  Apenas usuários com perfil de **Admin** podem mover um card para a coluna **"Completed"**, finalizando a tarefa.

---

## 💻 Tecnologias Utilizadas

Este projeto foi construído com as seguintes tecnologias:

- **React** – Biblioteca para construção de interfaces de usuário.
- **TypeScript** – Superset do JavaScript que adiciona tipagem estática.
- **Material-UI (MUI)** – Biblioteca de componentes React para UI moderna.
- **React Router** – Gerenciamento de rotas.
- **Axios** – Cliente HTTP baseado em Promises.
- **dnd-kit** – Biblioteca para funcionalidades de arrastar e soltar.
- **Iconify** – Biblioteca de ícones.

---

## 🚀 Como Rodar o Projeto

### ✅ Pré-requisitos

Antes de começar, você precisará ter instalado:

- [Git](https://git-scm.com)
- [Node.js](https://nodejs.org/)
- Gerenciador de pacote: **NPM**

### 📦 Passo a Passo

Clone o repositório:

```bash
git clone https://seulinkpararepositorio.com/seu-projeto.git
```

Acesse a pasta do projeto:

```bash
cd Kanban-Project
```
Intale as dependências:

```bash
npm install
```
Rode o projeto:

```bash
npm run dev
```

Acesse no navegador: http://localhost:5173


## 🤝 Colaboradores

Agradecemos às seguintes pessoas que contribuíram para este projeto:

<table>
  <tr>
    <td align="center">
      <a href="https://github.com/biellSouza2005" title="GitHub do Gabriel Souza">
        <img src="https://github.com/biellSouza2005.png" width="100px;" alt="Foto do Gabriel Souza no GitHub"/><br>
        <sub>
          <b>Gabriel Souza</b>
        </sub>
      </a>
    </td>
    <td align="center">
      <a href="https://github.com/GustavoAlvesValadao" title="GitHub do Gustavo Valadao">
        <img src="https://github.com/GustavoAlvesValadao.png" width="100px;" alt="Foto do Gustavo Valadao no GitHub"/><br>
        <sub>
          <b>Gustavo Valadao</b>
        </sub>
      </a>
    </td>
    <td align="center">
      <a href="https://github.com/ArthurBerthi505" title="GitHub do Arthur Berthi">
        <img src="https://github.com/ArthurBerthi505.png" width="100px;" alt="Foto do Arthur Berthi no GitHub"/><br>
        <sub>
          <b>Arthur Berthi</b>
        </sub>
      </a>
    </td>
    <td align="center">
      <a href="https://github.com/Freitasss2005" title="GitHub do Maria Freitas">
        <img src="https://github.com/Freitasss2005.png" width="100px;" alt="Foto do Maria Freitas no GitHub"/><br>
        <sub>
          <b>Maria Freitas</b>
        </sub>
      </a>
    </td>
  </tr>
</table>
