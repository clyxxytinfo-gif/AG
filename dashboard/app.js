// ====== DATA MANAGEMENT ====== 
class Dashboard {
    constructor(userId) {
        this.userId = userId;
        this.dataKey = `dashboard_${userId}`;
        this.data = {
            user: userId,
            tickets: [],
            tasks: [],
            projects: [],
            teams: [],
            customers: [],
            notifications: [],
            comments: []
        };

        this.initializeData();
        this.loadFromLocalStorage();
    }

    initializeData() {
        if (!this.data.teams.length) {
            this.data.teams = [
                { id: 'team1', name: 'Support Team', lead: 'user1', members: ['user1', 'user3'], description: 'Hauptsupport-Team für Kundenunterstützung' },
                { id: 'team2', name: 'Technik Team', lead: 'user2', members: ['user2', 'user4'], description: 'Technische Infrastruktur und Wartung' }
            ];
        }

        if (!this.data.customers.length) {
            this.data.customers = [
                { id: 'cust1', name: 'ABC GmbH', contact: 'Herr Müller', email: 'mueller@abc.de', phone: '+49 30 123456', contract: 'Premium', sla: '4h', website: 'www.abc.de', industry: 'Einzelhandel' },
                { id: 'cust2', name: 'XYZ AG', contact: 'Frau Schmidt', email: 'schmidt@xyz.de', phone: '+49 40 987654', contract: 'Standard', sla: '8h', website: 'www.xyz.de', industry: 'Consulting' },
                { id: 'cust3', name: 'Tech Solutions Ltd', contact: 'John Smith', email: 'john@techsol.co.uk', phone: '+44 20 456789', contract: 'Enterprise', sla: '2h', website: 'www.techsol.co.uk', industry: 'IT-Services' }
            ];
        }

        if (!this.data.projects.length) {
            this.data.projects = [
                {
                    id: 'proj1',
                    title: 'Netzwerk-Upgrade',
                    description: 'Modernisierung der Netzwerkinfrastruktur inklusive neuer Router und Switche',
                    progress: 65,
                    status: 'in-bearbeitung',
                    tasks: 12,
                    completedTasks: 8,
                    lead: 'user2',
                    startDate: '2026-01-15',
                    endDate: '2026-03-15',
                    budget: '€50.000',
                    team: 'team2'
                },
                {
                    id: 'proj2',
                    title: 'IT-Sicherheit & Compliance',
                    description: 'Sicherheitsaudit und Verbesserungen gemäß DSGVO',
                    progress: 45,
                    status: 'in-bearbeitung',
                    tasks: 10,
                    completedTasks: 4,
                    lead: 'user1',
                    startDate: '2026-01-01',
                    endDate: '2026-04-01',
                    budget: '€30.000',
                    team: 'team1'
                },
                {
                    id: 'proj3',
                    title: 'Helpdesk-Optimierung',
                    description: 'Prozessoptimierung im Support und Implementierung neuer Tools',
                    progress: 85,
                    status: 'in-bearbeitung',
                    tasks: 8,
                    completedTasks: 7,
                    lead: 'user3',
                    startDate: '2025-12-01',
                    endDate: '2026-02-28',
                    budget: '€15.000',
                    team: 'team1'
                }
            ];
        }

        if (!this.data.tickets.length) {
            this.data.tickets = [
                {
                    id: 'TKT-001',
                    title: 'Drucker funktioniert nicht',
                    description: 'Der Drucker im 3. Stock funktioniert nicht mehr und zeigt Fehlercode E401',
                    category: 'hardware',
                    priority: 'mittel',
                    status: 'neu',
                    assignee: 'user1',
                    customer: 'cust1',
                    dueDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
                    createdAt: new Date().toISOString(),
                    updatedAt: new Date().toISOString(),
                    comments: ['Kunde ist ungeduldig', 'Ersatzteil bestellt'],
                    attachments: []
                },
                {
                    id: 'TKT-002',
                    title: 'Software-Lizenz abgelaufen',
                    description: 'Microsoft Office Lizenz muss erneuert werden für 5 Arbeitsplätze',
                    category: 'software',
                    priority: 'hoch',
                    status: 'in-bearbeitung',
                    assignee: 'user2',
                    customer: 'cust2',
                    dueDate: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
                    createdAt: new Date().toISOString(),
                    updatedAt: new Date().toISOString(),
                    comments: ['Lizenzschlüssel erhalten', 'Installation läuft'],
                    attachments: []
                },
                {
                    id: 'TKT-003',
                    title: 'Netzwerkverbindung unstabil',
                    description: 'VPN-Verbindung bricht immer wieder ab, besonders morgens',
                    category: 'netzwerk',
                    priority: 'kritisch',
                    status: 'wartend',
                    assignee: 'user4',
                    customer: 'cust1',
                    dueDate: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
                    createdAt: new Date().toISOString(),
                    updatedAt: new Date().toISOString(),
                    comments: ['Diagnostic läuft', 'Netzwerk-Team wird kontaktiert'],
                    attachments: []
                },
                {
                    id: 'TKT-004',
                    title: 'Windows Update Installation',
                    description: 'Windows Security Update auf 15 Computern installieren',
                    category: 'software',
                    priority: 'mittel',
                    status: 'gelöst',
                    assignee: 'user3',
                    customer: 'cust3',
                    dueDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
                    createdAt: new Date().toISOString(),
                    updatedAt: new Date().toISOString(),
                    comments: ['Alle PCs gescannt', 'Updates installiert'],
                    attachments: []
                }
            ];
        }

        if (!this.data.tasks.length) {
            this.data.tasks = [
                { id: 'task1', title: 'Dokumentation aktualisieren', priority: 'niedrig', status: 'offen', dueDate: '2026-02-05', assignee: 'user1', description: 'Alle Prozessabläufe dokumentieren' },
                { id: 'task2', title: 'Team-Meeting vorbereiten', priority: 'mittel', status: 'in-arbeit', dueDate: '2026-02-03', assignee: 'user2', description: 'Agenda und Unterlagen vorbereiten' },
                { id: 'task3', title: 'Bug in Ticketsystem beheben', priority: 'hoch', status: 'in-arbeit', dueDate: '2026-02-01', assignee: 'user3', description: 'Fehler bei Ticket-Zuweisung beheben' },
                { id: 'task4', title: 'Backup-Überprüfung durchführen', priority: 'mittel', status: 'blockiert', dueDate: '2026-02-10', assignee: 'user4', description: 'Alle Backups testen' },
                { id: 'task5', title: 'User-Training durchführen', priority: 'niedrig', status: 'erledigt', dueDate: '2026-01-20', assignee: 'user1', description: 'Dashboard-Training für neue User' },
                { id: 'task6', title: 'Security-Patches einspielen', priority: 'kritisch', status: 'offen', dueDate: '2026-01-30', assignee: 'user2', description: 'Kritische Sicherheits-Updates einspielen' }
            ];
        }

        if (!this.data.notifications.length) {
            this.data.notifications = [
                { id: 1, message: 'Ticket TKT-003 ist überfällig', type: 'warning', read: false, timestamp: new Date() },
                { id: 2, message: 'Neue Aufgabe zugewiesen', type: 'info', read: false, timestamp: new Date() },
                { id: 3, message: 'Projekt abgeschlossen', type: 'success', read: false, timestamp: new Date() }
            ];
        }
    }

