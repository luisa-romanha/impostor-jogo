# Documentação do Projeto: Impostor de Palavras 🕵️‍♂️📱

## 1. Visão Geral do Jogo

**Impostor de Palavras** é um jogo mobile-first de dedução social (estilo "party game") projetado para ser jogado localmente em grupo, utilizando apenas um único dispositivo (celular/smartphone) que é passado de mão em mão entre os jogadores.

**O Objetivo:** Todos os jogadores recebem a mesma palavra secreta baseada em uma categoria, exceto um jogador sorteado aleatoriamente: o **Impostor**. O objetivo dos jogadores normais é descobrir quem é o impostor através da discussão. O objetivo do impostor é disfarçar, tentar adivinhar a palavra pelo contexto da conversa e não ser votado.

## 2. Funcionalidades Principais

### Gestão de Jogadores

* Permite adicionar e remover jogadores de forma dinâmica.
* Validação de mínimo de **3 jogadores** para iniciar uma partida.
* Limite de **15 caracteres** para os nomes para evitar quebra de layout na tela.

### Banco de Palavras e Categorias

* Sistema de categorias temáticas: **Animais, Objetos, Comidas, Profissões, Lugares**.
* Opção de **"Categoria Aleatória"** para maior imprevisibilidade.
* Sorteio aleatório da palavra secreta dentro da categoria escolhida.

### Acessibilidade (Design Inclusivo)

* **Leitor de Voz (Text-to-Speech):** Um modo alternativo que lê em voz alta se o jogador é o impostor ou qual é a palavra. Ideal para jogadores com baixa visão, dislexia ou baixa escolaridade.
* **Feedback Háptico:** O dispositivo vibra no momento de revelar a palavra secreta, fornecendo um estímulo físico e feedback imediato de interação.
* **Alto Contraste e UI Limpa:** Cores semânticas fortes (verde para a palavra, vermelho para o alerta de impostor) e botões grandes (touch targets amigáveis).

## 3. Fluxo de Jogo (Passo a Passo)

O jogo funciona em um modelo de **"Máquina de Estados" (State Machine)**, garantindo que os jogadores não possam acidentalmente espiar a vez do outro.

1. **Fase de Preparação (Setup)**
* Inserção dos nomes.
* Ativação/desativação do Leitor de Voz.

2. **Escolha de Categoria**
* O grupo decide qual o tema da rodada.

3. **Fase de Revelação (Passagem do Celular)**
* A tela mostra um aviso pulsante: *"Passe o celular para [Nome]"*.
* O jogador confirma a identidade (*"Eu sou [Nome]"*).
* Toca no botão para revelar a palavra (ou o status de Impostor).
* Clica em **"Esconder e Passar"** antes de entregar ao próximo.

4. **Fase de Discussão**
* Os jogadores conversam e fazem perguntas sutis uns aos outros sobre a palavra.


5. **Fase de Votação Secreta**
* Semelhante à fase de revelação, o celular roda entre os jogadores.
* Cada um vota secretamente em quem suspeita ser o impostor.


6. **Resultados e Placar**
* Revelação do resultado da votação e de quem era realmente o impostor.
* Apresentação da palavra que estava em jogo.
* Distribuição dos pontos e exibição do ranking atualizado.


## 4. Sistema de Pontuação e Lógica de Vitória

A matemática dos resultados no final de cada rodada funciona da seguinte forma:

### 🔴 O Impostor é Descoberto (Derrota do Impostor)

> **Condição:** O Impostor foi o jogador que recebeu isoladamente o maior número de votos.

* **Recompensa:** Cada jogador normal que votou corretamente no Impostor ganha **+1 ponto**.

### 🟢 O Impostor Escapa (Vitória do Impostor)

> **Condição:** Outro jogador foi o mais votado, **OU** ocorreu um empate no primeiro lugar.

* **Recompensa:** O Impostor sobreviveu e ganha **+2 pontos**.


## 5. Arquitetura e Tecnologias

A aplicação foi desenvolvida sob os seguintes princípios técnicos:

| Camada | Tecnologia | Descrição |
| --- | --- | --- |
| **Framework** | React.js | Single Page Application |
| **Gestão de Estado** | `useState` | Controla o fluxo de telas (`stage`), dados da rodada e pontuações globais |
| **Estilização** | Tailwind CSS | Design responsivo com suporte a Dark Mode nativo |
| **Ícones** | `lucide-react` | Iconografia moderna e minimalista |

### APIs Nativas

* **`window.speechSynthesis`** — Funcionalidade de acessibilidade (Text-to-Speech).
* **`navigator.vibrate`** — Feedback tátil (Haptic Engine).