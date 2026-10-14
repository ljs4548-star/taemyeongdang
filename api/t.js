// 태명당 서버 함수 (Vercel). 시크릿 키는 코드에 넣지 말고 Vercel 환경변수에만 넣으세요.
// 필요한 환경변수: TOSS_SECRET_KEY, TOSS_CLIENT_KEY
const crypto = require('crypto');

const NAME_BANK = [
  {name:"튼튼이",tag:"공용",meaning:"건강하고 튼튼하게 자라길 바라는 마음을 담은 태명",blessing:"세상 무엇에도 흔들리지 않는 튼튼한 몸과 마음으로 자라나렴."},
  {name:"복덩이",tag:"공용",meaning:"집안에 복을 불러오는 귀한 존재라는 뜻",blessing:"네가 오는 것만으로 이미 우리 가족에게는 큰 복이란다."},
  {name:"해피",tag:"공용",meaning:"행복을 뜻하는 순우리말 감성의 태명",blessing:"평생 웃음이 끊이지 않는 행복한 사람으로 자라나렴."},
  {name:"다복이",tag:"공용",meaning:"복이 많다는 뜻의 정겨운 태명",blessing:"가는 곳마다 좋은 인연과 복이 함께하길."},
  {name:"새봄이",tag:"공용",meaning:"새로운 계절처럼 생명력 넘치는 시작을 의미",blessing:"매일이 새봄처럼 설레고 싱그러운 삶이 되길."},
  {name:"하늘이",tag:"공용",meaning:"넓고 큰 뜻을 품으라는 의미",blessing:"하늘처럼 넓은 마음으로 세상을 품는 사람이 되렴."},
  {name:"온유",tag:"공용",meaning:"따뜻하고 부드러운 성품을 바라는 태명",blessing:"누구에게나 따뜻함을 나눠주는 온유한 사람이 되길."},
  {name:"다온이",tag:"공용",meaning:"좋은 것만 다 온다는 뜻의 순우리말",blessing:"네 삶에 좋은 일만 가득 다가오길 바란다."},
  {name:"이든이",tag:"공용",meaning:"히브리어로 에덴, 축복의 동산을 의미",blessing:"네가 있는 곳이 언제나 축복의 동산이 되길."},
  {name:"라온이",tag:"공용",meaning:"즐거운, 기쁜을 뜻하는 순우리말",blessing:"매 순간을 즐거움으로 채우며 살아가렴."},
  {name:"곰돌이",tag:"아들",meaning:"듬직하고 씩씩한 기운을 담은 태명",blessing:"곰처럼 든든하고 씩씩한 사람으로 자라나렴."},
  {name:"장군이",tag:"아들",meaning:"용맹하고 리더십 있는 기상을 바라는 태명",blessing:"어디서든 앞장서는 용기 있는 사람이 되길."},
  {name:"우람이",tag:"아들",meaning:"크고 튼튼하게 자라길 바라는 마음",blessing:"몸도 마음도 우람하고 단단하게 자라나렴."},
  {name:"씩씩이",tag:"아들",meaning:"밝고 용기있는 성격을 바라는 태명",blessing:"어떤 어려움 앞에서도 씩씩하게 헤쳐나가렴."},
  {name:"든든이",tag:"아들",meaning:"가족의 든든한 버팀목이 되길 바라는 태명",blessing:"가족과 주변 사람들의 든든한 힘이 되어주렴."},
  {name:"용감이",tag:"아들",meaning:"용기 있는 삶을 바라는 태명",blessing:"두려움 앞에서도 물러서지 않는 용기를 갖길."},
  {name:"푸른이",tag:"아들",meaning:"푸르른 나무처럼 곧게 자라길 바라는 태명",blessing:"푸른 나무처럼 곧고 건강하게 자라나렴."},
  {name:"별동이",tag:"아들",meaning:"밤하늘의 별처럼 빛나는 존재라는 뜻",blessing:"어둠 속에서도 스스로 빛나는 사람이 되렴."},
  {name:"예쁜이",tag:"딸",meaning:"고운 마음과 모습을 바라는 태명",blessing:"겉과 속이 모두 고운 사람으로 자라나렴."},
  {name:"봄이",tag:"딸",meaning:"따스한 봄처럼 포근한 존재라는 뜻",blessing:"네가 머무는 곳마다 봄처럼 따뜻해지길."},
  {name:"다솜이",tag:"딸",meaning:"사랑을 뜻하는 옛 순우리말",blessing:"사랑을 듬뿍 받고, 또 듬뿍 나누며 살아가렴."},
  {name:"고운이",tag:"딸",meaning:"마음씨가 곱고 아름답길 바라는 태명",blessing:"말과 행동이 모두 고운 사람으로 자라나렴."},
  {name:"소망이",tag:"딸",meaning:"가족의 소중한 소망이라는 뜻",blessing:"네가 품은 모든 소망이 이루어지는 삶이 되길."},
  {name:"나비",tag:"딸",meaning:"훨훨 자유롭게 날아오르길 바라는 태명",blessing:"나비처럼 가볍고 자유롭게 세상을 누비렴."},
  {name:"꽃님이",tag:"딸",meaning:"꽃처럼 아름답게 피어나길 바라는 태명",blessing:"너만의 색으로 아름답게 피어나는 삶이 되길."},
  {name:"빛나리",tag:"공용",meaning:"스스로 빛나는 존재가 되길 바라는 태명",blessing:"누가 알아주지 않아도 스스로 빛나는 사람이 되렴."},
  {name:"든해",tag:"공용",meaning:"든든한 해처럼 존재감 있는 삶을 바라는 태명",blessing:"해처럼 따뜻하게, 또 든든하게 곁을 지켜주렴."},
  {name:"지음이",tag:"공용",meaning:"정성으로 지어낸 소중한 존재라는 뜻",blessing:"정성껏 지은 이름처럼 정성스러운 삶을 살아가렴."},
  {name:"여울이",tag:"공용",meaning:"잔잔하지만 힘 있게 흐르는 물처럼 살길 바라는 태명",blessing:"잔잔하면서도 꾸준한 힘으로 나아가는 삶이 되길."},
  {name:"단비",tag:"딸",meaning:"가뭄 끝에 내리는 반가운 비, 귀한 존재라는 뜻",blessing:"메마른 곳에 생기를 주는 귀한 사람이 되렴."},
  {name:"산들이",tag:"공용",meaning:"산들바람처럼 편안함을 주는 존재라는 뜻",blessing:"곁에 있는 것만으로 편안함을 주는 사람이 되길."},
  {name:"가온이",tag:"공용",meaning:"가운데, 중심이라는 뜻의 순우리말",blessing:"흔들림 없이 중심을 잡는 삶을 살아가렴."},
  {name:"누리",tag:"공용",meaning:"세상을 뜻하는 순우리말",blessing:"온 세상을 품는 넓은 마음을 갖길."},
  {name:"한올이",tag:"공용",meaning:"하나뿐인 귀한 존재라는 뜻",blessing:"세상에 하나뿐인 너의 색깔로 살아가렴."},
  {name:"슬기",tag:"딸",meaning:"지혜롭게 자라길 바라는 순우리말 태명",blessing:"어떤 상황에서도 슬기롭게 헤쳐나가는 사람이 되렴."},
  {name:"든율이",tag:"아들",meaning:"든든하고 규율 있는 삶을 바라는 태명",blessing:"자유로우면서도 스스로를 다스릴 줄 아는 사람이 되렴."},
  {name:"새힘이",tag:"공용",meaning:"새로운 힘, 활력을 상징하는 태명",blessing:"지치지 않는 새 힘으로 매일을 살아가렴."},
  {name:"온새미로",tag:"공용",meaning:"언제나 변함없이라는 뜻의 순우리말",blessing:"변함없는 마음으로 오래도록 사랑받는 사람이 되길."},
  {name:"여명이",tag:"공용",meaning:"새벽의 첫 빛, 새로운 시작을 의미",blessing:"언제나 새로운 시작을 두려워하지 않는 사람이 되렴."},
  {name:"든보라",tag:"딸",meaning:"든든함과 고귀함을 함께 담은 태명",blessing:"고귀하면서도 든든한 존재로 자라나렴."},
  {name:"여울아",tag:"공용",meaning:"잔잔한 물결처럼 순리대로 흐르는 삶을 뜻함",blessing:"억지 부리지 않고도 자기 길을 찾아가는 사람이 되렴."},
  {name:"믿음이",tag:"공용",meaning:"신뢰받는 사람으로 자라길 바라는 태명",blessing:"누구에게나 믿음을 주는 사람으로 자라나렴."},
  {name:"다솔이",tag:"공용",meaning:"소나무처럼 사계절 푸르길 바라는 태명",blessing:"변치 않는 푸르름으로 오래도록 곁을 지키렴."},
  {name:"은결이",tag:"딸",meaning:"은빛으로 빛나는 결, 고운 마음결을 뜻함",blessing:"은은하지만 분명하게 빛나는 사람이 되길."},
  {name:"하람이",tag:"아들",meaning:"하늘이 내린 사람이라는 뜻",blessing:"하늘이 주신 재능을 세상에 아낌없이 나누렴."},
  {name:"다율이",tag:"공용",meaning:"모든 것에 감사하고 다 이루라는 뜻",blessing:"작은 것에도 감사할 줄 아는 넉넉한 사람이 되렴."},
  {name:"이슬이",tag:"딸",meaning:"맑고 영롱한 아침 이슬 같은 존재라는 뜻",blessing:"언제나 맑고 순수한 마음을 간직하며 살아가렴."},
  {name:"단단이",tag:"아들",meaning:"무엇에도 흔들리지 않는 단단함을 바라는 태명",blessing:"어떤 시련에도 부러지지 않는 단단한 사람이 되렴."},
  {name:"온결이",tag:"공용",meaning:"온전하고 고운 결을 지니라는 뜻",blessing:"겉과 속이 한결같이 고운 사람으로 자라나렴."},
  {name:"가득이",tag:"공용",meaning:"행복과 사랑이 가득하길 바라는 태명",blessing:"네 삶이 사랑과 행복으로 가득 채워지길."},
  {name:"여명주",tag:"딸",meaning:"새벽빛처럼 은은하고 귀한 존재라는 뜻",blessing:"은은하지만 결코 흐려지지 않는 빛이 되렴."},
  {name:"다훈이",tag:"아들",meaning:"따뜻한 가르침을 나누는 사람이 되길 바라는 태명",blessing:"지혜와 따뜻함을 함께 나누는 사람이 되렴."},
  {name:"보람이",tag:"공용",meaning:"삶에 보람을 느끼며 살길 바라는 태명",blessing:"무엇을 하든 스스로 보람을 찾는 삶이 되길."},
  {name:"다연이",tag:"딸",meaning:"곱고 부드러운 인연을 뜻하는 태명",blessing:"좋은 인연을 알아보고 소중히 여기는 사람이 되렴."},
  {name:"든지호",tag:"아들",meaning:"든든하고 호탕한 기상을 바라는 태명",blessing:"큰 그릇으로 세상을 품는 사람이 되렴."},
  {name:"미소",tag:"딸",meaning:"보는 이를 편안하게 하는 웃음을 뜻함",blessing:"네 미소 하나로 주변을 따뜻하게 만드는 사람이 되렴."},
  {name:"다올이",tag:"공용",meaning:"좋은 것이 다 온다는 뜻의 순우리말",blessing:"구하지 않아도 좋은 일들이 너를 찾아오길."},
  {name:"초롱이",tag:"딸",meaning:"초롱불처럼 맑고 밝은 존재라는 뜻",blessing:"어두운 곳에서도 밝음을 잃지 않는 사람이 되렴."},
  {name:"다진이",tag:"공용",meaning:"참되고 진실된 삶을 바라는 태명",blessing:"언제나 진실됨을 잃지 않는 사람으로 자라나렴."},
  {name:"든영이",tag:"공용",meaning:"영원히 든든하길 바라는 마음을 담은 태명",blessing:"시간이 지나도 변치 않는 든든함을 지니렴."},
  {name:"해온이",tag:"공용",meaning:"해처럼 따뜻함이 온다는 뜻",blessing:"네가 가는 곳마다 따뜻한 기운이 함께하길."},
  {name:"다율아",tag:"딸",meaning:"다정하고 조화로운 삶을 바라는 태명",blessing:"주변과 조화를 이루며 다정하게 살아가렴."},
  {name:"든하람",tag:"아들",meaning:"하늘이 내린 든든한 존재라는 뜻",blessing:"하늘이 주신 복을 든든하게 지켜나가렴."},
  {name:"은하",tag:"딸",meaning:"은하수처럼 크고 아름다운 꿈을 담은 태명",blessing:"은하수처럼 크고 반짝이는 꿈을 품고 살아가렴."},
  {name:"다무리",tag:"공용",meaning:"모든 일을 잘 마무리 짓는 사람이라는 뜻",blessing:"시작한 일을 끝까지 책임지는 사람이 되렴."},
  {name:"단결이",tag:"아들",meaning:"여럿을 하나로 모으는 힘을 뜻함",blessing:"사람들의 마음을 하나로 모으는 사람이 되렴."},
  {name:"다예",tag:"딸",meaning:"예쁘고 다정한 마음을 담은 태명",blessing:"다정한 마음으로 주변을 살피는 사람이 되렴."},
  {name:"새록이",tag:"공용",meaning:"새롭고 신선한 기운을 뜻하는 태명",blessing:"언제나 새로움을 두려워하지 않는 사람이 되렴."},
  {name:"든하늘",tag:"공용",meaning:"든든하고 넓은 하늘 같은 마음을 뜻함",blessing:"넓고 든든한 마음으로 사람들을 품는 삶이 되길."},
  {name:"고은이",tag:"딸",meaning:"곱고 은은한 매력을 지니라는 뜻",blessing:"화려하지 않아도 은은하게 빛나는 사람이 되렴."},
  {name:"다현이",tag:"공용",meaning:"지혜롭고 현명한 삶을 바라는 태명",blessing:"지혜롭게 판단하고 현명하게 살아가는 사람이 되렴."},
  {name:"든새롬",tag:"공용",meaning:"든든하면서도 늘 새로운 존재라는 뜻",blessing:"안정 속에서도 늘 새로움을 찾는 사람이 되렴."},
  {name:"라윤이",tag:"딸",meaning:"즐겁고 윤택한 삶을 바라는 태명",blessing:"풍요롭고 즐거운 나날들로 채워지길."},
  {name:"든민이",tag:"아들",meaning:"든든하고 백성을 아끼는 마음을 뜻함",blessing:"주변을 살피고 아끼는 마음 넓은 사람이 되렴."},
  {name:"예온이",tag:"딸",meaning:"예의 바르고 따뜻한 성품을 바라는 태명",blessing:"예의와 따뜻함을 함께 갖춘 사람이 되렴."},
  {name:"다온누리",tag:"공용",meaning:"온 세상에 좋은 것이 다 오길 바라는 태명",blessing:"온 세상 좋은 기운이 너에게 모이길."},
  {name:"든하율",tag:"공용",meaning:"든든하고 하늘의 이치를 따르는 삶을 뜻함",blessing:"순리를 따르면서도 흔들림 없는 삶이 되길."}
];

