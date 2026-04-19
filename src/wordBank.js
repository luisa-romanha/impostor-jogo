export const categories = {
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
};

export const categoryNames = Object.keys(categories);

export function getRandomWord(categoryName) {
  let words;
  if (categoryName === 'Aleatória') {
    const allWords = Object.values(categories).flat();
    words = allWords;
  } else {
    words = categories[categoryName];
  }
  return words[Math.floor(Math.random() * words.length)];
}
