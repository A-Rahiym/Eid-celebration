export interface Country { flag: string; code: string; }

export const COUNTRIES: Country[] = [
  { flag: '🇸🇦', code: 'SA' },
  { flag: '🇹🇷', code: 'TR' },
  { flag: '🇮🇩', code: 'ID' },
  { flag: '🇵🇰', code: 'PK' },
  { flag: '🇧🇩', code: 'BD' },
  { flag: '🇪🇬', code: 'EG' },
  { flag: '🇳🇬', code: 'NG' },
  { flag: '🇲🇾', code: 'MY' },
  { flag: '🇮🇷', code: 'IR' },
  { flag: '🇩🇿', code: 'DZ' },
  { flag: '🇲🇦', code: 'MA' },
  { flag: '🇬🇧', code: 'GB' },
  { flag: '🇺🇸', code: 'US' },
  { flag: '🇫🇷', code: 'FR' },
  { flag: '🇩🇪', code: 'DE' },
  { flag: '🇸🇳', code: 'SN' },
  { flag: '🇯🇴', code: 'JO' },
  { flag: '🇦🇪', code: 'AE' },
  { flag: '🇰🇲', code: 'KM' },
  { flag: '🇱🇧', code: 'LB' },
  { flag: '🇸🇴', code: 'SO' },
  { flag: '🇸🇩', code: 'SD' },
  { flag: '🇾🇪', code: 'YE' },
  { flag: '🇱🇾', code: 'LY' },
  { flag: '🇹🇳', code: 'TN' },
  { flag: '🇦🇫', code: 'AF' },
  { flag: '🇺🇿', code: 'UZ' },
  { flag: '🇰🇿', code: 'KZ' },
  { flag: '🇦🇿', code: 'AZ' },
  { flag: '🇰🇬', code: 'KG' },
  { flag: '🇹🇯', code: 'TJ' },
  { flag: '🇮🇶', code: 'IQ' },
  { flag: '🇸🇾', code: 'SY' },
  { flag: '🇶🇦', code: 'QA' },
  { flag: '🇧🇭', code: 'BH' },
  { flag: '🇴🇲', code: 'OM' },
  { flag: '🇰🇼', code: 'KW' },
  { flag: '🇮🇳', code: 'IN' },
  { flag: '🇨🇳', code: 'CN' },
];

export const EMOJI_OPTIONS = ['🌙', '✨', '🤲', '❤️', '🕌'];

interface Wish {
  id: number;
  name: string;
  loc: string;
  text: string;
  arabic?: string;
  time: string;
  reactions: Record<string, number>;
  color: string;
  accent: string;
}

// Seed data — kept as static fallback for initial render
export const MESSAGES: Wish[] = [
  {
    id:1, name:"Fatima Al-Rashidi", loc:"🇸🇦 Saudi Arabia",
    text:"Eid Mubarak to every soul celebrating tonight. May this blessed day fill your home with light, your heart with peace, and your table with joy. 🌙",
    time:"2m ago", reactions:{"🌙":31,"✨":14,"🤲":9}, color:"#1c4a3a", accent:"#3db89c"
  },
  {
    id:2, name:"Ahmed Hassan", loc:"🇪🇬 Egypt",
    text:"From Cairo, with love — كل عام وأنتم بخير. The call to prayer just rang across the city and I feel the whole world breathing together.",
    arabic:"كل عام وأنتم بخير", time:"4m ago", reactions:{"❤️":38,"🌙":18}, color:"#2a1a4a", accent:"#9070cc"
  },
  {
    id:3, name:"Amira Binte Yusuf", loc:"🇲🇾 Malaysia",
    text:"Selamat Hari Raya Aidilfitri from Kuala Lumpur! The lanterns are lit, the air smells of ketupat and rendang, and my heart is full. ✨",
    time:"7m ago", reactions:{"✨":22,"🤲":13,"❤️":8}, color:"#1a3a2a", accent:"#5db87a"
  },
  {
    id:4, name:"Tariq Okonkwo", loc:"🇳🇬 Nigeria",
    text:"Eid Mubarak from Lagos! The whole neighbourhood is alive — drums, laughter, children in new clothes. May Allah bless us all abundantly. 🕌",
    time:"10m ago", reactions:{"🌙":19,"✨":10,"🕌":7}, color:"#3a2a0a", accent:"#c9a040"
  },
  {
    id:5, name:"Layla Karimi", loc:"🇮🇷 Iran",
    text:"عید مبارک — Eid Mubarak. May every prayer be answered and every heart find the peace it has been searching for. This day belongs to all of us.",
    time:"13m ago", reactions:{"🤲":26,"❤️":19,"🌙":15}, color:"#1a2a4a", accent:"#4a80c0"
  },
  {
    id:6, name:"Omar Siddiqui", loc:"🇵🇰 Pakistan",
    text:"Eid Mubarak from Lahore! ✨ Standing on the rooftop watching fireworks paint the sky. Sending warm duas to every Muslim family around the globe tonight.",
    time:"16m ago", reactions:{"🌙":33,"✨":20,"❤️":12}, color:"#0a3a1a", accent:"#3db89c"
  },
  {
    id:7, name:"Zara Belkacem", loc:"🇩🇿 Algeria",
    text:"Eid Saïd! From Algiers to the world — may Allah accept our fasting, our prayers, and grant us another year of blessings together. 🤲",
    time:"20m ago", reactions:{"🤲":16,"🕌":9}, color:"#2a1a2a", accent:"#b070a0"
  },
  {
    id:8, name:"Khalid Al-Mansouri", loc:"🇦🇪 UAE",
    text:"From the golden shores of Dubai — Eid Mubarak! The world feels smaller and more beautiful when we all celebrate as one humanity. 🌙✨",
    time:"24m ago", reactions:{"✨":29,"❤️":23,"🌙":21}, color:"#3a1a0a", accent:"#c9a96e"
  },
  {
    id:9, name:"Nadia Rahman", loc:"🇬🇧 United Kingdom",
    text:"Eid Mubarak from London! 🌙 First Eid in a new city — and finding this wall made it feel like I'm celebrating with the whole world. Truly beautiful.",
    time:"28m ago", reactions:{"❤️":44,"🌙":27,"✨":18}, color:"#1a2a40", accent:"#5090d0"
  },
  {
    id:10, name:"Yusuf Diallo", loc:"🇸🇳 Senegal",
    text:"Tabaski Mubarak from Dakar! The whole family gathered, the sheep have been shared, and gratitude fills every corner of our home. Blessed Eid to all. 🤲",
    time:"33m ago", reactions:{"🤲":21,"🌙":14,"❤️":11}, color:"#2a3a1a", accent:"#70b840"
  },
  {
    id:11, name:"Sara Özdemir", loc:"🇹🇷 Turkey",
    text:"Bayramınız Mübarek Olsun! ✨ Celebrating with three generations under one roof today — my grandmother's baklava recipe has been passed down again. Eid Mubarak from Istanbul!",
    time:"38m ago", reactions:{"✨":17,"❤️":31,"🌙":13}, color:"#1a1a3a", accent:"#7060c0"
  },
  {
    id:12, name:"Imran Chowdhury", loc:"🇧🇩 Bangladesh",
    text:"Eid Mubarak from Dhaka! The city is glowing tonight — white kurtas, the smell of sheer khurma, children laughing in the streets. 🕌 This is what joy feels like.",
    time:"45m ago", reactions:{"🕌":13,"🌙":22,"✨":15}, color:"#0a1a3a", accent:"#4070b0"
  },
];
