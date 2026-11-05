/**
 * ============================================================================
 * STUDYSYNC - STUDENT PRODUCTIVITY DASHBOARD
 * Modern Full-Featured Client-Side Application
 * ============================================================================
 */

// Global App State
const AppState = {
  activeSection: 'dashboard',
  selectedPlannerDay: 'Monday',
  activeNoteId: null,
  charts: {
    dashboardWeekly: null,
    analyticsHours: null,
    analyticsSubject: null,
    analyticsPriority: null
  },
  timer: {
    duration: 25 * 60,
    remaining: 25 * 60,
    isRunning: false,
    intervalId: null,
    mode: 'pomodoro' // pomodoro, shortBreak, longBreak
  },
  data: {
    tasks: [],
    sessions: [],
    notes: [],
    user: {
      name: 'Ishwari W.',
      streak: 7,
      dailyTargetHours: 4.0,
      weeklyGoalHours: 25.0
    },
    weeklyLog: [
      { day: 'Mon', hours: 4.5, tasksDone: 3 },
      { day: 'Tue', hours: 5.0, tasksDone: 4 },
      { day: 'Wed', hours: 3.5, tasksDone: 2 },
      { day: 'Thu', hours: 6.0, tasksDone: 5 },
      { day: 'Fri', hours: 4.0, tasksDone: 3 },
      { day: 'Sat', hours: 2.5, tasksDone: 1 },
      { day: 'Sun', hours: 3.0, tasksDone: 2 }
    ]
  }
};

const STORAGE_KEY = 'STUDYSYNC_DASHBOARD_DATA_V2';

// Realistic Sample Seed Data
const DEFAULT_DATA = {
  tasks: [
    {
      id: 'task-1',
      title: 'Operating Systems: Implement Virtual Memory Paging',
      subject: 'Computer Science',
      priority: 'High',
      deadline: getFormattedDateOffset(1),
      time: '23:59',
      desc: 'Complete the LRU and FIFO page replacement simulation algorithms and generate analysis graph.',
      completed: false,
      createdAt: new Date().toISOString()
    },
    {
      id: 'task-2',
      title: 'Calculus III: Vector Fields & Green’s Theorem',
      subject: 'Mathematics',
      priority: 'High',
      deadline: getFormattedDateOffset(2),
      time: '18:00',
      desc: 'Finish textbook problem set Chapter 16 exercises 14 through 32.',
      completed: false,
      createdAt: new Date(Date.now() - 3600000 * 24).toISOString()
    },
    {
      id: 'task-3',
      title: 'Quantum Physics: Wave-Particle Duality Lab Report',
      subject: 'Physics',
      priority: 'Medium',
      deadline: getFormattedDateOffset(4),
      time: '17:00',
      desc: 'Draft discussion section comparing experimental double-slit interference with theoretical values.',
      completed: true,
      createdAt: new Date(Date.now() - 3600000 * 48).toISOString()
    },
    {
      id: 'task-4',
      title: 'Machine Learning: Train ResNet Model on CIFAR-10',
      subject: 'Computer Science',
      priority: 'Medium',
      deadline: getFormattedDateOffset(3),
      time: '20:00',
      desc: 'Tune learning rate schedulers and compare validation accuracy against baseline CNN.',
      completed: true,
      createdAt: new Date(Date.now() - 3600000 * 72).toISOString()
    },
    {
      id: 'task-5',
      title: 'World Literature: Analyze Post-Colonial Themes in Achebe',
      subject: 'Literature',
      priority: 'Low',
      deadline: getFormattedDateOffset(6),
      time: '23:59',
      desc: 'Outline primary essay thesis statement and cite three critical journal articles.',
      completed: false,
      createdAt: new Date(Date.now() - 3600000 * 12).toISOString()
    },
    {
      id: 'task-6',
      title: 'Organic Chemistry: Reaction Mechanisms Synthesis Practice',
      subject: 'Chemistry',
      priority: 'High',
      deadline: getFormattedDateOffset(0),
      time: '21:00',
      desc: 'Review Aldol condensation, Grignard reagents and retrosynthetic pathways for midterm exam.',
      completed: false,
      createdAt: new Date().toISOString()
    }
  ],
  sessions: [
    {
      id: 'sess-1',
      day: 'Monday',
      subject: 'Computer Science',
      topic: 'Data Structures: AVL Trees & Balance Rotations',
      startTime: '09:00',
      endTime: '11:00',
      duration: 2.0,
      status: 'Completed'
    },
    {
      id: 'sess-2',
      day: 'Monday',
      subject: 'Mathematics',
      topic: 'Multivariable Integration & Polar Coordinates',
      startTime: '14:00',
      endTime: '16:00',
      duration: 2.0,
      status: 'Completed'
    },
    {
      id: 'sess-3',
      day: 'Monday',
      subject: 'Physics',
      topic: 'Maxwell Equations & Electromagnetic Waves',
      startTime: '17:00',
      endTime: '18:30',
      duration: 1.5,
      status: 'InProgress'
    },
    {
      id: 'sess-4',
      day: 'Tuesday',
      subject: 'Computer Science',
      topic: 'Database Systems: SQL Joins, Indexing & B-Trees',
      startTime: '10:00',
      endTime: '12:30',
      duration: 2.5,
      status: 'Scheduled'
    },
    {
      id: 'sess-5',
      day: 'Tuesday',
      subject: 'Chemistry',
      topic: 'Thermodynamics & Gibbs Free Energy',
      startTime: '15:00',
      endTime: '17:00',
      duration: 2.0,
      status: 'Scheduled'
    },
    {
      id: 'sess-6',
      day: 'Wednesday',
      subject: 'Mathematics',
      topic: 'Linear Algebra: Eigenvalues & Diagonalization',
      startTime: '09:30',
      endTime: '12:00',
      duration: 2.5,
      status: 'Scheduled'
    },
    {
      id: 'sess-7',
      day: 'Thursday',
      subject: 'Computer Science',
      topic: 'Distributed Systems: Raft Consensus & RPCs',
      startTime: '13:00',
      endTime: '16:00',
      duration: 3.0,
      status: 'Scheduled'
    },
    {
      id: 'sess-8',
      day: 'Friday',
      subject: 'Physics',
      topic: 'Statistical Mechanics & Entropy Models',
      startTime: '11:00',
      endTime: '13:00',
      duration: 2.0,
      status: 'Scheduled'
    }
  ],
  notes: [
    {
      id: 'note-1',
      title: 'Algorithm Complexities Quick Sheet',
      subject: 'Computer Science',
      content: `# Algorithm Complexities Reference\n\n- QuickSort: Average O(n log n), Worst O(n^2)\n- MergeSort: Guaranteed O(n log n), Space O(n)\n- Binary Search: O(log n)\n- Dijkstra Algorithm: O((V + E) log V) with min-heap\n- Bellman-Ford: O(V * E) detects negative cycles\n\n*Key Tip:* Remember that hash tables degrade to O(n) under heavy collision clusters!`,
      pinned: true,
      lastEdited: new Date(Date.now() - 3600000 * 3).toISOString()
    },
    {
      id: 'note-2',
      title: 'Calculus III: Vector Calculus Identities',
      subject: 'Mathematics',
      content: `### Essential Formulas for Midterm\n\n1. Div(Curl F) = 0 (Divergence of a curl is always zero)\n2. Curl(Grad f) = 0 (Curl of a gradient vector field is zero)\n3. Green's Theorem: Integral around C of (L dx + M dy) = Double integral over D of (dM/dx - dL/dy) dA\n4. Stokes' Theorem links surface integrals to boundary line integrals.\n\nPractice problems from Stewart Chapter 16!`,
      pinned: true,
      lastEdited: new Date(Date.now() - 3600000 * 20).toISOString()
    },
    {
      id: 'note-3',
      title: 'Physics: Thermodynamics Laws & Cycles',
      subject: 'Physics',
      content: `0th Law: Thermal equilibrium is transitive.\n1st Law: dU = dQ - dW (Conservation of energy).\n2nd Law: Total entropy of an isolated system never decreases.\n3rd Law: As T approaches absolute zero (0 K), entropy reaches minimum.\n\nCarnot efficiency: eta = 1 - (T_cold / T_hot).`,
      pinned: false,
      lastEdited: new Date(Date.now() - 3600000 * 45).toISOString()
    }
  ],
  user: {
    name: 'Ishwari W.',
    streak: 7,
    dailyTargetHours: 4.0,
    weeklyGoalHours: 25.0
  },
  weeklyLog: [
    { day: 'Mon', hours: 4.5, tasksDone: 3 },
    { day: 'Tue', hours: 5.0, tasksDone: 4 },
    { day: 'Wed', hours: 3.5, tasksDone: 2 },
    { day: 'Thu', hours: 6.0, tasksDone: 5 },
    { day: 'Fri', hours: 4.0, tasksDone: 3 },
    { day: 'Sat', hours: 2.5, tasksDone: 1 },
    { day: 'Sun', hours: 3.0, tasksDone: 2 }
  ]
};

