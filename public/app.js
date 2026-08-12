const DEFAULT_ANIME = {
  naruto: {
    name: "Naruto",
    malId: 20,
    accent: "#ff9138",
    logo: "https://www.citypng.com/public/uploads/preview/naruto-shippuden-logo-transparent-background-701751694777597l432acg8r4.png?v=2026030511"
  },
  onepiece: {
    name: "One Piece",
    malId: 21,
    accent: "#f1b44e",
    logo: "https://toppng.com/uploads/preview/file-history-one-piece-logo-11563071942adcognuldv.png"
  },
  dragonball: {
    name: "Dragon Ball",
    malId: 30694,
    accent: "#ff7a2f",
    logo: "https://www.citypng.com/public/uploads/preview/dragon-ball-z-logo-download-png-7017516947067563zggkgegzs.png?v=2026032119"
  },
  jjk: {
    name: "Jujutsu Kaisen",
    malId: 40748,
    accent: "#9a6cff",
    logo: "https://www.pngmart.com/files/23/Jujutsu-Kaisen-Logo-PNG.png"
  },
  bleach: {
    name: "Bleach",
    malId: 269,
    accent: "#e6e6e6",
    logo: "https://toppng.com/public/uploads/preview/bleach-bleach-anime-logo-transparent-11563025094ksqaagis2s.png"
  },
  hxh: {
    name: "Hunter × Hunter",
    malId: 11061,
    accent: "#58d98f",
    logo: "https://pngset.com/images/hunter-x-hunter-sticker-logo-vinyl-hunter-hunter-text-alphabet-crowd-bazaar-transparent-png-900850.png"
  },
  aot: {
    name: "Attack on Titan",
    malId: 16498,
    accent: "#c16c5c",
    logo: "https://freepngimg.com/thumb/attack_on_titan/117253-on-attack-titan-logo-png-download-free.png"
  },
  demon: {
    name: "Demon Slayer",
    malId: 38000,
    accent: "#ef3340",
    logo: "https://www.kindpng.com/picc/m/30-300084_logo-demon-slayer-demon-slayer-kimetsu-no-yaiba.png"
  },
  fma: {
    name: "Fullmetal Alchemist: Brotherhood",
    malId: 5114,
    accent: "#c43d3d",
    logo: "https://image.pngaaa.com/411/1285411-middle.png"
  },
  deathnote: {
    name: "Death Note",
    malId: 1535,
    accent: "#cfcfcf",
    logo: "https://www.vhv.rs/dpng/d/527-5277783_death-note-hd-png-download.png"
  },
  codegeass: {
    name: "Code Geass",
    malId: 1575,
    accent: "#d9465f",
    logo: "https://image.pngaaa.com/116/1608116-middle.png"
  },
  frieren: {
    name: "Frieren: Beyond Journey’s End",
    malId: 52991,
    accent: "#58b5a1",
    logo: "https://hyakkaryoran.sontyo.jp/anime/soso-frieren/logo.PNG"
  }
};

const DEFAULT_ROSTER = [
  { id:"card_001", anime:"naruto", name:"Naruto Uzumaki", score:93, image:"/assets/catalog/cards/card_001.jpg" },
  { id:"card_002", anime:"naruto", name:"Sasuke Uchiha", score:90, image:"/assets/catalog/cards/card_002.jpg" },
  { id:"card_003", anime:"naruto", name:"Kakashi Hatake", score:76, image:"/assets/catalog/cards/card_003.jpg" },
  { id:"card_004", anime:"naruto", name:"Itachi Uchiha", score:86, image:"/assets/catalog/cards/card_004.jpg" },
  { id:"card_005", anime:"naruto", name:"Madara Uchiha", score:100, image:"/assets/catalog/cards/card_005.jpg" },
  { id:"card_006", anime:"naruto", name:"Minato Namikaze", score:83, image:"/assets/catalog/cards/card_006.jpg" },
  { id:"card_007", anime:"naruto", name:"Gaara", score:58, image:"/assets/catalog/cards/card_007.jpg" },
  { id:"card_008", anime:"naruto", name:"Shikamaru Nara", score:45, image:"/assets/catalog/cards/card_008.jpg" },
  { id:"card_009", anime:"naruto", name:"Jiraiya", score:69, image:"/assets/catalog/cards/card_009.jpg" },
  { id:"card_010", anime:"naruto", name:"Tsunade", score:55, image:"/assets/catalog/cards/card_010.jpg" },
  { id:"card_011", anime:"naruto", name:"Orochimaru", score:72, image:"/assets/catalog/cards/card_011.jpg" },
  { id:"card_012", anime:"naruto", name:"Rock Lee", score:31, image:"/assets/catalog/cards/card_012.jpg" },
  { id:"card_013", anime:"onepiece", name:"Monkey D. Luffy", score:97, image:"/assets/catalog/cards/card_013.jpg" },
  { id:"card_014", anime:"onepiece", name:"Roronoa Zoro", score:86, image:"/assets/catalog/cards/card_014.jpg" },
  { id:"card_015", anime:"onepiece", name:"Sanji", score:76, image:"/assets/catalog/cards/card_015.jpg" },
  { id:"card_016", anime:"onepiece", name:"Trafalgar Law", score:79, image:"/assets/catalog/cards/card_016.jpg" },
  { id:"card_017", anime:"onepiece", name:"Shanks", score:100, image:"/assets/catalog/cards/card_017.jpg" },
  { id:"card_018", anime:"onepiece", name:"Marshall D. Teach", score:93, image:"/assets/catalog/cards/card_018.jpg" },
  { id:"card_019", anime:"onepiece", name:"Nami", score:34, image:"/assets/catalog/cards/card_019.jpg" },
  { id:"card_020", anime:"onepiece", name:"Nico Robin", score:52, image:"/assets/catalog/cards/card_020.jpg" },
  { id:"card_021", anime:"onepiece", name:"Usopp", score:17, image:"/assets/catalog/cards/card_021.jpg" },
  { id:"card_022", anime:"onepiece", name:"Tony Tony Chopper", score:24, image:"/assets/catalog/cards/card_022.jpg" },
  { id:"card_023", anime:"onepiece", name:"Boa Hancock", score:65, image:"/assets/catalog/cards/card_023.jpg" },
  { id:"card_024", anime:"onepiece", name:"Sabo", score:72, image:"/assets/catalog/cards/card_024.jpg" },
  { id:"card_025", anime:"dragonball", name:"Goku", score:100, image:"/assets/catalog/cards/card_025.jpg" },
  { id:"card_026", anime:"dragonball", name:"Vegeta", score:97, image:"/assets/catalog/cards/card_026.jpg" },
  { id:"card_027", anime:"dragonball", name:"Gohan", score:86, image:"/assets/catalog/cards/card_027.jpg" },
  { id:"card_028", anime:"dragonball", name:"Piccolo", score:72, image:"/assets/catalog/cards/card_028.jpg" },
  { id:"card_029", anime:"dragonball", name:"Frieza", score:93, image:"/assets/catalog/cards/card_029.jpg" },
  { id:"card_030", anime:"dragonball", name:"Goku Black", score:90, image:"/assets/catalog/cards/card_030.jpg" },
  { id:"card_031", anime:"dragonball", name:"Jiren", score:93, image:"/assets/catalog/cards/card_031.jpg" },
  { id:"card_032", anime:"dragonball", name:"Trunks", score:65, image:"/assets/catalog/cards/card_032.jpg" },
  { id:"card_033", anime:"dragonball", name:"Krillin", score:27, image:"/assets/catalog/cards/card_033.jpg" },
  { id:"card_034", anime:"dragonball", name:"Android 18", score:52, image:"/assets/catalog/cards/card_034.jpg" },
  { id:"card_035", anime:"dragonball", name:"Broly", score:97, image:"/assets/catalog/cards/card_035.jpg" },
  { id:"card_036", anime:"dragonball", name:"Beerus", score:100, image:"/assets/catalog/cards/card_036.jpg" },
  { id:"card_037", anime:"jjk", name:"Satoru Gojo", score:100, image:"/assets/catalog/cards/card_037.jpg" },
  { id:"card_038", anime:"jjk", name:"Ryomen Sukuna", score:100, image:"/assets/catalog/cards/card_038.jpg" },
  { id:"card_039", anime:"jjk", name:"Yuta Okkotsu", score:86, image:"/assets/catalog/cards/card_039.jpg" },
  { id:"card_040", anime:"jjk", name:"Yuji Itadori", score:69, image:"/assets/catalog/cards/card_040.jpg" },
  { id:"card_041", anime:"jjk", name:"Megumi Fushiguro", score:58, image:"/assets/catalog/cards/card_041.jpg" },
  { id:"card_042", anime:"jjk", name:"Maki Zenin", score:65, image:"/assets/catalog/cards/card_042.jpg" },
  { id:"card_043", anime:"jjk", name:"Toji Fushiguro", score:83, image:"/assets/catalog/cards/card_043.jpg" },
  { id:"card_044", anime:"jjk", name:"Kento Nanami", score:52, image:"/assets/catalog/cards/card_044.jpg" },
  { id:"card_045", anime:"jjk", name:"Mahito", score:72, image:"/assets/catalog/cards/card_045.jpg" },
  { id:"card_046", anime:"jjk", name:"Suguru Geto", score:79, image:"/assets/catalog/cards/card_046.jpg" },
  { id:"card_047", anime:"jjk", name:"Nobara Kugisaki", score:34, image:"/assets/catalog/cards/card_047.jpg" },
  { id:"card_048", anime:"jjk", name:"Aoi Todo", score:48, image:"/assets/catalog/cards/card_048.jpg" },
  { id:"card_049", anime:"bleach", name:"Ichigo Kurosaki", score:97, image:"/assets/catalog/cards/card_049.jpg" },
  { id:"card_050", anime:"bleach", name:"Sousuke Aizen", score:100, image:"/assets/catalog/cards/card_050.jpg" },
  { id:"card_051", anime:"bleach", name:"Rukia Kuchiki", score:52, image:"/assets/catalog/cards/card_051.jpg" },
  { id:"card_052", anime:"bleach", name:"Byakuya Kuchiki", score:76, image:"/assets/catalog/cards/card_052.jpg" },
  { id:"card_053", anime:"bleach", name:"Kenpachi Zaraki", score:86, image:"/assets/catalog/cards/card_053.jpg" },
  { id:"card_054", anime:"bleach", name:"Toshiro Hitsugaya", score:65, image:"/assets/catalog/cards/card_054.jpg" },
  { id:"card_055", anime:"bleach", name:"Kisuke Urahara", score:79, image:"/assets/catalog/cards/card_055.jpg" },
  { id:"card_056", anime:"bleach", name:"Yoruichi Shihouin", score:69, image:"/assets/catalog/cards/card_056.jpg" },
  { id:"card_057", anime:"bleach", name:"Renji Abarai", score:45, image:"/assets/catalog/cards/card_057.jpg" },
  { id:"card_058", anime:"bleach", name:"Orihime Inoue", score:31, image:"/assets/catalog/cards/card_058.jpg" },
  { id:"card_059", anime:"bleach", name:"Ulquiorra Cifer", score:76, image:"/assets/catalog/cards/card_059.jpg" },
  { id:"card_060", anime:"bleach", name:"Grimmjow Jaegerjaquez", score:65, image:"/assets/catalog/cards/card_060.jpg" },
  { id:"card_061", anime:"hxh", name:"Gon Freecss", score:69, image:"/assets/catalog/cards/card_061.jpg" },
  { id:"card_062", anime:"hxh", name:"Killua Zoldyck", score:76, image:"/assets/catalog/cards/card_062.jpg" },
  { id:"card_063", anime:"hxh", name:"Kurapika", score:72, image:"/assets/catalog/cards/card_063.jpg" },
  { id:"card_064", anime:"hxh", name:"Leorio Paradinight", score:10, image:"/assets/catalog/cards/card_064.jpg" },
  { id:"card_065", anime:"hxh", name:"Hisoka Morow", score:79, image:"/assets/catalog/cards/card_065.jpg" },
  { id:"card_066", anime:"hxh", name:"Chrollo Lucilfer", score:86, image:"/assets/catalog/cards/card_066.jpg" },
  { id:"card_067", anime:"hxh", name:"Meruem", score:100, image:"/assets/catalog/cards/card_067.jpg" },
  { id:"card_068", anime:"hxh", name:"Isaac Netero", score:97, image:"/assets/catalog/cards/card_068.jpg" },
  { id:"card_069", anime:"hxh", name:"Neferpitou", score:83, image:"/assets/catalog/cards/card_069.jpg" },
  { id:"card_070", anime:"hxh", name:"Illumi Zoldyck", score:62, image:"/assets/catalog/cards/card_070.jpg" },
  { id:"card_071", anime:"hxh", name:"Biscuit Krueger", score:55, image:"/assets/catalog/cards/card_071.jpg" },
  { id:"card_072", anime:"hxh", name:"Kite", score:52, image:"/assets/catalog/cards/card_072.jpg" },
  { id:"card_073", anime:"aot", name:"Eren Yeager", score:90, image:"/assets/catalog/cards/card_073.jpg" },
  { id:"card_074", anime:"aot", name:"Levi Ackerman", score:83, image:"/assets/catalog/cards/card_074.jpg" },
  { id:"card_075", anime:"aot", name:"Mikasa Ackerman", score:72, image:"/assets/catalog/cards/card_075.jpg" },
  { id:"card_076", anime:"aot", name:"Armin Arlert", score:55, image:"/assets/catalog/cards/card_076.jpg" },
  { id:"card_077", anime:"aot", name:"Erwin Smith", score:65, image:"/assets/catalog/cards/card_077.jpg" },
  { id:"card_078", anime:"aot", name:"Reiner Braun", score:69, image:"/assets/catalog/cards/card_078.jpg" },
  { id:"card_079", anime:"aot", name:"Zeke Yeager", score:76, image:"/assets/catalog/cards/card_079.jpg" },
  { id:"card_080", anime:"aot", name:"Annie Leonhart", score:62, image:"/assets/catalog/cards/card_080.jpg" },
  { id:"card_081", anime:"aot", name:"Hange Zoe", score:45, image:"/assets/catalog/cards/card_081.jpg" },
  { id:"card_082", anime:"aot", name:"Jean Kirstein", score:31, image:"/assets/catalog/cards/card_082.jpg" },
  { id:"card_083", anime:"aot", name:"Pieck Finger", score:38, image:"/assets/catalog/cards/card_083.jpg" },
  { id:"card_084", anime:"aot", name:"Bertholdt Hoover", score:58, image:"/assets/catalog/cards/card_084.jpg" },
  { id:"card_085", anime:"demon", name:"Tanjiro Kamado", score:69, image:"/assets/catalog/cards/card_085.jpg" },
  { id:"card_086", anime:"demon", name:"Nezuko Kamado", score:58, image:"/assets/catalog/cards/card_086.jpg" },
  { id:"card_087", anime:"demon", name:"Zenitsu Agatsuma", score:45, image:"/assets/catalog/cards/card_087.jpg" },
  { id:"card_088", anime:"demon", name:"Inosuke Hashibira", score:48, image:"/assets/catalog/cards/card_088.jpg" },
  { id:"card_089", anime:"demon", name:"Giyu Tomioka", score:72, image:"/assets/catalog/cards/card_089.jpg" },
  { id:"card_090", anime:"demon", name:"Kyojuro Rengoku", score:79, image:"/assets/catalog/cards/card_090.jpg" },
  { id:"card_091", anime:"demon", name:"Tengen Uzui", score:65, image:"/assets/catalog/cards/card_091.jpg" },
  { id:"card_092", anime:"demon", name:"Muichiro Tokito", score:69, image:"/assets/catalog/cards/card_092.jpg" },
  { id:"card_093", anime:"demon", name:"Mitsuri Kanroji", score:55, image:"/assets/catalog/cards/card_093.jpg" },
  { id:"card_094", anime:"demon", name:"Akaza", score:86, image:"/assets/catalog/cards/card_094.jpg" },
  { id:"card_095", anime:"demon", name:"Doma", score:90, image:"/assets/catalog/cards/card_095.jpg" },
  { id:"card_096", anime:"demon", name:"Muzan Kibutsuji", score:97, image:"/assets/catalog/cards/card_096.jpg" },
  { id:"card_097", anime:"fma", name:"Edward Elric", score:76, image:"/assets/catalog/cards/card_097.jpg" },
  { id:"card_098", anime:"fma", name:"Alphonse Elric", score:65, image:"/assets/catalog/cards/card_098.jpg" },
  { id:"card_099", anime:"fma", name:"Roy Mustang", score:86, image:"/assets/catalog/cards/card_099.jpg" },
  { id:"card_100", anime:"fma", name:"Riza Hawkeye", score:52, image:"/assets/catalog/cards/card_100.jpg" },
  { id:"card_101", anime:"fma", name:"Scar", score:72, image:"/assets/catalog/cards/card_101.jpg" },
  { id:"card_102", anime:"fma", name:"King Bradley", score:93, image:"/assets/catalog/cards/card_102.jpg" },
  { id:"card_103", anime:"fma", name:"Van Hohenheim", score:83, image:"/assets/catalog/cards/card_103.jpg" },
  { id:"card_104", anime:"fma", name:"Winry Rockbell", score:24, image:"/assets/catalog/cards/card_104.jpg" },
  { id:"card_105", anime:"fma", name:"Izumi Curtis", score:69, image:"/assets/catalog/cards/card_105.jpg" },
  { id:"card_106", anime:"fma", name:"Greed", score:65, image:"/assets/catalog/cards/card_106.jpg" },
  { id:"card_107", anime:"fma", name:"Ling Yao", score:55, image:"/assets/catalog/cards/card_107.jpg" },
  { id:"card_108", anime:"fma", name:"Alex Louis Armstrong", score:48, image:"/assets/catalog/cards/card_108.jpg" },
  { id:"card_109", anime:"deathnote", name:"Light Yagami", score:86, image:"/assets/catalog/cards/card_109.jpg" },
  { id:"card_110", anime:"deathnote", name:"L Lawliet", score:90, image:"/assets/catalog/cards/card_110.jpg" },
  { id:"card_111", anime:"deathnote", name:"Ryuk", score:79, image:"/assets/catalog/cards/card_111.jpg" },
  { id:"card_112", anime:"deathnote", name:"Misa Amane", score:34, image:"/assets/catalog/cards/card_112.jpg" },
  { id:"card_113", anime:"deathnote", name:"Near", score:65, image:"/assets/catalog/cards/card_113.jpg" },
  { id:"card_114", anime:"deathnote", name:"Mello", score:52, image:"/assets/catalog/cards/card_114.jpg" },
  { id:"card_115", anime:"deathnote", name:"Soichiro Yagami", score:38, image:"/assets/catalog/cards/card_115.jpg" },
  { id:"card_116", anime:"deathnote", name:"Touta Matsuda", score:13, image:"/assets/catalog/cards/card_116.jpg" },
  { id:"card_117", anime:"deathnote", name:"Rem", score:69, image:"/assets/catalog/cards/card_117.jpg" },
  { id:"card_118", anime:"deathnote", name:"Teru Mikami", score:48, image:"/assets/catalog/cards/card_118.jpg" },
  { id:"card_119", anime:"deathnote", name:"Kiyomi Takada", score:27, image:"/assets/catalog/cards/card_119.jpg" },
  { id:"card_120", anime:"deathnote", name:"Watari", score:31, image:"/assets/catalog/cards/card_120.jpg" },
  { id:"card_121", anime:"codegeass", name:"Lelouch Lamperouge", score:93, image:"/assets/catalog/cards/card_121.jpg" },
  { id:"card_122", anime:"codegeass", name:"C.C.", score:76, image:"/assets/catalog/cards/card_122.jpg" },
  { id:"card_123", anime:"codegeass", name:"Suzaku Kururugi", score:72, image:"/assets/catalog/cards/card_123.jpg" },
  { id:"card_124", anime:"codegeass", name:"Kallen Stadtfeld", score:69, image:"/assets/catalog/cards/card_124.jpg" },
  { id:"card_125", anime:"codegeass", name:"Nunnally Lamperouge", score:24, image:"/assets/catalog/cards/card_125.jpg" },
  { id:"card_126", anime:"codegeass", name:"Shirley Fenette", score:17, image:"/assets/catalog/cards/card_126.jpg" },
  { id:"card_127", anime:"codegeass", name:"Rolo Lamperouge", score:48, image:"/assets/catalog/cards/card_127.jpg" },
  { id:"card_128", anime:"codegeass", name:"Euphemia li Britannia", score:38, image:"/assets/catalog/cards/card_128.jpg" },
  { id:"card_129", anime:"codegeass", name:"Schneizel el Britannia", score:79, image:"/assets/catalog/cards/card_129.jpg" },
  { id:"card_130", anime:"codegeass", name:"Jeremiah Gottwald", score:58, image:"/assets/catalog/cards/card_130.jpg" },
  { id:"card_131", anime:"codegeass", name:"Lloyd Asplund", score:31, image:"/assets/catalog/cards/card_131.jpg" },
  { id:"card_132", anime:"codegeass", name:"Charles zi Britannia", score:86, image:"/assets/catalog/cards/card_132.jpg" },
  { id:"card_133", anime:"frieren", name:"Frieren", score:86, image:"/assets/catalog/cards/card_133.jpg" },
  { id:"card_134", anime:"frieren", name:"Fern", score:62, image:"/assets/catalog/cards/card_134.jpg" },
  { id:"card_135", anime:"frieren", name:"Stark", score:55, image:"/assets/catalog/cards/card_135.jpg" },
  { id:"card_136", anime:"frieren", name:"Himmel", score:69, image:"/assets/catalog/cards/card_136.jpg" },
  { id:"card_137", anime:"frieren", name:"Heiter", score:41, image:"/assets/catalog/cards/card_137.jpg" },
  { id:"card_138", anime:"frieren", name:"Eisen", score:65, image:"/assets/catalog/cards/card_138.jpg" },
  { id:"card_139", anime:"frieren", name:"Flamme", score:90, image:"/assets/catalog/cards/card_139.jpg" },
  { id:"card_140", anime:"frieren", name:"Serie", score:97, image:"/assets/catalog/cards/card_140.jpg" },
  { id:"card_141", anime:"frieren", name:"Aura", score:72, image:"/assets/catalog/cards/card_141.jpg" },
  { id:"card_142", anime:"frieren", name:"Denken", score:52, image:"/assets/catalog/cards/card_142.jpg" },
  { id:"card_143", anime:"frieren", name:"Übel", score:58, image:"/assets/catalog/cards/card_143.jpg" },
  { id:"card_144", anime:"frieren", name:"Kraft", score:45, image:"/assets/catalog/cards/card_144.jpg" },
];

