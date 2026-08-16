import { useState } from 'react';
import {
  UserPlus, Trash2, Volume2, VolumeX, Play, Eye, EyeOff,
  MessageCircle, Vote, Trophy, RotateCcw, AlertTriangle, ChevronRight, Home
} from 'lucide-react';
import { difficulties, getCategoryNames, getRandomWord } from './wordBank';

// ── helpers ───────────────────────────────────────────────────────────────────

function speak(text) {
  if (!window.speechSynthesis) return;
  window.speechSynthesis.cancel();
  const u = new SpeechSynthesisUtterance(text);
  u.lang = 'pt-BR';
  window.speechSynthesis.speak(u);
}

function vibrate() {
  if (navigator.vibrate) navigator.vibrate([200, 100, 200]);
}

// ── shared UI ─────────────────────────────────────────────────────────────────

function Screen({ children, onHome }) {
  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-start p-4 pb-10">
      <div className="w-full max-w-md">
        {onHome && (
          <div className="flex justify-end pt-2 pb-1">
            <button
              onClick={onHome}
              className="flex items-center gap-1.5 text-gray-400 hover:text-white text-sm transition-colors active:scale-95"
            >
              <Home size={16} /> Início
            </button>
          </div>
        )}
        {children}
      </div>
    </div>
  );
}

function BigButton({ onClick, children, color = 'indigo', disabled = false }) {
  const colors = {
    indigo: 'bg-indigo-600 hover:bg-indigo-500 disabled:bg-indigo-900',
    green:  'bg-green-600  hover:bg-green-500  disabled:bg-green-900',
    red:    'bg-red-600    hover:bg-red-500    disabled:bg-red-900',
    gray:   'bg-gray-600   hover:bg-gray-500   disabled:bg-gray-800',
    yellow: 'bg-yellow-600 hover:bg-yellow-500 disabled:bg-yellow-900',
  };
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`w-full py-4 px-6 rounded-2xl text-lg font-semibold transition-colors ${colors[color]} disabled:opacity-50 disabled:cursor-not-allowed active:scale-95`}
    >
      {children}
    </button>
  );
}

function Title({ children }) {
  return <h1 className="text-3xl font-bold text-center mb-6 mt-4">{children}</h1>;
}

// ── SetupScreen ───────────────────────────────────────────────────────────────

