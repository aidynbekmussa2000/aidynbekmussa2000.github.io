/**
 * AIDYNBEK MUSSA - DYNAMIC WINDOWS PORTFOLIO
 * Interactive Desktop UI with Draggable Windows
 */

(function() {
  'use strict';

  // ================================
  // STATE MANAGEMENT
  // ================================

  const state = {
    windows: {},
    activeWindow: null,
    zIndexCounter: 100,
    isDragging: false,
    isResizing: false,
    dragTarget: null,
    dragOffset: { x: 0, y: 0 },
    resizeTarget: null,
    startSize: { width: 0, height: 0 },
    startPos: { x: 0, y: 0 }
  };

  // ================================
  // INITIALIZATION
  // ================================

  document.addEventListener('DOMContentLoaded', init);

  function init() {
    initWindows();
    initDesktopIcons();
    initTaskbar();
    initStartMenu();
    initTerminal();
    updateClock();
    setInterval(updateClock, 1000);

    // Open welcome window by default
    setTimeout(() => {
      openWindow('welcome');
    }, 300);
  }

  // ================================
  // WINDOW MANAGEMENT
  // ================================

  function initWindows() {
    const windows = document.querySelectorAll('.window');

    windows.forEach(win => {
      const id = win.id.replace('window-', '');
      state.windows[id] = {
        element: win,
        isMinimized: false,
        isMaximized: false,
        prevState: null
      };

      // Window header drag
      const header = win.querySelector('.window-header');
      if (header) {
        header.addEventListener('mousedown', (e) => startDrag(e, win));
        header.addEventListener('touchstart', (e) => startDrag(e, win), { passive: false });
      }

      // Window controls
      const controls = win.querySelectorAll('.window-btn');
      controls.forEach(btn => {
        btn.addEventListener('click', (e) => {
          e.stopPropagation();
          const action = btn.dataset.action;
          if (action === 'close') closeWindow(id);
          else if (action === 'minimize') minimizeWindow(id);
          else if (action === 'maximize') maximizeWindow(id);
        });
      });

      // Click to focus
      win.addEventListener('mousedown', () => focusWindow(id));

      // Resize handle
      win.addEventListener('mousedown', (e) => {
        const rect = win.getBoundingClientRect();
        const isInResizeZone = (e.clientX > rect.right - 20 && e.clientY > rect.bottom - 20);
        if (isInResizeZone) {
          startResize(e, win);
        }
      });

      // Double-click header to maximize
      header.addEventListener('dblclick', () => maximizeWindow(id));
    });

    // Global mouse events
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('touchmove', handleMouseMove, { passive: false });
    document.addEventListener('touchend', handleMouseUp);
  }

  function openWindow(id) {
    const winState = state.windows[id];
    if (!winState) return;

    const win = winState.element;
    win.classList.add('active');
    win.classList.remove('minimized');
    winState.isMinimized = false;

    focusWindow(id);
    updateTaskbar();
  }

  function closeWindow(id) {
    const winState = state.windows[id];
    if (!winState) return;

    const win = winState.element;
    win.classList.remove('active', 'focused', 'maximized', 'minimized');
    winState.isMinimized = false;
    winState.isMaximized = false;

    if (state.activeWindow === id) {
      state.activeWindow = null;
    }

    updateTaskbar();
  }

  function minimizeWindow(id) {
    const winState = state.windows[id];
    if (!winState) return;

    const win = winState.element;
    win.classList.add('minimized');
    win.classList.remove('focused');
    winState.isMinimized = true;

    if (state.activeWindow === id) {
      state.activeWindow = null;
    }

    updateTaskbar();
  }

  function maximizeWindow(id) {
    const winState = state.windows[id];
    if (!winState) return;

    const win = winState.element;

    if (winState.isMaximized) {
      // Restore
      win.classList.remove('maximized');
      if (winState.prevState) {
        win.style.width = winState.prevState.width;
        win.style.height = winState.prevState.height;
        win.style.top = winState.prevState.top;
        win.style.left = winState.prevState.left;
        win.style.transform = winState.prevState.transform;
      }
      winState.isMaximized = false;
    } else {
      // Maximize
      winState.prevState = {
        width: win.style.width,
        height: win.style.height,
        top: win.style.top,
        left: win.style.left,
        transform: win.style.transform
      };
      win.style.transform = 'none';
      win.classList.add('maximized');
      winState.isMaximized = true;
    }
  }

  function focusWindow(id) {
    const winState = state.windows[id];
    if (!winState) return;

    // Remove focus from all windows
    Object.values(state.windows).forEach(w => {
      w.element.classList.remove('focused');
    });

    // Focus this window
    const win = winState.element;
    win.classList.add('focused');
    win.style.zIndex = ++state.zIndexCounter;
    state.activeWindow = id;

    updateTaskbar();
  }

  // ================================
  // DRAG & RESIZE
  // ================================

  function startDrag(e, win) {
    if (e.target.closest('.window-btn')) return;

    const winId = win.id.replace('window-', '');
    const winState = state.windows[winId];
    if (winState && winState.isMaximized) return;

    e.preventDefault();
    state.isDragging = true;
    state.dragTarget = win;

    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    const rect = win.getBoundingClientRect();

    state.dragOffset = {
      x: clientX - rect.left,
      y: clientY - rect.top
    };

    win.style.transform = 'none';
  }

  function startResize(e, win) {
    const winId = win.id.replace('window-', '');
    const winState = state.windows[winId];
    if (winState && winState.isMaximized) return;

    e.preventDefault();
    e.stopPropagation();
    state.isResizing = true;
    state.resizeTarget = win;

    const rect = win.getBoundingClientRect();
    state.startSize = {
      width: rect.width,
      height: rect.height
    };
    state.startPos = {
      x: e.clientX,
      y: e.clientY
    };
  }

  function handleMouseMove(e) {
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;

    if (state.isDragging && state.dragTarget) {
      e.preventDefault();
      let newX = clientX - state.dragOffset.x;
      let newY = clientY - state.dragOffset.y;

      // Constrain to viewport
      const maxX = window.innerWidth - 100;
      const maxY = window.innerHeight - 100;
      newX = Math.max(0, Math.min(newX, maxX));
      newY = Math.max(0, Math.min(newY, maxY));

      state.dragTarget.style.left = newX + 'px';
      state.dragTarget.style.top = newY + 'px';
    }

    if (state.isResizing && state.resizeTarget) {
      e.preventDefault();
      const dx = clientX - state.startPos.x;
      const dy = clientY - state.startPos.y;

      const newWidth = Math.max(300, state.startSize.width + dx);
      const newHeight = Math.max(200, state.startSize.height + dy);

      state.resizeTarget.style.width = newWidth + 'px';
      state.resizeTarget.style.height = newHeight + 'px';
    }
  }

  function handleMouseUp() {
    state.isDragging = false;
    state.isResizing = false;
    state.dragTarget = null;
    state.resizeTarget = null;
  }

  // ================================
  // DESKTOP ICONS
  // ================================

  function initDesktopIcons() {
    const icons = document.querySelectorAll('.desktop-icon');
    icons.forEach(icon => {
      icon.addEventListener('dblclick', () => {
        const windowId = icon.dataset.window;
        openWindow(windowId);
      });

      // Touch support - single tap to open
      let tapTimeout;
      icon.addEventListener('touchend', (e) => {
        e.preventDefault();
        if (tapTimeout) {
          clearTimeout(tapTimeout);
          tapTimeout = null;
          const windowId = icon.dataset.window;
          openWindow(windowId);
        } else {
          tapTimeout = setTimeout(() => {
            tapTimeout = null;
            const windowId = icon.dataset.window;
            openWindow(windowId);
          }, 300);
        }
      });
    });
  }

  // ================================
  // TASKBAR
  // ================================

  function initTaskbar() {
    updateTaskbar();
  }

  function updateTaskbar() {
    const container = document.getElementById('taskbar-windows');
    if (!container) return;

    container.innerHTML = '';

    Object.entries(state.windows).forEach(([id, winState]) => {
      if (!winState.element.classList.contains('active') && !winState.isMinimized) return;

      const title = winState.element.querySelector('.window-title');
      const titleText = title ? title.textContent.trim() : id;
      const icon = title ? title.querySelector('i') : null;
      const iconClass = icon ? icon.className : 'fas fa-window-maximize';

      const btn = document.createElement('button');
      btn.className = 'taskbar-window-btn';
      if (state.activeWindow === id && !winState.isMinimized) {
        btn.classList.add('active');
      }
      if (winState.isMinimized) {
        btn.classList.add('minimized');
      }

      btn.innerHTML = `<i class="${iconClass}"></i><span>${titleText}</span>`;
      btn.addEventListener('click', () => {
        if (winState.isMinimized) {
          openWindow(id);
        } else if (state.activeWindow === id) {
          minimizeWindow(id);
        } else {
          focusWindow(id);
        }
      });

      container.appendChild(btn);
    });
  }

  function updateClock() {
    const clockEl = document.getElementById('current-time');
    if (!clockEl) return;

    const now = new Date();
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    clockEl.textContent = `${hours}:${minutes}`;
  }

  // ================================
  // START MENU
  // ================================

  function initStartMenu() {
    const startBtn = document.getElementById('start-btn');
    const startMenu = document.getElementById('start-menu');

    if (!startBtn || !startMenu) return;

    startBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      startBtn.classList.toggle('active');
      startMenu.classList.toggle('active');
    });

    // Close start menu when clicking outside
    document.addEventListener('click', (e) => {
      if (!startMenu.contains(e.target) && !startBtn.contains(e.target)) {
        startMenu.classList.remove('active');
        startBtn.classList.remove('active');
      }
    });

    // Start menu items
    const items = startMenu.querySelectorAll('.start-menu-item');
    items.forEach(item => {
      item.addEventListener('click', () => {
        const windowId = item.dataset.window;
        openWindow(windowId);
        startMenu.classList.remove('active');
        startBtn.classList.remove('active');
      });
    });
  }

  // ================================
  // TERMINAL EMULATOR
  // ================================

  function initTerminal() {
    const input = document.getElementById('terminal-input');
    const output = document.getElementById('terminal-output');

    if (!input || !output) return;

    input.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        const command = input.value.trim().toLowerCase();
        executeCommand(command, output);
        input.value = '';
      }
    });

    // Focus input when terminal window is clicked
    const terminalWindow = document.getElementById('window-terminal');
    if (terminalWindow) {
      terminalWindow.querySelector('.terminal-content').addEventListener('click', () => {
        input.focus();
      });
    }
  }

  function executeCommand(command, output) {
    // Add command to output
    const cmdLine = document.createElement('div');
    cmdLine.className = 'terminal-line';
    cmdLine.innerHTML = `<span class="terminal-prompt">guest@aidynbek-portfolio:~$</span><span class="terminal-text">${escapeHtml(command)}</span>`;
    output.appendChild(cmdLine);

    // Process command
    let response = '';

    switch (command) {
      case 'help':
        response = `Available commands:
  about      - Learn about Aidynbek
  skills     - View technical skills
  projects   - List featured projects
  contact    - Get contact information
  education  - View education history
  experience - View work experience
  clear      - Clear the terminal
  date       - Show current date
  whoami     - Display current user
  ls         - List available sections
  cat [file] - View file contents`;
        break;

      case 'about':
        response = `Aidynbek Mussa
===============
Data Analyst & Economist based in New York, NY

I'm passionate about solving complex problems with data.
I bring a unique blend of quantitative skills, economic
insight, and systems thinking to turn raw information
into meaningful impact.

Type 'skills' to see my technical abilities.`;
        break;

      case 'skills':
        response = `Technical Skills
================
Languages: Python (95%), SQL (90%), R (80%), JavaScript (70%)

Tools & Frameworks:
  - Data: Pandas, NumPy, Scikit-learn, TensorFlow
  - Databases: PostgreSQL, Neo4j, MongoDB
  - Visualization: Tableau, Matplotlib, Plotly
  - DevOps: Docker, AWS, Git, Airflow

Type 'projects' to see my work.`;
        break;

      case 'projects':
        response = `Featured Projects
=================
1. NYC Crime Clustering Analysis
   Spatial analysis using clustering algorithms and GIS
   Technologies: Python, Scikit-learn, GeoPandas

2. Gasoline Price ETL & Dashboard
   End-to-end ETL pipeline and real-time dashboard
   Technologies: Python, SQL, Tableau

3. TerrorGraph (Neo4j)
   Graph database analysis of Global Terrorism Database
   Technologies: Neo4j, Cypher, Python

4. GetEnglish (In Development)
   AI-powered language learning Telegram bot
   Technologies: Python, OpenAI API, Telegram Bot API`;
        break;

      case 'contact':
        response = `Contact Information
===================
Email:    aidynbek.mussa@columbia.edu
LinkedIn: linkedin.com/in/aidynbekmussa
GitHub:   github.com/aidynbekmussa2000
Telegram: @aidynthecreator
Location: New York, NY`;
        break;

      case 'education':
        response = `Education
=========
M.S. Applied Analytics
  Columbia University, New York

B.A. Economics & Mathematics
  Nazarbayev University, Kazakhstan`;
        break;

      case 'experience':
        response = `Work Experience
===============
National Bank of Kazakhstan
  - Macroeconomic forecasting
  - Commodity price modeling
  - Analytical report writing

Current: Data Analytics & ML Projects
  - Focus on ETL pipelines, ML models
  - AI in education applications`;
        break;

      case 'clear':
        output.innerHTML = '';
        return;

      case 'date':
        response = new Date().toString();
        break;

      case 'whoami':
        response = 'guest';
        break;

      case 'ls':
        response = `about/  skills/  projects/  contact/  education/  experience/`;
        break;

      case 'cat about':
      case 'cat about/':
        executeCommand('about', output);
        return;

      case 'cat skills':
      case 'cat skills/':
        executeCommand('skills', output);
        return;

      case 'cat projects':
      case 'cat projects/':
        executeCommand('projects', output);
        return;

      case 'cat contact':
      case 'cat contact/':
        executeCommand('contact', output);
        return;

      case '':
        return;

      default:
        if (command.startsWith('cat ')) {
          response = `cat: ${command.substring(4)}: No such file or directory`;
        } else {
          response = `Command not found: ${command}\nType 'help' for available commands.`;
        }
    }

    // Add response to output
    const responseLine = document.createElement('div');
    responseLine.className = 'terminal-line';
    responseLine.innerHTML = `<span class="terminal-response"><pre>${escapeHtml(response)}</pre></span>`;
    output.appendChild(responseLine);

    // Scroll to bottom
    output.scrollTop = output.scrollHeight;
  }

  function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }

  // ================================
  // GLOBAL FUNCTION EXPORTS
  // ================================

  window.openWindow = openWindow;
  window.closeWindow = closeWindow;
  window.minimizeWindow = minimizeWindow;
  window.maximizeWindow = maximizeWindow;

})();