// Helper: Format Date Offset from Today (YYYY-MM-DD)
function getFormattedDateOffset(daysOffset) {
  const d = new Date();
  d.setDate(d.getDate() + daysOffset);
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

/* ==========================================================================
   LocalStorage Management
   ========================================================================== */
function loadData() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (parsed && parsed.tasks && parsed.sessions && parsed.notes) {
        AppState.data = parsed;
        return;
      }
    }
  } catch (err) {
    console.warn('Could not read existing data from LocalStorage, loading defaults.', err);
  }
  // If empty or corrupted, populate default sample data
  AppState.data = JSON.parse(JSON.stringify(DEFAULT_DATA));
  saveData();
}

function saveData() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(AppState.data));
  } catch (err) {
    console.error('Failed to save data to LocalStorage', err);
    showToast('Failed to save data locally', 'error');
  }
}

function resetToDefaultData() {
  if (confirm('Are you sure you want to reset all tasks, notes and schedules to demo data?')) {
    AppState.data = JSON.parse(JSON.stringify(DEFAULT_DATA));
    saveData();
    refreshAllViews();
    showToast('Dashboard reset to default sample data', 'info');
  }
}

/* ==========================================================================
   Audio Synthesis (Web Audio API Chime for Timer Completion)
   ========================================================================== */
function playCompletionChime() {
  try {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) return;
    const ctx = new AudioContext();

    const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
    notes.forEach((freq, index) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, ctx.currentTime + index * 0.12);

      gain.gain.setValueAtTime(0, ctx.currentTime + index * 0.12);
      gain.gain.linearRampToValueAtTime(0.2, ctx.currentTime + index * 0.12 + 0.04);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + index * 0.12 + 0.6);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(ctx.currentTime + index * 0.12);
      osc.stop(ctx.currentTime + index * 0.12 + 0.65);
    });
  } catch (e) {
    console.log('Audio chime error:', e);
  }
}

/* ==========================================================================
   Toast Notification System
   ========================================================================== */
function showToast(message, type = 'info') {
  const container = document.getElementById('toastContainer');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;

  let icon = 'fa-info-circle';
  if (type === 'success') icon = 'fa-circle-check text-green';
  if (type === 'error') icon = 'fa-circle-exclamation text-red';

  toast.innerHTML = `
    <i class="fa-solid ${icon}"></i>
    <span>${message}</span>
  `;

  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateX(20px)';
    setTimeout(() => toast.remove(), 300);
  }, 3200);
}

/* ==========================================================================
   Live Clock & Greeting
   ========================================================================== */
function initClockAndGreeting() {
  const clockEl = document.getElementById('liveClock');
  const dateEl = document.getElementById('liveDate');
  const greetingEl = document.getElementById('greetingTitle');

  function update() {
    const now = new Date();

    // Clock
    let hours = now.getHours();
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12 || 12;
    if (clockEl) clockEl.textContent = `${hours}:${minutes}:${seconds} ${ampm}`;

    // Date
    if (dateEl) {
      const options = { weekday: 'short', month: 'short', day: 'numeric' };
      dateEl.textContent = now.toLocaleDateString('en-US', options);
    }

    // Dynamic Greeting
    if (greetingEl) {
      const curHour = now.getHours();
      let greeting = 'Good evening';
      if (curHour < 12) greeting = 'Good morning';
      else if (curHour < 17) greeting = 'Good afternoon';
      greetingEl.innerHTML = `${greeting}, ${AppState.data.user.name}! ✨`;
    }
  }

  update();
  setInterval(update, 1000);
}

/* ==========================================================================
   Navigation & View Routing
   ========================================================================== */
function initNavigation() {
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('.content-section');
  const pageTitle = document.getElementById('pageTitle');
  const pageSubtitle = document.getElementById('pageSubtitle');
  const sidebar = document.getElementById('sidebar');
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const sidebarCloseBtn = document.getElementById('sidebarCloseBtn');

  const titles = {
    dashboard: { title: 'Dashboard', sub: 'Track your academic progress and daily goals' },
    tasks: { title: 'Task Manager', sub: 'Organize, prioritize and complete your coursework' },
    planner: { title: 'Study Planner', sub: 'Structured timetable for focused study blocks' },
    notes: { title: 'Academic Notes', sub: 'Capture, organize and review your learning materials' },
    analytics: { title: 'Productivity Analytics', sub: 'Deep insights into your study habits and output' }
  };

  function switchSection(targetSection) {
    if (!titles[targetSection]) return;
    AppState.activeSection = targetSection;

    // Update Nav links
    navLinks.forEach(link => {
      if (link.dataset.section === targetSection) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });

    // Update Sections
    sections.forEach(sec => {
      if (sec.id === `section-${targetSection}`) {
        sec.classList.add('active');
      } else {
        sec.classList.remove('active');
      }
    });

    // Update Header
    if (pageTitle) pageTitle.textContent = titles[targetSection].title;
    if (pageSubtitle) pageSubtitle.textContent = titles[targetSection].sub;

    // Close mobile drawer if open
    if (sidebar) sidebar.classList.remove('open');

    // Trigger section-specific refreshes
    if (targetSection === 'tasks') renderTasks();
    if (targetSection === 'planner') renderPlanner();
    if (targetSection === 'notes') renderNotes();
    if (targetSection === 'analytics') renderAnalytics();
    if (targetSection === 'dashboard') renderDashboard();
  }

  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      switchSection(link.dataset.section);
    });
  });

  // Fast-links (e.g. from Dashboard "View all" buttons)
  document.querySelectorAll('[data-switch-to]').forEach(btn => {
    btn.addEventListener('click', () => {
      switchSection(btn.dataset.switchTo);
    });
  });

  // Mobile drawer controls
  if (mobileMenuBtn && sidebar) {
    mobileMenuBtn.addEventListener('click', () => {
      sidebar.classList.add('open');
    });
  }
  if (sidebarCloseBtn && sidebar) {
    sidebarCloseBtn.addEventListener('click', () => {
      sidebar.classList.remove('open');
    });
  }
}

/* ==========================================================================
   DASHBOARD SECTION LOGIC
   ========================================================================== */
function renderDashboard() {
  const tasks = AppState.data.tasks;
  const sessions = AppState.data.sessions;

  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(t => t.completed).length;
  const pendingTasks = totalTasks - completedTasks;
  const urgentTasks = tasks.filter(t => !t.completed && t.priority === 'High').length;
  const completionRate = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  // Calculate total study hours logged from weeklyLog
  const weeklyHours = AppState.data.weeklyLog.reduce((acc, cur) => acc + cur.hours, 0);

  // Update Stats DOM
  const statTotal = document.getElementById('statTotalTasks');
  const statComp = document.getElementById('statCompletedTasks');
  const statPend = document.getElementById('statPendingTasks');
  const statUrgent = document.getElementById('statUrgentTasks');
  const statRate = document.getElementById('statCompletionRate');
  const statHours = document.getElementById('statStudyHours');

  if (statTotal) statTotal.textContent = totalTasks;
  if (statComp) statComp.textContent = completedTasks;
  if (statPend) statPend.textContent = pendingTasks;
  if (statUrgent) statUrgent.textContent = urgentTasks;
  if (statRate) statRate.textContent = `${completionRate}%`;
  if (statHours) statHours.textContent = weeklyHours.toFixed(1);

  // Update Hero elements
  const heroDone = document.getElementById('heroCompletedCount');
  const heroHours = document.getElementById('heroStudyTime');
  const heroGoal = document.getElementById('heroGoalProgress');
  const heroScore = document.getElementById('productivityScore');

  if (heroDone) heroDone.textContent = completedTasks;
  if (heroHours) heroHours.textContent = weeklyHours.toFixed(1);
  if (heroGoal) {
    const goalPercent = Math.min(100, Math.round((weeklyHours / AppState.data.user.weeklyGoalHours) * 100));
    heroGoal.textContent = `${goalPercent}%`;
  }
  if (heroScore) {
    const scoreVal = Math.min(99, Math.round(completionRate * 0.6 + (weeklyHours / 25) * 40));
    heroScore.textContent = `${scoreVal}%`;
  }

  // Update Sidebar Badges
  const pendingBadge = document.getElementById('taskPendingBadge');
  const notesBadge = document.getElementById('notesCountBadge');
  if (pendingBadge) pendingBadge.textContent = pendingTasks;
  if (notesBadge) notesBadge.textContent = AppState.data.notes.length;

  // Render Dashboard Urgent Tasks
  renderDashboardUrgentTasks();

  // Render Dashboard Today Schedule
  renderDashboardTodaySchedule();

  // Render / Update Chart.js Dashboard Weekly Chart
  renderDashboardWeeklyChart();

  // Check and update notification bell
  updateNotifications();
}