    saveToLocalStorage() {
        localStorage.setItem(this.dataKey, JSON.stringify(this.data));
    }

    loadFromLocalStorage() {
        const stored = localStorage.getItem(this.dataKey);
        if (stored) {
            this.data = JSON.parse(stored);
        }
    }

    clearAllData() {
        localStorage.removeItem(this.dataKey);
        this.data = {
            user: this.userId,
            tickets: [],
            tasks: [],
            projects: [],
            teams: [],
            customers: [],
            notifications: [],
            comments: []
        };
        this.initializeData();
    }

    // Ticket Management
    addTicket(ticket) {
        const nextId = Math.max(...this.data.tickets.map(t => parseInt(t.id.split('-')[1])), 0) + 1;
        const newTicket = {
            ...ticket,
            id: `TKT-${String(nextId).padStart(3, '0')}`,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            comments: [],
            attachments: []
        };
        this.data.tickets.push(newTicket);
        this.saveToLocalStorage();
        return newTicket;
    }

    updateTicket(id, updates) {
        const ticket = this.data.tickets.find(t => t.id === id);
        if (ticket) {
            Object.assign(ticket, updates);
            ticket.updatedAt = new Date().toISOString();
            this.saveToLocalStorage();
        }
        return ticket;
    }

    deleteTicket(id) {
        this.data.tickets = this.data.tickets.filter(t => t.id !== id);
        this.saveToLocalStorage();
    }

    addCommentToTicket(ticketId, comment) {
        const ticket = this.data.tickets.find(t => t.id === ticketId);
        if (ticket) {
            ticket.comments.push({
                text: comment,
                author: this.userId,
                timestamp: new Date().toISOString()
            });
            this.saveToLocalStorage();
        }
    }

    getTickets(filters = {}) {
        let filtered = this.data.tickets;
        if (filters.status) filtered = filtered.filter(t => t.status === filters.status);
        if (filters.priority) filtered = filtered.filter(t => t.priority === filters.priority);
        if (filters.category) filtered = filtered.filter(t => t.category === filters.category);
        if (filters.assignee) filtered = filtered.filter(t => t.assignee === filters.assignee);
        return filtered;
    }

    // Task Management
    addTask(task) {
        const newTask = {
            ...task,
            id: `task-${Date.now()}`
        };
        this.data.tasks.push(newTask);
        this.saveToLocalStorage();
        return newTask;
    }

    updateTask(id, updates) {
        const task = this.data.tasks.find(t => t.id === id);
        if (task) {
            Object.assign(task, updates);
            this.saveToLocalStorage();
        }
        return task;
    }

    deleteTask(id) {
        this.data.tasks = this.data.tasks.filter(t => t.id !== id);
        this.saveToLocalStorage();
    }

    getTasksByStatus(status) {
        return this.data.tasks.filter(t => t.status === status);
    }

    // Project Management
    addProject(project) {
        const newProject = {
            ...project,
            id: `proj-${Date.now()}`
        };
        this.data.projects.push(newProject);
        this.saveToLocalStorage();
        return newProject;
    }

    updateProject(id, updates) {
        const project = this.data.projects.find(p => p.id === id);
        if (project) {
            Object.assign(project, updates);
            this.saveToLocalStorage();
        }
        return project;
    }

    // Statistics
    getStats() {
        return {
            openTickets: this.data.tickets.filter(t => t.status !== 'geschlossen').length,
            overdue: this.data.tickets.filter(t => {
                const dueDate = new Date(t.dueDate);
                return dueDate < new Date() && t.status !== 'geschlossen';
            }).length,
            myTasks: this.data.tasks.filter(t => t.status !== 'erledigt').length,
            teamMembers: this.data.teams.reduce((sum, team) => sum + team.members.length, 0),
            completedTickets: this.data.tickets.filter(t => t.status === 'gelöst' || t.status === 'geschlossen').length
        };
    }

    getMyTickets() {
        return this.data.tickets.filter(t => t.assignee === this.userId);
    }

    getMyTasks() {
        return this.data.tasks.filter(t => t.assignee === this.userId);
    }

    getNotifications() {
        return this.data.notifications;
    }

    markNotificationAsRead(id) {
        const notif = this.data.notifications.find(n => n.id === id);
        if (notif) {
            notif.read = true;
            this.saveToLocalStorage();
        }
    }
}

// ====== UI MANAGER ====== 
class UIManager {
    constructor(dashboard, authManager) {
        this.dashboard = dashboard;
        this.authManager = authManager;
        this.currentPage = 'dashboard';
        this.editingTicketId = null;
        this.editingTaskId = null;
        this.init();
    }

    init() {
        this.renderAppHTML();
        this.setupPageNavigation();
        this.setupModals();
        this.updateUserInfo();
        this.attachEventListeners();
        this.renderDashboard();
    }

    // Render the main app structure
    renderAppHTML() {
        const appContainer = document.getElementById('appContainer');
        appContainer.innerHTML = `
            <aside class="sidebar">
                <div class="sidebar-header">
                    <h1>Team Dashboard</h1>
                    <p class="company-name">Computer Service AG</p>
                </div>
                
                <nav class="sidebar-menu" id="sidebarMenu">
                    <button class="menu-item active" data-page="dashboard" type="button">
                        <span class="icon">📊</span>
                        <span class="label">Dashboard</span>
                    </button>
                    <button class="menu-item" data-page="tickets" type="button">
                        <span class="icon">🎫</span>
                        <span class="label">Tickets</span>
                    </button>
                    <button class="menu-item" data-page="tasks" type="button">
                        <span class="icon">✓</span>
                        <span class="label">Aufgaben</span>
                    </button>
                    <button class="menu-item" data-page="projects" type="button">
                        <span class="icon">📁</span>
                        <span class="label">Projekte</span>
                    </button>
                    <button class="menu-item" data-page="teams" type="button">
                        <span class="icon">👥</span>
                        <span class="label">Teams</span>
                    </button>
                    <button class="menu-item" data-page="customers" type="button">
                        <span class="icon">🤝</span>
                        <span class="label">Kunden</span>
                    </button>
                    <button class="menu-item" data-page="reports" type="button">
                        <span class="icon">📈</span>
                        <span class="label">Berichte</span>
                    </button>
                </nav>

                <div class="sidebar-footer">
                    <div class="user-profile" id="userProfileFooter">
                        <div class="avatar" id="userAvatar">👤</div>
                        <div class="user-info">
                            <p id="userName">Benutzer</p>
                            <p id="userRole">Rolle</p>
                        </div>
                    </div>
                </div>
            </aside>

            <main class="main-content">
                <header class="top-header">
                    <div class="header-left">
                        <h2 id="pageTitle">Dashboard</h2>
                        <p id="pageSubtitle">Willkommen</p>
                    </div>
                    <div class="header-right">
                        <div class="search-box">
                            <input type="text" id="searchInput" placeholder="Suchen...">
                            <button type="button" class="search-btn">🔍</button>
                        </div>
                        <button type="button" class="notification-btn" id="notificationBtn">🔔 <span class="badge" id="notificationBadge">3</span></button>
                        <button type="button" class="toggle-theme-btn" id="themeToggle">🌙</button>
                        <div class="user-menu-dropdown">
                            <button type="button" class="user-menu-btn" id="userMenuBtn">👤</button>
                            <div class="dropdown-menu" id="userDropdownMenu">
                                <a href="#" data-action="profile">👤 Mein Profil</a>
                                <a href="#" data-action="password">🔑 Passwort ändern</a>
                                <hr>
                                <a href="#" data-action="logout">🚪 Abmelden</a>
                            </div>
                        </div>
                    </div>
                </header>

                <div class="content-wrapper" id="contentWrapper">
                    <!-- Pages will be rendered here -->
                </div>
            </main>
        `;

        // Create modals
        this.createModals();
    }

