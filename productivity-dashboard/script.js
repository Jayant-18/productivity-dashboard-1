/**
 * AURA | Personal Productivity Dashboard Application Script
 * Complete Vanilla JavaScript Implementation with LocalStorage Persistence
 */

document.addEventListener('DOMContentLoaded', () => {

    /* ==========================================================================
       1. INITIAL STATE & STORAGE KEYS
       ========================================================================== */
    const STORAGE_KEYS = {
        THEME: 'aura_theme',
        TASKS: 'aura_tasks',
        WORKOUTS: 'aura_workouts',
        TIMETABLE: 'aura_timetable',
        GOALS: 'aura_goals',
        NOTES: 'aura_notes'
    };

    // Pre-populated Workout Database
    const DEFAULT_WORKOUTS = {
        Monday: {
            title: 'Monday - Chest & Triceps',
            sub: 'Focus on upper body push exercises.',
            exercises: [
                { id: 'm1', name: 'Barbell Bench Press', sets: 4, reps: '8-10', duration: '15 mins', icon: 'fa-dumbbell', completed: false },
                { id: 'm2', name: 'Incline Dumbbell Press', sets: 3, reps: '10-12', duration: '12 mins', icon: 'fa-dumbbell', completed: false },
                { id: 'm3', name: 'Cable Chest Flyes', sets: 3, reps: '12-15', duration: '10 mins', icon: 'fa-arrows-left-right-to-line', completed: false },
                { id: 'm4', name: 'Tricep Dips', sets: 3, reps: '10-12', duration: '8 mins', icon: 'fa-person-walking', completed: false },
                { id: 'm5', name: 'Tricep Rope Pushdowns', sets: 4, reps: '12', duration: '10 mins', icon: 'fa-bolt', completed: false }
            ]
        },
        Tuesday: {
            title: 'Tuesday - Back & Biceps',
            sub: 'Focus on upper body pull exercises and arm flexors.',
            exercises: [
                { id: 't1', name: 'Lat Pulldowns', sets: 4, reps: '10-12', duration: '12 mins', icon: 'fa-arrows-up-to-line', completed: false },
                { id: 't2', name: 'Bent-Over Barbell Rows', sets: 4, reps: '8-10', duration: '15 mins', icon: 'fa-dumbbell', completed: false },
                { id: 't3', name: 'Seated Cable Rows', sets: 3, reps: '12', duration: '10 mins', icon: 'fa-arrows-left-right', completed: false },
                { id: 't4', name: 'Barbell Bicep Curls', sets: 4, reps: '10-12', duration: '10 mins', icon: 'fa-dumbbell', completed: false },
                { id: 't5', name: 'Hammer Curls', sets: 3, reps: '12-15', duration: '8 mins', icon: 'fa-dumbbell', completed: false }
            ]
        },
        Wednesday: {
            title: 'Wednesday - Legs Routine',
            sub: 'Build powerful quadriceps, hamstrings, and calves.',
            exercises: [
                { id: 'w1', name: 'Barbell Back Squats', sets: 4, reps: '8-10', duration: '20 mins', icon: 'fa-person-dots-from-line', completed: false },
                { id: 'w2', name: 'Leg Press Machine', sets: 4, reps: '10-12', duration: '12 mins', icon: 'fa-cubes', completed: false },
                { id: 'w3', name: 'Romanian Deadlifts', sets: 3, reps: '10', duration: '12 mins', icon: 'fa-dumbbell', completed: false },
                { id: 'w4', name: 'Standing Calf Raises', sets: 4, reps: '15-20', duration: '8 mins', icon: 'fa-arrow-up-long', completed: false },
                { id: 'w5', name: 'Seated Leg Curls', sets: 3, reps: '12', duration: '10 mins', icon: 'fa-rotate-right', completed: false }
            ]
        },
        Thursday: {
            title: 'Thursday - Shoulders Routine',
            sub: 'Sculpt deltoids and upper trap muscles.',
            exercises: [
                { id: 'th1', name: 'Overhead Military Press', sets: 4, reps: '8-10', duration: '15 mins', icon: 'fa-dumbbell', completed: false },
                { id: 'th2', name: 'Dumbbell Lateral Raises', sets: 4, reps: '12-15', duration: '10 mins', icon: 'fa-arrows-left-right', completed: false },
                { id: 'th3', name: 'Front Dumbbell Raises', sets: 3, reps: '12', duration: '8 mins', icon: 'fa-arrow-up', completed: false },
                { id: 'th4', name: 'Face Pulls', sets: 4, reps: '15', duration: '10 mins', icon: 'fa-hand', completed: false },
                { id: 'th5', name: 'Barbell Shrugs', sets: 4, reps: '12', duration: '8 mins', icon: 'fa-angles-up', completed: false }
            ]
        },
        Friday: {
            title: 'Friday - Full Body Hypertrophy',
            sub: 'Compound total body strength workout.',
            exercises: [
                { id: 'f1', name: 'Conventional Deadlifts', sets: 4, reps: '6-8', duration: '20 mins', icon: 'fa-dumbbell', completed: false },
                { id: 'f2', name: 'Dumbbell Clean & Press', sets: 3, reps: '10', duration: '12 mins', icon: 'fa-bolt', completed: false },
                { id: 'f3', name: 'Bodyweight Pull-Ups', sets: 3, reps: 'Max', duration: '10 mins', icon: 'fa-person-chalkboard', completed: false },
                { id: 'f4', name: 'Push-Ups to Plank', sets: 3, reps: '15', duration: '8 mins', icon: 'fa-person-running', completed: false },
                { id: 'f5', name: 'Kettlebell Swings', sets: 4, reps: '20', duration: '10 mins', icon: 'fa-weight-hanging', completed: false }
            ]
        },
        Saturday: {
            title: 'Saturday - Cardio & Core',
            sub: 'Burn calories and boost stamina.',
            exercises: [
                { id: 's1', name: 'Treadmill Interval Run', sets: 1, reps: '25 Mins', duration: '25 mins', icon: 'fa-person-running', completed: false },
                { id: 's2', name: 'Jump Rope Sprints', sets: 5, reps: '2 Mins', duration: '10 mins', icon: 'fa-rotate', completed: false },
                { id: 's3', name: 'Hanging Leg Raises', sets: 4, reps: '15', duration: '8 mins', icon: 'fa-arrow-up', completed: false },
                { id: 's4', name: 'Russian Twists', sets: 3, reps: '30', duration: '6 mins', icon: 'fa-rotate-left', completed: false },
                { id: 's5', name: 'Plank Hold', sets: 3, reps: '60 Secs', duration: '6 mins', icon: 'fa-stopwatch', completed: false }
            ]
        },
        Sunday: {
            title: 'Sunday - Active Rest & Mobility',
            sub: 'Recover and restore your muscles for the upcoming week.',
            exercises: [
                { id: 'su1', name: 'Full Body Foam Rolling', sets: 1, reps: '15 Mins', duration: '15 mins', icon: 'fa-mattress-pillow', completed: false },
                { id: 'su2', name: 'Hamstring & Hip Stretches', sets: 3, reps: '45 Secs', duration: '10 mins', icon: 'fa-spa', completed: false },
                { id: 'su3', name: 'Light Outdoor Walk', sets: 1, reps: '30 Mins', duration: '30 mins', icon: 'fa-shoe-prints', completed: false }
            ]
        }
    };

    // Motivational Quotes List
    const QUOTES = [
        { text: "The secret of getting ahead is getting started.", author: "- Mark Twain" },
        { text: "It always seems impossible until it's done.", author: "- Nelson Mandela" },
        { text: "Don't watch the clock; do what it does. Keep going.", author: "- Sam Levenson" },
        { text: "Success is the sum of small efforts repeated day in and day out.", author: "- Robert Collier" },
        { text: "Action is the foundational key to all success.", author: "- Pablo Picasso" },
        { text: "Your future is created by what you do today, not tomorrow.", author: "- Robert Kiyosaki" }
    ];

    // Initial State Variables
    let tasks = JSON.parse(localStorage.getItem(STORAGE_KEYS.TASKS)) || [
        { id: 't-1', title: 'Complete Productivity Dashboard UI', dueDate: '2026-07-25', priority: 'High', category: 'Work', completed: false, order: 0 },
        { id: 't-2', title: 'Read 20 pages of Atomic Habits', dueDate: '2026-07-24', priority: 'Medium', category: 'Learning', completed: true, order: 1 },
        { id: 't-3', title: 'Evening 5km Outdoor Run', dueDate: '2026-07-24', priority: 'Low', category: 'Fitness', completed: false, order: 2 }
    ];

    let workouts = JSON.parse(localStorage.getItem(STORAGE_KEYS.WORKOUTS)) || DEFAULT_WORKOUTS;
    let timetableData = JSON.parse(localStorage.getItem(STORAGE_KEYS.TIMETABLE)) || {};
    let dailyGoals = JSON.parse(localStorage.getItem(STORAGE_KEYS.GOALS)) || {
        waterCount: 4,
        habitReading: true,
        habitCoding: true,
        habitWorkout: false,
        habitMeditation: false
    };
    let stickyNotes = JSON.parse(localStorage.getItem(STORAGE_KEYS.NOTES)) || [
        { id: 'n-1', title: 'Project Ideas', body: 'Build a glassmorphic productivity app with Vanilla JS & CSS!', color: 'note-yellow' },
        { id: 'n-2', title: 'Groceries List', body: 'Oats, Protein Powder, Greek Yogurt, Almonds, Apples', color: 'note-blue' }
    ];

    let currentWorkoutDay = getTodayName();
    let taskFilter = 'all';
    let stopwatchInterval = null;
    let stopwatchSeconds = 0;

    /* ==========================================================================
       2. REAL-TIME CLOCK & DATE
       ========================================================================== */
    function updateClock() {
        const now = new Date();
        const timeOptions = { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true };
        const dateOptions = { weekday: 'short', month: 'short', day: '2-digit', year: 'numeric' };

        document.getElementById('liveTime').textContent = now.toLocaleTimeString('en-US', timeOptions);
        document.getElementById('liveDate').textContent = now.toLocaleDateString('en-US', dateOptions);
    }
    setInterval(updateClock, 1000);
    updateClock();

    function getTodayName() {
        const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        return days[new Date().getDay()];
    }

    /* ==========================================================================
       3. DARK / LIGHT THEME TOGGLE
       ========================================================================== */
    const themeToggleBtn = document.getElementById('themeToggleBtn');
    const settingsThemeToggle = document.getElementById('settingsThemeToggle');
    const themeIcon = document.getElementById('themeIcon');

    function applyTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem(STORAGE_KEYS.THEME, theme);
        const isDark = theme === 'dark';
        themeIcon.className = isDark ? 'fa-solid fa-moon' : 'fa-solid fa-sun';
        if (settingsThemeToggle) settingsThemeToggle.checked = isDark;
    }

    const savedTheme = localStorage.getItem(STORAGE_KEYS.THEME) || 'dark';
    applyTheme(savedTheme);

    themeToggleBtn.addEventListener('click', () => {
        const current = document.documentElement.getAttribute('data-theme');
        applyTheme(current === 'dark' ? 'light' : 'dark');
    });

    if (settingsThemeToggle) {
        settingsThemeToggle.addEventListener('change', (e) => {
            applyTheme(e.target.checked ? 'dark' : 'light');
        });
    }

    /* ==========================================================================
       4. NAVIGATION & TAB SWITCHING
       ========================================================================== */
    const navItems = document.querySelectorAll('.nav-item');
    const tabContents = document.querySelectorAll('.tab-content');
    const pageTitle = document.getElementById('pageTitle');
    const sidebar = document.getElementById('sidebar');
    const sidebarToggleBtn = document.getElementById('sidebarToggleBtn');
    const mobileCloseBtn = document.getElementById('mobileCloseBtn');

    const tabTitles = {
        dashboard: 'Dashboard Overview',
        todo: 'To-Do Task Manager',
        workout: 'Workout Routine & Logs',
        timetable: 'Weekly Timetable Schedule',
        progress: 'Analytics & Progress Gauges',
        notes: 'Sticky Notes Board',
        settings: 'Preferences & Settings'
    };

    navItems.forEach(item => {
        item.addEventListener('click', () => {
            const targetTab = item.getAttribute('data-tab');
            
            navItems.forEach(i => i.classList.remove('active'));
            tabContents.forEach(c => c.classList.remove('active'));

            item.classList.add('active');
            const targetSection = document.getElementById(`${targetTab}Section`);
            if (targetSection) targetSection.classList.add('active');

            if (pageTitle && tabTitles[targetTab]) {
                pageTitle.textContent = tabTitles[targetTab];
            }

            // Close mobile sidebar on select
            sidebar.classList.remove('mobile-open');

            // Refresh progress UI when navigating to progress
            if (targetTab === 'progress' || targetTab === 'dashboard') {
                updateAllProgressGauges();
            }
        });
    });

    sidebarToggleBtn.addEventListener('click', () => sidebar.classList.add('mobile-open'));
    mobileCloseBtn.addEventListener('click', () => sidebar.classList.remove('mobile-open'));

    /* ==========================================================================
       5. MOTIVATIONAL QUOTES MANAGER
       ========================================================================== */
    const quoteText = document.getElementById('quoteText');
    const quoteAuthor = document.getElementById('quoteAuthor');
    const footerQuote = document.getElementById('footerQuote');
    const newQuoteBtn = document.getElementById('newQuoteBtn');

    function getRandomQuote() {
        const randomIndex = Math.floor(Math.random() * QUOTES.length);
        const q = QUOTES[randomIndex];
        quoteText.textContent = `"${q.text}"`;
        quoteAuthor.textContent = q.author;
        footerQuote.textContent = `"${q.text}"`;
    }
    getRandomQuote();
    newQuoteBtn.addEventListener('click', getRandomQuote);

    /* ==========================================================================
       6. DAILY GOALS & WATER TRACKER
       ========================================================================== */
    const waterCountEl = document.getElementById('waterCount');
    const waterGlassesGrid = document.getElementById('waterGlassesGrid');
    const waterPlusBtn = document.getElementById('waterPlusBtn');
    const waterMinusBtn = document.getElementById('waterMinusBtn');

    const habits = ['habitReading', 'habitCoding', 'habitWorkout', 'habitMeditation'];

    function renderWaterTracker() {
        waterCountEl.textContent = dailyGoals.waterCount;
        waterGlassesGrid.innerHTML = '';
        for (let i = 1; i <= 8; i++) {
            const glass = document.createElement('div');
            glass.className = `glass-icon ${i <= dailyGoals.waterCount ? 'filled' : ''}`;
            glass.innerHTML = `<i class="fa-solid fa-glass-water"></i>`;
            glass.addEventListener('click', () => {
                dailyGoals.waterCount = i;
                saveGoals();
                renderWaterTracker();
                updateAllProgressGauges();
            });
            waterGlassesGrid.appendChild(glass);
        }
    }

    waterPlusBtn.addEventListener('click', () => {
        if (dailyGoals.waterCount < 8) {
            dailyGoals.waterCount++;
            saveGoals();
            renderWaterTracker();
            updateAllProgressGauges();
        }
    });

    waterMinusBtn.addEventListener('click', () => {
        if (dailyGoals.waterCount > 0) {
            dailyGoals.waterCount--;
            saveGoals();
            renderWaterTracker();
            updateAllProgressGauges();
        }
    });

    habits.forEach(hId => {
        const checkbox = document.getElementById(hId);
        if (checkbox) {
            checkbox.checked = !!dailyGoals[hId];
            checkbox.addEventListener('change', (e) => {
                dailyGoals[hId] = e.target.checked;
                saveGoals();
                updateAllProgressGauges();
            });
        }
    });

    function saveGoals() {
        localStorage.setItem(STORAGE_KEYS.GOALS, JSON.stringify(dailyGoals));
    }

    renderWaterTracker();

    /* ==========================================================================
       7. TO-DO LIST MANAGEMENT (CRUD, Drag & Drop, Filtering)
       ========================================================================== */
    const taskListContainer = document.getElementById('taskListContainer');
    const taskSearchInput = document.getElementById('taskSearchInput');
    const filterBtns = document.querySelectorAll('.filter-btn');
    const openAddTaskModalBtn = document.getElementById('openAddTaskModalBtn');
    const taskModal = document.getElementById('taskModal');
    const closeTaskModalBtn = document.getElementById('closeTaskModalBtn');
    const cancelTaskModalBtn = document.getElementById('cancelTaskModalBtn');
    const taskForm = document.getElementById('taskForm');

    function saveTasks() {
        localStorage.setItem(STORAGE_KEYS.TASKS, JSON.stringify(tasks));
        renderTasks();
        updateAllProgressGauges();
    }

    function renderTasks() {
        taskListContainer.innerHTML = '';
        const searchVal = taskSearchInput.value.toLowerCase().trim();

        let filtered = tasks.filter(t => {
            const matchesSearch = t.title.toLowerCase().includes(searchVal) || t.category.toLowerCase().includes(searchVal);
            if (taskFilter === 'pending') return matchesSearch && !t.completed;
            if (taskFilter === 'completed') return matchesSearch && t.completed;
            return matchesSearch;
        });

        filtered.sort((a, b) => (a.order ?? 0) - (b.order ?? 0));

        if (filtered.length === 0) {
            taskListContainer.innerHTML = `
                <div style="text-align: center; padding: 40px; color: var(--text-muted);">
                    <i class="fa-solid fa-clipboard-check" style="font-size: 36px; margin-bottom: 12px;"></i>
                    <p>No tasks found for this view!</p>
                </div>
            `;
            return;
        }

        filtered.forEach(task => {
            const card = document.createElement('div');
            card.className = `task-card glass-card ${task.completed ? 'completed' : ''}`;
            card.setAttribute('draggable', 'true');
            card.setAttribute('data-id', task.id);

            card.innerHTML = `
                <div class="task-card-left">
                    <span class="drag-handle"><i class="fa-solid fa-grip-vertical"></i></span>
                    <input type="checkbox" class="task-check-input" ${task.completed ? 'checked' : ''}>
                    <div class="task-content-text">
                        <span class="task-title">${escapeHTML(task.title)}</span>
                        <div class="task-meta">
                            <span><i class="fa-regular fa-calendar"></i> ${task.dueDate}</span>
                            <span class="prio-badge prio-${task.priority}">${task.priority}</span>
                            <span class="cat-tag">${task.category}</span>
                        </div>
                    </div>
                </div>
                <div class="task-actions">
                    <button class="action-icon-btn edit-btn" title="Edit Task"><i class="fa-solid fa-pen-to-square"></i></button>
                    <button class="action-icon-btn delete-btn" title="Delete Task"><i class="fa-solid fa-trash-can"></i></button>
                </div>
            `;

            // Checkbox Toggle
            const check = card.querySelector('.task-check-input');
            check.addEventListener('change', () => {
                task.completed = check.checked;
                saveTasks();
            });

            // Edit Task
            card.querySelector('.edit-btn').addEventListener('click', () => openTaskModal(task));

            // Delete Task
            card.querySelector('.delete-btn').addEventListener('click', () => {
                tasks = tasks.filter(t => t.id !== task.id);
                saveTasks();
            });

            // Drag and Drop Events
            card.addEventListener('dragstart', handleDragStart);
            card.addEventListener('dragover', handleDragOver);
            card.addEventListener('drop', handleDrop);
            card.addEventListener('dragend', handleDragEnd);

            taskListContainer.appendChild(card);
        });
    }

    // Drag & Drop Handling
    let draggedItemId = null;

    function handleDragStart(e) {
        draggedItemId = this.getAttribute('data-id');
        this.classList.add('dragging');
        e.dataTransfer.effectAllowed = 'move';
    }

    function handleDragOver(e) {
        e.preventDefault();
        e.dataTransfer.dropEffect = 'move';
    }

    function handleDrop(e) {
        e.preventDefault();
        const targetId = this.getAttribute('data-id');
        if (draggedItemId && targetId !== draggedItemId) {
            const fromIndex = tasks.findIndex(t => t.id === draggedItemId);
            const toIndex = tasks.findIndex(t => t.id === targetId);

            if (fromIndex !== -1 && toIndex !== -1) {
                const [moved] = tasks.splice(fromIndex, 1);
                tasks.splice(toIndex, 0, moved);
                tasks.forEach((t, idx) => t.order = idx);
                saveTasks();
            }
        }
    }

    function handleDragEnd() {
        this.classList.remove('dragging');
    }

    // Modal Control
    function openTaskModal(existingTask = null) {
        const titleEl = document.getElementById('taskModalTitle');
        const idInput = document.getElementById('taskId');
        const titleInput = document.getElementById('taskTitleInput');
        const dueDateInput = document.getElementById('taskDueDateInput');
        const priorityInput = document.getElementById('taskPriorityInput');
        const categoryInput = document.getElementById('taskCategoryInput');

        if (existingTask) {
            titleEl.textContent = 'Edit Task';
            idInput.value = existingTask.id;
            titleInput.value = existingTask.title;
            dueDateInput.value = existingTask.dueDate;
            priorityInput.value = existingTask.priority;
            categoryInput.value = existingTask.category;
        } else {
            titleEl.textContent = 'Add New Task';
            idInput.value = '';
            titleInput.value = '';
            dueDateInput.value = new Date().toISOString().split('T')[0];
            priorityInput.value = 'Medium';
            categoryInput.value = 'Work';
        }

        taskModal.classList.add('active');
    }

    function closeTaskModal() {
        taskModal.classList.remove('active');
    }

    openAddTaskModalBtn.addEventListener('click', () => openTaskModal());
    closeTaskModalBtn.addEventListener('click', closeTaskModal);
    cancelTaskModalBtn.addEventListener('click', closeTaskModal);

    taskForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const id = document.getElementById('taskId').value;
        const title = document.getElementById('taskTitleInput').value.trim();
        const dueDate = document.getElementById('taskDueDateInput').value;
        const priority = document.getElementById('taskPriorityInput').value;
        const category = document.getElementById('taskCategoryInput').value;

        if (id) {
            const task = tasks.find(t => t.id === id);
            if (task) {
                task.title = title;
                task.dueDate = dueDate;
                task.priority = priority;
                task.category = category;
            }
        } else {
            const newTask = {
                id: 't-' + Date.now(),
                title,
                dueDate,
                priority,
                category,
                completed: false,
                order: tasks.length
            };
            tasks.push(newTask);
        }

        saveTasks();
        closeTaskModal();
    });

    taskSearchInput.addEventListener('input', renderTasks);

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            taskFilter = btn.getAttribute('data-filter');
            renderTasks();
        });
    });

    renderTasks();

    /* ==========================================================================
       8. WORKOUT ROUTINE TRACKER & STOPWATCH TIMER
       ========================================================================== */
    const workoutDayTabs = document.getElementById('workoutDayTabs');
    const activeRoutineTitle = document.getElementById('activeRoutineTitle');
    const activeRoutineSub = document.getElementById('activeRoutineSub');
    const routineProgressFill = document.getElementById('routineProgressFill');
    const routineProgressText = document.getElementById('routineProgressText');
    const exerciseCardsGrid = document.getElementById('exerciseCardsGrid');
    const todayWorkoutDay = document.getElementById('todayWorkoutDay');
    const todayWorkoutPreview = document.getElementById('todayWorkoutPreview');

    // Stopwatch Modal Elements
    const timerModal = document.getElementById('timerModal');
    const closeTimerModalBtn = document.getElementById('closeTimerModalBtn');
    const timerModalExercise = document.getElementById('timerModalExercise');
    const stopwatchDisplay = document.getElementById('stopwatchDisplay');
    const timerStartBtn = document.getElementById('timerStartBtn');
    const timerPauseBtn = document.getElementById('timerPauseBtn');
    const timerResetBtn = document.getElementById('timerResetBtn');

    function saveWorkouts() {
        localStorage.setItem(STORAGE_KEYS.WORKOUTS, JSON.stringify(workouts));
        renderWorkoutSection();
        renderTodayWorkoutPreview();
        updateAllProgressGauges();
    }

    function renderWorkoutSection() {
        const routine = workouts[currentWorkoutDay];
        if (!routine) return;

        activeRoutineTitle.textContent = routine.title;
        activeRoutineSub.textContent = routine.sub;

        const totalEx = routine.exercises.length;
        const doneEx = routine.exercises.filter(e => e.completed).length;
        const pct = totalEx > 0 ? Math.round((doneEx / totalEx) * 100) : 0;

        routineProgressFill.style.width = `${pct}%`;
        routineProgressText.textContent = `${pct}% Completed (${doneEx}/${totalEx})`;

        exerciseCardsGrid.innerHTML = '';

        routine.exercises.forEach(ex => {
            const card = document.createElement('div');
            card.className = 'exercise-card glass-card';
            card.innerHTML = `
                <div class="ex-card-header">
                    <div class="ex-title-wrap">
                        <i class="fa-solid ${ex.icon}"></i>
                        <h4>${escapeHTML(ex.name)}</h4>
                    </div>
                    <input type="checkbox" class="ex-check" ${ex.completed ? 'checked' : ''}>
                </div>
                <div class="ex-details-grid">
                    <div class="ex-stat-item"><span>Sets</span><strong>${ex.sets}</strong></div>
                    <div class="ex-stat-item"><span>Reps</span><strong>${ex.reps}</strong></div>
                    <div class="ex-stat-item"><span>Target</span><strong>${ex.duration}</strong></div>
                </div>
                <button class="timer-trigger-btn">
                    <i class="fa-solid fa-stopwatch"></i> Start Timer
                </button>
            `;

            card.querySelector('.ex-check').addEventListener('change', (e) => {
                ex.completed = e.target.checked;
                saveWorkouts();
            });

            card.querySelector('.timer-trigger-btn').addEventListener('click', () => {
                openTimerModal(ex.name);
            });

            exerciseCardsGrid.appendChild(card);
        });
    }

    function renderTodayWorkoutPreview() {
        const today = getTodayName();
        if (todayWorkoutDay) todayWorkoutDay.textContent = today;
        const routine = workouts[today];

        if (!routine || !todayWorkoutPreview) return;

        todayWorkoutPreview.innerHTML = `
            <p style="font-size: 14px; font-weight: 600; color: var(--primary); margin-bottom: 8px;">${routine.title}</p>
        `;

        routine.exercises.slice(0, 3).forEach(ex => {
            const item = document.createElement('div');
            item.className = 'quick-ex-item glass-card';
            item.innerHTML = `
                <div class="quick-ex-left">
                    <i class="fa-solid ${ex.icon}"></i>
                    <div>
                        <div class="quick-ex-title">${escapeHTML(ex.name)}</div>
                        <div class="quick-ex-meta">${ex.sets} Sets x ${ex.reps} Reps</div>
                    </div>
                </div>
                <span style="font-size: 12px; color: ${ex.completed ? 'var(--success)' : 'var(--text-dim)'}">
                    ${ex.completed ? '<i class="fa-solid fa-circle-check"></i> Done' : 'Pending'}
                </span>
            `;
            todayWorkoutPreview.appendChild(item);
        });
    }

    workoutDayTabs.querySelectorAll('.day-tab').forEach(tab => {
        tab.addEventListener('click', () => {
            workoutDayTabs.querySelectorAll('.day-tab').forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            currentWorkoutDay = tab.getAttribute('data-day');
            renderWorkoutSection();
        });
    });

    // Stopwatch Controls
    function openTimerModal(exName) {
        timerModalExercise.textContent = exName;
        stopwatchSeconds = 0;
        updateStopwatchDisplay();
        timerModal.classList.add('active');
    }

    function closeTimerModal() {
        clearInterval(stopwatchInterval);
        stopwatchInterval = null;
        timerModal.classList.remove('active');
    }

    function updateStopwatchDisplay() {
        const mins = Math.floor(stopwatchSeconds / 60).toString().padStart(2, '0');
        const secs = (stopwatchSeconds % 60).toString().padStart(2, '0');
        stopwatchDisplay.textContent = `${mins}:${secs}`;
    }

    timerStartBtn.addEventListener('click', () => {
        if (!stopwatchInterval) {
            stopwatchInterval = setInterval(() => {
                stopwatchSeconds++;
                updateStopwatchDisplay();
            }, 1000);
        }
    });

    timerPauseBtn.addEventListener('click', () => {
        clearInterval(stopwatchInterval);
        stopwatchInterval = null;
    });

    timerResetBtn.addEventListener('click', () => {
        clearInterval(stopwatchInterval);
        stopwatchInterval = null;
        stopwatchSeconds = 0;
        updateStopwatchDisplay();
    });

    closeTimerModalBtn.addEventListener('click', closeTimerModal);

    renderWorkoutSection();
    renderTodayWorkoutPreview();

    /* ==========================================================================
       9. WEEKLY TIMETABLE GRID
       ========================================================================== */
    const timetableBody = document.getElementById('timetableBody');
    const clearTimetableBtn = document.getElementById('clearTimetableBtn');

    const hours = [
        '6 AM', '7 AM', '8 AM', '9 AM', '10 AM', '11 AM',
        '12 PM', '1 PM', '2 PM', '3 PM', '4 PM', '5 PM',
        '6 PM', '7 PM', '8 PM', '9 PM', '10 PM'
    ];

    const daysList = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

    function renderTimetable() {
        timetableBody.innerHTML = '';
        hours.forEach(hour => {
            const tr = document.createElement('tr');
            tr.innerHTML = `<td class="time-col">${hour}</td>`;

            daysList.forEach(day => {
                const cellKey = `${day}-${hour}`;
                const cellVal = timetableData[cellKey] || '';

                const td = document.createElement('td');
                td.setAttribute('contenteditable', 'true');
                td.setAttribute('data-key', cellKey);
                td.textContent = cellVal;

                td.addEventListener('blur', () => {
                    timetableData[cellKey] = td.textContent.trim();
                    localStorage.setItem(STORAGE_KEYS.TIMETABLE, JSON.stringify(timetableData));
                });

                tr.appendChild(td);
            });

            timetableBody.appendChild(tr);
        });
    }

    clearTimetableBtn.addEventListener('click', () => {
        if (confirm('Are you sure you want to clear your timetable schedule?')) {
            timetableData = {};
            localStorage.setItem(STORAGE_KEYS.TIMETABLE, JSON.stringify(timetableData));
            renderTimetable();
        }
    });

    renderTimetable();

    /* ==========================================================================
       10. STICKY NOTES SECTION
       ========================================================================== */
    const notesGrid = document.getElementById('notesGrid');
    const addNoteBtn = document.getElementById('addNoteBtn');

    const noteColors = ['note-yellow', 'note-blue', 'note-green', 'note-pink'];

    function saveNotes() {
        localStorage.setItem(STORAGE_KEYS.NOTES, JSON.stringify(stickyNotes));
        renderNotes();
    }

    function renderNotes() {
        notesGrid.innerHTML = '';
        stickyNotes.forEach(n => {
            const card = document.createElement('div');
            card.className = `sticky-note glass-card ${n.color}`;
            card.innerHTML = `
                <div class="note-top">
                    <input type="text" class="note-title" value="${escapeHTML(n.title)}" placeholder="Title...">
                    <button class="note-del-btn" title="Delete Note"><i class="fa-solid fa-xmark"></i></button>
                </div>
                <textarea class="note-body" placeholder="Write your note...">${escapeHTML(n.body)}</textarea>
            `;

            card.querySelector('.note-title').addEventListener('input', (e) => {
                n.title = e.target.value;
                localStorage.setItem(STORAGE_KEYS.NOTES, JSON.stringify(stickyNotes));
            });

            card.querySelector('.note-body').addEventListener('input', (e) => {
                n.body = e.target.value;
                localStorage.setItem(STORAGE_KEYS.NOTES, JSON.stringify(stickyNotes));
            });

            card.querySelector('.note-del-btn').addEventListener('click', () => {
                stickyNotes = stickyNotes.filter(item => item.id !== n.id);
                saveNotes();
            });

            notesGrid.appendChild(card);
        });
    }

    addNoteBtn.addEventListener('click', () => {
        const randomColor = noteColors[Math.floor(Math.random() * noteColors.length)];
        const newNote = {
            id: 'n-' + Date.now(),
            title: 'New Note',
            body: '',
            color: randomColor
        };
        stickyNotes.push(newNote);
        saveNotes();
    });

    renderNotes();

    /* ==========================================================================
       11. PROGRESS DASHBOARD & METRICS MATH
       ========================================================================== */
    function updateAllProgressGauges() {
        // Task Metrics
        const totalTasks = tasks.length;
        const completedTasks = tasks.filter(t => t.completed).length;
        const pendingTasks = totalTasks - completedTasks;
        const taskPct = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

        // Dashboard Top Cards
        document.getElementById('dashTotalTasks').textContent = totalTasks;
        document.getElementById('dashCompletedTasks').textContent = completedTasks;
        document.getElementById('dashPendingTasks').textContent = pendingTasks;

        // Breakdown Table
        document.getElementById('statTotalTasks').textContent = totalTasks;
        document.getElementById('statCompletedTasks').textContent = completedTasks;
        document.getElementById('statPendingTasks').textContent = pendingTasks;
        document.getElementById('statWaterIntake').textContent = `${dailyGoals.waterCount} / 8 Glasses`;

        // Workout Metrics
        let totalWorkoutCards = 0;
        let completedWorkoutCards = 0;
        Object.values(workouts).forEach(day => {
            day.exercises.forEach(ex => {
                totalWorkoutCards++;
                if (ex.completed) completedWorkoutCards++;
            });
        });
        const workoutPct = totalWorkoutCards > 0 ? Math.round((completedWorkoutCards / totalWorkoutCards) * 100) : 0;

        document.getElementById('statWorkoutExercises').textContent = `${completedWorkoutCards} Finished`;

        // Daily Goals Habit Metrics
        const checkedHabitsCount = habits.filter(h => dailyGoals[h]).length;
        const goalsPct = Math.round(((dailyGoals.waterCount / 8) * 0.4 + (checkedHabitsCount / habits.length) * 0.6) * 100);

        // Weighted Overall Productivity Score
        const overallProd = Math.round((taskPct * 0.45) + (workoutPct * 0.35) + (goalsPct * 0.20));

        document.getElementById('dashProductivity').textContent = `${overallProd}%`;

        // Update Circular SVG Gauges
        setGaugeValue('circleProd', 'valProd', overallProd);
        setGaugeValue('circleWorkout', 'valWorkout', workoutPct);
        setGaugeValue('circleTasks', 'valTasks', taskPct);
    }

    function setGaugeValue(circleId, textId, pct) {
        const circle = document.getElementById(circleId);
        const text = document.getElementById(textId);
        if (!circle || !text) return;

        const circumference = 440; // 2 * PI * r = 2 * 3.14159 * 70 = 439.8
        const offset = circumference - (pct / 100) * circumference;
        circle.style.strokeDashoffset = offset;
        text.textContent = `${pct}%`;
    }

    updateAllProgressGauges();

    /* ==========================================================================
       12. PREFERENCES RESET & UTILITIES
       ========================================================================== */
    const resetDataBtn = document.getElementById('resetDataBtn');
    if (resetDataBtn) {
        resetDataBtn.addEventListener('click', () => {
            if (confirm('CAUTION: This will permanently wipe all stored tasks, workouts, timetable, notes, and habits! Proceed?')) {
                localStorage.clear();
                location.reload();
            }
        });
    }

    function escapeHTML(str) {
        if (!str) return '';
        return str.replace(/[&<>'"]/g, 
            tag => ({
                '&': '&amp;',
                '<': '&lt;',
                '>': '&gt;',
                "'": '&#39;',
                '"': '&quot;'
            }[tag] || tag)
        );
    }
});

// PWA Service Worker Registration
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('./sw.js')
            .then(reg => console.log('AURA PWA Service Worker Registered:', reg.scope))
            .catch(err => console.log('Service Worker Registration Failed:', err));
    });
}

