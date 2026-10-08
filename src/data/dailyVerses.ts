export interface DailyVerseItem {
  dayOfMonth: number;
  reference: string;
  text: string;
  theme: string;
  reflection: string;
  prayer: string;
  author: string;
  imagePromptBg?: string;
}

export const DAILY_VERSES: DailyVerseItem[] = [
  {
    dayOfMonth: 1,
    reference: 'Esther 4:14',
    text: 'And who knoweth whether thou art come to the kingdom for such a time as this?',
    theme: 'Divine Timing & Purpose',
    reflection: 'You are not living in this era, family, or situation by accident. The Lord positioned you with exact purpose to bring light, comfort, and kingdom truth to those around you.',
    prayer: 'Lord, open my eyes to see the divine opportunities in my ordinary moments today. Give me Esther’s courage to stand in faith for such a time as this.',
    author: 'Queen Esther'
  },
  {
    dayOfMonth: 2,
    reference: 'Proverbs 31:26',
    text: 'She openeth her mouth with wisdom; and in her tongue is the law of kindness.',
    theme: 'Words of Grace',
    reflection: 'A woman’s words possess tremendous power to heal, encourage, and revive. Let your language today be soaked in soft wisdom and patient kindness.',
    prayer: 'Father, set a guard over my lips today. Let every word that crosses my tongue be seasoned with celestial grace and sweet encouragement to someone in need.',
    author: 'Proverbs 31'
  },
  {
    dayOfMonth: 3,
    reference: 'Ruth 1:16',
    text: 'Intreat me not to leave thee, or to return from following after thee: for whither thou goest, I will go; and where thou lodgest, I will lodge: thy people shall be my people, and thy God my God.',
    theme: 'Loyal Devotion & Faith',
    reflection: 'Ruth’s covenant devotion crossed national, cultural, and spiritual boundaries. True love chooses faithfulness even when the future seems clouded.',
    prayer: 'Lord, give me a heart that remains steady and faithful in love, even in tough times. Anchor my relationships in Your enduring grace.',
    author: 'Ruth'
  },
  {
    dayOfMonth: 4,
    reference: 'Psalm 46:5',
    text: 'God is in the midst of her; she shall not be moved: God shall help her, and that right early.',
    theme: 'Unshakeable Security',
    reflection: 'When storms howl and circumstances rock the foundation of your plans, remember who dwells inside you. Because God is in your midst, you cannot be overthrown.',
    prayer: 'Jesus, when anxiety attempts to shake me, whisper into my heart that You are right here within me. I stand confident in Your early help.',
    author: 'Sons of Korah'
  },
  {
    dayOfMonth: 5,
    reference: 'Luke 1:45',
    text: 'And blessed is she that believed: for there shall be a performance of those things which were told her from the Lord.',
    theme: 'Believing the Promise',
    reflection: 'Elizabeth recognized Mary’s radiant faith. When you dare to believe God’s quiet promises against visible impossibilities, heaven rejoices to fulfill them.',
    prayer: 'Lord, strengthen my believing heart today. Where doubt tries to creep in, let Your word be an anchor of unshakable anticipation.',
    author: 'Elizabeth & Mary'
  },
  {
    dayOfMonth: 6,
    reference: 'Song of Solomon 4:7',
    text: 'Thou art all fair, my love; there is no spot in thee.',
    theme: 'Cherished Beauty',
    reflection: 'Before the world formed its opinions about you, the Beloved declared you radiant, clean, and treasured. Let His tender approval silence every inner critic.',
    prayer: 'Heavenly Groom, wash away the lingering stains of self-reproach. Teach me to see my heart through Your eyes of redeeming adoration.',
    author: 'The Beloved'
  },
  {
    dayOfMonth: 7,
    reference: '1 Peter 3:3-4',
    text: 'Whose adorning let it not be that outward adorning... But let it be the hidden man of the heart, in that which is not corruptible, even the ornament of a meek and quiet spirit, which is in the sight of God of great price.',
    theme: 'The Incorruptible Ornament',
    reflection: 'Feminine poise and a quiet, tranquil spirit are treasured jewels in God’s sight. External trends come and go, but a gentle soul reflects the fragrance of heaven.',
    prayer: 'Holy Spirit, adorn my inner heart with the tranquil stillness of trust. Let my gentleness be a soothing comfort to all who encounter me today.',
    author: 'Peter'
  },
  {
    dayOfMonth: 8,
    reference: 'Isaiah 43:1-2',
    text: 'Fear not: for I have redeemed thee, I have called thee by thy name; thou art mine. When thou passest through the waters, I will be with thee; and through the rivers, they shall not overflow thee.',
    theme: 'Called by Name',
    reflection: 'You are not a nameless number in a crowded world. The Lord calls you intimately by name: "Thou art Mine." Waters may rise, but they cannot drown you.',
    prayer: 'Father, thank You for knowing me intimately. When trials feel like rushing waters, hold my hand tightly and guide me safely across.',
    author: 'Isaiah'
  },
  {
    dayOfMonth: 9,
    reference: 'Proverbs 31:30',
    text: 'Favour is deceitful, and beauty is vain: but a woman that feareth the Lord, she shall be praised.',
    theme: 'A Reverent Heart',
    reflection: 'Chasing the world’s fleeting applause exhausts the soul. But a woman whose heart beats in reverence for God possesses a quiet luster that endures for eternity.',
    prayer: 'Lord, draw my desires away from shallow approval. Cultivate in me a holy reverence for Your presence that shines with authentic grace.',
    author: 'King Lemuel'
  },
  {
    dayOfMonth: 10,
    reference: 'Psalm 139:14',
    text: 'I will praise thee; for I am fearfully and wonderfully made: marvellous are thy works; and that my soul knoweth right well.',
    theme: 'Masterpiece of Grace',
    reflection: 'Every fiber of your temperament, your gentle empathy, and your unique design was intricately crafted by God’s artisan hands. Celebrate His handiwork in you.',
    prayer: 'Creator God, forgive me when I criticize what You crafted with such love. I thank You today for making me fearfully and wonderfully unique.',
    author: 'David'
  },
  {
    dayOfMonth: 11,
    reference: 'Romans 12:12',
    text: 'Rejoicing in hope; patient in tribulation; continuing instant in prayer;',
    theme: 'Rhythm of Grace',
    reflection: 'Three graceful secrets to a serene life: maintain bright hope in your spirit, hold patience during friction, and keep prayer open like a continuous breathing conversation.',
    prayer: 'Lord Jesus, help me keep this gentle rhythm today: hope in my heart, patience in my steps, and prayer constantly flowing on my lips.',
    author: 'Paul'
  },
  {
    dayOfMonth: 12,
    reference: 'Colossians 3:12',
    text: 'Put on therefore, as the elect of God, holy and beloved, bowels of mercies, kindness, humbleness of mind, meekness, longsuffering;',
    theme: 'Clothed in Kindness',
    reflection: 'Before you choose your physical outfit each morning, choose what your soul will wear: compassionate mercy, soft humility, and tender kindness.',
    prayer: 'Father, dress my spirit today in garments of holy kindness and patient love. Let anyone who comes near feel the gentleness of Christ.',
    author: 'Paul'
  }
];

export function getDailyVerseForToday(): DailyVerseItem {
  const day = new Date().getDate();
  const verse = DAILY_VERSES.find(v => v.dayOfMonth === day);
  return verse || DAILY_VERSES[0];
}
