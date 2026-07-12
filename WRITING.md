# Writing guide

House rules for posts on this blog, and the general writing canon they distill from. Part 1 is decisions already made — follow it when drafting or editing posts. Part 2 is the source material — use it when revisiting a rule or facing a situation the rules don't cover. Every rule serves one goal:

> **Success = the target reader ends up with the idea in their head — able to restate it and act on it.**

Engagement is instrumental, not terminal: a reader who bounces receives nothing, so attention must be earned paragraph by paragraph — but an "engaged" reader who retains nothing is also a failure. This rules out engagement tricks that tax comprehension or trust (clickbait withholding, artificial cliffhangers, rage-hooks). Trust compounds across posts and is the asset that makes future posts land; don't spend it.

Examples cite published posts by slug, referring to `pages/blog/<slug>.mdx`.

# Part 1: House rules

## Know which kind of post you're writing

Analytics show these are effectively different products with different readers, so they have different optimal structures:

1. **Utility posts** — the reader arrives from search with a specific question: `myprotein-powders-compared`, `keycloak-google-workspace`, `cheap-gps-trackers`. These deliver ~90% of site traffic. Structure: the answer (often a table) in the first screen, zero throat-clearing. The answer *is* the product.
2. **Persuasion essays** — the goal is belief change, usually reached via shares/links rather than search: `how-agi-could-kill-usa-democracy`, `mcp-composability`. Structure: see "The opening" below — this is where the thesis-placement tradeoff lives.
3. **Reference posts** — the goal is being cited and returned to: `ai-regulator-toolbox`. Structure: orientation and navigation up front, independently-readable sections, skimmable TLDRs. There is no single "answer" to front-load.

## The opening: the first three sentences decide everything

1. **Never withhold orientation.** By the end of paragraph one the reader must know what question this post answers and whether it's for them. Tell the wrong reader what to read first instead: `uk-agi-plan-2025` — "This article assumes you think AGI could pose significant risks… If not, you probably want to read those first."

2. **Thesis-first is the default; delay it only deliberately.** State the claim up front when the reader will engage with it honestly — `mcp-composability` delivers its full thesis by sentence three. Delay it behind a concrete case in two situations: (a) a nod-along thesis readers would "agree with" without actually updating, or (b) a contrarian thesis readers would reject before seeing evidence. In both, open with the concrete case that makes the thesis *felt*, then state it.

3. **Curiosity needs a gap — open one about the connection or the mechanism, never the topic.** Both opening styles work by leaving a specific question visibly unanswered. Thesis-first leaves the *mechanism* open: `local-llms-speed-early-2026` puts "~2.8x faster" in paragraph two, and the question "where did the speedup come from?" carries you through the decomposition. A cold open leaves the *connection* open: `how-agi-could-kill-usa-democracy` starts on the DRC's $24 trillion in minerals beside its extreme poverty, and "what does this have to do with AGI?" resolves within three paragraphs. The illegitimate gap is about the topic itself — "I don't know what this post is about" makes readers leave, not lean in.

4. **Credibility in one clause, via specifics, never adjectives.** Numbers, named employers, named artifacts — stated flatly, then move on. `mcp-composability`: "On Anthropic's MCP team I spoke to hundreds of people adopting MCP. Since then, I've also built over 50 MCP servers serving (in aggregate) millions of calls per day." `what-is-agi`: "I've seen this while leading specialised AI courses for thousands of people."

## The body

5. **One idea per post.** Split rather than nest, and interlink. Short is fine; most of the best posts are under 1,500 words.

6. **First sentences carry the post.** A reader who reads only the first sentence of each paragraph should get ~80% of the value — and should never be lost. Put each paragraph's point in its first sentence; support, evidence, and caveats after. (Most readers won't finish; partial reads should still transmit the core.)

7. **Move up and down the abstraction ladder constantly.** Every general claim gets a concrete instance within a sentence or two: real numbers with links ("one chip costs $30-40k" in `ai-regulator-toolbox`), real prices ("97p" letters in `poa-better`), real places (the DRC in `how-agi-could-kill-usa-democracy`). If a paragraph has no proper noun, number, or link, it's probably stuck on the top rung.

8. **Fight the curse of knowledge.** The default failure of expert writers is assuming the reader shares context they don't have. Define terms by example rather than abstraction — `what-is-agi` exists because "highly autonomous systems that outperform humans at most economically valuable work" gives nobody an intuition. Link a background post instead of assuming or re-explaining.

9. **Epistemic honesty is a feature, not a disclaimer.** Flag limitations plainly and early — it disarms objections and builds the trust that persuasion essays run on. `empathetic-role-playing`: "This isn't a new technique! It's just a thing I've seen some of the best product people I've worked with at Palantir and Starling Bank do." `rough-alignment-plan-early-2025` puts "rough" in the title.

