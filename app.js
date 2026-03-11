const now = new Date();

const i18n = {
  zh: {
    title: "TikTok 趋势洞察",
    tabs: ["Dashboard", "Trends", "趋势详情", "视频列表", "AI趋势榜", "AI周期分析", "爆款拆解", "账号监控", "告警中心", "收藏夹", "会员体系"],
    updatedAt: "最近更新时间",
    trendOverview: "当前趋势概览",
    topHashtags: "Top hashtags",
    topMusic: "Top music",
    topVideos: "Top 视频",
    aiSummary: "AI 今日摘要",
    burstAlerts: "爆发趋势告警",
    filters: "筛选",
    sortBy: "排序",
    addMonitor: "添加监控账号",
    members: { free: "免费版", pro: "Pro", team: "Team" },
    videoJump: "跳转原视频",
    favorite: "收藏",
    favorited: "已收藏",
    all: "全部",
    day1: "1天",
    day7: "7天",
    day14: "14天",
    day30: "30天",
    hashtag: "话题",
    placeholder: "请输入 creator_name",
    empty: "暂无数据",
    emptyFavorite: "还没有收藏视频",
    rankTop: "综合榜",
    rankOpportunity: "机会榜",
    rankBurst: "爆发榜",
    rankRisk: "风险榜",
    videoCol: "视频",
    authorCol: "作者",
    playCol: "播放",
    timeCol: "发布时间",
    linkCol: "链接",
    favCol: "收藏",
    noPermission: "当前会员等级限制展示",
    historyDays: "历史窗口",
    monitorLimit: "监控上限",
    alertLimit: "告警上限",
    sortHeat: "按热度",
    sortER: "按互动率",
    sortTrend: "按趋势分",
    search: "搜索",
    searchPlaceholder: "按视频描述/作者搜索",
    remove: "移除",
    monitorExists: "该账号已存在",
    monitorInvalid: "仅支持字母、数字、下划线和点",
    monitorAdded: "已添加监控账号",
    monitorRemoved: "已移除监控账号"
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
    members: { free: "Free", pro: "Pro", team: "Team" },
    videoJump: "Open TikTok",
    favorite: "Favorite",
    favorited: "Favorited",
    all: "All",
    day1: "1 day",
    day7: "7 days",
    day14: "14 days",
    day30: "30 days",
    hashtag: "Hashtag",
    placeholder: "Input creator_name",
    empty: "No data",
    emptyFavorite: "No favorite videos yet",
    rankTop: "Top Trends",
    rankOpportunity: "Opportunity",
    rankBurst: "Burst",
    rankRisk: "Risk",
    videoCol: "Video",
    authorCol: "Author",
    playCol: "Play",
    timeCol: "Time",
    linkCol: "Link",
    favCol: "Favorite",
    noPermission: "Current plan limits this view",
    historyDays: "History window",
    monitorLimit: "Monitor limit",
    alertLimit: "Alert limit",
    sortHeat: "Heat",
    sortER: "Engagement",
    sortTrend: "Trend score",
    search: "Search",
    searchPlaceholder: "Search desc / author",
    remove: "Remove",
    monitorExists: "Account already exists",
    monitorInvalid: "Only letters, numbers, underscore and dot are supported",
    monitorAdded: "Monitor account added",
    monitorRemoved: "Monitor account removed"
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
  lang: localStorage.getItem("tti-lang") || "zh",
  tab: 0,
  membership: localStorage.getItem("tti-membership") || "free",
  favorites: JSON.parse(localStorage.getItem("tti-favorites") || "[]"),
  monitors: JSON.parse(localStorage.getItem("tti-monitors") || '["creator_lab"]'),
  hashtagFilter: localStorage.getItem("tti-hashtag-filter") || "all",
  sortBy: localStorage.getItem("tti-sort-by") || "heat",
  query: localStorage.getItem("tti-query") || "",
  status: ""
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

const enriched = videos.map((v) => ({ ...v, ...metric(v) }));

function exposure(play) {
  return play > 5000000 ? "S" : play > 1000000 ? "A" : play > 200000 ? "B" : "C";
}
function authorTier(f) {
  return f > 1000000 ? "Mega" : f > 100000 ? "Mid" : f > 10000 ? "Micro" : "Nano";
}

function t(key) {
  return i18n[state.lang][key];
}

function renderTabs() {
  const tabs = document.getElementById("tabs");
  tabs.innerHTML = i18n[state.lang].tabs
    .map((name, i) => `<button class="tab-btn ${state.tab === i ? "active" : ""}" data-tab="${i}">${name}</button>`)
    .join("");
  tabs.querySelectorAll("button").forEach((btn) =>
    (btn.onclick = () => {
      state.tab = Number(btn.dataset.tab);
      render();
    })
  );
}

function dashboardView() {
  const hashtagRank = Object.entries(enriched.reduce((acc, v) => ((acc[v.hashtag] = (acc[v.hashtag] || 0) + v.heat_score), acc), {})).sort((a, b) => b[1] - a[1]);
  const topVideos = [...enriched].sort((a, b) => b.play_count - a.play_count).slice(0, 3);
  return `
  <div class="grid">
    <section class="card"><h3>${t("trendOverview")}</h3><div class="kpi">${Math.round(enriched.reduce((s, v) => s + v.heat_score, 0)).toLocaleString()}</div><div class="muted">heat_score</div><div class="mini-chart"></div></section>
    <section class="card"><h3>${t("topHashtags")}</h3>${hashtagRank.map(([h, s]) => `<div class="row"><span class="badge">#${h}</span><b>${Math.round(s).toLocaleString()}</b></div>`).join("")}</section>
    <section class="card"><h3>${t("topMusic")}</h3>${[...new Set(enriched.map((v) => v.music_title))].map((m) => `<div>${m}</div>`).join("")}</section>
    <section class="card"><h3>${t("topVideos")}</h3>${topVideos
      .map((v) => `<div class="row"><span class="badge">#${v.hashtag}</span><b>${v.play_count.toLocaleString()}</b></div>`)
      .join("")}</section>
    <section class="card"><h3>${t("aiSummary")}</h3><p>${state.lang === "zh" ? "转场与效率型内容增长最快，建议结合热门音乐与短时长结构。" : "Transition and efficiency-style content grows fastest. Pair trending audio with short formats."}</p></section>
    <section class="card alert"><h3>${t("burstAlerts")}</h3><div>#transition +45%</div><div>#mealprep +31%</div></section>
    <section class="card"><h3>${t("updatedAt")}</h3><div>${now.toLocaleString()}</div><p class="muted">${videos.length} videos / ${new Set(videos.map((v) => v.author_username)).size} creators</p></section>
  </div>`;
}

function trendsView() {
  return `<div class="grid">
    ${enriched
      .map(
        (v) => `<section class="card"><h3>#${v.hashtag}</h3><div class="row"><span class="badge">${exposure(v.play_count)}</span><span class="badge">${authorTier(v.followers)}</span></div><p>24h: ${(v.growth.h24 * 100).toFixed(1)}% | 7d: ${(v.growth.d7 * 100).toFixed(1)}%</p><div class="mini-chart"></div></section>`
      )
      .join("")}
  </div>`;
}

function detailView() {
  const v = [...enriched].sort((a, b) => b.trend_score - a.trend_score)[0];
  return `<section class="card"><h2>#${v.hashtag}</h2><p>heat_score: ${Math.round(v.heat_score)}</p><p>trend_score: ${v.trend_score.toFixed(2)}</p><p>sustainability_score: ${v.sustainability_score.toFixed(2)}</p><p>${state.lang === "zh" ? "AI 结论：该趋势由短时长高转发驱动，仍在增长窗口。" : "AI insight: this trend is fueled by short-form sharing and remains in growth window."}</p></section>`;
}

function sortedVideos(list) {
  const keyMap = {
    heat: (v) => v.heat_score,
    er: (v) => v.engagement_rate,
    trend: (v) => v.trend_score
  };
  return [...list].sort((a, b) => keyMap[state.sortBy](b) - keyMap[state.sortBy](a));
}

function videoListView() {
  const filtered = state.hashtagFilter === "all" ? enriched : enriched.filter((v) => v.hashtag === state.hashtagFilter);
  const queried = filtered.filter((v) => {
    if (!state.query.trim()) return true;
    const q = state.query.toLowerCase();
    return v.desc.toLowerCase().includes(q) || v.author_username.toLowerCase().includes(q);
  });
  const list = sortedVideos(queried);
  const rows = list
    .map(
      (v) => `<tr>
    <td>${v.desc}</td><td>${v.author_username}</td><td>${v.play_count.toLocaleString()}</td><td>${(v.engagement_rate * 100).toFixed(2)}%</td><td>${v.publish_hour}:00</td>
    <td><a href="${v.video_url}" target="_blank" rel="noopener">${t("videoJump")}</a></td>
    <td><button data-fav="${v.id}">${state.favorites.includes(v.id) ? t("favorited") : t("favorite")}</button></td></tr>`
    )
    .join("");

  return `<section class="card"><h3>${t("filters")} / ${t("sortBy")}</h3>
  <div class="row controls-inline">
    <label>${t("hashtag")}
      <select id="hashtag-filter">
        <option value="all" ${state.hashtagFilter === "all" ? "selected" : ""}>${t("all")}</option>
        ${[...new Set(enriched.map((v) => v.hashtag))].map((h) => `<option value="${h}" ${state.hashtagFilter === h ? "selected" : ""}>#${h}</option>`).join("")}
      </select>
    </label>
    <label>${t("sortBy")}
      <select id="sort-by">
        <option value="heat" ${state.sortBy === "heat" ? "selected" : ""}>${t("sortHeat")}</option>
        <option value="er" ${state.sortBy === "er" ? "selected" : ""}>${t("sortER")}</option>
        <option value="trend" ${state.sortBy === "trend" ? "selected" : ""}>${t("sortTrend")}</option>
      </select>
    </label>
    <label>${t("search")}
      <input id="search-query" value="${state.query}" placeholder="${t("searchPlaceholder")}" />
    </label>
  </div>
  <table class="table"><thead><tr><th>${t("videoCol")}</th><th>${t("authorCol")}</th><th>${t("playCol")}</th><th>ER</th><th>${t("timeCol")}</th><th>${t("linkCol")}</th><th>${t("favCol")}</th></tr></thead><tbody>${rows || `<tr><td colspan="7" class="muted">${t("empty")}</td></tr>`}</tbody></table></section>`;
}

function aiRankView() {
  const top = [...enriched].sort((a, b) => b.trend_score - a.trend_score);
  return `<div class="grid">${[
    [t("rankTop"), top],
    [t("rankOpportunity"), [...enriched].sort((a, b) => b.sustainability_score - a.sustainability_score)],
    [t("rankBurst"), [...enriched].sort((a, b) => b.burst_score - a.burst_score)],
    [t("rankRisk"), [...enriched].sort((a, b) => a.engagement_rate - b.engagement_rate)]
  ]
    .map(
      ([name, arr]) =>
        `<section class="card"><h3>${name}</h3>${arr
          .slice(0, 3)
          .map((v) => `<div>#${v.hashtag} - ${v.author_username}</div>`)
          .join("")}<p class="muted">${state.lang === "zh" ? "建议：优先复用前2名结构并A/B测试标题。" : "Action: reuse top-2 structures and A/B test hooks."}</p></section>`
    )
    .join("")}</div>`;
}

function aiCycleView() {
  return `<section class="card"><h3>${i18n[state.lang].tabs[5]}</h3>
  <div class="row"><span class="badge">${t("day1")}</span><span class="badge">${t("day7")}</span><span class="badge">${t("day14")}</span><span class="badge">${t("day30")}</span></div>
  <p>${state.lang === "zh" ? "过去7天：健身餐和转场教程增长显著，旅行内容趋于平稳。" : "Last 7 days: mealprep and transition tutorials grew strongly; travel stabilized."}</p>
  </section>`;
}

function viralView() {
  const v = enriched[0];
  return `<section class="card"><h3>${i18n[state.lang].tabs[6]}</h3>
  <p>${v.desc}</p><p>length: ${v.length_sec}s, emoji: ${/\p{Emoji}/u.test(v.desc) ? "yes" : "no"}, hashtag count: ${(v.desc.match(/#/g) || []).length}, ad: ${v.is_ad}</p>
  <p>${state.lang === "zh" ? "可借鉴：前3秒强钩子 + 节奏变化 + 明确CTA。" : "Takeaways: strong 3s hook + pace shifts + explicit CTA."}</p></section>`;
}

function monitorView() {
  const limit = membershipLimits[state.membership];
  const locked = state.monitors.length >= limit.monitor;
  return `<section class="card ${locked ? "locked" : ""}"><h3>${i18n[state.lang].tabs[7]}</h3>
  <div>${state.monitors.map((a) => `<div class="row"><span>@${a}</span><button data-remove-monitor="${a}">${t("remove")}</button></div>`).join("")}</div>
  <div class="row"><input id="monitor-input" placeholder="${t("placeholder")}" /><button id="monitor-add">${t("addMonitor")}</button></div>
  <p class="muted">limit: ${limit.monitor}</p>${locked ? `<p class="muted">${t("noPermission")}</p>` : ""}
  ${state.status ? `<p class="success">${state.status}</p>` : ""}</section>`;
}

function alertView() {
  const limit = membershipLimits[state.membership];
  const trendAlerts = [...enriched]
    .sort((a, b) => b.burst_score - a.burst_score)
    .slice(0, 2)
    .map((v) => `#${v.hashtag} burst +${(v.growth.h24 * 100).toFixed(1)}%`);
  const riskAlert = [...enriched].sort((a, b) => a.engagement_rate - b.engagement_rate)[0];
  const monitorAlerts = state.monitors.slice(0, 2).map((m) => `@${m} watchlist update`);
  const alerts = [...trendAlerts, `#${riskAlert.hashtag} low ER ${(riskAlert.engagement_rate * 100).toFixed(2)}%`, ...monitorAlerts];
  return `<section class="card ${limit.alerts < 3 ? "locked" : ""}"><h3>${i18n[state.lang].tabs[8]}</h3>${alerts
    .slice(0, limit.alerts)
    .map((a) => `<div class='row'>⚠️ ${a}</div>`)
    .join("")}</section>`;
}

function favoriteView() {
  const list = enriched.filter((v) => state.favorites.includes(v.id));
  return `<section class="card"><h3>${i18n[state.lang].tabs[9]}</h3>${
    list.length ? list.map((v) => `<div>#${v.hashtag} - ${v.desc}</div>`).join("") : `<p class="muted">${t("emptyFavorite")}</p>`
  }</section>`;
}

function membershipView() {
  return `<div class="grid">${Object.entries(membershipLimits)
    .map(
      ([plan, val]) => `
        <section class="card">
          <h3>${i18n[state.lang].members[plan]}</h3>
          <p>${t("historyDays")}: ${val.days}d</p>
          <p>${t("monitorLimit")}: ${val.monitor}</p>
          <p>${t("alertLimit")}: ${val.alerts}</p>
        </section>`
    )
    .join("")}</div>`;
}

function persistState() {
  localStorage.setItem("tti-lang", state.lang);
  localStorage.setItem("tti-membership", state.membership);
  localStorage.setItem("tti-monitors", JSON.stringify(state.monitors));
  localStorage.setItem("tti-favorites", JSON.stringify(state.favorites));
  localStorage.setItem("tti-hashtag-filter", state.hashtagFilter);
  localStorage.setItem("tti-sort-by", state.sortBy);
  localStorage.setItem("tti-query", state.query);
}

function renderBody() {
  const views = [dashboardView, trendsView, detailView, videoListView, aiRankView, aiCycleView, viralView, monitorView, alertView, favoriteView, membershipView];
  document.getElementById("app").innerHTML = views[state.tab]();

  document.querySelectorAll("button[data-fav]").forEach((btn) => {
    btn.onclick = () => {
      const id = btn.dataset.fav;
      state.favorites = state.favorites.includes(id) ? state.favorites.filter((v) => v !== id) : [...state.favorites, id];
      persistState();
      renderBody();
    };
  });

  const addBtn = document.getElementById("monitor-add");
  if (addBtn) {
    addBtn.onclick = () => {
      const input = document.getElementById("monitor-input");
      const monitorName = input.value.trim().replace(/^@/, "");
      if (!monitorName) return;
      const limit = membershipLimits[state.membership].monitor;
      const monitorRegex = /^[A-Za-z0-9_.]+$/;
      if (!monitorRegex.test(monitorName)) {
        state.status = t("monitorInvalid");
      } else if (state.monitors.includes(monitorName)) {
        state.status = t("monitorExists");
      } else if (state.monitors.length < limit) {
        state.monitors.push(monitorName);
        state.status = t("monitorAdded");
        persistState();
      }
      input.value = "";
      renderBody();
    };
  }

  document.querySelectorAll("button[data-remove-monitor]").forEach((btn) => {
    btn.onclick = () => {
      const monitor = btn.dataset.removeMonitor;
      state.monitors = state.monitors.filter((m) => m !== monitor);
      state.status = t("monitorRemoved");
      persistState();
      renderBody();
    };
  });

  const hashtagFilter = document.getElementById("hashtag-filter");
  if (hashtagFilter) {
    hashtagFilter.onchange = (e) => {
      state.hashtagFilter = e.target.value;
      persistState();
      renderBody();
    };
  }

  const sortBy = document.getElementById("sort-by");
  if (sortBy) {
    sortBy.onchange = (e) => {
      state.sortBy = e.target.value;
      persistState();
      renderBody();
    };
  }

  const queryInput = document.getElementById("search-query");
  if (queryInput) {
    queryInput.oninput = (e) => {
      state.query = e.target.value;
      persistState();
      renderBody();
    };
  }
}

function render() {
  document.getElementById("app-title").textContent = i18n[state.lang].title;
  const memberSelect = document.getElementById("membership-switcher");
  memberSelect.innerHTML = Object.keys(i18n[state.lang].members)
    .map((m) => `<option value="${m}" ${state.membership === m ? "selected" : ""}>${i18n[state.lang].members[m]}</option>`)
    .join("");
  renderTabs();
  renderBody();
}

document.getElementById("language-switcher").value = state.lang;
document.getElementById("language-switcher").onchange = (e) => {
  state.lang = e.target.value;
  persistState();
  render();
};
document.getElementById("membership-switcher").onchange = (e) => {
  state.membership = e.target.value;
  persistState();
  render();
};

render();
