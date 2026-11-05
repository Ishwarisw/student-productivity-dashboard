# 🎓 StudySync — Student Productivity Dashboard

> A premium, modern, all-in-one productivity dashboard designed for students and self-learners to organize coursework, plan focused study blocks, manage deadlines, take lecture notes, and track weekly academic analytics.

![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![Chart.js](https://img.shields.io/badge/Chart.js-FF6384?style=for-the-badge&logo=chartdotjs&logoColor=white)
![License](https://img.shields.io/badge/License-MIT-blue?style=for-the-badge)

---

## 🌟 Overview & Design Philosophy

StudySync is crafted with a **modern dark navy theme**, vibrant **purple and blue gradient accents**, and subtle glassmorphic surfaces. It delivers an intuitive Single Page Application (SPA) experience without requiring heavy front-end frameworks, external database backends, or paid API keys. All personal task entries, notes, and study schedules persist automatically in browser **LocalStorage**.

---

## ✨ Features

### 📊 1. Dashboard
- **Dynamic Welcome Banner**: Displays a context-aware greeting ("Good morning", "Good afternoon", "Good evening"), daily motivational quote, and streak counter.
- **Key Metric Cards**: Instant count of Total Tasks, Completed Tasks, Pending Tasks, and Weekly Logged Study Hours.
- **Weekly Productivity Chart**: Interactive Chart.js dual-axis visualization comparing daily hours studied against completed assignments.
- **Built-in Pomodoro Focus Timer**: Dual-access timer (sidebar & main view) with study (25m), short break (5m), and long break (15m) modes, SVG circular progress ring, and synthesized audio chime.
- **Priority Deadlines & Today's Schedule**: Quick overview of upcoming coursework with instant one-click completion.

### 📝 2. Task Manager
- **Complete CRUD Operations**: Create, view, edit, and delete tasks seamlessly with clean modal forms.
- **Priority Levels**: Categorize coursework into `High` (red), `Medium` (amber), and `Low` (green) priorities.
- **Smart Filtering & Searching**: Filter by status (*All*, *Pending*, *Completed*, *High Priority*), subject category, or real-time text query.
- **Sorting Options**: Sort tasks by deadline (soonest/latest), priority, or creation date.
- **Celebration Effects**: Built-in confetti animation triggers upon completing milestone tasks.

### 📅 3. Study Planner
- **Weekly Schedule Timetable**: Day-by-day scheduler covering Monday through Sunday.
- **Subject-Wise Organization**: Track targeted topics, start/end time intervals, and computed session durations.
- **Status Progression**: Advance sessions through *Scheduled*, *In Progress*, and *Completed* with a single click.
- **Daily Progress Bar**: Visual indicator showing the percentage of scheduled study time completed.

### 📓 4. Academic Notes
- **Auto-Saving Editor**: Notes are saved on the fly to LocalStorage as you type with real-time status indicators.
- **Subject Categorization**: Tag notes by subject (*Computer Science*, *Mathematics*, *Physics*, etc.).
- **Pinning & Search**: Pin high-priority formula sheets and cheatsheets to the top.
- **Word & Character Counters**: Real-time document statistics.
- **Export Utility**: Download any note as a clean `.txt` document with one click.

### 📈 5. Productivity Analytics
- **Performance Summary**: Track completion velocity, average daily study hours, top focus subjects, and active streaks.
- **Daily Study Time vs. Target**: Bar chart tracking daily study hours against your 4.0h daily goal.
- **Subject Distribution**: Interactive doughnut chart breaking down hours across academic subjects.
- **Task Priority Balance**: Visualizing the ratio of high, medium, and low priority tasks.
- **Milestones & Badges**: Achievement system rewarding consistency and deep focus.

---

## 🛠️ Technologies Used

- **HTML5**: Semantic markup, accessible forms, SVG graphics.
- **CSS3**: Custom design tokens (CSS variables), Flexbox, CSS Grid, glassmorphism, responsive breakpoints.
- **Vanilla JavaScript (ES6+)**: SPA state management, LocalStorage CRUD handlers, dynamic DOM rendering, Canvas confetti effects, and Web Audio API synthesized chimes.
- **Chart.js 4.4.x**: Responsive vector charts and data visualization.
- **Font Awesome 6**: Vector icons for actions and navigation.
- **Google Fonts**: Modern *Plus Jakarta Sans* typography.

---

## 📂 Folder Structure

```text
student_productivity_dashboard/
├── index.html        # Main HTML structure and section views
├── style.css         # Complete dark navy design system and responsive styles
├── script.js         # Core application logic, state, LocalStorage, and charts
├── .gitignore        # Standard Git ignore rules
└── README.md         # Comprehensive project documentation
```

---

## 🚀 How to Run Locally

Because StudySync is built with standard web technologies without external server dependencies, you can run it using any of the methods below:

### Option 1: Direct File Open
Simply double-click `index.html` or drag and drop it into any modern web browser (Google Chrome, Microsoft Edge, Mozilla Firefox, Safari).

### Option 2: Using Python (Recommended)
Open your terminal in the project directory and run:

```bash
# Python 3
python -m http.server 8000
```
Then visit `http://localhost:8000` in your web browser.

### Option 3: Using Node.js / npx
```bash
npx serve .
# or
npx http-server -p 8000
```

### Option 4: VS Code Live Server
1. Open the project folder in VS Code.
2. Install the **Live Server** extension.
3. Right-click `index.html` and select **"Open with Live Server"**.

---

## 📸 Screenshots

> To add your own screenshots to this repository:
> 1. Create a `screenshots` folder inside the project root: `mkdir screenshots`
> 2. Capture screenshots of the Dashboard, Task Manager, Study Planner, Notes, and Analytics.
> 3. Save images as `dashboard.png`, `tasks.png`, `planner.png`, etc.
> 4. Reference them below.

```markdown
![Dashboard Overview](screenshots/dashboard.png)
![Task Manager](screenshots/tasks.png)
![Study Planner & Timetable](screenshots/planner.png)
![Academic Notes](screenshots/notes.png)
![Analytics & Charts](screenshots/analytics.png)
```

---

## 🔮 Future Improvements

- [ ] Cloud sync integration (Firebase / Supabase) for multi-device sync.
- [ ] Customizable theme color pickers and accent options.
- [ ] Export full academic term data as PDF report or CSV spreadsheet.
- [ ] Web Notifications API support for sound/desktop alarms on timer intervals.
- [ ] Flashcards & spaced repetition (SRS) study mode.

---

## 📄 License

This project is licensed under the **MIT License**. Free for students and educators to use, modify, and distribute.
