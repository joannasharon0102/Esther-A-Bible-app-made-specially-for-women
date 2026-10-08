import { DevotionalPlan } from '../types';

export const DEVOTIONAL_PLANS: DevotionalPlan[] = [
  {
    id: 'women-of-the-bible',
    title: 'Women of the Bible',
    subtitle: 'Faith, Courage & Enduring Grace',
    durationDays: 7,
    category: 'Biblical Women',
    coverImage: '/src/assets/images/devotional_women_1791476436368.jpg',
    accentColor: '#B76E79',
    author: 'ESTHER Devotional Circle',
    description: 'Walk alongside seven legendary women of scripture—Esther, Ruth, Hannah, Mary, Deborah, Abigail, and Lydia—and discover how God moved through their feminine bravery, quiet trust, and steadfast love.',
    days: [
      {
        dayNumber: 1,
        title: 'Esther: For Such a Time as This',
        passageRef: 'Esther 4:13-16; 5:1-3',
        passageText: 'Go, gather together all the Jews that are present in Shushan, and fast ye for me, and neither eat nor drink three days, night or day: I also and my maidens will fast likewise; and so will I go in unto the king, which is not according to the law: and if I perish, I perish.',
        reflection: 'Queen Esther faced a life-and-death crossroads. When genocide threatened her people, she didn’t rely on worldly intrigue; she rallied her maidens in prayer and fasting. True royal courage is not the absence of fear, but the surrender of self for God’s redemptive purpose.',
        reflectionQuestions: [
          'Where in your current season has God placed you "for such a time as this"?',
          'What fear are you invited to lay down in exchange for holy bravery?'
        ],
        prayer: 'Lord God of Esther, when timid thoughts tempt me to stay silent or hide, awaken within me the royal boldness of Your daughter. Clothe me in dignity and give me courage to stand for truth. In Jesus’ name, Amen.'
      },
      {
        dayNumber: 2,
        title: 'Ruth: Covenant Loyalty in Hard Seasons',
        passageRef: 'Ruth 1:16-18; 2:11-12',
        passageText: 'Intreat me not to leave thee, or to return from following after thee: for whither thou goest, I will go... The Lord recompense thy work, and a full reward be given thee of the Lord God of Israel, under whose wings thou art come to trust.',
        reflection: 'Ruth lost her husband, homeland, and security. Yet her loyalty to her grieving mother-in-law Naomi reveals the power of selfless devotion. When you remain steadfast in quiet loyalty, the Lord prepares an unexpected harvest of blessing under His wings.',
        reflectionQuestions: [
          'Who in your life needs your steadfast loyalty and comforting presence right now?',
          'How can you seek refuge under the wings of the Lord today instead of striving alone?'
        ],
        prayer: 'Father, give me Ruth’s loyal heart. When circumstances are bleak, teach me to walk in sacrificial kindness and trust that You are quietly orchestrating my redemption. Amen.'
      },
      {
        dayNumber: 3,
        title: 'Hannah: Pouring Out the Soul in Honest Tears',
        passageRef: '1 Samuel 1:10-18',
        passageText: 'And she was in bitterness of soul, and prayed unto the Lord, and wept sore... And she said, No, my lord, I am a woman of a sorrowful spirit... but have poured out my soul before the Lord.',
        reflection: 'Hannah didn’t sanitize her prayers with hollow clichés. She took her deepest ache and raw longing directly into the tabernacle before the Lord. When she poured out her tears, her face was no longer sad, because true prayer transfers the burden from our shoulders to God’s.',
        reflectionQuestions: [
          'Is there an unspoken heartache you have hesitated to bring completely before God?',
          'What changes in your posture when you realize God bottles every one of your tears?'
        ],
        prayer: 'Lord, You welcome my raw, unfiltered prayers. Here is the secret cry of my heart. I lay it down at Your altar and take Your comforting peace in exchange. Amen.'
      },
      {
        dayNumber: 4,
        title: 'Mary of Nazareth: The Gentle Power of "Let It Be"',
        passageRef: 'Luke 1:28-38; 46-49',
        passageText: 'And Mary said, Behold the handmaid of the Lord; be it unto me according to thy word... For he that is mighty hath done to me great things; and holy is his name.',
        reflection: 'Mary was a young, humble maiden whose life was turned completely upside down by angelic announcement. Her response is the pinnacle of spiritual surrender: "Let it be unto me according to Your word." Surrender is not defeat; it is welcoming heaven into our lives.',
        reflectionQuestions: [
          'What plans of your own must you hold with open hands so God’s greater plan can unfold?',
          'How can Mary’s Magnificat song of praise inspire your worship today?'
        ],
        prayer: 'Holy Father, I say "yes" to Your plans, even when they surprise or unsettle my own roadmap. Be it unto me according to Your gracious word. Amen.'
      },
      {
        dayNumber: 5,
        title: 'Deborah: Standing Tall Under the Palm Tree',
        passageRef: 'Judges 4:4-9',
        passageText: 'And Deborah, a prophetess, the wife of Lapidoth, she judged Israel at that time. And she dwelt under the palm tree... And she said, I will surely go with thee.',
        reflection: 'Deborah governed with discernment, spiritual authority, and maternal strength. When generals hesitated, Deborah stepped forward without arrogance, reminding everyone that the battle belongs to God alone. A woman who knows her God can rally an entire nation.',
        reflectionQuestions: [
          'Where is God inviting you to step into godly leadership or wise counsel?',
          'How can you cultivate spiritual clarity through quiet listening before making decisions?'
        ],
        prayer: 'Almighty God, grant me Deborah’s clarity and conviction. Keep me grounded under Your shade and give me words of wisdom that bring peace and victory to my community. Amen.'
      },
      {
        dayNumber: 6,
        title: 'Abigail: The Grace that Defuses Anger',
        passageRef: '1 Samuel 25:23-31',
        passageText: 'And when Abigail saw David, she hasted, and lighted off the ass, and fell before David on her face, and bowed herself to the ground... Now therefore, my lord, as the Lord liveth... the Lord will certainly make my lord a sure house.',
        reflection: 'Faced with impending bloodshed due to her foolish husband Nabal, Abigail acted with lightning speed, lavish generosity, and eloquent diplomacy. Her soft answer turned away wrath and preserved David’s conscience. Wisdom and gentleness are formidable superpowers.',
        reflectionQuestions: [
          'How do you typically respond when someone around you is irritable or aggressive?',
          'How can you bring calming peace into tense conversations this week?'
        ],
        prayer: 'Lord Jesus, make me a peacemaker. When heated tempers flare, grant me Abigail’s poise, humble discernment, and gentle speech that de-escalates strife. Amen.'
      },
      {
        dayNumber: 7,
        title: 'Lydia: Hospitality, Business & an Open Heart',
        passageRef: 'Acts 16:13-15',
        passageText: 'And a certain woman named Lydia, a seller of purple, of the city of Thyatira, which worshipped God, heard us: whose heart the Lord opened, that she attended unto the things which were spoken of Paul.',
        reflection: 'Lydia was an accomplished businesswoman selling luxurious purple textiles, yet her true wealth was an open heart toward God’s word. She immediately opened her home as the first church in Europe. Your career and resources are holy vessels for hospitality.',
        reflectionQuestions: [
          'How can your daily work, creativity, and home be opened to nurture other souls?',
          'What does a spiritually responsive, open heart look like in your daily routine?'
        ],
        prayer: 'Lord, like Lydia, open my heart wide to Your whispers. Bless the work of my hands and make my home a sanctuary of warm hospitality, safety, and encouragement for others. Amen.'
      }
    ]
  },
  {
    id: 'strength-for-anxious-hearts',
    title: 'Strength for Anxious Hearts',
    subtitle: '5 Days of Calming Truth & Sacred Rest',
    durationDays: 5,
    category: 'Inner Peace',
    coverImage: '/src/assets/images/devotional_peace_1791476423630.jpg',
    accentColor: '#E8B4B8',
    author: 'Grace & Truth Ministries',
    description: 'A gentle, soothing pathway out of mental spirals, panic, and overwhelming fatigue into the green pastures and quiet waters of Christ’s presence.',
    days: [
      {
        dayNumber: 1,
        title: 'Trading the "What Ifs" for "He Is"',
        passageRef: 'Psalm 23:1-3',
        passageText: 'The Lord is my shepherd; I shall not want. He maketh me to lie down in green pastures: he leadeth me beside the still waters. He restoreth my soul.',
        reflection: 'Anxiety thrives on racing into imagined futures where you imagine yourself without God. But wherever tomorrow takes you, your Shepherd is already there waiting. He doesn’t merely give rest—He restores the frayed edges of your soul.',
        reflectionQuestions: [
          'What specific "what if" thought has consumed your peace this week?',
          'How does knowing the Good Shepherd walks before you change your perspective?'
        ],
        prayer: 'Gentle Shepherd, I cease my frantic scurrying. Lead me to Your still waters. Restore my worn spirit and remind me that You provide every single need. Amen.'
      },
      {
        dayNumber: 2,
        title: 'The Fortress of Gratitude',
        passageRef: 'Philippians 4:6-7',
        passageText: 'Be careful for nothing; but in every thing by prayer and supplication with thanksgiving let your requests be made known unto God. And the peace of God, which passeth all understanding, shall keep your hearts and minds through Christ Jesus.',
        reflection: 'Notice the divine equation: prayer plus thanksgiving equals peace. Gratitude acts as a sentinel guarding the doorway of your heart and mind against intrusive dread.',
        reflectionQuestions: [
          'Name three specific small mercies God granted you within the last 24 hours.',
          'How can you thank God for an unresolved prayer before the answer even arrives?'
        ],
        prayer: 'Father, thank You for Your endless mercies new every dawn. When worry knocks, I choose thanksgiving. Guard my thoughts in Your tranquil fortress of peace. Amen.'
      },
      {
        dayNumber: 3,
        title: 'He Holds Tomorrow in His Hands',
        passageRef: 'Matthew 6:31-34',
        passageText: 'Therefore take no thought, saying, What shall we eat? or, What shall we drink? ... for your heavenly Father knoweth that ye have need of all these things... Take therefore no thought for the morrow: for the morrow shall take thought for the things of itself.',
        reflection: 'Jesus points to wildflowers and tiny sparrows to illustrate how tenderly the Father clothes and feeds His creation. If He dresses lilies in regal splendor, how much more will He hold and protect you, His beloved daughter?',
        reflectionQuestions: [
          'Why do we find it harder to trust God with our needs than sparrows do?',
          'What can you consciously hand over to God for the next 24 hours?'
        ],
        prayer: 'Lord, help me live fully present in today’s grace. I surrender tomorrow’s outcomes to Your perfect care. You know what I need, and I rest in Your provision. Amen.'
      },
      {
        dayNumber: 4,
        title: 'Casting the Mental Load',
        passageRef: '1 Peter 5:6-7',
        passageText: 'Humble yourselves therefore under the mighty hand of God, that he may exalt you in due time: Casting all your care upon him; for he careth for you.',
        reflection: 'Casting is an active, vigorous release. When a fisherman casts a net, he throws it far into the deep water. Stop holding onto the anxieties you prayed about; throw them into His endless sea of mercy.',
        reflectionQuestions: [
          'Are there cares you picked back up right after praying about them?',
          'What would it feel like to leave them permanently in His hands?'
        ],
        prayer: 'Dear Jesus, I throw this heavy basket of worries at Your feet. I refuse to pick it back up. You care for me, and that is enough. Amen.'
      },
      {
        dayNumber: 5,
        title: 'Under the Shadow of His Wings',
        passageRef: 'Psalm 91:1-4',
        passageText: 'He that dwelleth in the secret place of the most High shall abide under the shadow of the Almighty... He shall cover thee with his feathers, and under his wings shalt thou trust.',
        reflection: 'Like a mother bird shielding her chicks from freezing winds and predators under her soft warm plumage, the Almighty draws you close. You are fully shielded in His secret pavilion.',
        reflectionQuestions: [
          'What does "dwelling in the secret place" mean in your practical daily life?',
          'How can you take 5 minutes of sacred stillness right now to sit under His wings?'
        ],
        prayer: 'Almighty God, I hide under Your sheltering wings. No fear can breach Your love. I breathe in Your stillness and go forth in serenity. Amen.'
      }
    ]
  },
  {
    id: 'proverbs-31-living',
    title: 'Proverbs 31 Living',
    subtitle: 'Cultivating Daily Grace, Industry & Poise',
    durationDays: 5,
    category: 'Spiritual Growth',
    coverImage: '/src/assets/images/devotional_proverbs_1791476449843.jpg',
    accentColor: '#D99B9F',
    author: 'Heart & Home Devotionals',
    description: 'Moving beyond unattainable perfectionism into the real heartbeat of the Proverbs 31 woman: reverence for the Lord, joyful diligence, generous hands, and a soul clothed in strength and laughter.',
    days: [
      {
        dayNumber: 1,
        title: 'More Precious Than Rubies',
        passageRef: 'Proverbs 31:10-12',
        passageText: 'Who can find a virtuous woman? for her price is far above rubies. The heart of her husband doth safely trust in her, so that he shall have no need of spoil.',
        reflection: 'The Hebrew word for "virtuous" here is chayil—meaning valiant, noble, capable, and warrior-like. A Proverbs 31 woman is not an exhausted perfectionist; she is a valiant daughter of God whose life radiates trustworthiness.',
        reflectionQuestions: [
          'How has comparison or perfectionism clouded your understanding of your true worth?',
          'What qualities of inner valiance is the Holy Spirit growing in you?'
        ],
        prayer: 'Lord, thank You for establishing my worth far beyond diamonds and rubies. Build in me a noble, steadfast character rooted in Your truth. Amen.'
      },
      {
        dayNumber: 2,
        title: 'Hands That Bring Light to the Home',
        passageRef: 'Proverbs 31:13-19',
        passageText: 'She seeketh wool, and flax, and worketh willingly with her hands... She riseth also while it is yet night, and giveth meat to her household...',
        reflection: 'She works "willingly with her hands." Her industry flows from love, not begrudging obligation. Whether cooking, organizing, working on projects, or caring for family, our daily chores become sacred worship when performed with a willing spirit.',
        reflectionQuestions: [
          'How can you transform a mundane task today into an act of heartfelt worship?',
          'Where can you ask God for renewed joy in your daily responsibilities?'
        ],
        prayer: 'Father, sanctify my hands and routine. When tasks feel repetitive, fill my heart with willing delight, knowing that serving others honors You. Amen.'
      },
      {
        dayNumber: 3,
        title: 'Extending Hands to the Needy',
        passageRef: 'Proverbs 31:20-21',
        passageText: 'She stretcheth out her hand to the poor; yea, she reacheth forth her hands to the needy.',
        reflection: 'True spiritual beauty never looks only inward. Her hands that work diligently inside her household are the very same hands stretched outward to touch the broken and vulnerable in her community.',
        reflectionQuestions: [
          'Who around you is experiencing emotional or material hardship right now?',
          'What is one practical way you can stretch out your hand in generosity this week?'
        ],
        prayer: 'Lord, expand my heart beyond my own comfortable circle. Give me eyes that notice the overlooked and hands eager to share Your abundance. Amen.'
      },
      {
        dayNumber: 4,
        title: 'Clothed in Strength and Laughing at the Days Ahead',
        passageRef: 'Proverbs 31:25',
        passageText: 'Strength and honour are her clothing; and she shall rejoice in time to come.',
        reflection: 'Other translations say: "She laughs without fear of the future." Why? Not because the future holds zero problems, but because she knows the God who holds every tomorrow. Holy laughter is the ultimate victory over anxiety.',
        reflectionQuestions: [
          'What future uncertainty causes you to furrow your brow instead of smile in faith?',
          'How can you dress your spirit in honor and holy confidence this morning?'
        ],
        prayer: 'Father, clothe me in spiritual armor and royal honor. Melt away the dread of tomorrow with the sweet melody of Your holy laughter and joyful confidence. Amen.'
      },
      {
        dayNumber: 5,
        title: 'The Secret of True Charm',
        passageRef: 'Proverbs 31:30-31',
        passageText: 'Favour is deceitful, and beauty is vain: but a woman that feareth the Lord, she shall be praised. Give her of the fruit of her hands; and let her own works praise her in the gates.',
        reflection: 'Society spends billions chasing youthful filters and surface glamour that quickly fade. But reverence for God—a tender, awe-filled walk with the Savior—creates a luminous inner beauty that deepens with every passing year.',
        reflectionQuestions: [
          'How do you nourish your reverence for the Lord in your daily quiet time?',
          'What fruit of the Spirit in your character are you most thankful for today?'
        ],
        prayer: 'Dearest Lord, let my primary desire be a life of holy awe and love for You. Let the beauty of Jesus be clearly seen in all that I do and say. Amen.'
      }
    ]
  },
  {
    id: '30-days-of-peace',
    title: '30 Days of Peace & Stillness',
    subtitle: 'A Sanctuary for the Weary Spirit',
    durationDays: 10,
    category: 'Peace & Serenity',
    coverImage: '/src/assets/images/verse_ethereal_bg_1791476459906.jpg',
    accentColor: '#B76E79',
    author: 'Selah Contemplative Studies',
    description: 'Immerse your soul in daily scripture sanctuary designed to quiet mental chatter, release control, and anchor your heart in deep celestial calm.',
    days: [
      {
        dayNumber: 1,
        title: 'Be Still and Know',
        passageRef: 'Psalm 46:10',
        passageText: 'Be still, and know that I am God: I will be exalted among the heathen, I will be exalted in the earth.',
        reflection: 'The Hebrew word for "be still" (raphah) means to cease striving, let go, relax your grip. Stop frantically managing outcomes. God is God, and you are His beloved daughter.',
        reflectionQuestions: [
          'What are you currently gripping too tightly?',
          'What happens when you sit silently with God for 2 uninterrupted minutes?'
        ],
        prayer: 'Lord, I release my grip. I cease striving. You are God on the throne, and I am safe in Your sovereignty. Amen.'
      },
      {
        dayNumber: 2,
        title: 'Peace Like a River',
        passageRef: 'Isaiah 66:12-13',
        passageText: 'For thus saith the Lord, Behold, I will extend peace to her like a river, and the glory of the Gentiles like a flowing stream... As one whom his mother comforteth, so will I comfort you.',
        reflection: 'Rivers don’t strain or push; they follow the gentle pull of grace. God promises peace that flows steadily into your dry valleys, accompanied by maternal comfort from His infinite heart.',
        reflectionQuestions: [
          'Where do you need the river of God’s comfort to flow today?',
          'How does God comforting you as a mother comforts her child touch your spirit?'
        ],
        prayer: 'Father, open the floodgates of Your peace like a gentle, ceaseless river into my soul. Blanket me in Your comforting embrace. Amen.'
      },
      {
        dayNumber: 3,
        title: 'Guarded by Celestial Peace',
        passageRef: 'Colossians 3:15',
        passageText: 'And let the peace of God rule in your hearts, to the which also ye are called in one body; and be ye thankful.',
        reflection: 'The word "rule" means to act as an umpire or arbiter. When conflicting emotions, opinions, or anxieties pull at your heart, let Christ’s peace call the final shots.',
        reflectionQuestions: [
          'Is peace acting as the umpire over your decisions today?',
          'How can thanksgiving help settle disputes inside your heart?'
        ],
        prayer: 'Lord, make Your supernatural peace the umpire of my decisions and feelings. Let no bitterness or panic overrule Your presence. Amen.'
      }
    ]
  },
  {
    id: 'bible-in-a-year',
    title: 'Daily Psalms & Gospels Journey',
    subtitle: 'A Year of Living Water and Heavenly Light',
    durationDays: 7,
    category: 'Scripture Journey',
    coverImage: '/src/assets/images/devotional_peace_1791476423630.jpg',
    accentColor: '#B76E79',
    author: 'Daily Bread Sisters',
    description: 'A manageable daily rhythm pairing the heartfelt songs of David with the living words and miracles of Jesus Christ.',
    days: [
      {
        dayNumber: 1,
        title: 'Blessed by the Streams of Water',
        passageRef: 'Psalm 1 & John 1:1-5',
        passageText: 'And he shall be like a tree planted by the rivers of water, that bringeth forth his fruit in his season; his leaf also shall not wither; and whatsoever he doeth shall prosper.',
        reflection: 'Roots planted deep in God’s Word do not fear heat or drought. When you meditate on scripture, your soul remains evergreen regardless of worldly seasons.',
        reflectionQuestions: [
          'What spiritual streams are nourishing your mind lately?',
          'How does Jesus as the Living Word bring light into dark places?'
        ],
        prayer: 'Lord, plant my roots firmly by Your river of truth. May my spiritual leaf never wither, and may I bear sweet fruit for Your glory. Amen.'
      },
      {
        dayNumber: 2,
        title: 'The Light of the World',
        passageRef: 'Psalm 27:1 & John 8:12',
        passageText: 'The Lord is my light and my salvation; whom shall I fear? the Lord is the strength of my life; of whom shall I be afraid?',
        reflection: 'Darkness cannot overpower light. When Jesus steps into a room, fear must flee. Let His brilliance illuminate your steps today.',
        reflectionQuestions: [
          'What fear vanishes when you remember the Lord is your personal light?',
          'How can you reflect Christ’s light to someone feeling down today?'
        ],
        prayer: 'Jesus, You are my light and my salvation. I banish fear from my heart and step boldly into the warmth of Your grace. Amen.'
      }
    ]
  }
];
