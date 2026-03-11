const now = new Date();

const i18n = {
  zh: {
    title: "TikTok 趋势洞察",
    tabs: ["Dashboard", "Trends", "趋势详情", "视频列表", "AI趋势榜", "AI周期分析", "爆款拆解", "账号监控", "告警中心", "收藏夹", "会员体系"],
    updatedAt: "最近更新时间",
    trendOverview: "当前趋势概览",
    topHashtags: "Top hashtags",
    topMusic: "Top music",
    topVideos: "Top videos",
    aiSummary: "AI 今日摘要",
    burstAlerts: "爆发趋势告警",
    filters: "筛选",
    sortBy: "排序",
    addMonitor: "添加监控账号",
    save: "保存",
    members: { free: "免费版", pro: "Pro", team: "Team" },
    plans: "会员权益",
    videoJump: "跳转原视频",
    favorite: "收藏",
    favorited: "已收藏",
    all: "全部",
    day1: "1天",
    day7: "7天",
    day14: "14天",
    day30: "30天",
  },
  en: {
    title: "TikTok Trend Insight",
    tabs: ["Dashboard", "Trends", "Trend Detail", "Video List", "AI Rankings", "AI Cycle Analysis", "Viral Breakdown", "Account Monitor", "Alert Center", "Favorites", "Membership"],
    updatedAt: "Last updated",
    trendOverview: "Trend Overview",
    topHashtags: "Top hashtags",
    topMusic: "Top music",
    topVideos: "Top videos",
    aiSummary: "AI Daily Summary",
    burstAlerts: "Burst trend alerts",
    filters: "Filter",
    sortBy: "Sort by",
    addMonitor: "Add monitor account",
    save: "Save",
    members: { free: "Free", pro: "Pro", team: "Team" },
    plans: "Membership",
    videoJump: "Open TikTok",
    favorite: "Favorite",
    favorited: "Favorited",
    all: "All",
    day1: "1 day",
    day7: "7 days",
    day14: "14 days",
    day30: "30 days",
  }
};

const videos = [
  {
    id: "v1",
    desc: "3秒学会这个转场🔥 #transition #editing",
    hashtag: "transition",
    music_title: "Future Beat",
    author_username: "editpro",
    play_count: 6400000,
    like_count: 524000,
    comment_count: 6800,
    share_count: 45200,
    favorite_count: 86000,
    followers: 1200000,
    length_sec: 12,
    publish_hour: 20,
    is_ad: false,
    video_url: "https://www.tiktok.com",
    growth: { h24: 0.45, d7: 1.8, d14: 2.3, d30: 2.9 }
  },
  {
    id: "v2",
    desc: "POV: 你终于做出了高蛋白早餐🥑 #mealprep",
    hashtag: "mealprep",
    music_title: "Chill Morning",
    author_username: "fitdaily",
    play_count: 2300000,
    like_count: 230000,
    comment_count: 9300,
    share_count: 22000,
    favorite_count: 42000,
    followers: 210000,
    length_sec: 28,
    publish_hour: 9,
    is_ad: false,
    video_url: "https://www.tiktok.com",
    growth: { h24: 0.3, d7: 1.1, d14: 1.5, d30: 1.8 }
  },
  {
    id: "v3",
    desc: "这个旅行拍法真的太电影感了 #travel #cinematic",
    hashtag: "travel",
    music_title: "Waves",
    author_username: "lensflow",
    play_count: 980000,
    like_count: 108000,
    comment_count: 2400,
    share_count: 8700,
    favorite_count: 12000,
    followers: 78000,
    length_sec: 42,
    publish_hour: 17,
    is_ad: true,
    video_url: "https://www.tiktok.com",
    growth: { h24: 0.18, d7: 0.7, d14: 1.0, d30: 1.1 }
  }
];

const state = {
  lang: "zh",
  tab: 0,
  membership: "free",
  favorites: JSON.parse(localStorage.getItem("tti-favorites") || "[]"),
  monitors: ["creator_lab"]
};

const membershipLimits = {
  free: { days: 7, monitor: 1, alerts: 1 },
  pro: { days: 30, monitor: 5, alerts: 10 },
  team: { days: 180, monitor: 20, alerts: 50 }
};

function metric(v) {
  const heat_score = v.play_count * 0.2 + v.like_count * 1.2 + v.comment_count * 2 + v.share_count * 2.2 + v.favorite_count * 2;
  const engagement_rate = (v.like_count + v.comment_count + v.share_count + v.favorite_count) / v.play_count;
  const trend_score = v.growth.h24 * 0.4 + v.growth.d7 * 0.3 + v.growth.d14 * 0.2 + v.growth.d30 * 0.1;
  const burst_score = trend_score * (1 + engagement_rate * 5);
  const sustainability_score = (v.growth.d14 + v.growth.d30) / 2;
  return { heat_score, engagement_rate, trend_score, burst_score, sustainability_score };
}

