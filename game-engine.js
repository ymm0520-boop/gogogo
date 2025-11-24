/* --- START OF FILE game-engine.js --- */

class GameEngine {
    constructor() {
        this.state = {
            unlockEntryMethod: null, // 'destination' (先找到目的地) or 'ship' (先找到船)
            discoveredPages: new Set(['/official_draft']),
            historyStack: [], // 导航历史栈
            currentAct: 'act1',
            currentPageId: null
        };
    }

    // 初始化游戏
    init() {
        this.renderAllPages();
        this.initGlobalListeners();
        this.navigateTo('/official_draft', false); // 初始加载不记入历史栈
        console.log('航海冒险游戏初始化完成 - v2.1 Logic Fix');
    }

    // 渲染所有页面结构
    renderAllPages() {
        const app = document.getElementById('app');
        let html = '';

        Object.keys(STORY_DATA).forEach(act => {
            Object.entries(STORY_DATA[act]).forEach(([pageId, pageData]) => {
                html += this.createPageLayout(pageId, pageData);
            });
        });

        app.innerHTML = html;
        this.updateAllSidebars();
    }

    // 创建单页布局
    createPageLayout(pageId, pageData) {
        return `
            <div id="${pageId}" class="page page-wrapper">
                <!-- 左侧卷轴内容区 -->
                <div class="content-area">
                    <button class="back-btn" onclick="game.goBack()">← 返回上一页</button>
                    <div class="title">${pageData.title}</div>
                    <div class="story-body">
                        ${pageData.content}
                    </div>
                </div>

                <!-- 右侧功能侧边栏 -->
                <div class="sidebar" id="sidebar-${pageId.replace('/', '')}">
                    <!-- 内容由 updateSidebar() 动态填充 -->
                </div>
            </div>
        `;
    }

    // 生成侧边栏HTML
    getSidebarHTML(pageId) {
        const inputId = `searchInput_${pageId.replace('/', '')}`;
        
        let listHTML = '';
        Object.keys(PAGE_TITLES).forEach(key => {
            if (this.state.discoveredPages.has(key) && key !== '/list') {
                const isCurrent = key === pageId ? 'current' : '';
                const title = PAGE_TITLES[key];
                listHTML += `<div class="page-link ${isCurrent}" onclick="game.navigateTo('${key}')">⚓ ${title}</div>`;
            }
        });

        return `
            <div class="search-container">
                <div class="sidebar-title">线索搜寻</div>
                <input type="text" id="${inputId}" placeholder="输入关键词..." onkeypress="game.handleEnter(event, '${pageId}', '${inputId}')">
                <button class="search-btn" onclick="game.handleSearch('${pageId}', '${inputId}')">搜索</button>
            </div>

            <div class="discovered-list-container">
                <div class="sidebar-title">航海日志 (已发现)</div>
                <div class="nav-list">
                    ${listHTML}
                </div>
            </div>
        `;
    }

    // 更新所有页面的侧边栏
    updateAllSidebars() {
        Object.keys(STORY_DATA).forEach(act => {
            Object.keys(STORY_DATA[act]).forEach(pageId => {
                const sidebarId = `sidebar-${pageId.replace('/', '')}`;
                const sidebarEl = document.getElementById(sidebarId);
                if (sidebarEl) {
                    sidebarEl.innerHTML = this.getSidebarHTML(pageId);
                }
            });
        });
    }

    // 导航跳转
    navigateTo(pageId, addToHistory = true) {
        if (this.state.currentPageId === pageId) return;

        // 隐藏当前页
        const currentEl = document.querySelector('.page.active');
        if (currentEl) currentEl.classList.remove('active');

        // 记录历史
        if (addToHistory && this.state.currentPageId) {
            this.state.historyStack.push(this.state.currentPageId);
        }

        // 显示新页
        const targetEl = document.getElementById(pageId);
        if (targetEl) {
            targetEl.classList.add('active');
            this.state.discoveredPages.add(pageId);
            this.state.currentPageId = pageId;
            
            // 更新UI状态
            this.updateBackButtonState(targetEl);
            this.updateAllSidebars(); 
            this.setSearchPlaceholder(pageId); // 设置侧边栏 placeholder
            
            // 【关键修复】如果是解锁页，专门更新正文区域的输入框 UI
            if (pageId === '/unlock_destination') {
                this.updateUnlockPageUI();
            }

            // 滚动到顶部
            const contentArea = targetEl.querySelector('.content-area');
            if(contentArea) contentArea.scrollTop = 0;
        }
    }

