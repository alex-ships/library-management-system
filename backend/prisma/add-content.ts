import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

type BookContent = {
  title: string;
  author: string;
  isbn: string;
  genreSlug: string;
  summary: string;
  themes: [string, string, string];
  whyRead: string;
};

const catalog: BookContent[] = [
  {
    title: 'The Hobbit', author: 'J.R.R. Tolkien', isbn: '9780547928227', genreSlug: 'fantasy',
    summary: 'Bilbo Baggins prefers familiar meals, quiet rooms, and days that follow a dependable pattern. An unexpected invitation draws him into a journey with a company of dwarves who hope to reclaim a distant home and its long-guarded treasure. Their route passes through strange landscapes and brings encounters that test the travelers’ courage, judgment, and trust in one another. Bilbo begins with little experience of the wider world, yet discovers that attentiveness and quick thinking can matter as much as strength. The adventure steadily changes his idea of what a comfortable life can include. Rather than treating bravery as the absence of fear, the story finds it in small decisions made when the outcome is uncertain. Its warm humor, clear sense of wonder, and affectionate attention to food and friendship make the journey inviting for readers of many ages.',
    themes: ['Courage can begin as a modest choice made despite fear.', 'Hospitality and friendship help people endure difficult journeys.', 'Home gains meaning when seen from beyond its familiar borders.'],
    whyRead: 'Read it for a welcoming fantasy journey in which curiosity, humor, and an unlikely hero carry as much weight as grand battles.',
  },
  {
    title: 'A Game of Thrones', author: 'George R.R. Martin', isbn: '9780553103540', genreSlug: 'fantasy',
    summary: 'Across the realm of Westeros, powerful families compete for influence while private loyalties collide with public duty. The story moves among several characters, each with a different view of honor, ambition, and survival. A respected household is drawn toward the center of political life, where alliances can shift quickly and a careless decision may endanger an entire family. Far from the court, other developments suggest that the kingdom’s conflicts are only part of a larger uncertainty. The novel builds its world through contrasting regions, customs, and voices, then asks how people behave when inherited rules no longer offer clear guidance. Its suspense comes as much from conversations and choices as from action. Readers encounter a fantasy setting shaped by history and legend, but populated by people whose motives are complicated and whose futures are difficult to predict.',
    themes: ['Power tests the values people claim to hold.', 'Family loyalty can conflict with personal judgment.', 'Political stability may conceal deeper threats.'],
    whyRead: 'Choose it for a richly layered fantasy of competing perspectives, difficult decisions, and intricate political consequences.',
  },
  {
    title: 'The Name of the Wind', author: 'Patrick Rothfuss', isbn: '9780756404741', genreSlug: 'fantasy',
    summary: 'A gifted musician and scholar recounts the events that shaped his unusual life, beginning with a childhood among traveling performers and continuing through hardship, study, and ambition. The narrative follows his effort to enter a demanding university, where knowledge is both a practical tool and a source of status. He must learn how institutions work while finding ways to pay for necessities, protect friendships, and pursue questions that reach beyond the classroom. Music, memory, and storytelling give the novel its particular rhythm: the narrator is skilled at shaping how an audience hears an event, and the frame story invites readers to consider the difference between a life and its telling. The result is an intimate fantasy about talent under pressure, the cost of pride, and the many forms of knowledge that cannot be learned from books alone.',
    themes: ['A person’s reputation can shape how others interpret their actions.', 'Learning requires persistence as well as natural ability.', 'Stories preserve experience while also reshaping it.'],
    whyRead: 'Read it for lyrical storytelling, a vivid student setting, and a thoughtful blend of music, mystery, and magical inquiry.',
  },
  {
    title: 'Mistborn: The Final Empire', author: 'Brandon Sanderson', isbn: '9780765311788', genreSlug: 'fantasy',
    summary: 'In a society ruled by an apparently unshakable immortal leader, a young woman from the oppressed population discovers an ability that changes what she believes is possible. She is recruited into a risky plan built by a crew of specialists, each bringing a different skill and a different reason to challenge the ruling order. Their work combines careful preparation, social deception, and a distinctive magic connected to metals. As the plan develops, the characters must decide whether bringing down a tyrant is enough, or whether they also need a vision for what could replace the old system. The novel balances energetic action with questions about trust and leadership. Its central transformation is personal as well as political: the heroine learns to judge her own strength without simply accepting the roles that others have assigned to her.',
    themes: ['Oppressive systems depend on people believing change is impossible.', 'Trust grows through shared risk and honest cooperation.', 'Winning freedom requires imagination beyond rebellion.'],
    whyRead: 'Try it for inventive magic, a resourceful ensemble, and a satisfying story about daring to plan for a different future.',
  },
  {
    title: 'The Girl with the Dragon Tattoo', author: 'Stieg Larsson', isbn: '9780307454546', genreSlug: 'mystery',
    summary: 'A journalist accepts an assignment from a wealthy family whose history is marked by a disappearance that has remained unresolved for decades. The inquiry brings him into contact with a highly capable investigator whose unconventional methods and guarded manner conceal a keen attention to detail. Together they examine records, memories, and conflicting accounts, gradually finding connections that earlier investigators missed. The case is rooted in one family’s past, but its reach extends into questions of power, privacy, and the ways institutions respond to harm. The book pairs the patient work of research with the urgency of a thriller, allowing clues to accumulate before they are understood. Its two central figures approach problems differently, and their uneasy collaboration becomes an important part of the investigation as well as a study in earned trust.',
    themes: ['Careful research can challenge stories protected by status.', 'Independence is a source of strength and sometimes isolation.', 'Accountability depends on listening to people whose evidence is ignored.'],
    whyRead: 'Read it for a layered investigative mystery, distinctive lead characters, and an absorbing mix of journalism and family history.',
  },
  {
    title: 'And Then There Were None', author: 'Agatha Christie', isbn: '9780062073488', genreSlug: 'mystery',
    summary: 'A group of strangers arrives at an isolated destination after receiving separate invitations. Their host is absent, communication with the mainland is unreliable, and an unsettling accusation soon gives the gathering a shared purpose none of them expected. As circumstances narrow their choices, the visitors begin to reconsider what they know about one another and about the past they brought with them. The setting turns an ordinary social visit into a tightly controlled puzzle: every person may be a witness, a suspect, or both. Christie builds suspense through changing alliances, precise details, and the characters’ attempts to make sense of events before fear takes over. Readers are invited to compare each explanation with the evidence and to notice how guilt, secrecy, and self-protection affect what people say.',
    themes: ['Isolation changes how people assess danger and responsibility.', 'The past can return through evidence others thought forgotten.', 'Fear makes trust difficult, even when cooperation is essential.'],
    whyRead: 'Pick it for a compact, ingenious mystery that rewards close attention and keeps its full group of characters in play.',
  },
  {
    title: 'The Big Sleep', author: 'Raymond Chandler', isbn: '9780679722656', genreSlug: 'mystery',
    summary: 'Private investigator Philip Marlowe is hired to handle a family matter for an elderly and wealthy client. What begins as a seemingly contained assignment opens onto a wider web of debts, blackmail, and competing interests. Marlowe moves through a city where polished surfaces often hide uncertainty, speaking with people who reveal only part of what they know. His attention to small inconsistencies keeps him moving even when official explanations do not fit the evidence. The case is less a straight path to one answer than a tour through shifting loyalties and carefully managed appearances. Chandler’s distinctive first-person voice combines dry wit with a persistent moral independence. The result is a mystery whose atmosphere matters as much as its clues, and whose detective tries to keep a personal code in a world that rarely rewards one.',
    themes: ['Integrity is difficult to maintain in a compromised environment.', 'Money and influence can blur the boundary between public and private life.', 'A sharp observer sees meaning in details others dismiss.'],
    whyRead: 'Enjoy it for its atmospheric city, memorable detective voice, and the classic puzzle of appearances versus motives.',
  },
  {
    title: 'Gone Girl', author: 'Gillian Flynn', isbn: '9780307588371', genreSlug: 'mystery',
    summary: 'When a woman disappears on the anniversary of her marriage, the search quickly becomes a public spectacle. Her husband finds himself answering questions from investigators and strangers while the couple’s history is examined through competing accounts. The narrative alternates perspectives, encouraging readers to notice how memory and presentation can shape a persuasive version of events. The investigation reveals a relationship built from affection, resentment, expectations, and performance, but its central uncertainty remains: what can be trusted when each storyteller understands the audience they are addressing? Flynn uses the conventions of a missing-person mystery to explore the way private conflict becomes public entertainment. The novel’s tension comes from changing interpretations, and from watching certainty give way whenever new information recasts an earlier scene.',
    themes: ['Public image can become a contest over who controls a story.', 'Intimacy does not guarantee that people understand one another.', 'Evidence must be weighed carefully when narrators have something to gain.'],
    whyRead: 'Read it for a sharply constructed psychological mystery and a clever examination of storytelling, marriage, and media attention.',
  },
  {
    title: 'Dune', author: 'Frank Herbert', isbn: '9780441172719', genreSlug: 'science-fiction',
    summary: 'A noble family is sent to govern Arrakis, a harsh desert world whose rare resource gives it enormous political importance. The transfer appears to offer opportunity, but it also places the family inside a contest shaped by imperial power, ecological limits, and long-standing local knowledge. The young heir must learn how to read both court politics and the desert, where survival depends on patience and attention. The people who have adapted to Arrakis possess a culture that outsiders often misunderstand, and their choices become central to the world’s future. Herbert weaves together environment, economics, religion, and leadership to ask what happens when one resource organizes an entire civilization. The result is an expansive science-fiction story about adaptation and the dangers of believing that any single person can control history.',
    themes: ['Ecology and culture are inseparable from political power.', 'Leadership becomes dangerous when people treat it as destiny.', 'Local knowledge deserves respect from those who arrive as rulers.'],
    whyRead: 'Choose it for a richly imagined desert world and big questions about resources, belief, and the responsibilities of power.',
  },
  {
    title: 'Foundation', author: 'Isaac Asimov', isbn: '9780553293357', genreSlug: 'science-fiction',
    summary: 'A mathematician sees signs that a vast galactic civilization is approaching a period of decline. His response is not to promise that collapse can be avoided, but to organize knowledge so that future generations may shorten the difficult era that follows. The story then moves through a sequence of historical turning points, where communities face pressure from neighboring powers and must find ways to remain influential despite limited resources. Scientific learning, practical negotiation, and public belief all become tools in this long experiment. Asimov uses the scale of interstellar history to examine how institutions preserve knowledge and how people adapt when predictions meet real choices. Rather than centering on one continuous hero, the novel presents a changing society and invites readers to consider whether long-term patterns can guide action without removing human uncertainty.',
    themes: ['Knowledge can help societies prepare for change without controlling it.', 'Institutions shape what later generations are able to remember.', 'Practical diplomacy can preserve influence when force is limited.'],
    whyRead: 'Read it for a broad, idea-driven vision of the future and a series of clever political and scientific turning points.',
  },
  {
    title: 'Neuromancer', author: 'William Gibson', isbn: '9780441569595', genreSlug: 'science-fiction',
    summary: 'In a future shaped by global corporations and networked technology, a skilled computer operator has lost the work that once defined him. A new employer offers a chance to return to the digital frontier, but the assignment brings him into a team with its own motives and carefully guarded information. Their work crosses physical cities and virtual spaces, testing the boundaries between a person’s body, memory, and identity. Gibson’s world feels crowded with signals, commodities, and private agendas; the characters must learn which systems can be used and which are using them. The novel’s momentum comes from a mission whose purpose gradually becomes clearer, alongside a persistent question about what human freedom means when intelligence can exist beyond an individual mind.',
    themes: ['Technology changes how people understand identity and agency.', 'Systems of power often hide inside tools that seem neutral.', 'Collaboration requires trust even when every participant has a private aim.'],
    whyRead: 'Try it for its influential cyberpunk atmosphere, imaginative digital landscapes, and questions that remain timely in a connected world.',
  },
  {
    title: 'The Left Hand of Darkness', author: 'Ursula K. Le Guin', isbn: '9780441478125', genreSlug: 'science-fiction',
    summary: 'An envoy from a wider interstellar community travels to a cold planet whose nations have not yet joined that alliance. His task is diplomatic, but understanding the people he hopes to persuade proves more difficult than presenting a proposal. Local customs and political rivalries challenge his assumptions, while a journey across an unforgiving landscape forces him into an unexpected partnership. Through travel journals, reports, and remembered stories, the novel shows how a culture can look different depending on who is describing it. The planet’s inhabitants also unsettle familiar ideas about gender and social organization. Le Guin’s science fiction is both a first-contact story and a careful study of humility: meaningful cooperation begins when the visitor stops treating his own categories as universal.',
    themes: ['Understanding another culture begins with questioning one’s assumptions.', 'Trust can develop across political and personal differences.', 'Environment shapes daily life without determining every choice.'],
    whyRead: 'Read it for thoughtful world-building, a memorable journey through ice, and humane questions about identity and diplomacy.',
  },
  {
    title: 'Guns, Germs, and Steel', author: 'Jared Diamond', isbn: '9780393317558', genreSlug: 'history',
    summary: 'Jared Diamond examines why societies in different regions developed unequal access to technologies, political organization, and military power. Rather than attributing these outcomes to inherent differences among peoples, he looks at geography, domesticable plants and animals, disease environments, and the ways knowledge could spread across connected landscapes. The book follows long historical processes, showing how advantages can build on one another over generations. Its broad comparative framework invites readers to reconsider familiar explanations for global inequality and to ask how much of history rests on circumstances beyond individual control. The argument is ambitious and has prompted substantial scholarly discussion, making it useful to read as a model of large-scale explanation as well as a particular interpretation. Readers encounter a sweeping account that connects ecology with human choices and institutions.',
    themes: ['Geography can shape the opportunities available to societies.', 'Historical advantages accumulate through interconnected processes.', 'Explanations of inequality should avoid claims of innate human hierarchy.'],
    whyRead: 'Choose it for an accessible, debate-provoking framework that connects environment, technology, and long historical change.',
  },
  {
    title: 'SPQR', author: 'Mary Beard', isbn: '9781631492280', genreSlug: 'history',
    summary: 'Mary Beard offers a vivid account of Rome’s transformation from a small community into a vast and durable political power. She brings together political events, public monuments, inscriptions, and ordinary traces of ancient life to show how historians build a picture from incomplete evidence. The book examines leaders and institutions while also asking who counted as Roman and how that identity changed as the city expanded. Beard resists presenting the past as a simple march toward modern government; instead, she emphasizes uncertainty, contradiction, and the people whose experiences are harder to recover. Her narrative makes Roman history approachable without hiding the questions that remain open. Readers see how stories about a civilization are shaped by both ancient sources and the choices modern historians make when interpreting them.',
    themes: ['Historical evidence is incomplete and must be read critically.', 'Citizenship and identity change as political communities expand.', 'Ordinary lives add depth to accounts focused on famous leaders.'],
    whyRead: 'Read it for clear, lively Roman history and an honest look at how historians distinguish evidence from legend.',
  },
  {
    title: 'The Guns of August', author: 'Barbara W. Tuchman', isbn: '9780345476098', genreSlug: 'history',
    summary: 'Barbara W. Tuchman traces the opening month of the First World War, focusing on the decisions, expectations, and military plans that turned a European crisis into a broad conflict. She follows leaders and armies across several countries, showing how assumptions about speed and strategy collided with events on the ground. The book’s strength lies in explaining how choices made under pressure can narrow the options available to everyone else. Tuchman gives the opening campaigns a strong narrative shape while paying close attention to the political context behind them. Her account encourages readers to study not only major battles but also the planning cultures and misjudgments that made the war so difficult to contain. It is a history of momentum, where early decisions had consequences that outlasted the people who made them.',
    themes: ['Plans can fail when leaders mistake assumptions for certainty.', 'Decisions made in a crisis constrain later choices.', 'Military events are inseparable from political judgment.'],
    whyRead: 'Pick it for a compelling account of the war’s opening and a lasting lesson in how strategy meets unintended consequences.',
  },
  {
    title: 'Sapiens', author: 'Yuval Noah Harari', isbn: '9780062316097', genreSlug: 'history',
    summary: 'Yuval Noah Harari surveys human history from early communities to modern technological society, asking how shared beliefs and forms of cooperation enabled large populations to work together. The book connects changes in food production, political organization, money, religion, and science, presenting them as forces that altered both daily life and humanity’s relationship with the natural world. Its wide lens makes complex periods approachable, though its sweeping claims invite readers to question and compare the evidence behind them. Rather than treating progress as a simple upward line, Harari asks whether increased power has reliably brought greater well-being. The account is a broad invitation to think about the stories societies tell, the institutions they build around those stories, and the possible consequences of new technologies.',
    themes: ['Shared stories allow cooperation among people who do not know one another.', 'Technological change can bring benefits and costs together.', 'Progress should be judged by its effects on human and ecological well-being.'],
    whyRead: 'Read it for an engaging big-picture tour that can spark discussion about how societies form and where they may be headed.',
  },
  {
    title: 'The Power of Being Alone: A Powerful Combination of Motivation and Revolutionary Ideas to Enhance Your Life – Self Help Edition',
    author: 'Brian Alba', isbn: '9798387725821', genreSlug: 'self-help',
    summary: 'Brian Alba’s self-help book considers solitude as a skill that can be practiced, rather than a condition that must be feared. It invites readers to examine the discomfort they may feel in their own company and to distinguish quiet reflection from unwanted disconnection. The book presents time alone as an opportunity to slow down, think through decisions, and become more deliberate about personal goals. It also connects a person’s inner life with their relationships, suggesting that self-awareness can influence how they show up with other people. Practical reflections and everyday examples frame solitude as something that can be approached gradually, with curiosity rather than pressure. This original overview describes the book’s broad subject and approach; it is not the book’s text. Readers can take from it a prompt to notice how they use quiet time and whether that time supports their well-being, choices, and connections.',
    themes: ['Solitude can be approached as a learnable practice.', 'Self-reflection may support clearer choices and personal goals.', 'Healthy time alone can coexist with strong relationships.'],
    whyRead: 'Read it if you want an accessible self-help perspective on becoming more comfortable with solitude and using reflective time with intention.',
  },
];

