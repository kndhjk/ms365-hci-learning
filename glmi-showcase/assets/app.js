const { createApp, computed, ref } = Vue;
const data = window.GLMI_SITE_DATA;
const STORAGE_KEY = 'glmi-showcase-state-v2';

const zh = {
  nav: ['项目逻辑', '研究证据', '表达方式'],
  start: '开始看结构',
  insight: '先看 insight',
  market: '打开交易网站 ↗',
  glmiCardTitle: '🎓 给 GLMI 用的讲解入口',
  glmiCardText: '这是我们给朋友、队友和老师快速看懂项目逻辑用的页面。',
  whyTitle: '为什么这页存在',
  whyDesc: '不是堆字，而是把我们的项目逻辑整理成更容易讲解的结构。',
  deckTitle: '交互式 GLMI 讲解页',
  deckDesc: '左边切模块，右边按步骤展开。',
  overall: '整体浏览进度',
  module: '模块',
  prev: '← 上一步',
  next: '下一步 →',
  footer: '为 GLMI 准备的静态 Vue 讲解页 · 支持 GitHub Pages',
  lang: '中文'
};

const en = {
  nav: ['Project logic', 'Research insight', 'Delivery'],
  start: 'Start with the structure',
  insight: 'Jump to insight',
  market: 'Open resale prototype ↗',
  glmiCardTitle: '🎓 Team-facing GLMI intro page',
  glmiCardText: 'This page helps friends, teammates, and teachers understand our project logic quickly.',
  whyTitle: 'Why this page exists',
  whyDesc: 'Instead of dumping notes, we turned our thinking into a cleaner walkthrough.',
  deckTitle: 'Interactive GLMI walkthrough',
  deckDesc: 'Use the left side to switch modules and the right side to move step by step.',
  overall: 'Overall progress',
  module: 'Module',
  prev: '← Previous',
  next: 'Next →',
  footer: 'Built for GLMI · static Vue walkthrough · GitHub Pages ready',
  lang: 'English'
};

