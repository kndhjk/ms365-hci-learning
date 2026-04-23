window.GLMI_SITE_DATA = {
  en: {
    brand: 'NeighbourLoop Project Overview',
    hero: {
      eyebrow: 'Student-to-student resale concept overview',
      titleA: 'A clearer look at',
      titleB: 'our team project',
      titleC: 'and the thinking behind it.',
      desc: 'This page is designed as a clean overview of our GLMI concept. It helps friends, teammates, and reviewers understand the problem we are focusing on, why we think it matters, and how the marketplace prototype connects to the broader idea.',
      stats: [
        { value: '3', label: 'core sections' },
        { value: '1', label: 'prototype pathway' },
        { value: 'team', label: 'project perspective' }
      ],
      highlights: [
        { title: 'Clearer framing', text: 'We use this page to explain the problem, the opportunity, and the product direction in one place.' },
        { title: 'Presentation support', text: 'It gives us a simple way to walk people through the idea before showing the prototype.' },
        { title: 'Easy to evolve', text: 'As the project develops, this overview can be updated without changing the whole structure.' }
      ]
    },
    overviewTitle: 'Why this overview matters',
    overviewDesc: 'It turns our raw project thinking into a cleaner, more presentable narrative.',
    showcaseFlow: {
      title: 'How we guide the class through it',
      desc: 'We use the showcase page to frame the problem first, then invite people into the prototype when the story is clear.',
      steps: [
        { title: 'Start with the challenge', text: 'We explain the student pain point before showing product screens, so the audience sees why the concept exists.' },
        { title: 'Move through the logic', text: 'We use the modules to keep the discussion structured: problem, evidence, and delivery.' },
        { title: 'Let people try the prototype', text: 'When the framing is clear, we invite classmates to scan the QR code and explore the marketplace themselves.' }
      ]
    },
    qrPanel: {
      title: 'Scan to try the prototype',
      desc: 'Classmates can scan this code on their phones to open the market prototype directly during the presentation.',
      caption: 'Prototype URL',
      url: 'https://kndhjk.github.io/ms365-hci-learning/glmi-market/',
      tip: 'This helps us shift from explanation to live exploration without asking people to type the link manually.'
    },
    overviewCards: [
      {
        eyebrow: 'Shared understanding',
        title: 'It helps us explain the concept consistently',
        text: 'Instead of relying on scattered notes, we use this page to keep the team aligned on the same project logic.',
        pills: ['Clarity', 'Alignment', 'Structure']
      },
      {
        eyebrow: 'Pitch support',
        title: 'It makes the idea easier to present',
        text: 'The layout is designed to move from problem framing to evidence and then into the prototype direction.',
        pills: ['Flow', 'Pitch-ready', 'Visual guide']
      },
      {
        eyebrow: 'Project development',
        title: 'It gives the project a more credible public-facing layer',
        text: 'This makes the concept feel more coherent and easier to discuss, refine, and show to other people.',
        pills: ['Credibility', 'Iteration', 'Team project']
      }
    ],
    deckTitle: 'Interactive project walkthrough',
    deckDesc: 'Use the module list to move through the concept step by step.',
    progressLabel: 'Overall progress',
    moduleLabel: 'Module',
    actions: {
      start: 'Start with the structure',
      insight: 'Jump to the evidence',
      market: 'Open marketplace prototype ↗',
      prev: '← Previous',
      next: 'Next →',
      lang: '中文'
    },
    moduleCard: {
      title: 'For project review',
      text: 'This page functions as a high-level guide to the concept, not as a final product claim.'
    },
    discussionPanel: {
      title: 'What this page helps us do in discussion',
      points: [
        'Keep the conversation anchored on the student problem instead of jumping too quickly into features.',
        'Show that the marketplace is one response inside a broader systems challenge, not just a random app idea.',
        'Make it easier for classmates and tutors to react to the concept, ask sharper questions, and test assumptions.'
      ]
    },
    footer: 'NeighbourLoop · project overview page · built for clear GLMI presentation',
    modules: [
      {
        key: 'problem',
        number: '01',
        title: 'Problem Framing',
        subtitle: 'What student problem are we actually trying to solve?',
        steps: [
          {
            type: 'content',
            title: 'Why this problem matters',
            html: `
              <h2>We begin with the problem, not the solution</h2>
              <p>A stronger GLMI concept does not start by showing off features. It starts by explaining why a real problem exists, why it persists, and why it deserves attention.</p>
              <div class="callout">In our case, the issue is not simply that students want cheaper items. The deeper issue is that access, trust, convenience, timing, and waste all interact in a way that creates repeated friction.</div>
              <h3>What we want people to understand</h3>
              <ul>
                <li>Students often need affordable essentials quickly at the start of a term or during a housing move.</li>
                <li>Useful goods already exist within the student community, but they are hard to exchange efficiently.</li>
                <li>The current process feels fragmented, low-trust, and often more effortful than simply buying new.</li>
                <li>This creates both financial strain and unnecessary waste.</li>
              </ul>
              <table>
                <tr><th>Layer</th><th>How we explain it</th></tr>
                <tr><td>Visible issue</td><td>Students struggle to find affordable second-hand goods in a simple and trusted way.</td></tr>
                <tr><td>Behavioural issue</td><td>People default to buying new because the second-hand process feels messy or inconvenient.</td></tr>
                <tr><td>System issue</td><td>There is no strong campus-centred channel that makes reuse easy, social, and reliable.</td></tr>
              </table>
            `
          },
          {
            type: 'note',
            title: '📝 Draft the problem statement',
            prompt: 'Write a short version of the problem, then add two lines explaining why it is persistent and worth solving.',
            placeholder: 'Example: Students need affordable essentials, but second-hand exchange around campus is often fragmented, low-trust, and inconvenient, which increases both cost pressure and avoidable waste.'
          },
          {
            type: 'quiz',
            title: 'Problem framing check',
            questions: [
              {
                q: 'Which opening sounds stronger for a GLMI concept?',
                options: ['We built a cool app with many features', 'We identified a recurring student problem and want to define the problem clearly first', 'We mainly want to talk about monetisation', 'We can solve everything instantly with technology'],
                answer: 1,
                explanation: 'Problem-first framing is more credible and better aligned with the course logic.'
              }
            ]
          }
        ]
      },
      {
        key: 'evidence',
        number: '02',
        title: 'Evidence & Insight',
        subtitle: 'How the concept is supported by observation and interpretation',
        steps: [
          {
            type: 'content',
            title: 'What makes the case believable',
            html: `
              <h2>We need evidence that feels connected, not random</h2>
              <p>A convincing concept is supported by a chain of observation, interpretation, and relevance. It is not just one dramatic claim.</p>
              <ul>
                <li><strong>Observation</strong>: Students often face high setup costs and fast-moving housing transitions.</li>
                <li><strong>Pattern</strong>: Many useful goods are still circulating informally, but exchange is inconsistent and hard to trust.</li>
                <li><strong>Interpretation</strong>: The issue is not only affordability. It is also convenience, coordination, and confidence.</li>
                <li><strong>Implication</strong>: A more structured campus resale platform could reduce both economic pressure and waste.</li>
              </ul>
              <div class="callout info">The key insight is that this is not just a marketplace problem. It is a coordination and trust problem inside a specific community context.</div>
              <h3>How we use evidence well</h3>
              <p>Instead of listing disconnected observations, we turn them into a clearer story about why the concept deserves exploration.</p>
            `
          },
          {
            type: 'code',
            title: 'Insight template',
            code: `Observation -> Pattern -> Interpretation -> Why it matters\n\nExample:\nStudents need household items quickly\n-> but second-hand exchange feels inconsistent\n-> because useful goods are scattered across informal channels\n-> so the opportunity is to create a trusted, campus-specific loop for reuse.`
          },
          {
            type: 'note',
            title: '📝 Turn evidence into insight',
            prompt: 'Take one observation and rewrite it as a pattern plus interpretation.',
            placeholder: 'Observation: Students often throw away useful goods during move-out.\nInsight: The issue is not only waste itself, but the absence of a simple system for redistribution within the campus community.'
          }
        ]
      },
      {
        key: 'delivery',
        number: '03',
        title: 'Pitch Direction',
        subtitle: 'How we want the concept to be understood',
        steps: [
          {
            type: 'content',
            title: 'How we present the concept',
            html: `
              <h2>We want the project to feel thoughtful, not overclaimed</h2>
              <p>This page is meant to support a clear presentation style. It should show that we understand the problem well and that the prototype is a serious direction rather than an exaggerated promise.</p>
              <h3>What our delivery should communicate</h3>
              <ul>
                <li>We are identifying a real student problem.</li>
                <li>We understand that the challenge has both practical and structural dimensions.</li>
                <li>We are using the prototype to explore a possible response, not to pretend the work is already finished.</li>
                <li>We see the concept as relevant to sustainability, affordability, and student experience.</li>
              </ul>
              <div class="callout success">A useful line for us is: at this stage, we are not presenting a final venture, but a well-framed opportunity worth developing further.</div>
              <table>
                <tr><th>Goal</th><th>Better wording</th></tr>
                <tr><td>Sound grounded</td><td>“We are still refining the concept and testing the assumptions behind it.”</td></tr>
                <tr><td>Sound thoughtful</td><td>“We want to avoid jumping too quickly into solution mode.”</td></tr>
                <tr><td>Sound relevant</td><td>“This connects cost pressure, reuse, and student transitions in one system-level challenge.”</td></tr>
              </table>
            `
          },
          {
            type: 'quiz',
            title: 'Delivery check',
            questions: [
              {
                q: 'Which line sounds more mature for this kind of project page?',
                options: ['We already have the perfect answer', 'This problem is easy to solve', 'We are presenting a credible concept direction and refining it further', 'People just need to make better choices'],
                answer: 2,
                explanation: 'That sounds more realistic, thoughtful, and credible for a developing project.'
              }
            ]
          },
          {
            type: 'complete',
            title: 'Wrap-up',
            html: `
              <h2>This gives us a cleaner way to present the project</h2>
              <p>From here, we can keep refining the concept, improving the prototype, and tightening the framing as the project develops.</p>
              <div class="pill-row">
                <span class="pill">Clear overview</span>
                <span class="pill">Prototype-linked</span>
                <span class="pill">Team-facing</span>
              </div>
            `
          }
        ]
      }
    ]
  },
  zh: {
    brand: 'NeighbourLoop 项目总览',
    hero: {
      eyebrow: '面向朋友、队友与展示场景的项目介绍页',
      titleA: '这是我们用来说明',
      titleB: '小组项目',
      titleC: '思路和原型方向的页面。',
      desc: '这个页面的作用，是让别人先快速理解我们在做什么、为什么这个问题值得做，以及交易平台原型和整体想法之间的关系。它不是为了假装项目已经完全落地，而是为了把问题、逻辑和方向讲得更清楚。',
      stats: [
        { value: '3', label: '核心板块' },
        { value: '1', label: '原型跳转入口' },
        { value: 'team', label: '小组视角' }
      ],
      highlights: [
        { title: '更清楚的结构', text: '我们把问题、机会和产品方向整理到同一个页面里。' },
        { title: '方便展示', text: '这个页面可以先讲逻辑，再带别人看原型。' },
        { title: '方便继续改', text: '随着项目推进，这个总览页也可以一起更新。' }
      ]
    },
    overviewTitle: '为什么需要这个总览页',
    overviewDesc: '它把原本比较散的项目想法，整理成更适合展示和讨论的结构。',
    showcaseFlow: {
      title: '我们怎么带着全班一起看',
      desc: '我们先用这个页面把问题讲清楚，再把大家带到原型里自己体验。',
      steps: [
        { title: '先讲挑战', text: '先让大家理解学生面对的真实问题，而不是一上来就看产品界面。' },
        { title: '再讲逻辑', text: '通过模块结构，把问题、证据和表达方式按顺序讲清楚。' },
        { title: '最后让大家试用', text: '等逻辑清楚后，再让同学扫码进入 market prototype 自己体验。' }
      ]
    },
    qrPanel: {
      title: '扫码体验原型',
      desc: '同学们可以直接用手机扫码，现场打开 market prototype。',
      caption: '原型链接',
      url: 'https://kndhjk.github.io/ms365-hci-learning/glmi-market/',
      tip: '这样我们就可以很自然地从“讲概念”切换到“现场体验”，不用让大家手动输入网址。'
    },
    overviewCards: [
      {
        eyebrow: '统一理解',
        title: '它让我们能更一致地解释这个概念',
        text: '相比零散笔记，这个页面更适合让团队围绕同一套逻辑来讨论和展示。',
        pills: ['清晰', '对齐', '结构化']
      },
      {
        eyebrow: '展示支持',
        title: '它让项目更容易被讲明白',
        text: '页面结构会先讲问题，再讲证据，最后自然过渡到原型方向。',
        pills: ['流程感', '适合 pitch', '视觉引导']
      },
      {
        eyebrow: '项目推进',
        title: '它让整个项目看起来更完整可信',
        text: '这样更方便我们对外说明、继续修改，也更容易让别人理解我们在做什么。',
        pills: ['可信度', '可迭代', '团队项目']
      }
    ],
    deckTitle: '交互式项目讲解页',
    deckDesc: '通过模块切换，可以一步一步讲清楚项目逻辑。',
    progressLabel: '整体进度',
    moduleLabel: '模块',
    actions: {
      start: '先看整体结构',
      insight: '直接看证据部分',
      market: '打开交易网站原型 ↗',
      prev: '← 上一步',
      next: '下一步 →',
      lang: 'English'
    },
    moduleCard: {
      title: '🎓 用于项目讲解',
      text: '这个页面是项目总览入口，不是最终产品成品页。'
    },
    discussionPanel: {
      title: '这个页面对讨论有什么帮助',
      points: [
        '让讨论始终围绕学生问题本身，而不是太快跳进功能细节。',
        '让 marketplace 看起来像是对系统性挑战的一种回应，而不是突然冒出来的 app 点子。',
        '方便同学和老师在理解概念之后，提出更具体的问题、反馈和质疑。'
      ]
    },
    footer: 'NeighbourLoop · 项目总览页 · 用于更清楚地展示 GLMI 概念',
    modules: [
      {
        key: 'problem',
        number: '01',
        title: '问题定义',
        subtitle: '我们到底在解决什么学生问题？',
        steps: [
          {
            type: 'content',
            title: '为什么这个问题值得做',
            html: `
              <h2>我们先讲问题，而不是先讲功能</h2>
              <p>一个更扎实的 GLMI 项目，不会一开始就展示功能，而是先说明问题为什么真实存在、为什么会持续发生、以及为什么值得被认真对待。</p>
              <div class="callout">在我们的框架里，问题不只是“学生想买更便宜的东西”。更深层的点在于，获取、信任、便利性、时间节点和浪费这些因素一起作用，导致交换始终不顺畅。</div>
              <h3>我们希望别人理解什么</h3>
              <ul>
                <li>学生在开学、搬家、换租等节点，经常需要快速找到价格更友好的生活必需品。</li>
                <li>这些物品其实已经存在于学生群体内部，只是缺少一个顺畅的流转方式。</li>
                <li>目前的二手交换过程容易让人觉得分散、低信任、麻烦。</li>
                <li>这不仅增加生活成本，也带来不必要的浪费。</li>
              </ul>
              <table>
                <tr><th>层次</th><th>我们怎么讲</th></tr>
                <tr><td>表层问题</td><td>学生很难以简单、可信的方式找到合适的二手物品。</td></tr>
                <tr><td>行为问题</td><td>很多人最后还是去买新的，因为二手流程显得不稳定、不方便。</td></tr>
                <tr><td>系统问题</td><td>缺少一个真正围绕校园社区建立的、高信任、低门槛流转渠道。</td></tr>
              </table>
            `
          },
          {
            type: 'note',
            title: '📝 先写问题陈述',
            prompt: '先写一句简短的问题定义，再补两句说明为什么它会持续存在、为什么值得解决。',
            placeholder: '例如：学生需要负担得起的生活必需品，但校园周边的二手交换往往分散、低信任且不够方便，因此同时带来了成本压力和可避免的浪费。'
          },
          {
            type: 'quiz',
            title: '问题定义检查',
            questions: [
              {
                q: '哪种 opening 更适合这种 GLMI 概念？',
                options: ['我们做了一个功能很多的 app', '我们先识别了一个反复出现的学生问题，并希望先把问题讲清楚', '我们主要想讲商业化', '技术可以瞬间解决一切'],
                answer: 1,
                explanation: '先讲清楚问题，会比直接讲功能更可信，也更符合课程逻辑。'
              }
            ]
          }
        ]
      },
      {
        key: 'evidence',
        number: '02',
        title: '证据与洞察',
        subtitle: '我们如何用观察和解释支持这个概念',
        steps: [
          {
            type: 'content',
            title: '什么样的证据更有说服力',
            html: `
              <h2>我们需要的是能连起来的证据，而不是零散例子</h2>
              <p>更有说服力的概念，通常依靠观察、模式、解释和意义之间的连接，而不是只靠一句很大的断言。</p>
              <ul>
                <li><strong>观察</strong>：学生在入学和换房时，常常会面临较高的生活启动成本。</li>
                <li><strong>模式</strong>：许多可用物品其实还在学生之间流转，只是过程不稳定。</li>
                <li><strong>解释</strong>：问题不只是价格，还包括便利性、信任和协调成本。</li>
                <li><strong>意义</strong>：更结构化的校园二手平台，可能同时缓解经济压力和浪费问题。</li>
              </ul>
              <div class="callout info">核心洞察在于，这不只是一个市场供需问题，更是特定社区里的协作和信任问题。</div>
              <h3>我们怎么更好地用证据</h3>
              <p>我们不是简单罗列现象，而是要把这些现象整理成一个能支撑项目方向的解释链条。</p>
            `
          },
          {
            type: 'code',
            title: '洞察模板',
            code: `Observation -> Pattern -> Interpretation -> Why it matters\n\nExample:\nStudents need household items quickly\n-> but second-hand exchange feels inconsistent\n-> because useful goods are scattered across informal channels\n-> so the opportunity is to create a trusted, campus-specific loop for reuse.`
          },
          {
            type: 'note',
            title: '📝 把观察改写成洞察',
            prompt: '选一条观察，把它改写成“模式 + 解释”的形式。',
            placeholder: '观察：学生在搬走时经常丢掉还能用的东西。\n洞察：问题不只是浪费本身，而是校园内部缺少一个简单有效的再分配机制。'
          }
        ]
      },
      {
        key: 'delivery',
        number: '03',
        title: '表达方式',
        subtitle: '我们希望别人如何理解这个概念',
        steps: [
          {
            type: 'content',
            title: '我们想呈现出的感觉',
            html: `
              <h2>我们希望它看起来是一个认真发展的概念，而不是夸大其词</h2>
              <p>这个页面的目标，是帮助我们更清楚地表达：我们理解问题，也知道原型只是当前阶段的一个方向，而不是已经完成的最终答案。</p>
              <h3>我们想传达什么</h3>
              <ul>
                <li>我们识别了一个真实存在的学生问题。</li>
                <li>我们知道这个问题既有实践层面，也有系统层面。</li>
                <li>我们把原型作为一个探索方向，而不是假装项目已经完全成熟。</li>
                <li>我们认为它和可持续、 affordability、学生生活体验都有关联。</li>
              </ul>
              <div class="callout success">一个适合我们的表达是：现阶段，我们展示的不是一个已经完成的 venture，而是一个值得继续推进的、有逻辑支撑的项目方向。</div>
              <table>
                <tr><th>目标</th><th>更稳的说法</th></tr>
                <tr><td>显得扎实</td><td>“我们还在继续 refining 这个概念，并测试它背后的关键假设。”</td></tr>
                <tr><td>显得谨慎</td><td>“我们希望不要太快跳进 solution mode。”</td></tr>
                <tr><td>显得有关联</td><td>“这个问题把成本压力、再利用和学生流动过程连成了一个系统性挑战。”</td></tr>
              </table>
            `
          },
          {
            type: 'quiz',
            title: '表达方式检查',
            questions: [
              {
                q: '哪一句更适合这种项目页面？',
                options: ['我们已经有完美答案了', '这个问题很容易解决', '我们正在展示一个可信的项目方向，并继续把它打磨清楚', '大家只要更努力一点就行'],
                answer: 2,
                explanation: '这种表达更真实、更成熟，也更适合还在发展中的项目。'
              }
            ]
          },
          {
            type: 'complete',
            title: '总结',
            html: `
              <h2>这个页面让我们能更清楚地讲项目</h2>
              <p>接下来，我们可以继续优化概念、完善原型，并随着项目推进把这里的内容一起更新。</p>
              <div class="pill-row">
                <span class="pill">清楚的总览</span>
                <span class="pill">已连接原型</span>
                <span class="pill">适合团队展示</span>
              </div>
            `
          }
        ]
      }
    ]
  }
};
