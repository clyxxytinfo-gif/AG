// ====== AUTHENTICATION & USER MANAGEMENT ====== 
class AuthManager {
    constructor() {
        this.currentUser = null;
        this.users = [
            {
                id: 'user1',
                email: 'admin@computerservice.de',
                password: 'admin123',
                name: 'Max Mustermann',
                role: 'Administrator',
                team: 'Support Team',
                department: 'IT-Management',
                phone: '+49 30 123456',
                avatar: '👤',
                createdAt: '2025-01-01'
            },
            {
                id: 'user2',
                email: 'anna@computerservice.de',
                password: 'anna123',
                name: 'Anna Schmidt',
                role: 'Teamleiter',
                team: 'Technik Team',
                department: 'Technik',
                phone: '+49 30 234567',
                avatar: '👩‍💼',
                createdAt: '2025-01-05'
            },
            {
                id: 'user3',
                email: 'peter@computerservice.de',
                password: 'peter123',
                name: 'Peter Müller',
                role: 'Mitarbeiter',
                team: 'Support Team',
                department: 'Support',
                phone: '+49 30 345678',
                avatar: '👨‍💻',
                createdAt: '2025-01-10'
            },
            {
                id: 'user4',
                email: 'klaus@computerservice.de',
                password: 'klaus123',
                name: 'Klaus Weber',
                role: 'Mitarbeiter',
                team: 'Technik Team',
                department: 'Technik',
                phone: '+49 40 456789',
                avatar: '👨‍🔧',
                createdAt: '2025-01-15'
            },
            {
                id: 'user5',
                email: 'customer@example.de',
                password: 'customer123',
                name: 'Herr Müller',
                role: 'Externer Nutzer',
                team: 'Kunden',
                department: 'ABC GmbH',
                phone: '+49 30 987654',
                avatar: '🤝',
                createdAt: '2025-01-20'
            }
        ];
        
        this.loadSession();
        console.log('AuthManager initialized with', this.users.length, 'users');
    }

    register(email, password, name, role = 'Mitarbeiter') {
        if (this.users.find(u => u.email === email)) {
            return { success: false, message: 'Email existiert bereits' };
        }

        const newUser = {
            id: `user${this.users.length + 1}`,
            email,
            password, // In einer echten App würde dies gehasht werden
            name,
            role,
            team: 'Nicht zugewiesen',
            department: 'Neu',
            phone: '',
            avatar: '👤',
            createdAt: new Date().toISOString().split('T')[0]
        };

        this.users.push(newUser);
        localStorage.setItem('authUsers', JSON.stringify(this.users));
        return { success: true, message: 'Benutzer registriert', user: newUser };
    }

    login(email, password) {
        console.log('Login attempt:', { email, users_count: this.users.length });
        
        const user = this.users.find(u => u.email === email && u.password === password);
        
        if (!user) {
            console.log('Login failed - user not found or password incorrect');
            return { success: false, message: 'E-Mail oder Passwort falsch' };
        }

        this.currentUser = { ...user };
        localStorage.setItem('currentSession', JSON.stringify(this.currentUser));
        console.log('Login successful:', this.currentUser.name);
        return { success: true, message: 'Anmeldung erfolgreich', user: this.currentUser };
    }

    logout() {
        this.currentUser = null;
        localStorage.removeItem('currentSession');
    }

    loadSession() {
        const session = localStorage.getItem('currentSession');
        if (session) {
            try {
                this.currentUser = JSON.parse(session);
            } catch (e) {
                this.currentUser = null;
            }
        }
    }

    isLoggedIn() {
        return this.currentUser !== null;
    }

    getCurrentUser() {
        return this.currentUser;
    }

    changePassword(email, oldPassword, newPassword) {
        const user = this.users.find(u => u.email === email);
        
        if (!user || user.password !== oldPassword) {
            return { success: false, message: 'Altes Passwort falsch' };
        }

        user.password = newPassword;
        localStorage.setItem('authUsers', JSON.stringify(this.users));
        return { success: true, message: 'Passwort geändert' };
    }

    updateProfile(userId, updates) {
        const user = this.users.find(u => u.id === userId);
        if (!user) {
            return { success: false, message: 'Benutzer nicht gefunden' };
        }

        Object.assign(user, updates);
        localStorage.setItem('authUsers', JSON.stringify(this.users));
        
        if (this.currentUser.id === userId) {
            Object.assign(this.currentUser, updates);
            localStorage.setItem('currentSession', JSON.stringify(this.currentUser));
        }

        return { success: true, message: 'Profil aktualisiert' };
    }

    getAllUsers() {
        return this.users;
    }

    getUserById(id) {
        return this.users.find(u => u.id === id);
    }

    deleteUser(id) {
        const index = this.users.findIndex(u => u.id === id);
        if (index > -1) {
            this.users.splice(index, 1);
            localStorage.setItem('authUsers', JSON.stringify(this.users));
            return { success: true, message: 'Benutzer gelöscht' };
        }
        return { success: false, message: 'Benutzer nicht gefunden' };
    }
}

// Initialize Auth Manager
const authManager = new AuthManager();
