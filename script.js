const ancientTimes = [ // 古代时辰对应表
  "子时 (23:00 - 01:00)",
  "丑时 (01:00 - 03:00)",
  "寅时 (03:00 - 05:00)",
  "卯时 (05:00 - 07:00)",
  "辰时 (07:00 - 09:00)",
  "巳时 (09:00 - 11:00)",
  "午时 (11:00 - 13:00)",
  "未时 (13:00 - 15:00)",
  "申时 (15:00 - 17:00)",
  "酉时 (17:00 - 19:00)",
  "戌时 (19:00 - 21:00)",
  "亥时 (21:00 - 23:00)"
];

// 时辰对应的诗词
const poetryData = [
  { content: "夜半钟声到客船，月落乌啼霜满天。", author: "张继" },
  { content: "鸡鸣紫陌曙光寒，莺啭皇州春色阑。", author: "王维" },
  { content: "平明寻白羽，没在石棱中。", author: "卢纶" },
  { content: "日出江花红胜火，春来江水绿如蓝。", author: "白居易" },
  { content: "朝辞白帝彩云间，千里江陵一日还。", author: "李白" },
  { content: "日高花影重，风暖鸟声碎。", author: "杜甫" },
  { content: "午梦初回理旧琴，茶烟轻飏落花风。", author: "陆游" },
  { content: "日长篱落无人过，惟有蜻蜓蛱蝶飞。", author: "范成大" },
  { content: "夕阳无限好，只是近黄昏。", author: "李商隐" },
  { content: "月上柳梢头，人约黄昏后。", author: "欧阳修" },
  { content: "夜阑卧听风吹雨，铁马冰河入梦来。", author: "陆游" },
  { content: "夜深千帐灯，风一更，雪一更。", author: "纳兰性德" }
];

// 时辰含义描述
const timeDescriptions = {
  "子时": "子时是第1个时辰，夜深人静，万物沉睡。",
  "丑时": "丑时是第2个时辰，人们熟睡，大地寂静。",
  "寅时": "寅时是第3个时辰，黎明将至，万物苏醒。",
  "卯时": "卯时是第4个时辰，太阳初升，新的一天开始。",
  "辰时": "辰时是第5个时辰，人们开始一天的工作。",
  "巳时": "巳时是第6个时辰，阳光明媚，精力充沛。",
  "午时": "午时是第7个时辰，正午时分，适合午休。",
  "未时": "未时是第8个时辰，午后时光，继续忙碌。",
  "申时": "申时是第9个时辰，太阳西斜，工作接近尾声。",
  "酉时": "酉时是第10个时辰，日落西山，准备晚餐。",
  "戌时": "戌时是第11个时辰，结束一天工作，准备休息。",
  "亥时": "亥时是第12个时辰，夜深人静，进入梦乡。"
};

// 更新时间显示
function updateTime() {
  const now = new Date();
  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');
  const seconds = String(now.getSeconds()).padStart(2, '0');
  document.getElementById('current-time').textContent = `${hours}:${minutes}:${seconds}`;

  // 显示当前日期
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  document.getElementById('current-date').textContent = `${year}-${month}-${day}`;

  // 计算古代时辰
  const hour = now.getHours();
  const ancientTimeIndex = Math.floor((hour + 1) / 2) % 12;
  const ancientTime = ancientTimes[ancientTimeIndex];
  document.getElementById('ancient-time').textContent = ancientTime;

  // 显示对应的诗词
  updatePoetry(poetryData[ancientTimeIndex]);

  // 更新时辰描述
  updateTimeDescription(ancientTime);
}

// 更新诗词内容
function updatePoetry(poetryData) {
  const poetryContent = document.getElementById("poetry-content");
  const poetryAuthor = document.getElementById("poetry-author");

  // 更新诗词内容
  poetryContent.textContent = poetryData.content || "加载中...";

  // 更新作者信息
  if (poetryData.author) {
    poetryAuthor.textContent = `—— ${poetryData.author}`;
  } else {
    poetryAuthor.textContent = "—— 未知"; // 如果没有作者信息，显示"未知"
  }
}


// 更新时辰描述
function updateTimeDescription(ancientTime) {
  const timeDescription = document.getElementById("time-description");
  const timeKey = ancientTime.split(" ")[0]; // 提取时辰部分
  timeDescription.textContent = timeDescriptions[timeKey] || "当前时辰信息未知。";
}

// 初始加载时更新时间
updateTime();

// 每秒更新一次时间
setInterval(updateTime, 1000);

// 切换显示对应的部分
function showSection(sectionId) {
  // 隐藏所有部分
  document.querySelectorAll('main section').forEach(section => {
    section.style.display = 'none';
  });

  // 显示目标部分
  const targetSection = document.getElementById(sectionId);
  if (targetSection) {
    targetSection.style.display = 'block';
  }
}

// 为导航栏按钮添加点击事件
document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', (event) => {
    event.preventDefault(); // 阻止默认跳转行为
    const targetId = link.getAttribute('href').substring(1); // 获取目标部分的 id
    showSection(targetId);
  });
});

// 页面加载时默认显示"关于我"部分
window.onload = () => {
  updateTime();
  renderProjects();
  showSection('about-me');
};

// 项目点击事件处理
function handleProjectClick(projectId) {
  window.location.href = `project${projectId}.html`; // 跳转到 project1.html, project2.html 等
}

// 动态生成项目列表
function renderProjects() {
  const projects = [
    { id: 1, name: '智能客服系统', description: '一个基于 NLP 和 llama 的智能客服系统' },
    { id: 2, name: '智能魔镜项目', description: '一个软硬件协同的项目，使用 Vue.js 和 Django 开发' },
    { id: 3, name: '智能零售项目', description: '通过前沿技术为消费者打造便捷、个性化的购物体验，助力企业降本增效' },
    { id: 4, name: '智能办公协作机器⼈', description: '⽀持嵌套指令理解的多模态服务机器⼈' }
  ];

  const projectGrid = document.querySelector('.project-grid');
  projectGrid.innerHTML = projects
    .map(
      (project) => `
        <div class="project-card" onclick="handleProjectClick(${project.id})">
          <h3>${project.name}</h3>
          <p>${project.description}</p>
          <a href="#" class="project-link">查看详情 →</a>
        </div>
      `
    )
    .join('');
} 