function renderDashboardUrgentTasks() {
  const container = document.getElementById('dashboardUrgentTasksList');
  if (!container) return;

  const urgent = AppState.data.tasks
    .filter(t => !t.completed)
    .sort((a, b) => new Date(a.deadline) - new Date(b.deadline))
    .slice(0, 4);

  if (urgent.length === 0) {
    container.innerHTML = `
      <div class="compact-item" style="justify-content: center; color: var(--text-muted); font-size: 0.85rem; padding: 1.5rem;">
        <i class="fa-solid fa-circle-check text-green mr-2"></i> All high priority tasks completed!
      </div>
    `;
    return;
  }

  container.innerHTML = urgent.map(t => `
    <div class="compact-item">
      <div class="compact-left">
        <input type="checkbox" class="custom-checkbox" data-task-id="${t.id}" title="Mark completed">
        <div>
          <div class="compact-title">${escapeHtml(t.title)}</div>
          <div class="compact-sub">
            <span class="subject-badge">${escapeHtml(t.subject)}</span>
            <span class="deadline-badge ml-2"><i class="fa-regular fa-calendar"></i> Due ${formatDateShort(t.deadline)}</span>
          </div>
        </div>
      </div>
      <span class="priority-badge priority-${t.priority}">${t.priority}</span>
    </div>
  `).join('');

  // Attach quick completion checkbox listeners
  container.querySelectorAll('input[type="checkbox"]').forEach(box => {
    box.addEventListener('change', (e) => {
      const taskId = e.target.dataset.taskId;
      toggleTaskCompletion(taskId);
    });
  });
}

function renderDashboardTodaySchedule() {
  const container = document.getElementById('dashboardTodaySchedule');
  if (!container) return;

  // Determine current day of week
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const todayName = days[new Date().getDay()];

  const sessionsToday = AppState.data.sessions.filter(s => s.day === todayName);

  if (sessionsToday.length === 0) {
    container.innerHTML = `
      <div class="compact-item" style="justify-content: center; color: var(--text-muted); font-size: 0.85rem; padding: 1.5rem;">
        <i class="fa-solid fa-mug-hot text-amber mr-2"></i> No sessions scheduled today. Enjoy your break!
      </div>
    `;
    return;
  }

  container.innerHTML = sessionsToday.map(s => {
    let statusClass = `status-${s.status.replace(/\s+/g, '')}`;
    return `
      <div class="compact-item">
        <div class="compact-left">
          <div class="session-time-pill">
            <i class="fa-regular fa-clock"></i> ${s.startTime}
          </div>
          <div>
            <div class="compact-title">${escapeHtml(s.topic)}</div>
            <div class="compact-sub">${escapeHtml(s.subject)} • ${s.duration} hrs</div>
          </div>
        </div>
        <span class="session-status-badge ${statusClass}">${s.status}</span>
      </div>
    `;
  }).join('');
}

function renderDashboardWeeklyChart() {
  const canvas = document.getElementById('dashboardWeeklyChart');
  if (!canvas || !window.Chart) return;

  const log = AppState.data.weeklyLog;
  const labels = log.map(item => item.day);
  const hoursData = log.map(item => item.hours);
  const tasksData = log.map(item => item.tasksDone);

  if (AppState.charts.dashboardWeekly) {
    AppState.charts.dashboardWeekly.destroy();
  }

  const ctx = canvas.getContext('2d');
  AppState.charts.dashboardWeekly = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: labels,
      datasets: [
        {
          label: 'Study Hours',
          data: hoursData,
          backgroundColor: 'rgba(139, 92, 246, 0.75)',
          hoverBackgroundColor: 'rgba(139, 92, 246, 1)',
          borderRadius: 8,
          borderSkipped: false,
          yAxisID: 'y'
        },
        {
          label: 'Tasks Completed',
          data: tasksData,
          type: 'line',
          borderColor: '#38bdf8',
          backgroundColor: 'rgba(56, 189, 248, 0.15)',
          borderWidth: 3,
          pointBackgroundColor: '#38bdf8',
          pointBorderColor: '#fff',
          pointRadius: 4,
          pointHoverRadius: 6,
          tension: 0.35,
          fill: true,
          yAxisID: 'y1'
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { display: false },
        tooltip: {
          backgroundColor: 'rgba(15, 23, 42, 0.95)',
          titleColor: '#fff',
          bodyColor: '#cbd5e1',
          borderColor: 'rgba(255, 255, 255, 0.1)',
          borderWidth: 1,
          padding: 10,
          cornerRadius: 8
        }
      },
      scales: {
        x: {
          grid: { display: false },
          ticks: { color: '#94a3b8', font: { family: 'Plus Jakarta Sans', size: 12 } }
        },
        y: {
          type: 'linear',
          display: true,
          position: 'left',
          grid: { color: 'rgba(255, 255, 255, 0.05)' },
          ticks: {
            color: '#94a3b8',
            callback: value => `${value}h`,
            font: { family: 'Plus Jakarta Sans', size: 11 }
          }
        },
        y1: {
          type: 'linear',
          display: true,
          position: 'right',
          grid: { drawOnChartArea: false },
          ticks: {
            color: '#38bdf8',
            precision: 0,
            font: { family: 'Plus Jakarta Sans', size: 11 }
          }
        }
      }
    }
  });
}

/* ==========================================================================
   TASK MANAGER SECTION LOGIC
   ========================================================================== */
let currentTaskFilter = 'all'; // all, pending, completed, high

function initTasksSection() {
  // Tab buttons
  const tabBtns = document.querySelectorAll('[data-task-tab]');
  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      tabBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentTaskFilter = btn.dataset.taskTab;
      renderTasks();
    });
  });

  // Search input
  const searchInput = document.getElementById('taskSearchInput');
  if (searchInput) {
    searchInput.addEventListener('input', () => renderTasks());
  }

  // Filter subject
  const subjectSelect = document.getElementById('taskFilterSubject');
  if (subjectSelect) {
    subjectSelect.addEventListener('change', () => renderTasks());
  }

  // Sort select
  const sortSelect = document.getElementById('taskSortSelect');
  if (sortSelect) {
    sortSelect.addEventListener('change', () => renderTasks());
  }

  // Modal open buttons
  const openBtn = document.getElementById('openAddTaskModalBtn');
  const quickBtn = document.getElementById('quickAddTaskBtn');
  const emptyBtn = document.getElementById('emptyStateAddTaskBtn');

  [openBtn, quickBtn, emptyBtn].forEach(btn => {
    if (btn) btn.addEventListener('click', () => openTaskModal());
  });

  // Modal close buttons
  const modal = document.getElementById('taskModal');
  const closeBtn = document.getElementById('closeTaskModalBtn');
  const cancelBtn = document.getElementById('cancelTaskModalBtn');

  [closeBtn, cancelBtn].forEach(btn => {
    if (btn) btn.addEventListener('click', () => closeTaskModal());
  });

  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeTaskModal();
    });
  }

  // Task form submission
  const taskForm = document.getElementById('taskForm');
  if (taskForm) {
    taskForm.addEventListener('submit', handleTaskFormSubmit);
  }
}