function formatContent(book: BookContent) {
  return [
    `# ${book.title}\n\n${book.author}\n\nA Page & Pine reading note`,
    `## A spoiler-light overview\n\n${book.summary}`,
    `## Three key themes\n\n1. ${book.themes[0]}\n2. ${book.themes[1]}\n3. ${book.themes[2]}`,
    `## Why read this\n\n${book.whyRead}`,
  ].join('\n\n---\n\n');
}

async function main() {
  const genres = await prisma.genre.findMany({ select: { slug: true } });
  const existingSlugs = new Set(genres.map((genre) => genre.slug));
  if (!existingSlugs.has('self-help')) {
    await prisma.genre.upsert({
      where: { slug: 'self-help' },
      update: {},
      create: { name: 'Self-Help', slug: 'self-help' },
    });
  }
  const selfHelp = await prisma.genre.findUniqueOrThrow({ where: { slug: 'self-help' } });

  for (const book of catalog) {
    const genre = book.genreSlug === 'self-help'
      ? selfHelp
      : await prisma.genre.findUniqueOrThrow({ where: { slug: book.genreSlug } });
    const content = formatContent(book);
    await prisma.book.upsert({
      where: { isbn: book.isbn },
      update: { content },
      create: {
        title: book.title,
        author: book.author,
        isbn: book.isbn,
        totalCopies: book.isbn === '9798387725821' ? 2 : 1,
        availableCopies: book.isbn === '9798387725821' ? 2 : 1,
        genreId: genre.id,
        content,
      },
    });
  }
  console.log(`Updated reading content for ${catalog.length} books.`);
}

main()
  .catch((error: unknown) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(async () => prisma.$disconnect());