const CATALOG_STORAGE_KEY='animeDraft.catalog.v1';
const IMAGE_CACHE_KEY='animeDraft.imageCache.v1';
const ADMIN_KEY_STORAGE='animeDraft.adminKey.v1';
let catalogSyncing=false;
let backendBase='';

function backendUrl(path=''){
  const normalized=path&&path.startsWith('/')?path:(path?'/'+path:'');
  return backendBase?backendBase+normalized:normalized;
}

async function loadRuntimeConfig(){
  const localHost=['localhost','127.0.0.1'].includes(location.hostname);
  if(localHost)return false;
  try{
    const response=await fetch('/api/config',{cache:'no-store'});
    if(!response.ok)throw new Error('HTTP '+response.status);
    const config=await response.json();
    const candidate=String(config?.backendUrl||'').replace(/\/+$/,'');
    if(!/^https:\/\/[^\s]+$/i.test(candidate))throw new Error('BACKEND_URL non valida');
    backendBase=candidate;
    return true;
  }catch(error){
    console.warn('Backend realtime non configurato.',error);
    return false;
  }
}

async function verifyAdminAccess(key){
  try{
    const response=await fetch(backendUrl('/api/admin/verify'),{method:'POST',headers:key?{'X-Admin-Key':key}:{}});
    const contentType=response.headers.get('content-type')||'';
    if(!contentType.includes('application/json'))return {ok:false,error:'Backend Render da aggiornare: la verifica Admin non è ancora disponibile'};
    const data=await response.json().catch(()=>({}));
    return {ok:response.ok&&data?.ok,error:data?.error||'Verifica Admin non riuscita'};
  }catch(error){return {ok:false,error:'Server Admin non raggiungibile'}}
}

function requestAdminSecret(){
  return new Promise(resolve=>{
    const modal=mountAdminModal(`<div class="admin-modal-head"><div><h3>Area Admin</h3></div></div>
      <div class="admin-secret-input"><input id="adminSecretInput" type="password" autocomplete="current-password" aria-label="ADMIN_SECRET"></div>
      <div class="admin-modal-actions"><button class="secondary" id="cancelAdminAccess">ANNULLA</button><button class="primary" id="confirmAdminAccess">ACCEDI</button></div>`);
    const input=$('#adminSecretInput');
    let settled=false;
    const close=value=>{if(settled)return;settled=true;modal.remove();resolve(value)};
    $('#cancelAdminAccess').onclick=()=>close('');
    $('#confirmAdminAccess').onclick=()=>close(input.value.trim());
    input.onkeydown=event=>{if(event.key==='Enter'){event.preventDefault();close(input.value.trim())}if(event.key==='Escape')close('')};
    modal.addEventListener('click',event=>{if(event.target===modal)close('')});
  });
}

async function openAdmin(){
  let key='';try{key=sessionStorage.getItem(ADMIN_KEY_STORAGE)||''}catch{}
  let verified=key?await verifyAdminAccess(key):{ok:false};
  if(!verified.ok){
    try{sessionStorage.removeItem(ADMIN_KEY_STORAGE)}catch{}
    const entered=await requestAdminSecret();
    if(!entered)return;
    key=entered.trim();
    verified=await verifyAdminAccess(key);
    if(!verified.ok){toast(verified.error||'ADMIN_SECRET non valida');return}
    try{sessionStorage.setItem(ADMIN_KEY_STORAGE,key)}catch{}
  }
  state.screen='admin';render();
}

const cloneAnime=source=>Object.fromEntries(Object.entries(source).map(([key,value])=>[key,{...value}]));
const cloneRoster=source=>source.map(card=>({...card}));
let ANIME=cloneAnime(DEFAULT_ANIME);
let ROSTER=cloneRoster(DEFAULT_ROSTER);