function renderTasks() {
  const container = document.getElementById('tasksContainer');
  const emptyState = document.getElementById('tasksEmptyState');
  if (!container) return;

  const tasks = AppState.data.tasks;

  // Populate dynamic subjects in dropdown
  updateSubjectDropdowns();

  // Tab count badges
  const countAll = tasks.length;
  const countPending = tasks.filter(t => !t.completed).length;
  const countCompleted = tasks.filter(t => t.completed).length;
  const countHigh = tasks.filter(t => t.priority === 'High').length;

  document.getElementById('tabCountAll').textContent = countAll;
  document.getElementById('tabCountPending').textContent = countPending;
  document.getElementById('tabCountCompleted').textContent = countCompleted;
  document.getElementById('tabCountHigh').textContent = countHigh;

  // Filter
  const searchVal = (document.getElementById('taskSearchInput')?.value || '').toLowerCase();
  const subjectVal = document.getElementById('taskFilterSubject')?.value || 'all';
  const sortVal = document.getElementById('taskSortSelect')?.value || 'deadline-asc';

  let filtered = tasks.filter(task => {
    // Tab filter
    if (currentTaskFilter === 'pending' && task.completed) return false;
    if (currentTaskFilter === 'completed' && !task.completed) return false;
    if (currentTaskFilter === 'high' && task.priority !== 'High') return false;

    // Subject filter
    if (subjectVal !== 'all' && task.subject !== subjectVal) return false;

    // Search query
    if (searchVal) {
      const matchTitle = task.title.toLowerCase().includes(searchVal);
      const matchSubject = task.subject.toLowerCase().includes(searchVal);
      const matchDesc = (task.desc || '').toLowerCase().includes(searchVal);
      if (!matchTitle && !matchSubject && !matchDesc) return false;
    }

    return true;
  });

  // Sort
  filtered.sort((a, b) => {
    if (sortVal === 'deadline-asc') return new Date(a.deadline) - new Date(b.deadline);
    if (sortVal === 'deadline-desc') return new Date(b.deadline) - new Date(a.deadline);
    if (sortVal === 'priority-desc') {
      const pMap = { High: 3, Medium: 2, Low: 1 };
      return (pMap[b.priority] || 0) - (pMap[a.priority] || 0);
    }
    if (sortVal === 'priority-asc') {
      const pMap = { High: 3, Medium: 2, Low: 1 };
      return (pMap[a.priority] || 0) - (pMap[b.priority] || 0);
    }
    if (sortVal === 'newest') return new Date(b.createdAt) - new Date(a.createdAt);
    return 0;
  });

  if (filtered.length === 0) {
    container.innerHTML = '';
    if (emptyState) emptyState.style.display = 'block';
    return;
  }

  if (emptyState) emptyState.style.display = 'none';

  container.innerHTML = filtered.map(t => {
    const isCompleted = t.completed;
    const isOverdue = !isCompleted && new Date(t.deadline) < new Date(new Date().setHours(0, 0, 0, 0));

    return `
      <div class="task-card ${isCompleted ? 'completed' : ''}" data-priority="${t.priority}" id="task-card-${t.id}">
        <div class="task-card-top">
          <div class="task-checkbox-wrap">
            <input type="checkbox" class="custom-checkbox" data-task-id="${t.id}" ${isCompleted ? 'checked' : ''} aria-label="Toggle task completion">
            <h4 class="task-card-title" data-task-id="${t.id}">${escapeHtml(t.title)}</h4>
          </div>
          <div class="task-card-menu">
            <button class="btn-card-action" data-edit-task="${t.id}" title="Edit task">
              <i class="fa-solid fa-pen-to-square"></i>
            </button>
            <button class="btn-card-action btn-card-delete" data-delete-task="${t.id}" title="Delete task">
              <i class="fa-regular fa-trash-can"></i>
            </button>
          </div>
        </div>

        <p class="task-card-desc">${escapeHtml(t.desc || 'No additional notes provided.')}</p>

        <div class="task-card-footer">
          <span class="subject-badge">${escapeHtml(t.subject)}</span>
          <span class="priority-badge priority-${t.priority}">${t.priority}</span>
          <span class="deadline-badge ${isOverdue ? 'overdue' : ''}">
            <i class="fa-regular fa-clock"></i> ${isOverdue ? 'Overdue: ' : ''}${formatDateShort(t.deadline)}
          </span>
        </div>
      </div>
    `;
  }).join('');

  // Event Listeners for Cards
  container.querySelectorAll('.custom-checkbox').forEach(box => {
    box.addEventListener('change', (e) => {
      toggleTaskCompletion(e.target.dataset.taskId);
    });
  });

  container.querySelectorAll('[data-edit-task]').forEach(btn => {
    btn.addEventListener('click', () => {
      openTaskModal(btn.dataset.editTask);
    });
  });

  container.querySelectorAll('[data-delete-task]').forEach(btn => {
    btn.addEventListener('click', () => {
      deleteTask(btn.dataset.deleteTask);
    });
  });

  container.querySelectorAll('.task-card-title').forEach(title => {
    title.addEventListener('click', () => {
      openTaskModal(title.dataset.taskId);
    });
  });
}

function updateSubjectDropdowns() {
  const subjects = Array.from(new Set(AppState.data.tasks.map(t => t.subject))).filter(Boolean);
  const filterSelect = document.getElementById('taskFilterSubject');
  const plannerSelect = document.getElementById('plannerSubjectFilter');

  if (filterSelect) {
    const currentVal = filterSelect.value;
    filterSelect.innerHTML = '<option value="all">All Subjects</option>' +
      subjects.map(s => `<option value="${escapeHtml(s)}">${escapeHtml(s)}</option>`).join('');
    if (subjects.includes(currentVal)) filterSelect.value = currentVal;
  }

  if (plannerSelect) {
    const currentVal = plannerSelect.value;
    plannerSelect.innerHTML = '<option value="all">All Subjects</option>' +
      subjects.map(s => `<option value="${escapeHtml(s)}">${escapeHtml(s)}</option>`).join('');
    if (subjects.includes(currentVal)) plannerSelect.value = currentVal;
  }
}

function openTaskModal(taskId = null) {
  const modal = document.getElementById('taskModal');
  const titleEl = document.getElementById('taskModalTitle');
  const idInput = document.getElementById('taskIdInput');
  const titleInput = document.getElementById('taskTitleInput');
  const subjectInput = document.getElementById('taskSubjectInput');
  const priorityInput = document.getElementById('taskPriorityInput');
  const deadlineInput = document.getElementById('taskDeadlineInput');
  const timeInput = document.getElementById('taskTimeInput');
  const descInput = document.getElementById('taskDescInput');

  if (taskId) {
    const task = AppState.data.tasks.find(t => t.id === taskId);
    if (!task) return;
    titleEl.innerHTML = '<i class="fa-solid fa-pen-to-square text-purple"></i> Edit Task';
    idInput.value = task.id;
    titleInput.value = task.title;
    subjectInput.value = task.subject;
    priorityInput.value = task.priority;
    deadlineInput.value = task.deadline;
    timeInput.value = task.time || '23:59';
    descInput.value = task.desc || '';
  } else {
    titleEl.innerHTML = '<i class="fa-solid fa-plus-circle text-purple"></i> Add New Task';
    idInput.value = '';
    titleInput.value = '';
    subjectInput.value = '';
    priorityInput.value = 'Medium';
    deadlineInput.value = getFormattedDateOffset(1);
    timeInput.value = '23:59';
    descInput.value = '';
  }

  modal.classList.add('show');
  titleInput.focus();
}

function closeTaskModal() {
  const modal = document.getElementById('taskModal');
  if (modal) modal.classList.remove('show');
}

function handleTaskFormSubmit(e) {
  e.preventDefault();
  const id = document.getElementById('taskIdInput').value;
  const title = document.getElementById('taskTitleInput').value.trim();
  const subject = document.getElementById('taskSubjectInput').value.trim();
  const priority = document.getElementById('taskPriorityInput').value;
  const deadline = document.getElementById('taskDeadlineInput').value;
  const time = document.getElementById('taskTimeInput').value;
  const desc = document.getElementById('taskDescInput').value.trim();

  if (!title || !subject || !deadline) {
    showToast('Please fill out all required fields', 'error');
    return;
  }

  if (id) {
    // Edit existing
    const task = AppState.data.tasks.find(t => t.id === id);
    if (task) {
      task.title = title;
      task.subject = subject;
      task.priority = priority;
      task.deadline = deadline;
      task.time = time;
      task.desc = desc;
      showToast('Task updated successfully!', 'success');
    }
  } else {
    // Create new
    const newTask = {
      id: 'task-' + Date.now(),
      title,
      subject,
      priority,
      deadline,
      time,
      desc,
      completed: false,
      createdAt: new Date().toISOString()
    };
    AppState.data.tasks.unshift(newTask);
    showToast('New task added!', 'success');
  }

  saveData();
  closeTaskModal();
  renderTasks();
  renderDashboard();
  renderAnalytics();
}

function toggleTaskCompletion(taskId) {
  const task = AppState.data.tasks.find(t => t.id === taskId);
  if (!task) return;

  task.completed = !task.completed;
  saveData();

  if (task.completed) {
    showToast(`Completed: "${task.title}" 🎉`, 'success');
    triggerConfetti();
  }

  renderTasks();
  renderDashboard();
  renderAnalytics();
}

function deleteTask(taskId) {
  const task = AppState.data.tasks.find(t => t.id === taskId);
  if (!task) return;

  if (confirm(`Delete task "${task.title}"?`)) {
    AppState.data.tasks = AppState.data.tasks.filter(t => t.id !== taskId);
    saveData();
    showToast('Task deleted', 'info');
    renderTasks();
    renderDashboard();
    renderAnalytics();
  }
}