    createModals() {
        const modalsHTML = `
            <div id="ticketModal" class="modal">
                <div class="modal-content">
                    <div class="modal-header">
                        <h2 id="ticketModalTitle">Ticket erstellen</h2>
                        <button type="button" class="close-modal">&times;</button>
                    </div>
                    <div class="modal-body">
                        <form id="ticketForm">
                            <div class="form-group">
                                <label>Titel</label>
                                <input type="text" id="ticketTitle" required>
                            </div>
                            <div class="form-group">
                                <label>Beschreibung</label>
                                <textarea id="ticketDescription" rows="4" required></textarea>
                            </div>
                            <div class="form-row">
                                <div class="form-group">
                                    <label>Kategorie</label>
                                    <select id="ticketCategory" required>
                                        <option value="">Wählen...</option>
                                        <option value="hardware">Hardware</option>
                                        <option value="software">Software</option>
                                        <option value="netzwerk">Netzwerk</option>
                                        <option value="support">Support</option>
                                    </select>
                                </div>
                                <div class="form-group">
                                    <label>Priorität</label>
                                    <select id="ticketPriority" required>
                                        <option value="niedrig">Niedrig</option>
                                        <option value="mittel">Mittel</option>
                                        <option value="hoch">Hoch</option>
                                        <option value="kritisch">Kritisch</option>
                                    </select>
                                </div>
                            </div>
                            <div class="form-row">
                                <div class="form-group">
                                    <label>Status</label>
                                    <select id="ticketStatus" required>
                                        <option value="neu">Neu</option>
                                        <option value="in-bearbeitung">In Bearbeitung</option>
                                        <option value="wartend">Wartend</option>
                                        <option value="gelöst">Gelöst</option>
                                        <option value="geschlossen">Geschlossen</option>
                                    </select>
                                </div>
                                <div class="form-group">
                                    <label>Zugewiesen zu</label>
                                    <select id="ticketAssignee" required>
                                        <option value="">Nicht zugewiesen</option>
                                    </select>
                                </div>
                            </div>
                            <div class="form-row">
                                <div class="form-group">
                                    <label>Kunde</label>
                                    <select id="ticketCustomer">
                                        <option value="">Wählen...</option>
                                    </select>
                                </div>
                                <div class="form-group">
                                    <label>Fällig am</label>
                                    <input type="date" id="ticketDueDate">
                                </div>
                            </div>
                            <div class="form-actions">
                                <button type="submit" class="btn btn-primary">Speichern</button>
                                <button type="button" class="btn btn-secondary close-modal">Abbrechen</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

            <div id="taskModal" class="modal">
                <div class="modal-content">
                    <div class="modal-header">
                        <h2 id="taskModalTitle">Aufgabe erstellen</h2>
                        <button type="button" class="close-modal">&times;</button>
                    </div>
                    <div class="modal-body">
                        <form id="taskForm">
                            <div class="form-group">
                                <label>Titel</label>
                                <input type="text" id="taskTitle" required>
                            </div>
                            <div class="form-group">
                                <label>Beschreibung</label>
                                <textarea id="taskDescription" rows="3"></textarea>
                            </div>
                            <div class="form-row">
                                <div class="form-group">
                                    <label>Priorität</label>
                                    <select id="taskPriority">
                                        <option value="niedrig">Niedrig</option>
                                        <option value="mittel">Mittel</option>
                                        <option value="hoch">Hoch</option>
                                    </select>
                                </div>
                                <div class="form-group">
                                    <label>Zugewiesen zu</label>
                                    <select id="taskAssignee" required>
                                        <option value="">Wählen...</option>
                                    </select>
                                </div>
                            </div>
                            <div class="form-group">
                                <label>Fällig am</label>
                                <input type="date" id="taskDueDate">
                            </div>
                            <div class="form-actions">
                                <button type="submit" class="btn btn-primary">Speichern</button>
                                <button type="button" class="btn btn-secondary close-modal">Abbrechen</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

            <div id="profileModal" class="modal">
                <div class="modal-content">
                    <div class="modal-header">
                        <h2>Mein Profil</h2>
                        <button type="button" class="close-modal">&times;</button>
                    </div>
                    <div class="modal-body">
                        <div class="profile-info">
                            <p><strong>Name:</strong> <span id="profileName"></span></p>
                            <p><strong>E-Mail:</strong> <span id="profileEmail"></span></p>
                            <p><strong>Rolle:</strong> <span id="profileRole"></span></p>
                            <p><strong>Team:</strong> <span id="profileTeam"></span></p>
                            <p><strong>Abteilung:</strong> <span id="profileDepartment"></span></p>
                            <p><strong>Telefon:</strong> <span id="profilePhone"></span></p>
                            <p><strong>Mitglied seit:</strong> <span id="profileCreated"></span></p>
                        </div>
                    </div>
                </div>
            </div>

            <div id="passwordModal" class="modal">
                <div class="modal-content">
                    <div class="modal-header">
                        <h2>Passwort ändern</h2>
                        <button type="button" class="close-modal">&times;</button>
                    </div>
                    <div class="modal-body">
                        <form id="passwordForm">
                            <div class="form-group">
                                <label>Altes Passwort</label>
                                <input type="password" id="oldPassword" required>
                            </div>
                            <div class="form-group">
                                <label>Neues Passwort</label>
                                <input type="password" id="newPassword" required>
                            </div>
                            <div class="form-group">
                                <label>Passwort wiederholen</label>
                                <input type="password" id="confirmPassword" required>
                            </div>
                            <div class="form-actions">
                                <button type="submit" class="btn btn-primary">Ändern</button>
                                <button type="button" class="btn btn-secondary close-modal">Abbrechen</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

            <div id="ticketDetailsModal" class="modal">
                <div class="modal-content modal-lg">
                    <div class="modal-header">
                        <h2 id="ticketDetailsId">Ticket</h2>
                        <button type="button" class="close-modal">&times;</button>
                    </div>
                    <div class="modal-body">
                        <div id="ticketDetailsContent"></div>
                        <div class="ticket-comments">
                            <h3>Kommentare</h3>
                            <div id="ticketCommentsList"></div>
                            <div class="comment-input-wrapper">
                                <textarea id="ticketCommentInput" placeholder="Kommentar hinzufügen..." rows="2"></textarea>
                                <button type="button" class="btn btn-sm btn-primary" id="addCommentBtn">Kommentar hinzufügen</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div id="notificationPanel" class="modal">
                <div class="modal-content modal-notifications">
                    <div class="modal-header">
                        <h2>Benachrichtigungen</h2>
                        <button type="button" class="close-modal">&times;</button>
                    </div>
                    <div class="modal-body" id="notificationsList">
                    </div>
                </div>
            </div>
        `;

        document.body.insertAdjacentHTML('beforeend', modalsHTML);
    }

