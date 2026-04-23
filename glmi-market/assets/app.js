const { createApp, computed, ref } = Vue;
const market = window.CAMPUS_LOOP_DATA;
const STORE = 'campus-loop-market-v7';

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
    const showProfileMenu = ref(false);
    const showSettings = ref(false);
    const loading = ref(false);
    const sidebarOpen = ref(saved.sidebarOpen ?? true);
    const reserveQueue = ref(saved.reserveQueue || []);
    const soldItems = ref(saved.soldItems || []);
    const postedItems = ref(saved.postedItems || []);
    const activeGalleryIndex = ref(0);
    const recentlyViewed = ref(saved.recentlyViewed || []);
    const compareIds = ref(saved.compareIds || []);
    const checkoutStep = ref(saved.checkoutStep || 0);
    const showCheckout = ref(false);
    const authModal = ref(false);
    const authMode = ref(saved.authMode || 'login');
    const authSubflow = ref(saved.authSubflow || 'main');
    const isLoggedIn = ref(saved.isLoggedIn || false);
    const account = ref(saved.account || { name: 'Ming · Student buyer', email: 'ming@campus.nz', avatar: '🧑‍💻' });
    const authForm = ref(saved.authForm || { name: '', email: '', password: '' });
    const savedSearches = ref(saved.savedSearches || ['electronics under $100', 'textbooks city campus']);
    const watchlist = ref(saved.watchlist || ['monitor', 'bike', 'rice cooker']);
    const myDraft = ref(saved.myDraft || { title: '', price: '', category: 'Textbooks', condition: 'Used - very good', campus: 'City Campus', pickup: '', desc: '' });

    const allListings = computed(() => [...postedItems.value, ...market.listings]);
    const visibleListings = computed(() => allListings.value.filter(item => !soldItems.value.includes(item.id)));
    const savedItems = computed(() => visibleListings.value.filter(item => liked.value.includes(item.id)));
    const activeThread = computed(() => market.fakeInbox.find(t => t.id === inboxThread.value) || market.fakeInbox[0]);
    const baseNotifications = computed(() => [
      ...market.notifications.map((text, idx) => ({ id: `sys-${idx}`, type: 'system', text, time: 'Just now' })),
      ...reserveQueue.value.slice(0, 3).map(id => {
        const item = visibleListings.value.find(x => x.id === id);
        return item ? { id: `reserve-${id}`, type: 'reserve', text: `${item.title} is reserved in your queue.`, time: 'Moments ago' } : null;
      }).filter(Boolean),
      ...(isLoggedIn.value ? [{ id: 'auth', type: 'account', text: `Welcome back, ${account.value.name}.`, time: 'Today' }] : [])
    ]);
    const notifications = computed(() => baseNotifications.value);
    const activePriceRange = computed(() => market.priceRanges.find(r => r.label === priceLabel.value) || market.priceRanges[0]);
    const myActiveListings = computed(() => postedItems.value.filter(item => !soldItems.value.includes(item.id)));
    const mySoldListings = computed(() => postedItems.value.filter(item => soldItems.value.includes(item.id)));
    const selectedGallery = computed(() => selected.value?.gallery || [selected.value?.emoji || '📦']);
    const recentItems = computed(() => recentlyViewed.value.map(id => visibleListings.value.find(item => item.id === id)).filter(Boolean).slice(0, 6));
    const recommended = computed(() => {
      const viewedCategories = recentlyViewed.value.map(id => visibleListings.value.find(x => x.id === id)?.category).filter(Boolean);
      const pool = visibleListings.value.filter(item => (category.value !== 'All' && item.category === category.value) || viewedCategories.includes(item.category));
      return (pool.length ? pool : visibleListings.value).filter(item => !selected.value || item.id !== selected.value.id).slice(0, 6);
    });
    const compareItems = computed(() => compareIds.value.map(id => visibleListings.value.find(item => item.id === id)).filter(Boolean));
    const similarItems = computed(() => {
      if (!selected.value) return [];
      return visibleListings.value.filter(item => item.id !== selected.value.id && (item.category === selected.value.category || item.campus === selected.value.campus)).slice(0, 4);
    });
    const alertCount = computed(() => notifications.value.length);
    const sellerMetrics = computed(() => ({ active: myActiveListings.value.length, sold: mySoldListings.value.length, views: myActiveListings.value.reduce((n, item) => n + (item.views || 0), 0), saves: myActiveListings.value.filter(item => liked.value.includes(item.id)).length, chats: Math.min(myActiveListings.value.length * 2 + reserveQueue.value.length, 12) }));
    const sellerReviews = computed(() => [
      { name: 'Amy', text: 'Fast reply and smooth pickup at the Student Hub.', rating: 5 },
      { name: 'Leo', text: 'Item matched the photos and meetup was easy.', rating: 5 },
      { name: 'Nina', text: 'Very practical listing details, no surprises.', rating: 4 }
    ]);

    const filtered = computed(() => {
      let items = visibleListings.value.filter(item => {
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
      localStorage.setItem(STORE, JSON.stringify({ page: page.value, query: query.value, category: category.value, sortBy: sortBy.value, priceLabel: priceLabel.value, liked: liked.value, inboxThread: inboxThread.value, postedItems: postedItems.value, myDraft: myDraft.value, reserveQueue: reserveQueue.value, soldItems: soldItems.value, sidebarOpen: sidebarOpen.value, recentlyViewed: recentlyViewed.value, compareIds: compareIds.value, checkoutStep: checkoutStep.value, authMode: authMode.value, authSubflow: authSubflow.value, isLoggedIn: isLoggedIn.value, account: account.value, authForm: authForm.value, savedSearches: savedSearches.value, watchlist: watchlist.value }));
    }

    function ping(message) { toast.value = message; setTimeout(() => { if (toast.value === message) toast.value = ''; }, 2600); }
    function requireAuth(action = 'Continue') { authModal.value = true; authSubflow.value = 'main'; ping(`${action} requires a campus account.`); }
    function fakeRefresh(message = 'Refreshing feed...') { loading.value = true; ping(message); setTimeout(() => { loading.value = false; ping('Feed refreshed.'); }, 900); }
    function go(next) { page.value = next; showProfileMenu.value = false; persist(); window.scrollTo({ top: 0, behavior: 'smooth' }); }
    function toggleSidebar() { sidebarOpen.value = !sidebarOpen.value; persist(); }
    function setCategory(c) { category.value = c; persist(); }
    function toggleLike(id) { if (!isLoggedIn.value) return requireAuth('Saving items'); liked.value = liked.value.includes(id) ? liked.value.filter(x => x !== id) : [...liked.value, id]; persist(); ping(liked.value.includes(id) ? 'Saved to your shortlist.' : 'Removed from saved items.'); }
    function openListing(item) { selected.value = item; activeGalleryIndex.value = 0; recentlyViewed.value = [item.id, ...recentlyViewed.value.filter(x => x !== item.id)].slice(0, 8); persist(); }
    function closeListing() { selected.value = null; }
    function openSeller(name) { sellerProfile.value = name; }
    function closeSeller() { sellerProfile.value = null; }
    function messageSeller(item) { if (!isLoggedIn.value) return requireAuth('Messaging sellers'); const thread = market.fakeInbox.find(t => t.item === item.title) || market.fakeInbox[0]; inboxThread.value = thread.id; closeListing(); go('inbox'); ping('Conversation opened.'); }
    function reserveItem(item) { if (!isLoggedIn.value) return requireAuth('Reserving items'); if (!reserveQueue.value.includes(item.id)) reserveQueue.value.unshift(item.id); persist(); ping('Item reserved. Seller has been notified.'); }
    function markSold(item) { if (!soldItems.value.includes(item.id)) soldItems.value.unshift(item.id); persist(); ping('Listing marked as sold.'); }
    function toggleCompare(item) { compareIds.value = compareIds.value.includes(item.id) ? compareIds.value.filter(x => x !== item.id) : [...compareIds.value.slice(-1), item.id]; persist(); ping(compareIds.value.includes(item.id) ? 'Added to compare tray.' : 'Removed from compare tray.'); }
    function openCheckout(item) { if (!isLoggedIn.value) return requireAuth('Checkout'); selected.value = item; showCheckout.value = true; checkoutStep.value = 1; persist(); }
    function closeCheckout() { showCheckout.value = false; checkoutStep.value = 0; }
    function nextCheckout() { if (checkoutStep.value < 3) checkoutStep.value += 1; else { ping('Checkout completed in demo mode.'); closeCheckout(); } persist(); }
    function fakeAction(message) { ping(message); }
    function openAuth(mode, subflow = 'main') { authMode.value = mode; authSubflow.value = subflow; authModal.value = true; persist(); }
    function submitAuth() {
      if (authSubflow.value === 'forgot') {
        if (!authForm.value.email) return ping('Enter your email to reset the password.');
        authSubflow.value = 'verify';
        persist();
        return ping('Reset email sent in demo mode.');
      }
      if (authSubflow.value === 'verify') {
        authSubflow.value = 'main';
        authMode.value = 'login';
        persist();
        return ping('Email verified. Please sign in again.');
      }
      if (!authForm.value.email || !authForm.value.password) return ping('Complete the login fields.');
      if (authMode.value === 'signup' && !authForm.value.name) return ping('Add your name to create the account.');
      isLoggedIn.value = true;
      account.value = { name: authMode.value === 'signup' ? authForm.value.name : account.value.name || 'Ming · Student buyer', email: authForm.value.email, avatar: '🧑‍💻' };
      authModal.value = false;
      persist();
      ping(authMode.value === 'signup' ? 'Account created and signed in.' : 'Signed in successfully.');
    }
    function logout() { isLoggedIn.value = false; showProfileMenu.value = false; showSettings.value = false; persist(); ping('Signed out of demo account.'); }
    function addSavedSearch() { if (!query.value.trim()) return ping('Search for something first, then save it.'); if (!savedSearches.value.includes(query.value.trim())) savedSearches.value.unshift(query.value.trim()); persist(); ping('Saved search added.'); }
    function addWatchTerm() { if (!query.value.trim()) return ping('Type a keyword first to add a watch term.'); if (!watchlist.value.includes(query.value.trim())) watchlist.value.unshift(query.value.trim()); persist(); ping('Watchlist keyword added.'); }
    function submitListing() {
      if (!isLoggedIn.value) return requireAuth('Publishing listings');
      const title = myDraft.value.title.trim(); const price = Number(myDraft.value.price); const pickup = myDraft.value.pickup.trim(); const desc = myDraft.value.desc.trim();
      if (!title || !price || !pickup || !desc) return ping('Complete the listing fields to publish the post.');
      const emojiMap = { Textbooks: '📚', Electronics: '💻', Furniture: '🪑', Kitchen: '🍳', Fashion: '👕', Transport: '🚲', Dorm: '🛏️' };
      const item = { id: Date.now(), emoji: emojiMap[myDraft.value.category] || '🛍️', gallery: [emojiMap[myDraft.value.category] || '🛍️', '✨', '📦'], title, price, category: myDraft.value.category, seller: `${account.value.name} · Student seller`, campus: myDraft.value.campus, condition: myDraft.value.condition, pickup, posted: 'Just now', views: Math.floor(Math.random() * 12) + 3, desc };
      postedItems.value.unshift(item); liked.value = [item.id, ...liked.value.filter(x => x !== item.id)]; myDraft.value = { title: '', price: '', category: 'Textbooks', condition: 'Used - very good', campus: 'City Campus', pickup: '', desc: '' }; persist(); go('my-listings'); ping('Listing published and added to your profile.');
    }

    return { market, page, query, category, sortBy, priceLabel, liked, filtered, selected, sellerProfile, savedItems, activeThread, inboxThread, notifications, postedItems, myActiveListings, mySoldListings, myDraft, reserveQueue, soldItems, selectedGallery, activeGalleryIndex, showNotifications, showProfileMenu, showSettings, loading, sidebarOpen, recentItems, recommended, compareItems, similarItems, alertCount, sellerMetrics, sellerReviews, showCheckout, checkoutStep, authModal, authMode, authSubflow, isLoggedIn, account, authForm, savedSearches, watchlist, persist, go, setCategory, toggleLike, openListing, closeListing, openSeller, closeSeller, messageSeller, reserveItem, markSold, fakeAction, submitListing, fakeRefresh, toggleSidebar, toggleCompare, openCheckout, closeCheckout, nextCheckout, openAuth, submitAuth, logout, addSavedSearch, addWatchTerm, toast };
  },
  template: `
    <div class="market-shell">
      <aside class="sidebar" :class="{closed: !sidebarOpen}">
        <div class="sidebar-head"><div class="brand"><div class="brand-badge">♻️</div><div v-if="sidebarOpen">Campus Loop Market</div></div><button class="collapse-btn" @click="toggleSidebar">{{ sidebarOpen ? '←' : '→' }}</button></div>
        <div class="sidebar-body" v-show="sidebarOpen">
          <button class="profile-chip sidebar-profile" @click="isLoggedIn ? showProfileMenu = !showProfileMenu : openAuth('login')">{{ isLoggedIn ? account.avatar + ' ' + account.name : '🔐 Sign in / Register' }}</button>
          <div class="sidebar-nav"><button :class="{navon: page==='browse'}" @click="go('browse')">Browse</button><button :class="{navon: page==='sell'}" @click="go('sell')">Sell an item</button><button :class="{navon: page==='saved'}" @click="go('saved')">Saved</button><button :class="{navon: page==='inbox'}" @click="go('inbox')">Inbox</button><button :class="{navon: page==='my-listings'}" @click="go('my-listings')">Seller dashboard</button><button @click="showNotifications = !showNotifications">Notifications ({{ alertCount }})</button><button @click="fakeRefresh()">Refresh</button><button onclick="location.href='../glmi-showcase/'">Project story ↗</button></div>
          <div class="sidebar-section" v-if="savedSearches.length"><div class="sidebar-title">Saved searches</div><button class="side-mini" v-for="row in savedSearches.slice(0,4)" :key="row" @click="query = row; persist()">🔎 {{ row }}</button></div>
          <div class="sidebar-section" v-if="recentItems.length"><div class="sidebar-title">Recently viewed</div><button class="side-mini" v-for="item in recentItems" :key="item.id" @click="openListing(item)">{{ item.emoji }} {{ item.title }}</button></div>
          <div class="sidebar-section" v-if="compareItems.length"><div class="sidebar-title">Compare tray</div><button class="side-mini" v-for="item in compareItems" :key="item.id" @click="openListing(item)">{{ item.emoji }} {{ item.title }}</button></div>
        </div>
      </aside>
      <button class="sidebar-fab" @click="toggleSidebar">{{ sidebarOpen ? '✕' : '☰' }}</button>

      <main class="content-area"><div class="wrap">
        <div class="profile-menu" v-if="showProfileMenu && isLoggedIn"><div class="panel"><div class="profile-head"><div class="seller-avatar">{{ account.avatar }}</div><div><strong>{{ account.name }}</strong><p>{{ account.email }}</p></div></div><div class="pill-row"><span class="pill">{{ market.currentUser.replies }}</span><span class="pill">Campus member</span><span class="pill">Signed in</span></div><div class="card-actions" style="margin-top:12px"><button class="ghost" @click="go('saved')">Saved items</button><button class="ghost" @click="showSettings = !showSettings">Account settings</button><button class="ghost" @click="logout">Sign out</button></div><div class="settings-box" v-if="showSettings"><strong>Account settings</strong><p>Email: {{ account.email }}</p><p>Saved searches: {{ savedSearches.length }}</p><p>Watchlist terms: {{ watchlist.length }}</p><div class="pill-row"><span class="pill" v-for="term in watchlist" :key="term">{{ term }}</span></div></div></div></div>
        <div class="toast" v-if="toast">{{ toast }}</div>

        <section class="hero" v-if="page==='browse'"><div class="hero-grid"><div><div class="eyebrow">{{ market.hero.badge }}</div><h1>{{ market.hero.titleA }} <span class="gradient">{{ market.hero.titleB }}</span><br>{{ market.hero.titleC }}</h1><p>{{ market.hero.desc }}</p><div class="hero-actions"><button class="primary" @click="document.getElementById('listing-zone')?.scrollIntoView({behavior:'smooth'})">Start browsing</button><button class="ghost" @click="isLoggedIn ? go('sell') : openAuth('signup')">{{ isLoggedIn ? 'Post in under a minute' : 'Create account to sell' }}</button><button class="ghost" @click="fakeRefresh('Refreshing local recommendations...')">Refresh picks</button></div><div class="stats"><div class="stat" v-for="item in market.hero.stats" :key="item.label"><strong>{{ item.value }}</strong><span>{{ item.label }}</span></div></div></div><div class="preview-board"><div class="floating"><h3>{{ isLoggedIn ? 'Welcome back' : 'Guest preview mode' }}</h3><p>{{ isLoggedIn ? 'Your saved searches, watchlist, checkout, inbox, and seller dashboard are all ready.' : 'Browse and compare work without login, while saving, messaging, checkout, and publishing prompt account creation.' }}</p></div><div class="floating"><h3>Watchlist & search memory</h3><p>Searches and tracked keywords now persist locally to make the account flow feel more real.</p></div></div></div><div class="searchbar"><input v-model="query" @input="persist" placeholder="Search textbooks, bikes, chairs, pans..." /><select v-model="category" @change="persist"><option v-for="c in market.categories" :key="c">{{ c }}</option></select><select v-model="priceLabel" @change="persist"><option v-for="row in market.priceRanges" :key="row.label">{{ row.label }}</option></select><select v-model="sortBy" @change="persist"><option value="newest">Sort by newest</option><option value="popular">Sort by most viewed</option><option value="price-low">Sort by price low to high</option><option value="price-high">Sort by price high to low</option></select><button @click="fakeRefresh('Running local search...')">Search</button></div><div class="card-actions" style="margin-top:14px"><button class="ghost" @click="addSavedSearch">Save this search</button><button class="ghost" @click="addWatchTerm">Add to watchlist</button></div></section>

        <section class="section" v-if="page==='browse' && recommended.length"><div class="section-title"><div><h2>Recommended right now</h2><p>Recommendations react to recent browsing, saved search intent, and category patterns.</p></div></div><div class="recommend-strip"><button class="recommend-card" v-for="item in recommended" :key="item.id" @click="openListing(item)"><span>{{ item.emoji }}</span><strong>{{ item.title }}</strong><small>NZ$ {{ item.price }}</small></button></div></section>
        <section class="section" v-if="page==='browse' && compareItems.length"><div class="section-title"><div><h2>Compare items</h2><p>Static, but built to feel like a real marketplace compare tool.</p></div></div><div class="compare-grid"><div class="compare-card" v-for="item in compareItems" :key="item.id"><strong>{{ item.emoji }} {{ item.title }}</strong><p>Price: NZ$ {{ item.price }}</p><p>Condition: {{ item.condition }}</p><p>Campus: {{ item.campus }}</p></div></div></section>
        <section class="section" v-if="page==='browse'" id="listing-zone"><div class="section-title"><div><h2>Fresh listings</h2><p>{{ filtered.length }} items feel live, searchable, reserveable, compareable, and saved to your own local view.</p></div></div><div class="skeleton-grid" v-if="loading"><div class="skeleton-card" v-for="n in 4" :key="n"></div></div><div class="grid" v-else><article class="card" v-for="item in filtered" :key="item.id"><div class="thumb">{{ item.emoji }}</div><div class="card-top"><div><div class="title">{{ item.title }}</div><div class="meta seller-link" @click="openSeller(item.seller)">{{ item.seller }}</div><div class="meta">{{ item.posted }} · {{ item.views }} views</div></div><div class="price">NZ$ {{ item.price }}</div></div><div class="pill-row"><span class="pill">{{ item.category }}</span><span class="pill">{{ item.condition }}</span><span class="pill">{{ item.campus }}</span><span class="pill reserve-pill" v-if="reserveQueue.includes(item.id)">Reserved</span></div><div class="meta">Pickup: {{ item.pickup }}</div><div class="meta">{{ item.desc }}</div><div class="card-actions"><button class="save" @click="toggleLike(item.id)">{{ liked.includes(item.id) ? 'Saved ♥' : 'Save' }}</button><button class="ghost" @click="reserveItem(item)">{{ reserveQueue.includes(item.id) ? 'Reserved' : 'Reserve' }}</button><button class="ghost" @click="toggleCompare(item)">{{ compareItems.some(x => x.id === item.id) ? 'Compared' : 'Compare' }}</button><button class="contact" @click="openListing(item)">View details</button></div></article></div></section>
        <section class="section" v-if="page==='saved'"><div class="section-title"><div><h2>Saved items</h2><p>Your shortlist is stored locally to make the prototype feel personal.</p></div></div><div class="grid"><article class="card" v-for="item in savedItems" :key="item.id"><div class="thumb">{{ item.emoji }}</div><div class="card-top"><div><div class="title">{{ item.title }}</div><div class="meta">{{ item.seller }}</div></div><div class="price">NZ$ {{ item.price }}</div></div><div class="meta">{{ item.desc }}</div><div class="card-actions"><button class="save" @click="toggleLike(item.id)">Remove</button><button class="ghost" @click="reserveItem(item)">{{ reserveQueue.includes(item.id) ? 'Reserved' : 'Reserve' }}</button><button class="contact" @click="openListing(item)">Open</button></div></article></div></section>
        <section class="section sell-layout" v-if="page==='sell'"><div class="panel"><h3>Create a listing</h3><p>This form is fully interactive and posts to your local prototype state, so the product feels alive during demos.</p><div class="form-grid"><label><span>Title</span><input v-model="myDraft.title" @input="persist" placeholder="e.g. Rice cooker, almost new" /></label><label><span>Price (NZD)</span><input v-model="myDraft.price" @input="persist" type="number" placeholder="45" /></label><label><span>Category</span><select v-model="myDraft.category" @change="persist"><option v-for="c in market.categories.slice(1)" :key="c">{{ c }}</option></select></label><label><span>Condition</span><select v-model="myDraft.condition" @change="persist"><option v-for="c in market.conditions" :key="c">{{ c }}</option></select></label><label><span>Campus</span><select v-model="myDraft.campus" @change="persist"><option v-for="c in market.campi" :key="c">{{ c }}</option></select></label><label><span>Pickup point</span><input v-model="myDraft.pickup" @input="persist" placeholder="e.g. Kate Edger lobby" /></label><label class="full"><span>Description</span><textarea v-model="myDraft.desc" @input="persist" placeholder="Add a short, trustworthy description that feels easy to scan."></textarea></label></div><div class="card-actions"><button class="primary" @click="submitListing">Publish listing</button><button class="ghost" @click="fakeAction('Draft auto-saved locally.')">Save draft</button></div></div><div class="panel"><h3>Account-aware selling flow</h3><ul><li>Guest mode can browse, compare, and inspect items.</li><li>Saving, messaging, checkout, and publishing require account sign-in.</li><li>Register, login, forgot password, and verify-email are all simulated flows.</li></ul></div></section>
        <section class="section inbox-layout" v-if="page==='inbox'"><div class="thread-list panel"><h3>Inbox</h3><button class="thread-row" :class="{threadon: inboxThread===thread.id}" v-for="thread in market.fakeInbox" :key="thread.id" @click="inboxThread = thread.id; persist()"><div class="thread-avatar">{{ thread.avatar }}</div><div><strong>{{ thread.seller }}</strong><p>{{ thread.item }}</p></div></button></div><div class="panel" v-if="activeThread"><h3>{{ activeThread.itemEmoji }} {{ activeThread.item }}</h3><div class="message-stack"><div v-for="(msg, idx) in activeThread.messages" :key="idx" class="bubble" :class="msg.from==='me' ? 'me' : 'them'"><strong>{{ msg.from==='me' ? 'You' : activeThread.seller }}</strong><p>{{ msg.text }}</p><span>{{ msg.time }}</span></div></div><div class="reply-bar"><input placeholder="Type a reply to keep the conversation feeling real..." /><button class="primary" @click="fakeAction('Reply sent in prototype mode.')">Send</button></div></div></section>
        <section class="section" v-if="page==='my-listings'"><div class="section-title"><div><h2>Seller analytics dashboard</h2><p>Metrics, active listings, sold archive, reviews, and quick actions all in one place.</p></div></div><div class="analytics-grid"><div class="stat-card"><strong>{{ sellerMetrics.active }}</strong><span>Active listings</span></div><div class="stat-card"><strong>{{ sellerMetrics.sold }}</strong><span>Sold items</span></div><div class="stat-card"><strong>{{ sellerMetrics.views }}</strong><span>Total views</span></div><div class="stat-card"><strong>{{ sellerMetrics.saves }}</strong><span>Saved by buyers</span></div><div class="stat-card"><strong>{{ sellerMetrics.chats }}</strong><span>Open chats</span></div></div><div class="panel" style="margin-bottom:18px"><h3>Recent reviews</h3><div class="review-row" v-for="(row, idx) in sellerReviews" :key="idx"><strong>{{ row.name }}</strong><span>★ {{ row.rating }}</span><p>{{ row.text }}</p></div></div><div class="section-subtitle">Active listings</div><div class="grid"><article class="card" v-for="item in myActiveListings" :key="item.id"><div class="thumb">{{ item.emoji }}</div><div class="card-top"><div><div class="title">{{ item.title }}</div><div class="meta">{{ item.posted }}</div></div><div class="price">NZ$ {{ item.price }}</div></div><div class="meta">{{ item.desc }}</div><div class="card-actions"><button class="save" @click="fakeAction('Listing bumped to the top of local feed.')">Boost</button><button class="ghost" @click="markSold(item)">Mark sold</button><button class="contact" @click="openListing(item)">Preview</button></div></article></div><div class="section-subtitle" v-if="mySoldListings.length">Sold archive</div><div class="grid" v-if="mySoldListings.length"><article class="card sold-card" v-for="item in mySoldListings" :key="item.id"><div class="thumb">{{ item.emoji }}</div><div class="card-top"><div><div class="title">{{ item.title }}</div><div class="meta">Completed listing</div></div><div class="price">Sold</div></div><div class="meta">{{ item.desc }}</div></article></div></section>
        <section class="section" v-if="showNotifications"><div class="section-title"><div><h2>Notification center</h2><p>Now structured more like an app feed instead of a simple note list.</p></div></div><div class="notification-card" v-for="note in notifications" :key="note.id"><div class="notification-dot" :class="note.type"></div><div><strong>{{ note.type === 'reserve' ? 'Reservation update' : note.type === 'account' ? 'Account update' : 'Market update' }}</strong><p>{{ note.text }}</p><small>{{ note.time }}</small></div></div></section>
        <div class="footer">Campus Loop Market · static but presentation-ready · every major path is clickable for demo flow</div>
      </div></main>

      <div class="modal-backdrop" v-if="selected" @click.self="closeListing"><div class="modal"><div class="modal-header"><div><h3>{{ selected.title }}</h3><div class="meta seller-link" @click="openSeller(selected.seller)">{{ selected.seller }}</div><div class="meta">{{ selected.campus }} · {{ selected.posted }} · {{ selected.views || 0 }} views</div></div><button class="close" @click="closeListing">Close</button></div><div class="modal-grid"><div><div class="detail-box">{{ selectedGallery[activeGalleryIndex] }}</div><div class="gallery-strip"><button class="gallery-thumb" :class="{galleryon: activeGalleryIndex===idx}" v-for="(g, idx) in selectedGallery" :key="idx" @click="activeGalleryIndex = idx">{{ g }}</button></div></div><div class="detail-meta"><div class="detail-price">NZ$ {{ selected.price }}</div><div class="pill-row"><span class="pill">{{ selected.category }}</span><span class="pill">{{ selected.condition }}</span><span class="pill">Pickup: {{ selected.pickup }}</span><span class="pill reserve-pill" v-if="reserveQueue.includes(selected.id)">Reserved</span></div><p class="meta">{{ selected.desc }}</p><div class="detail-note">Trusted pickup feel, quick actions, compare, similar items, reserve states, account gates, and feedback loops make this static marketplace feel dynamic in a presentation.</div><div class="card-actions"><button class="save" @click="toggleLike(selected.id)">{{ liked.includes(selected.id) ? 'Saved ♥' : 'Save item' }}</button><button class="ghost" @click="reserveItem(selected)">{{ reserveQueue.includes(selected.id) ? 'Reserved' : 'Reserve item' }}</button><button class="ghost" @click="toggleCompare(selected)">{{ compareItems.some(x => x.id === selected.id) ? 'Compared' : 'Compare' }}</button><button class="contact" @click="messageSeller(selected)">Message seller</button></div><div class="card-actions"><button class="ghost" @click="openCheckout(selected)">Checkout</button><button class="ghost" @click="fakeAction('Link copied for sharing.')">Share</button><button class="ghost" @click="fakeAction('Listing reported for review.')">Report</button></div><div class="similar-strip" v-if="similarItems.length"><strong>Similar items</strong><button class="side-mini" v-for="item in similarItems" :key="item.id" @click="openListing(item)">{{ item.emoji }} {{ item.title }}</button></div></div></div></div></div>
      <div class="modal-backdrop" v-if="showCheckout" @click.self="closeCheckout"><div class="modal checkout-modal"><div class="modal-header"><div><h3>Checkout drawer</h3><div class="meta">Multi-step static flow for presentation realism</div></div><button class="close" @click="closeCheckout">Close</button></div><div class="checkout-steps"><div class="checkout-step" :class="{on: checkoutStep>=1}">1. Review</div><div class="checkout-step" :class="{on: checkoutStep>=2}">2. Pickup</div><div class="checkout-step" :class="{on: checkoutStep>=3}">3. Confirm</div></div><div class="panel"><p v-if="checkoutStep===1">Review the listing, verify the price, and confirm reservation details.</p><p v-else-if="checkoutStep===2">Choose a campus pickup window and preferred meetup point.</p><p v-else>Confirm the order and trigger a seller notification in demo mode.</p></div><div class="card-actions"><button class="ghost" @click="closeCheckout">Cancel</button><button class="primary" @click="nextCheckout">{{ checkoutStep < 3 ? 'Next step' : 'Complete order' }}</button></div></div></div>
      <div class="modal-backdrop" v-if="authModal" @click.self="authModal = false"><div class="modal auth-modal"><div class="modal-header"><div><h3>{{ authSubflow === 'forgot' ? 'Forgot password' : authSubflow === 'verify' ? 'Verify email' : authMode === 'signup' ? 'Create account' : 'Sign in' }}</h3><div class="meta">Static onboarding flow with realistic gating.</div></div><button class="close" @click="authModal = false">Close</button></div><div class="card-actions" style="margin-bottom:12px" v-if="authSubflow === 'main'"><button class="ghost" @click="authMode = 'login'">Login</button><button class="ghost" @click="authMode = 'signup'">Register</button></div><div class="form-grid"><label v-if="authMode === 'signup' && authSubflow === 'main'" class="full"><span>Name</span><input v-model="authForm.name" @input="persist" placeholder="Ming Zhao" /></label><label class="full"><span>Email</span><input v-model="authForm.email" @input="persist" placeholder="name@campus.nz" /></label><label class="full" v-if="authSubflow === 'main'"><span>Password</span><input v-model="authForm.password" @input="persist" type="password" placeholder="••••••••" /></label><div class="detail-note" v-if="authSubflow === 'verify'">We sent a verification code to {{ authForm.email || 'your inbox' }} in demo mode. Confirm to finish the account flow.</div></div><div class="card-actions"><button class="primary" @click="submitAuth">{{ authSubflow === 'forgot' ? 'Send reset email' : authSubflow === 'verify' ? 'Verify email' : authMode === 'signup' ? 'Create account' : 'Sign in' }}</button><button class="ghost" v-if="authSubflow === 'main'" @click="authSubflow = 'forgot'">Forgot password</button><button class="ghost" v-if="authSubflow !== 'main'" @click="authSubflow = 'main'">Back</button></div></div></div>
      <div class="modal-backdrop" v-if="sellerProfile" @click.self="closeSeller"><div class="modal seller-modal"><div class="modal-header"><div><h3>{{ sellerProfile }}</h3><div class="meta">{{ market.sellerProfiles[sellerProfile]?.joined }} · {{ market.sellerProfiles[sellerProfile]?.response }}</div></div><button class="close" @click="closeSeller">Close</button></div><div class="seller-summary"><div class="seller-avatar">{{ market.sellerProfiles[sellerProfile]?.avatar || '🧑' }}</div><div><div class="pill-row"><span class="pill">{{ market.sellerProfiles[sellerProfile]?.year }}</span><span class="pill">{{ market.sellerProfiles[sellerProfile]?.listings }} listings</span><span class="pill">★ {{ market.sellerProfiles[sellerProfile]?.rating }}</span></div><p class="meta">This seller profile is static, but designed to make trust, activity, and community feel visible.</p></div></div><div class="panel" v-if="market.sellerListings[sellerProfile]"><h3>Other listings from this seller</h3><div class="mini-list" v-for="item in market.sellerListings[sellerProfile]" :key="item.id"><span>{{ item.emoji }} {{ item.title }}</span><strong>NZ$ {{ item.price }}</strong></div></div></div></div>
    </div>
  `
}).mount('#app');