const enriched = videos.map(v => ({ ...v, ...metric(v) }));

function exposure(play) { return play > 5000000 ? "S" : play > 1000000 ? "A" : play > 200000 ? "B" : "C"; }
function authorTier(f) { return f > 1000000 ? "Mega" : f > 100000 ? "Mid" : f > 10000 ? "Micro" : "Nano"; }

function t(key) { return i18n[state.lang][key]; }

function renderTabs() {
  const tabs = document.getElementById("tabs");
  tabs.innerHTML = i18n[state.lang].tabs.map((name, i) => `<button class="tab-btn ${state.tab === i ? "active" : ""}" data-tab="${i}">${name}</button>`).join("");
  tabs.querySelectorAll("button").forEach(btn => btn.onclick = () => { state.tab = Number(btn.dataset.tab); render(); });
}

function dashboardView() {
  const hashtagRank = Object.entries(enriched.reduce((acc, v) => (acc[v.hashtag] = (acc[v.hashtag] || 0) + v.heat_score, acc), {})).sort((a,b)=>b[1]-a[1]);
  return `
  <div class="grid">
    <section class="card"><h3>${t("trendOverview")}</h3><div class="kpi">${Math.round(enriched.reduce((s,v)=>s+v.heat_score,0)).toLocaleString()}</div><div class="muted">heat_score</div><div class="mini-chart"></div></section>
    <section class="card"><h3>${t("topHashtags")}</h3>${hashtagRank.map(([h,s])=>`<div class="row"><span class="badge">#${h}</span><b>${Math.round(s).toLocaleString()}</b></div>`).join("")}</section>
    <section class="card"><h3>${t("topMusic")}</h3>${[...new Set(enriched.map(v=>v.music_title))].map(m=>`<div>${m}</div>`).join("")}</section>
    <section class="card"><h3>${t("aiSummary")}</h3><p>${state.lang==="zh"?"转场与效率型内容增长最快，建议结合热门音乐与短时长结构。":"Transition and efficiency-style content grows fastest. Pair trending audio with short formats."}</p></section>
    <section class="card alert"><h3>${t("burstAlerts")}</h3>${enriched.sort((a,b)=>b.burst_score-a.burst_score).slice(0,2).map(v=>`<div>🔥 #${v.hashtag} (${v.author_username})</div>`).join("")}</section>
    <section class="card"><h3>${t("updatedAt")}</h3><div>${now.toLocaleString()}</div></section>
  </div>`;
}

function trendsView() {
  return `<div class="grid">
    ${enriched.map(v => `<section class="card"><h3>#${v.hashtag}</h3><div class="row"><span class="badge">${exposure(v.play_count)}</span><span class="badge">${authorTier(v.followers)}</span></div><p>24h: ${(v.growth.h24*100).toFixed(1)}% | 7d: ${(v.growth.d7*100).toFixed(1)}%</p><div class="mini-chart"></div></section>`).join("")}
  </div>`;
}

function detailView() {
  const v = enriched.sort((a,b)=>b.trend_score-a.trend_score)[0];
  return `<section class="card"><h2>#${v.hashtag}</h2><p>heat_score: ${Math.round(v.heat_score)}</p><p>trend_score: ${v.trend_score.toFixed(2)}</p><p>sustainability_score: ${v.sustainability_score.toFixed(2)}</p><p>${state.lang==='zh'?'AI 结论：该趋势由短时长高转发驱动，仍在增长窗口。':'AI insight: this trend is fueled by short-form sharing and remains in growth window.'}</p></section>`;
}

function videoListView() {
  const rows = enriched.map(v => `<tr>
    <td>${v.desc}</td><td>${v.author_username}</td><td>${v.play_count.toLocaleString()}</td><td>${((v.engagement_rate)*100).toFixed(2)}%</td><td>${v.publish_hour}:00</td>
    <td><a href="${v.video_url}" target="_blank" rel="noopener">${t("videoJump")}</a></td>
    <td><button data-fav="${v.id}">${state.favorites.includes(v.id)?t("favorited"):t("favorite")}</button></td></tr>`).join("");
  return `<section class="card"><h3>${t("filters")} / ${t("sortBy")}</h3><p class="muted">heat_score desc</p><table class="table"><thead><tr><th>Video</th><th>Author</th><th>Play</th><th>ER</th><th>Time</th><th>Link</th><th>Fav</th></tr></thead><tbody>${rows}</tbody></table></section>`;
}

