const TEXT = {
  navHome: "首页",
  navAbout: "关于",
  navContact: "联系",
  heroSub: "欢迎来到",
  heroTitle: "一个更平静的 <span class=\"gradient\">数字空间</span>",
  heroDesc: "ainanocat 的个人网站。用于展示作品、服务与思考，用更克制的视觉，保持专注与呼吸感。",
  featureTitle: "精选内容",
  card1Title: "作品展示",
  card1Desc: "放置你的设计、开发或内容项目。每个作品只保留关键价值，不制造信息噪音。",
  card2Title: "服务能力",
  card2Desc: "清晰列出你能提供的服务：网站开发、品牌视觉、咨询支持或长期协作。",
  card3Title: "合作方式",
  card3Desc: "简化沟通流程：先留言，再交流，再开始。平稳、透明、可持续。",
  boardTitle: "留言板",
  boardDesc: "欢迎留下合作意向、建议或一句问候。留言将保存在当前浏览器中。",
  namePlaceholder: "你的名字",
  messagePlaceholder: "写下你的留言...",
  submitBtn: "发布",
  emptyMessage: "还没有留言，来留下第一条吧。",
  errorRequired: "请填写名字和留言内容。",
  aboutTitle: "关于我",
  aboutIntro: "我专注于构建干净、轻量、可持续的数字体验。",
  aboutList1: "视觉表达克制，内容信息清晰。",
  aboutList2: "开发流程稳定，交付节奏可预测。",
  aboutList3: "重视长期维护，不做短期堆砌。",
  contactTitle: "联系我",
  contactIntro: "如果你想合作或交流，欢迎通过以下方式联系。",
  contactEmailLabel: "邮箱",
  contactWeChatLabel: "微信",
  contactGithubLabel: "代码仓库",
  footerLeft: "© 2026 ainanocat",
  footerRight: "平静、专注、清晰"
};

const STORAGE_KEY = "ainanocat_guestbook_v1";
const currentLang = "zh";

function safeLoadMessages() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch (e) {
    return [];
  }
}

function saveMessages(messages) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
}

function escapeHtml(value) {
  const div = document.createElement("div");
  div.textContent = value;
  return div.innerHTML;
}

function formatTime(timestamp) {
  const date = new Date(timestamp);
  return date.toLocaleString("zh-CN", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit"
  });
}

function renderMessages() {
  const messageList = document.getElementById("messageList");
  if (!messageList) return;

  const data = safeLoadMessages();
  messageList.innerHTML = "";

  if (data.length === 0) {
    const empty = document.createElement("li");
    empty.className = "empty";
    empty.textContent = TEXT.emptyMessage;
    messageList.appendChild(empty);
    return;
  }

  data.slice().reverse().forEach((item) => {
    const li = document.createElement("li");
    li.className = "message-item";
    li.innerHTML = `
      <div class="message-meta">${escapeHtml(item.name)} · ${formatTime(item.time)}</div>
      <div class="message-text">${escapeHtml(item.message)}</div>
    `;
    messageList.appendChild(li);
  });
}

function applyLanguage() {
  const locale = TEXT;
  document.documentElement.lang = "zh-CN";

  document.querySelectorAll("[data-i18n]").forEach((node) => {
    const key = node.getAttribute("data-i18n");
    node.textContent = locale[key] || "";
  });

  document.querySelectorAll("[data-i18n-html]").forEach((node) => {
    const key = node.getAttribute("data-i18n-html");
    node.innerHTML = locale[key] || "";
  });

  const nameInput = document.getElementById("nameInput");
  const messageInput = document.getElementById("messageInput");
  if (nameInput) nameInput.placeholder = locale.namePlaceholder;
  if (messageInput) messageInput.placeholder = locale.messagePlaceholder;

  renderMessages();
}

function initMessageBoard() {
  const messageForm = document.getElementById("messageForm");
  const nameInput = document.getElementById("nameInput");
  const messageInput = document.getElementById("messageInput");
  const errorText = document.getElementById("errorText");
  if (!messageForm || !nameInput || !messageInput || !errorText) return;

  messageForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const name = nameInput.value.trim();
    const message = messageInput.value.trim();

    if (!name || !message) {
      errorText.textContent = TEXT.errorRequired;
      return;
    }

    const data = safeLoadMessages();
    data.push({
      name,
      message,
      time: Date.now()
    });
    saveMessages(data);

    nameInput.value = "";
    messageInput.value = "";
    errorText.textContent = "";
    renderMessages();
  });
}

function initApp() {
  if (typeof window.renderNavbar === "function") {
    window.renderNavbar();
  }
  initMessageBoard();
  applyLanguage();
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initApp);
} else {
  initApp();
}
