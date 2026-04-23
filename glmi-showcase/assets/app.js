const { createApp, computed, ref } = Vue;
const SOURCE = window.GLMI_SITE_DATA;
const STORAGE_KEY = 'glmi-showcase-state-v4';
const MARKET_URL = 'https://kndhjk.github.io/ms365-hci-learning/glmi-market/';
const QR_URL = `https://api.qrserver.com/v1/create-qr-code/?size=280x280&data=${encodeURIComponent(MARKET_URL)}`;

createApp({
  setup() {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
    const language = ref(saved.language || 'en');
    const data = computed(() => SOURCE[language.value]);
    const currentModule = ref(saved.currentModule || SOURCE.en.modules[0].key);
    const currentStep = ref(saved.currentStep || 0);
    const notes = ref(saved.notes || {});
    const answers = ref(saved.answers || {});

    const moduleIndex = computed(() => data.value.modules.findIndex(m => m.key === currentModule.value));
    const moduleData = computed(() => data.value.modules[moduleIndex.value]);
    const steps = computed(() => moduleData.value.steps);
    const step = computed(() => steps.value[currentStep.value]);
    const progressPercent = computed(() => Math.round(((moduleIndex.value + (currentStep.value + 1) / steps.value.length) / data.value.modules.length) * 100));

    function persist() {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ language: language.value, currentModule: currentModule.value, currentStep: currentStep.value, notes: notes.value, answers: answers.value }));
    }
    function toggleLanguage() { language.value = language.value === 'en' ? 'zh' : 'en'; persist(); }
    function switchModule(key) { currentModule.value = key; currentStep.value = 0; persist(); window.scrollTo({ top: 0, behavior: 'smooth' }); }
    function nextStep() { if (currentStep.value < steps.value.length - 1) currentStep.value += 1; else if (moduleIndex.value < data.value.modules.length - 1) { currentModule.value = data.value.modules[moduleIndex.value + 1].key; currentStep.value = 0; } persist(); window.scrollTo({ top: 0, behavior: 'smooth' }); }
    function prevStep() { if (currentStep.value > 0) currentStep.value -= 1; else if (moduleIndex.value > 0) { const prevModule = data.value.modules[moduleIndex.value - 1]; currentModule.value = prevModule.key; currentStep.value = prevModule.steps.length - 1; } persist(); window.scrollTo({ top: 0, behavior: 'smooth' }); }
    function setNote(key, value) { notes.value[key] = value; persist(); }
    function answerKey(qi) { return `${language.value}_${currentModule.value}_${currentStep.value}_${qi}`; }
    function choose(qi, picked) { answers.value[answerKey(qi)] = picked; persist(); }

    return { language, data, currentModule, currentStep, moduleData, step, progressPercent, toggleLanguage, switchModule, nextStep, prevStep, setNote, notes, answers, answerKey, qrUrl: QR_URL };
  },
  template: `
    <div class="shell">
      <section class="hero">
        <div class="nav">
          <div class="brand"><div class="brand-badge">✨</div><div>{{ data.brand }}</div></div>
          <div class="nav-links">
            <button class="active">{{ data.overviewCards[0].eyebrow }}</button>
            <button>{{ data.overviewCards[1].eyebrow }}</button>
            <button>{{ data.overviewCards[2].eyebrow }}</button>
            <button @click="toggleLanguage()">{{ data.actions.lang }}</button>
          </div>
        </div>

        <div class="hero-grid">
          <div>
            <div class="pill-row" style="margin-bottom:10px"><span class="pill">{{ data.hero.eyebrow }}</span></div>
            <h1>{{ data.hero.titleA }} <span class="gradient">{{ data.hero.titleB }}</span><br>{{ data.hero.titleC }}</h1>
            <p>{{ data.hero.desc }}</p>
            <div class="hero-actions">
              <button class="cta" @click="switchModule(data.modules[0].key)">{{ data.actions.start }}</button>
              <button class="secondary-btn" @click="switchModule(data.modules[1].key)">{{ data.actions.insight }}</button>
              <button class="secondary-btn" onclick="location.href='../glmi-market/'">{{ data.actions.market }}</button>
            </div>
            <div class="hero-stats"><div class="stat" v-for="item in data.hero.stats" :key="item.label"><strong>{{ item.value }}</strong><span>{{ item.label }}</span></div></div>
          </div>
          <div class="illustration">
            <div class="float-card"><h3>{{ data.moduleCard.title }}</h3><p>{{ data.moduleCard.text }}</p></div>
            <div class="spark-list"><div class="spark" v-for="item in data.hero.highlights" :key="item.title"><strong>{{ item.title }}</strong><p style="margin:6px 0 0;color:var(--muted)">{{ item.text }}</p></div></div>
          </div>
        </div>
      </section>

      <section class="section qr-section">
        <div class="section-title"><div><h2>{{ data.qrPanel.title }}</h2><p>{{ data.qrPanel.desc }}</p></div></div>
        <div class="qr-layout">
          <div class="qr-card">
            <img :src="qrUrl" alt="Market prototype QR code" class="qr-image" />
            <p class="qr-caption">{{ data.qrPanel.caption }}</p>
            <a class="qr-link" :href="data.qrPanel.url" target="_blank">{{ data.qrPanel.url }}</a>
          </div>
          <div class="qr-notes">
            <div class="callout info">{{ data.qrPanel.tip }}</div>
            <div class="card-grid single-col">
              <article class="card" v-for="row in data.showcaseFlow.steps" :key="row.title">
                <div class="eyebrow">Flow</div>
                <h3>{{ row.title }}</h3>
                <p>{{ row.text }}</p>
              </article>
            </div>
          </div>
        </div>
      </section>

      <section class="section">
        <div class="section-title"><div><h2>{{ data.overviewTitle }}</h2><p>{{ data.overviewDesc }}</p></div></div>
        <div class="card-grid">
          <article class="card" v-for="card in data.overviewCards" :key="card.title"><div class="eyebrow">{{ card.eyebrow }}</div><h3>{{ card.title }}</h3><p>{{ card.text }}</p><div class="pill-row"><span class="pill" v-for="pill in card.pills" :key="pill">{{ pill }}</span></div></article>
        </div>
      </section>

      <section class="section">
        <div class="section-title"><div><h2>{{ data.discussionPanel.title }}</h2></div></div>
        <div class="card-grid single-col">
          <article class="card"><ul><li v-for="point in data.discussionPanel.points" :key="point">{{ point }}</li></ul></article>
        </div>
      </section>

      <section class="section">
        <div class="section-title"><div><h2>{{ data.deckTitle }}</h2><p>{{ data.deckDesc }}</p></div><div style="min-width:220px;width:280px"><div class="progress"><div :style="{width: progressPercent + '%'}"></div></div><p style="margin:8px 0 0;color:var(--muted);font-size:14px">{{ data.progressLabel }} {{ progressPercent }}%</p></div></div>
        <div class="module-layout">
          <div class="module-nav"><button class="module-btn" :class="{active: currentModule===mod.key}" v-for="mod in data.modules" :key="mod.key" @click="switchModule(mod.key)"><small>{{ data.moduleLabel }} {{ mod.number }}</small><strong>{{ mod.title }}</strong><span>{{ mod.subtitle }}</span></button></div>
          <div class="module-view">
            <div class="module-head"><div><div class="pill-row"><span class="pill">{{ moduleData.number }}</span><span class="pill">{{ moduleData.title }}</span></div><h2 style="margin:10px 0 0;font-family:'Baloo 2',cursive">{{ moduleData.subtitle }}</h2></div></div>
            <div class="step-dots"><span v-for="(s, idx) in moduleData.steps" :key="idx" :class="{on: idx===currentStep, done: idx<currentStep}"></span></div>
            <div class="content" v-if="step.type==='content'" v-html="step.html"></div>
            <div class="content" v-else-if="step.type==='code'"><h2>{{ step.title }}</h2><div class="code">{{ step.code }}</div></div>
            <div class="content" v-else-if="step.type==='note'"><div class="note-box"><h4>{{ step.title }}</h4><p>{{ step.prompt }}</p><textarea :placeholder="step.placeholder" :value="notes[language + '_' + currentModule + '_' + currentStep] || ''" @input="setNote(language + '_' + currentModule + '_' + currentStep, $event.target.value)"></textarea></div></div>
            <div class="content quiz" v-else-if="step.type==='quiz'"><div class="q" v-for="(q, qi) in step.questions" :key="qi"><h4>{{ qi + 1 }}. {{ q.q }}</h4><div v-for="(opt, oi) in q.options" :key="oi" class="opt" :class="{ correct: answers[answerKey(qi)] !== undefined && oi === q.answer, wrong: answers[answerKey(qi)] === oi && oi !== q.answer }" @click="choose(qi, oi)">{{ String.fromCharCode(65 + oi) }}. {{ opt }}</div><div class="explain" v-if="answers[answerKey(qi)] !== undefined">{{ q.explanation }}</div></div></div>
            <div class="content" v-else-if="step.type==='complete'" v-html="step.html"></div>
            <div class="step-actions"><button class="ghost" @click="prevStep">{{ data.actions.prev }}</button><button class="primary" @click="nextStep">{{ data.actions.next }}</button></div>
          </div>
        </div>
      </section>

      <div class="footer">{{ data.footer }}</div>
    </div>
  `
}).mount('#app');
