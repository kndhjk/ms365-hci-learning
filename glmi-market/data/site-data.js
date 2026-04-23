window.CAMPUS_LOOP_DATA = {
  hero: {
    badge: 'GLMI concept prototype · student resale platform',
    titleA: 'Buy smarter,',
    titleB: 'sell faster,',
    titleC: 'keep campus circular.',
    desc: 'Campus Loop Market is a student-to-student resale concept designed for university life: affordable, local, trustworthy, and social. It is intentionally built as a static prototype that feels like a real product for GLMI presentation use.',
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
  categories: ['All', 'Textbooks', 'Electronics', 'Furniture', 'Kitchen', 'Fashion', 'Transport', 'Dorm'],
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
    { id: 1, emoji: '📚', title: 'Marketing Textbook Bundle', price: 38, category: 'Textbooks', seller: 'Amy, Year 2', campus: 'City Campus', condition: 'Used - very good', pickup: 'Student Hub', posted: '2 hours ago', desc: 'Three core business papers in one bundle, lightly highlighted, perfect for first-year students trying to cut costs.' },
    { id: 2, emoji: '🪑', title: 'Compact Study Chair', price: 22, category: 'Furniture', seller: 'Leo, Postgrad', campus: 'Grafton', condition: 'Used - good', pickup: 'Library side gate', posted: '1 day ago', desc: 'Lightweight desk chair, easy to move into flats or halls, still sturdy and clean.' },
    { id: 3, emoji: '🍳', title: 'Starter Kitchen Set', price: 45, category: 'Kitchen', seller: 'Mia, Exchange', campus: 'City Campus', condition: 'Used - very good', pickup: 'Symonds Street', posted: '5 hours ago', desc: 'Pan, pot, cutting board, plates and utensils. Great for students setting up a new flat quickly.' },
    { id: 4, emoji: '💻', title: 'Second Monitor 24-inch', price: 95, category: 'Electronics', seller: 'Jason, Year 3', campus: 'Engineering', condition: 'Used - good', pickup: 'Engineering foyer', posted: 'Today', desc: 'Perfect for essays, coding, or design work. Comes with HDMI cable and power cable.' },
    { id: 5, emoji: '🚲', title: 'Campus Bike', price: 120, category: 'Transport', seller: 'Nina, Masters', campus: 'Epsom', condition: 'Used - fair', pickup: 'Epsom carpark', posted: '3 days ago', desc: 'Reliable city bike for short commutes. Minor scratches but works well and saves bus money.' },
    { id: 6, emoji: '🛏️', title: 'Dorm Bedding Pack', price: 28, category: 'Dorm', seller: 'Sophie, Hall resident', campus: 'City Campus', condition: 'Used - very good', pickup: 'Hall lobby', posted: '4 hours ago', desc: 'Pillow, duvet, cover set and fitted sheet. Clean, simple, useful for fast move-ins.' },
    { id: 7, emoji: '🎧', title: 'Noise-Cancelling Headphones', price: 72, category: 'Electronics', seller: 'Ben, Year 1', campus: 'City Campus', condition: 'Used - good', pickup: 'Science Centre', posted: 'Yesterday', desc: 'Ideal for library sessions and noisy flats. Battery still holds well.' },
    { id: 8, emoji: '👕', title: 'Winter Hoodie Bundle', price: 18, category: 'Fashion', seller: 'Chloe, Arts', campus: 'City Campus', condition: 'Used - good', pickup: 'Quad', posted: '6 hours ago', desc: 'Three warm hoodies sold together. Budget-friendly and practical for Auckland weather.' }
  ],
  trustPoints: [
    'Feels safer than random marketplaces because pickup is anchored to campus places.',
    'Designed around student budgets, semester turnover, and quick relocation needs.',
    'Supports circular consumption and makes second-hand buying socially normal.'
  ],
  glmiAngles: [
    {
      title: 'Problem framing',
      text: 'Students often face high setup costs, fragmented local information, and low trust in second-hand exchange during move-ins and move-outs.'
    },
    {
      title: 'Why it matters',
      text: 'The pain is financial, practical, and environmental. Useful items are discarded while other students buy the same things new.'
    },
    {
      title: 'Sustainability fit',
      text: 'A campus-specific resale platform supports reuse, reduces waste, and lowers the barrier to student living.'
    }
  ],
  fakeInbox: [
    { name: 'Amy', item: 'Marketing Textbook Bundle', msg: 'Hi! Still available. I can meet near the Business School at 2pm tomorrow.' },
    { name: 'Jason', item: 'Second Monitor 24-inch', msg: 'Yes, HDMI cable is included. Pick-up works after 4pm.' },
    { name: 'Mia', item: 'Starter Kitchen Set', msg: 'If you can collect this evening, I can hold it for you.' }
  ]
};
