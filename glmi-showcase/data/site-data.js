window.GLMI_SITE_DATA = {
  brand: 'GLMI Spark Deck',
  hero: {
    eyebrow: 'GLMI 712 · Problem Pitch Playground',
    titleA: '把你的',
    titleB: 'GLMI 题目',
    titleC: '做成像真的展示站',
    desc: '这是一套给 GLMI 使用的欢快静态展示页，重点不是炫技，而是把 problem pitch、课程框架、研究洞察、采访证据和展示逻辑包装得更像一个成熟项目。适合拿去讲、改、继续扩写。',
    stats: [
      { value: '3', label: '大展示区块' },
      { value: '8+', label: '可替换内容卡片' },
      { value: '1', label: 'GitHub Pages 路径' }
    ],
    highlights: [
      { title: 'Problem-first', text: '先定义问题，再谈方案，符合 GLMI 老师口味。' },
      { title: 'Evidence-backed', text: '把观察、访谈、课程框架和数据串起来。' },
      { title: 'Pitch-ready', text: '内容结构天然适合口头 presentation。' }
    ]
  },
  overviewCards: [
    {
      eyebrow: 'Course Fit',
      title: '这站是按 GLMI 的脑回路写的',
      text: '不是普通项目 landing page，而是把 sustainable entrepreneurship、problem framing、wicked problem、serendipity 和 stakeholder insight 融进页面结构。',
      pills: ['Problem Pitch', 'Wicked Problem', 'Sustainability']
    },
    {
      eyebrow: 'Presentation Mode',
      title: '适合直接当演讲辅助页面',
      text: '每个模块都像一张可展开的 slide，口头汇报时可以边讲边切，不容易乱。',
      pills: ['Storytelling', 'Flow', 'Visual cue']
    },
    {
      eyebrow: 'Editable',
      title: '内容是可替换的',
      text: '你后面发给我的 GLMI 题目材料、访谈记录、观察笔记，都可以继续塞进这套骨架里。',
      pills: ['Replaceable', 'Modular', 'GitHub Pages']
    }
  ],
  modules: [
    {
      key: 'problem',
      number: '01',
      title: 'Problem Framing',
      subtitle: '先把问题讲痛，再讲为什么值得做',
      steps: [
        {
          type: 'content',
          title: '问题为什么成立',
          html: `
            <h2>先定义你到底在解决什么</h2>
            <p>GLMI 的 pitch 最忌讳的是上来就给 solution。老师更想听的是：<strong>这个问题为什么重要、为什么复杂、为什么现在值得关注</strong>。</p>
            <div class="callout">一个更像 GLMI 的表达方式是：这不是单点 inconvenience，而是一个带有 social, emotional, behavioural 和 system-level dimension 的复杂问题。</div>
            <h3>推荐你这样讲</h3>
            <ul>
              <li>先说目标群体是谁。</li>
              <li>再说他们正在经历什么痛点。</li>
              <li>再说这个痛点为什么不是简单靠个人努力就能解决。</li>
              <li>最后补一句，这个问题和 sustainable entrepreneurship 有什么关系。</li>
            </ul>
            <table>
              <tr><th>层次</th><th>你应该讲什么</th></tr>
              <tr><td>Surface</td><td>表面症状，比如孤独、低参与、信息断裂。</td></tr>
              <tr><td>Behaviour</td><td>人为什么不去参加活动、不表达、不求助。</td></tr>
              <tr><td>System</td><td>学校支持、社交结构、文化适应、语言门槛如何共同作用。</td></tr>
            </table>
          `
        },
        {
          type: 'note',
          title: '📝 Problem statement 草稿',
          prompt: '先写一句最短的问题定义，再补两句为什么它是个“值得研究而且复杂”的问题。',
          placeholder: '例：许多国际学生并不缺少活动信息，而是缺少能真正产生归属感的关系入口，这让“到达一个新环境”变成“长期处于边缘感”的状态。'
        },
        {
          type: 'quiz',
          title: 'Problem framing 自测',
          questions: [
            {
              q: '哪种 opening 最符合 GLMI 老师偏好？',
              options: ['我做了一个 app，功能很多', '我观察到一个复杂而持续的社会问题，先解释问题本身', '我已经想好商业模式了', '我会用 AI 解决全部问题'],
              answer: 1,
              explanation: 'Problem-first 才是这门课更看重的路径。'
            },
            {
              q: 'Wicked problem 的意思更接近什么？',
              options: ['很邪恶的问题', '答案唯一的问题', '牵涉多方利益、难以一次性定义和解决的问题', '只要技术够强就能快速解决的问题'],
              answer: 2,
              explanation: 'Wicked problem 不是“坏”，而是复杂、相互依赖、没有简单单一解。'
            }
          ]
        }
      ]
    },
    {
      key: 'evidence',
      number: '02',
      title: 'Evidence & Insight',
      subtitle: '把观察、访谈、课程框架串起来',
      steps: [
        {
          type: 'content',
          title: '证据不一定要很大，但一定要成链条',
          html: `
            <h2>你要的不是“数据越多越好”，而是“证据互相支撑”</h2>
            <p>一套可信的 GLMI pitch，通常是这样组合证据的：</p>
            <ul>
              <li><strong>Observation</strong>：你看到了什么真实现象。</li>
              <li><strong>Interview / anecdote</strong>：目标群体怎么描述他们的感受。</li>
              <li><strong>Course concept</strong>：这个现象怎么对应 wicked problem、belonging、sustainability、serendipity。</li>
              <li><strong>Research signal</strong>：有没有公开研究或数据说明这不是个案。</li>
            </ul>
            <div class="callout info">真正好用的一句话：I am not claiming this problem only exists because of one cause. I am arguing that multiple factors make the experience persistent and difficult to resolve.</div>
            <h3>访谈内容怎么用</h3>
            <p>不要把访谈写成流水账。把原话提炼成 insight，例如：</p>
            <ul>
              <li>“我知道有活动，但我去了也很难留下来” → 问题不只是 access，而是 social stickiness。</li>
              <li>“大家都很忙，我不想打扰别人” → 问题里有 self-protection 和 rejection fear。</li>
            </ul>
          `
        },
        {
          type: 'code',
          title: 'Insight 模板',
          code: `Observation -> Pattern -> Interpretation -> Why it matters\n\nExample:\nStudents attend orientation events\n-> but connections fade quickly\n-> because initial exposure does not become repeated, low-friction social contact\n-> so the deeper problem is not event availability, but weak belonging infrastructure.`
        },
        {
          type: 'note',
          title: '📝 访谈 insight 提炼',
          prompt: '把一段原始观察或访谈，改写成“模式 + 含义”的形式。',
          placeholder: '观察：学生会去活动但不持续。\nInsight：活动提供了短期接触，但没有形成低门槛、可持续的重复互动结构，所以归属感很难沉淀。'
        }
      ]
    },
    {
      key: 'pitch',
      number: '03',
      title: 'Pitch & Delivery',
      subtitle: '怎么讲得像一个成熟项目，而不是课堂作业',
      steps: [
        {
          type: 'content',
          title: '展示的时候怎么更像真的',
          html: `
            <h2>把 presentation 变成“项目说明会”</h2>
            <p>这页的重点不是加更多理论，而是让你讲出来的时候更稳、更像真的 founder / researcher / problem framer。</p>
            <h3>推荐结构</h3>
            <ul>
              <li><strong>Opening</strong>：我注意到一个持续出现的问题。</li>
              <li><strong>Human angle</strong>：这个问题在人的真实体验里是什么样。</li>
              <li><strong>Systems angle</strong>：为什么它不是个人努力就能完全解决。</li>
              <li><strong>GLMI angle</strong>：为什么它与 sustainable entrepreneurship / innovation 有关。</li>
              <li><strong>Next step</strong>：我现在不是直接承诺 solution，而是继续定义问题空间并测试方向。</li>
            </ul>
            <div class="callout success">这一句很好用：My goal at this stage is not to oversell a finished solution, but to show that the problem is real, meaningful, and worth deeper entrepreneurial exploration.</div>
            <h3>Cheat sheet</h3>
            <table>
              <tr><th>你想达到的效果</th><th>更稳的说法</th></tr>
              <tr><td>显得成熟</td><td>“I want to avoid jumping too quickly into solution mode.”</td></tr>
              <tr><td>显得有同理心</td><td>“The challenge is not only practical, but also emotional and social.”</td></tr>
              <tr><td>显得有研究意识</td><td>“At this stage I am refining the problem frame and validating assumptions.”</td></tr>
            </table>
          `
        },
        {
          type: 'quiz',
          title: 'Pitch 逻辑检查',
          questions: [
            {
              q: '哪句话最像成熟的 GLMI pitch？',
              options: ['我已经想到一个完美 solution', '这个问题应该很容易解决', '我当前重点是把问题定义得更准确，并验证关键假设', '只要大家更积极一点就好了'],
              answer: 2,
              explanation: '这更符合 problem exploration 阶段。'
            }
          ]
        },
        {
          type: 'complete',
          title: '完成页',
          html: `
            <h2>这套 GLMI 页面骨架已经能直接用了</h2>
            <p>接下来你只需要把自己的具体 problem、引用、访谈和课程概念继续往里填，就能很快变成一个像真的项目展示页。</p>
            <div class="pill-row">
              <span class="pill">GitHub Pages Ready</span>
              <span class="pill">Vue Static</span>
              <span class="pill">GLMI-friendly</span>
            </div>
          `
        }
      ]
    }
  ]
};