10. **Most posts want a visual — ideally one that carries the argument.** A diagram that *is* the thesis (the activation-energy barrier in `coalition-of-democracies-solves-agi-risks`, the problem-identification-tools map in `empathetic-role-playing`, the plan overview in `rough-alignment-plan-early-2025`), a chart for data (the BarCharts in `local-llms-speed-early-2026`), or an image for levity (the US–China meme in `uk-agi-plan-2025`). A good diagram is often the most-repeated artifact from a post, and visuals give skimmers a second entry point into the argument.

11. **Microhumour, not jokes.** Small moments of wit that reward attention without costing clarity: playful structure ("Thing 1: Avoid being in a race in the first place", `uk-agi-plan-2025`), a wry title (`oh-good`), delight in the data ("Gemma 3 1B got 1.8x faster!", `local-llms-speed-early-2026`). Humour makes the writer feel human and keeps readers moving through dense material — but it's seasoning: never at the expense of the argument, and never forced.

12. **Try to compress the thesis into one repeatable sentence — mainly as a test.** If the idea won't compress ("an extremely-competent, fast and copyable remote employee", `what-is-agi`), it usually isn't sharp yet. The quotable line is also how persuasion essays travel — people repeat the sentence, not the post — but treat it as something to find during editing, not force during drafting. Low priority for utility and reference posts.

## Titles and endings

13. **Titles state the claim or the reader's actual question.** "How AGI could kill US democracy", "Good MCP servers are designed for composition", "What might AGI look like, concretely?". For utility posts, match the search query the reader will actually type. Avoid neutral topic labels ("Thoughts on X", "X as Y") when a claim is available.

14. **End by pointing somewhere, not summarising.** The last paragraph should be the sharpest implication, a call to action, or a link into the next post — never a recap.

## Mechanics

- Interlink related posts aggressively (relative links like `../what-is-agi/`).
- Frontmatter: `title`, `publishedOn`; add `citable: true` for reference-style posts, `highvol: true` for published-not-broadcast.
- Image handling rules are in README.md (strip EXIF, downscale).

# Part 2: The canon

The best generally-applicable writing advice, compiled by theme with attribution — including where the sources disagree.

## Why anyone reads

- **Readers read because it's valuable to them, not because it's clear or well-organized.** Larry McEnerney (*The Craft of Writing Effectively*, UChicago): writing doesn't fail by being unclear, it fails by being worthless to its readers. Writing isn't conveying your ideas — it's changing what readers think. Value is defined by the reading community, not the writer; frame new claims against what that community currently believes, and create "instability" (a problem, a tension, an anomaly) that the reader needs resolved. Never structure a piece as the narrative of your own thinking ("first I looked at X, then I realised Y…").
- **Useful writing = importance × novelty × correctness × strength.** Paul Graham (*How to Write Usefully*): tell people something true and important that they didn't already know, as unequivocally as the truth permits. Novelty can be small if importance is high.
- **Specificity finds your people.** Henrik Karlsson (*A blog post is a very long and complex search query to find fascinating people*): a blog post's job is partly to filter for the readers you want. Being more specific, personal, and idiosyncratic loses generic readers and attracts the right ones — the opposite of writing for everyone.

## The curse of knowledge

- **The chief cause of bad writing is forgetting the reader doesn't know what you know.** Steven Pinker (*The Sense of Style*): experts underestimate how much context, jargon, and abstraction they've internalized. You can't fix it by trying harder to empathize — you fix it with concrete examples, showing drafts to real readers, and re-reading after time away.
- **It's why concrete beats abstract.** Chip & Dan Heath (*Made to Stick*, citing Elizabeth Newton's tappers-and-listeners study): the tapper hears the song in their head; the listener hears tapping. Abstractions are the writer's compressed private experience; examples transmit.

## Concreteness and stickiness

- **SUCCESs: Simple, Unexpected, Concrete, Credible, Emotional, Stories.** Heath & Heath (*Made to Stick*): ideas stick when they're compressed to a core (simple), violate expectations then resolve them (unexpected), are graspable by the senses (concrete), come with believable evidence (credible), make people care (emotional), and arrive as narratives people can mentally rehearse (stories).
- **Curiosity is a response to a specific, visible gap.** George Loewenstein's information-gap theory (via *Made to Stick*): curiosity fires when someone becomes aware of a precise gap in their knowledge — so open a question before answering it. No gap, no pull; but a gap about *what the piece is even about* reads as confusion, not intrigue.
- **Move up and down the ladder of abstraction.** S.I. Hayakawa's ladder, operationalized by Scott Alexander (*Nonfiction Writing Advice*): alternate constantly between general claim and concrete instance. Prose stuck at the top rung is unfollowable; prose stuck at the bottom is pointless.
- **Prefer the definite, the specific, the concrete.** Strunk & White (*The Elements of Style*): "the surest way to arouse and hold the attention of the reader."

## Structure and flow

