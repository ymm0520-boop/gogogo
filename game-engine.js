class GameEngine {
    constructor() {
        this.state = {
            unlockEntryMethod: null,
            discoveredPages: new Set(['/official_draft']),
            searchHistories: {} // 初始化搜索历史
        };
        
        // 初始化所有页面的搜索历史
        this.initializeSearchHistories();
    }

    // 初始化游戏
    init() {
        this.renderAllPages();
        this.initEventListeners();
        this.navigateTo('/official_draft'); // 默认显示第一页
        console.log('游戏引擎初始化完成');
    }

    // 渲染所有页面
    renderAllPages() {
        const app = document.getElementById('app');
        if (!app) {
            console.error('找不到app容器');
            return;
        }

        app.innerHTML = '';

        // 渲染所有页面
        Object.keys(STORY_DATA.act1).forEach(pageId => {
            this.renderPage(app, pageId, STORY_DATA.act1);
        });

        Object.keys(STORY_DATA.act2).forEach(pageId => {
            this.renderPage(app, pageId, STORY_DATA.act2);
        });

        console.log('所有页面渲染完成');
    }

    // 渲染单个页面
    renderPage(container, pageId, storyData) {
        const pageData = storyData[pageId];
        if (!pageData) return;

        const page = document.createElement('div');
        page.className = 'page';
        page.id = pageId;

        const pageContent = `
            <div class="page-wrapper">
                <div class="content">
                    <div class="title">${pageData.title}</div>
                    <div class="story-content">${pageData.content}</div>
                    ${this.renderSearchInput(pageId)}
                </div>
                <div class="sidebar">
                    <div class="search-history" id="history_${pageId.replace('/', '')}"></div>
                </div>
            </div>
        `;

        page.innerHTML = pageContent;
        container.appendChild(page);
    }

    // 渲染搜索输入框
    renderSearchInput(pageId) {
        const inputId = `search_${pageId.replace('/', '')}`;
        return `
            <div style="margin-top: 20px;">
                <input type="text" id="${inputId}" placeholder="输入关键词..." style="width: 100%; padding: 10px; font-size: 16px;">
                <button onclick="game.handleSearch('${pageId}', '${inputId}')" style="width: 100%; padding: 10px; margin-top: 10px;">搜索</button>
            </div>
        `;
    }

    // 新增：初始化所有页面的搜索历史
    initializeSearchHistories() {
        // 为所有已知页面初始化空的搜索历史数组
        Object.keys(PAGE_TITLES).forEach(page => {
            if (!this.state.searchHistories[page]) {
                this.state.searchHistories[page] = [];
            }
        });
    }

    // 搜索处理函数 - 确保保存历史
    handleSearch(currentPage, inputId) {
        const input = document.getElementById(inputId);
        if (!input) return;

        const keyword = input.value.trim().toLowerCase();
        if (!keyword) return;

        // 保存搜索历史
        this.saveSearchHistory(currentPage, keyword);

        const ruleSet = ROUTES.find(r => r.page === currentPage);
        if (!ruleSet) return;

        let targetPage = null;
        let matchedKeyword = null;

        for (const rule of ruleSet.rules) {
            for (const k of rule.keywords) {
                if (keyword.includes(k.toLowerCase())) {
                    targetPage = rule.target;
                    matchedKeyword = k.toLowerCase();
                    break;
                }
            }
            if (targetPage) break;
        }

        if (!targetPage) {
            alert('没有找到匹配的页面，请尝试其他关键词。');
            return;
        }

        // 记录进入unlock页面的方式
        if (targetPage === '/unlock_destination') {
            if (matchedKeyword === 'western new world land') {
                this.state.unlockEntryMethod = 'destination';
            } else if (matchedKeyword === '黑曜石号') {
                this.state.unlockEntryMethod = 'ship';
            }
        }

        this.state.discoveredPages.add(targetPage);
        input.value = '';
        this.navigateTo(targetPage);
    }

    // 页面跳转函数 - 确保更新搜索历史显示
    navigateTo(pageId) {
        document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
        
        const target = document.getElementById(pageId);
        if (target) {
            target.classList.add('active');
            this.state.discoveredPages.add(pageId);
            
            const searchInput = target.querySelector('input[type="text"]');
            if (searchInput) {
                // 设置placeholder逻辑
                if (pageId === '/unlock_destination') {
                    if (this.state.unlockEntryMethod === 'destination') {
                        searchInput.placeholder = "输入找到即将乘坐的舰名";
                    } else if (this.state.unlockEntryMethod === 'ship') {
                        searchInput.placeholder = "输入找到的目的地";
                    } else {
                        searchInput.placeholder = "输入关键词...";
                    }
                } else if (pageId === '/royal_navy') {
                    searchInput.placeholder = "输入找到即将乘坐的舰名";
                } else {
                    searchInput.placeholder = "输入关键词...";
                }
                
                searchInput.value = '';
                searchInput.focus();
            }

            // 更新解锁页面的提示文字
            if (pageId === '/unlock_destination') {
                this.updateUnlockInstruction();
            }
        }

        // 确保新页面有搜索历史数组
        if (!this.state.searchHistories[pageId]) {
            this.state.searchHistories[pageId] = [];
        }

        // 关键：每次跳转都更新搜索历史显示
        this.updateSearchHistories();
        this.updateListPage();
    }

    // 搜索历史管理 - 修复保存逻辑
    saveSearchHistory(page, keyword) {
        // 确保页面有搜索历史数组
        if (!this.state.searchHistories[page]) {
            this.state.searchHistories[page] = [];
        }
        
        // 移除重复的关键词（如果已存在）
        this.state.searchHistories[page] = this.state.searchHistories[page]
            .filter(item => item !== keyword);
        
        // 将新关键词添加到开头
        this.state.searchHistories[page].unshift(keyword);
        
        // 限制历史记录数量
        if (this.state.searchHistories[page].length > 10) {
            this.state.searchHistories[page] = this.state.searchHistories[page].slice(0, 10);
        }
        
        console.log(`搜索历史更新 - 页面: ${page}, 关键词: ${keyword}`);
    }

    // 更新搜索历史显示 - 修复显示逻辑
    updateSearchHistories() {
        // 获取当前活动页面
        const activePage = document.querySelector('.page.active');
        if (!activePage) return;
        
        const currentPageId = activePage.id;
        const historyElement = activePage.querySelector('.search-history');
        
        if (historyElement && this.state.searchHistories[currentPageId]) {
            historyElement.innerHTML = '';
            
            if (this.state.searchHistories[currentPageId].length === 0) {
                // 如果没有搜索历史，显示提示
                const emptyMsg = document.createElement('div');
                emptyMsg.className = 'search-history-item';
                emptyMsg.textContent = '暂无搜索历史';
                emptyMsg.style.color = '#888';
                emptyMsg.style.fontStyle = 'italic';
                historyElement.appendChild(emptyMsg);
            } else {
                // 显示搜索历史
                this.state.searchHistories[currentPageId].forEach(keyword => {
                    const item = document.createElement('div');
                    item.className = 'search-history-item';
                    item.textContent = keyword;
                    
                    // 点击历史项可以快速搜索
                    item.style.cursor = 'pointer';
                    item.onclick = () => {
                        const input = activePage.querySelector('input[type="text"]');
                        if (input) {
                            input.value = keyword;
                            this.handleSearch(currentPageId, input.id);
                        }
                    };
                    
                    historyElement.appendChild(item);
                });
            }
        }
    }

    // 更新解锁页面提示
    updateUnlockInstruction() {
        const instructionElement = document.getElementById('unlockInstruction');
        if (instructionElement) {
            if (this.state.unlockEntryMethod === 'destination') {
                instructionElement.textContent = '请搜索你找到的舰船名称';
            } else if (this.state.unlockEntryMethod === 'ship') {
                instructionElement.textContent = '请搜索你找到的目的地';
            } else {
                instructionElement.textContent = '请搜索相关信息';
            }
        }
    }

    // 更新列表页面
    updateListPage() {
        const listPage = document.getElementById('/list');
        if (!listPage) return;
        
        const linksContainer = document.getElementById('allPageLinks');
        if (!linksContainer) return;
        
        linksContainer.innerHTML = '';
        
        const allPages = Object.keys(PAGE_TITLES);
        
        allPages.forEach(page => {
            if (this.state.discoveredPages.has(page)) {
                const link = document.createElement('div');
                link.className = 'page-link';
                link.textContent = PAGE_TITLES[page] || page;
                link.onclick = () => this.navigateTo(page);
                linksContainer.appendChild(link);
            }
        });
    }

    // 解锁功能
    handleUnlock() {
        const input = document.getElementById('unlockInput');
        if (!input) return;
        
        const answer = input.value.trim().toLowerCase();
        
        if (answer === 'wnwl' || answer === 'western new world land' || answer === '黑曜石号') {
            this.navigateTo('/first_mission_key');
        } else {
            alert('答案不正确，请再想想。');
        }
    }

    // 初始化事件监听
    initEventListeners() {
        const searchInputs = document.querySelectorAll('input[type="text"]');
        searchInputs.forEach(input => {
            input.addEventListener('keypress', (event) => {
                if (event.keyCode === 13 || event.key === 'Enter') {
                    const pageWrapper = input.closest('.page');
                    if (pageWrapper) {
                        const currentPage = pageWrapper.id;
                        const inputId = input.id;
                        this.handleSearch(currentPage, inputId);
                    }
                }
            });
        });

        // 全局函数绑定
        window.handleUnlock = () => this.handleUnlock();
        window.navigateTo = (pageId) => this.navigateTo(pageId);
    }

    // 添加新页面（用于后续更新）
    addNewPage(act, pageId, pageData) {
        if (!STORY_DATA[act]) {
            STORY_DATA[act] = {};
        }
        STORY_DATA[act][pageId] = pageData;
        
        // 重新渲染页面
        this.renderAllPages();
        this.initEventListeners();
    }

    // 添加新路由（用于后续更新）
    addNewRoute(routeConfig) {
        ROUTES.push(routeConfig);
    }

    // 添加图片支持（用于后续更新）
    loadImage(imagePath) {
        return new Promise((resolve, reject) => {
            const img = new Image();
            img.onload = () => resolve(img);
            img.onerror = reject;
            img.src = imagePath;
        });
    }
}

// 创建全局游戏实例
const game = new GameEngine();