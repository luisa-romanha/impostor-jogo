export const difficulties = ['Fácil', 'Médio', 'Difícil'];

const wordBank = {
  'Fácil': {
    Animais: [
      'Gato', 'Cão', 'Elefante', 'Girafa', 'Cobra',
      'Leão', 'Pinguim', 'Cavalo', 'Pato', 'Urso',
      'Macaco', 'Zebra', 'Tubarão', 'Águia', 'Crocodilo',
    ],
    Objetos: [
      'Cadeira', 'Espelho', 'Tesoura', 'Guarda-chuva', 'Relógio',
      'Mala', 'Computador', 'Lâmpada', 'Chave', 'Telefone',
      'Câmara', 'Guitarra', 'Bicicleta', 'Martelo', 'Óculos',
    ],
    Comidas: [
      'Pizza', 'Sushi', 'Chocolate', 'Maçã', 'Bolo',
      'Queijo', 'Pão', 'Sorvete', 'Arroz', 'Hambúrguer',
      'Brigadeiro', 'Abacaxi', 'Frango', 'Torta', 'Cenoura',
    ],
    Profissões: [
      'Médico', 'Professor', 'Bombeiro', 'Chef', 'Piloto',
      'Detetive', 'Cientista', 'Pintor', 'Músico', 'Árbitro',
      'Astronauta', 'Jornalista', 'Mecânico', 'Arquiteto', 'Fotógrafo',
    ],
    Lugares: [
      'Praia', 'Biblioteca', 'Aeroporto', 'Circo', 'Castelo',
      'Mercado', 'Hospital', 'Parque', 'Cinema', 'Museu',
      'Discoteca', 'Estádio', 'Farol', 'Aquário', 'Cemitério',
    ],
  },
  'Médio': {
    Animais: [
      'Ornitorrinco', 'Camaleão', 'Morsa', 'Lagosta', 'Coala',
      'Guaxinim', 'Furão', 'Lontra', 'Flamingo', 'Avestruz',
      'Escorpião', 'Caranguejo', 'Polvo', 'Hiena', 'Chinchila',
    ],
    Objetos: [
      'Bússola', 'Ábaco', 'Estetoscópio', 'Ventilador', 'Extintor',
      'Lupa', 'Cronômetro', 'Binóculos', 'Aspirador', 'Cofre',
      'Candeeiro', 'Violino', 'Telescópio', 'Máquina de Costura', 'Liquidificador',
    ],
    Comidas: [
      'Falafel', 'Risoto', 'Ceviche', 'Guacamole', 'Tapioca',
      'Coxinha', 'Pastel', 'Feijoada', 'Moqueca', 'Empanada',
      'Churrasco', 'Tabule', 'Hummus', 'Quiche', 'Panqueca',
    ],
    Profissões: [
      'Sommelier', 'Apicultor', 'Estivador', 'Notário', 'Ferreiro',
      'Joalheiro', 'Relojoeiro', 'Tradutor', 'Croupier', 'Bibliotecário',
      'Garimpeiro', 'Estofador', 'Cenógrafo', 'Legista', 'Paisagista',
    ],
    Lugares: [
      'Observatório', 'Catacumbas', 'Estaleiro', 'Vinha', 'Represa',
      'Vulcão', 'Deserto', 'Oásis', 'Gruta', 'Pântano',
      'Glaciar', 'Savana', 'Recife de Coral', 'Vale', 'Planalto',
    ],
    Famosos: [
      'Cristiano Ronaldo', 'Neymar', 'Anitta', 'Shakira', 'Michael Jackson',
      'Charlie Chaplin', 'Pelé', 'Xuxa', 'Silvio Santos', 'Madonna',
      'Elvis Presley', 'Bruno Mars', 'Beyoncé', 'Ronaldinho', 'Roberto Carlos',
    ],
    Filmes: [
      'Titanic', 'Matrix', 'Shrek', 'Frozen', 'Avatar',
      'Star Wars', 'Homem-Aranha', 'Batman', 'Toy Story', 'Jurassic Park',
      'Rei Leão', 'Harry Potter', 'Vingadores', 'Branca de Neve', 'Aladdin',
    ],
    Cidades: [
      'Lisboa', 'Paris', 'Tóquio', 'Roma', 'Nova Iorque',
      'Londres', 'Madrid', 'Berlim', 'Barcelona', 'Amesterdão',
      'Dubai', 'Sydney', 'Moscovo', 'Istambul', 'Rio de Janeiro',
    ],
    Diversos: [
      'Democracia', 'Gravidade', 'Improviso', 'Liberdade', 'Karma',
      'Amizade', 'Saudade', 'Coragem', 'Sorte', 'Paciência',
      'Curiosidade', 'Confiança', 'Inveja', 'Preguiça', 'Surpresa',
    ],
  },
  'Difícil': {
    Animais: [
      'Camelo', 'Rinoceronte', 'Foca', 'Morcego', 'Coruja',
      'Toupeira', 'Ouriço-cacheiro', 'Iguana', 'Javali', 'Doninha',
      'Texugo', 'Salamandra', 'Gambá', 'Lince', 'Alce',
    ],
    Objetos: [
      'Termômetro', 'Serrote', 'Balança', 'Ferro de Passar', 'Alicate',
      'Chave de Fendas', 'Roldana', 'Parafuso', 'Foice', 'Trena',
      'Grampeador', 'Furadeira', 'Enxada', 'Machado', 'Bigorna',
    ],
    Comidas: [
      'Lasanha', 'Croissant', 'Sashimi', 'Paella', 'Fondue',
      'Kimchi', 'Bacalhau à Brás', 'Ratatouille', 'Tzatziki', 'Consommé',
      'Escargot', 'Tártaro', 'Bruschetta', 'Carpaccio', 'Goulash',
    ],
    Profissões: [
      'Alfaiate', 'Diplomata', 'Espião', 'Eletricista', 'Marceneiro',
      'Coveiro', 'Contrabandista', 'Dublê', 'Malabarista', 'Ventríloquo',
      'Domador', 'Encanador', 'Sapateiro', 'Cabeleireiro', 'Funileiro',
    ],
    Lugares: [
      'Búnquer', 'Trincheira', 'Manicômio', 'Orfanato', 'Convento',
      'Mosteiro', 'Quartel', 'Presídio', 'Necrotério', 'Laboratório',
      'Reator Nuclear', 'Estação Espacial', 'Submarino', 'Vinícola', 'Catedral',
    ],
    Famosos: [
      'Einstein', 'Beethoven', 'Cleópatra', 'Frida Kahlo', 'Napoleão',
      'Gandhi', 'Mozart', 'Darwin', 'Shakespeare', 'Picasso',
      'Leonardo da Vinci', 'Nelson Mandela', 'Marie Curie', 'Abraham Lincoln', 'Confúcio',
    ],
    Filmes: [
      'O Poderoso Chefão', 'Pulp Fiction', 'Clube da Luta', 'Coringa', 'Parasita',
      'Cidade de Deus', 'Blade Runner', 'Amadeus', 'Casablanca', 'Laranja Mecânica',
      'Whiplash', 'Interestelar', 'A Origem', 'Birdman', 'Drive',
    ],
    Cidades: [
      'Marrakech', 'Kyoto', 'Dubrovnik', 'Veneza', 'Cartagena',
      'Zanzibar', 'Petra', 'Bali', 'Cusco', 'Santorini',
      'Bruges', 'Salvador', 'Manaus', 'Praga', 'Budapeste',
    ],
    Diversos: [
      'Nostalgia', 'Paradoxo', 'Ironia', 'Coincidência', 'Burocracia',
      'Melancolia', 'Empatia', 'Intuição', 'Persistência', 'Humildade',
      'Arrogância', 'Generosidade', 'Ambição', 'Solidão', 'Gratidão',
    ],
  },
};

export function getCategoryNames(difficulty) {
  return Object.keys(wordBank[difficulty] || {});
}

export function getRandomWord(difficulty, categoryName) {
  const categories = wordBank[difficulty] || wordBank['Fácil'];
  let words;
  if (categoryName === 'Aleatória') {
    words = Object.values(categories).flat();
  } else {
    words = categories[categoryName];
  }
  return words[Math.floor(Math.random() * words.length)];
}

export default wordBank;