function uid(prefix='id'){return `${prefix}_${Date.now().toString(36)}_${Math.random().toString(36).slice(2,7)}`}
function categoryCardCount(key){let n=0;for(const card of ROSTER)if(card.anime===key)n++;return n}
function slugify(value){return String(value||'categoria').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'')||'categoria'}
function uniqueCategoryKey(name){const base=slugify(name);let key=base,i=2;while(ANIME[key])key=`${base}-${i++}`;return key}
function loadCatalog(){
  try{
    const saved=JSON.parse(localStorage.getItem(CATALOG_STORAGE_KEY)||'null');
    if(saved?.anime&&saved?.roster&&Object.keys(saved.anime).length){
      ANIME=saved.anime;
      ROSTER=saved.roster.filter(card=>card&&ANIME[card.anime]).map(card=>({
        id:String(card.id||uid('card')),anime:String(card.anime),name:String(card.name||'Senza nome'),
        score:Math.max(10,Math.min(100,Number(card.score)||50)),image:card.image||null
      }));
    }
  }catch(error){console.warn('Catalogo locale non leggibile, uso i dati di default.',error)}
  try{
    const cache=JSON.parse(localStorage.getItem(IMAGE_CACHE_KEY)||'{}');
    ROSTER.forEach(card=>{if(!card.image&&cache[card.id])card.image=cache[card.id]});
  }catch(error){console.warn('Cache immagini non leggibile.',error)}
}
function applyCatalogData(catalog,{rerender=false}={}){
  if(!catalog?.anime||!catalog?.roster||!Object.keys(catalog.anime).length)return false;
  const previousSelection=[...(state?.settings?.universes||[])];
  ANIME=catalog.anime;
  ROSTER=catalog.roster.filter(card=>card&&ANIME[card.anime]).map(card=>({
    id:String(card.id||uid('card')),anime:String(card.anime),name:String(card.name||'Senza nome'),
    score:Math.max(10,Math.min(100,Number(card.score)||50)),image:card.image||null
  }));
  if(typeof state!=='undefined'){
    const keys=Object.keys(ANIME);
    state.settings.universes=previousSelection.filter(k=>ANIME[k]);
    if(!state.settings.universes.length)state.settings.universes=keys.slice(0,Math.min(4,keys.length));
    state.settings.randomUniverseCount=Math.min(Math.max(1,state.settings.randomUniverseCount||4),keys.length||1);
    if(!ANIME[state.admin.selectedCategory])state.admin.selectedCategory=keys[0]||null;
  }
  try{localStorage.setItem(CATALOG_STORAGE_KEY,JSON.stringify({anime:ANIME,roster:ROSTER}))}catch{}
  if(rerender&&typeof state!=='undefined'&&['home','create','admin','rules'].includes(state.screen))render();
  return true;
}
async function fetchCatalogFromServer({rerender=false,silent=true}={}){
  if(catalogSyncing)return false;
  catalogSyncing=true;
  try{
    const res=await fetch(backendUrl('/api/catalog'),{cache:'no-store'});
    if(!res.ok)throw new Error(`HTTP ${res.status}`);
    const data=await res.json();
    if(data?.catalog)applyCatalogData(data.catalog,{rerender});
    return true;
  }catch(error){
    console.warn('Catalogo server non disponibile, uso la cache locale.',error);
    if(!silent&&typeof toast==='function')toast('Catalogo online non raggiungibile: uso la cache locale');
    return false;
  }finally{catalogSyncing=false}
}
function cacheCatalog(){
  try{localStorage.setItem(CATALOG_STORAGE_KEY,JSON.stringify({anime:ANIME,roster:ROSTER}))}
  catch(error){console.warn('Cache catalogo non aggiornata.',error)}
}
function applyAdminResult(data,{rerender=false}={}){
  if(data?.catalog)applyCatalogData(data.catalog,{rerender:false});
  cacheCatalog();
  if(rerender&&state.screen==='admin')renderAdmin();
  return data;
}
async function adminApi(path,{method='POST',body}={}){
  const request=async key=>fetch(backendUrl(path),{method,headers:{'Content-Type':'application/json',...(key?{'X-Admin-Key':key}:{})},...(body!==undefined?{body:JSON.stringify(body)}:{})});
  let key='';try{key=sessionStorage.getItem(ADMIN_KEY_STORAGE)||''}catch{}
  let res=await request(key);
  if(res.status===401){
    const entered=prompt('Inserisci la chiave Admin per salvare le modifiche sul sito:');
    if(!entered)throw new Error('Salvataggio annullato');
    key=entered.trim();try{sessionStorage.setItem(ADMIN_KEY_STORAGE,key)}catch{}
    res=await request(key);
  }
  const data=await res.json().catch(()=>({}));
  if(!res.ok||!data?.ok)throw new Error(data?.error||'Operazione Admin non riuscita');
  return applyAdminResult(data);
}
function persistImageCache(){
  try{
    const cache={};ROSTER.forEach(card=>{if(card.image&&/^https?:/i.test(card.image))cache[card.id]=card.image});
    localStorage.setItem(IMAGE_CACHE_KEY,JSON.stringify(cache));
  }catch(error){console.warn('Cache immagini non salvata.',error)}
}

loadCatalog();


const PLAYER_COLORS=['#8b5cf6','#22c55e','#f59e0b','#ef4444','#06b6d4','#ec4899','#84cc16','#f97316'];

const state = {
  screen:'home',
  settings:{playerName:'Giocatore 1',players:4,teamSize:5,budget:100,timer:5,hiddenScore:true,synergies:false,mode:'all',randomUniverseCount:Math.min(4,Object.keys(ANIME).length),randomUniverseCountAuto:false,universes:Object.keys(ANIME)},
  players:[], deck:[], current:null, currentBid:0, leaderId:null, lastBidderId:null,
  passed:new Set(), timerLeft:5, timerHandle:null, round:0, paused:false,
  roomCode:'', apiLoaded:new Set(), gameOver:false, resolvedUniverses:[], resolvedRandomUniverseCount:0, unassignedCards:[], draftTotal:0,
  resolving:false, transitionHandle:null, admin:{selectedCategory:Object.keys(ANIME)[0]||null,cardEditorId:null},
  online:{socket:null,available:false,connected:false,mode:null,roomCode:'',playerId:null,token:null,isHost:false,pendingRoom:'',joining:false}
};

let lastBidVisualSignature='';

