const { createApp, computed, ref } = Vue;
const market = window.CAMPUS_LOOP_DATA;
const STORE = 'campus-loop-market-v1';

createApp({
  setup() {
    const saved = JSON.parse(localStorage.getItem(STORE) || '{}');
    const query = ref(saved.query || '');
    const category = ref(saved.category || 'All');
    const liked = ref(saved.liked || []);
    const selected = ref(null);

    const filtered = computed(() => {
      return market.listings.filter(item => {
        const byCategory = category.value === 'All' || item.category === category.value;
        const q = query.value.trim().toLowerCase();
        const byQuery = !q || [item.title, item.category, item.desc, item.seller, item.campus].join(' ').toLowerCase().includes(q);
        return byCategory && byQuery;
      });
    });

    function persist() {
      localStorage.setItem(STORE, JSON.stringify({
        query: query.value,
        category: category.value,
        liked: liked.value
      }));
    }

    function setCategory(c) { category.value = c; persist(); }
    function toggleLike(id) {
      liked.value = liked.value.includes(id) ? liked.value.filter(x => x !== id) : [...liked.value, id];
      persist();
    }
    function openListing(item) { selected.value = item; }
    function closeListing() { selected.value = null; }

    return { market, query, category, liked, filtered, setCategory, toggleLike, openListing, closeListing, selected, persist };
  },
  template: `
    <div class="wrap">
      <div class="topbar">
        <div class="brand"><div class="brand-badge">♻️</div><div>Campus Loop Market</div></div>
        <div class="nav-actions">
          <button>Browse</button>
          <button>Sell an item</button>
          <button>Saved</button>
          <button onclick="location.href='../glmi-showcase/'">Project story ↗</button>
        </div>
      </div>

      <section class="hero">
        <div class="hero-grid">
          <div>
            <div class="eyebrow">{{ market.hero.badge }}</div>
            <h1>{{ market.hero.titleA }} <span class="gradient">{{ market.hero.titleB }}</span><br>{{ market.hero.titleC }}</h1>
            <p>{{ market.hero.desc }}</p>
            <div class="hero-actions">
              <button class="primary">Start browsing</button>
              <button class="ghost" onclick="location.href='../glmi-showcase/'">See GLMI rationale</button>
            </div>
            <div class="stats">
              <div class="stat" v-for="item in market.hero.stats" :key="item.label">
                <strong>{{ item.value }}</strong>
                <span>{{ item.label }}</span>
              </div>
            </div>
          </div>
          <div class="preview-board">
            <div class="floating" v-for="item in market.hero.cards" :key="item.title">
              <h3>{{ item.title }}</h3>
              <p>{{ item.text }}</p>
            </div>
          </div>
        </div>

        <div class="searchbar">
          <input v-model="query" @input="persist" placeholder="Search textbooks, bikes, chairs, pans..." />
          <select v-model="category" @change="persist">
            <option v-for="c in market.categories" :key="c">{{ c }}</option>
          </select>
          <select>
            <option>Sort by newest</option>
            <option>Sort by price low to high</option>
            <option>Sort by price high to low</option>
          </select>
          <button>Search</button>
        </div>
      </section>

      <section class="section">
        <div class="section-title">
          <div>
            <h2>Browse by category</h2>
            <p>Made to feel local, student-friendly, and fast to navigate.</p>
          </div>
        </div>
        <div class="chips">
          <button class="chip" :class="{active: category===c}" v-for="c in market.categories" :key="c" @click="setCategory(c)">{{ c }}</button>
        </div>
      </section>

      <section class="section">
        <div class="section-title">
          <div>
            <h2>Fresh listings</h2>
            <p>{{ filtered.length }} items feel live, even though this is a static prototype.</p>
          </div>
        </div>
        <div class="grid">
          <article class="card" v-for="item in filtered" :key="item.id">
            <div class="thumb">{{ item.emoji }}</div>
            <div class="card-top">
              <div>
                <div class="title">{{ item.title }}</div>
                <div class="meta">{{ item.seller }} · {{ item.posted }}</div>
              </div>
              <div class="price">NZ$ {{ item.price }}</div>
            </div>
            <div class="pill-row">
              <span class="pill">{{ item.category }}</span>
              <span class="pill">{{ item.condition }}</span>
              <span class="pill">{{ item.campus }}</span>
            </div>
            <div class="meta">Pickup: {{ item.pickup }}</div>
            <div class="meta">{{ item.desc }}</div>
            <div class="card-actions">
              <button class="save" @click="toggleLike(item.id)">{{ liked.includes(item.id) ? 'Saved ♥' : 'Save' }}</button>
              <button class="contact" @click="openListing(item)">View details</button>
            </div>
          </article>
        </div>
      </section>

      <section class="section two-col">
        <div class="panel">
          <h3>Why this concept matters</h3>
          <ul>
            <li v-for="p in market.trustPoints" :key="p">{{ p }}</li>
          </ul>
        </div>
        <div class="panel">
          <h3>How this supports the GLMI story</h3>
          <div v-for="item in market.glmiAngles" :key="item.title" style="margin-bottom:14px">
            <strong style="display:block;margin-bottom:4px">{{ item.title }}</strong>
            <p style="margin:0">{{ item.text }}</p>
          </div>
        </div>
      </section>

      <div class="footer">Campus Loop Market · static but presentation-ready · designed for GLMI storytelling</div>

      <div class="modal-backdrop" v-if="selected" @click.self="closeListing">
        <div class="modal">
          <div class="modal-header">
            <div>
              <h3>{{ selected.title }}</h3>
              <div class="meta">{{ selected.seller }} · {{ selected.campus }} · {{ selected.posted }}</div>
            </div>
            <button class="close" @click="closeListing">Close</button>
          </div>
          <div class="modal-grid">
            <div class="detail-box">{{ selected.emoji }}</div>
            <div class="detail-meta">
              <div class="detail-price">NZ$ {{ selected.price }}</div>
              <div class="pill-row">
                <span class="pill">{{ selected.category }}</span>
                <span class="pill">{{ selected.condition }}</span>
                <span class="pill">Pickup: {{ selected.pickup }}</span>
              </div>
              <p class="meta">{{ selected.desc }}</p>
              <div class="detail-note">This prototype simulates a trusted student marketplace experience with local pickup feel, quick action buttons, and platform-like product detail interaction.</div>
              <div class="card-actions">
                <button class="save" @click="toggleLike(selected.id)">{{ liked.includes(selected.id) ? 'Saved ♥' : 'Save item' }}</button>
                <button class="contact">Message seller</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `
}).mount('#app');