- **Front-load the point.** Journalism's inverted pyramid and the military's BLUF (bottom line up front): most readers stop early, so partial reads must still transmit the core. Applies at every scale — post, section, paragraph, sentence.
- **Readers assign meaning by position.** George Gopen & Judith Swan (*The Science of Scientific Writing*): readers expect familiar/old information at the start of a sentence (topic position) and the new, emphasized information at the end (stress position). Keep subject and verb close together. Make each sentence flow old→new and paragraphs chain naturally.
- **Short sections, real headers, visible skeleton.** Scott Alexander: divide everything into titled sections; readers navigate, take breaks, and remember by structure. (McEnerney adds: structure should follow the *reader's* problem, not the chronology of your research.)
- **One unit, one point.** Gopen & Swan: a sentence, paragraph, or section that makes two points makes neither. If a paragraph's point isn't in its first sentence, most readers will never receive it.

## Sentence-level style

- **Clutter is the disease; strip every sentence to its cleanest components.** William Zinsser (*On Writing Well*): every word that serves no function, every long word that could be short, every adverb that duplicates the verb — cut. "Writing improves in direct ratio to the number of things we can keep out of it."
- **Orwell's six rules** (*Politics and the English Language*): never use a stale metaphor; never use a long word where a short one will do; if it's possible to cut a word, cut it; never use the passive where you can use the active; never use jargon if there's an everyday equivalent; break any of these rules sooner than say anything outright barbarous.
- **Write in spoken language.** Paul Graham (*Write Simply*): fancy language costs readers cognitive budget they should be spending on your ideas — and it filters out readers, including smart ones reading in a hurry. Test: would you say this sentence to a friend?
- **Classic style: prose as a window.** Pinker, after Thomas & Turner (*Clear and Simple as the Truth*): write as if showing the reader something in the world they can verify themselves — writer and reader as equals. Avoid metadiscourse ("in this section I will…"), compulsive hedging, and zombie nouns (nominalizations: "make a decision" → "decide").

## Humour and delight

- **Microhumour over jokes.** Scott Alexander: small moments of wit woven into ordinary sentences — a wry aside, an unexpectedly honest parenthetical, a playful list item — rather than set-piece jokes. It rewards close reading, makes the writer feel human, and carries readers through dense material. Never at the expense of the argument.
- **Warmth is not unprofessional.** Zinsser: the writer's humanity — enthusiasm, honesty about confusion, evident enjoyment — is a large part of why anyone keeps reading nonfiction.

## Visuals

- **A good graphic is an argument, not decoration.** Edward Tufte (*The Visual Display of Quantitative Information*): graphical excellence is complex ideas communicated with clarity, precision, and efficiency. Show the data, maximize the share of ink doing informational work, cut chartjunk.
- **Diagrams give skimmers a second entry point** and are often the most-shared artifact of a piece. If the thesis can be drawn, draw it.

## Process

- **Write a bad first draft fast; edit as a separate activity.** Anne Lamott (*Bird by Bird*, "shitty first drafts"): perfectionism at draft time kills output; quality comes from revision. Paul Graham (*Writing, Briefly*): "expect 80% of the ideas in an essay to happen after you start writing it, and 50% of those you start with to be wrong" — rewrite constantly, cut ruthlessly.
- **Writing is rewriting.** Zinsser: the first draft is you telling yourself the story; revision is where the reader enters.
- **Read it aloud.** Graham, Zinsser: the ear catches clutter, rhythm problems, and fake-sounding sentences that the eye forgives.
- **Test on real readers.** Pinker: the only reliable cure for the curse of knowledge. Watch where they get bored or confused; believe their reactions over their suggestions.

## Where the advice conflicts

- **Thesis-first vs narrative arc.** BLUF says give the conclusion immediately; *Made to Stick* says open a gap and make readers want it. Resolution (adopted in Part 1): never withhold *orientation* or topic; the legitimate gap is the connection or the mechanism, and thesis-first is the default with deliberate exceptions for nod-along and contrarian theses.
- **Omit needless words vs voice.** Strunk/Zinsser minimalism, taken literally, would strip out the digressions, microhumour, and personality that make the most-loved blogs (e.g. Slate Star Codex) work. Resolution: cut words that serve nothing; keep words that serve the *relationship* with the reader, which is also load-bearing.
- **Simple words vs precise ideas.** Graham's "write simply" can look like it conflicts with technical precision. It doesn't: use ordinary words and simple sentence structure *for* sophisticated ideas; complexity budget goes to the content.
- **Write for yourself vs write for the reader.** Zinsser says write for yourself; McEnerney says value is defined entirely by readers. Reconcile: voice and topic selection for yourself (that's what specificity-as-filter rewards), but framing, structure, and what-needs-explaining for the reader.
- **Rules vs taste.** Every source ends with Orwell's sixth rule in some form: break any rule sooner than write something worse. These rules are defaults with reasons attached, not laws.