function SetupScreen({ players, setPlayers, voiceEnabled, setVoiceEnabled, onStart }) {
  const [nameInput, setNameInput] = useState('');

  function addPlayer() {
    const name = nameInput.trim();
    if (!name || players.some(p => p.name === name)) return;
    if (name.length > 15) return;
    setPlayers(prev => [...prev, { name, score: 0 }]);
    setNameInput('');
  }

  function removePlayer(name) {
    setPlayers(prev => prev.filter(p => p.name !== name));
  }

  return (
    <Screen>
      <Title>🕵️ Impostor de Palavras</Title>

      {/* voice toggle */}
      <div className="flex items-center justify-between bg-gray-800 rounded-2xl px-4 py-3 mb-6">
        <div className="flex items-center gap-2">
          {voiceEnabled
            ? <Volume2 size={20} className="text-indigo-400" />
            : <VolumeX size={20} className="text-gray-500" />}
          <span className="text-sm font-medium">Leitor de Voz</span>
        </div>
        <button
          onClick={() => setVoiceEnabled(v => !v)}
          className={`relative w-12 h-6 rounded-full transition-colors ${voiceEnabled ? 'bg-indigo-500' : 'bg-gray-600'}`}
        >
          <span className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${voiceEnabled ? 'left-7' : 'left-1'}`} />
        </button>
      </div>

      {/* add player */}
      <div className="flex gap-2 mb-4">
        <input
          type="text"
          value={nameInput}
          onChange={e => setNameInput(e.target.value.slice(0, 15))}
          onKeyDown={e => e.key === 'Enter' && addPlayer()}
          placeholder="Nome do jogador"
          maxLength={15}
          className="flex-1 bg-gray-800 rounded-xl px-4 py-3 text-white placeholder-gray-500 outline-none focus:ring-2 focus:ring-indigo-500"
        />
        <button
          onClick={addPlayer}
          disabled={!nameInput.trim()}
          className="bg-indigo-600 hover:bg-indigo-500 disabled:opacity-40 rounded-xl px-4 py-3 transition-colors active:scale-95"
        >
          <UserPlus size={20} />
        </button>
      </div>

      {/* player list */}
      {players.length > 0 && (
        <div className="bg-gray-800 rounded-2xl overflow-hidden mb-6">
          {players.map((p, i) => (
            <div
              key={p.name}
              className={`flex items-center justify-between px-4 py-3 ${i < players.length - 1 ? 'border-b border-gray-700' : ''}`}
            >
              <span className="font-medium">{p.name}</span>
              <button
                onClick={() => removePlayer(p.name)}
                className="text-gray-400 hover:text-red-400 transition-colors"
              >
                <Trash2 size={18} />
              </button>
            </div>
          ))}
        </div>
      )}

      {players.length < 3 && (
        <p className="text-gray-400 text-sm text-center mb-4">
          Adiciona pelo menos {3 - players.length} jogador{3 - players.length !== 1 ? 'es' : ''} para começar.
        </p>
      )}

      <BigButton onClick={onStart} disabled={players.length < 3} color="green">
        <span className="flex items-center justify-center gap-2">
          <Play size={20} /> Começar Jogo
        </span>
      </BigButton>
    </Screen>
  );
}

// ── DifficultyScreen ──────────────────────────────────────────────────────────

function DifficultyScreen({ onChoose, onHome }) {
  const config = {
    'Fácil':   { icon: '🟢', desc: 'Palavras simples e diretas' },
    'Médio':   { icon: '🟡', desc: 'Mais desafiador, com novas categorias' },
    'Difícil': { icon: '🔴', desc: 'Para quem já é craque no jogo' },
  };

  return (
    <Screen onHome={onHome}>
      <Title>Escolhe a Dificuldade</Title>
      <div className="flex flex-col gap-3">
        {difficulties.map(diff => (
          <button
            key={diff}
            onClick={() => onChoose(diff)}
            className="bg-gray-800 hover:bg-gray-700 active:scale-95 rounded-2xl py-5 px-5 flex items-center gap-4 transition-colors text-left"
          >
            <span className="text-4xl">{config[diff].icon}</span>
            <span>
              <span className="font-semibold text-lg block">{diff}</span>
              <span className="text-gray-400 text-sm">{config[diff].desc}</span>
            </span>
          </button>
        ))}
      </div>
    </Screen>
  );
}

// ── CategoryScreen ────────────────────────────────────────────────────────────

function CategoryScreen({ difficulty, onChoose, onHome }) {
  const allCategories = [...getCategoryNames(difficulty), 'Aleatória'];
  const icons = {
    Animais: '🐾', Objetos: '📦', Comidas: '🍕', Profissões: '💼', Lugares: '🗺️',
    Famosos: '⭐', Filmes: '🎬', Cidades: '🏙️', Diversos: '🔀', Aleatória: '🎲',
  };

  return (
    <Screen onHome={onHome}>
      <Title>Escolhe uma Categoria</Title>
      <div className="grid grid-cols-2 gap-3">
        {allCategories.map(cat => (
          <button
            key={cat}
            onClick={() => onChoose(cat)}
            className="bg-gray-800 hover:bg-gray-700 active:scale-95 rounded-2xl py-6 flex flex-col items-center gap-2 transition-colors"
          >
            <span className="text-4xl">{icons[cat]}</span>
            <span className="font-semibold text-base">{cat}</span>
          </button>
        ))}
      </div>
    </Screen>
  );
}

// ── RevealScreen ──────────────────────────────────────────────────────────────

function RevealScreen({ players, currentPlayerIndex, impostorIndex, secretWord, voiceEnabled, onNext, totalPlayers, onHome }) {
  const [phase, setPhase] = useState('pass');
  const player = players[currentPlayerIndex];
  const isImpostor = currentPlayerIndex === impostorIndex;
  const isLast = currentPlayerIndex === totalPlayers - 1;

  function handleReveal() {
    vibrate();
    if (voiceEnabled) {
      if (isImpostor) {
        speak(`${player.name}, você é o Impostor! Tente descobrir a palavra!`);
      } else {
        speak(`${player.name}, a palavra é ${secretWord}`);
      }
    }
    setPhase('revealed');
  }

  function handleHide() {
    setPhase('pass');
    onNext();
  }

  if (phase === 'pass') {
    return (
      <Screen onHome={onHome}>
        <div className="mt-16 flex flex-col items-center gap-8">
          <div className="animate-pulse text-center">
            <p className="text-gray-400 text-lg mb-2">Passa o celular para</p>
            <p className="text-4xl font-bold text-white">{player.name}</p>
          </div>
          <BigButton onClick={handleReveal} color="indigo">
            <span className="flex items-center justify-center gap-2">
              <Eye size={20} /> Eu sou {player.name} — Revelar
            </span>
          </BigButton>
        </div>
      </Screen>
    );
  }

  return (
    <Screen onHome={onHome}>
      <div className="mt-10 flex flex-col items-center gap-6">
        {isImpostor ? (
          <div className="w-full bg-red-900 border-2 border-red-500 rounded-3xl p-8 text-center">
            <AlertTriangle size={56} className="text-red-400 mx-auto mb-4" />
            <p className="text-red-300 text-xl font-semibold mb-1">Atenção!</p>
            <p className="text-4xl font-extrabold text-red-100">És o Impostor!</p>
            <p className="text-red-300 mt-3 text-sm">
              Tente descobrir a palavra pela conversa e não seja pego!
            </p>
          </div>
        ) : (
          <div className="w-full bg-green-900 border-2 border-green-500 rounded-3xl p-8 text-center">
            <p className="text-green-300 text-xl font-semibold mb-1">A palavra secreta é</p>
            <p className="text-5xl font-extrabold text-green-100 mt-2">{secretWord}</p>
            <p className="text-green-300 mt-3 text-sm">
              Não digas a palavra! Descobre quem é o Impostor.
            </p>
          </div>
        )}
        <BigButton onClick={handleHide} color="gray">
          <span className="flex items-center justify-center gap-2">
            <EyeOff size={20} /> {isLast ? 'Terminar Revelações' : 'Esconder e Passar'}
          </span>
        </BigButton>
      </div>
    </Screen>
  );
}

// ── DiscussionScreen ──────────────────────────────────────────────────────────

function DiscussionScreen({ onNext, onHome }) {
  return (
    <Screen onHome={onHome}>
      <div className="mt-16 flex flex-col items-center gap-8 text-center">
        <MessageCircle size={72} className="text-indigo-400" />
        <div>
          <h2 className="text-3xl font-bold mb-3">Hora da Discussão!</h2>
          <p className="text-gray-300 text-lg leading-relaxed">
            Conversem entre vocês.<br />
            Façam perguntas subtis sobre a palavra.<br />
            Quem é o <span className="text-red-400 font-semibold">Impostor</span>?
          </p>
        </div>
        <BigButton onClick={onNext} color="yellow">
          <span className="flex items-center justify-center gap-2">
            <Vote size={20} /> Passar para Votação
          </span>
        </BigButton>
      </div>
    </Screen>
  );
}

// ── VotingScreen ──────────────────────────────────────────────────────────────

function VotingScreen({ players, currentPlayerIndex, votes, onVote, onFinish, onHome }) {
  const [phase, setPhase] = useState('pass');
  const [selected, setSelected] = useState(null);
  const voter = players[currentPlayerIndex];
  const isLast = currentPlayerIndex === players.length - 1;

  function handleConfirm() {
    if (!selected) return;
    onVote(voter.name, selected);
    setPhase('pass');
    setSelected(null);
    if (isLast) onFinish();
  }

  if (phase === 'pass') {
    return (
      <Screen onHome={onHome}>
        <div className="mt-16 flex flex-col items-center gap-8">
          <div className="animate-pulse text-center">
            <p className="text-gray-400 text-lg mb-2">Votação secreta — passa para</p>
            <p className="text-4xl font-bold text-white">{voter.name}</p>
          </div>
          <BigButton onClick={() => setPhase('vote')} color="indigo">
            <span className="flex items-center justify-center gap-2">
              <Vote size={20} /> Eu sou {voter.name} — Votar
            </span>
          </BigButton>
        </div>
      </Screen>
    );
  }

  return (
    <Screen onHome={onHome}>
      <Title>Quem é o Impostor?</Title>
      <p className="text-gray-400 text-center mb-4 -mt-4 text-sm">
        {voter.name}, vota em quem suspeitas
      </p>
      <div className="flex flex-col gap-3 mb-6">
        {players.filter(p => p.name !== voter.name).map(p => (
          <button
            key={p.name}
            onClick={() => setSelected(p.name)}
            className={`w-full py-4 rounded-2xl font-semibold text-lg transition-all active:scale-95 ${
              selected === p.name
                ? 'bg-red-600 text-white ring-2 ring-red-400'
                : 'bg-gray-800 text-white hover:bg-gray-700'
            }`}
          >
            {p.name}
          </button>
        ))}
      </div>
      <BigButton onClick={handleConfirm} disabled={!selected} color="red">
        <span className="flex items-center justify-center gap-2">
          <ChevronRight size={20} /> Confirmar Voto
        </span>
      </BigButton>
    </Screen>
  );
}

// ── ResultsScreen ─────────────────────────────────────────────────────────────

function ResultsScreen({ players, votes, impostorIndex, secretWord, onNewRound, onNewGame, setPlayers, onHome }) {
  const impostor = players[impostorIndex];

  const voteCounts = {};
  players.forEach(p => { voteCounts[p.name] = 0; });
  Object.values(votes).forEach(voted => { voteCounts[voted] = (voteCounts[voted] || 0) + 1; });

  const maxVotes = Math.max(...Object.values(voteCounts));
  const topVoted = Object.entries(voteCounts).filter(([, v]) => v === maxVotes).map(([name]) => name);
  const impostorCaught = topVoted.length === 1 && topVoted[0] === impostor.name;

  const updatedPlayers = players.map(p => {
    let bonus = 0;
    if (impostorCaught) {
      if (p.name !== impostor.name && votes[p.name] === impostor.name) bonus = 1;
    } else {
      if (p.name === impostor.name) bonus = 2;
    }
    return { ...p, score: p.score + bonus };
  });

  function handleNewRound() {
    setPlayers(updatedPlayers);
    onNewRound();
  }

  function handleNewGame() {
    setPlayers(updatedPlayers.map(p => ({ ...p, score: 0 })));
    onNewGame();
  }

  const sorted = [...updatedPlayers].sort((a, b) => b.score - a.score);

  return (
    <Screen onHome={onHome}>
      <Title>Resultados</Title>

      {impostorCaught ? (
        <div className="bg-red-900 border border-red-500 rounded-2xl p-5 text-center mb-4">
          <p className="text-2xl font-bold text-red-100">🎉 Impostor Pego!</p>
          <p className="text-red-300 mt-1">
            <span className="font-semibold text-white">{impostor.name}</span> era o Impostor
          </p>
          <p className="text-red-300 text-sm mt-1">Quem votou certo ganhou +1 ponto</p>
        </div>
      ) : (
        <div className="bg-green-900 border border-green-500 rounded-2xl p-5 text-center mb-4">
          <p className="text-2xl font-bold text-green-100">😈 Impostor Escapou!</p>
          <p className="text-green-300 mt-1">
            <span className="font-semibold text-white">{impostor.name}</span> era o Impostor e ganhou +2 pontos
          </p>
        </div>
      )}

      <div className="bg-gray-800 rounded-2xl p-4 text-center mb-4">
        <p className="text-gray-400 text-sm">A palavra secreta era</p>
        <p className="text-3xl font-extrabold text-green-300 mt-1">{secretWord}</p>
      </div>

      <div className="bg-gray-800 rounded-2xl overflow-hidden mb-4">
        <p className="text-gray-400 text-xs uppercase font-semibold px-4 pt-3 pb-1">Votos recebidos</p>
        {Object.entries(voteCounts)
          .sort((a, b) => b[1] - a[1])
          .map(([name, count]) => (
            <div key={name} className="flex items-center justify-between px-4 py-2 border-t border-gray-700 first:border-0">
              <span className="font-medium flex items-center gap-2">
                {name}
                {name === impostor.name && (
                  <span className="text-xs text-red-400 font-semibold">(Impostor)</span>
                )}
              </span>
              <span className="font-bold text-yellow-300">{count} voto{count !== 1 ? 's' : ''}</span>
            </div>
          ))}
      </div>

      <div className="bg-gray-800 rounded-2xl overflow-hidden mb-6">
        <p className="text-gray-400 text-xs uppercase font-semibold px-4 pt-3 pb-1 flex items-center gap-1">
          <Trophy size={14} /> Placar
        </p>
        {sorted.map((p, i) => (
          <div key={p.name} className="flex items-center justify-between px-4 py-3 border-t border-gray-700 first:border-0">
            <span className="flex items-center gap-2 font-medium">
              <span className="text-gray-500 text-sm w-5">{i + 1}.</span>
              {p.name}
            </span>
            <span className="font-bold text-indigo-300">{p.score} pts</span>
          </div>
        ))}
      </div>

      <div className="flex flex-col gap-3">
        <BigButton onClick={handleNewRound} color="indigo">
          <span className="flex items-center justify-center gap-2">
            <ChevronRight size={20} /> Nova Partida
          </span>
        </BigButton>
        <BigButton onClick={handleNewGame} color="gray">
          <span className="flex items-center justify-center gap-2">
            <RotateCcw size={18} /> Novo Jogo (reset pontos)
          </span>
        </BigButton>
      </div>
    </Screen>
  );
}

// ── App (State Machine) ───────────────────────────────────────────────────────

export default function App() {
  const [stage, setStage] = useState('setup');
  const [players, setPlayers] = useState([]);
  const [voiceEnabled, setVoiceEnabled] = useState(false);
  const [difficulty, setDifficulty] = useState('Fácil');
  const [category, setCategory] = useState('');
  const [secretWord, setSecretWord] = useState('');
  const [impostorIndex, setImpostorIndex] = useState(0);
  const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0);
  const [votes, setVotes] = useState({});

  function handleStartGame() {
    setStage('difficulty');
  }

  function handleChooseDifficulty(diff) {
    setDifficulty(diff);
    setStage('category');
  }

  function handleChooseCategory(cat) {
    const word = getRandomWord(difficulty, cat);
    const imp = Math.floor(Math.random() * players.length);
    setCategory(cat);
    setSecretWord(word);
    setImpostorIndex(imp);
    setCurrentPlayerIndex(0);
    setVotes({});
    setStage('reveal');
  }

  function handleRevealNext() {
    if (currentPlayerIndex < players.length - 1) {
      setCurrentPlayerIndex(i => i + 1);
    } else {
      setStage('discussion');
    }
  }

  function handleStartVoting() {
    setCurrentPlayerIndex(0);
    setStage('voting');
  }

  function handleVote(voter, voted) {
    setVotes(prev => ({ ...prev, [voter]: voted }));
    if (currentPlayerIndex < players.length - 1) {
      setCurrentPlayerIndex(i => i + 1);
    }
  }

  function handleVotingFinished() {
    setStage('results');
  }

  function handleNewRound() {
    setStage('category');
  }

  function handleNewGame() {
    setStage('setup');
  }

  function handleGoHome() {
    setPlayers(prev => prev.map(p => ({ ...p })));
    setStage('setup');
  }

  if (stage === 'setup') return (
    <SetupScreen
      players={players}
      setPlayers={setPlayers}
      voiceEnabled={voiceEnabled}
      setVoiceEnabled={setVoiceEnabled}
      onStart={handleStartGame}
    />
  );

  if (stage === 'difficulty') return <DifficultyScreen onChoose={handleChooseDifficulty} onHome={handleGoHome} />;

  if (stage === 'category') return <CategoryScreen difficulty={difficulty} onChoose={handleChooseCategory} onHome={handleGoHome} />;

  if (stage === 'reveal') return (
    <RevealScreen
      players={players}
      currentPlayerIndex={currentPlayerIndex}
      impostorIndex={impostorIndex}
      secretWord={secretWord}
      voiceEnabled={voiceEnabled}
      onNext={handleRevealNext}
      totalPlayers={players.length}
      onHome={handleGoHome}
    />
  );

  if (stage === 'discussion') return <DiscussionScreen onNext={handleStartVoting} onHome={handleGoHome} />;

  if (stage === 'voting') return (
    <VotingScreen
      players={players}
      currentPlayerIndex={currentPlayerIndex}
      votes={votes}
      onVote={handleVote}
      onFinish={handleVotingFinished}
      onHome={handleGoHome}
    />
  );

  if (stage === 'results') return (
    <ResultsScreen
      players={players}
      votes={votes}
      impostorIndex={impostorIndex}
      secretWord={secretWord}
      onNewRound={handleNewRound}
      onNewGame={handleNewGame}
      setPlayers={setPlayers}
      onHome={handleGoHome}
    />
  );

  return null;
}
