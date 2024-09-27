<div align="center">

[Desafio](#📌-desafio) | [Sobre](#📄-sobre-o-projeto) | [Tecnologias](#🛠️-tecnologias-utilizadas) | [Instalação](#🚀-executando-o-projeto-localmente) | [API](#api) | [Autor](#autor)
</div>


# Tree View
**TRACTIAN Challenge - Engenheiro de Software Front End**


## 📌 Desafio:
**Criar uma aplicação de visualização de árvore performática que mostre os ativos das empresas.**

## 📄 Sobre o Projeto:
A aplicação permite de forma ``performática`` a visualização hierárquica dos ativos de uma empresa, incluindo componentes, ativos e localizações. A árvore suporta funcionalidades de filtragem e exibição responsiva para web, tablets e dispositivos móveis.

## ⚙️ Filtros:
- **Pesquisa por Texto:** Permite aos usuários buscar componentes, ativos e localizações específicas.
- **Sensores de Energia:** Filtro para isolar sensores de energia na árvore.
- **Sensores de Vibração:** Filtro para isolar sensores de vibração na árvore.
- **Status Crítico:** Filtro para identificar ativos com status crítico.
- **Status Operando:** Filtro para identificar ativos com status operando.

## 🛠️ Tecnologias Utilizadas:
- **[Typescript](https://github.com/topics/typescript)**
- **[React](https://github.com/topics/react)**
- **[Vite](https://github.com/topics/vite)**
- **[Tailwind CSS](https://github.com/topics/tailwindcss)**

## Principais Bibliotecas Utilizadas:
  - **Zustand**: Gerenciamento de estado leve e altamente performático.
  - **React Router Dom**: Facilita o roteamento dinâmico entre páfinas no React.
  - **Tailwind Variants**: Permite a criação eficiente de componentes com utilitários de estilo do Tailwind.
  - **React Query**: Gerencia o estado de dados assícronos e otimiza o controle de chamadas à API.


## 🚀 Executando o Projeto Localmente:

1. Clone o repositório:
```bash
git clone git@github.com:iigorfelipe/tree-view.git
```

2. Entre na pasta do projeto:
```bash
cd tree-view
```

3. Instale as dependências:
```bash
npm install
```

4. Execute o projeto:
```bash
npm run dev
```

⚠️ Certifique-se de ter o Node.js na versão ``14 ou superior`` instalado. Se encontrar qualquer dificuldade, sinta-se à vontade para me contatar através dos links fornecidos ao final desta documentação.

## API:
A aplicação utiliza uma API fake para obter os dados das empresas, localizações e ativos. A API e seus endpoints são:

- **`fake-api.tractian.com`:** api base

- **`/companies`:** Retorna todas as empresas
- **`/companies/:companyId/locations`:** Retorna todas as localizações de uma empresa
- **`/companies/:companyId/assets`:** Retorna todos os ativos de uma empresa


## Temas:
Suporte a tema ``claro`` e ``escuro``.

## Responsividade:
Interface adaptável para uso em **dispositivos móveis**, **tablets**, **laptops** e **desktop**;

## 🔗 Melhorias Futuras:
Se houvesse mais tempo, as seguintes melhorias poderiam ser implementadas:

- Funcionalidades Adicionais: 
  - Mais filtragens.
  - Botão para agrupar a árvore.
  - Adição de ativos.
  - Edição de ativos.
  - Icones extras nos ativos para melhor detalhadamento.
  - Menu lateral.
  - Notificações.

- UI/UX: Refinamentos na interface de usuário para melhorar a experiência do usuário e a usabilidade.

### Nota:
Este projeto é a segunda versão do [tractian-challenge](https://github.com/iigorfelipe/tractian-challenge), onde aprimorei o layout, adicionei mais opções de filtragem e foquei em melhorias de performance. Todas essas melhorias foram mencionadas na seção **"Melhorias Futuras"** da documentação da primeira versão.

## Autor

**@Igor Felipe**

[![Linkedin Badge](https://img.shields.io/badge/-LinkdedIn-blue?style=for-the-badge&logo=Linkedin&logoColor=white&link=https://www.linkedin.com/in/iigor-felipe/)](https://www.linkedin.com/in/iigor-felipe/)
[![Gmail Badge](https://img.shields.io/badge/-Gmail-c14438?style=for-the-badge&logo=Gmail&logoColor=white&link=mailto:iigorfelipe@gmail.com)](mailto:iigorfelipe@gmail.com)