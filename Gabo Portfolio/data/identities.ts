export interface Identity {
  role: string
  description: string
  suffix?: string // Optional text that appears after the role in the sentence
}

const identities: Identity[] = [
  {
    role: "designer",
    description:
      "The first half of my career I was an art director for various advertising agencies in Puerto Rico. Earned my badges with local and international clients, until the social media revolution, when I started moving towards digital creative and strategy.\n\nI helped bootstrap 2 small digital agencies as digital creative director, traveled the Americas doing political campaigns (armored vehicles and all), opposition research, crisis management, government affairs, NGO's. Fun stuff.",
    suffix: ", for advertising and web.",
  },
  {
    role: "digital producer",
    description:
      "I did a ton of social media, PPC, SEM, SEO, websites, hyper / micro-targeting and all the trendy buzzwords of the 2010's. Directed a group of 40 digital creatives, managed a $2M budget department, learned (barely) to use Excel, implemented CRM's with Salesforce and Hubspot... Did that.\n\nThen I started producing digital creative products for advertising, which I liked a lot more, and it's been my day job for the last few years at de la Cruz. Winning international and national awards like Cannes, Effie, Ojo, Cúspide, SME and all the cool stuff.",
    suffix: ", of sorts for the last 8 years.",
  },
  {
    role: "low-code dev",
    description:
      "Since high school I've dabbled in web design, but with the development of new low-code tools, I've been able to do more of that. I do it as part of my current day job at de la Cruz, and for friends and family.",
    suffix: ", way before low-code dev'ing was a thing.",
  },
  {
    role: "educator on AI",
    description:
      "I've always been very curious and jumped into all the technological fads (yes, even crypto). But never like in this moment. I truly believe this technology is changing us, and understanding is crucial for the sustainable growth of human potential. I've been educating and advocating for human-centered design and implementation of this technology in various forums as an educator and speaker.\n\nPrevious and Future Engagements:\nEl Salvador National Marketing Association\nUniversity of Puerto Rico Association of Advertising and Public Relations Association\nPodcast: Neptuno Networks\nInternational Women's Economic Forum\nPuerto Rico Next Tourism Summit\nRecurrent speaker at Chamber of Commerce SMB's forums\n\nContact me if you want to invite me to a speaking event.",
    suffix: ", because it's important.",
  },
  {
    role: "cook",
    description:
      "I was always curious about cooking. My family had a restaurant and one of my earliest memories is being around 5 years old making pastelillos in the restaurant.\n\nAt 17 I ran the kitchen in a seafood restaurant while being deadly allergic to crustaceans. So yeah, I'm literally willing to die doing something I like. This passion stuck with me and today I'm a major food nerd.",
    suffix: ", since I can remember.",
  },
  {
    role: "photographer",
    description:
      "Fresh out of college, a magazine hired me as an event photographer, about a year later I was directing the staff of photographers, doing fashion, lifestyle and travel photography. It was a beautiful experience and I've been carrying that itch the rest of my life.\n\nStill catch myself guessing the ƒ and shutter speed I'd use when witnessing a beautiful moment.",
    suffix: ", professionally and enthusiastically.",
  },
  {
    role: "curious mind",
    description:
      "I'm thirsty for knowledge, and skilling up. I'm not afraid of change, or new challenges. What I am afraid of, is stagnation, not meeting my expectations, which is sometimes a blessing, most times a curse.\n\nThe moment you are reading this, I am searching and pondering, trying to find the next version of myself. I know I want to keep teaching and creating. In what medium? I'm not sure. Maybe writing, coding, digital art? 🤷\n\nIf you are interested in exploring what we can do together, message me.",
    suffix: ", since always.",
  },
]

export default identities

