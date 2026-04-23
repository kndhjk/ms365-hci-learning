window.GLMI_SITE_DATA = {
  brand: 'Our GLMI Project Walkthrough',
  hero: {
    eyebrow: 'A quick intro page for our friends and teammates',
    titleA: 'This is the',
    titleB: 'project site',
    titleC: 'we made for our GLMI idea.',
    desc: 'We built this page so people can understand our concept quickly without needing the full backstory first. It is not meant to pretend the startup is already finished. It is meant to show how we are framing the problem, why we think it matters, and how the resale marketplace prototype fits into the bigger idea.',
    stats: [
      { value: '3', label: 'core sections' },
      { value: '1', label: 'market prototype link' },
      { value: 'team', label: 'voice and framing' }
    ],
    highlights: [
      { title: 'Why we built this page', text: 'We wanted one clean place to explain what we are making and why we think it matters.' },
      { title: 'What to focus on', text: 'Look at the problem, the student need, and the reason a campus-specific resale platform makes sense.' },
      { title: 'How to use it', text: 'Start here for the logic, then jump to the market prototype for the product experience.' }
    ]
  },
  overviewCards: [
    {
      eyebrow: 'For our team',
      title: 'This page gives us a shared way to explain the idea',
      text: 'We turned our thinking into a clearer structure so it is easier to discuss, pitch, and improve together.',
      pills: ['Shared framing', 'Team-friendly', 'Easy to explain']
    },
    {
      eyebrow: 'For presentation',
      title: 'It helps us walk people through the concept step by step',
      text: 'Instead of dropping people straight into slides or notes, we can use this page as a simple narrative path.',
      pills: ['Walkthrough', 'Presentation support', 'Clearer flow']
    },
    {
      eyebrow: 'For iteration',
      title: 'We can keep updating this as the project gets sharper',
      text: 'If the problem framing changes, if our user insight improves, or if the prototype evolves, this page can evolve with it.',
      pills: ['Flexible', 'Editable', 'Fast to update']
    }
  ],
  modules: [
    {
      key: 'problem',
      number: '01',
      title: 'Problem Framing',
      subtitle: 'What problem are we actually trying to solve?',
      steps: [
        {
          type: 'content',
          title: 'Why this problem is worth talking about',
          html: `
            <h2>We need to define the problem before we talk about any solution</h2>
            <p>For GLMI, the most important thing is not jumping too quickly into solution mode. What matters first is showing that the problem is real, meaningful, and complex enough to deserve serious attention.</p>
            <div class="callout">Our framing should make it clear that this is not just a small inconvenience. It is a problem with social, behavioural, and structural dimensions.</div>
            <h3>How we want to explain it</h3>
            <ul>
              <li>Who is affected by the problem?</li>
              <li>What are they actually experiencing in everyday life?</li>
              <li>Why is this not something that can be solved by individual effort alone?</li>
              <li>Why does this connect to sustainable entrepreneurship and innovation?</li>
            </ul>
            <table>
              <tr><th>Layer</th><th>What we should talk about</th></tr>
              <tr><td>Surface</td><td>The visible symptom, such as high setup costs, friction, low trust, or wasted items.</td></tr>
              <tr><td>Behaviour</td><td>Why students do not exchange goods more easily, even when the need clearly exists.</td></tr>
              <tr><td>System</td><td>How timing, housing turnover, trust, local information, and student budgets all interact.</td></tr>
            </table>
          `
        },
        {
          type: 'note',
          title: '📝 Draft our problem statement',
          prompt: 'Write one short version of the problem, then add two lines explaining why it is persistent and worth solving.',
          placeholder: 'Example: Many students need affordable second-hand essentials, but the exchange process is fragmented, inconvenient, and often low-trust, which leads to both wasted goods and unnecessary new spending.'
        },
        {
          type: 'quiz',
          title: 'Problem framing check',
          questions: [
            {
              q: 'Which opening fits a stronger GLMI problem pitch?',
              options: ['We already built an app with many features', 'We observed a persistent student problem and want to explain the problem first', 'We mainly want to talk about revenue streams', 'We can solve everything with AI'],
              answer: 1,
              explanation: 'Problem-first framing fits the course much better than jumping straight into a solution.'
            },
            {
              q: 'What makes a problem more “wicked”?',
              options: ['It sounds dramatic', 'It has one simple answer', 'It involves multiple causes, stakeholders, and no single clean fix', 'It only affects one person'],
              answer: 2,
              explanation: 'A wicked problem is complex, interconnected, and difficult to solve in a single step.'
            }
          ]
        }
      ]
    },
    {
      key: 'evidence',
      number: '02',
      title: 'Evidence & Insight',
      subtitle: 'How we connect observation, interviews, and course ideas',
      steps: [
        {
          type: 'content',
          title: 'Why the evidence has to feel connected',
          html: `
            <h2>We do not need endless data, but we do need a believable chain of evidence</h2>
            <p>A stronger GLMI pitch usually combines several kinds of evidence rather than relying on one dramatic claim.</p>
            <ul>
              <li><strong>Observation</strong>: What have we noticed in the real world?</li>
              <li><strong>Interview or anecdote</strong>: How do actual students describe the issue?</li>
              <li><strong>Course lens</strong>: How does this connect to wicked problems, belonging, sustainability, or serendipity?</li>
              <li><strong>Research signal</strong>: Is there broader evidence that this is not just a one-off case?</li>
            </ul>
            <div class="callout info">A useful line for us is: we are not claiming there is one single cause. We are arguing that multiple factors make the problem persistent and hard to resolve.</div>
            <h3>How we should use interview material</h3>
            <p>Instead of repeating raw quotes, we should turn them into clearer insights.</p>
            <ul>
              <li>“I know where to find listings, but it still feels messy and unreliable” → the issue is not access alone, but trust and coordination.</li>
              <li>“It is easier to buy new than to organise pickup” → the problem includes convenience, not just price.</li>
            </ul>
          `
        },
        {
          type: 'code',
          title: 'Insight template',
          code: `Observation -> Pattern -> Interpretation -> Why it matters\n\nExample:\nStudents need cheap essentials at the start of term\n-> but many still buy new\n-> because second-hand options feel scattered, low-trust, and time-consuming\n-> so the deeper opportunity is not only lower prices, but a smoother and more trusted exchange system.`
        },
        {
          type: 'note',
          title: '📝 Turn evidence into insight',
          prompt: 'Take one observation or interview point and rewrite it as a pattern plus interpretation.',
          placeholder: 'Observation: Students throw away useful items during move-out.\nInsight: The issue is not only waste itself, but the lack of a simple campus-based mechanism for redistribution.'
        }
      ]
    },
    {
      key: 'pitch',
      number: '03',
      title: 'Pitch & Delivery',
      subtitle: 'How we want to present this like a serious concept',
      steps: [
        {
          type: 'content',
          title: 'How we want to sound when we present',
          html: `
            <h2>We want this to feel like a thoughtful project, not just a class exercise</h2>
            <p>The goal here is not to overload the page with theory. The goal is to help us sound clear, grounded, and realistic when we explain the concept.</p>
            <h3>A structure that works well for us</h3>
            <ul>
              <li><strong>Opening</strong>: We noticed a recurring student problem.</li>
              <li><strong>Human angle</strong>: We explain what the experience feels like for actual students.</li>
              <li><strong>System angle</strong>: We show why the issue is bigger than one person making better choices.</li>
              <li><strong>GLMI angle</strong>: We explain why this links to sustainability, innovation, and entrepreneurial opportunity.</li>
              <li><strong>Next step</strong>: We present the prototype as a direction, not as a finished company.</li>
            </ul>
            <div class="callout success">A strong line for us is: at this stage, we are not trying to oversell a finished solution. We are showing that the problem is real, important, and worth developing further.</div>
            <h3>Quick language cues</h3>
            <table>
              <tr><th>What we want to sound like</th><th>Useful phrasing</th></tr>
              <tr><td>Thoughtful</td><td>“We want to avoid jumping too quickly into solution mode.”</td></tr>
              <tr><td>Empathetic</td><td>“The challenge is not only practical, but also social and emotional.”</td></tr>
              <tr><td>Grounded</td><td>“We are still refining the problem frame and testing the assumptions behind the concept.”</td></tr>
            </table>
          `
        },
        {
          type: 'quiz',
          title: 'Pitch logic check',
          questions: [
            {
              q: 'Which line sounds more mature for our GLMI pitch?',
              options: ['We already have the perfect solution', 'This problem should be easy to fix', 'We are focusing on defining the problem more precisely and testing key assumptions', 'People just need to try harder'],
              answer: 2,
              explanation: 'That line sounds more realistic, reflective, and aligned with an early-stage GLMI concept.'
            }
          ]
        },
        {
          type: 'complete',
          title: 'Wrap-up',
          html: `
            <h2>This page gives us a usable team-facing project walkthrough</h2>
            <p>From here, we can keep refining the wording, the evidence, and the prototype connection as our GLMI project gets stronger.</p>
            <div class="pill-row">
              <span class="pill">Team voice</span>
              <span class="pill">GitHub Pages ready</span>
              <span class="pill">Linked to prototype</span>
            </div>
          `
        }
      ]
    }
  ]
};
