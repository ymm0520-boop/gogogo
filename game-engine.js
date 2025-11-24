/* --- START OF FILE game-engine.js --- */

class GameEngine {
    constructor() {
        this.state = {
            unlockEntryMethod: null, // 'destination' or 'ship'
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
        console.log('航海冒险游戏初始化完成 - v2.0 Medieval');
    }

    // 渲染所有页面结构 (现在分为左侧内容和右侧侧边栏)
    renderAllPages() {
        const app = document.getElementById('app');
        let html = '';

        Object.keys(STORY_DATA).forEach(act => {
            Object.entries(STORY_DATA[act]).forEach(([pageId, pageData]) => {
                html += this.createPageLayout(pageId, pageData);
            });
        });

        app.innerHTML = html;
        this.updateAllSidebars(); // 初始渲染侧边栏
    }

    // 创建单页布局：左侧内容 + 右侧统一侧边栏容器
    createPageLayout(pageId, pageData) {
        // 侧边栏现在是一个预留容器，后续通过JS动态填充
        // 这样可以确保列表在所有页面都是最新的
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
        
        // 生成已发现页面列表
        let listHTML = '';
        // 将Set转为Array并按发现顺序或固定顺序排序
        // 这里简单遍历 PAGE_TITLES，只显示已发现的
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

    // 更新所有页面的侧边栏 (保持状态同步)
    updateAllSidebars() {
        // 虽然有点性能损耗，但对于轻量游戏这保证了所有页面的侧边栏都是最新的
        Object.keys(STORY_DATA).forEach(act => {
            Object.keys(STORY_DATA[act]).forEach(pageId => {
                const sidebarId = `sidebar-${pageId.replace('/', '')}`;
                const sidebarEl = document.getElementById(sidebarId);
                if (sidebarEl) {
                    sidebarEl.innerHTML = this.getSidebarHTML(pageId);
                }
            });
        });
        
        // 恢复焦点 logic can be added here if needed
    }

    // 导航跳转
    navigateTo(pageId, addToHistory = true) {
        // 如果页面没变，不操作
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
            this.updateAllSidebars(); // 关键：更新侧边栏列表
            this.setSearchPlaceholder(pageId);
            
            // 滚动到顶部
            const contentArea = targetEl.querySelector('.content-area');
            if(contentArea) contentArea.scrollTop = 0;
        }
    }

    // 返回上一页
    goBack() {
        if (this.state.historyStack.length > 0) {
            const prevPage = this.state.historyStack.pop();
            this.navigateTo(prevPage, false); // false 表示不再次压入栈
        }
    }

    // 更新返回按钮的显示/隐藏
    updateBackButtonState(pageEl) {
        const btn = pageEl.querySelector('.back-btn');
        if (!btn) return;

        if (this.state.historyStack.length === 0) {
            btn.classList.add('hidden'); // 首页或无历史时不显示
        } else {
            btn.classList.remove('hidden');
            // 获取上一页标题作为提示
            const prevId = this.state.historyStack[this.state.historyStack.length - 1];
            btn.innerHTML = `← 返回: ${PAGE_TITLES[prevId] || '上一页'}`;
        }
    }

    // 处理回车搜索
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

        const ruleSet = ROUTES.find(r => r.page === currentPage);
        
        // 特殊：如果在任意页面搜 "list"，虽然现在有了侧边栏，但为了兼容旧习惯或提示
        if (keyword === 'list') {
            alert('所有已发现的页面都在右侧栏显示了。');
            input.value = '';
            return;
        }

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
            // 简单的震动反馈或提示
            input.style.borderColor = '#ff4444';
            setTimeout(() => input.style.borderColor = '#4a5d73', 500);
            return;
        }

        // 记录进入unlock页面的方式 (逻辑保持不变)
        if (targetPage === '/unlock_destination') {
            if (matchedKeyword === 'western new world land') {
                this.state.unlockEntryMethod = 'destination';
            } else if (matchedKeyword === '黑曜石号') {
                this.state.unlockEntryMethod = 'ship';
            }
        }

        input.value = ''; // 清空输入框
        this.navigateTo(targetPage);
    }

    // 设置特定页面的Placeholder (保持原有逻辑)
    setSearchPlaceholder(pageId) {
        const inputId = `searchInput_${pageId.replace('/', '')}`;
        const input = document.getElementById(inputId);
        if (!input) return;

        if (pageId === '/unlock_destination') {
            if (this.state.unlockEntryMethod === 'destination') {
                input.placeholder = "输入即将乘坐的舰名...";
            } else if (this.state.unlockEntryMethod === 'ship') {
                input.placeholder = "输入目的地...";
            } else {
                input.placeholder = "输入关键词...";
            }
        } else if (pageId === '/royal_navy') {
            input.placeholder = "寻找舰船名称...";
        } else {
            input.placeholder = "输入关键词以探索...";
        }
    }

    // 解锁按钮处理
    handleUnlock() {
        const input = document.getElementById('unlockInput');
        if (!input) return;
        const answer = input.value.trim().toLowerCase();
        
        if (answer === 'wnwl' || answer === 'western new world land' || answer === '黑曜石号') {
            this.navigateTo('/first_mission_key');
        } else {
            alert('航向似乎不对，再仔细看看线索...');
        }
    }

    // 初始化全局监听
    initGlobalListeners() {
        window.handleUnlock = () => this.handleUnlock();
    }
}

// 暴露给全局window对象
window.game = new GameEngine();