/* ==========================================================================
   STUDY PLANNER SECTION LOGIC
   ========================================================================== */
function initPlannerSection() {
  const dayPills = document.querySelectorAll('.day-pill');
  dayPills.forEach(pill => {
    pill.addEventListener('click', () => {
      dayPills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      AppState.selectedPlannerDay = pill.dataset.day;
      renderPlanner();
    });
  });

  const subjectFilter = document.getElementById('plannerSubjectFilter');
  if (subjectFilter) {
    subjectFilter.addEventListener('change', () => renderPlanner());
  }

  const openBtn = document.getElementById('openAddSessionModalBtn');
  const emptyBtn = document.getElementById('emptyStateAddSessionBtn');
  [openBtn, emptyBtn].forEach(b => {
    if (b) b.addEventListener('click', () => openSessionModal());
  });

  const modal = document.getElementById('sessionModal');
  const closeBtn = document.getElementById('closeSessionModalBtn');
  const cancelBtn = document.getElementById('cancelSessionModalBtn');
  [closeBtn, cancelBtn].forEach(b => {
    if (b) b.addEventListener('click', () => closeSessionModal());
  });

  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeSessionModal();
    });
  }

  const sessionForm = document.getElementById('sessionForm');
  if (sessionForm) {
    sessionForm.addEventListener('submit', handleSessionFormSubmit);
  }
}

function renderPlanner() {
  const container = document.getElementById('studySessionsContainer');
  const emptyState = document.getElementById('sessionsEmptyState');
  const dayTitle = document.getElementById('plannerCurrentDayTitle');
  const daySubtitle = document.getElementById('plannerDaySubtitle');
  const progressText = document.getElementById('plannerDayProgressText');
  const progressBar = document.getElementById('plannerDayProgressBar');

  if (!container) return;

  const currentDay = AppState.selectedPlannerDay;
  if (dayTitle) dayTitle.textContent = `${currentDay}'s Schedule`;

  const subjectVal = document.getElementById('plannerSubjectFilter')?.value || 'all';

  let sessions = AppState.data.sessions.filter(s => s.day === currentDay);
  if (subjectVal !== 'all') {
    sessions = sessions.filter(s => s.subject === subjectVal);
  }

  // Calculate total scheduled hours for the day
  const totalHours = sessions.reduce((acc, cur) => acc + (cur.duration || 1), 0);
  const completedHours = sessions
    .filter(s => s.status === 'Completed')
    .reduce((acc, cur) => acc + (cur.duration || 1), 0);

  const percent = totalHours > 0 ? Math.round((completedHours / totalHours) * 100) : 0;

  if (daySubtitle) daySubtitle.textContent = `Target: ${totalHours.toFixed(1)} hours scheduled`;
  if (progressText) progressText.textContent = `${percent}% (${completedHours.toFixed(1)}h completed)`;
  if (progressBar) progressBar.style.width = `${percent}%`;

  if (sessions.length === 0) {
    container.innerHTML = '';
    if (emptyState) emptyState.style.display = 'block';
    return;
  }

  if (emptyState) emptyState.style.display = 'none';

  container.innerHTML = sessions.map(s => {
    const statusClass = `status-${s.status.replace(/\s+/g, '')}`;
    return `
      <div class="session-card" id="session-card-${s.id}">
        <div class="session-card-header">
          <div class="session-time-pill">
            <i class="fa-regular fa-clock"></i> ${s.startTime} - ${s.endTime}
          </div>
          <span class="session-status-badge ${statusClass}">
            <i class="fa-solid fa-circle text-xs"></i> ${s.status}
          </span>
        </div>

        <h3 class="session-topic">${escapeHtml(s.topic)}</h3>

        <div class="session-card-footer">
          <div>
            <span class="subject-badge">${escapeHtml(s.subject)}</span>
            <span class="session-duration ml-2">${s.duration} hrs</span>
          </div>
          <div class="task-card-menu">
            <button class="btn-card-action" data-toggle-session-status="${s.id}" title="Advance status">
              <i class="fa-solid fa-forward-step"></i>
            </button>
            <button class="btn-card-action" data-edit-session="${s.id}" title="Edit session">
              <i class="fa-solid fa-pen-to-square"></i>
            </button>
            <button class="btn-card-action btn-card-delete" data-delete-session="${s.id}" title="Delete session">
              <i class="fa-regular fa-trash-can"></i>
            </button>
          </div>
        </div>
      </div>
    `;
  }).join('');

  // Event Listeners
  container.querySelectorAll('[data-toggle-session-status]').forEach(btn => {
    btn.addEventListener('click', () => cycleSessionStatus(btn.dataset.toggleSessionStatus));
  });

  container.querySelectorAll('[data-edit-session]').forEach(btn => {
    btn.addEventListener('click', () => openSessionModal(btn.dataset.editSession));
  });

  container.querySelectorAll('[data-delete-session]').forEach(btn => {
    btn.addEventListener('click', () => deleteSession(btn.dataset.deleteSession));
  });
}

function cycleSessionStatus(sessionId) {
  const session = AppState.data.sessions.find(s => s.id === sessionId);
  if (!session) return;

  const cycle = {
    'Scheduled': 'In Progress',
    'InProgress': 'Completed',
    'In Progress': 'Completed',
    'Completed': 'Scheduled'
  };

  session.status = cycle[session.status] || 'Scheduled';
  saveData();
  showToast(`Session status: ${session.status}`, 'info');
  renderPlanner();
  renderDashboard();
}

function openSessionModal(sessionId = null) {
  const modal = document.getElementById('sessionModal');
  const titleEl = document.getElementById('sessionModalTitle');
  const idInput = document.getElementById('sessionIdInput');
  const daySelect = document.getElementById('sessionDaySelect');
  const subjectInput = document.getElementById('sessionSubjectInput');
  const topicInput = document.getElementById('sessionTopicInput');
  const startTimeInput = document.getElementById('sessionStartTimeInput');
  const endTimeInput = document.getElementById('sessionEndTimeInput');
  const statusSelect = document.getElementById('sessionStatusSelect');

  if (sessionId) {
    const s = AppState.data.sessions.find(item => item.id === sessionId);
    if (!s) return;
    titleEl.innerHTML = '<i class="fa-solid fa-pen-to-square text-purple"></i> Edit Study Session';
    idInput.value = s.id;
    daySelect.value = s.day;
    subjectInput.value = s.subject;
    topicInput.value = s.topic;
    startTimeInput.value = s.startTime;
    endTimeInput.value = s.endTime;
    statusSelect.value = s.status;
  } else {
    titleEl.innerHTML = '<i class="fa-solid fa-calendar-plus text-purple"></i> Schedule Study Session';
    idInput.value = '';
    daySelect.value = AppState.selectedPlannerDay;
    subjectInput.value = '';
    topicInput.value = '';
    startTimeInput.value = '10:00';
    endTimeInput.value = '12:00';
    statusSelect.value = 'Scheduled';
  }

  modal.classList.add('show');
}

function closeSessionModal() {
  const modal = document.getElementById('sessionModal');
  if (modal) modal.classList.remove('show');
}

function handleSessionFormSubmit(e) {
  e.preventDefault();
  const id = document.getElementById('sessionIdInput').value;
  const day = document.getElementById('sessionDaySelect').value;
  const subject = document.getElementById('sessionSubjectInput').value.trim();
  const topic = document.getElementById('sessionTopicInput').value.trim();
  const startTime = document.getElementById('sessionStartTimeInput').value;
  const endTime = document.getElementById('sessionEndTimeInput').value;
  const status = document.getElementById('sessionStatusSelect').value;

  if (!subject || !topic || !startTime || !endTime) {
    showToast('Please fill out all fields', 'error');
    return;
  }

  // Calculate duration in hours
  const startParts = startTime.split(':').map(Number);
  const endParts = endTime.split(':').map(Number);
  let duration = (endParts[0] + endParts[1] / 60) - (startParts[0] + startParts[1] / 60);
  if (duration <= 0) duration += 24; // Handle overnight wraps if any
  duration = Math.round(duration * 10) / 10;

  if (id) {
    const s = AppState.data.sessions.find(item => item.id === id);
    if (s) {
      s.day = day;
      s.subject = subject;
      s.topic = topic;
      s.startTime = startTime;
      s.endTime = endTime;
      s.duration = duration;
      s.status = status;
      showToast('Study session updated!', 'success');
    }
  } else {
    const newSession = {
      id: 'sess-' + Date.now(),
      day,
      subject,
      topic,
      startTime,
      endTime,
      duration,
      status
    };
    AppState.data.sessions.push(newSession);
    showToast('Study session scheduled!', 'success');
  }

  saveData();
  closeSessionModal();
  renderPlanner();
  renderDashboard();
}