const $=s=>document.querySelector(s);
const app=$('#app');
const shuffle=a=>{const out=[...a];for(let i=out.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[out[i],out[j]]=[out[j],out[i]]}return out};
const initials=name=>name.split(/\s+/).filter(Boolean).map(x=>x[0]).slice(0,2).join('').toUpperCase()||'?';
const clamp=(n,a,b)=>Math.max(a,Math.min(b,n));
const esc=s=>String(s??'').replace(/[&<>'"]/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[m]));
function toast(msg){const t=$('#toast');t.textContent=msg;t.classList.add('show');setTimeout(()=>t.classList.remove('show'),1800)}
function roomCode(){return Math.random().toString(36).slice(2,7).toUpperCase()}
function playerColor(p){return p?.color||PLAYER_COLORS[p?.id||0]||PLAYER_COLORS[0]}

function shell(content,active='play'){
  const human=state.players.find(p=>p.human);
  const name=human?.name||state.settings.playerName||'Giocatore';
  const color=human?.color||PLAYER_COLORS[0];
  return `<div class="shell"><aside class="sidebar"><button class="brand brand-button" data-nav="home" aria-label="Torna alla Home"><span>ANIME</span>DRAFT</button><div class="nav">
    <button class="${active==='play'?'active':''}" data-nav="home"><i>◈</i>Gioca</button>
    <button data-nav="collection"><i>▦</i>Collezione</button>
    <button data-nav="ranking"><i>⌁</i>Classifica</button>
    <button data-nav="rules"><i>?</i>Come giocare</button>
    <button class="${active==='admin'?'active':''}" data-nav="admin"><i>⚙</i>Admin</button>
  </div><div class="profile"><span class="profile-dot" style="--pc:${color}"></span><div><b>${esc(name)}</b><small>${state.online.connected?'Online · realtime':'Riconnessione…'}</small></div></div></aside><section class="content">${content}</section></div>`;
}
function minimalShell(content){
  return `<div class="shell shell-minimal"><button class="brand brand-button brand-minimal" data-nav="home" aria-label="Torna alla Home"><span>ANIME</span>DRAFT</button><section class="content content-minimal">${content}</section></div>`;
}
function gameShell(content){
  const count=Math.max(1,state.players.length);
  return `<div class="shell shell-game"><aside class="game-player-rail"><button class="brand brand-button game-brand" data-nav="home" aria-label="Torna alla Home"><span>ANIME</span>DRAFT</button><div class="game-player-stack" id="auctionPlayers" data-party-size="${count}" style="--party-size:${count}">${state.players.map(podiumHTML).join('')}</div></aside><section class="content game-content">${content}</section></div>`;
}
function topbar(eyebrow,title,subtitle,right=''){return `<div class="topbar"><div><div class="eyebrow">${eyebrow}</div><h1 class="title">${title}</h1><p class="subtitle">${subtitle}</p></div>${right}</div>`}
function characterCard(c,{score=false,mini=false}={}){
  if(!c)return '';
  const a=ANIME[c.anime]||{};
  const image=c.image?`<img src="${esc(c.image)}" alt="${esc(c.name)}" ${mini?'loading="lazy"':'fetchpriority="high"'} decoding="async" onerror="this.style.display='none';this.nextElementSibling.style.display='grid'">`:'';
  return `<div class="character-card ${mini?'mini':''}" style="--accent:${a.accent||'#8b5cf6'}"><div class="card-media">${image}<div class="card-fallback" style="${c.image?'display:none':''}">${initials(c.name)}</div><div class="card-sheen"></div>${score?`<div class="card-score">${c.score}</div>`:''}<div class="card-copy"><div class="card-universe">${esc(a.name||c.anime)}</div><div class="card-name">${esc(c.name)}</div></div></div></div>`;
}
function universeLogo(key){const a=ANIME[key];if(!a)return '';const visual=a.logo?`<img src="${esc(a.logo)}" alt="${esc(a.name)} logo" loading="lazy" decoding="async" onerror="this.style.display='none';this.nextElementSibling.style.display='grid'"><i class="universe-logo-fallback" style="display:none">${initials(a.name)}</i>`:`<i class="universe-logo-fallback">${initials(a.name)}</i>`;return `<div class="universe-logo-plate">${visual}<span>${esc(a.name)}</span></div>`}

function render(){clearTimers();
  if(state.screen==='home') renderHome();
  else if(state.screen==='create') renderCreate();
  else if(state.screen==='join') renderJoinRoom();
  else if(state.screen==='lobby') renderLobby();
  else if(state.screen==='auction') renderAuction(true);
  else if(state.screen==='results') renderResults();
  else if(state.screen==='rules') renderRules();
  else if(state.screen==='admin') renderAdmin();
  bindGlobal();
}
function bindGlobal(){
  const navigateAway=screen=>{if(state.online.mode==='online'){leaveOnlineRoom();clearInviteFromUrl()}state.screen=screen;render()};
  document.querySelectorAll('[data-nav="home"]').forEach(b=>b.onclick=()=>navigateAway('home'));
  document.querySelectorAll('[data-nav="rules"]').forEach(b=>b.onclick=()=>navigateAway('rules'));
  document.querySelectorAll('[data-nav="admin"]').forEach(b=>b.onclick=()=>openAdmin());
  document.querySelectorAll('[data-nav="collection"],[data-nav="ranking"]').forEach(b=>b.onclick=()=>toast('Sezione prevista per una versione successiva'));
}

function renderHome(){
  const homeCards=[
    {src:'assets/home/naruto-card.webp',alt:'Carta Naruto Uzumaki'},
    {src:'assets/home/goku-card.jpg',alt:'Carta Son Goku'},
    {src:'assets/home/luffy-card.png',alt:'Carta Monkey D. Luffy'}
  ];
  app.innerHTML=`<div class="home-v7 home-v8 home-v16">
    <main class="home-hero-v7 home-hero-v8 home-hero-v16">
      <section class="home-copy-v7 home-copy-v16">
        <div class="eyebrow home-eyebrow-v7 home-eyebrow-v16">Anime auction party game</div>
        <h1><span>ANIME</span><strong>DRAFT</strong></h1>
        <div class="home-rule-v7"></div>
        <p>Costruisci la tua squadra ideale di 5 personaggi e gestisci il budget durante l'asta.<br>Strategia, intuito e tempismo faranno la differenza.</p>
        <div class="home-actions-v7">
          <button class="primary home-primary-v7" id="newGame">CREA PARTITA</button>
        </div>
      </section>

      <section class="home-art-v7 home-art-v16" aria-label="Carte personaggio in evidenza">
        <div class="home-glow-v7"></div>
        <div class="home-platform-v7"></div>
        ${homeCards.map((card,i)=>`<div class="home-showcase-card-v7 card-${i+1}"><div class="character-card home-static-character" style="--accent:${['#f7c95c','#f6bd3e','#d85b48'][i]}"><div class="card-media"><img class="home-static-art" src="${card.src}" alt="${card.alt}" width="600" height="900" ${i===1?'fetchpriority="high"':''} decoding="async"><div class="card-sheen"></div></div></div></div>`).join('')}
      </section>
    </main><button class="home-admin-fab" id="homeAdmin" aria-label="Apri pannello Admin">⚙ <span>ADMIN</span></button>
  </div>`;
  bindGlobal();
  $('#newGame').onclick=()=>{state.screen='create';render()};
  $('#homeAdmin').onclick=()=>openAdmin();
}

function draftCardCount(){return state.settings.players*state.settings.teamSize}
function minRandomUniverses(){const counts=Object.keys(ANIME).map(categoryCardCount).sort((a,b)=>a-b);let total=0;for(let i=0;i<counts.length;i++){total+=counts[i];if(total>=draftCardCount())return i+1}return counts.length}
function resolvedUniverseKeys(){
  const s=state.settings,keys=Object.keys(ANIME);
  if(s.mode==='all')return keys;
  if(s.mode==='random'){
    const min=minRandomUniverses();
    const count=s.randomUniverseCountAuto
      ? Math.floor(Math.random()*(keys.length-min+1))+min
      : clamp(s.randomUniverseCount,min,keys.length);
    state.resolvedRandomUniverseCount=count;
    return shuffle(keys).slice(0,count);
  }
  state.resolvedRandomUniverseCount=0;
  return [...s.universes];
}
function renderCreate(){
  const s=state.settings;
  const randomMode=s.mode==='random',customMode=s.mode==='custom',allMode=s.mode==='all';
  const minRandom=minRandomUniverses();if(randomMode&&!s.randomUniverseCountAuto&&s.randomUniverseCount<minRandom)s.randomUniverseCount=minRandom;
  const universeCards=Object.entries(ANIME).map(([key,a])=>{
    const selected=allMode||(customMode&&s.universes.includes(key));
    const hidden=randomMode;
    const logo=a.logo?`<img src="${esc(a.logo)}" alt="${esc(a.name)} logo" loading="lazy" decoding="async" onerror="this.style.display='none';this.nextElementSibling.style.display='grid'"><i class="universe-logo-fallback" style="display:none">${initials(a.name)}</i>`:`<i class="universe-logo-fallback">${initials(a.name)}</i>`;
    return `<button class="universe-square ${selected?'selected':''} ${hidden?'random-locked':''}" data-universe="${key}" style="--accent:${a.accent}" ${customMode?'':'disabled'} aria-pressed="${selected}">
      <span class="universe-check">✓</span><div class="universe-square-logo">${logo}<span>${esc(a.name)}</span></div><div class="universe-square-meta"><b>${esc(a.name)}</b><small>${categoryCardCount(key)} personaggi</small></div>
    </button>`;
  }).join('');
  const selectionLabel=randomMode?(s.randomUniverseCountAuto?'Numero universi casuale':`${s.randomUniverseCount} universi casuali`):allMode?`${Object.keys(ANIME).length} universi`:customMode?`${s.universes.length} selezionati`:'—';
  app.innerHTML=minimalShell(`${topbar('Configura la partita','Crea stanza','Tre passaggi chiari: scegli chi sei, imposta la partita e definisci gli universi del draft.')}
  <div class="create-stack create-stack-v5">
    <section class="glass setup-panel identity-panel-v4 setup-centered-v5"><div class="setup-step">01</div><div class="setup-copy"><div class="eyebrow">Profilo giocatore</div><h3>Come vuoi chiamarti?</h3><p>Il nome e il colore viola ti identificheranno in lobby, asta e classifica.</p></div><div class="identity-entry"><div class="identity-icon" style="--pc:${PLAYER_COLORS[0]}">${initials(s.playerName)}</div><div class="name-field"><label for="playerName">NOME GIOCATORE</label><input id="playerName" maxlength="18" value="${esc(s.playerName)}" placeholder="Inserisci il tuo nome"></div></div></section>

    <section class="glass setup-panel match-panel-v4 setup-centered-v5"><div class="setup-step">02</div><div class="setup-copy"><div class="eyebrow">Impostazioni partita</div><h3>Formato del draft</h3><p>Il numero di carte è automatico: 5 carte per ogni partecipante. Nessuno può aspettare da solo le carte migliori.</p></div>
      <div class="match-settings-grid">
        <div class="field players-field"><label>GIOCATORI <span>${s.players}</span></label><div class="segmented">${[2,3,4,5,6,7,8].map(n=>`<button data-players="${n}" class="${s.players===n?'selected':''}">${n}</button>`).join('')}</div></div>
        <div class="field"><label>BUDGET</label><select id="budget"><option value="50" ${s.budget===50?'selected':''}>50 crediti</option><option value="100" ${s.budget===100?'selected':''}>100 crediti</option><option value="150" ${s.budget===150?'selected':''}>150 crediti</option><option value="200" ${s.budget===200?'selected':''}>200 crediti</option></select></div>
        <div class="field"><label>TIMER ASTA</label><select id="timer"><option value="4" ${s.timer===4?'selected':''}>4 secondi</option><option value="5" ${s.timer===5?'selected':''}>5 secondi</option><option value="7" ${s.timer===7?'selected':''}>7 secondi</option><option value="10" ${s.timer===10?'selected':''}>10 secondi</option></select></div>
        <div class="field"><label>PUNTEGGIO</label><select id="scoreMode"><option value="hidden" ${s.hiddenScore?'selected':''}>Standard · nascosto</option><option value="visible" ${!s.hiddenScore?'selected':''}>Casual · visibile</option></select></div>
        <div class="field synergy-field-v6"><label>OPZIONI</label><label class="synergy-check-v6" for="synToggle"><input type="checkbox" id="synToggle" ${s.synergies?'checked':''}><span class="synergy-box-v6">✓</span><span class="synergy-copy-v6"><b>SINERGIE</b><small>Bonus squadra</small></span></label></div>
      </div>
    </section>

    <section class="glass setup-panel universe-panel-v4 setup-centered-v5"><div class="setup-step">03</div><div class="setup-copy"><div class="eyebrow">Universi anime</div><h3>Da dove arrivano i personaggi?</h3><p>Scegli tutti gli universi, costruisci il tuo mix oppure lascia che sia il gioco a pescarli in segreto.</p></div>
      <div class="universe-mode-grid">
        <button class="mode-card ${allMode?'selected':''}" data-mode="all"><span class="mode-radio"></span><div><b>TUTTI</b><small>Usa tutti gli universi disponibili</small></div></button>
        <button class="mode-card ${customMode?'selected':''}" data-mode="custom"><span class="mode-radio"></span><div><b>CUSTOM</b><small>Scegli manualmente i tuoi universi</small></div></button>
        <button class="mode-card ${randomMode?'selected':''}" data-mode="random"><span class="mode-radio"></span><div><b>RANDOM</b><small>Il gioco sceglie senza mostrarteli</small></div></button>
      </div>
      ${randomMode?`<div class="random-config random-config-v5"><div><span>NUMERO DI UNIVERSI</span><b>${s.randomUniverseCountAuto?'CASUALE':s.randomUniverseCount}</b><small>${s.randomUniverseCountAuto?'Anche il numero di universi verrà estratto dal gioco':`Selezione segreta · minimo ${minRandom} con ${s.players} giocatori`}</small></div><div class="random-count-buttons random-count-buttons-v5"><button class="shuffle-count ${s.randomUniverseCountAuto?'selected':''}" id="randomCountAuto" title="Numero casuale di universi" aria-label="Numero casuale di universi"><span>⇄</span></button>${Array.from({length:Object.keys(ANIME).length-minRandom+1},(_,i)=>i+minRandom).map(n=>`<button data-random-count="${n}" class="${!s.randomUniverseCountAuto&&s.randomUniverseCount===n?'selected':''}">${n}</button>`).join('')}</div></div>`:''}
      <div class="universe-section-head"><div><b>${randomMode?'Pool nascosto':'Universi disponibili'}</b><small>${randomMode?'Le scelte manuali sono bloccate in modalità Random':selectionLabel}</small></div>${customMode?`<div class="bulk-actions"><button class="secondary small" id="selectAll">SELEZIONA TUTTO</button><button class="secondary small" id="clearAll">DESELEZIONA TUTTO</button></div>`:''}</div>
      <div class="universe-square-grid ${randomMode?'is-random':''}">${universeCards}</div>
      <div class="pool-footer-v4"><div><span>POOL</span><b>${selectionLabel}</b></div><div><span>DRAFT</span><b>${draftCardCount()} carte totali</b></div><div class="grow"></div><button class="primary large" id="createRoom">CREA STANZA</button></div>
    </section>
  </div>`);

  $('#playerName').oninput=e=>{s.playerName=e.target.value.slice(0,18);const icon=document.querySelector('.identity-icon');if(icon)icon.textContent=initials(s.playerName)};
  document.querySelectorAll('[data-players]').forEach(b=>b.onclick=()=>{s.players=+b.dataset.players;renderCreate();bindGlobal()});
  document.querySelectorAll('[data-mode]').forEach(b=>b.onclick=()=>{
    const mode=b.dataset.mode;s.mode=mode;
    if(mode==='all')s.universes=Object.keys(ANIME);
    if(mode==='custom')s.universes=[];
    if(mode==='random'){s.universes=[];if(!s.randomUniverseCountAuto)s.randomUniverseCount=Math.max(s.randomUniverseCount,minRandomUniverses())}
    renderCreate();bindGlobal();
  });
  document.querySelectorAll('[data-random-count]').forEach(b=>b.onclick=()=>{s.randomUniverseCountAuto=false;s.randomUniverseCount=+b.dataset.randomCount;renderCreate();bindGlobal()});
  if($('#randomCountAuto'))$('#randomCountAuto').onclick=()=>{s.randomUniverseCountAuto=true;renderCreate();bindGlobal()};
  document.querySelectorAll('[data-universe]').forEach(b=>b.onclick=()=>{if(s.mode!=='custom')return;const k=b.dataset.universe;s.universes=s.universes.includes(k)?s.universes.filter(x=>x!==k):[...s.universes,k];renderCreate();bindGlobal()});
  if($('#selectAll'))$('#selectAll').onclick=()=>{s.universes=Object.keys(ANIME);renderCreate();bindGlobal()};
  if($('#clearAll'))$('#clearAll').onclick=()=>{s.universes=[];renderCreate();bindGlobal()};
  $('#budget').onchange=e=>s.budget=+e.target.value;
  $('#timer').onchange=e=>s.timer=+e.target.value;
  $('#scoreMode').onchange=e=>s.hiddenScore=e.target.value==='hidden';
  $('#synToggle').onchange=e=>{s.synergies=e.target.checked};
  $('#createRoom').onclick=async()=>{
    s.playerName=s.playerName.trim();
    if(!s.playerName)return toast('Inserisci il tuo nome');
    const resolved=resolvedUniverseKeys();
    if(!resolved.length)return toast('In modalità Custom seleziona almeno un universo');
    const needed=draftCardCount();
    const pool=ROSTER.filter(c=>resolved.includes(c.anime)).length;
    if(pool<needed)return toast(`Servono almeno ${needed} personaggi: aumenta gli universi del pool`);
    state.resolvedUniverses=resolved;
    await hydrateImages(resolved);
    if(state.online.connected){await createOnlineRoom(resolved);return}
    toast('Server realtime non disponibile: riprova quando la connessione sarà attiva');
  };
}

function inviteUrl(code=state.roomCode){
  if(!code)return '';
  try{const url=new URL(window.location.href);url.search='';url.hash='';url.searchParams.set('room',code);return url.toString()}catch{return `${window.location.origin}/?room=${code}`}
}
function clearInviteFromUrl(){
  try{const url=new URL(window.location.href);url.searchParams.delete('room');history.replaceState({},'',url.pathname+url.search+url.hash)}catch{}
}
function renderJoinRoom(){
  const code=(state.online.pendingRoom||new URLSearchParams(location.search).get('room')||'').toUpperCase();
  app.innerHTML=minimalShell(`${topbar('Invito multiplayer','Entra nella stanza',code?`Sei stato invitato nella stanza ${esc(code)}. Scegli il tuo nome e collegati in realtime.`:'Inserisci il codice stanza ricevuto da un amico.',`<span class="pill online-pill ${state.online.connected?'connected':''}">${state.online.connected?'● ONLINE':'○ CONNESSIONE…'}</span>`)}
    <div class="join-wrap"><section class="glass join-card"><div class="join-icon">↗</div><div class="eyebrow">Multiplayer realtime</div><h2>Unisciti al draft</h2><p>Una volta entrato vedrai in tempo reale giocatori, puntate, timer e assegnazioni delle carte.</p><div class="join-fields"><label>CODICE STANZA<input id="joinRoomCode" maxlength="6" value="${esc(code)}" placeholder="ABCDE"></label><label>NOME GIOCATORE<input id="joinPlayerName" maxlength="18" value="${esc(state.settings.playerName)}" placeholder="Il tuo nome"></label></div><div class="join-status"><span class="status-dot ${state.online.connected?'ok':''}"></span>${state.online.connected?'Server realtime connesso':'Connessione al server in corso…'}</div><div class="actions centered-actions"><button class="secondary" id="cancelJoin">TORNA ALLA HOME</button><button class="primary" id="joinRoomBtn" ${state.online.connected?'':'disabled'}>ENTRA NELLA STANZA</button></div></section></div>`);
  bindGlobal();
  $('#cancelJoin').onclick=()=>{clearInviteFromUrl();state.online.pendingRoom='';state.screen='home';render()};
  $('#joinRoomCode').oninput=e=>e.target.value=e.target.value.toUpperCase().replace(/[^A-Z0-9]/g,'').slice(0,6);
  $('#joinPlayerName').oninput=e=>state.settings.playerName=e.target.value.slice(0,18);
  $('#joinRoomBtn').onclick=async()=>{const room=$('#joinRoomCode').value.trim().toUpperCase(),name=$('#joinPlayerName').value.trim();if(!room)return toast('Inserisci il codice stanza');if(!name)return toast('Inserisci il tuo nome');state.settings.playerName=name;await joinOnlineRoom(room,name)};
}
function playerRow(p){
  const role=p.human?'TU':p.host?'HOST':'ONLINE';
  const sub=p.connected===false?'Disconnesso temporaneamente':p.host?'Host della stanza':'Giocatore online';
  return `<div class="player-row color-player ${p.connected===false?'offline-player':''}" style="--pc:${p.color}"><div class="avatar">${initials(p.name)}</div><div class="grow"><b>${esc(p.name)}</b><small>${sub}</small></div><span class="color-chip"><i></i>${role}</span><span class="ready">${p.connected===false?'OFFLINE':'PRONTO'}</span></div>`
}
function renderLobby(){
  const randomLabel=state.settings.randomUniverseCountAuto
    ? 'Numero di universi casuale'
    : `${state.resolvedRandomUniverseCount||state.settings.randomUniverseCount} universi casuali`;
  const online=true;
  const invite=inviteUrl(state.roomCode);
  const humanCount=state.players.length;
  const target=state.settings.players;
  const host=state.online.isHost;
  const universesKnown=state.settings.mode!=='random';
  app.innerHTML=minimalShell(`${topbar('Stanza '+state.roomCode,'Lobby pronta',online?'La stanza è online: condividi il link e gli amici compariranno qui in tempo reale.':'Modalità di test locale.',`<span class="pill online-pill ${online&&state.online.connected?'connected':''}">${online?'● REALTIME':'LOCALE'} · ${state.roomCode}</span>`)}
  <div class="lobby-grid lobby-stack-v5">
    ${online?`<div class="glass invite-panel"><div class="invite-copy"><div class="eyebrow">Invita gli amici</div><h3>Condividi questo link</h3><p>Chi lo apre entra direttamente nel flusso della stanza <b>${state.roomCode}</b>.</p></div><div class="invite-link-row"><div class="invite-link" id="inviteLinkText">${esc(invite)}</div><button class="primary" id="copyInvite">COPIA LINK</button>${navigator.share?'<button class="secondary icon-share" id="shareInvite" title="Condividi">↗</button>':''}</div><small class="invite-note">${humanCount}/${target} posti occupati · condividi il link per invitare gli altri giocatori.</small></div>`:''}
    <div class="glass lobby-panel-v5"><div class="panel-title-row centered-title-v5"><div><div class="eyebrow">Partecipanti</div><h3>Giocatori · ${humanCount}/${target}</h3><p class="panel-note-v5">Ogni giocatore mantiene il proprio colore per tutta la partita.</p></div></div><div class="players-list lobby-players-v5">${state.players.map(playerRow).join('')}${online?Array.from({length:Math.max(0,target-state.players.length)},(_,i)=>`<div class="player-row waiting-slot"><div class="avatar">+</div><div class="grow"><b>Posto libero</b><small>In attesa di un amico</small></div><span class="ready waiting">ATTESA</span></div>`).join(''):''}</div></div>
    <div class="glass lobby-settings lobby-panel-v5"><div class="centered-title-v5"><div class="eyebrow">Riepilogo</div><h3>Impostazioni partita</h3><p class="panel-note-v5">Il draft userà ${draftCardCount()} carte totali.</p></div><div class="summary-grid summary-grid-v5"><div><span>GIOCATORI</span><b>${state.settings.players}</b></div><div><span>BUDGET</span><b>${state.settings.budget}</b></div><div><span>TEAM</span><b>${state.settings.teamSize}</b></div><div><span>TIMER</span><b>${state.settings.timer}s</b></div><div><span>CARTE</span><b>${draftCardCount()}</b></div></div>${state.settings.mode==='random'?`<div class="random-lobby-secret random-lobby-secret-v5"><span>⇄</span><div><b>${randomLabel}</b><small>Il pool resta nascosto: scoprirai gli universi solo quando compariranno le carte.</small></div></div>`:universesKnown?`<div class="universe-square-grid lobby-universe-grid">${state.resolvedUniverses.map(k=>{const a=ANIME[k];if(!a)return '';const logo=a.logo?`<img src="${esc(a.logo)}" alt="${esc(a.name)} logo" loading="lazy" decoding="async" onerror="this.style.display='none';this.nextElementSibling.style.display='grid'"><i class="universe-logo-fallback" style="display:none">${initials(a.name)}</i>`:`<i class="universe-logo-fallback">${initials(a.name)}</i>`;return `<div class="universe-square selected lobby-universe-square"><span class="universe-check">✓</span><div class="universe-square-logo">${logo}<span>${esc(a.name)}</span></div><div class="universe-square-meta"><b>${esc(a.name)}</b><small>${categoryCardCount(k)} personaggi</small></div></div>`}).join('')}</div>`:''}<p class="muted lobby-score-note"><b>Punteggio:</b> ${state.settings.hiddenScore?'nascosto durante l’asta':'visibile durante l’asta'}</p><div class="actions lobby-actions-v5"><button class="secondary" id="backConfig">${online?'ESCI':'INDIETRO'}</button>${host?`<button class="primary" id="startGame">INIZIA DRAFT</button>`:`<button class="primary waiting-host" disabled>IN ATTESA DELL'HOST</button>`}</div></div>
  </div>`);
  if($('#copyInvite'))$('#copyInvite').onclick=async()=>{try{await navigator.clipboard.writeText(invite);toast('Link di invito copiato')}catch{const el=$('#inviteLinkText');const r=document.createRange();r.selectNode(el);getSelection().removeAllRanges();getSelection().addRange(r);document.execCommand('copy');getSelection().removeAllRanges();toast('Link copiato')}};
  if($('#shareInvite'))$('#shareInvite').onclick=()=>navigator.share({title:'Anime Draft',text:`Unisciti alla mia stanza ${state.roomCode}`,url:invite}).catch(()=>{});
  $('#backConfig').onclick=()=>{if(online){leaveOnlineRoom();clearInviteFromUrl();state.screen='home';render()}else{state.screen='create';render()}};
  if($('#startGame'))$('#startGame').onclick=()=>startGame();
}
async function startGame(){
  if(!state.online.isHost)return toast('Solo l’host può avviare il draft');
  const result=await emitAck('room:start',{roomCode:state.roomCode});
  if(!result?.ok)toast(result?.error||'Impossibile avviare il draft');
}
function eligiblePlayers(){return state.players.filter(p=>p.team.length<state.settings.teamSize)}
function remainingOpenSlots(){return state.players.reduce((n,p)=>n+Math.max(0,state.settings.teamSize-p.team.length),0)}
function randomFillRemaining(reason='fine-pool'){
  clearTimers();
  const cards=shuffle([...state.unassignedCards,...state.deck]);
  const slots=shuffle(state.players.flatMap(p=>Array.from({length:Math.max(0,state.settings.teamSize-p.team.length)},()=>p)));
  const total=Math.min(cards.length,slots.length);
  for(let i=0;i<total;i++){
    const p=slots[i],c=cards[i];p.team.push(c);p.budget=Math.max(0,p.budget-1);
  }
  state.deck=[];state.unassignedCards=[];
  const label=reason==='single-player'?'Ultimo giocatore incompleto: carte residue assegnate casualmente a 1 credito.':'Carte senza acquirente assegnate casualmente a 1 credito.';
  toast(label);state.transitionHandle=setTimeout(()=>finishGame(),1050);
}
function nextAuction(){
  state.resolving=false;
  const active=eligiblePlayers();
  if(!active.length){finishGame();return}
  if(active.length===1){randomFillRemaining('single-player');return}
  if(!state.deck.length){randomFillRemaining('fine-pool');return}
  state.current=state.deck.shift();state.currentBid=0;state.leaderId=null;state.lastBidderId=null;
  state.players.forEach(p=>p.lastBid=0);
  state.passed=new Set(state.players.filter(p=>p.team.length>=state.settings.teamSize).map(p=>p.id));
  state.timerLeft=state.settings.timer;state.round++;renderAuction(true);startAuctionTimers();
}

function renderAuction(full=false){
  if(full){
    const p=state.players.find(x=>x.human);
    app.innerHTML=gameShell(`${topbar('Live draft',`Asta ${state.round}`,`${ANIME[state.current.anime].name} · ${state.current.name}`,`<span class="pill auction-round-pill">${state.round}/${state.draftTotal}</span>`)}
    <div class="auction-layout-v5">
      <section class="glass quiz-stage quiz-stage-v5">
        <div class="quiz-topline quiz-topline-v5 quiz-topline-v7">
          <div class="round-badge"><span>ROUND</span><b>${state.round}</b></div>
          <div class="leader-showcase leader-showcase-v5" id="leaderShowcase"><div class="showcase-label">STA VINCENDO</div><div class="showcase-main"><span class="showcase-dot"></span><strong id="leaderName">NESSUNO</strong><b id="leaderAmount">—</b></div><small id="leaderBidLabel">La prima puntata apre l'asta</small></div>
          <div class="timer-tv" id="timerRing"><span>TEMPO</span><b id="timerText">${state.timerLeft}</b><small>secondi</small></div>
        </div>

        <div class="auction-center-v5">
          <div class="auction-card-zone auction-card-zone-v5"><div id="currentStamp" class="auction-card-modern auction-card-modern-v5">${characterCard(state.current,{score:!state.settings.hiddenScore})}</div></div>

          <div class="bid-deck-v5 bid-deck-v7">
            <div class="bid-focus-v7">
              <div class="current-bid-v7"><span>PUNTATA ATTUALE</span><div><b id="bidValue">${state.currentBid||1}</b><em>CR</em></div><small id="nextBidValue">Prossima: 1</small></div>
              <div class="budget-card-v6 budget-card-v7 budget-card-v8"><span>SALDO</span><div class="budget-value-v6 budget-value-v8"><b id="myBudget">${p.budget}</b><em>CR</em></div></div>
            </div>
            <div class="bid-actions tv-actions tv-actions-v5 tv-actions-v7"><button class="bid-btn bid1" id="bid1"><small>RILANCIA</small><strong>+1</strong></button><button class="bid-btn bid5" id="bid5"><small>RILANCIA</small><strong>+5</strong></button><button class="bid-btn pass" id="pass"><small>ESCI DAL ROUND</small><strong>PASSA</strong></button></div><div class="auction-hint" id="auctionHint"></div>
          </div>
        </div>

      </section>
      <aside class="glass team-panel team-panel-v3 team-panel-v5"><div class="panel-head"><div><div class="eyebrow">${esc(p.name)}</div><h3>La tua squadra</h3></div><span class="team-count"><b id="myTeamCount">${p.team.length}</b>/${state.settings.teamSize}</span></div><div class="team-slots team-slots-v5" id="myTeam">${teamSlots(p)}</div></aside>
    </div>`);
    bindGlobal();$('#bid1').onclick=()=>humanBid(1);$('#bid5').onclick=()=>humanBid(5);$('#pass').onclick=()=>humanPass();
  }
  updateAuctionDOM();
}
function teamSlots(p){return Array.from({length:state.settings.teamSize},(_,i)=>p.team[i]?`<div class="team-mini">${characterCard(p.team[i],{mini:true})}</div>`:`<div class="team-mini empty"><span>${i+1}</span><b>VUOTO</b></div>`).join('')}
function podiumHTML(p,flashPlayerId=null){
  const leading=state.leaderId===p.id,latest=state.lastBidderId===p.id,passed=state.passed.has(p.id),flash=flashPlayerId===p.id;
  return `<div class="podium ${leading?'leading':''} ${latest?'latest-bid':''} ${flash?'bid-flash':''} ${passed?'passed':''}" style="--pc:${p.color}"><div class="avatar">${initials(p.name)}</div><div class="podium-info"><div class="podium-name-row"><b>${esc(p.name)}</b>${p.human?'<span class="you-chip">TU</span>':''}${leading?'<span class="leader-chip">IN TESTA</span>':''}</div><small><span class="player-metric"><i>▣</i><strong>${p.team.length}/${state.settings.teamSize}</strong><span>carte</span></span><span class="player-metric"><i>◎</i><strong>${p.budget}</strong><span>crediti</span></span></small></div></div>`;
}
function updateAuctionDOM(){
  if(state.screen!=='auction')return;
  const human=state.players.find(p=>p.human),leader=state.players.find(p=>p.id===state.leaderId);
  const bidVisualSignature=`${state.round}|${state.current?.id||''}|${state.currentBid}|${state.lastBidderId??''}`;
  let flashPlayerId=null;
  if(!lastBidVisualSignature)lastBidVisualSignature=bidVisualSignature;
  else if(bidVisualSignature!==lastBidVisualSignature){
    if(state.currentBid>0&&state.lastBidderId!==null)flashPlayerId=state.lastBidderId;
    lastBidVisualSignature=bidVisualSignature;
  }
  const players=$('#auctionPlayers');if(players)players.innerHTML=state.players.map(p=>podiumHTML(p,flashPlayerId)).join('');
  if($('#bidValue'))$('#bidValue').textContent=state.currentBid||1;
  if($('#topBidValue'))$('#topBidValue').textContent=state.currentBid||1;
  if($('#leaderName'))$('#leaderName').textContent=leader?leader.name.toUpperCase():'NESSUNO';
  if($('#leaderAmount'))$('#leaderAmount').textContent=leader?`${state.currentBid} CR`:'—';
  if($('#leaderBidLabel'))$('#leaderBidLabel').textContent=leader?'Se il timer arriva a zero, la carta è sua':'La prima puntata apre l\'asta';
  if($('#leaderShowcase')){$('#leaderShowcase').style.setProperty('--pc',leader?leader.color:'#8b5cf6');$('#leaderShowcase').classList.toggle('has-leader',!!leader)}
  if($('#myBidValue'))$('#myBidValue').textContent=human.lastBid||'—';
  if($('#myBidState')){
    if(state.passed.has(human.id))$('#myBidState').textContent='Hai passato questo round';
    else if(state.leaderId===human.id)$('#myBidState').textContent='SEI IN TESTA';
    else if(human.lastBid)$('#myBidState').textContent='La tua offerta è stata superata';
    else $('#myBidState').textContent='Non hai ancora puntato';
  }
  if($('#myBudget'))$('#myBudget').textContent=human.budget;
  if($('#myTeamCount'))$('#myTeamCount').textContent=human.team.length;
  const min=state.currentBid?state.currentBid+1:1,reserve=Math.max(0,state.settings.teamSize-human.team.length-1),maxBid=human.budget-reserve;
  if($('#nextBidValue'))$('#nextBidValue').textContent=`Prossima: ${min}`;
  const blocked=state.paused||state.passed.has(human.id)||human.team.length>=state.settings.teamSize;
  if($('#bid1')){$('#bid1').disabled=blocked||min>maxBid;$('#bid5').disabled=blocked||(state.currentBid?state.currentBid+5:5)>maxBid;$('#pass').disabled=blocked}
  if($('#auctionHint'))$('#auctionHint').textContent=state.paused?'Asta in pausa: in attesa della riconnessione di un giocatore.':state.passed.has(human.id)?'Hai passato: ora puoi seguire il duello tra gli altri giocatori.':state.leaderId===human.id?'Sei in testa: difendi l’offerta fino allo zero.':'';
  updateAuctionTimerDOM();
}
function humanBid(step){emitAck('auction:bid',{roomCode:state.roomCode,step}).then(r=>{if(!r?.ok&&r?.error)toast(r.error)})}
function humanPass(){emitAck('auction:pass',{roomCode:state.roomCode}).then(r=>{if(!r?.ok&&r?.error)toast(r.error)})}
function maxAllowed(p){const remainingSlots=state.settings.teamSize-p.team.length;return p.budget-Math.max(0,remainingSlots-1)}
function placeBid(p,amount){
  if(state.passed.has(p.id)||p.team.length>=state.settings.teamSize)return false;
  if(amount<=state.currentBid||amount>maxAllowed(p))return false;
  state.currentBid=amount;state.leaderId=p.id;state.lastBidderId=p.id;p.lastBid=amount;state.timerLeft=state.settings.timer;updateAuctionDOM();return true;
}
function updateAuctionTimerDOM(){
  if(state.screen!=='auction')return;
  const ring=$('#timerRing'),text=$('#timerText');
  if(text)text.textContent=state.timerLeft;
  if(ring){ring.style.setProperty('--progress',`${(state.timerLeft/state.settings.timer)*100}%`);ring.classList.toggle('urgent',state.timerLeft<=2)}
}
function clearTimers(){if(state.timerHandle)clearInterval(state.timerHandle);if(state.transitionHandle)clearTimeout(state.transitionHandle);state.timerHandle=null;state.transitionHandle=null}
function checkEarlyEnd(){const eligible=eligiblePlayers().filter(p=>!state.passed.has(p.id));if(state.leaderId!==null&&eligible.length===1&&eligible[0].id===state.leaderId)resolveAuction();else if(state.leaderId===null&&eligible.length===0)resolveAuction()}
function resolveAuction(){if(state.resolving)return;state.resolving=true;clearTimers();if(state.leaderId!==null){const w=state.players.find(p=>p.id===state.leaderId);w.budget-=state.currentBid;w.team.push(state.current);toast(`${state.current.name} → ${w.name} per ${state.currentBid} crediti`)}else{state.unassignedCards.push(state.current);toast(`${state.current.name} resta nel pool casuale`)}state.transitionHandle=setTimeout(()=>nextAuction(),900)}
function finishGame(){clearTimers();state.players.forEach(p=>{const base=p.team.reduce((s,c)=>s+c.score,0);let bonus=0;if(state.settings.synergies){const counts={};p.team.forEach(c=>counts[c.anime]=(counts[c.anime]||0)+1);bonus=Object.values(counts).reduce((b,n)=>b+(n>=3?8:0),0)}p.score=base+bonus});state.players.sort((a,b)=>b.score-a.score);state.screen='results';render()}
function renderResults(){
  const winner=state.players[0];
  app.innerHTML=shell(`${topbar('Draft completato','Risultati finali',`Vincitore: ${esc(winner.name)} con ${winner.score} punti. Ora tutti i valori vengono rivelati.`,`<span class="pill online-pill connected">● REALTIME · ${state.round} aste</span>`)}<div class="results-grid">${state.players.map((p,i)=>`<article class="result-card ${i===0?'winner':''}" style="--pc:${p.color}"><div class="result-head"><div class="rank-block"><div class="rank">${i+1}°</div><span class="result-color"></span><h3>${esc(p.name)}</h3></div><div class="result-score">${p.score}<small> PT</small></div></div><div class="result-team">${p.team.map(c=>characterCard(c,{score:true,mini:true})).join('')}</div><div class="score-strip">${p.team.map(c=>`<span class="score-chip">${esc(c.name.split(' ')[0])} · ${c.score}</span>`).join('')}</div></article>`).join('')}</div><div class="actions"><button class="secondary" id="onlineHome">TORNA ALLA HOME</button>${state.online.isHost?'<button class="primary" id="onlineNewRoom">CREA NUOVA STANZA</button>':''}</div>`);
  $('#onlineHome').onclick=()=>{leaveOnlineRoom();clearInviteFromUrl();state.screen='home';render()};
  if($('#onlineNewRoom'))$('#onlineNewRoom').onclick=()=>{leaveOnlineRoom();clearInviteFromUrl();state.screen='create';render()};
}
function renderRules(){
  app.innerHTML=shell(`${topbar('Regole','Come si gioca','Tre azioni: rilancia, passa, gestisci il budget. Il resto deve essere leggibile a colpo d’occhio.')}<div class="grid-2"><div class="glass"><h3 class="section-title">Obiettivo</h3><p>Ogni giocatore parte con lo stesso budget e deve ottenere <b>5 personaggi</b>. Il draft contiene esattamente <b>5 carte per giocatore</b> e ogni carta viene proposta una sola volta.</p><p>Durante l'asta usa <b>+1</b>, <b>+5</b> oppure <b>PASSA</b>. Se passi non puoi rientrare nell'asta di quella carta.</p><p>Le carte rimaste senza acquirente vengono assegnate <b>casualmente a 1 credito</b> a chi ha ancora slot vuoti. Se resta un solo giocatore incompleto, le aste si fermano e riceve casualmente le carte residue: non può scegliere le migliori a prezzo minimo.</p><p>Ogni giocatore ha un <b>colore personale</b>: durante l'asta lo stesso colore identifica puntate, leader e rilanci.</p></div><div class="glass"><h3 class="section-title">Vittoria</h3><p>In modalità Standard non vengono mostrati né grado né punteggio: devi valutare il personaggio senza aiuti.</p><p>Alla fine del draft tutti i punteggi vengono rivelati e sommati. Vince il totale più alto.</p><div class="actions"><button class="primary" id="goCreate">CREA PARTITA</button></div></div></div>`);
  $('#goCreate').onclick=()=>{state.screen='create';render()};
}

function resetCatalogToDefaults(){
  ANIME=cloneAnime(DEFAULT_ANIME);
  ROSTER=cloneRoster(DEFAULT_ROSTER);
  localStorage.removeItem(CATALOG_STORAGE_KEY);
  localStorage.removeItem(IMAGE_CACHE_KEY);
  state.apiLoaded.clear();
  state.settings.mode='all';
  state.settings.universes=Object.keys(ANIME);
  state.resolvedUniverses=[];
  state.admin.selectedCategory=Object.keys(ANIME)[0]||null;
}

function adminImageMarkup(src,label,extraClass=''){
  return src
    ? `<div class="admin-image ${extraClass}"><img src="${esc(src)}" alt="${esc(label)}" loading="lazy" decoding="async" onerror="this.style.display='none';this.nextElementSibling.style.display='grid'"><span class="admin-image-fallback" style="display:none">${initials(label)}</span></div>`
    : `<div class="admin-image ${extraClass}"><span class="admin-image-fallback">${initials(label)}</span></div>`;
}
function updateAdminPreview(el,src,label){if(el)el.innerHTML=adminImageMarkup(src,label,'preview-inner')}

async function optimizeImageFile(file,kind='card'){
  if(!file||!file.type?.startsWith('image/'))throw new Error('Seleziona un file immagine valido.');
  const limits=kind==='logo'?{w:640,h:420,q:.82}:{w:900,h:1260,q:.82};
  let bitmap=null,source=null;
  try{
    if('createImageBitmap' in window){bitmap=await createImageBitmap(file);source=bitmap}
    else{
      const src=URL.createObjectURL(file);
      source=await new Promise((resolve,reject)=>{const img=new Image();img.onload=()=>{URL.revokeObjectURL(src);resolve(img)};img.onerror=()=>{URL.revokeObjectURL(src);reject(new Error('Immagine non leggibile'))};img.src=src});
    }
    const ratio=Math.min(1,limits.w/source.width,limits.h/source.height);
    const canvas=document.createElement('canvas');
    canvas.width=Math.max(1,Math.round(source.width*ratio));canvas.height=Math.max(1,Math.round(source.height*ratio));
    const ctx=canvas.getContext('2d',{alpha:true});ctx.imageSmoothingEnabled=true;ctx.imageSmoothingQuality='high';ctx.drawImage(source,0,0,canvas.width,canvas.height);
    const blob=await new Promise(resolve=>canvas.toBlob(resolve,'image/webp',limits.q));
    if(!blob)throw new Error('Compressione immagine non riuscita');
    return await new Promise((resolve,reject)=>{const reader=new FileReader();reader.onload=()=>resolve(reader.result);reader.onerror=()=>reject(reader.error);reader.readAsDataURL(blob)});
  }finally{if(bitmap?.close)bitmap.close()}
}

function bindImageDropZone(el,onFile){
  if(!el)return;
  let depth=0,busy=false;
  const isImage=file=>file&&file.type?.startsWith('image/');
  const clear=()=>{depth=0;el.classList.remove('drag-over')};
  el.addEventListener('dragenter',e=>{if(busy)return;e.preventDefault();e.stopPropagation();depth++;el.classList.add('drag-over')});
  el.addEventListener('dragover',e=>{if(busy)return;e.preventDefault();e.stopPropagation();if(e.dataTransfer)e.dataTransfer.dropEffect='copy';el.classList.add('drag-over')});
  el.addEventListener('dragleave',e=>{if(busy)return;e.preventDefault();e.stopPropagation();depth=Math.max(0,depth-1);if(!depth)el.classList.remove('drag-over')});
  el.addEventListener('drop',async e=>{
    e.preventDefault();e.stopPropagation();clear();if(busy)return;
    const file=[...(e.dataTransfer?.files||[])].find(isImage);
    if(!file)return toast('Trascina un file immagine valido');
    try{busy=true;el.classList.add('drop-busy');await onFile(file)}catch(error){toast(error.message||'Errore immagine')}finally{busy=false;el.classList.remove('drop-busy')}
  });
}

function mountAdminModal(content){
  document.querySelector('.admin-modal')?.remove();
  const modal=document.createElement('div');modal.className='admin-modal';modal.innerHTML=`<div class="admin-modal-card">${content}</div>`;document.body.appendChild(modal);
  modal.addEventListener('click',e=>{if(e.target===modal)modal.remove()});
  modal.querySelectorAll('[data-close-modal]').forEach(btn=>btn.onclick=()=>modal.remove());
  setTimeout(()=>modal.querySelector('input,select,button')?.focus(),0);
  return modal;
}

function openNewCategoryDialog(){
  let logoDraft='';
  const modal=mountAdminModal(`<div class="admin-modal-head"><div><div class="eyebrow">Nuova categoria</div><h3>Crea un nuovo universo</h3><p>Inserisci il nome e, se vuoi, trascina o carica il logo.</p></div><button class="icon-btn" data-close-modal>×</button></div>
    <div class="admin-modal-grid category-create-grid">
      <div class="admin-upload-preview admin-drop-zone" id="newCatPreview" data-drop-label="TRASCINA LOGO QUI">${adminImageMarkup('', 'Nuova categoria','preview-inner')}</div>
      <div class="admin-form-stack">
        <label>NOME CATEGORIA<input id="newCatName" maxlength="36" placeholder="Es. Frieren"></label>
        <div class="admin-upload-actions"><label class="admin-file-button">CARICA LOGO<input id="newCatLogoFile" type="file" accept="image/*"></label><small class="admin-upload-note">oppure trascina il file nel riquadro</small></div>
      </div>
    </div>
    <div class="admin-modal-actions"><button class="secondary" data-close-modal>ANNULLA</button><button class="primary" id="confirmNewCategory">CREA CATEGORIA</button></div>`);
  const name=$('#newCatName'),file=$('#newCatLogoFile'),preview=$('#newCatPreview');
  const applyLogo=async imageFile=>{logoDraft=await optimizeImageFile(imageFile,'logo');updateAdminPreview(preview,logoDraft,name.value||'Nuova categoria');toast('Logo pronto')};
  name.oninput=()=>updateAdminPreview(preview,logoDraft,name.value||'Nuova categoria');
  file.onchange=async()=>{if(!file.files[0])return;try{file.disabled=true;await applyLogo(file.files[0])}catch(error){toast(error.message||'Errore immagine')}finally{file.disabled=false;file.value=''}};
  bindImageDropZone(preview,applyLogo);
  $('#confirmNewCategory').onclick=async()=>{
    const categoryName=name.value.trim();if(!categoryName)return toast('Inserisci il nome della categoria');
    const button=$('#confirmNewCategory');button.disabled=true;
    try{
      const data=await adminApi('/api/admin/categories',{method:'POST',body:{name:categoryName,accent:'#8b5cf6',logo:logoDraft||null}});
      state.admin.selectedCategory=data.id;modal.remove();renderAdmin();toast('Categoria creata');
    }catch(error){toast(error.message||'Creazione categoria non riuscita')}
    finally{if(document.body.contains(button))button.disabled=false}
  };
}

function openCardEditor(cardId=null){
  const selected=state.admin.selectedCategory;
  const existing=cardId?ROSTER.find(c=>c.id===cardId):null;
  if(cardId&&!existing)return;
  let imageDraft=existing?.image||'';
  const modal=mountAdminModal(`<div class="admin-modal-head"><div><div class="eyebrow">${existing?'Modifica carta':'Nuova carta'}</div><h3>${existing?esc(existing.name):'Aggiungi personaggio'}</h3><p>Il punteggio è interno e non viene mostrato durante il draft standard.</p></div><button class="icon-btn" data-close-modal>×</button></div>
    <div class="admin-modal-grid card-editor-grid">
      <div class="admin-card-preview admin-drop-zone" id="cardEditPreview" data-drop-label="TRASCINA IMMAGINE QUI">${adminImageMarkup(imageDraft,existing?.name||'Nuova carta','preview-inner')}</div>
      <div class="admin-form-stack">
        <label>NOME PERSONAGGIO<input id="cardEditName" maxlength="48" value="${esc(existing?.name||'')}" placeholder="Nome personaggio"></label>
        <div class="admin-form-row"><label>CATEGORIA<select id="cardEditCategory">${Object.entries(ANIME).map(([key,a])=>`<option value="${esc(key)}" ${(existing?.anime||selected)===key?'selected':''}>${esc(a.name)}</option>`).join('')}</select></label><label>PUNTEGGIO INTERNO<input id="cardEditScore" type="number" min="10" max="100" value="${existing?.score||50}"></label></div>
        <div class="admin-upload-actions"><label class="admin-file-button">CARICA IMMAGINE<input id="cardEditFile" type="file" accept="image/*"></label><button class="secondary small" id="removeCardImage">RIMUOVI IMMAGINE</button></div>
        <small class="admin-upload-note standalone">Puoi anche trascinare direttamente un'immagine sulla preview.</small>
      </div>
    </div>
    <div class="admin-modal-actions">${existing?'<button class="danger ghost" id="deleteCardFromModal">ELIMINA</button>':''}<span class="grow"></span><button class="secondary" data-close-modal>ANNULLA</button><button class="primary" id="saveCardEdit">${existing?'SALVA MODIFICHE':'AGGIUNGI CARTA'}</button></div>`);
  const name=$('#cardEditName'),file=$('#cardEditFile'),preview=$('#cardEditPreview');
  const refresh=()=>updateAdminPreview(preview,imageDraft,name.value||'Nuova carta');
  const applyImage=async imageFile=>{imageDraft=await optimizeImageFile(imageFile,'card');refresh();toast('Immagine pronta')};
  name.oninput=refresh;
  file.onchange=async()=>{if(!file.files[0])return;try{file.disabled=true;await applyImage(file.files[0])}catch(error){toast(error.message||'Errore immagine')}finally{file.disabled=false;file.value=''}};
  bindImageDropZone(preview,applyImage);
  $('#removeCardImage').onclick=()=>{imageDraft='';refresh()};
  if(existing)$('#deleteCardFromModal').onclick=async()=>{
    if(!confirm(`Eliminare ${existing.name}?`))return;
    try{await adminApi(`/api/admin/cards/${encodeURIComponent(existing.id)}`,{method:'DELETE'});modal.remove();renderAdmin();toast('Carta eliminata')}
    catch(error){toast(error.message||'Eliminazione non riuscita')}
  };
  $('#saveCardEdit').onclick=async()=>{
    const cardName=name.value.trim(),anime=$('#cardEditCategory').value,score=clamp(Number($('#cardEditScore').value)||50,10,100);
    if(!cardName)return toast('Inserisci il nome del personaggio');if(!ANIME[anime])return toast('Categoria non valida');
    const button=$('#saveCardEdit');button.disabled=true;
    try{
      const data=await adminApi(existing?`/api/admin/cards/${encodeURIComponent(existing.id)}`:'/api/admin/cards',{method:existing?'PATCH':'POST',body:{name:cardName,anime,score,image:imageDraft||null}});
      state.admin.selectedCategory=data.card?.anime||anime;modal.remove();renderAdmin();toast(existing?'Carta aggiornata':'Carta aggiunta');
    }catch(error){toast(error.message||'Salvataggio carta non riuscito')}
    finally{if(document.body.contains(button))button.disabled=false}
  };
}

async function deleteAdminCard(cardId){
  const card=ROSTER.find(c=>c.id===cardId);if(!card)return;
  if(!confirm(`Eliminare definitivamente ${card.name}?`))return;
  try{await adminApi(`/api/admin/cards/${encodeURIComponent(cardId)}`,{method:'DELETE'});renderAdmin();toast('Carta eliminata')}
  catch(error){toast(error.message||'Eliminazione non riuscita')}
}

async function replaceAdminCardImage(cardId,file,article){
  const card=ROSTER.find(c=>c.id===cardId);if(!card)return;
  article?.classList.add('drop-busy');
  try{
    const image=await optimizeImageFile(file,'card');
    const data=await adminApi(`/api/admin/cards/${encodeURIComponent(cardId)}`,{method:'PATCH',body:{image}});
    const updated=data.card||ROSTER.find(c=>c.id===cardId);
    const thumb=article?.querySelector('.admin-image.card-thumb');
    if(thumb&&updated)thumb.outerHTML=adminImageMarkup(updated.image,updated.name,'card-thumb');
    article?.classList.add('drop-saved');setTimeout(()=>article?.classList.remove('drop-saved'),520);
    toast(`Immagine di ${updated?.name||card.name} aggiornata e salvata`);
  }catch(error){toast(error.message||'Salvataggio immagine non riuscito')}
  finally{article?.classList.remove('drop-busy')}
}

function renderAdmin(){
  const keys=Object.keys(ANIME);
  if(!keys.length){resetCatalogToDefaults()}
  if(!ANIME[state.admin.selectedCategory])state.admin.selectedCategory=Object.keys(ANIME)[0];
  const key=state.admin.selectedCategory,category=ANIME[key];
  const cards=ROSTER.filter(c=>c.anime===key).sort((a,b)=>a.name.localeCompare(b.name,'it'));
  const totalCards=ROSTER.length;
  app.innerHTML=minimalShell(`${topbar('Amministrazione','Gestione catalogo','Categorie e carte usate dal draft. Le modifiche vengono sincronizzate con il catalogo condiviso del sito.',`<span class="pill">${keys.length} categorie · ${totalCards} carte</span>`)}
    <div class="admin-page">
      <div class="admin-layout">
        <aside class="glass admin-categories-panel">
          <div class="admin-panel-head"><div><div class="eyebrow">Categorie</div><h3>Universi anime</h3></div><button class="icon-btn add" id="newCategory" title="Nuova categoria">+</button></div>
          <div class="admin-category-list">${Object.entries(ANIME).map(([catKey,a])=>`<button class="admin-category-item ${catKey===key?'selected':''}" data-admin-category="${esc(catKey)}" style="--accent:${a.accent||'#8b5cf6'}">${adminImageMarkup(a.logo,a.name,'cat-logo')}<div><b>${esc(a.name)}</b><small>${categoryCardCount(catKey)} carte</small></div><span>›</span></button>`).join('')}</div>
        </aside>

        <section class="admin-workspace">
          <div class="glass admin-category-editor">
            <div class="admin-panel-head"><div><div class="eyebrow">Categoria selezionata</div><h3>${esc(category.name)}</h3><p>ID interno · ${esc(key)}</p></div><span class="admin-count-badge">${cards.length} CARTE</span></div>
            <div class="admin-category-form">
              <div class="admin-upload-preview admin-drop-zone" id="catLogoPreview" data-drop-label="TRASCINA LOGO QUI">${adminImageMarkup(category.logo,category.name,'preview-inner')}</div>
              <div class="admin-form-stack">
                <div class="admin-form-row admin-name-row"><label>NOME CATEGORIA<input id="catName" maxlength="36" value="${esc(category.name)}"></label></div>
                <div class="admin-upload-actions"><label class="admin-file-button">CARICA LOGO<input id="catLogoFile" type="file" accept="image/*"></label><button class="secondary small" id="removeCatLogo">RIMUOVI LOGO</button></div>
                <small class="admin-upload-note standalone">Oppure trascina il logo direttamente nel riquadro a sinistra.</small>
              </div>
            </div>
            <div class="admin-editor-actions"><button class="danger ghost" id="deleteCategory" ${keys.length<=1?'disabled':''}>ELIMINA CATEGORIA</button><span class="grow"></span><button class="primary" id="saveCategory">SALVA CATEGORIA</button></div>
          </div>

          <div class="glass admin-cards-panel">
            <div class="admin-panel-head cards-head"><div><div class="eyebrow">Carte</div><h3>Personaggi · ${esc(category.name)}</h3><p>Trascina un'immagine sopra una carta per sostituirla e salvarla automaticamente.</p></div><button class="primary" id="addCard">+ AGGIUNGI CARTA</button></div>
            <div class="admin-card-grid">${cards.length?cards.map(card=>`<article class="admin-card-item admin-card-drop" data-card-drop="${esc(card.id)}" style="--accent:${category.accent||'#8b5cf6'}" title="Trascina qui un'immagine per sostituire l'artwork">${adminImageMarkup(card.image,card.name,'card-thumb')}<div class="admin-card-copy"><b>${esc(card.name)}</b><small>Punteggio interno · ${card.score}</small></div><div class="admin-card-actions"><button class="secondary small" data-edit-card="${esc(card.id)}">MODIFICA</button><button class="danger small" data-delete-card="${esc(card.id)}">ELIMINA</button></div></article>`).join(''):`<div class="admin-empty"><span>＋</span><b>Nessuna carta in questa categoria</b><small>Aggiungi almeno un personaggio per poterla usare nei draft.</small><button class="primary" id="addFirstCard">AGGIUNGI LA PRIMA CARTA</button></div>`}</div>
          </div>
        </section>
      </div>
    </div>`, 'admin');

  let logoDraft=category.logo||'';
  document.querySelectorAll('[data-admin-category]').forEach(btn=>btn.onclick=()=>{state.admin.selectedCategory=btn.dataset.adminCategory;renderAdmin()});
  $('#newCategory').onclick=openNewCategoryDialog;
  $('#addCard').onclick=()=>openCardEditor();if($('#addFirstCard'))$('#addFirstCard').onclick=()=>openCardEditor();
  document.querySelectorAll('[data-edit-card]').forEach(btn=>btn.onclick=()=>openCardEditor(btn.dataset.editCard));
  document.querySelectorAll('[data-delete-card]').forEach(btn=>btn.onclick=()=>deleteAdminCard(btn.dataset.deleteCard));
  document.querySelectorAll('[data-card-drop]').forEach(article=>{
    const card=ROSTER.find(item=>item.id===article.dataset.cardDrop);
    if(card){
      article.insertAdjacentHTML('afterbegin',`<button class="admin-card-score" type="button" aria-label="Modifica forza di ${esc(card.name)}"><span>FORZA</span><b>${card.score}</b></button>`);
      const scoreButton=article.querySelector('.admin-card-score');
      scoreButton.onclick=()=>{
        if(scoreButton.classList.contains('editing'))return;
        scoreButton.classList.add('editing');
        scoreButton.innerHTML=`<span>FORZA</span><input type="number" min="10" max="100" value="${card.score}" aria-label="Forza di ${esc(card.name)}">`;
        const input=scoreButton.querySelector('input');
        let saving=false,cancelled=false;
        const restore=()=>{scoreButton.classList.remove('editing');scoreButton.innerHTML=`<span>FORZA</span><b>${card.score}</b>`};
        const save=async()=>{
          if(saving||cancelled)return;
          const score=clamp(Number(input.value)||card.score,10,100);
          if(score===card.score){restore();return}
          saving=true;scoreButton.classList.add('saving');input.disabled=true;
          try{await adminApi(`/api/admin/cards/${encodeURIComponent(card.id)}`,{method:'PATCH',body:{score}});toast(`Forza di ${card.name} aggiornata`);renderAdmin()}
          catch(error){toast(error.message||'Aggiornamento forza non riuscito');restore()}
        };
        input.onkeydown=event=>{if(event.key==='Enter'){event.preventDefault();save()}if(event.key==='Escape'){cancelled=true;restore()}};
        input.onblur=save;
        setTimeout(()=>{input.focus();input.select()},0);
      };
    }
    bindImageDropZone(article,file=>replaceAdminCardImage(article.dataset.cardDrop,file,article));
  });

  const catName=$('#catName'),catLogoFile=$('#catLogoFile'),preview=$('#catLogoPreview');
  const applyLogo=async imageFile=>{logoDraft=await optimizeImageFile(imageFile,'logo');updateAdminPreview(preview,logoDraft,catName.value||category.name);toast('Logo pronto')};
  catName.oninput=()=>updateAdminPreview(preview,logoDraft,catName.value||category.name);
  catLogoFile.onchange=async()=>{if(!catLogoFile.files[0])return;try{catLogoFile.disabled=true;await applyLogo(catLogoFile.files[0])}catch(error){toast(error.message||'Errore immagine')}finally{catLogoFile.disabled=false;catLogoFile.value=''}};
  bindImageDropZone(preview,applyLogo);
  $('#removeCatLogo').onclick=()=>{logoDraft='';updateAdminPreview(preview,'',catName.value||category.name)};
  $('#saveCategory').onclick=async()=>{
    const name=catName.value.trim();if(!name)return toast('Inserisci il nome della categoria');
    const button=$('#saveCategory');button.disabled=true;
    try{
      await adminApi(`/api/admin/categories/${encodeURIComponent(key)}`,{method:'PATCH',body:{name,accent:category.accent||'#8b5cf6',logo:logoDraft||null}});
      state.apiLoaded.delete(key);renderAdmin();toast('Categoria aggiornata');
    }catch(error){toast(error.message||'Salvataggio categoria non riuscito')}
    finally{if(document.body.contains(button))button.disabled=false}
  };
  $('#deleteCategory').onclick=async()=>{
    if(Object.keys(ANIME).length<=1)return toast('Deve restare almeno una categoria');
    if(!confirm(`Eliminare ${category.name} e tutte le sue ${cards.length} carte?`))return;
    try{
      await adminApi(`/api/admin/categories/${encodeURIComponent(key)}`,{method:'DELETE'});
      state.settings.universes=state.settings.universes.filter(k=>ANIME[k]);state.resolvedUniverses=state.resolvedUniverses.filter(k=>ANIME[k]);state.apiLoaded.delete(key);state.admin.selectedCategory=Object.keys(ANIME)[0]||null;renderAdmin();toast('Categoria eliminata');
    }catch(error){toast(error.message||'Eliminazione categoria non riuscita')}
  };
  bindGlobal();
}


function normalize(s){return s.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/[^a-z0-9]/g,'')}
async function hydrateImages(universeKeys){
  const keys=[...new Set(universeKeys)].filter(k=>ANIME[k]?.malId&&!state.apiLoaded.has(k)&&ROSTER.some(c=>c.anime===k&&!c.image));
  for(const k of keys){
    try{
      const res=await fetch(`https://api.jikan.moe/v4/anime/${ANIME[k].malId}/characters`);if(!res.ok)continue;
      const json=await res.json(),chars=json.data||[];
      ROSTER.filter(c=>c.anime===k&&!c.image).forEach(c=>{
        const target=normalize(c.name);let found=chars.find(x=>{const n=normalize(x.character.name);return n===target||n.includes(target)||target.includes(n)});
        if(!found){const parts=c.name.toLowerCase().split(/\s+/);found=chars.find(x=>parts.some(p=>p.length>4&&x.character.name.toLowerCase().includes(p)))}
        if(found)c.image=found.character.images?.webp?.image_url||found.character.images?.jpg?.image_url||c.image;
      });
      state.apiLoaded.add(k);
    }catch(error){console.warn('Jikan non disponibile',k,error)}
    await new Promise(r=>setTimeout(r,120));
  }
  persistImageCache();
}
function hydrateSelectedImages(){
  const preferred=['naruto','onepiece','jjk','aot'];
  const keys=[...preferred,...Object.keys(ANIME)].filter((k,i,arr)=>ANIME[k]?.malId&&arr.indexOf(k)===i).slice(0,4).filter(k=>!state.apiLoaded.has(k)&&ROSTER.some(c=>c.anime===k&&!c.image));
  if(!keys.length)return;
  hydrateImages(keys).then(()=>{if(state.screen==='home')renderHome()});
}


/* ================================
   V0.15 — Admin CRUD + immagini nella cartella progetto
   ================================ */
function socketSessionKey(code){return `animeDraft.onlineSession.${String(code||'').toUpperCase()}`}
function restoreLocalCatalog(){
  ANIME=cloneAnime(DEFAULT_ANIME);ROSTER=cloneRoster(DEFAULT_ROSTER);loadCatalog();fetchCatalogFromServer({rerender:false,silent:true});
}
function setInviteInUrl(code){
  try{const url=new URL(window.location.href);url.searchParams.set('room',code);history.replaceState({},'',url.pathname+url.search+url.hash)}catch{}
}
function emitAck(event,payload={},timeout=7000){
  return new Promise(resolve=>{
    const socket=state.online.socket;
    if(!socket?.connected)return resolve({ok:false,error:'Server realtime non connesso'});
    let done=false;
    const timer=setTimeout(()=>{if(done)return;done=true;resolve({ok:false,error:'Il server non ha risposto in tempo'})},timeout);
    socket.emit(event,payload,response=>{if(done)return;done=true;clearTimeout(timer);resolve(response||{ok:false,error:'Risposta server non valida'})});
  });
}
function saveOnlineSession(code,token,playerId,name){
  try{localStorage.setItem(socketSessionKey(code),JSON.stringify({token,playerId,name}))}catch{}
}
function readOnlineSession(code){
  try{return JSON.parse(localStorage.getItem(socketSessionKey(code))||'null')}catch{return null}
}
function clearOnlineSession(code){try{localStorage.removeItem(socketSessionKey(code))}catch{}}
function applyRoomSnapshot(snapshot){
  if(!snapshot?.roomCode)return;
  const prevScreen=state.screen,prevCard=state.current?.id,prevRound=state.round;
  state.online.mode='online';state.online.roomCode=snapshot.roomCode;state.roomCode=snapshot.roomCode;
  state.online.isHost=snapshot.hostPlayerId===state.online.playerId;
  if(snapshot.anime)ANIME={...ANIME,...snapshot.anime};
  if(snapshot.settings)state.settings={...state.settings,...snapshot.settings,playerName:state.settings.playerName};
  state.resolvedUniverses=snapshot.resolvedUniverses||[];
  state.resolvedRandomUniverseCount=snapshot.resolvedRandomUniverseCount||0;
  state.players=(snapshot.players||[]).map(p=>({...p,human:p.id===state.online.playerId}));
  state.passed=new Set(snapshot.passed||[]);
  state.current=snapshot.current||null;state.currentBid=snapshot.currentBid||0;state.leaderId=snapshot.leaderId??null;state.lastBidderId=snapshot.lastBidderId??null;
  state.timerLeft=snapshot.timerLeft??state.settings.timer;state.round=snapshot.round||0;state.draftTotal=snapshot.draftTotal||draftCardCount();state.paused=Boolean(snapshot.paused);
  if(snapshot.phase==='lobby'){
    if(prevScreen!=='lobby'||document.activeElement?.tagName!=='INPUT'){state.screen='lobby';render()}
    return;
  }
  if(snapshot.phase==='auction'){
    const sameAuction=prevScreen==='auction'&&prevCard===snapshot.current?.id&&prevRound===snapshot.round;
    state.screen='auction';
    if(sameAuction)updateAuctionDOM();else renderAuction(true);
    return;
  }
  if(snapshot.phase==='results'){
    state.screen='results';render();
  }
}
async function createOnlineRoom(resolved){
  const selectedAnime=Object.fromEntries(Object.entries(ANIME).map(([k,a])=>[k,{...a}]));
  const selectedRoster=ROSTER.filter(c=>resolved.includes(c.anime)).map(c=>({id:c.id,anime:c.anime,name:c.name,score:c.score,image:c.image||null}));
  const payload={
    name:state.settings.playerName,
    settings:{players:state.settings.players,teamSize:state.settings.teamSize,budget:state.settings.budget,timer:state.settings.timer,hiddenScore:state.settings.hiddenScore,synergies:state.settings.synergies,mode:state.settings.mode,randomUniverseCount:state.settings.randomUniverseCount,randomUniverseCountAuto:state.settings.randomUniverseCountAuto},
    resolvedUniverses:resolved,
    resolvedRandomUniverseCount:state.resolvedRandomUniverseCount,
    catalog:{anime:selectedAnime,roster:selectedRoster}
  };
  toast('Creazione stanza realtime…');
  const result=await emitAck('room:create',payload,12000);
  if(!result?.ok){toast(result?.error||'Impossibile creare la stanza online');return false}
  state.online.mode='online';state.online.playerId=result.playerId;state.online.token=result.token;state.online.roomCode=result.roomCode;state.online.isHost=true;state.roomCode=result.roomCode;state.online.pendingRoom=result.roomCode;
  saveOnlineSession(result.roomCode,result.token,result.playerId,state.settings.playerName);setInviteInUrl(result.roomCode);applyRoomSnapshot(result.snapshot);toast('Stanza online creata');return true;
}
async function joinOnlineRoom(roomCodeValue,name){
  if(state.online.joining)return;state.online.joining=true;
  try{
    toast('Ingresso nella stanza…');
    const result=await emitAck('room:join',{roomCode:roomCodeValue,name},9000);
    if(!result?.ok){toast(result?.error||'Impossibile entrare nella stanza');return false}
    state.online.mode='online';state.online.playerId=result.playerId;state.online.token=result.token;state.online.roomCode=result.roomCode;state.online.pendingRoom=result.roomCode;state.roomCode=result.roomCode;state.settings.playerName=name;
    saveOnlineSession(result.roomCode,result.token,result.playerId,name);setInviteInUrl(result.roomCode);applyRoomSnapshot(result.snapshot);toast('Connesso alla stanza');return true;
  }finally{state.online.joining=false}
}
async function rejoinOnlineRoom(code,session){
  if(!session?.token)return false;
  const result=await emitAck('room:rejoin',{roomCode:code,token:session.token},7000);
  if(!result?.ok)return false;
  state.online.mode='online';state.online.playerId=result.playerId;state.online.token=session.token;state.online.roomCode=code;state.online.pendingRoom=code;state.roomCode=code;state.settings.playerName=result.name||session.name||state.settings.playerName;
  applyRoomSnapshot(result.snapshot);toast('Riconnesso alla stanza');return true;
}
function leaveOnlineRoom(){
  const code=state.roomCode||state.online.roomCode;
  if(state.online.socket?.connected&&code)state.online.socket.emit('room:leave',{roomCode:code});
  if(code)clearOnlineSession(code);
  state.online.mode=null;state.online.roomCode='';state.online.playerId=null;state.online.token=null;state.online.isHost=false;state.online.pendingRoom='';state.roomCode='';state.players=[];state.current=null;state.passed=new Set();
  restoreLocalCatalog();
}
function initNetwork(){
  const inviteCode=(new URLSearchParams(location.search).get('room')||'').trim().toUpperCase();
  if(inviteCode){state.online.pendingRoom=inviteCode;state.screen='join'}
  if(typeof window.io!=='function'){
    state.online.available=false;state.online.connected=false;render();
    if(inviteCode)setTimeout(()=>toast('Apri il progetto tramite il server Node per usare il multiplayer'),300);
    return;
  }
  const socket=backendBase
    ? window.io(backendBase,{reconnection:true,reconnectionDelay:600,reconnectionDelayMax:2500,timeout:6000})
    : window.io({reconnection:true,reconnectionDelay:600,reconnectionDelayMax:2500,timeout:6000});
  state.online.socket=socket;state.online.available=true;
  socket.on('connect',async()=>{
    state.online.connected=true;
    if(state.online.mode==='online'&&state.online.roomCode&&state.online.token){
      const ok=await rejoinOnlineRoom(state.online.roomCode,{token:state.online.token,name:state.settings.playerName});
      if(!ok)toast('Riconnesso al server, ma la stanza non è più disponibile');
      return;
    }
    const code=state.online.pendingRoom;
    if(code){
      const session=readOnlineSession(code);
      if(session){const ok=await rejoinOnlineRoom(code,session);if(ok)return}
      if(state.screen==='join')render();
    }else if(state.screen==='join')render();
  });
  socket.on('disconnect',()=>{state.online.connected=false;if(state.online.mode==='online')toast('Connessione persa: tentativo di riconnessione…');if(state.screen==='join')render()});
  socket.on('connect_error',()=>{state.online.connected=false;if(state.screen==='join')render()});
  socket.on('room:snapshot',snapshot=>applyRoomSnapshot(snapshot));
  socket.on('room:notice',message=>{if(message)toast(message)});
  socket.on('room:error',message=>{if(message)toast(message)});
  socket.on('catalog:updated',()=>{if(state.online.mode!=='online'||state.screen==='home'||state.screen==='create'||state.screen==='admin')fetchCatalogFromServer({rerender:true,silent:true})});
  render();
}

async function bootstrap(){
  await loadRuntimeConfig();
  initNetwork();
  fetchCatalogFromServer({rerender:true,silent:true});
}

bootstrap();