    // 【新增】更新解锁页面的UI逻辑
    updateUnlockPageUI() {
        const unlockInput = document.getElementById('unlockInput');
        if (!unlockInput) return;

        // 清空之前可能输入的内容
        unlockInput.value = '';

        if (this.state.unlockEntryMethod === 'destination') {
            // 用户已经搜到了目的地，现在需要搜船名
            unlockInput.placeholder = "输入找到即将乘坐的舰名";
        } else if (this.state.unlockEntryMethod === 'ship') {
            // 用户已经搜到了船名，现在需要搜目的地
            unlockInput.placeholder = "输入找到的目的地";
        } else {
            // 异常情况或直接跳转
            unlockInput.placeholder = "请输入缺失的线索";
        }
    }

    // 返回上一页
    goBack() {
        if (this.state.historyStack.length > 0) {
            const prevPage = this.state.historyStack.pop();
            this.navigateTo(prevPage, false);
        }
    }

    updateBackButtonState(pageEl) {
        const btn = pageEl.querySelector('.back-btn');
        if (!btn) return;
        if (this.state.historyStack.length === 0) {
            btn.classList.add('hidden');
        } else {
            btn.classList.remove('hidden');
            const prevId = this.state.historyStack[this.state.historyStack.length - 1];
            btn.innerHTML = `← 返回: ${PAGE_TITLES[prevId] || '上一页'}`;
        }
    }

    handleEnter(event, pageId, inputId) {
        if (event.key === 'Enter') {
            this.handleSearch(pageId, inputId);
        }
    }

    // 搜索逻辑
    handleSearch(currentPage, inputId) {
        const input = document.getElementById(inputId);
        if (!input) return;

        const keyword = input.value.trim().toLowerCase();
        if (!keyword) return;

        if (keyword === 'list') {
            alert('所有已发现的页面都在右侧栏显示了。');
            input.value = '';
            return;
        }

        const ruleSet = ROUTES.find(r => r.page === currentPage);
        let targetPage = null;
        let matchedKeyword = null;

        if (ruleSet) {
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
        }

        if (!targetPage) {
            input.style.borderColor = '#ff4444';
            setTimeout(() => input.style.borderColor = '#4a5d73', 500);
            return;
        }

        // 记录进入unlock页面的方式
        if (targetPage === '/unlock_destination') {
            // 注意：这里检查的是“用户输入了什么”来触发的跳转
            if (matchedKeyword === 'western new world land' || matchedKeyword === 'wnwl') {
                this.state.unlockEntryMethod = 'destination'; // 意味着他找到了目的地，缺船名
            } else if (matchedKeyword === '黑曜石号' || matchedKeyword === '黑曜石' || matchedKeyword === 'obsidian') {
                this.state.unlockEntryMethod = 'ship'; // 意味着他找到了船名，缺目的地
            }
        }

        input.value = ''; 
        this.navigateTo(targetPage);
    }

    setSearchPlaceholder(pageId) {
        // 这个方法现在只控制右侧边栏的 placeholder，不再控制正文输入框
        const inputId = `searchInput_${pageId.replace('/', '')}`;
        const input = document.getElementById(inputId);
        if (!input) return;

        if (pageId === '/royal_navy') {
            input.placeholder = "寻找舰船名称...";
        } else {
            input.placeholder = "输入关键词以探索...";
        }
    }

    // 【核心修复】解锁按钮逻辑
    handleUnlock() {
        const input = document.getElementById('unlockInput');
        if (!input) return;
        const answer = input.value.trim().toLowerCase();
        
        let isCorrect = false;

        // 逻辑：互斥检查
        if (this.state.unlockEntryMethod === 'destination') {
            // 状态是“已找到目的地”，所以必须输入船名
            if (answer === '黑曜石号' || answer === 'obsidian') {
                isCorrect = true;
            } else {
                alert("不对。既然你知道了目的地，那我们该坐哪艘船去呢？\n提示：去档案室找找。");
            }
        } else if (this.state.unlockEntryMethod === 'ship') {
            // 状态是“已找到船名”，所以必须输入目的地
            if (answer === 'wnwl' || answer === 'western new world land') {
                isCorrect = true;
            } else {
                alert("不对。既然你知道了船名，那这艘船要开往哪里？\n提示：看看艾登留下的旗语。");
            }
        } else {
            // 容错：如果状态丢失，允许任意一个答案（或阻止）
            if (answer === 'wnwl' || answer === '黑曜石号') {
                isCorrect = true;
            }
        }
        
        if (isCorrect) {
            this.navigateTo('/first_mission_key');
        }
    }

    initGlobalListeners() {
        // 确保 HTML 中的 onclick 能调用到这些方法
        window.game = this; 
        window.handleUnlock = () => this.handleUnlock();
    }
}

// 暴露给全局window对象
window.game = new GameEngine();