const PRICE = 9900;

function pick(i){
  const g = i.gender;
  const pool = g === "아들" ? NAME_BANK.filter(n => n.tag !== "딸")
             : g === "딸" ? NAME_BANK.filter(n => n.tag !== "아들") : NAME_BANK;
  const seedStr = i.dad + i.mom + i.due + g;
  let seed = 0;
  for (let k = 0; k < seedStr.length; k++) seed = (seed * 31 + seedStr.charCodeAt(k)) % 100000;
  const start = seed % pool.length;
  const out = [];
  for (let k = 0; k < 4; k++) out.push(pool[(start + k) % pool.length]);
  return out;
}
const keyOf = i => [i.dad, i.mom, i.due, i.gender].join('|');
const sign = (secret, orderId, key) =>
  crypto.createHmac('sha256', secret).update(orderId + '|' + key).digest('hex');
const clean = (s, n) => String(s == null ? '' : s).trim().slice(0, n);
function safeEqual(a, b){
  const x = Buffer.from(a), y = Buffer.from(b);
  return x.length === y.length && crypto.timingSafeEqual(x, y);
}

module.exports = async (req, res) => {
  res.setHeader('Cache-Control', 'no-store');
  const action = (req.query && req.query.action) || '';
  const secret = process.env.TOSS_SECRET_KEY || '';

  if (action === 'config') {
    return res.status(200).json({ clientKey: process.env.TOSS_CLIENT_KEY || '' });
  }
  if (req.method !== 'POST') return res.status(405).json({ error: 'POST only' });

  let b = req.body || {};
  if (typeof b === 'string') { try { b = JSON.parse(b); } catch (e) { b = {}; } }
  const input = {
    dad: clean(b.dad, 10), mom: clean(b.mom, 10), due: clean(b.due, 10),
    gender: ['아들', '딸', '모름'].includes(b.gender) ? b.gender : '모름'
  };
  if (!input.dad) return res.status(400).json({ error: '아빠 성을 입력해주세요.' });
  const key = keyOf(input);

  if (action === 'names') {
    const all = pick(input);
    if (b.token && b.orderId && secret) {
      const exp = sign(secret, String(b.orderId), key);
      if (safeEqual(exp, String(b.token))) return res.status(200).json({ paid: true, names: all });
    }
    return res.status(200).json({ paid: false, names: all.slice(0, 1) });
  }

  if (action === 'confirm') {
    const paymentKey = String(b.paymentKey || '');
    const orderId = String(b.orderId || '');
    if (!secret) return res.status(500).json({ error: '결제 설정이 아직 완료되지 않았습니다.' });
    if (!paymentKey || !/^taemyeong_[0-9A-Za-z_-]{3,50}$/.test(orderId))
      return res.status(400).json({ error: '결제 정보가 올바르지 않습니다.' });
    if (Number(b.amount) !== PRICE)
      return res.status(400).json({ error: '결제 금액이 올바르지 않습니다.' });
    try {
      const r = await fetch('https://api.tosspayments.com/v1/payments/confirm', {
        method: 'POST',
        headers: {
          Authorization: 'Basic ' + Buffer.from(secret + ':').toString('base64'),
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ paymentKey, orderId, amount: PRICE })
      });
      const d = await r.json();
      if (!r.ok) {
        const already = d && d.code === 'ALREADY_PROCESSED_PAYMENT';
        return res.status(400).json({
          error: already ? '이미 처리된 결제입니다. 결제하신 브라우저에서 같은 정보로 다시 입력하시면 열립니다.'
                         : ((d && d.message) || '결제 승인에 실패했습니다.')
        });
      }
      if (d.status !== 'DONE' || d.orderId !== orderId || Number(d.totalAmount) !== PRICE)
        return res.status(400).json({ error: '결제 승인 결과를 확인할 수 없습니다.' });
      return res.status(200).json({ ok: true, token: sign(secret, orderId, key), names: pick(input) });
    } catch (e) {
      return res.status(502).json({ error: '결제사 연결에 실패했습니다. 잠시 후 문의해 주세요.' });
    }
  }
  return res.status(404).json({ error: 'unknown action' });
};
