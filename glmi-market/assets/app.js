const { createApp, computed, ref } = Vue;
const market = window.CAMPUS_LOOP_DATA;
const STORE = 'campus-loop-market-v2';

createApp({
  setup() {
    const saved = JSON.parse(localStorage.getItem(STORE) || '{}');
    const page = ref(saved.page || 'browse');
    const query = ref(saved.query || '');
    const category = ref(saved.category || 'All');
    const sortBy = ref(saved.sortBy || 'newest');
    const priceLabel = ref(saved.priceLabel || 'Any price');
    const liked = ref(saved.liked || []);
    const selected = ref(null);
    const sellerProfile = ref(null);
    const inboxThread = ref(saved.inboxThread || (market.fakeInbox[0]?.id ?? null));
    const toast = ref('');
    const showNotifications = ref(false);
    const postedItems = ref(saved.postedItems || []);
    const myDraft = ref(saved.myDraft || {
      title: '', price: '', category: 'Textbooks', condition: 'Used - very good', campus: 'City Campus', pickup: '', desc: ''
    });

    const allListings = computed(() => [...postedItems.value, ...market.listings]);
    const savedItems = computed(() => allListings.value.filter(item => liked.value.includes(item.id)));
    const activeThread = computed(() => market.fakeInbox.find(t => t.id === inboxThread.value) || market.fakeInbox[0]);
    const notifications = computed(() => market.notifications.slice(0, 3));
    const activePriceRange = computed(() => market.priceRanges.find(r => r.label === priceLabel.value) || market.priceRanges[0]);

    const filtered = computed(() => {
      let items = allListings.value.filter(item => {
        const byCategory = category.value === 'All' || item.category === category.value;
        const q = query.value.trim().toLowerCase();
        const byQuery = !q || [item.title, item.category, item.desc, item.seller, item.campus].join(' ').toLowerCase().includes(q);
        const byPrice = item.price >= activePriceRange.value.min && item.price <= activePriceRange.value.max;
        return byCategory && byQuery && byPrice;
      });

      if (sortBy.value === 'price-low') items = [...items].sort((a, b) => a.price - b.price);
      if (sortBy.value === 'price-high') items = [...items].sort((a, b) => b.price - a.price);
      if (sortBy.value === 'popular') items = [...items].sort((a, b) => (b.views || 0) - (a.views || 0));
      if (sortBy.value === 'newest') items = [...items].sort((a, b) => (b.id || 0) - (a.id || 0));
      return items;
    });

    function persist() {
      localStorage.setItem(STORE, JSON.stringify({
        page: page.value,
        query: query.value,
        category: category.value,
        sortBy: sortBy.value,
        priceLabel: priceLabel.value,
        liked: liked.value,
        inboxThread: inboxThread.value,
        postedItems: postedItems.value,
        myDraft: myDraft.value
      }));
    }

    function ping(message) {
      toast.value = message;
      setTimeout(() => {
        if (toast.value === message) toast.value = '';
      }, 2600);
    }

    function go(next) {
      page.value = next;
      selected.value = null;
      sellerProfile.value = null;
      persist();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    function setCategory(c) { category.value = c; persist(); }
    function toggleLike(id) {
      liked.value = liked.value.includes(id) ? liked.value.filter(x => x !== id) : [...liked.value, id];
      persist();
      ping(liked.value.includes(id) ? 'Saved to your shortlist.' : 'Removed from saved items.');
    }
    function openListing(item) { selected.value = item; }
    function closeListing() { selected.value = null; }
    function openSeller(name) { sellerProfile.value = name; }
    function closeSeller() { sellerProfile.value = null; }
    function messageSeller(item) {
      const thread = market.fakeInbox.find(t => t.item === item.title) || market.fakeInbox[0];
      inboxThread.value = thread.id;
      closeListing();
      go('inbox');
      ping('Conversation opened.');
    }
    function fakeAction(message) { ping(message); }
    function submitListing() {
      const title = myDraft.value.title.trim();
      const price = Number(myDraft.value.price);
      const pickup = myDraft.value.pickup.trim();
      const desc = myDraft.value.desc.trim();
      if (!title || !price || !pickup || !desc) {
        ping('Complete the listing fields to publish the post.');
        return;
      }
      const item = {
        id: Date.now(),
        emoji: '🛍️',
        title,
        price,
        category: myDraft.value.category,
        seller: 'You · Student seller',
        campus: myDraft.value.campus,
        condition: myDraft.value.condition,
        pickup,
        posted: 'Just now',
        views: Math.floor(Math.random() * 12) + 3,
        desc
      };
      postedItems.value.unshift(item);
      liked.value = [item.id, ...liked.value.filter(x => x !== item.id)];
      myDraft.value = { title: '', price: '', category: 'Textbooks', condition: 'Used - very good', campus: 'City Campus', pickup: '', desc: '' };
      persist();
      go('my-listings');
      ping('Listing published and added to your profile.');
    }

    return {
      market,
      page,
      query,
      category,
      sortBy,
      priceLabel,
      liked,
      filtered,
      selected,
      sellerProfile,
      savedItems,
      activeThread,
      inboxThread,
      notifications,
      postedItems,
      myDraft,
      persist,
      go,
      setCategory,
      toggleLike,
      openListing,
      closeListing,
      openSeller,
      closeSeller,
      messageSeller,
      fakeAction,
      submitListing,
      toast
    };
  },
  template: `
    <div class="wrap">
      <div class="topbar">
        <div class="brand"><div class="brand-badge">♻️</div><div>Campus Loop Market</div></div>
        <div class="nav-actions">
          <button :class="{navon: page==='browse'}" @click="go('browse')">Browse</button>
          <button :class="{navon: page==='sell'}" @click="go('sell')">Sell an item</button>
          <button :class="{navon: page==='saved'}" @click="go('saved')">Saved</button>
          <button :class="{navon: page==='inbox'}" @click="go('inbox')">Inbox</button>
          <button :class="{navon: page==='my-listings'}" @click="go('my-listings')">My listings</button>
          <button @click="showNotifications = !showNotifications">Alerts (3)</button>
          <button onclick="location.href='../glmi-showcase/'">Project story ↗</button>
        </div>
      </div>

      <div class="toast" v-if="toast">{{ toast }}</div>

      <section class="hero" v-if="page==='browse'">
        <div class="hero-grid">
          <div>
            <div class="eyebrow">{{ market.hero.badge }}</div>
            <h1>{{ market.hero.titleA }} <span class="gradient">{{ market.hero.titleB }}</span><br>{{ market.hero.titleC }}</h1>
            <p>{{ market.hero.desc }}</p>
            <div class="hero-actions">
              <button class="primary" @click="document.getElementById('listing-zone')?.scrollIntoView({behavior:'smooth'})">Start browsing</button>
              <button class="ghost" @click="go('sell')">Post in under a minute</button>
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
          <select v-model="priceLabel" @change="persist">
            <option v-for="row in market.priceRanges" :key="row.label">{{ row.label }}</option>
          </select>
          <select v-model="sortBy" @change="persist">
            <option value="newest">Sort by newest</option>
            <option value="popular">Sort by most viewed</option>
            <option value="price-low">Sort by price low to high</option>
            <option value="price-high">Sort by price high to low</option>
          </select>
          <button @click="fakeAction('Search refreshed.')">Search</button>
        </div>
      </section>

      <section class="section" v-if="page==='browse'">
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

      <section class="section two-col" v-if="page==='browse'">
        <div class="panel">
          <h3>Why students would actually use this</h3>
          <div v-for="item in market.quickLinks" :key="item.title" style="margin-bottom:14px">
            <strong style="display:block;margin-bottom:4px">{{ item.title }}</strong>
            <p style="margin:0">{{ item.text }}</p>
          </div>
        </div>
        <div class="panel">
          <h3>Seller-side value</h3>
          <ul>
            <li v-for="line in market.sellerMoments" :key="line">{{ line }}</li>
          </ul>
        </div>
      </section>

      <section class="section" v-if="page==='browse'" id="listing-zone">
        <div class="section-title">
          <div>
            <h2>Fresh listings</h2>
            <p>{{ filtered.length }} items feel live, searchable, and saved to your own local view.</p>
          </div>
        </div>
        <div class="empty-state" v-if="!filtered.length">
          <strong>No listings match this filter combination.</strong>
          <p>Try another category, widen the price range, or search more broadly.</p>
        </div>
        <div class="grid" v-else>
          <article class="card" v-for="item in filtered" :key="item.id">
            <div class="thumb">{{ item.emoji }}</div>
            <div class="card-top">
              <div>
                <div class="title">{{ item.title }}</div>
                <div class="meta seller-link" @click="openSeller(item.seller)">{{ item.seller }}</div>
                <div class="meta">{{ item.posted }} · {{ item.views }} views</div>
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

      <section class="section two-col" v-if="page==='browse'">
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

      <section class="section" v-if="page==='saved'">
        <div class="section-title"><div><h2>Saved items</h2><p>Your shortlist is stored locally to make the prototype feel personal.</p></div></div>
        <div class="empty-state" v-if="!savedItems.length">
          <strong>{{ market.savedPanel.empty }}</strong>
          <p>{{ market.savedPanel.note }}</p>
          <button class="primary" @click="go('browse')">Start browsing again</button>
        </div>
        <div class="grid" v-else>
          <article class="card" v-for="item in savedItems" :key="item.id">
            <div class="thumb">{{ item.emoji }}</div>
            <div class="card-top"><div><div class="title">{{ item.title }}</div><div class="meta">{{ item.seller }}</div></div><div class="price">NZ$ {{ item.price }}</div></div>
            <div class="meta">{{ item.desc }}</div>
            <div class="card-actions">
              <button class="save" @click="toggleLike(item.id)">Remove</button>
              <button class="contact" @click="openListing(item)">Open</button>
            </div>
          </article>
        </div>
      </section>

      <section class="section sell-layout" v-if="page==='sell'">
        <div class="panel">
          <h3>Create a listing</h3>
          <p>This form is fully interactive and posts to your local prototype state, so the product feels alive during demos.</p>
          <div class="form-grid">
            <label><span>Title</span><input v-model="myDraft.title" @input="persist" placeholder="e.g. Rice cooker, almost new" /></label>
            <label><span>Price (NZD)</span><input v-model="myDraft.price" @input="persist" type="number" placeholder="45" /></label>
            <label><span>Category</span><select v-model="myDraft.category" @change="persist"><option v-for="c in market.categories.slice(1)" :key="c">{{ c }}</option></select></label>
            <label><span>Condition</span><select v-model="myDraft.condition" @change="persist"><option v-for="c in market.conditions" :key="c">{{ c }}</option></select></label>
            <label><span>Campus</span><select v-model="myDraft.campus" @change="persist"><option v-for="c in market.campi" :key="c">{{ c }}</option></select></label>
            <label><span>Pickup point</span><input v-model="myDraft.pickup" @input="persist" placeholder="e.g. Kate Edger lobby" /></label>
            <label class="full"><span>Description</span><textarea v-model="myDraft.desc" @input="persist" placeholder="Add a short, trustworthy description that feels easy to scan."></textarea></label>
          </div>
          <div class="card-actions"><button class="primary" @click="submitListing">Publish listing</button><button class="ghost" @click="fakeAction('Draft auto-saved locally.')">Save draft</button></div>
        </div>
        <div class="panel">
          <h3>Listing tips</h3>
          <ul>
            <li>Use specific campus pickup locations to make the listing feel trustworthy.</li>
            <li>Keep the title short and practical so students can scan fast.</li>
            <li>Reasonable pricing makes the product feel more real in a presentation.</li>
          </ul>
          <div class="detail-note">Once published, the listing appears in your local “My listings” page and in the main browse feed.</div>
        </div>
      </section>

      <section class="section inbox-layout" v-if="page==='inbox'">
        <div class="thread-list panel">
          <h3>Inbox</h3>
          <button class="thread-row" :class="{threadon: inboxThread===thread.id}" v-for="thread in market.fakeInbox" :key="thread.id" @click="inboxThread = thread.id; persist()">
            <div class="thread-avatar">{{ thread.avatar }}</div>
            <div>
              <strong>{{ thread.seller }}</strong>
              <p>{{ thread.item }}</p>
            </div>
          </button>
        </div>
        <div class="panel" v-if="activeThread">
          <h3>{{ activeThread.itemEmoji }} {{ activeThread.item }}</h3>
          <div class="message-stack">
            <div v-for="(msg, idx) in activeThread.messages" :key="idx" class="bubble" :class="msg.from==='me' ? 'me' : 'them'">
              <strong>{{ msg.from==='me' ? 'You' : activeThread.seller }}</strong>
              <p>{{ msg.text }}</p>
              <span>{{ msg.time }}</span>
            </div>
          </div>
          <div class="reply-bar">
            <input placeholder="Type a reply to keep the conversation feeling real..." />
            <button class="primary" @click="fakeAction('Reply sent in prototype mode.')">Send</button>
          </div>
        </div>
      </section>

      <section class="section" v-if="page==='my-listings'">
        <div class="section-title"><div><h2>My listings</h2><p>Published items appear here so the seller journey feels complete.</p></div></div>
        <div class="empty-state" v-if="!postedItems.length">
          <strong>You have not posted anything yet.</strong>
          <p>Create a listing to make the marketplace feel truly two-sided.</p>
          <button class="primary" @click="go('sell')">Create your first listing</button>
        </div>
        <div class="grid" v-else>
          <article class="card" v-for="item in postedItems" :key="item.id">
            <div class="thumb">{{ item.emoji }}</div>
            <div class="card-top"><div><div class="title">{{ item.title }}</div><div class="meta">{{ item.posted }}</div></div><div class="price">NZ$ {{ item.price }}</div></div>
            <div class="pill-row"><span class="pill">{{ item.category }}</span><span class="pill">{{ item.condition }}</span><span class="pill">{{ item.campus }}</span></div>
            <div class="meta">{{ item.desc }}</div>
            <div class="card-actions"><button class="save" @click="fakeAction('Listing bumped to the top of local feed.')">Boost</button><button class="contact" @click="openListing(item)">Preview</button></div>
          </article>
        </div>
      </section>

      <section class="section" v-if="showNotifications">
        <div class="section-title"><div><h2>Recent alerts</h2><p>These lightweight cues help the static prototype feel actively used.</p></div></div>
        <div class="panel" v-for="(note, idx) in notifications" :key="idx" style="margin-bottom:12px"><p style="margin:0">{{ note }}</p></div>
      </section>

      <div class="footer">Campus Loop Market · static but presentation-ready · every major path is clickable for demo flow</div>

      <div class="modal-backdrop" v-if="selected" @click.self="closeListing">
        <div class="modal">
          <div class="modal-header">
            <div>
              <h3>{{ selected.title }}</h3>
              <div class="meta seller-link" @click="openSeller(selected.seller)">{{ selected.seller }}</div>
              <div class="meta">{{ selected.campus }} · {{ selected.posted }} · {{ selected.views || 0 }} views</div>
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
              <div class="detail-note">Trusted pickup feel, quick actions, visible seller cues, and lightweight feedback are what make this static marketplace feel dynamic in a presentation.</div>
              <div class="card-actions">
                <button class="save" @click="toggleLike(selected.id)">{{ liked.includes(selected.id) ? 'Saved ♥' : 'Save item' }}</button>
                <button class="contact" @click="messageSeller(selected)">Message seller</button>
              </div>
              <div class="card-actions">
                <button class="ghost" @click="fakeAction('Link copied for sharing.')">Share</button>
                <button class="ghost" @click="fakeAction('Listing reported for review.')">Report</button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="modal-backdrop" v-if="sellerProfile" @click.self="closeSeller">
        <div class="modal seller-modal">
          <div class="modal-header">
            <div>
              <h3>{{ sellerProfile }}</h3>
              <div class="meta">{{ market.sellerProfiles[sellerProfile]?.joined }} · {{ market.sellerProfiles[sellerProfile]?.response }}</div>
            </div>
            <button class="close" @click="closeSeller">Close</button>
          </div>
          <div class="seller-summary">
            <div class="seller-avatar">{{ market.sellerProfiles[sellerProfile]?.avatar || '🧑' }}</div>
            <div>
              <div class="pill-row">
                <span class="pill">{{ market.sellerProfiles[sellerProfile]?.year }}</span>
                <span class="pill">{{ market.sellerProfiles[sellerProfile]?.listings }} listings</span>
                <span class="pill">★ {{ market.sellerProfiles[sellerProfile]?.rating }}</span>
              </div>
              <p class="meta">This seller profile is static, but designed to make trust, activity, and community feel visible.</p>
            </div>
          </div>
          <div class="panel" v-if="market.sellerListings[sellerProfile]">
            <h3>Other listings from this seller</h3>
            <div class="mini-list" v-for="item in market.sellerListings[sellerProfile]" :key="item.id">
              <span>{{ item.emoji }} {{ item.title }}</span>
              <strong>NZ$ {{ item.price }}</strong>
            </div>
          </div>
        </div>
      </div>
    </div>
  `
}).mount('#app');
