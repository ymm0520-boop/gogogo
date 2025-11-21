// 游戏引擎核心类 - 所有功能逻辑在这里
class GameEngine {
    constructor() {
        this.state = {
            unlockEntryMethod: null,
            discoveredPages: new Set(['/official_draft']),
            searchHistories: {},
            currentAct: 'act1'
        };
    }

    // 初始化游戏
    init() {
        this.renderAllPages();
        this.initEventListeners();
        this.navigateTo('/official_draft');
        console.log('航海冒险游戏初始化完成！');
    }

    // 渲染所有页面
    renderAllPages() {
        const app = document.getElementById('app');
        let html = '';

        // 渲染所有幕的页面
        Object.keys(STORY_DATA).forEach(act => {
            Object.entries(STORY_DATA[act]).forEach(([pageId, pageData]) => {
                html += this.createPageHTML(pageId, pageData);
            });
        });

        app.innerHTML = html;
    }

    // 创建页面HTML
    createPageHTML(pageId, pageData) {
        const inputId = `searchInput_${pageId.replace('/', '')}`;
        
        return `
            <div id="${pageId}" class="page page-wrapper">
                <div class="content">
                    <div class="title">${pageData.title}</div>
                    ${pageData.content}
                </div>
                <div class="sidebar">
                    <input type="text" id="${inputId}" placeholder="输入关键词...">
                    <button onclick="game.handleSearch('${pageId}', '${inputId}')">搜索</button>
                    <div class="search-history">
                        <h4>搜索历史</h4>
                        <div id="history_${pageId.replace('/', '')}"></div>
                    </div>
                </div>
            </div>
        `;
    }

    // 搜索处理
    handleSearch(currentPage, inputId) {
        const input = document.getElementById(inputId);
        if (!input) return;

        const keyword = input.value.trim().toLowerCase();
        if (!keyword) return;

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

    // 页面跳转
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

        this.updateListPage();
        this.updateSearchHistories();
    }

    // 更新解锁页面提示
    updateUnlockInstruction() {
        const instructionElement = document.getElementById('unlock-instruction');
        if (!instructionElement) return;
        
        if (this.state.unlockEntryMethod === 'destination') {
            instructionElement.innerHTML = '<p style="color: #c4a46a; margin-bottom: 15px;">你已经找到了目的地，现在需要找到即将乘坐的舰船名称。</p>';
        } else if (this.state.unlockEntryMethod === 'ship') {
            instructionElement.innerHTML = '<p style="color: #c4a46a; margin-bottom: 15px;">你已经找到了舰船名称，现在需要输入完整的目的地。</p>';
        } else {
            instructionElement.innerHTML = '<p style="color: #c4a46a; margin-bottom: 15px;">请输入完整的目的地或舰船名称来继续。</p>';
        }
    }

    // 搜索历史管理
    saveSearchHistory(page, keyword) {
        if (!this.state.searchHistories[page]) {
            this.state.searchHistories[page] = [];
        }
        
        this.state.searchHistories[page] = this.state.searchHistories[page]
            .filter(item => item !== keyword);
        this.state.searchHistories[page].unshift(keyword);
        
        if (this.state.searchHistories[page].length > 10) {
            this.state.searchHistories[page] = this.state.searchHistories[page].slice(0, 10);
        }
    }

    // 更新搜索历史显示
    updateSearchHistories() {
        Object.keys(this.state.searchHistories).forEach(page => {
            const historyElement = document.getElementById(`history_${page.replace('/', '')}`);
            if (historyElement && this.state.searchHistories[page]) {
                historyElement.innerHTML = '';
                this.state.searchHistories[page].forEach(keyword => {
                    const item = document.createElement('div');
                    item.className = 'search-history-item';
                    item.textContent = keyword;
                    historyElement.appendChild(item);
                });
            }
        });
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