function deleteSession(sessionId) {
  if (confirm('Delete this study session?')) {
    AppState.data.sessions = AppState.data.sessions.filter(s => s.id !== sessionId);
    saveData();
    showToast('Session removed', 'info');
    renderPlanner();
    renderDashboard();
  }
}

/* ==========================================================================
   NOTES SECTION LOGIC
   ========================================================================== */
let activeNotesSubjectFilter = 'all';
let noteAutoSaveTimer = null;

function initNotesSection() {
  const newBtn = document.getElementById('createNewNoteBtn');
  if (newBtn) {
    newBtn.addEventListener('click', createNewNote);
  }

  const searchInput = document.getElementById('notesSearchInput');
  if (searchInput) {
    searchInput.addEventListener('input', () => renderNotesList());
  }

  const bodyInput = document.getElementById('activeNoteBody');
  const titleInput = document.getElementById('activeNoteTitle');
  const subjectInput = document.getElementById('activeNoteSubject');

  [bodyInput, titleInput, subjectInput].forEach(elem => {
    if (elem) {
      elem.addEventListener('input', triggerAutoSaveNote);
    }
  });

  const pinBtn = document.getElementById('activeNotePinBtn');
  if (pinBtn) {
    pinBtn.addEventListener('click', toggleActiveNotePin);
  }

  const deleteBtn = document.getElementById('deleteActiveNoteBtn');
  if (deleteBtn) {
    deleteBtn.addEventListener('click', deleteActiveNote);
  }

  const downloadBtn = document.getElementById('downloadNoteBtn');
  if (downloadBtn) {
    downloadBtn.addEventListener('click', exportActiveNote);
  }
}

function renderNotes() {
  renderNotesSubjectChips();
  renderNotesList();

  // If no note is currently selected, select the first one
  if (!AppState.activeNoteId && AppState.data.notes.length > 0) {
    setActiveNote(AppState.data.notes[0].id);
  } else if (AppState.activeNoteId) {
    const note = AppState.data.notes.find(n => n.id === AppState.activeNoteId);
    if (note) loadNoteIntoEditor(note);
    else if (AppState.data.notes.length > 0) setActiveNote(AppState.data.notes[0].id);
  }
}

function renderNotesSubjectChips() {
  const container = document.getElementById('notesSubjectChips');
  if (!container) return;

  const subjects = ['all', ...Array.from(new Set(AppState.data.notes.map(n => n.subject))).filter(Boolean)];

  container.innerHTML = subjects.map(s => `
    <button class="chip ${s === activeNotesSubjectFilter ? 'chip-active' : ''}" data-notes-subject="${s}">
      ${s === 'all' ? 'All' : escapeHtml(s)}
    </button>
  `).join('');

  container.querySelectorAll('[data-notes-subject]').forEach(chip => {
    chip.addEventListener('click', () => {
      activeNotesSubjectFilter = chip.dataset.notesSubject;
      renderNotesSubjectChips();
      renderNotesList();
    });
  });
}

function renderNotesList() {
  const container = document.getElementById('notesListContainer');
  if (!container) return;

  const search = (document.getElementById('notesSearchInput')?.value || '').toLowerCase();
  let notes = AppState.data.notes;

  if (activeNotesSubjectFilter !== 'all') {
    notes = notes.filter(n => n.subject === activeNotesSubjectFilter);
  }

  if (search) {
    notes = notes.filter(n =>
      n.title.toLowerCase().includes(search) ||
      n.content.toLowerCase().includes(search) ||
      n.subject.toLowerCase().includes(search)
    );
  }

  // Sort pinned first, then by last edited
  notes.sort((a, b) => {
    if (a.pinned && !b.pinned) return -1;
    if (!a.pinned && b.pinned) return 1;
    return new Date(b.lastEdited) - new Date(a.lastEdited);
  });

  if (notes.length === 0) {
    container.innerHTML = `
      <div style="text-align: center; padding: 2rem 1rem; color: var(--text-muted); font-size: 0.85rem;">
        No notes found. Click '+ New' to create one.
      </div>
    `;
    return;
  }

  container.innerHTML = notes.map(n => `
    <div class="note-item-card ${n.id === AppState.activeNoteId ? 'active' : ''}" data-note-id="${n.id}">
      <div class="note-item-top">
        <h4 class="note-item-title">${escapeHtml(n.title || 'Untitled Note')}</h4>
        ${n.pinned ? '<i class="fa-solid fa-thumbtack text-amber text-xs"></i>' : ''}
      </div>
      <p class="note-item-snippet">${escapeHtml(n.content ? n.content.substring(0, 100) : 'Empty note...')}</p>
      <div class="note-item-meta">
        <span class="subject-badge">${escapeHtml(n.subject)}</span>
        <span>${formatTimeAgo(n.lastEdited)}</span>
      </div>
    </div>
  `).join('');

  container.querySelectorAll('[data-note-id]').forEach(card => {
    card.addEventListener('click', () => {
      setActiveNote(card.dataset.noteId);
    });
  });
}

function setActiveNote(noteId) {
  AppState.activeNoteId = noteId;
  const note = AppState.data.notes.find(n => n.id === noteId);
  if (note) {
    loadNoteIntoEditor(note);
    renderNotesList();
  }
}

function loadNoteIntoEditor(note) {
  const titleInput = document.getElementById('activeNoteTitle');
  const subjectInput = document.getElementById('activeNoteSubject');
  const bodyInput = document.getElementById('activeNoteBody');
  const pinBtn = document.getElementById('activeNotePinBtn');
  const lastEdited = document.getElementById('noteLastEdited');

  if (titleInput) titleInput.value = note.title;
  if (subjectInput) subjectInput.value = note.subject || 'General';
  if (bodyInput) bodyInput.value = note.content;

  if (pinBtn) {
    if (note.pinned) {
      pinBtn.classList.add('text-amber');
      pinBtn.title = 'Unpin note';
    } else {
      pinBtn.classList.remove('text-amber');
      pinBtn.title = 'Pin note';
    }
  }

  if (lastEdited) {
    lastEdited.textContent = `Last edited: ${formatTimeAgo(note.lastEdited)}`;
  }

  updateWordCount(note.content);
}

function createNewNote() {
  const newNote = {
    id: 'note-' + Date.now(),
    title: 'Untitled Note',
    subject: activeNotesSubjectFilter !== 'all' ? activeNotesSubjectFilter : 'General',
    content: '',
    pinned: false,
    lastEdited: new Date().toISOString()
  };

  AppState.data.notes.unshift(newNote);
  saveData();
  setActiveNote(newNote.id);
  renderNotesSubjectChips();
  renderNotesList();
  showToast('New note created', 'info');

  const titleInput = document.getElementById('activeNoteTitle');
  if (titleInput) {
    titleInput.focus();
    titleInput.select();
  }
}

function triggerAutoSaveNote() {
  const statusEl = document.getElementById('noteSaveStatus');
  if (statusEl) {
    statusEl.innerHTML = '<i class="fa-solid fa-rotate fa-spin text-amber"></i> Saving...';
  }

  clearTimeout(noteAutoSaveTimer);
  noteAutoSaveTimer = setTimeout(() => {
    saveActiveNoteData();
  }, 400);
}

function saveActiveNoteData() {
  if (!AppState.activeNoteId) return;

  const note = AppState.data.notes.find(n => n.id === AppState.activeNoteId);
  if (!note) return;

  const title = document.getElementById('activeNoteTitle')?.value.trim() || 'Untitled Note';
  const subject = document.getElementById('activeNoteSubject')?.value || 'General';
  const content = document.getElementById('activeNoteBody')?.value || '';

  note.title = title;
  note.subject = subject;
  note.content = content;
  note.lastEdited = new Date().toISOString();

  saveData();

  const statusEl = document.getElementById('noteSaveStatus');
  if (statusEl) {
    statusEl.innerHTML = '<i class="fa-solid fa-cloud-arrow-up text-green"></i> Auto-saved';
  }

  const lastEdited = document.getElementById('noteLastEdited');
  if (lastEdited) {
    lastEdited.textContent = 'Last edited: Just now';
  }

  updateWordCount(content);
  renderNotesList();
}

function toggleActiveNotePin() {
  if (!AppState.activeNoteId) return;
  const note = AppState.data.notes.find(n => n.id === AppState.activeNoteId);
  if (!note) return;

  note.pinned = !note.pinned;
  saveData();
  loadNoteIntoEditor(note);
  renderNotesList();
  showToast(note.pinned ? 'Note pinned' : 'Note unpinned', 'info');
}

