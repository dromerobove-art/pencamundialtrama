// Banco de preguntas basado en Brighter Ideas 1 (Oxford) – nivel Pre-A1 Starters.
// type: 'mc' (opción múltiple) | 'fill' (completar) | 'tf' (True/False) | 'listen' (audio)
// speak: texto en inglés que se lee con speechSynthesis (si falta, se lee el prompt).

export const TOPICS = [
  { id: 'starter', title: 'Starter', sub: 'Saludos, números, colores', emoji: '👋', color: 'from-pink-400 to-rose-500', badge: 'Master de los Colores' },
  { id: 'u1', title: 'Unit 1', sub: 'Classroom', emoji: '🎒', color: 'from-amber-400 to-orange-500', badge: 'Reina del Aula' },
  { id: 'u2', title: 'Unit 2', sub: 'Family', emoji: '👨‍👩‍👧', color: 'from-fuchsia-400 to-purple-500', badge: 'Superstar de la Familia' },
  { id: 'u3', title: 'Unit 3', sub: 'Toys & Activities', emoji: '🪁', color: 'from-sky-400 to-blue-500', badge: 'Campeona de Juguetes' },
  { id: 'u4', title: 'Unit 4', sub: 'Animals & Pets', emoji: '🐶', color: 'from-lime-400 to-green-500', badge: 'Amiga de los Animales' },
  { id: 'u5', title: 'Unit 5', sub: 'Food & Drink', emoji: '🍎', color: 'from-red-400 to-pink-500', badge: 'Chef Estrella' },
  { id: 'u6', title: 'Unit 6', sub: 'Body & Abilities', emoji: '🦎', color: 'from-teal-400 to-emerald-500', badge: 'Exploradora del Cuerpo' },
  { id: 'u7', title: 'Unit 7', sub: 'Clothes & Appearance', emoji: '👕', color: 'from-violet-400 to-indigo-500', badge: 'Fashion Queen' },
  { id: 'u8', title: 'Unit 8', sub: 'House & Prepositions', emoji: '🏠', color: 'from-yellow-400 to-amber-500', badge: 'Arquitecta del Hogar' },
]

const mc = (topic, prompt, options, answer, extra = {}) => ({ type: 'mc', topic, prompt, options, answer, ...extra })
const fill = (topic, prompt, options, answer, extra = {}) => ({ type: 'fill', topic, prompt, options, answer, ...extra })
const tf = (topic, prompt, answer, extra = {}) => ({ type: 'tf', topic, prompt, options: ['True', 'False'], answer, ...extra })
const listen = (topic, speak, options, answer, extra = {}) => ({ type: 'listen', topic, prompt: 'Listen and choose', speak, options, answer, ...extra })