    setupPageNavigation() {
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('menu-item')) {
                const page = e.target.dataset.page;
                this.showPage(page);
                
                document.querySelectorAll('.menu-item').forEach(m => m.classList.remove('active'));
                e.target.classList.add('active');
            }
        });
    }

    showPage(pageName) {
        this.currentPage = pageName;
        
        const headers = {
            dashboard: { title: 'Dashboard', subtitle: 'Übersicht und wichtige Kennzahlen' },
            tickets: { title: 'Ticketverwaltung', subtitle: 'Verwalte und bearbeite Support-Tickets' },
            tasks: { title: 'Aufgaben', subtitle: 'Kanban-Board für deine Aufgaben' },
            projects: { title: 'Projekte', subtitle: 'Übersicht aller Projekte' },
            teams: { title: 'Teams', subtitle: 'Verwaltung von Teams und Mitarbeitern' },
            customers: { title: 'Kundenverwaltung', subtitle: 'Verwalte deine Kunden' },
            reports: { title: 'Berichte & Statistiken', subtitle: 'Analysen und Auswertungen' }
        };
        
        const header = headers[pageName] || headers.dashboard;
        document.getElementById('pageTitle').textContent = header.title;
        document.getElementById('pageSubtitle').textContent = header.subtitle;
        
        this.renderPage(pageName);
    }

    renderPage(pageName) {
        const wrapper = document.getElementById('contentWrapper');
        
        switch(pageName) {
            case 'dashboard':
                wrapper.innerHTML = this.renderDashboardContent();
                break;
            case 'tickets':
                wrapper.innerHTML = this.renderTicketsContent();
                break;
            case 'tasks':
                wrapper.innerHTML = this.renderTasksContent();
                break;
            case 'projects':
                wrapper.innerHTML = this.renderProjectsContent();
                break;
            case 'teams':
                wrapper.innerHTML = this.renderTeamsContent();
                break;
            case 'customers':
                wrapper.innerHTML = this.renderCustomersContent();
                break;
            case 'reports':
                wrapper.innerHTML = this.renderReportsContent();
                break;
        }
    }

    // Dashboard Content
    renderDashboardContent() {
        const stats = this.dashboard.getStats();
        const myTickets = this.dashboard.getMyTickets().slice(0, 5);
        const teams = this.dashboard.data.teams;

        let ticketsHTML = myTickets.length === 0 
            ? '<p style="color: #7f8c8d; text-align: center; padding: 20px;">Keine Tickets zugewiesen</p>'
            : myTickets.map(ticket => `
                <div class="ticket-item" style="border-left-color: ${this.getPriorityColor(ticket.priority)};">
                    <div class="ticket-item-header">
                        <span class="ticket-item-id">${ticket.id}</span>
                        <span class="priority-badge priority-${ticket.priority}">${this.capitalizeFirst(ticket.priority)}</span>
                    </div>
                    <p class="ticket-item-title">${ticket.title}</p>
                    <p class="ticket-item-details">Fällig: ${this.formatDate(ticket.dueDate)}</p>
                </div>
            `).join('');

        return `
            <div class="dashboard-grid">
                <div class="kpi-section">
                    <h3>Wichtige Kennzahlen</h3>
                    <div class="kpi-grid">
                        <div class="kpi-card">
                            <div class="kpi-icon">🎫</div>
                            <div class="kpi-content">
                                <p class="kpi-label">Offene Tickets</p>
                                <p class="kpi-value">${stats.openTickets}</p>
                            </div>
                        </div>
                        <div class="kpi-card">
                            <div class="kpi-icon">⏰</div>
                            <div class="kpi-content">
                                <p class="kpi-label">Überfällig</p>
                                <p class="kpi-value red">${stats.overdue}</p>
                            </div>
                        </div>
                        <div class="kpi-card">
                            <div class="kpi-icon">✓</div>
                            <div class="kpi-content">
                                <p class="kpi-label">Meine Aufgaben</p>
                                <p class="kpi-value">${stats.myTasks}</p>
                            </div>
                        </div>
                        <div class="kpi-card">
                            <div class="kpi-icon">👥</div>
                            <div class="kpi-content">
                                <p class="kpi-label">Team-Mitglieder</p>
                                <p class="kpi-value">${stats.teamMembers}</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="dashboard-section">
                    <div class="section-header">
                        <h3>Meine aktuellen Tickets</h3>
                        <button type="button" class="link-all" onclick="uiManager.showNewTicketModal()">+ Neues Ticket</button>
                    </div>
                    <div class="ticket-list">
                        ${ticketsHTML}
                    </div>
                </div>

                <div class="dashboard-section">
                    <div class="section-header">
                        <h3>Team-Übersicht</h3>
                    </div>
                    <div class="team-list">
                        ${teams.map(team => `
                            <div class="team-item">
                                <div class="team-item-header">
                                    <span class="team-item-name">${team.name}</span>
                                    <span class="team-item-count">${team.members.length}</span>
                                </div>
                                <p class="team-item-members">Leitung: ${this.getUserName(team.lead)}</p>
                                <p class="team-item-members">${team.description}</p>
                            </div>
                        `).join('')}
                    </div>
                </div>
            </div>
        `;
    }

    // Tickets Content
    renderTicketsContent() {
        const tickets = this.dashboard.data.tickets;
        
        return `
            <div class="page-header">
                <h2>Ticketverwaltung</h2>
                <button type="button" class="btn btn-primary" onclick="uiManager.showNewTicketModal()">+ Neues Ticket</button>
            </div>

            <div class="filter-bar">
                <select id="filterStatus" class="filter-select">
                    <option value="">Alle Status</option>
                    <option value="neu">Neu</option>
                    <option value="in-bearbeitung">In Bearbeitung</option>
                    <option value="wartend">Wartend</option>
                    <option value="gelöst">Gelöst</option>
                    <option value="geschlossen">Geschlossen</option>
                </select>
                <select id="filterPriority" class="filter-select">
                    <option value="">Alle Prioritäten</option>
                    <option value="niedrig">Niedrig</option>
                    <option value="mittel">Mittel</option>
                    <option value="hoch">Hoch</option>
                    <option value="kritisch">Kritisch</option>
                </select>
                <select id="filterCategory" class="filter-select">
                    <option value="">Alle Kategorien</option>
                    <option value="hardware">Hardware</option>
                    <option value="software">Software</option>
                    <option value="netzwerk">Netzwerk</option>
                    <option value="support">Support</option>
                </select>
            </div>

            <div class="table-container">
                <table class="data-table">
                    <thead>
                        <tr>
                            <th>Ticket-ID</th>
                            <th>Titel</th>
                            <th>Kategorie</th>
                            <th>Priorität</th>
                            <th>Status</th>
                            <th>Zugewiesen zu</th>
                            <th>Fällig am</th>
                            <th>Aktionen</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${tickets.map(ticket => `
                            <tr>
                                <td><strong>${ticket.id}</strong></td>
                                <td>${ticket.title}</td>
                                <td>${this.capitalizeFirst(ticket.category)}</td>
                                <td><span class="priority-badge priority-${ticket.priority}">${this.capitalizeFirst(ticket.priority)}</span></td>
                                <td><span class="status-badge status-${ticket.status.replace(/ /g, '-')}">${this.capitalizeFirst(ticket.status)}</span></td>
                                <td>${this.getUserName(ticket.assignee)}</td>
                                <td>${this.formatDate(ticket.dueDate)}</td>
                                <td>
                                    <button type="button" class="btn btn-small" onclick="uiManager.showTicketDetails('${ticket.id}')">👁️</button>
                                    <button type="button" class="btn btn-small" onclick="uiManager.editTicket('${ticket.id}')">✎</button>
                                    <button type="button" class="btn btn-small" onclick="uiManager.deleteTicket('${ticket.id}')">🗑️</button>
                                </td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            </div>
        `;
    }

    // Tasks Content
    renderTasksContent() {
        const statuses = [
            { id: 'offen', label: 'Offen', color: '#007bff' },
            { id: 'in-arbeit', label: 'In Arbeit', color: '#17a2b8' },
            { id: 'blockiert', label: 'Blockiert', color: '#ffc107' },
            { id: 'erledigt', label: 'Erledigt', color: '#28a745' }
        ];

        return `
            <div class="page-header">
                <h2>Aufgaben</h2>
                <button type="button" class="btn btn-primary" onclick="uiManager.showNewTaskModal()">+ Neue Aufgabe</button>
            </div>

            <div class="kanban-board">
                ${statuses.map(status => {
                    const tasks = this.dashboard.getTasksByStatus(status.id);
                    return `
                        <div class="kanban-column">
                            <h3 class="kanban-title">${status.label}</h3>
                            <div class="kanban-cards" id="kanban-${status.id}">
                                ${tasks.map(task => `
                                    <div class="kanban-card" data-task-id="${task.id}">
                                        <p class="kanban-card-title">${task.title}</p>
                                        <div class="kanban-card-footer">
                                            <span class="priority-badge priority-${task.priority}">${this.capitalizeFirst(task.priority)}</span>
                                            <span>${this.formatDate(task.dueDate)}</span>
                                        </div>
                                        <div style="margin-top: 10px; display: flex; gap: 5px;">
                                            <button type="button" class="btn btn-very-small" onclick="uiManager.editTask('${task.id}')">✎</button>
                                            <button type="button" class="btn btn-very-small" onclick="uiManager.deleteTask('${task.id}')">🗑️</button>
                                        </div>
                                    </div>
                                `).join('')}
                            </div>
                        </div>
                    `;
                }).join('')}
            </div>
        `;
    }

    // Projects Content
    renderProjectsContent() {
        const projects = this.dashboard.data.projects;

        return `
            <div class="page-header">
                <h2>Projekte</h2>
                <button type="button" class="btn btn-primary" onclick="alert('Neue Projekterfassung - wird implementiert')">+ Neues Projekt</button>
            </div>

            <div class="projects-grid">
                ${projects.map(project => {
                    const lead = this.getUserName(project.lead);
                    return `
                        <div class="project-card">
                            <div class="project-card-header">
                                <h3 class="project-card-title">${project.title}</h3>
                            </div>
                            <div class="project-card-body">
                                <p class="project-card-desc">${project.description}</p>
                                <div class="project-stat">
                                    <span class="project-stat-label">Leitung</span>
                                    <span class="project-stat-value">${lead}</span>
                                </div>
                                <div class="project-stat">
                                    <span class="project-stat-label">Aufgaben</span>
                                    <span class="project-stat-value">${project.completedTasks}/${project.tasks}</span>
                                </div>
                                <div class="project-stat">
                                    <span class="project-stat-label">Budget</span>
                                    <span class="project-stat-value">${project.budget}</span>
                                </div>
                                <div class="project-progress">
                                    <span style="font-size: 13px; color: #7f8c8d;">${project.progress}%</span>
                                    <div class="progress-bar">
                                        <div class="progress" style="width: ${project.progress}%"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    `;
                }).join('')}
            </div>
        `;
    }

    // Teams Content
    renderTeamsContent() {
        const teams = this.dashboard.data.teams;
        const users = this.authManager.users;

        return `
            <div class="page-header">
                <h2>Teams & Mitarbeiter</h2>
            </div>

            <div class="teams-container">
                <div class="teams-section">
                    <h3>Teams</h3>
                    <div class="teams-list">
                        ${teams.map(team => `
                            <div class="team-item">
                                <div class="team-item-header">
                                    <span class="team-item-name">${team.name}</span>
                                </div>
                                <p class="team-item-members"><strong>Leitung:</strong> ${this.getUserName(team.lead)}</p>
                                <p class="team-item-members"><strong>Mitglieder:</strong> ${team.members.length}</p>
                                <p class="team-item-members" style="color: #7f8c8d; margin-top: 10px;">${team.description}</p>
                            </div>
                        `).join('')}
                    </div>
                </div>

                <div class="users-section">
                    <h3>Alle Benutzer</h3>
                    <div class="table-container">
                        <table class="data-table">
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>E-Mail</th>
                                    <th>Rolle</th>
                                    <th>Team</th>
                                    <th>Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                ${users.map(user => `
                                    <tr>
                                        <td><strong>${user.name}</strong></td>
                                        <td>${user.email}</td>
                                        <td>${user.role}</td>
                                        <td>${user.team}</td>
                                        <td>
                                            <span class="status-badge status-neu">
                                                ✓ Aktiv
                                            </span>
                                        </td>
                                    </tr>
                                `).join('')}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        `;
    }

    // Customers Content
    renderCustomersContent() {
        const customers = this.dashboard.data.customers;

        return `
            <div class="page-header">
                <h2>Kundenverwaltung</h2>
                <button type="button" class="btn btn-primary" onclick="alert('Neue Kundenerfassung')">+ Neuer Kunde</button>
            </div>

            <div class="table-container">
                <table class="data-table">
                    <thead>
                        <tr>
                            <th>Kundenname</th>
                            <th>Ansprechpartner</th>
                            <th>E-Mail</th>
                            <th>Telefon</th>
                            <th>Vertrag</th>
                            <th>SLA</th>
                            <th>Branche</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${customers.map(customer => `
                            <tr>
                                <td><strong>${customer.name}</strong></td>
                                <td>${customer.contact}</td>
                                <td>${customer.email}</td>
                                <td>${customer.phone}</td>
                                <td>${customer.contract}</td>
                                <td>${customer.sla}</td>
                                <td>${customer.industry}</td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            </div>
        `;
    }

    // Reports Content
    renderReportsContent() {
        const stats = this.dashboard.getStats();
        const tickets = this.dashboard.data.tickets;
        
        const byCategory = {};
        tickets.forEach(t => {
            byCategory[t.category] = (byCategory[t.category] || 0) + 1;
        });

        return `
            <div class="reports-grid">
                <div class="report-card">
                    <h3>Ticket-Übersicht</h3>
                    <div class="sla-stats">
                        <div class="stat-row">
                            <span>Offene Tickets</span>
                            <span class="stat-value" style="color: var(--primary);">${stats.openTickets}</span>
                        </div>
                        <div class="stat-row">
                            <span>Überfällige</span>
                            <span class="stat-value red">${stats.overdue}</span>
                        </div>
                        <div class="stat-row">
                            <span>Gelöste Tickets</span>
                            <span class="stat-value green">${stats.completedTickets}</span>
                        </div>
                    </div>
                </div>

                <div class="report-card">
                    <h3>Tickets nach Kategorie</h3>
                    <div class="team-load">
                        ${Object.entries(byCategory).map(([cat, count]) => {
                            const percent = Math.round((count / tickets.length) * 100);
                            return `
                                <div class="load-row">
                                    <span>${this.capitalizeFirst(cat)}</span>
                                    <div class="progress-bar">
                                        <div class="progress" style="width: ${percent}%"></div>
                                    </div>
                                    <span>${count}</span>
                                </div>
                            `;
                        }).join('')}
                    </div>
                </div>

                <div class="report-card">
                    <h3>SLA-Status</h3>
                    <div class="sla-stats">
                        <div class="stat-row">
                            <span>Erfüllt</span>
                            <span class="stat-value green">94%</span>
                        </div>
                        <div class="stat-row">
                            <span>Nicht erfüllt</span>
                            <span class="stat-value red">6%</span>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    // Modal Management
    setupModals() {
        // Close modals
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('close-modal')) {
                const modal = e.target.closest('.modal');
                if (modal) modal.classList.remove('active');
            }
        });

        // User menu
        document.getElementById('userMenuBtn').addEventListener('click', (e) => {
            e.stopPropagation();
            const menu = document.getElementById('userDropdownMenu');
            menu.classList.toggle('active');
        });

        document.addEventListener('click', (e) => {
            if (!e.target.closest('.user-menu-dropdown')) {
                document.getElementById('userDropdownMenu').classList.remove('active');
            }
        });

        // User menu actions
        document.getElementById('userDropdownMenu').addEventListener('click', (e) => {
            const action = e.target.dataset.action;
            if (action === 'profile') {
                e.preventDefault();
                this.showProfileModal();
            } else if (action === 'password') {
                e.preventDefault();
                this.showPasswordModal();
            } else if (action === 'logout') {
                e.preventDefault();
                this.logout();
            }
        });

        // Ticket Form
        document.getElementById('ticketForm').addEventListener('submit', (e) => {
            e.preventDefault();
            this.saveTicket();
        });

        // Task Form
        document.getElementById('taskForm').addEventListener('submit', (e) => {
            e.preventDefault();
            this.saveTask();
        });

        // Notifications
        document.getElementById('notificationBtn').addEventListener('click', () => {
            this.showNotificationsPanel();
        });

        // Password Form
        const passwordForm = document.getElementById('passwordForm');
        if (passwordForm) {
            passwordForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.changePassword();
            });
        }

        // Filters
        document.addEventListener('change', (e) => {
            if (e.target.id.startsWith('filter')) {
                this.applyFilters();
            }
        });

        // Theme toggle
        document.getElementById('themeToggle').addEventListener('click', () => {
            document.body.classList.toggle('dark-mode');
            localStorage.setItem('darkMode', document.body.classList.contains('dark-mode'));
        });

        if (localStorage.getItem('darkMode') === 'true') {
            document.body.classList.add('dark-mode');
        }
    }

    showNewTicketModal() {
        this.editingTicketId = null;
        document.getElementById('ticketForm').reset();
        document.getElementById('ticketModalTitle').textContent = 'Neues Ticket';
        this.populateSelectOptions();
        document.getElementById('ticketModal').classList.add('active');
    }

    editTicket(ticketId) {
        this.editingTicketId = ticketId;
        const ticket = this.dashboard.data.tickets.find(t => t.id === ticketId);
        if (ticket) {
            document.getElementById('ticketTitle').value = ticket.title;
            document.getElementById('ticketDescription').value = ticket.description;
            document.getElementById('ticketCategory').value = ticket.category;
            document.getElementById('ticketPriority').value = ticket.priority;
            document.getElementById('ticketStatus').value = ticket.status;
            document.getElementById('ticketAssignee').value = ticket.assignee;
            document.getElementById('ticketCustomer').value = ticket.customer || '';
            document.getElementById('ticketDueDate').value = ticket.dueDate;
            document.getElementById('ticketModalTitle').textContent = `Ticket bearbeiten: ${ticket.id}`;
            this.populateSelectOptions();
            document.getElementById('ticketModal').classList.add('active');
        }
    }

    showTicketDetails(ticketId) {
        const ticket = this.dashboard.data.tickets.find(t => t.id === ticketId);
        if (ticket) {
            const assigneeName = this.getUserName(ticket.assignee);
            const customerName = ticket.customer ? this.getCustomerName(ticket.customer) : 'Keine';

            let detailsHTML = `
                <div class="ticket-details">
                    <div class="detail-row">
                        <label>Titel:</label>
                        <span>${ticket.title}</span>
                    </div>
                    <div class="detail-row">
                        <label>Beschreibung:</label>
                        <span>${ticket.description}</span>
                    </div>
                    <div class="detail-row">
                        <label>Kategorie:</label>
                        <span>${this.capitalizeFirst(ticket.category)}</span>
                    </div>
                    <div class="detail-row">
                        <label>Priorität:</label>
                        <span><span class="priority-badge priority-${ticket.priority}">${this.capitalizeFirst(ticket.priority)}</span></span>
                    </div>
                    <div class="detail-row">
                        <label>Status:</label>
                        <span><span class="status-badge status-${ticket.status.replace(/ /g, '-')}">${this.capitalizeFirst(ticket.status)}</span></span>
                    </div>
                    <div class="detail-row">
                        <label>Zugewiesen zu:</label>
                        <span>${assigneeName}</span>
                    </div>
                    <div class="detail-row">
                        <label>Kunde:</label>
                        <span>${customerName}</span>
                    </div>
                    <div class="detail-row">
                        <label>Fällig am:</label>
                        <span>${this.formatDate(ticket.dueDate)}</span>
                    </div>
                </div>
            `;

            document.getElementById('ticketDetailsId').textContent = ticket.id;
            document.getElementById('ticketDetailsContent').innerHTML = detailsHTML;

            // Load comments
            const commentsHTML = ticket.comments.map((c, idx) => {
                const author = typeof c === 'string' ? c : (c.author ? this.getUserName(c.author) : 'Unbekannt');
                const text = typeof c === 'string' ? c : (c.text || c);
                return `
                    <div class="comment" style="padding: 10px; background: #f8f9fa; border-radius: 6px; margin-bottom: 10px;">
                        <p style="margin: 0; font-weight: 600;">${author}</p>
                        <p style="margin: 5px 0;">${text}</p>
                    </div>
                `;
            }).join('');

            document.getElementById('ticketCommentsList').innerHTML = commentsHTML || '<p style="color: #7f8c8d;">Keine Kommentare</p>';

            document.getElementById('addCommentBtn').onclick = () => {
                const comment = document.getElementById('ticketCommentInput').value;
                if (comment.trim()) {
                    this.dashboard.addCommentToTicket(ticketId, comment);
                    document.getElementById('ticketCommentInput').value = '';
                    this.showTicketDetails(ticketId);
                    this.showNotification('Kommentar hinzugefügt', 'success');
                }
            };

            document.getElementById('ticketDetailsModal').classList.add('active');
        }
    }

    deleteTicket(ticketId) {
        if (confirm('Möchtest du dieses Ticket wirklich löschen?')) {
            this.dashboard.deleteTicket(ticketId);
            this.renderPage('tickets');
            this.showNotification('Ticket gelöst', 'success');
        }
    }

    saveTicket() {
        const title = document.getElementById('ticketTitle').value;
        const description = document.getElementById('ticketDescription').value;
        const category = document.getElementById('ticketCategory').value;
        const priority = document.getElementById('ticketPriority').value;
        const status = document.getElementById('ticketStatus').value;
        const assignee = document.getElementById('ticketAssignee').value;
        const customer = document.getElementById('ticketCustomer').value;
        const dueDate = document.getElementById('ticketDueDate').value;

        if (this.editingTicketId) {
            this.dashboard.updateTicket(this.editingTicketId, {
                title, description, category, priority, status, assignee, customer, dueDate
            });
            this.showNotification('Ticket aktualisiert', 'success');
        } else {
            this.dashboard.addTicket({
                title, description, category, priority, status, assignee, customer, dueDate
            });
            this.showNotification('Ticket erstellt', 'success');
        }

        document.getElementById('ticketModal').classList.remove('active');
        this.renderPage('tickets');
    }

    showNewTaskModal() {
        this.editingTaskId = null;
        document.getElementById('taskForm').reset();
        document.getElementById('taskModalTitle').textContent = 'Neue Aufgabe';
        this.populateSelectOptions();
        document.getElementById('taskModal').classList.add('active');
    }

    editTask(taskId) {
        this.editingTaskId = taskId;
        const task = this.dashboard.data.tasks.find(t => t.id === taskId);
        if (task) {
            document.getElementById('taskTitle').value = task.title;
            document.getElementById('taskDescription').value = task.description;
            document.getElementById('taskPriority').value = task.priority;
            document.getElementById('taskAssignee').value = task.assignee;
            document.getElementById('taskDueDate').value = task.dueDate;
            document.getElementById('taskModalTitle').textContent = 'Aufgabe bearbeiten';
            this.populateSelectOptions();
            document.getElementById('taskModal').classList.add('active');
        }
    }

    deleteTask(taskId) {
        if (confirm('Möchtest du diese Aufgabe wirklich löschen?')) {
            this.dashboard.deleteTask(taskId);
            this.renderPage('tasks');
            this.showNotification('Aufgabe gelöscht', 'success');
        }
    }

    saveTask() {
        const title = document.getElementById('taskTitle').value;
        const description = document.getElementById('taskDescription').value;
        const priority = document.getElementById('taskPriority').value;
        const assignee = document.getElementById('taskAssignee').value;
        const dueDate = document.getElementById('taskDueDate').value;

        if (this.editingTaskId) {
            this.dashboard.updateTask(this.editingTaskId, {
                title, description, priority, assignee, dueDate
            });
            this.showNotification('Aufgabe aktualisiert', 'success');
        } else {
            this.dashboard.addTask({
                title, description, priority, assignee, dueDate
            });
            this.showNotification('Aufgabe erstellt', 'success');
        }

        document.getElementById('taskModal').classList.remove('active');
        this.renderPage('tasks');
    }

    showProfileModal() {
        const user = this.authManager.currentUser;
        document.getElementById('profileName').textContent = user.name;
        document.getElementById('profileEmail').textContent = user.email;
        document.getElementById('profileRole').textContent = user.role;
        document.getElementById('profileTeam').textContent = user.team;
        document.getElementById('profileDepartment').textContent = user.department;
        document.getElementById('profilePhone').textContent = user.phone || 'Nicht angegeben';
        document.getElementById('profileCreated').textContent = user.createdAt;
        document.getElementById('profileModal').classList.add('active');
    }

    showPasswordModal() {
        document.getElementById('passwordForm').reset();
        document.getElementById('passwordModal').classList.add('active');
    }

    changePassword() {
        const oldPassword = document.getElementById('oldPassword').value;
        const newPassword = document.getElementById('newPassword').value;
        const confirmPassword = document.getElementById('confirmPassword').value;

        if (newPassword !== confirmPassword) {
            this.showNotification('Passwörter stimmen nicht überein', 'error');
            return;
        }

        const result = this.authManager.changePassword(
            this.authManager.currentUser.email,
            oldPassword,
            newPassword
        );

        if (result.success) {
            this.showNotification('Passwort geändert', 'success');
            document.getElementById('passwordModal').classList.remove('active');
        } else {
            this.showNotification(result.message, 'error');
        }
    }

    showNotificationsPanel() {
        const notifications = this.dashboard.getNotifications();
        const html = notifications.map(n => `
            <div class="notification-item" style="padding: 12px; border-bottom: 1px solid #eee;">
                <p style="margin: 0; font-weight: 500;">${n.message}</p>
                <p style="margin: 5px 0; font-size: 12px; color: #7f8c8d;">${new Date(n.timestamp).toLocaleString('de-DE')}</p>
            </div>
        `).join('');

        document.getElementById('notificationsList').innerHTML = html || '<p style="padding: 20px; text-align: center; color: #7f8c8d;">Keine Benachrichtigungen</p>';
        document.getElementById('notificationPanel').classList.add('active');
    }

    applyFilters() {
        const statusFilter = document.getElementById('filterStatus')?.value || '';
        const priorityFilter = document.getElementById('filterPriority')?.value || '';
        const categoryFilter = document.getElementById('filterCategory')?.value || '';

        const rows = document.querySelectorAll('table tbody tr');
        rows.forEach(row => {
            let show = true;

            if (statusFilter) {
                const status = row.cells[4]?.textContent.toLowerCase() || '';
                show = show && status.includes(statusFilter);
            }
            if (priorityFilter) {
                const priority = row.cells[3]?.textContent.toLowerCase() || '';
                show = show && priority.includes(priorityFilter);
            }
            if (categoryFilter) {
                const category = row.cells[2]?.textContent.toLowerCase() || '';
                show = show && category.includes(categoryFilter);
            }

            row.style.display = show ? '' : 'none';
        });
    }

    populateSelectOptions() {
        const users = this.authManager.users;
        const customers = this.dashboard.data.customers;

        // Populate assignee selects
        const assigneeSelects = document.querySelectorAll('#ticketAssignee, #taskAssignee');
        assigneeSelects.forEach(select => {
            if (!select.querySelector('option[value="user1"]')) {
                select.innerHTML = '<option value="">Wählen...</option>' +
                    users.map(u => `<option value="${u.id}">${u.name}</option>`).join('');
            }
        });

        // Populate customer select
        const customerSelect = document.getElementById('ticketCustomer');
        if (customerSelect && !customerSelect.querySelector('option[value="cust1"]')) {
            customerSelect.innerHTML = '<option value="">Wählen...</option>' +
                customers.map(c => `<option value="${c.id}">${c.name}</option>`).join('');
        }
    }

    // Utility Methods
    updateUserInfo() {
        const user = this.authManager.currentUser;
        document.getElementById('userName').textContent = user.name;
        document.getElementById('userRole').textContent = user.role;
        document.getElementById('userAvatar').textContent = user.avatar;
    }

    capitalizeFirst(str) {
        if (!str) return '';
        return str.charAt(0).toUpperCase() + str.slice(1).replace('-', ' ');
    }

    formatDate(dateStr) {
        if (!dateStr) return '-';
        const date = new Date(dateStr + 'T00:00:00');
        return date.toLocaleDateString('de-DE', { year: 'numeric', month: '2-digit', day: '2-digit' });
    }

    getPriorityColor(priority) {
        const colors = {
            'niedrig': '#6c757d',
            'mittel': '#ffc107',
            'hoch': '#fd7e14',
            'kritisch': '#dc3545'
        };
        return colors[priority] || '#6c757d';
    }

    getUserName(id) {
        const user = this.authManager.users.find(u => u.id === id);
        return user ? user.name : 'Unbekannt';
    }

    getCustomerName(id) {
        const customer = this.dashboard.data.customers.find(c => c.id === id);
        return customer ? customer.name : 'Unbekannt';
    }

    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.textContent = message;
        const bgColor = type === 'success' ? '#28a745' : type === 'error' ? '#dc3545' : '#17a2b8';
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 15px 20px;
            background: ${bgColor};
            color: white;
            border-radius: 8px;
            z-index: 10000;
            animation: slideIn 0.3s ease;
            max-width: 300px;
            box-shadow: 0 2px 8px rgba(0,0,0,0.2);
        `;
        document.body.appendChild(notification);
        setTimeout(() => notification.remove(), 3000);
    }

    logout() {
        this.authManager.logout();
        location.reload();
    }

    renderDashboard() {
        this.renderPage('dashboard');
    }
}

// ====== LOGIN MANAGER ====== 
class LoginManager {
    constructor(authManager) {
        this.authManager = authManager;
        this.setupLoginUI();
    }

    setupLoginUI() {
        console.log('Initializing LoginManager...');
        
        const loginForm = document.getElementById('loginForm');
        const registerForm = document.getElementById('registerForm');
        const switchToRegister = document.getElementById('switchToRegister');
        const switchToLogin = document.getElementById('switchToLogin');

        if (!loginForm) {
            console.error('Login form not found!');
            return;
        }

        loginForm.addEventListener('submit', (e) => {
            console.log('Login form submitted');
            e.preventDefault();
            this.handleLogin();
        });

        if (registerForm) {
            registerForm.addEventListener('submit', (e) => {
                console.log('Register form submitted');
                e.preventDefault();
                this.handleRegister();
            });
        }

        if (switchToRegister) {
            switchToRegister.addEventListener('click', (e) => {
                e.preventDefault();
                document.querySelector('.login-box').style.display = 'none';
                document.getElementById('registerBox').style.display = 'block';
            });
        }

        if (switchToLogin) {
            switchToLogin.addEventListener('click', (e) => {
                e.preventDefault();
                document.querySelector('.login-box').style.display = 'block';
                document.getElementById('registerBox').style.display = 'none';
            });
        }
    }

    handleLogin() {
        const email = document.getElementById('loginEmail').value;
        const password = document.getElementById('loginPassword').value;

        console.log('handleLogin called with:', { email, password });

        if (!email || !password) {
            alert('Bitte E-Mail und Passwort eingeben');
            return;
        }

        const result = this.authManager.login(email, password);

        if (result.success) {
            console.log('Login successful:', result);
            this.showApp();
        } else {
            console.log('Login failed:', result);
            alert(result.message);
        }
    }

    handleRegister() {
        const name = document.getElementById('registerName').value;
        const email = document.getElementById('registerEmail').value;
        const password = document.getElementById('registerPassword').value;
        const passwordConfirm = document.getElementById('registerPasswordConfirm').value;

        if (password !== passwordConfirm) {
            alert('Passwörter stimmen nicht überein');
            return;
        }

        const result = this.authManager.register(email, password, name);

        if (result.success) {
            alert('Registrierung erfolgreich! Bitte melden Sie sich an.');
            document.querySelector('.login-box').style.display = 'block';
            document.getElementById('registerBox').style.display = 'none';
            document.getElementById('registerForm').reset();
        } else {
            alert(result.message);
        }
    }

    showApp() {
        document.getElementById('loginScreen').classList.remove('active');
        document.getElementById('appContainer').style.display = 'flex';

        // Initialize dashboard
        const dashboard = new Dashboard(this.authManager.currentUser.id);
        const uiManager = new UIManager(dashboard, this.authManager);
        window.uiManager = uiManager;
    }
}

// ====== INITIALIZE APP ====== 
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOMContentLoaded event fired');
    console.log('authManager available:', typeof authManager !== 'undefined');
    console.log('LoginManager available:', typeof LoginManager !== 'undefined');

    if (typeof authManager === 'undefined') {
        console.error('CRITICAL: authManager is undefined!');
        alert('Fehler: Authentifizierungssystem nicht geladen. Bitte Seite neuladen.');
        return;
    }

    const loginManager = new LoginManager(authManager);
    window.loginManager = loginManager;
    console.log('LoginManager instance created successfully');

    // Check if already logged in
    if (authManager.isLoggedIn()) {
        console.log('User already logged in, showing app');
        loginManager.showApp();
    } else {
        console.log('User not logged in, showing login screen');
    }
});