function deleteActiveNote() {
  if (!AppState.activeNoteId) return;
  const note = AppState.data.notes.find(n => n.id === AppState.activeNoteId);
  if (!note) return;

  if (confirm(`Delete note "${note.title}"?`)) {
    AppState.data.notes = AppState.data.notes.filter(n => n.id !== note.id);
    saveData();
    AppState.activeNoteId = AppState.data.notes.length > 0 ? AppState.data.notes[0].id : null;
    renderNotes();
    showToast('Note deleted', 'info');
  }
}

function exportActiveNote() {
  if (!AppState.activeNoteId) return;
  const note = AppState.data.notes.find(n => n.id === AppState.activeNoteId);
  if (!note) return;

  const blob = new Blob([`${note.title}\nSubject: ${note.subject}\nDate: ${note.lastEdited}\n\n${note.content}`], { type: 'text/plain;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `${note.title.replace(/[^a-z0-9_-]/gi, '_')}.txt`;
  a.click();
  URL.revokeObjectURL(url);
  showToast('Note downloaded as text file', 'success');
}

function updateWordCount(text = '') {
  const el = document.getElementById('noteWordCount');
  if (!el) return;
  const words = text.trim() ? text.trim().split(/\s+/).length : 0;
  const chars = text.length;
  el.textContent = `${words} words • ${chars} characters`;
}

/* ==========================================================================
   ANALYTICS SECTION LOGIC
   ========================================================================== */
function renderAnalytics() {
  const tasks = AppState.data.tasks;
  const log = AppState.data.weeklyLog;

  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(t => t.completed).length;
  const completionRate = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  const totalWeeklyHours = log.reduce((acc, c) => acc + c.hours, 0);
  const avgDaily = (totalWeeklyHours / 7).toFixed(1);

  // Top focus subject calculation
  const subjectHours = {};
  AppState.data.sessions.forEach(s => {
    subjectHours[s.subject] = (subjectHours[s.subject] || 0) + (s.duration || 1);
  });
  let topSubject = 'Computer Science';
  let maxHours = 0;
  for (const [sub, hrs] of Object.entries(subjectHours)) {
    if (hrs > maxHours) {
      maxHours = hrs;
      topSubject = sub;
    }
  }

  // Update DOM Metric cards
  const rateEl = document.getElementById('analyticsCompletionRate');
  const avgEl = document.getElementById('analyticsAvgDaily');
  const topSubEl = document.getElementById('analyticsTopSubject');
  const streakEl = document.getElementById('analyticsStreak');

  if (rateEl) rateEl.textContent = `${completionRate}%`;
  if (avgEl) avgEl.textContent = `${avgDaily}h`;
  if (topSubEl) topSubEl.textContent = topSubject;
  if (streakEl) streakEl.textContent = `${AppState.data.user.streak} Days`;

  // Render Charts
  renderAnalyticsHoursChart();
  renderAnalyticsSubjectChart();
  renderAnalyticsPriorityChart();
}

function renderAnalyticsHoursChart() {
  const canvas = document.getElementById('analyticsHoursChart');
  if (!canvas || !window.Chart) return;

  const log = AppState.data.weeklyLog;
  const labels = log.map(i => i.day);
  const hours = log.map(i => i.hours);
  const target = labels.map(() => AppState.data.user.dailyTargetHours);

  if (AppState.charts.analyticsHours) {
    AppState.charts.analyticsHours.destroy();
  }

  const ctx = canvas.getContext('2d');
  AppState.charts.analyticsHours = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: labels,
      datasets: [
        {
          label: 'Logged Hours',
          data: hours,
          backgroundColor: 'rgba(99, 102, 241, 0.85)',
          borderRadius: 8,
          borderSkipped: false
        },
        {
          label: 'Daily Target (4.0h)',
          data: target,
          type: 'line',
          borderColor: '#f59e0b',
          borderDash: [5, 5],
          borderWidth: 2,
          pointRadius: 0,
          fill: false
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: true,
          labels: { color: '#cbd5e1', font: { family: 'Plus Jakarta Sans', size: 12 } }
        }
      },
      scales: {
        x: { grid: { display: false }, ticks: { color: '#94a3b8' } },
        y: {
          grid: { color: 'rgba(255, 255, 255, 0.05)' },
          ticks: { color: '#94a3b8', callback: v => `${v}h` }
        }
      }
    }
  });
}