createApp({
  setup() {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
    const currentModule = ref(saved.currentModule || data.modules[0].key);
    const currentStep = ref(saved.currentStep || 0);
    const notes = ref(saved.notes || {});
    const answers = ref(saved.answers || {});
    const language = ref(saved.language || 'en');

    const copy = computed(() => language.value === 'zh' ? zh : en);
    const moduleIndex = computed(() => data.modules.findIndex(m => m.key === currentModule.value));
    const moduleData = computed(() => data.modules[moduleIndex.value]);
    const steps = computed(() => moduleData.value.steps);
    const step = computed(() => steps.value[currentStep.value]);
    const progressPercent = computed(() => Math.round(((moduleIndex.value + (currentStep.value + 1) / steps.value.length) / data.modules.length) * 100));

    function persist() {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({
        currentModule: currentModule.value,
        currentStep: currentStep.value,
        notes: notes.value,
        answers: answers.value,
        language: language.value
      }));
    }

    function toggleLanguage() {
      language.value = language.value === 'en' ? 'zh' : 'en';
      persist();
    }

    function switchModule(key) {
      currentModule.value = key;
      currentStep.value = 0;
      persist();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    function nextStep() {
      if (currentStep.value < steps.value.length - 1) {
        currentStep.value += 1;
      } else if (moduleIndex.value < data.modules.length - 1) {
        currentModule.value = data.modules[moduleIndex.value + 1].key;
        currentStep.value = 0;
      }
      persist();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    function prevStep() {
      if (currentStep.value > 0) {
        currentStep.value -= 1;
      } else if (moduleIndex.value > 0) {
        const prevModule = data.modules[moduleIndex.value - 1];
        currentModule.value = prevModule.key;
        currentStep.value = prevModule.steps.length - 1;
      }
      persist();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    function setNote(key, value) {
      notes.value[key] = value;
      persist();
    }

    function answerKey(qi) {
      return `${currentModule.value}_${currentStep.value}_${qi}`;
    }

    function choose(qi, picked) {
      answers.value[answerKey(qi)] = picked;
      persist();
    }

    return {
      data,
      currentModule,
      currentStep,
      moduleData,
      step,
      progressPercent,
      switchModule,
      nextStep,
      prevStep,
      setNote,
      notes,
      answers,
      answerKey,
      language,
      copy,
      toggleLanguage
    };
  },
  template: `
    <div class="shell">
      <section class="hero">
        <div class="nav">
          <div class="brand">
            <div class="brand-badge">✨</div>
            <div>{{ data.brand }}</div>
          </div>
          <div class="nav-links">
            <button class="active">{{ copy.nav[0] }}</button>
            <button>{{ copy.nav[1] }}</button>
            <button>{{ copy.nav[2] }}</button>
            <button @click="toggleLanguage()">{{ copy.lang }}</button>
          </div>
        </div>

        <div class="hero-grid">
          <div>
            <div class="pill-row" style="margin-bottom:10px">
              <span class="pill">{{ data.hero.eyebrow }}</span>
            </div>
            <h1>{{ data.hero.titleA }} <span class="gradient">{{ data.hero.titleB }}</span><br>{{ data.hero.titleC }}</h1>
            <p>{{ data.hero.desc }}</p>
            <div class="hero-actions">
              <button class="cta" @click="switchModule(data.modules[0].key)">{{ copy.start }}</button>
              <button class="secondary-btn" @click="switchModule(data.modules[1].key)">{{ copy.insight }}</button>
              <button class="secondary-btn" onclick="location.href='../glmi-market/'">{{ copy.market }}</button>
            </div>
            <div class="hero-stats">
              <div class="stat" v-for="item in data.hero.stats" :key="item.label">
                <strong>{{ item.value }}</strong>
                <span>{{ item.label }}</span>
              </div>
            </div>
          </div>
          <div class="illustration">
            <div class="float-card">
              <h3>{{ copy.glmiCardTitle }}</h3>
              <p>{{ copy.glmiCardText }}</p>
            </div>
            <div class="spark-list">
              <div class="spark" v-for="item in data.hero.highlights" :key="item.title">
                <strong>{{ item.title }}</strong>
                <p style="margin:6px 0 0;color:var(--muted)">{{ item.text }}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section class="section">
        <div class="section-title">
          <div>
            <h2>{{ copy.whyTitle }}</h2>
            <p>{{ copy.whyDesc }}</p>
          </div>
        </div>
        <div class="card-grid">
          <article class="card" v-for="card in data.overviewCards" :key="card.title">
            <div class="eyebrow">{{ card.eyebrow }}</div>
            <h3>{{ card.title }}</h3>
            <p>{{ card.text }}</p>
            <div class="pill-row"><span class="pill" v-for="pill in card.pills" :key="pill">{{ pill }}</span></div>
          </article>
        </div>
      </section>

      <section class="section">
        <div class="section-title">
          <div>
            <h2>{{ copy.deckTitle }}</h2>
            <p>{{ copy.deckDesc }}</p>
          </div>
          <div style="min-width:220px;width:280px">
            <div class="progress"><div :style="{width: progressPercent + '%'}"></div></div>
            <p style="margin:8px 0 0;color:var(--muted);font-size:14px">{{ copy.overall }} {{ progressPercent }}%</p>
          </div>
        </div>

        <div class="module-layout">
          <div class="module-nav">
            <button class="module-btn" :class="{active: currentModule===mod.key}" v-for="mod in data.modules" :key="mod.key" @click="switchModule(mod.key)">
              <small>{{ copy.module }} {{ mod.number }}</small>
              <strong>{{ mod.title }}</strong>
              <span>{{ mod.subtitle }}</span>
            </button>
          </div>

          <div class="module-view">
            <div class="module-head">
              <div>
                <div class="pill-row"><span class="pill">{{ moduleData.number }}</span><span class="pill">{{ moduleData.title }}</span></div>
                <h2 style="margin:10px 0 0;font-family:'Baloo 2',cursive">{{ moduleData.subtitle }}</h2>
              </div>
            </div>

            <div class="step-dots">
              <span v-for="(s, idx) in moduleData.steps" :key="idx" :class="{on: idx===currentStep, done: idx<currentStep}"></span>
            </div>

            <div class="content" v-if="step.type==='content'" v-html="step.html"></div>

            <div class="content" v-else-if="step.type==='code'">
              <h2>{{ step.title }}</h2>
              <div class="code">{{ step.code }}</div>
            </div>

            <div class="content" v-else-if="step.type==='note'">
              <div class="note-box">
                <h4>{{ step.title }}</h4>
                <p>{{ step.prompt }}</p>
                <textarea :placeholder="step.placeholder" :value="notes[currentModule + '_' + currentStep] || ''" @input="setNote(currentModule + '_' + currentStep, $event.target.value)"></textarea>
              </div>
            </div>

            <div class="content quiz" v-else-if="step.type==='quiz'">
              <div class="q" v-for="(q, qi) in step.questions" :key="qi">
                <h4>{{ qi + 1 }}. {{ q.q }}</h4>
                <div v-for="(opt, oi) in q.options" :key="oi" class="opt"
                  :class="{
                    correct: answers[answerKey(qi)] !== undefined && oi === q.answer,
                    wrong: answers[answerKey(qi)] === oi && oi !== q.answer
                  }"
                  @click="choose(qi, oi)">
                  {{ String.fromCharCode(65 + oi) }}. {{ opt }}
                </div>
                <div class="explain" v-if="answers[answerKey(qi)] !== undefined">{{ q.explanation }}</div>
              </div>
            </div>

            <div class="content" v-else-if="step.type==='complete'" v-html="step.html"></div>

            <div class="step-actions">
              <button class="ghost" @click="prevStep">{{ copy.prev }}</button>
              <button class="primary" @click="nextStep">{{ copy.next }}</button>
            </div>
          </div>
        </div>
      </section>

      <div class="footer">
        {{ copy.footer }}
      </div>
    </div>
  `
}).mount('#app');
