(() => {
      'use strict';
      const $ = id => document.getElementById(id);
      const $$ = sel => Array.from(document.querySelectorAll(sel));

      /* ----------------------------------------------------------------------
         A. CATÁLOGO DE TEMAS, APLICACIONES OFICIALES Y DIRECTORIO EXTERNO
         ---------------------------------------------------------------------- */
      const THEMES = [
        { id: 'avi-original', name: 'Original', a: '#130825', b: '#060211', accent: '#aa72fa', particle: '#a994ff' },
        { id: 'obsidiana', name: 'Obsidiana', a: '#0d0f17', b: '#030407', accent: '#c6cbd4', particle: '#c4c9dc' },
        { id: 'aurora', name: 'Aurora', a: '#062b38', b: '#020e18', accent: '#52e7de', particle: '#66f3e0' },
        { id: 'prisma', name: 'Prisma', a: '#371341', b: '#11051d', accent: '#ef64cc', particle: '#ff77cf' },
        { id: 'solar', name: 'Solar', a: '#432415', b: '#140b0c', accent: '#ffbf70', particle: '#ffd18f' },
        { id: 'nebulosa', name: 'Nebulosa', a: '#141a49', b: '#04091e', accent: '#ab94ff', particle: '#dcaaff' },
        { id: 'esmeralda', name: 'Esmeralda', a: '#063629', b: '#03140f', accent: '#5bebaf', particle: '#67f3bd' },
        { id: 'holografico', name: 'Holográfico', a: '#25264f', b: '#090d27', accent: '#b8d9f9', particle: '#9ef8ff' },
        { id: 'alba', name: 'Alba', a: '#43496a', b: '#1c1d30', accent: '#dfd3ff', particle: '#e9daff' },
        { id: 'oceano', name: 'Océano', a: '#082c62', b: '#030b22', accent: '#5ac0ff', particle: '#79daff' },
        { id: 'rubi', name: 'Rubí', a: '#471222', b: '#170611', accent: '#f77092', particle: '#ff8ca5' },
        { id: 'cobalto', name: 'Cobalto', a: '#0c2a78', b: '#050b28', accent: '#6b9cff', particle: '#91bbff' },
        { id: 'titanio', name: 'Titanio', a: '#282b3b', b: '#090b13', accent: '#b2b5d2', particle: '#e0e5f7' },
        { id: 'cyberpunk', name: 'Cyberpunk', a: '#0f0518', b: '#05020a', accent: '#fcee0a', particle: '#ff003c' },
        { id: 'matrix', name: 'Matrix', a: '#021004', b: '#000501', accent: '#00ff41', particle: '#008f11' },
        { id: 'neon-tokyo', name: 'Neón Tokyo', a: '#11001c', b: '#07000d', accent: '#ff0055', particle: '#00f0ff' },
        { id: 'vaporwave', name: 'Vaporwave', a: '#1a0b2e', b: '#0a0417', accent: '#ff71ce', particle: '#01cdfe' },
        { id: 'dracula', name: 'Drácula', a: '#282a36', b: '#191a21', accent: '#ff79c6', particle: '#bd93f9' },
        { id: 'abismo', name: 'Abismo', a: '#050505', b: '#000000', accent: '#888888', particle: '#555555' },
        { id: 'volcan', name: 'Volcán', a: '#1c0402', b: '#0a0101', accent: '#ff3300', particle: '#ff6600' },
        { id: 'otono', name: 'Otoño', a: '#2e1b10', b: '#140a05', accent: '#e67e22', particle: '#f39c12' },
        { id: 'bosque-mistico', name: 'Bosque Místico', a: '#061a14', b: '#020d09', accent: '#2ecc71', particle: '#27ae60' },
        { id: 'galaxia', name: 'Galaxia', a: '#100b21', b: '#05030d', accent: '#9b59b6', particle: '#8e44ad' },
        { id: 'desierto', name: 'Desierto', a: '#2d2419', b: '#17110a', accent: '#f1c40f', particle: '#e67e22' },
        { id: 'hielo', name: 'Hielo', a: '#0a192f', b: '#040b17', accent: '#00d2ff', particle: '#3a7bd5' },
        { id: 'amatista', name: 'Amatista', a: '#1a0f2e', b: '#0b0517', accent: '#a55eea', particle: '#8e44ad' },
        { id: 'zen', name: 'Zen', a: '#1f2120', b: '#0f1110', accent: '#a3b18a', particle: '#dad7cd' },
        { id: 'supernova', name: 'Supernova', a: '#2b041a', b: '#12010a', accent: '#ff007f', particle: '#ff5e00' },
        { id: 'carbon', name: 'Carbón', a: '#171717', b: '#0a0a0a', accent: '#9ca3af', particle: '#e5e7eb' },
        { id: 'oceano-profundo', name: 'Océano Profundo', a: '#041524', b: '#010811', accent: '#00a8ff', particle: '#0097e6' },
        { id: 'sangre-real', name: 'Sangre Real', a: '#240004', b: '#120002', accent: '#e84118', particle: '#c23616' },
        { id: 'monocromo', name: 'Monocromo', a: '#222222', b: '#111111', accent: '#ffffff', particle: '#dddddd' },
        { id: 'atardecer', name: 'Atardecer', a: '#2a141b', b: '#12080c', accent: '#ff7f50', particle: '#ff6b81' }
      ];

      // Iconos SVG vectoriales limpios para las aplicaciones oficiales del ecosistema
      const OFFICIAL_APPS = [
        {
          id: 'pixavi', name: 'PIXAVI', tag: 'Creatividad y diseño', accent: '#ec48af',
          desc: 'Diseño web, identidad visual, producción gráfica y experiencias interactivas para marcas.',
          areas: ['Desarrollo Web', 'Identidad Visual', 'Diseño Gráfico'],
          href: './pixavi/pixavi.html',
          svg: '<img src="./assets/imagenes/pixavilogo.png" alt="PIXAVI" class="official-app-icon-img" onerror="this.outerHTML=\'<svg viewBox=\\\'0 0 64 64\\\' fill=\\\'none\\\'><rect width=\\\'64\\\' height=\\\'64\\\' rx=\\\'16\\\' fill=\\\'#ec48af\\\' fill-opacity=\\\'0.18\\\'/><path d=\\\'M18 46L32 16L46 46H38L32 32L26 46H18Z\\\' fill=\\\'#ff73c9\\\'/><circle cx=\\\'32\\\' cy=\\\'24\\\' r=\\\'4\\\' fill=\\\'#fff\\\'/></svg>\'"/>'
        },
        {
          id: 'worksvi', name: 'WorksVI', tag: 'Gestión y Productividad', accent: '#3fa2ff',
          desc: 'Entorno de trabajo enfocado en la gestión de proyectos, colaboración en equipo y seguimiento de tareas.',
          areas: ['Gestión Ágil', 'Kanban', 'Colaboración'], href: '#',
          svg: '<svg viewBox="0 0 64 64" fill="none"><rect width="64" height="64" rx="16" fill="#3fa2ff" fill-opacity="0.18"/><path d="M20 22h24v20H20z" stroke="#63b8ff" stroke-width="4"/><path d="M28 14h8v8h-8z" fill="#fff"/></svg>'
        },
        {
          id: 'adevi', name: 'Adevi', tag: 'Aprendizaje digital', accent: '#ff506a',
          desc: 'Conocimiento accesible, rutas de aprendizaje interactivas y educación tecnológica.',
          areas: ['Cursos Interactivos', 'Comunidad', 'Certificación'], href: '#',
          svg: '<svg viewBox="0 0 64 64" fill="none"><rect width="64" height="64" rx="16" fill="#ff506a" fill-opacity="0.18"/><path d="M32 16L14 25L32 34L50 25L32 16Z" stroke="#ff758a" stroke-width="3.5"/><path d="M20 30V42C20 45 26 48 32 48C38 48 44 45 44 42V30" stroke="#fff" stroke-width="3.2" stroke-linecap="round"/></svg>'
        },
        {
          id: 'shovi', name: 'Shovi', tag: 'Comercio electrónico', accent: '#f6a34b',
          desc: 'Tienda oficial y motor de comercio para productos tecnológicos, periféricos y soluciones digitales.',
          areas: ['Hardware', 'Accesorios', 'Pedidos'], href: '#',
          svg: '<svg viewBox="0 0 64 64" fill="none"><rect width="64" height="64" rx="16" fill="#f6a34b" fill-opacity="0.18"/><path d="M20 24H44L42 46H22L20 24Z" stroke="#ffbe73" stroke-width="3.5"/><path d="M26 24V20C26 16.7 28.7 14 32 14C35.3 14 38 16.7 38 20V24" stroke="#fff" stroke-width="3.2"/></svg>'
        },
        {
          id: 'fitvi', name: 'Fitvi', tag: 'Fitness y bienestar', accent: '#39d8a1',
          desc: 'Tecnología aplicada al movimiento, seguimiento de hábitos saludables y entrenamiento.',
          areas: ['Entrenamiento', 'Salud', 'Métricas'], href: '#',
          svg: '<svg viewBox="0 0 64 64" fill="none"><rect width="64" height="64" rx="16" fill="#39d8a1" fill-opacity="0.18"/><path d="M14 32H23L28 20L36 44L41 32H50" stroke="#5bf2be" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/></svg>'
        },
        {
          id: 'segbi', name: 'Segbi', tag: 'Seguridad y Privacidad', accent: '#c594ff',
          desc: 'Soluciones de encriptación, bóvedas locales seguras y monitoreo de privacidad para tu información.',
          areas: ['Cifrado', 'Bóveda Local', 'Privacidad'], href: '#',
          svg: '<svg viewBox="0 0 64 64" fill="none"><rect width="64" height="64" rx="16" fill="#c594ff" fill-opacity="0.18"/><rect x="22" y="28" width="20" height="20" rx="4" stroke="#d9b8ff" stroke-width="3.5"/><path d="M22 28V20c0-5.5 4.5-10 10-10s10 4.5 10 10v8" stroke="#fff" stroke-width="3.5" stroke-linecap="round"/></svg>'
        }
      ];

      const EXTERNAL_CATALOG = [
        { id: 'whatsapp', name: 'WhatsApp', url: 'https://web.whatsapp.com/', icon: 'whatsapp', color: '25D366' },
        { id: 'youtube', name: 'YouTube', url: 'https://www.youtube.com/', icon: 'youtube', color: 'FF0033' },
        { id: 'github', name: 'GitHub', url: 'https://github.com/', icon: 'github', color: 'FFFFFF' },
        { id: 'figma', name: 'Figma', url: 'https://www.figma.com/', icon: 'figma', color: 'F24E1E' },
        { id: 'notion', name: 'Notion', url: 'https://www.notion.so/', icon: 'notion', color: 'FFFFFF' },
        { id: 'spotify', name: 'Spotify', url: 'https://open.spotify.com/', icon: 'spotify', color: '1ED760' },
        { id: 'telegram', name: 'Telegram', url: 'https://web.telegram.org/', icon: 'telegram', color: '26A5E4' },
        { id: 'canva', name: 'Canva', url: 'https://www.canva.com/', icon: 'canva', color: '00C4CC' },
        { id: 'chatgpt', name: 'ChatGPT', url: 'https://chatgpt.com/', icon: 'openai', color: 'FFFFFF' },
        { id: 'gemini', name: 'Gemini', url: 'https://gemini.google.com/', icon: 'googlegemini', color: '8E75B2' },
        { id: 'discord', name: 'Discord', url: 'https://discord.com/app', icon: 'discord', color: '5865F2' },
        { id: 'gmail', name: 'Gmail', url: 'https://mail.google.com/', icon: 'gmail', color: 'EA4335' },
        { id: 'googledrive', name: 'Google Drive', url: 'https://drive.google.com/', icon: 'googledrive', color: '34A853' },
        { id: 'trello', name: 'Trello', url: 'https://trello.com/', icon: 'trello', color: '0052CC' },
        { id: 'linkedin', name: 'LinkedIn', url: 'https://www.linkedin.com/', icon: 'linkedin', color: '0A66C2' },
        { id: 'duolingo', name: 'Duolingo', url: 'https://www.duolingo.com/', icon: 'duolingo', color: '58CC02' }
      ];

      /* ----------------------------------------------------------------------
         B. ESTADO Y PREFERENCIAS PERSISTENTES
         ---------------------------------------------------------------------- */
      const PREF_KEY = 'avi-connection-prefs-v91';
      const SHORTCUTS_KEY = 'avi-connection-shortcuts-v91';
      const RECENT_KEY = 'avi-connection-recent-v91';
      const NOTIF_KEY = 'avi-connection-notifs-v91';

      const DEFAULT_PREFS = {
        theme: 'avi-original',
        autoTheme: false,
        particleStyle: 'stars',
        particleDensity: 55,
        wxCity: 'Cusco',
        wxSim: 'real',
        font: 'Inter',
        sideStyle: 'glass',
        panelOpacity: 82,
        textScale: 100,
        highContrast: false,
        reducedMotion: false,
        userName: '',
        customAccent: '',
        avatarUrl: '',
        showNews: true,
        showGoals: true,
        showFuture: true,
        showIdeas: true,
        showInsights: true
      };

      let prefs = { ...DEFAULT_PREFS };
      try {
        const saved = JSON.parse(localStorage.getItem(PREF_KEY) || '{}');
        if (saved && typeof saved === 'object') prefs = { ...prefs, ...saved };
      } catch { }

      function savePrefs() {
        try { localStorage.setItem(PREF_KEY, JSON.stringify(prefs)); } catch { }
        applyPrefs();
      }

      function getAutoThemeId() {
        const h = new Date().getHours();
        if (h >= 6 && h < 12) return 'alba';
        if (h >= 12 && h < 17) return 'solar';
        if (h >= 17 && h < 20) return 'prisma';
        return 'nebulosa';
      }

      function applyPrefs() {
        const activeThemeId = prefs.autoTheme ? getAutoThemeId() : prefs.theme;
        const th = THEMES.find(t => t.id === activeThemeId) || THEMES[0];
        const root = document.documentElement;
        root.dataset.theme = th.id;
        root.style.setProperty('--bg-a', th.a);
        root.style.setProperty('--bg-b', th.b);
        root.style.setProperty('--accent', th.accent);
        root.style.setProperty('--particle', th.particle);
        root.style.setProperty('--panel-alpha', String((Number(prefs.panelOpacity) || 82) / 100));
        root.style.setProperty('--text-scale', String((Number(prefs.textScale) || 100) / 100));
        root.style.setProperty('--ui-font', `'${prefs.font}', system-ui, sans-serif`);

        if (['Inter', 'Montserrat', 'Poppins', 'Orbitron', 'Roboto'].includes(prefs.font)) {
          const link = $('avi-google-font');
          const url = `https://fonts.googleapis.com/css2?family=${encodeURIComponent(prefs.font)}:wght@300;400;500;600;700&display=swap`;
          if (link && link.href !== url) link.href = url;
        }

        document.body.classList.toggle('high-contrast', Boolean(prefs.highContrast));
        document.body.dataset.reduced = String(Boolean(prefs.reducedMotion));
        ['glass', 'solid', 'outline'].forEach(st => document.body.classList.toggle('avi9-style-' + st, prefs.sideStyle === st));

        if (prefs.customAccent) {
          root.style.setProperty('--accent', prefs.customAccent);
          root.style.setProperty('--app-accent', prefs.customAccent);
        }

        const kicker = $('aviWelcomeKicker');
        if (kicker) kicker.textContent = prefs.userName ? 'HOLA, ' + prefs.userName.toUpperCase() : 'BIENVENIDO A AVI CONNECTION';

        if ($('aviNewsSection')) $('aviNewsSection').hidden = !prefs.showNews;
        if ($('aviGoalsSection')) $('aviGoalsSection').hidden = !prefs.showGoals;
        if ($('aviFutureSection')) $('aviFutureSection').hidden = !prefs.showFuture;
        if ($('aviIdeasSection')) $('aviIdeasSection').hidden = !prefs.showIdeas;
        if ($('aviInsightsSection')) $('aviInsightsSection').hidden = !prefs.showInsights;

        const accBtn = $('accountBtn');
        if (accBtn) {
          if (prefs.avatarUrl) {
            accBtn.innerHTML = `<img src="${prefs.avatarUrl}" alt="Avatar" class="account-avatar-img" onerror="this.outerHTML='<svg viewBox=\\'0 0 24 24\\'><circle cx=\\'12\\' cy=\\'8\\' r=\\'3.4\\'/><path d=\\'M5.2 20c.1-4 2.8-6.2 6.8-6.2s6.7 2.2 6.8 6.2\\'/></svg>'"/>`;
          } else {
            accBtn.innerHTML = `<svg viewBox="0 0 24 24"><circle cx="12" cy="8" r="3.4"/><path d="M5.2 20c.1-4 2.8-6.2 6.8-6.2s6.7 2.2 6.8 6.2"/></svg>`;
          }
        }

        // Sincronizar controles del panel
        if ($('prefAutoTheme')) $('prefAutoTheme').checked = prefs.autoTheme;
        if ($('prefWxCity')) $('prefWxCity').value = prefs.wxCity;
        if ($('prefWxSim')) $('prefWxSim').value = prefs.wxSim;
        if ($('prefParticleStyle')) $('prefParticleStyle').value = prefs.particleStyle;
        if ($('prefParticleDensity')) $('prefParticleDensity').value = prefs.particleDensity;
        if ($('prefFont')) $('prefFont').value = prefs.font;
        if ($('prefSideStyle')) $('prefSideStyle').value = prefs.sideStyle;
        if ($('prefPanelOpacity')) $('prefPanelOpacity').value = prefs.panelOpacity;
        if ($('prefTextScale')) $('prefTextScale').value = prefs.textScale;
        if ($('prefHighContrast')) $('prefHighContrast').checked = prefs.highContrast;
        if ($('prefReducedMotion')) $('prefReducedMotion').checked = prefs.reducedMotion;

        if ($('prefUserName')) $('prefUserName').value = prefs.userName;
        if ($('prefCustomAccent')) $('prefCustomAccent').value = prefs.customAccent || th.accent;
        if ($('prefAvatarUrl')) $('prefAvatarUrl').value = prefs.avatarUrl;
        if ($('prefShowNews')) $('prefShowNews').checked = prefs.showNews;
        if ($('prefShowGoals')) $('prefShowGoals').checked = prefs.showGoals;
        if ($('prefShowFuture')) $('prefShowFuture').checked = prefs.showFuture;
        if ($('prefShowIdeas')) $('prefShowIdeas').checked = prefs.showIdeas;
        if ($('prefShowInsights')) $('prefShowInsights').checked = prefs.showInsights;

        $$('#settingsThemeGrid .theme-btn').forEach(b => b.classList.toggle('is-selected', b.dataset.theme === th.id));
      }

      /* ----------------------------------------------------------------------
         C. SISTEMA DE NOTIFICACIONES Y TOAST
         ---------------------------------------------------------------------- */
      let toastTimer = 0;
      function showToast(msg) {
        const el = $('toast');
        if (!el) return;
        el.textContent = msg;
        el.classList.add('is-visible');
        clearTimeout(toastTimer);
        toastTimer = setTimeout(() => el.classList.remove('is-visible'), 3400);
        pushNotification(msg);
      }

      function getNotifications() {
        try { return JSON.parse(localStorage.getItem(NOTIF_KEY) || '[]'); } catch { return []; }
      }

      function pushNotification(text) {
        const list = [{ text, time: Date.now() }, ...getNotifications()].slice(0, 20);
        try { localStorage.setItem(NOTIF_KEY, JSON.stringify(list)); } catch { }
        $('notificationsDot').hidden = false;
        renderNotifications();
      }

      function renderNotifications() {
        const container = $('notificationsList');
        if (!container) return;
        const list = getNotifications();
        container.replaceChildren();
        if (!list.length) {
          container.innerHTML = '<p class="notifications-empty">No tienes notificaciones recientes.</p>';
          return;
        }
        list.forEach(n => {
          const item = document.createElement('div');
          item.className = 'notification-item';
          const timeStr = new Date(n.time).toLocaleTimeString('es-PE', { hour: '2-digit', minute: '2-digit' });
          item.innerHTML = `<strong class="notification-item__title">✦ ${n.text}</strong><small class="notification-item__time">${timeStr}</small>`;
          container.append(item);
        });
      }

      $('clearNotifsBtn')?.addEventListener('click', () => {
        localStorage.removeItem(NOTIF_KEY);
        $('notificationsDot').hidden = true;
        renderNotifications();
      });

      /* ----------------------------------------------------------------------
         D. HISTORIAL RECIENTE ("CONTINUAR DONDE LO DEJASTE")
         ---------------------------------------------------------------------- */
      function recordActivity(id, type, title, actionData = {}) {
        let list = [];
        try { list = JSON.parse(localStorage.getItem(RECENT_KEY) || '[]'); } catch { }
        list = [{ id, type, title, time: Date.now(), ...actionData }, ...list.filter(x => x.id !== id)].slice(0, 4);
        try { localStorage.setItem(RECENT_KEY, JSON.stringify(list)); } catch { }
        renderRecent();
      }

      function renderRecent() {
        let list = [];
        try { list = JSON.parse(localStorage.getItem(RECENT_KEY) || '[]'); } catch { }
        const sec = $('recentSection'), grid = $('recentGrid');
        if (!sec || !grid) return;
        sec.hidden = list.length === 0;
        grid.replaceChildren();
        list.forEach(item => {
          const btn = document.createElement('button');
          btn.type = 'button';
          btn.className = 'recent-card';
          btn.innerHTML = `<span class="kicker">${item.type}</span><strong class="recent-card__title">${item.title}</strong><small class="recent-card__hint">Continuar ↗</small>`;
          btn.addEventListener('click', () => {
            if (item.view) switchView(item.view);
            if (item.appId) openAppPreview(item.appId);
          });
          grid.append(btn);
        });
      }

      $('clearRecentBtn')?.addEventListener('click', () => {
        localStorage.removeItem(RECENT_KEY);
        renderRecent();
      });

      /* ----------------------------------------------------------------------
         E. NAVEGACIÓN DE VISTAS, SIDEBAR E ISLA DEL ECOSISTEMA
         ---------------------------------------------------------------------- */
      const VIEWS = ['inicio', 'suite', 'proyectos'];

      function switchView(target) {
        if (!VIEWS.includes(target)) return;
        VIEWS.forEach(v => {
          const sec = document.querySelector(`[data-view="${v}"]`);
          if (sec) sec.hidden = v !== target;
        });
        $$('.avi-nav-entry[data-avi-nav]').forEach(btn => {
          const active = btn.dataset.aviNav === target;
          if (VIEWS.includes(btn.dataset.aviNav)) {
            btn.classList.toggle('is-selected', active);
            if (active) btn.setAttribute('aria-current', 'page');
            else btn.removeAttribute('aria-current');
          }
        });
        $('aviDashboardMain').scrollTop = 0;
        if (target === 'suite') recordActivity('view-suite', 'SECCIÓN', 'Explorar Connection Suite', { view: 'suite' });
        if (target === 'proyectos') {
          recordActivity('view-files', 'SECCIÓN', 'Gestor Connection Files', { view: 'proyectos' });
          renderWorkspaceFiles();
        }
      }

      $$('[data-avi-nav]').forEach(btn => {
        btn.addEventListener('click', () => {
          const action = btn.dataset.aviNav;
          if (VIEWS.includes(action)) switchView(action);
          else if (action === 'buscar') $('aviWebDialog').showModal();
          else if (action === 'avi') toggleDrawer('avi9Agent', true);
          else if (action === 'ajustes') toggleDrawer('settingsLayer', true);
        });
      });

      $$('[data-goto-view]').forEach(btn => {
        btn.addEventListener('click', () => switchView(btn.dataset.gotoView));
      });

      $('brandLink')?.addEventListener('click', e => {
        e.preventDefault();
        switchView('inicio');
      });

      // Isla Superior desplegable
      const island = $('portfolioIsland'), toggleBtn = $('portfolioToggle');
      function setIslandOpen(open) {
        island.classList.toggle('is-open', open);
        island.setAttribute('aria-hidden', String(!open));
        toggleBtn.setAttribute('aria-expanded', String(open));
      }

      toggleBtn?.addEventListener('click', e => {
        e.stopPropagation();
        setIslandOpen(!island.classList.contains('is-open'));
      });

      document.addEventListener('pointerdown', e => {
        if (island.classList.contains('is-open') && !island.contains(e.target) && !toggleBtn.contains(e.target)) {
          setIslandOpen(false);
        }
      });

      island?.addEventListener('click', e => {
        const appLink = e.target.closest('[data-eco-app]');
        const actLink = e.target.closest('[data-eco-action]');
        if (appLink) {
          e.preventDefault();
          setIslandOpen(false);
          openAppPreview(appLink.dataset.ecoApp);
        } else if (actLink) {
          e.preventDefault();
          setIslandOpen(false);
          if (actLink.dataset.ecoAction === 'news') {
            switchView('inicio');
            $('aviNewsSection')?.scrollIntoView({ behavior: 'smooth' });
          } else {
            showToast('AVI PAY se encuentra en fase de desarrollo conceptual.');
          }
        }
      });

      // Drawers laterales
      function toggleDrawer(id, show) {
        const el = $(id);
        if (!el) return;
        el.hidden = !show;
        if (id === 'notificationsLayer' && show) {
          $('notificationsDot').hidden = true;
          renderNotifications();
        }
      }

      $$('[data-close-drawer]').forEach(el => {
        el.addEventListener('click', () => toggleDrawer(el.dataset.closeDrawer, false));
      });

      $('settingsBtn')?.addEventListener('click', () => toggleDrawer('settingsLayer', true));
      $('notificationsBtn')?.addEventListener('click', () => toggleDrawer('notificationsLayer', true));
      $('weatherWidgetBtn')?.addEventListener('click', () => toggleDrawer('settingsLayer', true));
      $('accountBtn')?.addEventListener('click', () => showToast('Sesión local de AVI CONNECTION activa en este navegador.'));

      // Pantalla completa
      $('fullscreenBtn')?.addEventListener('click', async () => {
        try {
          if (document.fullscreenElement) await document.exitFullscreen();
          else await document.documentElement.requestFullscreen();
        } catch {
          showToast('Tu navegador restringió el cambio de pantalla completa.');
        }
      });

      // Reloj en tiempo real
      function updateClock() {
        const now = new Date();
        $('clockTime').textContent = now.toLocaleTimeString('es-PE', { hour: '2-digit', minute: '2-digit', hour12: false });
        $('clockDate').textContent = now.toLocaleDateString('es-PE', { weekday: 'short', day: 'numeric', month: 'short' });
      }
      updateClock();
      setInterval(updateClock, 10000);

      /* ----------------------------------------------------------------------
         F. MOTOR DE PARTÍCULAS INTERACTIVO (#particlesCanvas)
         ---------------------------------------------------------------------- */
      const pCanvas = $('particlesCanvas');
      const pCtx = pCanvas.getContext('2d');
      let pList = [], pW = 0, pH = 0, pointerX = -999, pointerY = -999;

      function resizeParticles() {
        pW = window.innerWidth;
        pH = window.innerHeight;
        const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
        pCanvas.width = pW * dpr;
        pCanvas.height = pH * dpr;
        pCtx.setTransform(dpr, 0, 0, dpr, 0, 0);
        const count = Math.max(15, Math.min(130, Math.round((pW * pH / 95000) * (prefs.particleDensity * 0.55))));
        pList = Array.from({ length: count }, () => ({
          x: Math.random() * pW,
          y: Math.random() * pH,
          z: 0.4 + Math.random() * 1.2,
          vx: (Math.random() - 0.5) * 0.4,
          vy: (Math.random() - 0.5) * 0.4,
          r: 0.8 + Math.random() * 2
        }));
      }

      window.addEventListener('pointermove', e => { pointerX = e.clientX; pointerY = e.clientY; }, { passive: true });
      window.addEventListener('resize', resizeParticles, { passive: true });
      resizeParticles();

      function animateParticles(t) {
        requestAnimationFrame(animateParticles);
        if (document.hidden || prefs.reducedMotion) {
          pCtx.clearRect(0, 0, pW, pH);
          return;
        }
        pCtx.clearRect(0, 0, pW, pH);
        const color = getComputedStyle(document.documentElement).getPropertyValue('--particle').trim() || '#a994ff';
        const style = prefs.particleStyle;
        pCtx.fillStyle = color;
        pCtx.strokeStyle = color;

        for (let i = 0; i < pList.length; i++) {
          const p = pList[i];
          const dx = p.x - pointerX, dy = p.y - pointerY, d2 = dx * dx + dy * dy;
          if (d2 < 16000 && d2 > 10) {
            const f = (1 - d2 / 16000) * 0.18;
            p.vx += (dx / Math.sqrt(d2)) * f;
            p.vy += (dy / Math.sqrt(d2)) * f;
          }
          p.vx *= 0.985;
          p.vy *= 0.985;
          p.x += (p.vx + Math.sin(t * 0.0004 + i) * 0.2) * p.z;
          p.y += (p.vy - 0.12) * p.z;

          if (p.x < -10) p.x = pW + 10;
          if (p.x > pW + 10) p.x = -10;
          if (p.y < -10) p.y = pH + 10;
          if (p.y > pH + 10) p.y = -10;

          pCtx.globalAlpha = Math.min(0.85, 0.3 + p.z * 0.35);
          if (style === 'meteor') {
            pCtx.beginPath();
            pCtx.moveTo(p.x, p.y);
            pCtx.lineTo(p.x - p.z * 7, p.y + p.z * 14);
            pCtx.stroke();
          } else if (style === 'crystal') {
            pCtx.strokeRect(p.x - p.r, p.y - p.r, p.r * 2.2, p.r * 2.2);
          } else if (style === 'organic') {
            pCtx.beginPath();
            pCtx.arc(p.x, p.y, p.r * 2.1, 0, Math.PI * 2);
            pCtx.stroke();
          } else {
            pCtx.beginPath();
            pCtx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
            pCtx.fill();
          }
        }

        if (style === 'network') {
          pCtx.lineWidth = 0.65;
          for (let i = 0; i < Math.min(pList.length, 55); i++) {
            for (let j = i + 1; j < Math.min(pList.length, 55); j++) {
              const a = pList[i], b = pList[j];
              const dist2 = (a.x - b.x) ** 2 + (a.y - b.y) ** 2;
              if (dist2 < 9000) {
                pCtx.globalAlpha = (1 - dist2 / 9000) * 0.22;
                pCtx.beginPath();
                pCtx.moveTo(a.x, a.y);
                pCtx.lineTo(b.x, b.y);
                pCtx.stroke();
              }
            }
          }
        }
        pCtx.globalAlpha = 1;
      }
      requestAnimationFrame(animateParticles);

      /* ----------------------------------------------------------------------
         G. CONNECTION EXPERIENCE (CLIMA REAL OPEN-METEO Y PARTÍCULAS CLIMÁTICAS)
         ---------------------------------------------------------------------- */
      const PERU_CITIES = {
        Cusco: [-13.5319, -71.9675],
        Lima: [-12.0464, -77.0428],
        Arequipa: [-16.4090, -71.5375],
        Trujillo: [-8.1120, -79.0287],
        Piura: [-5.1945, -80.6328],
        Puno: [-15.8402, -70.0219],
        Iquitos: [-3.7437, -73.2516]
      };

      const WX_META = {
        sun: ['☀', 'Soleado', 'radial-gradient(ellipse at 78% 18%, rgba(255,205,96,0.32), transparent 72%)'],
        clear: ['⛅', 'Despejado', 'radial-gradient(ellipse at 75% 15%, rgba(255,200,107,0.22), transparent 75%)'],
        cloud: ['☁', 'Nublado', 'linear-gradient(125deg, rgba(40,47,85,0.45), rgba(25,35,73,0.4))'],
        rain: ['🌧', 'Lluvia', 'linear-gradient(145deg, rgba(14,38,88,0.58), rgba(20,19,73,0.5))'],
        storm: ['⛈', 'Tormenta', 'linear-gradient(150deg, rgba(8,24,58,0.68), rgba(17,12,45,0.65))'],
        snow: ['❄', 'Nieve', 'linear-gradient(145deg, rgba(35,67,101,0.45), rgba(45,49,97,0.4))'],
        night: ['🌙', 'Noche', 'radial-gradient(ellipse at 60% 10%, rgba(61,70,163,0.28), transparent 73%)'],
        off: ['◌', 'Clima inactivo', 'transparent']
      };

      let currentWx = 'clear';
      const wxCanvas = $('wxCanvas');
      const wxCtx = wxCanvas.getContext('2d');
      let wxDrops = [];

      function setWeatherVisual(type, tempText, descText) {
        currentWx = WX_META[type] ? type : 'clear';
        document.documentElement.dataset.wx = currentWx;
        const meta = WX_META[currentWx];
        $('wxBgA').style.background = meta[2];
        $('wxWidgetIcon').textContent = meta[0];
        $('wxWidgetTemp').textContent = tempText || '-- °C';
        $('wxWidgetCity').textContent = `${prefs.wxCity} · ${descText || meta[1]}`;
        wxDrops = Array.from({ length: 75 }, () => ({
          x: Math.random() * window.innerWidth,
          y: Math.random() * window.innerHeight,
          s: 0.8 + Math.random() * 1.2
        }));
      }

      async function updateWeather() {
        if (prefs.wxSim !== 'real') {
          setWeatherVisual(prefs.wxSim, 'Sim.', WX_META[prefs.wxSim]?.[1] || 'Demo');
          return;
        }
        const coords = PERU_CITIES[prefs.wxCity] || PERU_CITIES.Cusco;
        try {
          const url = `https://api.open-meteo.com/v1/forecast?latitude=${coords[0]}&longitude=${coords[1]}&current=temperature_2m,weather_code,is_day&timezone=auto`;
          const res = await fetch(url);
          if (!res.ok) throw new Error('HTTP ' + res.status);
          const data = await res.json();
          const c = data.current;
          const code = Number(c.weather_code ?? 0);
          let kind = c.is_day === 0 ? 'night' : 'clear';
          if (code >= 95) kind = 'storm';
          else if (code >= 71 && code <= 86) kind = 'snow';
          else if (code >= 51 && code <= 82) kind = 'rain';
          else if (code >= 2 && code <= 48) kind = 'cloud';
          else if (c.is_day === 1 && code === 0) kind = 'sun';

          setWeatherVisual(kind, `${Math.round(c.temperature_2m)} °C`, WX_META[kind][1]);
        } catch {
          const h = new Date().getHours();
          const fallback = (h >= 19 || h < 6) ? 'night' : 'clear';
          setWeatherVisual(fallback, '16 °C', 'Hora local');
        }
      }

      function animateWeatherCanvas() {
        requestAnimationFrame(animateWeatherCanvas);
        if (document.hidden || prefs.reducedMotion || !['rain', 'storm', 'snow'].includes(currentWx)) {
          wxCtx.clearRect(0, 0, wxCanvas.width, wxCanvas.height);
          return;
        }
        if (wxCanvas.width !== window.innerWidth || wxCanvas.height !== window.innerHeight) {
          wxCanvas.width = window.innerWidth;
          wxCanvas.height = window.innerHeight;
        }
        wxCtx.clearRect(0, 0, wxCanvas.width, wxCanvas.height);
        wxCtx.strokeStyle = 'rgba(180, 215, 255, 0.45)';
        wxCtx.fillStyle = 'rgba(240, 248, 255, 0.65)';
        wxCtx.lineWidth = 1.1;

        for (const d of wxDrops) {
          if (currentWx === 'snow') {
            d.y += 1.2 * d.s;
            d.x += Math.sin(d.y * 0.02) * 0.5;
            wxCtx.beginPath();
            wxCtx.arc(d.x, d.y, 1.8 * d.s, 0, Math.PI * 2);
            wxCtx.fill();
          } else {
            d.y += (currentWx === 'storm' ? 13 : 9) * d.s;
            d.x -= 1.5 * d.s;
            wxCtx.beginPath();
            wxCtx.moveTo(d.x, d.y);
            wxCtx.lineTo(d.x - 2.5, d.y + 13 * d.s);
            wxCtx.stroke();
          }
          if (d.y > wxCanvas.height) { d.y = -15; d.x = Math.random() * wxCanvas.width; }
          if (d.x < 0) d.x = wxCanvas.width;
        }
      }
      requestAnimationFrame(animateWeatherCanvas);

      /* ----------------------------------------------------------------------
         H. INICIO: AVI NEWS, ORIENTADOR, PERÚ 2035, IDEAS E INSIGHTS
         ---------------------------------------------------------------------- */
      const BACKUP_NEWS = [
        {
          label: 'PERÚ', source: 'Agencia Andina / RPP', date: 'Actualidad Nacional',
          title: 'Innovación y conectividad digital impulsan el aprendizaje y emprendimiento en regiones del Perú',
          summary: 'Proyectos tecnológicos regionales buscan acercar herramientas digitales, educación accesible y plataformas de comercio electrónico a estudiantes y emprendedores en Cusco, Arequipa, Lima y todo el país.',
          link: 'https://rpp.pe/peru'
        },
        {
          label: 'PERÚ', source: 'RPP Noticias', date: 'Ciencia y Educación',
          title: 'Universidades y centros de investigación peruanos desarrollan iniciativas de ciencia aplicada',
          summary: 'Equipos multidisciplinarios promueven el desarrollo de software, monitoreo ambiental y soluciones sostenibles pensadas para responder a los desafíos locales hacia el 2035.',
          link: 'https://rpp.pe/tecnologia'
        },
        {
          label: 'MUNDO', source: 'BBC News Mundo', date: 'Tecnología Global',
          title: 'Avances en inteligencia artificial y computación abierta transforman el diseño de software',
          summary: 'La integración responsable de asistentes inteligentes y arquitecturas web ligeras permite crear entornos de trabajo más rápidos, privados y centrados en el usuario.',
          link: 'https://www.bbc.com/mundo/topics/cyx5krnw38vt'
        },
        {
          label: 'MUNDO', source: 'BBC News Mundo', date: 'Exploración Espacial',
          title: 'Nuevas misiones espaciales y telescopios amplían nuestra comprensión del sistema solar',
          summary: 'Observatorios orbitales y misiones internacionales continúan recopilando datos clave sobre atmósferas planetarias, asteroides y física gravitatoria.',
          link: 'https://www.bbc.com/mundo/topics/ckdxnw959n7t'
        }
      ];

      let currentNewsList = [...BACKUP_NEWS];
      let activeNewsIdx = 0;

      function renderNewsCards(list) {
        currentNewsList = list;
        const grid = $('newsGrid');
        if (!grid) return;
        grid.replaceChildren();
        list.forEach((item, idx) => {
          const card = document.createElement('button');
          card.type = 'button';
          card.className = 'news-card';
          card.innerHTML = `
            <div class="news-cover">
              <span>AVI NEWS · ${item.label}</span>
              ${item.image ? `<img src="${item.image}" alt="" loading="lazy" referrerpolicy="no-referrer" onerror="this.remove()"/>` : ''}
            </div>
            <div class="news-body">
              <span class="kicker">${item.label}</span>
              <strong>${item.title}</strong>
              <small>${item.source}</small>
              <span class="news-read-more">Leer vista rápida ↗</span>
            </div>
          `;
          card.addEventListener('click', () => openNewsModal(idx));
          grid.append(card);
        });
      }

      async function fetchLiveNews() {
        $('newsStatus').textContent = 'Consultando fuentes RSS en vivo…';
        renderNewsCards(BACKUP_NEWS);
        try {
          const [peruRes, worldRes] = await Promise.all([
            fetch('https://api.rss2json.com/v1/api.json?rss_url=' + encodeURIComponent('https://rpp.pe/rss')),
            fetch('https://api.rss2json.com/v1/api.json?rss_url=' + encodeURIComponent('https://feeds.bbci.co.uk/mundo/rss.xml'))
          ]);
          const peruData = await peruRes.json();
          const worldData = await worldRes.json();
          const clean = html => {
            const d = new DOMParser().parseFromString(html || '', 'text/html');
            return (d.body.textContent || '').trim().slice(0, 320);
          };
          const pItems = (peruData.items || []).slice(0, 2).map(x => ({
            label: 'PERÚ', source: 'RPP Noticias', date: x.pubDate || '',
            title: x.title, summary: clean(x.description), link: x.link, image: x.thumbnail || x.enclosure?.link || ''
          }));
          const wItems = (worldData.items || []).slice(0, 2).map(x => ({
            label: 'MUNDO', source: 'BBC News Mundo', date: x.pubDate || '',
            title: x.title, summary: clean(x.description), link: x.link, image: x.thumbnail || x.enclosure?.link || ''
          }));
          if (pItems.length && wItems.length) {
            renderNewsCards([...pItems, ...wItems]);
            $('newsStatus').textContent = 'Titulares actualizados en tiempo real.';
          } else {
            $('newsStatus').textContent = 'Mostrando edición verificada de respaldo.';
          }
        } catch {
          $('newsStatus').textContent = 'Mostrando edición editorial de respaldo (modo sin conexión RSS).';
        }
      }

      function openNewsModal(idx) {
        activeNewsIdx = (idx + currentNewsList.length) % currentNewsList.length;
        const item = currentNewsList[activeNewsIdx];
        $('newsModalRegion').textContent = `AVI NEWS · ${item.label}`;
        $('newsModalMeta').textContent = `${item.source} ${item.date ? '· ' + item.date : ''}`;
        $('newsModalTitle').textContent = item.title;
        $('newsModalExcerpt').textContent = item.summary || 'Abre la fuente original para leer el artículo completo.';
        $('newsOriginalLink').href = item.link;
        $('newsPagerLabel').textContent = `${activeNewsIdx + 1} / ${currentNewsList.length}`;
        $('newsModalCover').innerHTML = item.image
          ? `<img src="${item.image}" alt="" referrerpolicy="no-referrer" onerror="this.remove()"/>`
          : `<span>AVI NEWS · ${item.label}</span>`;
        const dlg = $('newsDialog');
        if (!dlg.open) dlg.showModal();
        recordActivity('news-' + activeNewsIdx, 'AVI NEWS', item.title, { view: 'inicio' });
      }

      $('closeNewsModal')?.addEventListener('click', () => $('newsDialog').close());
      $('prevNewsBtn')?.addEventListener('click', () => openNewsModal(activeNewsIdx - 1));
      $('nextNewsBtn')?.addEventListener('click', () => openNewsModal(activeNewsIdx + 1));
      $('copyNewsLinkBtn')?.addEventListener('click', async () => {
        const item = currentNewsList[activeNewsIdx];
        try {
          await navigator.clipboard.writeText(item.link);
          showToast('Enlace de la noticia copiado al portapapeles.');
        } catch {
          showToast('No se pudo copiar automáticamente.');
        }
      });
      $('refreshNewsBtn')?.addEventListener('click', fetchLiveNews);

      // Orientador "¿Qué quieres hacer hoy?"
      const GOALS_MAP = {
        emprender: { title: 'Empieza por PIXAVI y AVI SHOP', text: 'Construye la identidad visual de tu proyecto y explora los módulos comerciales en Connection Suite.', view: 'suite' },
        aprender: { title: 'Explora ADEVI', text: 'Descubre experiencias de aprendizaje digital diseñadas para potenciar nuevas habilidades.', view: 'suite' },
        crear: { title: 'Conoce PIXAVI y MIXEL', text: 'Desde diseño de interfaces hasta producción sonora dentro de Connection Suite.', view: 'suite' },
        investigar: { title: 'Descubre AVI HORIZONS y AVI LABS', text: 'Explora divulgación científica, espacio y prototipos experimentales.', view: 'suite' },
        organizar: { title: 'Abre Connection Files', text: 'Crea carpetas y resguarda tus documentos importantes directamente en tu navegador.', view: 'proyectos' }
      };
      let selectedGoalTarget = 'suite';

      $$('[data-goal]').forEach(btn => {
        btn.addEventListener('click', () => {
          $$('[data-goal]').forEach(b => b.classList.toggle('is-selected', b === btn));
          const info = GOALS_MAP[btn.dataset.goal];
          selectedGoalTarget = info.view;
          $('goalResultTitle').textContent = info.title;
          $('goalResultText').textContent = info.text;
          $('goalResult').hidden = false;
        });
      });
      $('goalActionBtn')?.addEventListener('click', () => switchView(selectedGoalTarget));

      // Perú 2035
      const CHALLENGES_MAP = {
        educacion: ['Aprender sin barreras', 'Explorar herramientas educativas que se adapten a diferentes ritmos, dispositivos y contextos de acceso en todo el país.'],
        conectividad: ['Conectar más comunidades', 'Crear aplicaciones web ligeras y rápidas capaces de funcionar con fluidez incluso en conexiones móviles limitadas.'],
        servicios: ['Simplificar lo cotidiano', 'Diseñar plataformas ciudadanas y comerciales claras, transparentes y sin pasos burocráticos innecesarios.']
      };
      $$('[data-challenge]').forEach(btn => {
        btn.addEventListener('click', () => {
          $$('[data-challenge]').forEach(b => b.classList.toggle('is-selected', b === btn));
          const [t, d] = CHALLENGES_MAP[btn.dataset.challenge];
          $('challengeTitle').textContent = t;
          $('challengeDesc').textContent = d;
        });
      });

      // AVI IDEAS (LocalStorage)
      const IDEAS_KEY = 'avi-connection-ideas-v91';
      function getIdeas() {
        try { return JSON.parse(localStorage.getItem(IDEAS_KEY) || '[]'); } catch { return []; }
      }
      function renderIdeas() {
        const list = getIdeas();
        const grid = $('ideasSavedGrid');
        if (!grid) return;
        grid.hidden = list.length === 0;
        grid.replaceChildren();
        list.forEach(item => {
          const card = document.createElement('div');
          card.className = 'idea-item';
          const copy = document.createElement('div');
          const strong = document.createElement('strong');
          strong.textContent = item.title;
          const p = document.createElement('p');
          p.style.cssText = 'margin:4px 0 0; font-size:12.5px; color:var(--muted);';
          p.textContent = item.text;
          copy.append(strong, p);
          const del = document.createElement('button');
          del.type = 'button';
          del.className = 'btn-ghost';
          del.style.cssText = 'min-height:30px; padding:4px 10px; font-size:11px; align-self:flex-start;';
          del.textContent = 'Eliminar';
          del.addEventListener('click', () => {
            const next = getIdeas().filter(x => x.id !== item.id);
            localStorage.setItem(IDEAS_KEY, JSON.stringify(next));
            renderIdeas();
          });
          card.append(copy, del);
          grid.append(card);
        });
      }
      $('ideasForm')?.addEventListener('submit', e => {
        e.preventDefault();
        const title = $('ideaTitle').value.trim();
        const text = $('ideaText').value.trim();
        if (!title || !text) return;
        const next = [{ id: Date.now(), title, text }, ...getIdeas()].slice(0, 20);
        localStorage.setItem(IDEAS_KEY, JSON.stringify(next));
        e.target.reset();
        renderIdeas();
        showToast('Idea guardada localmente en tu navegador.');
      });

      // AVI INSIGHTS
      const INSIGHTS_DATA = {
        ia: ['Más allá de usar inteligencia artificial', [
          'Incorporar inteligencia artificial no convierte automáticamente una idea en una innovación. Antes hay que identificar un problema real y comprender a quién afecta.',
          'Una solución útil debe poder explicarse con claridad por el valor que aporta. Luego podemos evaluar cómo la automatización o los modelos de lenguaje mejoran la experiencia.',
          'En AVI CONNECTION vemos la tecnología como un puente para potenciar la creatividad humana.'
        ]],
        seguridad: ['Tu información también vale', [
          'Una plataforma moderna debe ser rápida, pero también transparente sobre dónde viven tus datos.',
          'Utilizar almacenamiento local en el navegador (como IndexedDB) permite trabajar con archivos y preferencias personales sin exponer información sensible a servidores externos sin tu permiso.',
          'Combinar contraseñas únicas y verificar los permisos de cada servicio es el mejor hábito digital.'
        ]],
        ciencia: ['Investigar es preguntar mejor', [
          'Toda innovación científica comienza con una pregunta bien formulada y la curiosidad por poner a prueba una hipótesis.',
          'Desde la exploración espacial hasta el desarrollo de software, experimentar con prototipos verificables nos permite aprender más rápido y construir mejores soluciones.'
        ]]
      };
      $$('[data-insight]').forEach(btn => {
        btn.addEventListener('click', () => {
          const [title, paragraphs] = INSIGHTS_DATA[btn.dataset.insight];
          $('insightModalTitle').textContent = title;
          const box = $('insightModalContent');
          box.replaceChildren(...paragraphs.map(t => {
            const p = document.createElement('p');
            p.style.margin = '0';
            p.textContent = t;
            return p;
          }));
          $('insightDialog').showModal();
          recordActivity('insight-' + btn.dataset.insight, 'AVI INSIGHTS', title, { view: 'inicio' });
        });
      });
      $('closeInsightModal')?.addEventListener('click', () => $('insightDialog').close());

      /* ----------------------------------------------------------------------
         I. VISTA 2: CONNECTION SUITE Y CATÁLOGO DE APLICACIONES
         ---------------------------------------------------------------------- */
      function getSavedShortcuts() {
        try {
          const raw = localStorage.getItem(SHORTCUTS_KEY);
          if (!raw) {
            const initial = EXTERNAL_CATALOG.slice(0, 4);
            localStorage.setItem(SHORTCUTS_KEY, JSON.stringify(initial));
            return initial;
          }
          return JSON.parse(raw);
        } catch { return []; }
      }

      function saveShortcuts(list) {
        try { localStorage.setItem(SHORTCUTS_KEY, JSON.stringify(list)); } catch { }
        renderSuiteGrid();
        renderCatalogModal();
      }

      function getIconUrl(item) {
        if (item.icon && item.color) return `https://cdn.simpleicons.org/${item.icon}/${item.color}`;
        try { return `https://www.google.com/s2/favicons?domain=${encodeURIComponent(new URL(item.url).hostname)}&sz=128`; }
        catch { return ''; }
      }

      function openAppPreview(appId) {
        const app = OFFICIAL_APPS.find(a => a.id === appId);
        if (!app) return;
        document.documentElement.dataset.app = app.id;
        recordActivity('app-' + app.id, 'PLATAFORMA', app.name, { appId: app.id });

        if (app.href && app.href !== '#') {
          window.location.href = app.href;
          return;
        }

        $('previewAppIcon').innerHTML = app.svg;
        $('previewAppTag').textContent = app.tag;
        $('previewAppTitle').textContent = app.name;
        $('previewAppDesc').textContent = app.desc;
        $('previewOpenLink').href = app.href;
        const areasBox = $('previewAppAreas');
        areasBox.replaceChildren(...app.areas.map(area => {
          const d = document.createElement('div');
          d.style.cssText = 'padding:10px; border-radius:10px; background:rgba(255,255,255,0.04); border:1px solid var(--stroke); font-size:11.5px; text-align:center;';
          d.textContent = area;
          return d;
        }));
        $('appPreviewDialog').showModal();
      }

      $('closePreviewModal')?.addEventListener('click', () => $('appPreviewDialog').close());
      $('previewCancelBtn')?.addEventListener('click', () => $('appPreviewDialog').close());

      function renderSuiteGrid(filterQuery = '') {
        const ribbon = $('appsRibbon');
        if (!ribbon) return;
        const q = filterQuery.toLowerCase().trim();
        ribbon.replaceChildren();

        // 1. Aplicaciones oficiales de AVI CONNECTION
        OFFICIAL_APPS.forEach(app => {
          if (q && !app.name.toLowerCase().includes(q) && !app.tag.toLowerCase().includes(q)) return;
          const btn = document.createElement('button');
          btn.type = 'button';
          btn.className = 'app-tile';
          btn.style.setProperty('--app-accent', app.accent);
          btn.innerHTML = `<div class="app-tile__icon">${app.svg}</div><span class="app-tile__name">${app.name}</span>`;
          btn.addEventListener('pointerenter', () => { document.documentElement.dataset.app = app.id; });
          btn.addEventListener('click', () => openAppPreview(app.id));
          ribbon.append(btn);
        });

        // 2. Accesos directos guardados por el usuario
        const shortcuts = getSavedShortcuts();
        shortcuts.forEach(item => {
          if (q && !item.name.toLowerCase().includes(q)) return;
          const tile = document.createElement('div');
          tile.className = 'app-tile';
          const launch = document.createElement('button');
          launch.type = 'button';
          launch.style.cssText = 'background:none; border:0; display:flex; flex-direction:column; align-items:center; gap:12px; width:100%; height:100%; justify-content:center;';
          launch.innerHTML = `<div class="app-tile__icon"><img src="${getIconUrl(item)}" alt="" loading="lazy" referrerpolicy="no-referrer" onerror="this.outerHTML='<span class=app-tile__fallback-letter>${item.name[0]}</span>'"/></div><span class="app-tile__name">${item.name}</span>`;
          launch.addEventListener('click', () => window.open(item.url, '_blank', 'noopener,noreferrer'));

          const removeBtn = document.createElement('button');
          removeBtn.type = 'button';
          removeBtn.className = 'app-tile__remove';
          removeBtn.title = `Quitar ${item.name}`;
          removeBtn.textContent = '×';
          removeBtn.addEventListener('click', e => {
            e.stopPropagation();
            saveShortcuts(getSavedShortcuts().filter(s => s.id !== item.id));
            showToast(`${item.name} se quitó de Connection Suite.`);
          });

          tile.append(launch, removeBtn);
          ribbon.append(tile);
        });

        // 3. Botón "+" para abrir catálogo
        const addBtn = document.createElement('button');
        addBtn.type = 'button';
        addBtn.className = 'app-tile app-tile--add';
        addBtn.innerHTML = `<span class="app-tile__add-symbol">+</span><span class="app-tile__name">AGREGAR APPS</span>`;
        addBtn.addEventListener('click', () => $('aviAddDialog').showModal());
        ribbon.append(addBtn);
      }

      function renderCatalogModal() {
        const grid = $('catalogGrid');
        if (!grid) return;
        const current = getSavedShortcuts();
        grid.replaceChildren();
        EXTERNAL_CATALOG.forEach(service => {
          const added = current.some(s => s.id === service.id);
          const card = document.createElement('button');
          card.type = 'button';
          card.className = 'catalog-card';
          card.innerHTML = `
            <img src="${getIconUrl(service)}" alt="" loading="lazy" referrerpolicy="no-referrer" onerror="this.outerHTML='<span class=fallback-glyph>${service.name[0]}</span>'"/>
            <div class="catalog-card__text">
              <strong class="catalog-card__title">${service.name}</strong>
              <small class="catalog-card__status${added ? ' is-added' : ''}">${added ? '✓ En tu suite (clic para quitar)' : '+ Agregar a suite'}</small>
            </div>
          `;
          card.addEventListener('click', () => {
            const list = getSavedShortcuts();
            if (list.some(s => s.id === service.id)) {
              saveShortcuts(list.filter(s => s.id !== service.id));
              showToast(`${service.name} eliminado de Connection Suite.`);
            } else {
              saveShortcuts([...list, service]);
              showToast(`${service.name} añadido a Connection Suite.`);
            }
          });
          grid.append(card);
        });
      }

      $('openCatalogBtn')?.addEventListener('click', () => $('aviAddDialog').showModal());
      $('closeCatalogModal')?.addEventListener('click', () => $('aviAddDialog').close());

      $('customShortcutForm')?.addEventListener('submit', e => {
        e.preventDefault();
        const name = $('customAppName').value.trim();
        const url = $('customAppUrl').value.trim();
        try {
          const parsed = new URL(url);
          if (parsed.protocol !== 'https:') throw new Error();
          saveShortcuts([...getSavedShortcuts(), { id: 'custom-' + Date.now(), name, url: parsed.href }]);
          e.target.reset();
          showToast(`${name} agregado a Connection Suite.`);
        } catch {
          showToast('Ingresa una dirección web válida que comience con https://');
        }
      });

      // Buscador en tiempo real de Connection Suite
      $('suiteSearchInput')?.addEventListener('input', e => {
        const q = e.target.value.trim().toLowerCase();
        $('suiteSearchClear').hidden = !q;
        renderSuiteGrid(q);
        const quickBox = $('suiteQuickAdd');
        quickBox.replaceChildren();
        if (!q) { quickBox.hidden = true; return; }
        const savedIds = new Set(getSavedShortcuts().map(s => s.id));
        const matches = EXTERNAL_CATALOG.filter(s => !savedIds.has(s.id) && s.name.toLowerCase().includes(q));
        quickBox.hidden = matches.length === 0;
        matches.forEach(m => {
          const b = document.createElement('button');
          b.type = 'button';
          b.className = 'catalog-card';
          b.innerHTML = `<img src="${getIconUrl(m)}" alt=""/><div class="suite-quick-add__text"><strong>${m.name}</strong><small class="suite-quick-add__hint">+ Añadir a la cuadrícula</small></div>`;
          b.addEventListener('click', () => {
            saveShortcuts([...getSavedShortcuts(), m]);
            $('suiteSearchInput').value = '';
            $('suiteSearchClear').hidden = true;
            quickBox.hidden = true;
            renderSuiteGrid('');
            showToast(`${m.name} añadido a Connection Suite.`);
          });
          quickBox.append(b);
        });
      });

      $('suiteSearchClear')?.addEventListener('click', () => {
        $('suiteSearchInput').value = '';
        $('suiteSearchClear').hidden = true;
        $('suiteQuickAdd').hidden = true;
        renderSuiteGrid('');
      });

      /* ----------------------------------------------------------------------
         J. VISTA 3: CONNECTION FILES (GESTOR DE ARCHIVOS EN INDEXEDDB)
         ---------------------------------------------------------------------- */
      let filesDb = null;
      let currentFolderId = 'root';
      let isListView = false;
      let activeFileTab = 'mine';

      function initFilesDB() {
        return new Promise((resolve, reject) => {
          const req = indexedDB.open('AVIConnectionWorkspace_v91', 1);
          req.onupgradeneeded = () => {
            if (!req.result.objectStoreNames.contains('items')) {
              req.result.createObjectStore('items', { keyPath: 'id' });
            }
          };
          req.onsuccess = () => { filesDb = req.result; resolve(filesDb); };
          req.onerror = () => reject(req.error);
        });
      }

      function getAllWorkspaceItems() {
        return new Promise((resolve, reject) => {
          if (!filesDb) return resolve([]);
          const tx = filesDb.transaction('items', 'readonly');
          const req = tx.objectStore('items').getAll();
          req.onsuccess = () => resolve(req.result || []);
          req.onerror = () => reject(req.error);
        });
      }

      function putWorkspaceItem(item) {
        return new Promise((resolve, reject) => {
          const tx = filesDb.transaction('items', 'readwrite');
          tx.objectStore('items').put(item);
          tx.oncomplete = () => resolve();
          tx.onerror = () => reject(tx.error);
        });
      }

      function deleteWorkspaceItem(id) {
        return new Promise((resolve, reject) => {
          const tx = filesDb.transaction('items', 'readwrite');
          tx.objectStore('items').delete(id);
          tx.oncomplete = () => resolve();
          tx.onerror = () => reject(tx.error);
        });
      }

      async function renderWorkspaceFiles() {
        const grid = $('filesGrid'), crumbs = $('fileBreadcrumbs'), status = $('filesStatusText');
        if (!grid) return;
        grid.classList.toggle('is-list', isListView);
        grid.replaceChildren();

        if (activeFileTab === 'orders') {
          status.textContent = 'Módulo de pedidos del ecosistema';
          grid.innerHTML = '<div class="glass-panel files-empty-orders"><h3>Sin pedidos activos</h3><p>Tus órdenes de PIXAVI y AVI SHOP aparecerán aquí cuando vincules una compra.</p></div>';
          return;
        }

        const all = await getAllWorkspaceItems();
        const q = ($('fileSearchInput')?.value || '').toLowerCase().trim();

        // Breadcrumbs
        crumbs.replaceChildren();
        const rootBtn = document.createElement('button');
        rootBtn.type = 'button';
        rootBtn.className = 'btn-ghost';
        rootBtn.style.cssText = 'min-height:28px; padding:3px 10px; font-size:11.5px;';
        rootBtn.textContent = 'Mi unidad';
        rootBtn.addEventListener('click', () => { currentFolderId = 'root'; renderWorkspaceFiles(); });
        crumbs.append(rootBtn);

        if (currentFolderId !== 'root') {
          const folder = all.find(x => x.id === currentFolderId);
          if (folder) {
            const sep = document.createElement('span');
            sep.textContent = ' / ' + folder.name;
            crumbs.append(sep);
          }
        }

        let visible = all.filter(x => {
          if (q) return x.name.toLowerCase().includes(q);
          if (activeFileTab === 'recent') return true;
          return x.parent === currentFolderId;
        });

        visible.sort((a, b) => (a.kind === 'folder' ? -1 : 1) - (b.kind === 'folder' ? -1 : 1) || (b.created - a.created));
        status.textContent = `${visible.length} elemento(s) guardados localmente en IndexedDB.`;

        if (!visible.length) {
          grid.innerHTML = '<div class="files-empty-folder"><strong>Carpeta vacía</strong><p>Crea una carpeta o arrastra archivos desde tu equipo.</p></div>';
          return;
        }

        visible.forEach(item => {
          const card = document.createElement('article');
          card.className = 'file-card';
          const sizeStr = item.kind === 'folder' ? 'Carpeta' : `${Math.max(1, Math.round((item.size || 0) / 1024))} KB`;
          card.innerHTML = `
            <div class="file-card__icon">${item.kind === 'folder' ? '📁' : '📄'}</div>
            <div class="file-card__meta">
              <strong class="file-card__name">${item.name}</strong>
              <small class="file-card__size">${sizeStr}</small>
            </div>
          `;
          const actions = document.createElement('div');
          actions.className = 'file-actions';

          if (item.kind === 'folder') {
            const openB = document.createElement('button');
            openB.type = 'button';
            openB.textContent = 'Abrir';
            openB.addEventListener('click', () => { currentFolderId = item.id; renderWorkspaceFiles(); });
            actions.append(openB);
          } else if (item.blob) {
            const dlB = document.createElement('button');
            dlB.type = 'button';
            dlB.textContent = 'Descargar';
            dlB.addEventListener('click', () => {
              const url = URL.createObjectURL(item.blob);
              const a = document.createElement('a');
              a.href = url;
              a.download = item.name;
              a.click();
              setTimeout(() => URL.revokeObjectURL(url), 5000);
            });
            actions.append(dlB);
          }

          const delB = document.createElement('button');
          delB.type = 'button';
          delB.textContent = 'Eliminar';
          delB.addEventListener('click', async () => {
            await deleteWorkspaceItem(item.id);
            renderWorkspaceFiles();
            showToast(`"${item.name}" eliminado.`);
          });
          actions.append(delB);

          card.append(actions);
          grid.append(card);
        });
      }

      $$('[data-file-tab]').forEach(btn => {
        btn.addEventListener('click', () => {
          $$('[data-file-tab]').forEach(b => b.classList.toggle('is-current', b === btn));
          activeFileTab = btn.dataset.fileTab;
          renderWorkspaceFiles();
        });
      });

      $('createFolderBtn')?.addEventListener('click', async () => {
        const folderName = 'Carpeta ' + new Date().toLocaleTimeString('es-PE', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
        await putWorkspaceItem({
          id: 'folder-' + Date.now(),
          kind: 'folder',
          parent: currentFolderId,
          name: folderName,
          created: Date.now()
        });
        renderWorkspaceFiles();
        showToast(`"${folderName}" creada.`);
      });

      async function handleFileUpload(fileList) {
        const files = Array.from(fileList || []);
        if (!files.length) return;
        for (const f of files) {
          await putWorkspaceItem({
            id: 'file-' + Date.now() + '-' + Math.random().toString(36).slice(2),
            kind: 'file',
            parent: currentFolderId,
            name: f.name,
            size: f.size,
            type: f.type,
            created: Date.now(),
            blob: f
          });
        }
        renderWorkspaceFiles();
        showToast(`${files.length} archivo(s) guardados en Connection Files.`);
      }

      $('uploadFileBtn')?.addEventListener('click', () => $('hiddenFileInput')?.click());
      $('hiddenFileInput')?.addEventListener('change', e => { handleFileUpload(e.target.files); e.target.value = ''; });
      $('fileSearchInput')?.addEventListener('input', renderWorkspaceFiles);
      $('toggleFileViewBtn')?.addEventListener('click', () => { isListView = !isListView; renderWorkspaceFiles(); });

      const dropzone = $('filesDropzone');
      dropzone?.addEventListener('dragover', e => { e.preventDefault(); dropzone.classList.add('is-dragging'); });
      dropzone?.addEventListener('dragleave', () => dropzone.classList.remove('is-dragging'));
      dropzone?.addEventListener('drop', e => {
        e.preventDefault();
        dropzone.classList.remove('is-dragging');
        handleFileUpload(e.dataTransfer.files);
      });

      /* ----------------------------------------------------------------------
         K. BUSCADOR WEB INTEGRADO (WIKIPEDIA API) Y PALETA DE COMANDOS (CTRL+K)
         ---------------------------------------------------------------------- */
      $('closeWebModal')?.addEventListener('click', () => $('aviWebDialog').close());
      $('webReaderBackBtn')?.addEventListener('click', () => { $('webReaderBox').hidden = true; });

      $('webSearchForm')?.addEventListener('submit', async e => {
        e.preventDefault();
        const q = $('webSearchInput').value.trim();
        if (!q) return;
        const grid = $('webResultsGrid');
        $('webReaderBox').hidden = true;
        grid.innerHTML = '<p class="web-search-state">Consultando artículos abiertos en Wikipedia…</p>';
        try {
          const url = `https://es.wikipedia.org/w/api.php?action=query&list=search&srsearch=${encodeURIComponent(q)}&srlimit=9&format=json&origin=*`;
          const res = await fetch(url);
          const data = await res.json();
          const hits = data?.query?.search || [];
          grid.replaceChildren();
          if (!hits.length) {
            grid.innerHTML = '<p class="web-search-state">No se encontraron artículos para esta búsqueda.</p>';
            return;
          }
          hits.forEach(h => {
            const card = document.createElement('button');
            card.type = 'button';
            card.className = 'glass-panel';
            card.style.cssText = 'text-align:left; display:flex; flex-direction:column; gap:8px;';
            const cleanSnippet = (h.snippet || '').replace(/<[^>]*>/g, '');
            card.innerHTML = `<span class="kicker">WIKIPEDIA ES</span><strong class="web-result__title">${h.title}</strong><p class="web-result__snippet">${cleanSnippet}…</p><span class="web-result__link">Leer artículo aquí ↗</span>`;
            card.addEventListener('click', async () => {
              $('webReaderBox').hidden = false;
              $('webReaderTitle').textContent = h.title;
              $('webReaderExtract').textContent = 'Cargando artículo completo…';
              const detailUrl = `https://es.wikipedia.org/w/api.php?action=query&pageids=${h.pageid}&prop=extracts&exintro=1&explaintext=1&format=json&origin=*`;
              const dRes = await fetch(detailUrl);
              const dJson = await dRes.json();
              $('webReaderExtract').textContent = dJson?.query?.pages?.[h.pageid]?.extract || cleanSnippet;
            });
            grid.append(card);
          });
        } catch {
          grid.innerHTML = '<p class="web-search-state">Error de red al consultar Wikipedia.</p>';
        }
      });

      // Paleta de Comandos (Ctrl+K)
      const COMMAND_ITEMS = [
        { label: 'Ir a Inicio (Portada Editorial)', tag: 'Sección', run: () => switchView('inicio') },
        { label: 'Abrir Connection Suite (Aplicaciones)', tag: 'Sección', run: () => switchView('suite') },
        { label: 'Abrir Connection Files (Mis Archivos)', tag: 'Sección', run: () => switchView('proyectos') },
        { label: 'Abrir Buscador Web Integrado', tag: 'Herramienta', run: () => $('aviWebDialog').showModal() },
        { label: 'Hablar con Asistente AVI', tag: 'Asistente', run: () => toggleDrawer('avi9Agent', true) },
        { label: 'Personalizar Tema y Apariencia', tag: 'Configuración', run: () => toggleDrawer('settingsLayer', true) },
        ...OFFICIAL_APPS.map(a => ({ label: `Plataforma: ${a.name} — ${a.tag}`, tag: 'Ecosistema', run: () => openAppPreview(a.id) })),
        ...THEMES.map(t => ({ label: `Aplicar Tema: ${t.name}`, tag: 'Tema Visual', run: () => { prefs.theme = t.id; prefs.autoTheme = false; savePrefs(); showToast(`Tema ${t.name} aplicado.`); } }))
      ];

      function renderCommandPalette(q = '') {
        const list = $('commandList');
        if (!list) return;
        const clean = q.toLowerCase().trim();
        list.replaceChildren();
        COMMAND_ITEMS.filter(x => !clean || x.label.toLowerCase().includes(clean) || x.tag.toLowerCase().includes(clean)).forEach(item => {
          const b = document.createElement('button');
          b.type = 'button';
          b.className = 'challenge-btn';
          b.style.padding = '12px 14px';
          b.innerHTML = `<span class="kicker">${item.tag}</span><strong class="command-list__label">${item.label}</strong><span class="command-list__enter">↵</span>`;
          b.addEventListener('click', () => {
            $('commandDialog').close();
            item.run();
          });
          list.append(b);
        });
      }

      function openCommandPalette() {
        $('commandInput').value = '';
        renderCommandPalette('');
        $('commandDialog').showModal();
        $('commandInput').focus();
      }

      $('topSearchBtn')?.addEventListener('click', openCommandPalette);
      $('heroCmdBtn')?.addEventListener('click', openCommandPalette);
      $('closeCommandModal')?.addEventListener('click', () => $('commandDialog').close());
      $('commandInput')?.addEventListener('input', e => renderCommandPalette(e.target.value));

      document.addEventListener('keydown', e => {
        if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
          e.preventDefault();
          openCommandPalette();
        }
      });

      /* ----------------------------------------------------------------------
         L. ASISTENTE AVI (#avi9Agent) Y PANEL DE CONFIGURACIÓN
         ---------------------------------------------------------------------- */
      function appendAgentMsg(text, isUser = false) {
        const box = $('agentMessages');
        if (!box) return;
        const msg = document.createElement('div');
        msg.style.cssText = isUser
          ? 'align-self:flex-end; background:var(--accent); color:#130b22; font-weight:600; padding:11px 14px; border-radius:14px; font-size:13px; max-width:85%;'
          : 'align-self:flex-start; background:rgba(255,255,255,0.06); padding:12px 15px; border-radius:14px; font-size:13.5px; line-height:1.55; max-width:88%;';
        msg.textContent = text;
        box.append(msg);
        box.scrollTop = box.scrollHeight;
      }

      function processAgentQuery(raw) {
        const q = raw.toLowerCase();
        appendAgentMsg(raw, true);

        if (q.includes('suite') || q.includes('app')) {
          switchView('suite');
          appendAgentMsg('He abierto CONNECTION SUITE. Desde aquí puedes lanzar las aplicaciones oficiales o añadir servicios del catálogo.');
        } else if (q.includes('archivo') || q.includes('file') || q.includes('carpeta')) {
          switchView('proyectos');
          appendAgentMsg('Abriendo CONNECTION FILES. Tus carpetas y archivos se guardan localmente en IndexedDB.');
        } else if (q.includes('aurora') || q.includes('solar') || q.includes('obsidiana') || q.includes('original')) {
          const found = THEMES.find(t => q.includes(t.name.toLowerCase()));
          if (found) {
            prefs.theme = found.id;
            prefs.autoTheme = false;
            savePrefs();
            appendAgentMsg(`Listo, he aplicado el tema visual ${found.name}.`);
          }
        } else if (q.includes('clima') || q.includes('cusco') || q.includes('lima')) {
          updateWeather();
          appendAgentMsg(`El clima actual configurado para ${prefs.wxCity} es ${$('wxWidgetTemp').textContent}. Puedes cambiar de ciudad en Configuración.`);
        } else if (q.includes('buscar') || q.includes('wiki')) {
          toggleDrawer('avi9Agent', false);
          $('aviWebDialog').showModal();
          appendAgentMsg('Abriendo el buscador web integrado.');
        } else {
          appendAgentMsg('Puedo ayudarte a navegar por Inicio, Connection Suite, Connection Files, cambiar entre los 13 temas visuales o abrir el Buscador Web.');
        }
      }

      $('agentForm')?.addEventListener('submit', e => {
        e.preventDefault();
        const val = $('agentInput').value.trim();
        if (!val) return;
        $('agentInput').value = '';
        processAgentQuery(val);
      });

      $$('[data-agent-chip]').forEach(btn => {
        btn.addEventListener('click', () => processAgentQuery(btn.dataset.agentChip));
      });

      // Inicializar Galería de Temas y Controles de Configuración
      const themeGrid = $('settingsThemeGrid');
      THEMES.forEach(th => {
        const b = document.createElement('button');
        b.type = 'button';
        b.className = 'theme-btn';
        b.dataset.theme = th.id;
        b.innerHTML = `<span class="theme-swatch" data-theme-swatch></span><strong class="theme-btn__name">${th.name}</strong>`;
        const swatch = b.querySelector('[data-theme-swatch]');
        swatch.style.setProperty('--theme-swatch-start', th.a);
        swatch.style.setProperty('--theme-swatch-end', th.accent);
        b.addEventListener('click', () => {
          prefs.theme = th.id;
          prefs.autoTheme = false;
          savePrefs();
          showToast(`Tema ${th.name} activado.`);
        });
        themeGrid?.append(b);
      });

      $('prefAutoTheme')?.addEventListener('change', e => { prefs.autoTheme = e.target.checked; savePrefs(); });
      $('prefWxCity')?.addEventListener('change', e => { prefs.wxCity = e.target.value; savePrefs(); updateWeather(); });
      $('prefWxSim')?.addEventListener('change', e => { prefs.wxSim = e.target.value; savePrefs(); updateWeather(); });
      $('prefParticleStyle')?.addEventListener('change', e => { prefs.particleStyle = e.target.value; savePrefs(); });
      $('prefParticleDensity')?.addEventListener('input', e => { prefs.particleDensity = Number(e.target.value); savePrefs(); resizeParticles(); });
      $('prefFont')?.addEventListener('change', e => { prefs.font = e.target.value; savePrefs(); });
      $('prefSideStyle')?.addEventListener('change', e => { prefs.sideStyle = e.target.value; savePrefs(); });
      $('prefPanelOpacity')?.addEventListener('input', e => { prefs.panelOpacity = Number(e.target.value); savePrefs(); });
      $('prefTextScale')?.addEventListener('input', e => { prefs.textScale = Number(e.target.value); savePrefs(); });
      $('prefHighContrast')?.addEventListener('change', e => { prefs.highContrast = e.target.checked; savePrefs(); });
      $('prefReducedMotion')?.addEventListener('change', e => { prefs.reducedMotion = e.target.checked; savePrefs(); });

      $('prefUserName')?.addEventListener('input', e => { prefs.userName = e.target.value; savePrefs(); });
      $('prefCustomAccent')?.addEventListener('input', e => { prefs.customAccent = e.target.value; savePrefs(); });
      $('prefCustomAccentClear')?.addEventListener('click', () => { prefs.customAccent = ''; savePrefs(); });
      $('prefAvatarUrl')?.addEventListener('input', e => { prefs.avatarUrl = e.target.value; savePrefs(); });
      $('prefShowNews')?.addEventListener('change', e => { prefs.showNews = e.target.checked; savePrefs(); });
      $('prefShowGoals')?.addEventListener('change', e => { prefs.showGoals = e.target.checked; savePrefs(); });
      $('prefShowFuture')?.addEventListener('change', e => { prefs.showFuture = e.target.checked; savePrefs(); });
      $('prefShowIdeas')?.addEventListener('change', e => { prefs.showIdeas = e.target.checked; savePrefs(); });
      $('prefShowInsights')?.addEventListener('change', e => { prefs.showInsights = e.target.checked; savePrefs(); });

      // Subida de Fondo Multimedia Personalizado
      const mediaLayer = $('customMediaLayer'), cImg = $('customImage'), cVid = $('customVideo'), cEmb = $('customEmbed');
      function clearCustomBackground() {
        cVid.pause();
        cVid.removeAttribute('src');
        cImg.removeAttribute('src');
        cEmb.src = 'about:blank';
        cImg.hidden = cVid.hidden = cEmb.hidden = true;
        mediaLayer.classList.remove('is-visible');
      }

      $('bgUploadTrigger')?.addEventListener('click', () => $('bgFileInput')?.click());
      $('bgResetTrigger')?.addEventListener('click', () => {
        clearCustomBackground();
        showToast('Fondo espacial original restaurado.');
      });

      $('bgFileInput')?.addEventListener('change', e => {
        const file = e.target.files?.[0];
        if (!file) return;
        clearCustomBackground();
        const url = URL.createObjectURL(file);
        if (file.type.startsWith('video/')) {
          cVid.src = url;
          cVid.hidden = false;
          cVid.play().catch(() => { });
        } else {
          cImg.src = url;
          cImg.hidden = false;
        }
        mediaLayer.classList.add('is-visible');
        showToast('Fondo personalizado aplicado.');
      });

      $('bgUrlApply')?.addEventListener('click', () => {
        const raw = $('bgUrlInput').value.trim();
        if (!raw) return;
        clearCustomBackground();
        try {
          const u = new URL(raw);
          const ytMatch = u.searchParams.get('v') || (u.hostname === 'youtu.be' ? u.pathname.slice(1) : '');
          if (ytMatch && /^[a-zA-Z0-9_-]{11}$/.test(ytMatch)) {
            cEmb.src = `https://www.youtube.com/embed/${ytMatch}?autoplay=1&mute=1&controls=0&loop=1&playlist=${ytMatch}`;
            cEmb.hidden = false;
            mediaLayer.classList.add('is-visible');
            showToast('Fondo de YouTube aplicado.');
          } else {
            cVid.src = u.href;
            cVid.hidden = false;
            cVid.play().catch(() => { });
            mediaLayer.classList.add('is-visible');
            showToast('Video de fondo por URL aplicado.');
          }
        } catch {
          showToast('Ingresa una URL válida.');
        }
      });

      /* ----------------------------------------------------------------------
         M. ARRANQUE INICIAL Y LÓGICA DE NUEVOS WIDGETS
         ---------------------------------------------------------------------- */

      // -- Reloj Pomodoro --
      let pomoInterval = null;
      let pomoTimeLeft = 1500; // 25 minutos
      let pomoIsRunning = false;

      function updatePomoDisplay() {
        const m = Math.floor(pomoTimeLeft / 60).toString().padStart(2, '0');
        const s = (pomoTimeLeft % 60).toString().padStart(2, '0');
        $('pomodoroDisplay').textContent = `${m}:${s}`;
      }

      $('pomoToggleBtn')?.addEventListener('click', () => {
        const btn = $('pomoToggleBtn');
        if (pomoIsRunning) {
          clearInterval(pomoInterval);
          pomoIsRunning = false;
          btn.textContent = 'Reanudar';
          btn.classList.replace('btn-primary', 'btn-ghost');
        } else {
          pomoIsRunning = true;
          btn.textContent = 'Pausar';
          btn.classList.replace('btn-ghost', 'btn-primary');
          pomoInterval = setInterval(() => {
            if (pomoTimeLeft > 0) {
              pomoTimeLeft--;
              updatePomoDisplay();
            } else {
              clearInterval(pomoInterval);
              pomoIsRunning = false;
              btn.textContent = 'Iniciar';
              showToast('¡Sesión de enfoque completada! Tómate un descanso.');
            }
          }, 1000);
        }
      });

      $('pomoResetBtn')?.addEventListener('click', () => {
        clearInterval(pomoInterval);
        pomoIsRunning = false;
        pomoTimeLeft = 1500;
        updatePomoDisplay();
        const btn = $('pomoToggleBtn');
        btn.textContent = 'Iniciar';
        btn.classList.replace('btn-ghost', 'btn-primary');
      });

      // -- Bloc de Notas --
      const notepad = $('aviNotepad');
      if (notepad) {
        notepad.value = localStorage.getItem('avi-connection-notepad') || '';
        notepad.addEventListener('input', (e) => {
          localStorage.setItem('avi-connection-notepad', e.target.value);
          const status = $('notepadStatus');
          status.textContent = 'Guardando...';
          clearTimeout(notepad.timer);
          notepad.timer = setTimeout(() => { status.textContent = 'Guardado local'; }, 800);
        });
      }

      // -- Sonidos Ambientales (Web Audio API nativa sin audios externos) --
      let audioCtx = null;
      let activeSoundNode = null;

      function playAmbientSound(type) {
        if (!audioCtx) {
          audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        }
        if (activeSoundNode) {
          activeSoundNode.stop();
          activeSoundNode.disconnect();
          activeSoundNode = null;
        }

        $$('.ambient-btn').forEach(b => b.style.borderColor = 'transparent');
        const activeBtn = document.querySelector(`.ambient-btn[data-sound="${type}"]`);
        if (activeBtn) activeBtn.style.borderColor = 'var(--accent)';

        if (type === 'stop') return;

        // Generar ruido procedural
        const bufferSize = audioCtx.sampleRate * 2;
        const buffer = audioCtx.createBuffer(1, bufferSize, audioCtx.sampleRate);
        const data = buffer.getChannelData(0);
        for (let i = 0; i < bufferSize; i++) {
          data[i] = Math.random() * 2 - 1;
        }

        const noiseSource = audioCtx.createBufferSource();
        noiseSource.buffer = buffer;
        noiseSource.loop = true;

        const filter = audioCtx.createBiquadFilter();
        if (type === 'rain') {
          filter.type = 'lowpass';
          filter.frequency.value = 800; // Filtrar agudos para simular agua
        } else if (type === 'waves') {
          filter.type = 'bandpass';
          filter.frequency.value = 400;
        } else if (type === 'white') {
          filter.type = 'lowpass';
          filter.frequency.value = 3500;
        }

        const gainNode = audioCtx.createGain();
        gainNode.gain.value = 0.08; // Volumen suave

        noiseSource.connect(filter);
        filter.connect(gainNode);
        gainNode.connect(audioCtx.destination);
        noiseSource.start();
        activeSoundNode = noiseSource;
      }

      $$('.ambient-btn').forEach(btn => {
        btn.addEventListener('click', () => {
          const type = btn.dataset.sound;
          playAmbientSound(type);
          if (type !== 'stop') showToast('Reproduciendo atmósfera interactiva.');
        });
      });

      // Arranque general
      applyPrefs();
      updateWeather();
      renderRecent();
      fetchLiveNews();
      renderIdeas();
      renderSuiteGrid('');
      renderCatalogModal();
      initFilesDB().then(renderWorkspaceFiles).catch(() => { });

      if (window.location.hash === '#suite') {
        switchView('suite');
      }
    })();