function aiRankView() {
  const top = [...enriched].sort((a,b)=>b.trend_score-a.trend_score);
  return `<div class="grid">${[
    ["Top Trends", top],
    ["Opportunity", [...enriched].sort((a,b)=>b.sustainability_score-a.sustainability_score)],
    ["Burst", [...enriched].sort((a,b)=>b.burst_score-a.burst_score)],
    ["Risk", [...enriched].sort((a,b)=>a.engagement_rate-b.engagement_rate)]
  ].map(([name,arr])=>`<section class="card"><h3>${name}</h3>${arr.slice(0,3).map(v=>`<div>#${v.hashtag} - ${v.author_username}</div>`).join('')}<p class="muted">${state.lang==='zh'?'建议：优先复用前2名结构并A/B测试标题。':'Action: reuse top-2 structures and A/B test hooks.'}</p></section>`).join('')}</div>`;
}

function aiCycleView() {
  return `<section class="card"><h3>${i18n[state.lang].tabs[5]}</h3>
  <div class="row"><span class="badge">${t('day1')}</span><span class="badge">${t('day7')}</span><span class="badge">${t('day14')}</span><span class="badge">${t('day30')}</span></div>
  <p>${state.lang==='zh'?'过去7天：健身餐和转场教程增长显著，旅行内容趋于平稳。':'Last 7 days: mealprep and transition tutorials grew strongly; travel stabilized.'}</p>
  </section>`;
}

function viralView() {
  const v = enriched[0];
  return `<section class="card"><h3>${i18n[state.lang].tabs[6]}</h3>
  <p>${v.desc}</p><p>length: ${v.length_sec}s, emoji: ${/\p{Emoji}/u.test(v.desc) ? 'yes':'no'}, hashtag count: ${(v.desc.match(/#/g)||[]).length}, ad: ${v.is_ad}</p>
  <p>${state.lang==='zh'?'可借鉴：前3秒强钩子 + 节奏变化 + 明确CTA。':'Takeaways: strong 3s hook + pace shifts + explicit CTA.'}</p></section>`;
}

function monitorView() {
  const limit = membershipLimits[state.membership];
  const locked = state.monitors.length >= limit.monitor;
  return `<section class="card ${locked?'locked':''}"><h3>${i18n[state.lang].tabs[7]}</h3>
  <div>${state.monitors.map(a=>`<div>@${a}</div>`).join('')}</div>
  <div class="row"><input id="monitor-input" placeholder="creator_name" /><button id="monitor-add">${t('addMonitor')}</button></div>
  <p class="muted">limit: ${limit.monitor}</p></section>`;
}

function alertView() {
  const limit = membershipLimits[state.membership];
  const alerts = [
    "#transition burst +45%",
    "#travel slowdown -12%",
    "@creator_lab engagement anomaly"
  ];
  return `<section class="card ${limit.alerts<3?'locked':''}"><h3>${i18n[state.lang].tabs[8]}</h3>${alerts.slice(0, limit.alerts).map(a=>`<div class='row'>⚠️ ${a}</div>`).join('')}</section>`;
}

function favoriteView() {
  const list = enriched.filter(v=>state.favorites.includes(v.id));
  return `<section class="card"><h3>${i18n[state.lang].tabs[9]}</h3>${list.length?list.map(v=>`<div>#${v.hashtag} - ${v.desc}</div>`).join(''):'<p class="muted">Empty</p>'}</section>`;
}

function membershipView() {
  return `<div class="grid">${Object.entries(membershipLimits).map(([plan,val])=>`<section class="card"><h3>${i18n[state.lang].members[plan]}</h3><p>${val.days}d history</p><p>monitor: ${val.monitor}</p><p>alerts: ${val.alerts}</p></section>`).join('')}</div>`;
}

function renderBody() {
  const views = [dashboardView, trendsView, detailView, videoListView, aiRankView, aiCycleView, viralView, monitorView, alertView, favoriteView, membershipView];
  document.getElementById("app").innerHTML = views[state.tab]();

  document.querySelectorAll("button[data-fav]").forEach(btn => {
    btn.onclick = () => {
      const id = btn.dataset.fav;
      state.favorites = state.favorites.includes(id) ? state.favorites.filter(v=>v!==id) : [...state.favorites, id];
      localStorage.setItem("tti-favorites", JSON.stringify(state.favorites));
      renderBody();
    };
  });

  const addBtn = document.getElementById("monitor-add");
  if (addBtn) {
    addBtn.onclick = () => {
      const input = document.getElementById("monitor-input");
      if (!input.value.trim()) return;
      const limit = membershipLimits[state.membership].monitor;
      if (state.monitors.length < limit) state.monitors.push(input.value.trim());
      renderBody();
    };
  }
}

function render() {
  document.getElementById("app-title").textContent = i18n[state.lang].title;
  const memberSelect = document.getElementById("membership-switcher");
  memberSelect.innerHTML = Object.keys(i18n[state.lang].members).map(m => `<option value="${m}" ${state.membership===m?'selected':''}>${i18n[state.lang].members[m]}</option>`).join("");
  renderTabs();
  renderBody();
}

document.getElementById("language-switcher").onchange = (e) => { state.lang = e.target.value; render(); };
document.getElementById("membership-switcher").onchange = (e) => { state.membership = e.target.value; render(); };

render();
