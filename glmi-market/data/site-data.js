window.CAMPUS_LOOP_DATA = {
  hero: {
    badge: 'GLMI concept prototype · student resale platform',
    titleA: 'Buy smarter,',
    titleB: 'sell faster,',
    titleC: 'keep campus circular.',
    desc: 'Campus Loop Market is a student-to-student resale concept designed for university life. It is intentionally built as a static prototype that feels like a real product for GLMI presentation use.',
    stats: [
      { value: '240+', label: 'active listings' },
      { value: '18', label: 'popular categories' },
      { value: '24h', label: 'average listing response' }
    ],
    cards: [
      { title: 'Built for students', text: 'Furniture, textbooks, kitchen gear, transport, dorm essentials.' },
      { title: 'Feels trustworthy', text: 'Campus-based pickup points, student verification feel, clean listing structure.' },
      { title: 'Sustainable angle', text: 'Extends product life and lowers waste from semester turnover.' }
    ]
  },
  currentUser: {
    name: 'Ming · Student buyer',
    avatar: '🧑‍💻',
    badge: 'Verified campus member',
    savedSearches: 3,
    replies: 'Reply rate 96%',
    joined: 'Joined February 2026'
  },
  categories: ['All', 'Textbooks', 'Electronics', 'Furniture', 'Kitchen', 'Fashion', 'Transport', 'Dorm'],
  conditions: ['Used - very good', 'Used - good', 'Used - fair'],
  campi: ['City Campus', 'Grafton', 'Engineering', 'Epsom', 'Tamaki'],
  priceRanges: [
    { label: 'Any price', min: 0, max: Infinity },
    { label: 'Under $20', min: 0, max: 20 },
    { label: '$20 – $50', min: 20, max: 50 },
    { label: '$50 – $100', min: 50, max: 100 },
    { label: '$100+', min: 100, max: Infinity }
  ],
  sellerProfiles: {
    'Amy, Year 2': { avatar: '👩‍🎓', year: 'Year 2', listings: 4, rating: 4.8, joined: 'February 2025', response: 'Usually replies within 2 hours' },
    'Leo, Postgrad': { avatar: '👨‍🔬', year: 'Postgrad', listings: 7, rating: 4.9, joined: 'March 2024', response: 'Usually replies within 30 minutes' },
    'Mia, Exchange': { avatar: '👩‍💼', year: 'Exchange', listings: 2, rating: 4.6, joined: 'January 2026', response: 'Usually replies within 4 hours' },
    'Jason, Year 3': { avatar: '👨‍💻', year: 'Year 3', listings: 3, rating: 4.7, joined: 'July 2024', response: 'Usually replies within 1 hour' },
    'Nina, Masters': { avatar: '👩‍🔬', year: 'Masters', listings: 5, rating: 4.9, joined: 'October 2023', response: 'Usually replies within 3 hours' },
    'Sophie, Hall resident': { avatar: '👩‍🎓', year: 'Year 1', listings: 1, rating: 5.0, joined: 'February 2026', response: 'Usually replies within 6 hours' },
    'Ben, Year 1': { avatar: '👨‍🎓', year: 'Year 1', listings: 2, rating: 4.5, joined: 'March 2026', response: 'Usually replies within 5 hours' },
    'Chloe, Arts': { avatar: '👩‍🎨', year: 'Year 2', listings: 6, rating: 4.8, joined: 'August 2024', response: 'Usually replies within 2 hours' }
  },
  sellerListings: {
    'Amy, Year 2': [
      { id: 1, emoji: '📚', title: 'Marketing Textbook Bundle', price: 38, condition: 'Used - very good' },
      { id: 9, emoji: '📓', title: 'Business Statistics Notes', price: 12, condition: 'Used - very good' }
    ],
    'Jason, Year 3': [
      { id: 4, emoji: '💻', title: 'Second Monitor 24-inch', price: 95, condition: 'Used - good' },
      { id: 10, emoji: '🖥️', title: 'USB-C Dock', price: 35, condition: 'Used - good' }
    ]
  },
  quickLinks: [
    { title: 'New this week', text: 'Fresh move-in and move-out listings updated daily.' },
    { title: 'Student-verified feel', text: 'Built around campus pickup zones and student trust cues.' },
    { title: 'Lower waste', text: 'Keep useful items in circulation instead of rebuying every semester.' }
  ],
  savedPanel: {
    title: 'Saved items',
    empty: 'No saved items yet. Save a listing to make the product feel personal and sticky.',
    note: 'This static prototype uses localStorage to simulate personalised product behaviour.'
  },
  sellerMoments: [
    'Post in under 60 seconds',
    'Meet on campus, not random suburbs',
    'List once, reach the next student fast'
  ],
  listings: [
    { id: 1, emoji: '📚', gallery: ['📚','📝','🎒'], title: 'Marketing Textbook Bundle', price: 38, category: 'Textbooks', seller: 'Amy, Year 2', campus: 'City Campus', condition: 'Used - very good', pickup: 'Student Hub', posted: '2 hours ago', views: 87, desc: 'Three core business papers in one bundle, lightly highlighted, perfect for first-year students trying to cut costs.' },
    { id: 2, emoji: '🪑', gallery: ['🪑','📖','🛋️'], title: 'Compact Study Chair', price: 22, category: 'Furniture', seller: 'Leo, Postgrad', campus: 'Grafton', condition: 'Used - good', pickup: 'Library side gate', posted: '1 day ago', views: 54, desc: 'Lightweight desk chair, easy to move into flats or halls, still sturdy and clean.' },
    { id: 3, emoji: '🍳', gallery: ['🍳','🍽️','🥣'], title: 'Starter Kitchen Set', price: 45, category: 'Kitchen', seller: 'Mia, Exchange', campus: 'City Campus', condition: 'Used - very good', pickup: 'Symonds Street', posted: '5 hours ago', views: 112, desc: 'Pan, pot, cutting board, plates and utensils. Great for students setting up a new flat quickly.' },
    { id: 4, emoji: '💻', gallery: ['💻','⌨️','🖥️'], title: 'Second Monitor 24-inch', price: 95, category: 'Electronics', seller: 'Jason, Year 3', campus: 'Engineering', condition: 'Used - good', pickup: 'Engineering foyer', posted: 'Today', views: 203, desc: 'Perfect for essays, coding, or design work. Comes with HDMI cable and power cable.' },
    { id: 5, emoji: '🚲', gallery: ['🚲','🛞','🪖'], title: 'Campus Bike', price: 120, category: 'Transport', seller: 'Nina, Masters', campus: 'Epsom', condition: 'Used - fair', pickup: 'Epsom carpark', posted: '3 days ago', views: 76, desc: 'Reliable city bike for short commutes. Minor scratches but works well and saves bus money.' },
    { id: 6, emoji: '🛏️', gallery: ['🛏️','🧺','🪟'], title: 'Dorm Bedding Pack', price: 28, category: 'Dorm', seller: 'Sophie, Hall resident', campus: 'City Campus', condition: 'Used - very good', pickup: 'Hall lobby', posted: '4 hours ago', views: 91, desc: 'Pillow, duvet, cover set and fitted sheet. Clean, simple, useful for fast move-ins.' },
    { id: 7, emoji: '🎧', gallery: ['🎧','🎵','🔋'], title: 'Noise-Cancelling Headphones', price: 72, category: 'Electronics', seller: 'Ben, Year 1', campus: 'City Campus', condition: 'Used - good', pickup: 'Science Centre', posted: 'Yesterday', views: 134, desc: 'Ideal for library sessions and noisy flats. Battery still holds well.' },
    { id: 8, emoji: '👕', gallery: ['👕','🧥','🧺'], title: 'Winter Hoodie Bundle', price: 18, category: 'Fashion', seller: 'Chloe, Arts', campus: 'City Campus', condition: 'Used - good', pickup: 'Quad', posted: '6 hours ago', views: 45, desc: 'Three warm hoodies sold together. Budget-friendly and practical for Auckland weather.' }
  ],
  fakeInbox: [
    {
      id: 1, seller: 'Amy, Year 2', item: 'Marketing Textbook Bundle', avatar: '👩‍🎓', itemEmoji: '📚',
      messages: [
        { from: 'them', text: 'Hi! Is this still available?', time: '10:32 AM' },
        { from: 'me', text: 'Yes it is! Would you like to arrange pickup?', time: '10:35 AM' },
        { from: 'them', text: 'Great! Can we meet near the Business School at 2pm tomorrow?', time: '10:38 AM' },
        { from: 'me', text: 'Perfect, I will be there. See you then!', time: '10:40 AM' }
      ]
    },
    {
      id: 2, seller: 'Jason, Year 3', item: 'Second Monitor 24-inch', avatar: '👨‍💻', itemEmoji: '💻',
      messages: [
        { from: 'them', text: 'Hey, is the HDMI cable included?', time: '3:15 PM' },
        { from: 'me', text: 'Yes, both HDMI and power cable come with it.', time: '3:18 PM' },
        { from: 'them', text: 'Awesome. Can I pick up after 4pm?', time: '3:20 PM' }
      ]
    },
    {
      id: 3, seller: 'Mia, Exchange', item: 'Starter Kitchen Set', avatar: '👩‍💼', itemEmoji: '🍳',
      messages: [
        { from: 'them', text: 'Hi! If you can collect this evening I can hold it for you.', time: '1:45 PM' }
      ]
    }
  ],
  trustPoints: [
    'Feels safer than random marketplaces because pickup is anchored to campus places.',
    'Designed around student budgets, semester turnover, and quick relocation needs.',
    'Supports circular consumption and makes second-hand buying socially normal.'
  ],
  glmiAngles: [
    { title: 'Problem framing', text: 'Students often face high setup costs, fragmented local information, and low trust in second-hand exchange during move-ins and move-outs.' },
    { title: 'Why it matters', text: 'The pain is financial, practical, and environmental. Useful items are discarded while other students buy the same things new.' },
    { title: 'Sustainability fit', text: 'A campus-specific resale platform supports reuse, reduces waste, and lowers the barrier to student living.' }
  ],
  notifications: [
    'Your listing "Compact Study Chair" was bumped to the top.',
    'Amy sent you a message about Marketing Textbook Bundle.',
    'Your saved search "electronics under $100" has new results.'
  ]
};