function renderAnalyticsSubjectChart() {
  const canvas = document.getElementById('analyticsSubjectChart');
  if (!canvas || !window.Chart) return;

  const subjectCounts = {};
  AppState.data.sessions.forEach(s => {
    subjectCounts[s.subject] = (subjectCounts[s.subject] || 0) + (s.duration || 1);
  });

  const labels = Object.keys(subjectCounts);
  const data = Object.values(subjectCounts);

  if (AppState.charts.analyticsSubject) {
    AppState.charts.analyticsSubject.destroy();
  }

  const ctx = canvas.getContext('2d');
  AppState.charts.analyticsSubject = new Chart(ctx, {
    type: 'doughnut',
    data: {
      labels: labels.length ? labels : ['Computer Science', 'Mathematics', 'Physics'],
      datasets: [{
        data: data.length ? data : [8, 6, 4],
        backgroundColor: [
          '#6366f1',
          '#38bdf8',
          '#a855f7',
          '#10b981',
          '#f59e0b',
          '#ec4899'
        ],
        borderWidth: 2,
        borderColor: '#0f172a'
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      cutout: '68%',
      plugins: {
        legend: {
          position: 'bottom',
          labels: { color: '#cbd5e1', font: { family: 'Plus Jakarta Sans', size: 11 }, padding: 12 }
        }
      }
    }
  });
}

function renderAnalyticsPriorityChart() {
  const canvas = document.getElementById('analyticsPriorityChart');
  if (!canvas || !window.Chart) return;

  const high = AppState.data.tasks.filter(t => t.priority === 'High').length;
  const med = AppState.data.tasks.filter(t => t.priority === 'Medium').length;
  const low = AppState.data.tasks.filter(t => t.priority === 'Low').length;

  if (AppState.charts.analyticsPriority) {
    AppState.charts.analyticsPriority.destroy();
  }

  const ctx = canvas.getContext('2d');
  AppState.charts.analyticsPriority = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: ['High Priority', 'Medium Priority', 'Low Priority'],
      datasets: [{
        label: 'Tasks Count',
        data: [high, med, low],
        backgroundColor: [
          'rgba(239, 68, 68, 0.8)',
          'rgba(245, 158, 11, 0.8)',
          'rgba(16, 185, 129, 0.8)'
        ],
        borderRadius: 8
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: { legend: { display: false } },
      scales: {
        x: { grid: { display: false }, ticks: { color: '#94a3b8' } },
        y: {
          grid: { color: 'rgba(255, 255, 255, 0.05)' },
          ticks: { color: '#94a3b8', precision: 0 }
        }
      }
    }
  });
}

/* ==========================================================================
   POMODORO & FOCUS TIMER LOGIC
   ========================================================================== */
function initPomodoroTimer() {
  const modes = {
    pomodoro: 25 * 60,
    shortBreak: 5 * 60,
    longBreak: 15 * 60
  };

  const sidebarDisplay = document.getElementById('sidebarTimerDisplay');
  const mainDisplay = document.getElementById('mainTimerDisplay');
  const ring = document.getElementById('timerProgressRing');
  const sidebarIcon = document.getElementById('sidebarTimerIcon');
  const mainStartBtn = document.getElementById('mainTimerStartBtn');
  const mainStatus = document.getElementById('mainTimerStatus');

  function updateDisplays() {
    const mins = Math.floor(AppState.timer.remaining / 60);
    const secs = AppState.timer.remaining % 60;
    const str = `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;

    if (sidebarDisplay) sidebarDisplay.textContent = str;
    if (mainDisplay) mainDisplay.textContent = str;

    // Update circular SVG stroke
    if (ring) {
      const circumference = 2 * Math.PI * 80; // 502.65
      const offset = circumference - (AppState.timer.remaining / AppState.timer.duration) * circumference;
      ring.style.strokeDashoffset = offset;
    }
  }

  function setMode(modeKey) {
    pauseTimer();
    AppState.timer.mode = modeKey;
    AppState.timer.duration = modes[modeKey];
    AppState.timer.remaining = modes[modeKey];

    const badges = [
      document.getElementById('timerModeBadge'),
      document.getElementById('mainTimerModeBadge')
    ];
    const modeNames = {
      pomodoro: 'Focus Session',
      shortBreak: 'Short Break',
      longBreak: 'Long Break'
    };

    badges.forEach(b => {
      if (b) b.textContent = modeNames[modeKey];
    });

    if (mainStatus) {
      mainStatus.textContent = modeKey === 'pomodoro' ? 'Ready to focus' : 'Time to recharge';
    }

    updateDisplays();
  }

  function startTimer() {
    if (AppState.timer.isRunning) return;
    AppState.timer.isRunning = true;

    if (sidebarIcon) {
      sidebarIcon.classList.remove('fa-play');
      sidebarIcon.classList.add('fa-pause');
    }
    if (mainStartBtn) {
      mainStartBtn.innerHTML = '<i class="fa-solid fa-pause"></i> Pause Session';
    }
    if (mainStatus) {
      mainStatus.textContent = AppState.timer.mode === 'pomodoro' ? 'Deep focus in progress...' : 'Resting...';
    }

    AppState.timer.intervalId = setInterval(() => {
      AppState.timer.remaining--;
      updateDisplays();

      if (AppState.timer.remaining <= 0) {
        clearInterval(AppState.timer.intervalId);
        AppState.timer.isRunning = false;
        playCompletionChime();
        triggerConfetti();

        const finishMsg = AppState.timer.mode === 'pomodoro'
          ? 'Focus session completed! Great job! 🎉'
          : 'Break finished! Ready to get back to work?';
        showToast(finishMsg, 'success');

        setMode(AppState.timer.mode === 'pomodoro' ? 'shortBreak' : 'pomodoro');
      }
    }, 1000);
  }

  function pauseTimer() {
    AppState.timer.isRunning = false;
    clearInterval(AppState.timer.intervalId);

    if (sidebarIcon) {
      sidebarIcon.classList.remove('fa-pause');
      sidebarIcon.classList.add('fa-play');
    }
    if (mainStartBtn) {
      mainStartBtn.innerHTML = '<i class="fa-solid fa-play"></i> Resume Session';
    }
    if (mainStatus) {
      mainStatus.textContent = 'Session paused';
    }
  }

  function toggleTimer() {
    if (AppState.timer.isRunning) pauseTimer();
    else startTimer();
  }

  function resetTimer() {
    pauseTimer();
    AppState.timer.remaining = AppState.timer.duration;
    if (mainStartBtn) {
      mainStartBtn.innerHTML = '<i class="fa-solid fa-play"></i> Start Session';
    }
    if (mainStatus) {
      mainStatus.textContent = 'Ready to focus';
    }
    updateDisplays();
  }

  // Sidebar Controls
  document.getElementById('sidebarTimerToggle')?.addEventListener('click', toggleTimer);
  document.getElementById('sidebarTimerReset')?.addEventListener('click', resetTimer);
  document.getElementById('sidebarTimerMode')?.addEventListener('click', () => {
    setMode(AppState.timer.mode === 'pomodoro' ? 'shortBreak' : 'pomodoro');
  });

  // Main Dashboard Controls
  mainStartBtn?.addEventListener('click', toggleTimer);
  document.getElementById('mainTimerResetBtn')?.addEventListener('click', resetTimer);
  document.getElementById('timerModePomodoro')?.addEventListener('click', () => setMode('pomodoro'));
  document.getElementById('timerModeShortBreak')?.addEventListener('click', () => setMode('shortBreak'));
  document.getElementById('timerModeLongBreak')?.addEventListener('click', () => setMode('longBreak'));

  updateDisplays();
}

/* ==========================================================================
   NOTIFICATIONS & REMINDERS LOGIC
   ========================================================================= */
function updateNotifications() {
  const listEl = document.getElementById('notificationList');
  const dotEl = document.getElementById('notificationDot');
  if (!listEl) return;

  const todayStr = getFormattedDateOffset(0);
  const notifications = [];

  // Overdue or due today tasks
  AppState.data.tasks.forEach(task => {
    if (!task.completed) {
      if (task.deadline < todayStr) {
        notifications.push({
          icon: 'fa-triangle-exclamation text-red',
          title: `Overdue: ${task.title}`,
          sub: `Was due on ${task.deadline}`
        });
      } else if (task.deadline === todayStr) {
        notifications.push({
          icon: 'fa-clock text-amber',
          title: `Due Today: ${task.title}`,
          sub: `Due by ${task.time || '23:59'}`
        });
      }
    }
  });

  // Motivational streak reminder
  notifications.push({
    icon: 'fa-fire text-amber',
    title: `${AppState.data.user.streak}-Day Study Streak!`,
    sub: 'Keep up the momentum today to protect your streak.'
  });

  if (notifications.length > 0 && dotEl) {
    dotEl.classList.add('active');
  }

  listEl.innerHTML = notifications.map(n => `
    <li class="notification-item">
      <i class="fa-solid ${n.icon} notification-icon"></i>
      <div class="notification-body">
        <p><strong>${escapeHtml(n.title)}</strong></p>
        <span class="time-ago">${escapeHtml(n.sub)}</span>
      </div>
    </li>
  `).join('');
}

function initNotificationPanel() {
  const btn = document.getElementById('notificationBtn');
  const panel = document.getElementById('notificationPanel');
  const clearBtn = document.getElementById('clearNotificationsBtn');
  const dotEl = document.getElementById('notificationDot');

  if (btn && panel) {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      panel.classList.toggle('show');
    });

    document.addEventListener('click', (e) => {
      if (!panel.contains(e.target) && e.target !== btn) {
        panel.classList.remove('show');
      }
    });
  }

  if (clearBtn && dotEl) {
    clearBtn.addEventListener('click', () => {
      dotEl.classList.remove('active');
      panel.classList.remove('show');
      showToast('Notifications dismissed', 'info');
    });
  }
}

/* ==========================================================================
   Confetti Celebration Effect (Pure Vanilla Canvas implementation)
   ========================================================================== */
function triggerConfetti() {
  const canvas = document.createElement('canvas');
  canvas.style.position = 'fixed';
  canvas.style.top = '0';
  canvas.style.left = '0';
  canvas.style.width = '100vw';
  canvas.style.height = '100vh';
  canvas.style.pointerEvents = 'none';
  canvas.style.zIndex = '9999';
  document.body.appendChild(canvas);

  const ctx = canvas.getContext('2d');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const pieces = [];
  const colors = ['#6366f1', '#a855f7', '#38bdf8', '#10b981', '#f59e0b', '#ec4899'];

  for (let i = 0; i < 70; i++) {
    pieces.push({
      x: canvas.width / 2,
      y: canvas.height / 2,
      vx: (Math.random() - 0.5) * 14,
      vy: (Math.random() - 0.7) * 14,
      size: Math.random() * 8 + 4,
      color: colors[Math.floor(Math.random() * colors.length)],
      rotation: Math.random() * 360,
      vRot: (Math.random() - 0.5) * 10
    });
  }

  let animationFrame;
  let opacity = 1.0;

  function loop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    opacity -= 0.015;

    pieces.forEach(p => {
      p.x += p.vx;
      p.y += p.vy;
      p.vy += 0.25; // gravity
      p.rotation += p.vRot;

      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate((p.rotation * Math.PI) / 180);
      ctx.fillStyle = p.color;
      ctx.globalAlpha = Math.max(0, opacity);
      ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size);
      ctx.restore();
    });

    if (opacity > 0) {
      animationFrame = requestAnimationFrame(loop);
    } else {
      cancelAnimationFrame(animationFrame);
      canvas.remove();
    }
  }

  loop();
}

/* ==========================================================================
   Utility Helpers
   ========================================================================== */
function escapeHtml(str = '') {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

function formatDateShort(dateStr) {
  if (!dateStr) return '';
  const d = new Date(dateStr + 'T00:00:00');
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}

function formatTimeAgo(isoString) {
  if (!isoString) return 'recently';
  const diff = Date.now() - new Date(isoString).getTime();
  const minutes = Math.floor(diff / 60000);
  if (minutes < 1) return 'Just now';
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  return `${days}d ago`;
}

function refreshAllViews() {
  renderDashboard();
  renderTasks();
  renderPlanner();
  renderNotes();
  renderAnalytics();
}

/* ==========================================================================
   Application Initialization
   ========================================================================== */
document.addEventListener('DOMContentLoaded', () => {
  // Load LocalStorage
  loadData();

  // Reset sample data button
  document.getElementById('resetDataBtn')?.addEventListener('click', resetToDefaultData);

  // Initialize Modules
  initClockAndGreeting();
  initNavigation();
  initTasksSection();
  initPlannerSection();
  initNotesSection();
  initPomodoroTimer();
  initNotificationPanel();

  // Render initial view
  renderDashboard();
  renderTasks();
});
