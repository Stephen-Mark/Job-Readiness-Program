const modules = [
  {
    id: 1,
    icon: '🤝',
    title: 'Engaging with an Employer',
    description: 'Learn how to build positive relationships with supervisors, take instruction well, and show initiative in the workplace.',
    estimatedTime: '25 min',
    objectives: [
      'Understand what employers expect from young workers',
      'Learn how to take instruction and feedback professionally',
      'Discover how showing initiative can set you apart',
      'Build a positive attitude that helps you thrive at work',
    ],
    keyConcepts: [
      {
        title: 'Employer expectations',
        body: 'Employers want workers who are reliable, respectful, and willing to learn. You don\'t need years of experience — a great attitude goes a long way. Turning up on time, doing what you\'re asked, and treating everyone respectfully puts you ahead of the pack.',
      },
      {
        title: 'Taking instruction',
        body: 'When a supervisor gives you direction, listen carefully, ask questions if you\'re unsure, and then follow through. If you disagree with something, raise it respectfully — not in the moment in front of others, but privately when the time is right.',
      },
      {
        title: 'Showing initiative',
        body: 'Initiative means looking for ways to help without being asked. Finished your task? Ask "Is there anything else I can help with?" Noticed something that needs doing? Do it (if it\'s within your role). This is how you go from "fine employee" to "someone we want to keep."',
      },
      {
        title: 'Positive attitude',
        body: 'A positive attitude doesn\'t mean being happy 24/7. It means approaching challenges with a "can-do" mindset, staying professional when things get tough, and supporting your team even when things don\'t go your way.',
      },
    ],
    scenario: {
      prompt: 'You\'ve been working at a café for two weeks. Your supervisor pulls you aside and says: "I need you to take orders differently — write them down instead of remembering them." You were trained to memorise orders and think your way works fine. What\'s the best response?',
      options: [
        { id: 'a', text: 'Keep doing it your way — you were trained like that and it\'s been working', feedback: 'Not quite. Even if your way has been fine, your supervisor has a reason for the change. Going against direct instruction can damage trust.', correct: false },
        { id: 'b', text: 'Say "Sure, I can do that. Should I start now?" then follow their guidance', feedback: 'Excellent! Saying yes, asking a clarifying question, and following through shows professionalism. You can always ask later why the change was made.', correct: true },
        { id: 'c', text: 'Write orders down when your supervisor is watching, but keep memorising when they\'re not', feedback: 'This is a form of dishonesty at work. If discovered, it seriously damages trust and your reputation.', correct: false },
        { id: 'd', text: 'Tell them you\'ll only change if they explain exactly why', feedback: 'Demanding an explanation before agreeing comes across as resistant. It\'s fine to ask why, but frame it as curiosity ("Can I ask what\'s driving the change?") not as a condition.', correct: false },
      ],
    },
    quiz: [
      {
        id: 1,
        question: 'What does "showing initiative" at work mean?',
        options: ['Doing only what you\'re specifically told to do', 'Looking for ways to help without being asked', 'Telling your coworkers what to do', 'Avoiding extra responsibilities'],
        correct: 1,
        explanation: 'Initiative means proactively looking for opportunities to contribute. Employers love workers who don\'t need to be micromanaged.',
      },
      {
        id: 2,
        question: 'A supervisor gives you feedback on your work. What\'s the best response?',
        options: ['Argue your point straight away to show confidence', 'Ignore it if you think you\'re right', 'Listen actively, thank them, and consider how to improve', 'Go and talk to other coworkers about it instead'],
        correct: 2,
        explanation: 'Feedback is a gift. Even if you disagree, listening first and responding professionally shows maturity and earns respect.',
      },
      {
        id: 3,
        question: 'A positive attitude at work primarily means:',
        options: ['Being cheerful and smiling all the time', 'Agreeing with everything your employer says', 'Approaching challenges with a can-do mindset and staying professional', 'Pretending problems don\'t exist'],
        correct: 2,
        explanation: 'Positivity isn\'t about faking happiness — it\'s about how you handle difficulty. Staying calm and constructive under pressure is a huge workplace asset.',
      },
    ],
    badge: { emoji: '🤝', name: 'Employer Ready', color: '#2DBFAD' },
  },
  {
    id: 2,
    icon: '💼',
    title: 'Workplace Etiquette',
    description: 'Master professional behaviour, presentation, punctuality, and the unwritten rules that make workplaces run smoothly.',
    estimatedTime: '25 min',
    objectives: [
      'Understand professional dress and presentation standards',
      'Know why punctuality matters and how to handle lateness',
      'Recognise respectful workplace behaviour',
      'Understand your role in workplace safety',
    ],
    keyConcepts: [
      {
        title: 'Professional presentation',
        body: 'Your appearance is the first thing people notice. "Professional" doesn\'t always mean a suit — it means clean, appropriate clothing for your workplace. A hospitality job has different standards than a construction site. When in doubt, dress slightly smarter than you think you need to.',
      },
      {
        title: 'Punctuality',
        body: 'Being on time shows respect for your employer, your coworkers, and the customers you serve. If you\'re going to be late, always communicate — call or text as soon as you know. Silence is always the worst option.',
      },
      {
        title: 'Respectful behaviour',
        body: 'Treat everyone with respect regardless of their role — the cleaner deserves the same courtesy as the manager. Avoid gossip, keep personal conversations brief during work time, and be mindful of noise and shared spaces.',
      },
      {
        title: 'Workplace safety',
        body: 'Safety is everyone\'s responsibility — not just managers or safety officers. Know where emergency exits are. Report hazards immediately. Never take shortcuts that could hurt you or someone else. Ask questions if you\'re unsure how to safely do a task.',
      },
    ],
    scenario: {
      prompt: 'It\'s your first day of work experience. You wake up late and realise you\'ll arrive 15 minutes after your start time. What\'s the best thing to do?',
      options: [
        { id: 'a', text: 'Don\'t worry — 15 minutes isn\'t a big deal on your first day', feedback: 'First impressions matter enormously. Arriving late without communication on day one sets a negative tone from the very start.', correct: false },
        { id: 'b', text: 'Call or text your supervisor right away to let them know you\'re on your way and apologise', feedback: 'Perfect. Communicating proactively shows maturity and respect. Apologise briefly, give a realistic arrival time, and focus on being great once you get there.', correct: true },
        { id: 'c', text: 'Rush in as fast as possible and hope no one notices you\'re late', feedback: 'People will notice. And arriving flustered without explaining yourself looks worse than calmly communicating you\'re running late.', correct: false },
        { id: 'd', text: 'Don\'t go at all — it\'s too embarrassing now', feedback: 'This would be a serious mistake. Not showing up at all (without communication) on day one would likely end your placement immediately.', correct: false },
      ],
    },
    quiz: [
      {
        id: 1,
        question: 'What does "appropriate workplace attire" mean?',
        options: ['The most expensive clothes you own', 'Clothing that matches the dress code, is clean, and suits the environment', 'Whatever is most comfortable for you personally', 'Casual clothes since you\'re just a student on placement'],
        correct: 1,
        explanation: 'Professional dress varies by industry, but it always means clean, neat clothing appropriate to the role. When in doubt, ask in advance what to wear.',
      },
      {
        id: 2,
        question: 'Workplace safety is whose responsibility?',
        options: ['Only the workplace safety officer\'s', 'Only the manager\'s', 'Only new employees need to worry about it', 'Everyone\'s — all workers share responsibility for safety'],
        correct: 3,
        explanation: 'Safety is a shared responsibility. Everyone in a workplace has a role in keeping it safe — including spotting and reporting hazards.',
      },
      {
        id: 3,
        question: 'Being "reliable" at work means:',
        options: ['Working overtime every single day', 'Being best friends with your supervisor', 'Showing up on time and following through on your commitments', 'Doing whatever your colleagues ask you to do'],
        correct: 2,
        explanation: 'Reliability is one of the most valued qualities in any employee. Doing what you say you\'ll do, when you said you\'d do it, builds enormous trust.',
      },
    ],
    badge: { emoji: '💼', name: 'Workplace Pro', color: '#1A1753' },
  },
  {
    id: 3,
    icon: '🌟',
    title: 'Skills, Passions & Career Pathways',
    description: 'Discover your strengths, explore your interests, and connect them to real career pathways available in Australia.',
    estimatedTime: '30 min',
    objectives: [
      'Identify your personal strengths and transferable skills',
      'Explore the connection between passions and careers',
      'Understand the different education and training pathways in Victoria',
      'Create a rough career direction based on your profile',
    ],
    keyConcepts: [
      {
        title: 'What are transferable skills?',
        body: 'Transferable skills are abilities you can use across many different jobs — like communication, problem-solving, teamwork, and organisation. You build these through school, sport, part-time work, hobbies, and everyday life. They\'re valuable in every career.',
      },
      {
        title: 'Linking passions to pathways',
        body: 'The best careers often sit at the intersection of what you\'re good at and what you enjoy. Love working with people? Consider healthcare, education, hospitality, or sales. Into technology? Look at IT, cybersecurity, or engineering. Creative? Explore design, media, or architecture.',
      },
      {
        title: 'Pathways in Victoria',
        body: 'There\'s no single "right" path after school. University degrees, TAFE/VET qualifications, apprenticeships, traineeships, and direct employment are all valid routes. VET subjects during school (like Certificate II or III) can give you a head start in trades, childcare, business, and more.',
      },
      {
        title: 'Self-awareness at work',
        body: 'Knowing your strengths means you can confidently talk about them in interviews. Knowing your weaknesses means you can work on them. Self-aware workers are more adaptable, resilient, and easier to manage — all things employers love.',
      },
    ],
    scenario: {
      prompt: 'You\'re filling out a job application and it asks: "What are your key strengths?" You freeze — you\'re not sure what to write. What\'s the best approach?',
      options: [
        { id: 'a', text: 'Write "I\'m a hard worker" and leave it at that', feedback: 'Too vague. "Hard worker" is one of the most overused phrases in applications. You need specific examples to make your answer stand out.', correct: false },
        { id: 'b', text: 'Think about feedback you\'ve received from teachers or coaches, and experiences where you did something well', feedback: 'Great thinking! Reflecting on real experiences gives you specific, credible examples. "My teachers have told me I\'m great at explaining things clearly" is much stronger than a generic claim.', correct: true },
        { id: 'c', text: 'Just copy what you\'ve seen on other people\'s résumés', feedback: 'Copying sounds inauthentic and generic. Employers can tell. Your own real examples are always more compelling.', correct: false },
        { id: 'd', text: 'Skip the question — you\'re not sure and don\'t want to get it wrong', feedback: 'Skipping questions on applications is never a good idea. Everyone has strengths — take time to reflect and give it your best answer.', correct: false },
      ],
    },
    quiz: [
      {
        id: 1,
        question: 'Which of these is an example of a "transferable skill"?',
        options: ['Knowing how to use a specific piece of machinery', 'Being able to communicate clearly with different people', 'Having a driver\'s licence for a particular vehicle class', 'Knowing the specific software used at one company'],
        correct: 1,
        explanation: 'Transferable skills work across jobs and industries. Communication, teamwork, problem-solving, and time management are classic examples.',
      },
      {
        id: 2,
        question: 'Which pathway leads to a trade qualification in Australia?',
        options: ['A university bachelor\'s degree', 'A VET certificate or apprenticeship through TAFE', 'Completing Year 12 only', 'An online hobby course'],
        correct: 1,
        explanation: 'Trades like electrician, plumber, chef, and hairdresser are completed through VET (Vocational Education and Training) pathways, often via TAFE or registered training organisations.',
      },
      {
        id: 3,
        question: 'Why is self-awareness important for career planning?',
        options: ['It tells you exactly which job you should get', 'It lets you copy what your successful friends are doing', 'It helps you understand your strengths and find work that suits you', 'Self-awareness isn\'t really important for work'],
        correct: 2,
        explanation: 'Understanding your own skills, values, and interests helps you make better career decisions and communicate your value to employers effectively.',
      },
    ],
    badge: { emoji: '🌟', name: 'Self-Aware', color: '#F5A623' },
    hasSkillsAssessment: true,
    skillsAssessment: {
      prompt: 'Select all the skills and qualities that feel like YOU. Be honest — there are no wrong answers.',
      skills: [
        { id: 'helping', label: 'I enjoy helping people', categories: ['healthcare', 'education', 'social-work'] },
        { id: 'creative', label: 'I love making or designing things', categories: ['design', 'arts', 'architecture'] },
        { id: 'tech', label: 'I\'m good with technology and computers', categories: ['IT', 'engineering', 'data'] },
        { id: 'outdoors', label: 'I prefer working outdoors or with my hands', categories: ['trades', 'agriculture', 'construction'] },
        { id: 'numbers', label: 'I\'m good with numbers and data', categories: ['finance', 'accounting', 'engineering'] },
        { id: 'talking', label: 'I love talking and presenting to groups', categories: ['sales', 'teaching', 'law', 'media'] },
        { id: 'animals', label: 'I love working with animals or nature', categories: ['veterinary', 'agriculture', 'environmental-science'] },
        { id: 'cooking', label: 'I enjoy cooking or food', categories: ['hospitality', 'culinary', 'nutrition'] },
        { id: 'organising', label: 'I\'m naturally organised and love planning', categories: ['project-management', 'business', 'logistics'] },
        { id: 'sport', label: 'Sport and fitness are a big part of my life', categories: ['sports-coaching', 'physio', 'personal-training'] },
      ],
    },
  },
  {
    id: 4,
    icon: '💻',
    title: 'Digital Literacy',
    description: 'Build the digital skills that modern workplaces require — from professional email to online safety and social media smarts.',
    estimatedTime: '25 min',
    objectives: [
      'Write professional emails that get results',
      'Understand the risks of social media in a professional context',
      'Practise basic cybersecurity habits',
      'Use digital tools to stay productive at work',
    ],
    keyConcepts: [
      {
        title: 'Professional email',
        body: 'Email is still one of the most common ways to communicate at work. A good work email has a clear subject line, a polite greeting (Dear [Name] or Hi [Name]), a concise message, and your name at the end. Avoid slang, excessive emoji, and long paragraphs. Always re-read before you send.',
      },
      {
        title: 'Social media at work',
        body: 'Think of your online presence as your public brand. Many employers Google job applicants before interviews. Anything public — photos, opinions, jokes — can affect your professional reputation. Adjust your privacy settings, and think before you post.',
      },
      {
        title: 'Cybersecurity basics',
        body: 'Use a strong, unique password for work accounts (mix of letters, numbers, symbols). Never share your passwords. Be careful with links and attachments you weren\'t expecting — they could be phishing attempts. Lock your computer when you walk away.',
      },
      {
        title: 'Digital productivity tools',
        body: 'Most workplaces use tools like Google Workspace, Microsoft 365, Slack, or Trello. Being comfortable learning new software is more important than knowing any specific tool. Take notes, ask questions, and practise — you\'ll pick it up quickly.',
      },
    ],
    scenario: {
      prompt: 'A friend tags you in an embarrassing photo on Instagram from last weekend. Your profile is public and your employer can see it. What\'s the smartest move?',
      options: [
        { id: 'a', text: 'Leave it — your employer probably won\'t see it', feedback: 'Don\'t count on it. Many employers regularly check employees\' and candidates\' social media. "Probably won\'t" isn\'t a professional strategy.', correct: false },
        { id: 'b', text: 'Ask your friend to remove the tag, review your privacy settings, and audit your profile', feedback: 'Smart move. Removing the tag, tightening your privacy settings, and reviewing what\'s visible is the right approach. Proactive beats reactive every time.', correct: true },
        { id: 'c', text: 'Delete your Instagram account completely', feedback: 'Too drastic. You can manage your online presence without deleting everything. Adjust privacy settings and remove the tag instead.', correct: false },
        { id: 'd', text: 'Post lots of professional content to push the photo down in your feed', feedback: 'That might help a little, but it doesn\'t remove the photo. Getting the tag removed and fixing privacy settings is the direct solution.', correct: false },
      ],
    },
    quiz: [
      {
        id: 1,
        question: 'A professional work email should always include:',
        options: ['Emojis and casual slang to seem relatable', 'A clear subject line, polite greeting, concise message, and your name', 'CC\'d to as many colleagues as possible', 'ALL CAPS for important points'],
        correct: 1,
        explanation: 'Professional emails are clear, concise, and polite. A good subject line helps the recipient prioritise. Your name at the end confirms who sent it.',
      },
      {
        id: 2,
        question: 'What makes a strong password for a work account?',
        options: ['Your name and birthday so you remember it easily', 'A mix of letters, numbers, and symbols that\'s hard to guess', '"password123" — simple and memorable', 'The same password you use for all your accounts'],
        correct: 1,
        explanation: 'Strong passwords are random-looking combinations of different character types. Using the same password everywhere is dangerous — if one account is breached, all are at risk.',
      },
      {
        id: 3,
        question: 'When it comes to social media as a working professional, the best approach is:',
        options: ['Share all your personal opinions freely — it\'s your personal account', 'Think carefully about how posts could affect your professional reputation', 'Never use social media at all while employed', 'Only post work-related content every time'],
        correct: 1,
        explanation: 'You don\'t need to delete social media — just be thoughtful. Consider whether a post could be seen by an employer or client and how it might look.',
      },
    ],
    badge: { emoji: '💻', name: 'Digitally Savvy', color: '#2DBFAD' },
  },
  {
    id: 5,
    icon: '🗣️',
    title: 'Communication Skills',
    description: 'Develop the communication skills that make you a great teammate — listening, speaking clearly, giving feedback, and resolving tension.',
    estimatedTime: '25 min',
    objectives: [
      'Practise active listening techniques',
      'Communicate clearly and assertively without being aggressive',
      'Give and receive feedback constructively',
      'Understand how non-verbal communication affects your message',
    ],
    keyConcepts: [
      {
        title: 'Active listening',
        body: 'Listening is more than waiting for your turn to talk. Active listening means making eye contact, nodding, avoiding distractions (put the phone down), and reflecting back what you heard: "So what you\'re saying is…". It makes people feel genuinely heard.',
      },
      {
        title: 'Assertive communication',
        body: 'Assertive communication is the middle ground between passive (staying silent) and aggressive (demanding your way). It means expressing your thoughts and needs clearly and respectfully. "I feel frustrated when tasks change at the last minute — can we agree on a better process?" is assertive.',
      },
      {
        title: 'Giving and receiving feedback',
        body: 'When giving feedback, focus on the behaviour, not the person: "The report was missing the budget section" not "You\'re careless." When receiving feedback, listen fully before responding. Avoid defensiveness — feedback helps you grow.',
      },
      {
        title: 'Non-verbal communication',
        body: 'Research suggests over half of communication is non-verbal. Your posture, eye contact, facial expression, and tone of voice all send messages. Crossed arms can signal defensiveness. Strong eye contact signals confidence. Matching your words with your body language builds trust.',
      },
    ],
    scenario: {
      prompt: 'During a group project meeting, a team member keeps interrupting you mid-sentence. It\'s getting frustrating. How do you handle it respectfully?',
      options: [
        { id: 'a', text: 'Shout over them to get your point across', feedback: 'This escalates the tension and makes you look unprofessional. There\'s a better way to assert yourself.', correct: false },
        { id: 'b', text: 'Stop speaking and let them take over — it\'s not worth the conflict', feedback: 'Being passive doesn\'t solve the problem. The interruptions are likely to continue, and you\'ll feel increasingly frustrated.', correct: false },
        { id: 'c', text: 'Calmly say: "I\'d like to finish my point — then I\'d love to hear yours." Then continue.', feedback: 'This is assertive communication at its best. You\'re clear, calm, and respectful. You acknowledge their desire to speak while holding your ground.', correct: true },
        { id: 'd', text: 'Complain to your supervisor immediately after the meeting', feedback: 'Going straight to a supervisor without trying to resolve it yourself first can seem like an overreaction. Try assertive communication first.', correct: false },
      ],
    },
    quiz: [
      {
        id: 1,
        question: 'Active listening means:',
        options: ['Thinking about your response while the other person is still talking', 'Fully focusing on the speaker and responding thoughtfully', 'Nodding along even if you have no idea what they\'re saying', 'Only listening to the parts you find interesting'],
        correct: 1,
        explanation: 'Active listening is a full engagement with what\'s being said. It helps you understand accurately and makes the speaker feel valued.',
      },
      {
        id: 2,
        question: 'Assertive communication is:',
        options: ['Being loud and forceful to get your way', 'Staying silent to keep the peace', 'Expressing your thoughts clearly and respectfully', 'Always agreeing with whoever has the most authority'],
        correct: 2,
        explanation: 'Assertiveness sits between passivity and aggression. It means advocating for yourself or others calmly and directly.',
      },
      {
        id: 3,
        question: 'Non-verbal communication includes:',
        options: ['Only the actual words you choose to use', 'Text messages and emails', 'Body language, eye contact, facial expressions, and tone of voice', 'Written reports and presentations'],
        correct: 2,
        explanation: 'Non-verbal cues often communicate more than words. Being aware of your body language helps you send consistent, credible messages.',
      },
    ],
    badge: { emoji: '🗣️', name: 'Communicator', color: '#E8635A' },
  },
  {
    id: 6,
    icon: '📋',
    title: 'Organisational Skills',
    description: 'Master time management, task prioritisation, and the habits that help you meet deadlines and keep your cool under pressure.',
    estimatedTime: '30 min',
    objectives: [
      'Use prioritisation frameworks to manage competing tasks',
      'Break large tasks into manageable steps',
      'Develop strategies for meeting deadlines consistently',
      'Take ownership and responsibility for your work',
    ],
    keyConcepts: [
      {
        title: 'Prioritisation — urgent vs. important',
        body: 'Not all tasks are equal. The Eisenhower Matrix helps you sort tasks into four buckets: Urgent + Important (do now), Important + Not Urgent (schedule it), Urgent + Not Important (delegate or minimise), Not Urgent + Not Important (drop it). Most people spend too much time on urgent-but-not-important tasks.',
      },
      {
        title: 'Breaking down big tasks',
        body: 'A huge task feels overwhelming. A series of small steps feels manageable. If a task seems too big to start, ask: "What\'s the very first small thing I can do?" Then do that. Momentum builds from small wins.',
      },
      {
        title: 'Meeting deadlines',
        body: 'Start earlier than you think you need to. Build buffer time for unexpected delays. If you realise you\'re going to miss a deadline, communicate early — your supervisor would much rather know in advance than be surprised at the last minute.',
      },
      {
        title: 'Taking responsibility',
        body: 'Responsible workers own their mistakes rather than blaming others. If you get something wrong, acknowledge it, explain what happened briefly, and focus on fixing it. Blame-shifting destroys trust; ownership builds it.',
      },
    ],
    scenario: {
      prompt: 'It\'s Tuesday afternoon. You have: a report due tomorrow morning (takes 2 hours), a team meeting at 3pm today, a colleague asking for help with a small task, and 20 unread emails. Where do you start?',
      options: [
        { id: 'a', text: 'Clear all the emails first — an empty inbox feels productive', feedback: 'Emails feel satisfying to clear but are often low priority. Your report is due tomorrow and needs 2 hours — that should take priority.', correct: false },
        { id: 'b', text: 'Help your colleague — relationships are important', feedback: 'Relationships matter, but you have a deadline tomorrow. Help your colleague briefly if possible, then focus on the report. You could say "I have a deadline tomorrow — can I help you after?"', correct: false },
        { id: 'c', text: 'Start on the report now, attend your scheduled meeting, then help your colleague, then check emails', feedback: 'Solid prioritisation! The report is urgent AND important. The meeting is scheduled. Your colleague\'s task and emails can wait a little.', correct: true },
        { id: 'd', text: 'Skip the meeting to have more time for the report', feedback: 'Missing a scheduled meeting without notice is poor practice. Plan your time so you can do both — the report has until tomorrow morning.', correct: false },
      ],
    },
    quiz: [
      {
        id: 1,
        question: 'The Eisenhower Matrix helps you:',
        options: ['Improve your memory for task details', 'Sort tasks by urgency and importance to prioritise effectively', 'Create a work schedule for your whole team', 'Calculate exactly how long tasks will take'],
        correct: 1,
        explanation: 'The matrix sorts tasks into four quadrants based on urgency and importance, helping you focus on what actually matters most.',
      },
      {
        id: 2,
        question: 'When a deadline is approaching, you should:',
        options: ['Wait until the last minute — pressure helps you focus better', 'Tell your supervisor you can\'t do it and give up', 'Break the task into steps, start early, and communicate if you\'re at risk of missing it', 'Ask someone else to do it for you so it gets done'],
        correct: 2,
        explanation: 'Breaking tasks into steps makes them less overwhelming. Starting early gives you buffer time. Early communication about delays shows professionalism.',
      },
      {
        id: 3,
        question: 'Taking responsibility at work means:',
        options: ['Only completing the tasks that interest you personally', 'Blaming others or circumstances when things go wrong', 'Owning your mistakes and actively working to fix them', 'Doing the absolute minimum required of you'],
        correct: 2,
        explanation: 'Ownership — acknowledging what went wrong and focusing on fixing it — is one of the most respected qualities in any employee.',
      },
    ],
    badge: { emoji: '📋', name: 'Organised', color: '#F5A623' },
    hasPriorityActivity: true,
  },
  {
    id: 7,
    icon: '🧠',
    title: 'Critical Thinking & Problem Solving',
    description: 'Develop the thinking skills to identify problems, generate solutions, make good decisions, and stay calm under pressure.',
    estimatedTime: '25 min',
    objectives: [
      'Use a structured approach to identify and define workplace problems',
      'Generate and evaluate multiple possible solutions',
      'Make sound decisions under pressure',
      'Know when and how to escalate issues appropriately',
    ],
    keyConcepts: [
      {
        title: 'Defining the problem',
        body: 'Before jumping to solutions, make sure you actually understand the problem. Ask: What exactly is wrong? How long has it been happening? Who is affected? What\'s the impact? A well-defined problem is halfway solved.',
      },
      {
        title: 'Generating solutions',
        body: 'Brainstorm multiple options before committing to one. Even wild ideas can spark good ones. Evaluate each option: What are the pros and cons? Is it safe? Is it within my authority to act on? What happens if it doesn\'t work?',
      },
      {
        title: 'Decision-making under pressure',
        body: 'When you\'re under pressure, slow down for 30 seconds before acting. Ask yourself: Is anyone in immediate danger? What\'s the most important thing to protect? What would a sensible person do here? Trust your training.',
      },
      {
        title: 'When to escalate',
        body: 'Not all problems are yours to solve alone. If a situation is dangerous, legally complex, or above your authority to fix, escalate it to a supervisor or manager. Escalating isn\'t weakness — it\'s good judgment.',
      },
    ],
    scenario: {
      prompt: 'You\'re stacking shelves at a supermarket. You notice a broken bottle on the floor — liquid everywhere — and your supervisor is nowhere in sight. What do you do?',
      options: [
        { id: 'a', text: 'Ignore it — it\'s not your section and not your job', feedback: 'A wet floor is a slip hazard. Anyone could be injured. Workplace safety is everyone\'s responsibility, regardless of whose section it is.', correct: false },
        { id: 'b', text: 'Wait until your supervisor returns before doing anything', feedback: 'If someone slips and is injured in the time it takes you to find your supervisor, that\'s a real harm. You need to act immediately — at minimum, warn people away from the area.', correct: false },
        { id: 'c', text: 'Warn people nearby, block off the area if possible, find any available manager, and report it with details', feedback: 'Excellent response. You\'ve protected people immediately, contained the hazard, and escalated to someone with authority to get it properly cleaned up. This is exactly right.', correct: true },
        { id: 'd', text: 'Try to clean it up yourself as fast as possible and don\'t tell anyone', feedback: 'Cleaning up without reporting means the hazard isn\'t properly managed (the broken glass needs proper handling), and no incident record is created. Always report.', correct: false },
      ],
    },
    quiz: [
      {
        id: 1,
        question: 'The first step in solving a workplace problem effectively is:',
        options: ['Jumping straight to the most obvious solution', 'Blaming whoever caused the problem', 'Clearly identifying and defining what the problem actually is', 'Asking your manager to handle everything'],
        correct: 2,
        explanation: 'Rushing to solutions without understanding the problem often means solving the wrong thing. Taking time to define the problem accurately leads to better outcomes.',
      },
      {
        id: 2,
        question: 'When making a decision under pressure at work, it helps to:',
        options: ['Act on the very first idea that comes to mind', 'Consider the consequences of different options, even if briefly, before choosing', 'Avoid making any decision until the pressure passes', 'Do exactly what you\'ve always done regardless of the situation'],
        correct: 1,
        explanation: 'Even a few seconds of pause to consider options — especially safety implications — can prevent big mistakes under pressure.',
      },
      {
        id: 3,
        question: 'Escalating a problem to your supervisor means:',
        options: ['You\'ve failed to handle things yourself', 'The problem is too serious for you to ignore', 'Using good judgment about what\'s within your authority to solve', 'Both B and C'],
        correct: 3,
        explanation: 'Escalating shows good judgment, not weakness. Some problems genuinely require authority, expertise, or resources you don\'t have.',
      },
    ],
    badge: { emoji: '🧠', name: 'Problem Solver', color: '#1A1753' },
  },
  {
    id: 8,
    icon: '🎤',
    title: 'Mock Interviews',
    description: 'Prepare for job interviews with the STAR method, practise your answers, and get personalised AI feedback to polish your technique.',
    estimatedTime: '35 min',
    objectives: [
      'Prepare confident, structured answers using the STAR method',
      'Know what to expect in a job interview and how to prepare',
      'Practise answering common interview questions out loud',
      'Receive personalised AI feedback on your interview answers',
    ],
    keyConcepts: [
      {
        title: 'The STAR method',
        body: 'STAR stands for Situation, Task, Action, Result. It\'s a framework for answering behavioural interview questions (questions that start with "Tell me about a time when…"). By structuring your answer with all four elements, you give the interviewer a complete, credible story.',
      },
      {
        title: 'Interview preparation',
        body: 'Research the company before your interview — know what they do, their values, and any recent news. Prepare answers to common questions. Choose your outfit the night before. Plan your route and aim to arrive 10 minutes early. A little preparation goes a long way.',
      },
      {
        title: 'Body language in interviews',
        body: 'Sit up straight, make natural eye contact, and smile genuinely. Don\'t cross your arms. A firm (not crushing) handshake at the start and end. Speak clearly and at a moderate pace — nerves often make us rush. It\'s fine to pause and think before answering.',
      },
      {
        title: 'Post-interview follow-up',
        body: 'Send a brief thank-you email within 24 hours: thank them for their time, mention one specific thing you\'re excited about from the conversation, and reiterate your interest in the role. Most candidates don\'t do this — it makes you memorable.',
      },
    ],
    scenario: {
      prompt: 'You\'re in a job interview and the interviewer asks: "Tell me about a time you dealt with a difficult situation at school or work." You\'ve never had a paid job. What\'s the best approach?',
      options: [
        { id: 'a', text: 'Apologise and say you don\'t have any experience to share', feedback: 'Selling yourself short straight away isn\'t ideal. You have more experience than you think — think beyond paid work.', correct: false },
        { id: 'b', text: 'Use an example from school, sport, volunteering, or family responsibilities — anything that involved a real challenge', feedback: 'Great thinking. Interviewers understand young people haven\'t all had paid jobs. A good example from school, sport, community service or home life shows the same skills they\'re looking for.', correct: true },
        { id: 'c', text: 'Make up a convincing story', feedback: 'Never lie in an interview. Experienced interviewers ask follow-up questions and can often detect when stories don\'t ring true. Honesty with a real example is always better.', correct: false },
        { id: 'd', text: 'Ask to skip the question and come back to it later', feedback: 'While it\'s fine to say "Can I think for a moment?", skipping entirely is risky. You likely have a relevant story — take a breath and think it through.', correct: false },
      ],
    },
    quiz: [
      {
        id: 1,
        question: 'STAR stands for:',
        options: ['Style, Tone, Attitude, Readiness', 'Situation, Task, Action, Result', 'Skills, Training, Aptitude, Reliability', 'Subject, Theme, Answer, Reflection'],
        correct: 1,
        explanation: 'The STAR method gives your interview answer a clear structure: what was happening (Situation), what you needed to do (Task), what you did (Action), and what happened (Result).',
      },
      {
        id: 2,
        question: 'Before a job interview, you should:',
        options: ['Research the company and prepare answers to common questions', 'Wait until the interview to figure out what you\'ll say', 'Focus only on what you want to get out of the job', 'Dress however you\'d normally dress'],
        correct: 0,
        explanation: 'Preparation signals genuine interest and helps you give confident, specific answers. Researching the company lets you ask smart questions and reference their values.',
      },
      {
        id: 3,
        question: 'A professional post-interview follow-up is to:',
        options: ['Call the employer every day until you hear back', 'Send a brief thank-you email within 24 hours', 'Post about the interview experience on social media', 'Assume you didn\'t get it and don\'t bother'],
        correct: 1,
        explanation: 'A thank-you email is a small gesture that leaves a positive, lasting impression. Most candidates skip it — so it genuinely sets you apart.',
      },
    ],
    interviewQuestions: [
      {
        id: 1,
        question: 'Tell me about yourself.',
        hint: 'Keep it professional and relevant: your school year level, any work or volunteer experience, what you\'re interested in, and why you\'re excited about this role.',
      },
      {
        id: 2,
        question: 'Tell me about a time you worked as part of a team to achieve something.',
        hint: 'Use the STAR method: describe the situation, your specific role, what you did, and the outcome. School projects, sport, community events all count.',
      },
      {
        id: 3,
        question: 'What\'s one of your weaknesses, and what are you doing about it?',
        hint: 'Choose a genuine (but not fatal) weakness and focus on what you\'re actively doing to improve. Avoid clichés like "I work too hard."',
      },
    ],
    badge: { emoji: '🎤', name: 'Interview Ready', color: '#E8635A' },
    hasInterviewCoach: true,
  },
];

module.exports = modules;