const raw = [
  // ---------- Starter ----------
  mc('starter', 'How many apples?', ['three', 'five', 'nine'], 'five', { emoji: '🍎🍎🍎🍎🍎' }),
  mc('starter', 'What colour is the banana?', ['yellow', 'green', 'blue'], 'yellow', { emoji: '🍌' }),
  fill('starter', '____ old are you?', ['How', 'What', 'Who'], 'How', { tip: 'How old are you? I\'m eight.' }),
  mc('starter', 'How are you?', ["I'm fine, thank you.", "I'm eight.", 'My name is Erne.'], "I'm fine, thank you.", { emoji: '😊' }),
  listen('starter', 'fifteen', ['5', '15', '50'], '15'),
  tf('starter', "It's sunny.", 'True', { emoji: '☀️' }),
  mc('starter', 'Monday, Tuesday, ____', ['Wednesday', 'Friday', 'Sunday'], 'Wednesday', { emoji: '📅' }),
  mc('starter', "What's the weather like?", ["It's rainy.", "It's sunny.", "It's snowy."], "It's rainy.", { emoji: '🌧️' }),

  // ---------- Unit 1 · Classroom ----------
  mc('u1', "What's this?", ['pencil', 'ruler', 'rubber'], 'pencil', { emoji: '✏️' }),
  mc('u1', "What's this?", ['bin', 'ruler', 'desk'], 'ruler', { emoji: '📏' }),
  listen('u1', 'window', ['🪟', '🚪', '🗑️'], '🪟'),
  fill('u1', 'I ____ got a ruler.  ✅ (I have it)', ['have', "haven't", 'has'], 'have'),
  fill('u1', 'I ____ got a rubber.  ❌ (I don\'t have it)', ['have', "haven't", 'has'], "haven't"),
  tf('u1', 'This is a bin.', 'True', { emoji: '🗑️' }),
  tf('u1', 'This is a window.', 'False', { emoji: '🚪' }),
  mc('u1', "What's this?", ["It's a door.", "It's a desk.", "It's a pencil case."], "It's a door.", { emoji: '🚪' }),

  // ---------- Unit 2 · Family ----------
  mc('u2', 'Who\'s this? This is my ____.', ['dad', 'mum', 'auntie'], 'dad', { emoji: '👨' }),
  mc('u2', 'Who\'s this? This is my ____.', ['grandpa', 'grandma', 'uncle'], 'grandma', { emoji: '👵' }),
  fill('u2', 'This is my brother. ____ tall.', ["He's", "She's", "It's"], "He's", { emoji: '👦' }),
  fill('u2', 'This is my sister. ____ pretty.', ["He's", "She's", "It's"], "She's", { emoji: '👧' }),
  mc('u2', 'The opposite of "tall" is ____.', ['short', 'old', 'pretty'], 'short', { emoji: '↕️' }),
  tf('u2', 'Grandpa is a man.', 'True', { emoji: '👴' }),
  listen('u2', 'cousin', ['cousin', 'uncle', 'twin'], 'cousin'),
  mc('u2', "Who's this? This is my ____ (mum's brother).", ['uncle', 'auntie', 'cousin'], 'uncle', { emoji: '🧔' }),

  // ---------- Unit 3 · Toys & Activities ----------
  mc('u3', "What's this?", ['kite', 'doll', 'ball'], 'kite', { emoji: '🪁' }),
  mc('u3', "What's this?", ['scooter', 'bike', 'robot'], 'bike', { emoji: '🚲' }),
  listen('u3', 'robot', ['🤖', '🧸', '🪁'], '🤖'),
  fill('u3', '____ you got a ball?  Yes, I have.', ['Have', 'Has', 'Do'], 'Have', { emoji: '⚽' }),
  fill('u3', 'I ____ ride a bike.  ✅', ['can', "can't", 'am'], 'can', { emoji: '🚲' }),
  fill('u3', 'I ____ fly.  ❌ (I\'m not a bird!)', ['can', "can't", 'have'], "can't", { emoji: '🙅' }),
  tf('u3', 'I can play football.', 'True', { emoji: '⚽' }),
  mc('u3', 'Have you got a doll?  ❌  No, I ____.', ["haven't", 'have', "can't"], "haven't", { emoji: '🪆' }),

  // ---------- Unit 4 · Animals & Pets ----------
  mc('u4', "What's this?", ['cow', 'sheep', 'goat'], 'cow', { emoji: '🐄' }),
  mc('u4', "What's this?", ['chicken', 'sheep', 'spider'], 'sheep', { emoji: '🐑' }),
  listen('u4', 'chicken', ['🐔', '🐕', '🐈'], '🐔'),
  fill('u4', 'I ____ spiders.  😱', ['like', "don't like", 'likes'], "don't like", { emoji: '🕷️' }),
  mc('u4', "They're black and ____.", ['white', 'green', 'red'], 'white', { emoji: '🐄' }),
  tf('u4', 'This is a goat.', 'True', { emoji: '🐐' }),
  tf('u4', 'This is a cat.', 'False', { emoji: '🐕' }),

  // ---------- Unit 5 · Food & Drink ----------
  mc('u5', "What's this?", ['bread', 'milk', 'eggs'], 'bread', { emoji: '🍞' }),
  mc('u5', "What's this?", ['juice', 'milk', 'pasta'], 'milk', { emoji: '🥛' }),
  listen('u5', 'carrots', ['🥕', '🍅', '🍎'], '🥕'),
  fill('u5', 'Do you like pasta?  ✅  Yes, I ____.', ['do', "don't", 'does'], 'do', { emoji: '🍝' }),
  fill('u5', 'Do you like tomatoes?  ❌  No, I ____.', ['do', "don't", 'does'], "don't", { emoji: '🍅' }),
  mc('u5', 'What do you have for lunch?', ['I have sandwiches.', 'I like blue.', 'I can swim.'], 'I have sandwiches.', { emoji: '🥪' }),
  tf('u5', 'These are eggs.', 'True', { emoji: '🥚🥚' }),
  tf('u5', 'This is juice.', 'False', { emoji: '🍎' }),

  // ---------- Unit 6 · Body & Abilities ----------
  mc('u6', 'Horses haven\'t got ____.', ['wings', 'legs', 'a tail'], 'wings', { emoji: '🐴' }),
  mc('u6', 'Can chameleons swim?', ['No, they can\'t.', 'Yes, they can.', 'Yes, I do.'], "No, they can't.", { emoji: '🦎' }),
  fill('u6', 'We ____ got two arms.', ['have', "haven't", 'has'], 'have', { emoji: '💪' }),
  fill('u6', 'Fish ____ got legs.', ["haven't", 'have', 'has'], "haven't", { emoji: '🐟' }),
  listen('u6', 'tail', ['tail', 'head', 'eyes'], 'tail'),
  tf('u6', 'We see with our eyes.', 'True', { emoji: '👀' }),
  tf('u6', 'Birds have got four legs.', 'False', { emoji: '🐦' }),
  mc('u6', 'Spiders have got ____ legs.', ['eight', 'four', 'six'], 'eight', { emoji: '🕷️' }),

  // ---------- Unit 7 · Clothes & Appearance ----------
  mc('u7', "What's this?", ['jacket', 'skirt', 'socks'], 'jacket', { emoji: '🧥' }),
  mc('u7', "What's this?", ['T-shirt', 'shorts', 'shoes'], 'T-shirt', { emoji: '👕' }),
  listen('u7', 'socks', ['🧦', '👟', '🧢'], '🧦'),
  fill('u7', 'What are you ____?  I\'m wearing a hat.', ['wearing', 'wear', 'wears'], 'wearing', { emoji: '🧢' }),
  fill('u7', 'Has she got curly hair?  ✅  Yes, she ____.', ['has', 'have', 'is'], 'has', { emoji: '👩‍🦱' }),
  mc('u7', 'She\'s got ____ hair.', ['blond', 'wings', 'curly shoes'], 'blond', { emoji: '👱‍♀️' }),
  tf('u7', 'These are glasses.', 'True', { emoji: '👓' }),
  tf('u7', 'These are hats.', 'False', { emoji: '👟' }),

  // ---------- Unit 8 · House & Prepositions ----------
  mc('u8', 'Where do we cook?', ['kitchen', 'bedroom', 'garden'], 'kitchen', { emoji: '🍳' }),
  listen('u8', 'bathroom', ['🛁', '🛏️', '🍳'], '🛁'),
  mc('u8', "Where's the book? It's ____ the bed.", ['under', 'on', 'in'], 'under', { emoji: '📖⬇️🛏️' }),
  fill('u8', "Where's the cat? It's ____ the box.", ['in', 'on', 'under'], 'in', { emoji: '🐱📦' }),
  fill('u8', 'The ball is ____ the table.', ['on', 'under', 'in'], 'on', { emoji: '⚽⬆️🪑' }),
  fill('u8', 'There ____ two books.', ['are', 'is', 'am'], 'are', { emoji: '📚' }),
  tf('u8', 'The garden is outside the house.', 'True', { emoji: '🌳' }),
  tf('u8', 'We sleep in the kitchen.', 'False', { emoji: '😴' }),
]

export const QUESTIONS = raw.map((q, i) => ({ id: i + 1, ...q }))
