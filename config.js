// 路由配置 - 定义关键词到页面的映射
const ROUTES = [
    {
        page: "/official_draft",
        rules: [
            { keywords: ["艾登"], target: "/aiden" },
            { keywords: ["海事学院"], target: "/academy" },
            { keywords: ["皇家海务部"], target: "/royal_navy" },
            { keywords: ["邻居"], target: "/neighbor_testimony" },
            { keywords: ["wnwl"], target: "/burned_map_fragment" },
            { keywords: ["旗号"], target: "/flag_lexicon" },
            { keywords: ["旧航图"], target: "/burned_map_fragment" },
            { keywords: ["western new world land"], target: "/unlock_destination" },
            { keywords: ["黑曜石号"], target: "/unlock_destination" },
            { keywords: ["list"], target: "/list" }
        ]
    },
    {
        page: "/aiden",
        rules: [
            { keywords: ["邻居"], target: "/neighbor_testimony" },
            { keywords: ["wnwl"], target: "/burned_map_fragment" },
            { keywords: ["旗号"], target: "/flag_lexicon" },
            { keywords: ["艾登"], target: "/aiden" },
            { keywords: ["海事学院"], target: "/academy" },
            { keywords: ["皇家海务部"], target: "/royal_navy" },
            { keywords: ["旧航图"], target: "/burned_map_fragment" },
            { keywords: ["western new world land"], target: "/unlock_destination" },
            { keywords: ["黑曜石号"], target: "/unlock_destination" },
            { keywords: ["list"], target: "/list" }
        ]
    },
    {
        page: "/academy",
        rules: [
            { keywords: ["旧航图"], target: "/burned_map_fragment" },
            { keywords: ["艾登"], target: "/aiden" },
            { keywords: ["海事学院"], target: "/academy" },
            { keywords: ["皇家海务部"], target: "/royal_navy" },
            { keywords: ["邻居"], target: "/neighbor_testimony" },
            { keywords: ["wnwl"], target: "/burned_map_fragment" },
            { keywords: ["旗号"], target: "/flag_lexicon" },
            { keywords: ["western new world land"], target: "/unlock_destination" },
            { keywords: ["黑曜石号"], target: "/unlock_destination" },
            { keywords: ["list"], target: "/list" }
        ]
    },
    {
        page: "/neighbor_testimony",
        rules: [
            { keywords: ["艾登"], target: "/aiden" },
            { keywords: ["海事学院"], target: "/academy" },
            { keywords: ["皇家海务部"], target: "/royal_navy" },
            { keywords: ["邻居"], target: "/neighbor_testimony" },
            { keywords: ["wnwl"], target: "/burned_map_fragment" },
            { keywords: ["旗号"], target: "/flag_lexicon" },
            { keywords: ["旧航图"], target: "/burned_map_fragment" },
            { keywords: ["western new world land"], target: "/unlock_destination" },
            { keywords: ["黑曜石号"], target: "/unlock_destination" },
            { keywords: ["list"], target: "/list" }
        ]
    },
    {
        page: "/burned_map_fragment",
        rules: [
            { keywords: ["western new world land"], target: "/unlock_destination" },
            { keywords: ["艾登"], target: "/aiden" },
            { keywords: ["海事学院"], target: "/academy" },
            { keywords: ["皇家海务部"], target: "/royal_navy" },
            { keywords: ["邻居"], target: "/neighbor_testimony" },
            { keywords: ["wnwl"], target: "/burned_map_fragment" },
            { keywords: ["旗号"], target: "/flag_lexicon" },
            { keywords: ["旧航图"], target: "/burned_map_fragment" },
            { keywords: ["黑曜石号"], target: "/unlock_destination" },
            { keywords: ["list"], target: "/list" }
        ]
    },
    {
        page: "/flag_lexicon",
        rules: [
            { keywords: ["western new world land"], target: "/unlock_destination" },
            { keywords: ["黑曜石号"], target: "/unlock_destination" },
            { keywords: ["艾登"], target: "/aiden" },
            { keywords: ["海事学院"], target: "/academy" },
            { keywords: ["皇家海务部"], target: "/royal_navy" },
            { keywords: ["邻居"], target: "/neighbor_testimony" },
            { keywords: ["wnwl"], target: "/burned_map_fragment" },
            { keywords: ["旗号"], target: "/flag_lexicon" },
            { keywords: ["旧航图"], target: "/burned_map_fragment" },
            { keywords: ["list"], target: "/list" }
        ]
    },
    {
        page: "/royal_navy",
        rules: [
            { keywords: ["黑曜石号"], target: "/unlock_destination" },
            { keywords: ["艾登"], target: "/aiden" },
            { keywords: ["海事学院"], target: "/academy" },
            { keywords: ["皇家海务部"], target: "/royal_navy" },
            { keywords: ["邻居"], target: "/neighbor_testimony" },
            { keywords: ["wnwl"], target: "/burned_map_fragment" },
            { keywords: ["旗号"], target: "/flag_lexicon" },
            { keywords: ["旧航图"], target: "/burned_map_fragment" },
            { keywords: ["western new world land"], target: "/unlock_destination" },
            { keywords: ["list"], target: "/list" }
        ]
    },
    {
        page: "/unlock_destination",
        rules: [
            { keywords: ["艾登"], target: "/aiden" },
            { keywords: ["海事学院"], target: "/academy" },
            { keywords: ["皇家海务部"], target: "/royal_navy" },
            { keywords: ["邻居"], target: "/neighbor_testimony" },
            { keywords: ["wnwl"], target: "/burned_map_fragment" },
            { keywords: ["旗号"], target: "/flag_lexicon" },
            { keywords: ["旧航图"], target: "/burned_map_fragment" },
            { keywords: ["western new world land"], target: "/unlock_destination" },
            { keywords: ["黑曜石号"], target: "/unlock_destination" },
            { keywords: ["list"], target: "/list" }
        ]
    },
    {
        page: "/first_mission_key",
        rules: [
            { keywords: ["艾登"], target: "/aiden" },
            { keywords: ["海事学院"], target: "/academy" },
            { keywords: ["皇家海务部"], target: "/royal_navy" },
            { keywords: ["邻居"], target: "/neighbor_testimony" },
            { keywords: ["wnwl"], target: "/burned_map_fragment" },
            { keywords: ["旗号"], target: "/flag_lexicon" },
            { keywords: ["旧航图"], target: "/burned_map_fragment" },
            { keywords: ["western new world land"], target: "/unlock_destination" },
            { keywords: ["黑曜石号"], target: "/unlock_destination" },
            { keywords: ["list"], target: "/list" }
        ]
    },
    {
        page: "/list",
        rules: [
            { keywords: ["艾登"], target: "/aiden" },
            { keywords: ["海事学院"], target: "/academy" },
            { keywords: ["皇家海务部"], target: "/royal_navy" },
            { keywords: ["邻居"], target: "/neighbor_testimony" },
            { keywords: ["wnwl"], target: "/burned_map_fragment" },
            { keywords: ["旗号"], target: "/flag_lexicon" },
            { keywords: ["旧航图"], target: "/burned_map_fragment" },
            { keywords: ["western new world land"], target: "/unlock_destination" },
            { keywords: ["黑曜石号"], target: "/unlock_destination" },
            { keywords: ["温斯洛"], target: "/ch2_captain" },
            { keywords: ["阿尔契巴尔德·温斯洛"], target: "/ch2_captain" },
            { keywords: ["指挥官"], target: "/ch2_captain" },
            { keywords: ["里贝拉"], target: "/ch2_inspector" },
            { keywords: ["稽查官"], target: "/ch2_inspector" },
            { keywords: ["杜邦"], target: "/ch2_dubang" },
            { keywords: ["杜邦兄弟"], target: "/ch2_dubang" }
        ]
    },
    // 第二幕路由
    {
        page: "/ch2_intro",
        rules: [
            { keywords: ["温斯洛"], target: "/ch2_captain" },
            { keywords: ["阿尔契巴尔德·温斯洛"], target: "/ch2_captain" },
            { keywords: ["指挥官"], target: "/ch2_captain" },
            { keywords: ["里贝拉"], target: "/ch2_inspector" },
            { keywords: ["稽查官"], target: "/ch2_inspector" },
            { keywords: ["杜邦"], target: "/ch2_dubang" },
            { keywords: ["杜邦兄弟"], target: "/ch2_dubang" },
            { keywords: ["list"], target: "/list" }
        ]
    },
    {
        page: "/ch2_captain",
        rules: [
            { keywords: ["温斯洛"], target: "/ch2_captain" },
            { keywords: ["阿尔契巴尔德·温斯洛"], target: "/ch2_captain" },
            { keywords: ["指挥官"], target: "/ch2_captain" },
            { keywords: ["里贝拉"], target: "/ch2_inspector" },
            { keywords: ["稽查官"], target: "/ch2_inspector" },
            { keywords: ["杜邦"], target: "/ch2_dubang" },
            { keywords: ["杜邦兄弟"], target: "/ch2_dubang" },
            { keywords: ["list"], target: "/list" }
        ]
    },
    {
        page: "/ch2_inspector",
        rules: [
            { keywords: ["温斯洛"], target: "/ch2_captain" },
            { keywords: ["阿尔契巴尔德·温斯洛"], target: "/ch2_captain" },
            { keywords: ["指挥官"], target: "/ch2_captain" },
            { keywords: ["里贝拉"], target: "/ch2_inspector" },
            { keywords: ["稽查官"], target: "/ch2_inspector" },
            { keywords: ["杜邦"], target: "/ch2_dubang" },
            { keywords: ["杜邦兄弟"], target: "/ch2_dubang" },
            { keywords: ["list"], target: "/list" }
        ]
    },
    {
        page: "/ch2_dubang",
        rules: [
            { keywords: ["温斯洛"], target: "/ch2_captain" },
            { keywords: ["阿尔契巴尔德·温斯洛"], target: "/ch2_captain" },
            { keywords: ["指挥官"], target: "/ch2_captain" },
            { keywords: ["里贝拉"], target: "/ch2_inspector" },
            { keywords: ["稽查官"], target: "/ch2_inspector" },
            { keywords: ["杜邦"], target: "/ch2_dubang" },
            { keywords: ["杜邦兄弟"], target: "/ch2_dubang" },
            { keywords: ["list"], target: "/list" }
        ]
    }
];

// 页面标题映射
const PAGE_TITLES = {
    '/official_draft': '征召信',
    '/aiden': '艾登',
    '/neighbor_testimony': '邻居证词',
    '/burned_map_fragment': '旧航图',
    '/flag_lexicon': '旗语索引',
    '/academy': '海事学院',
    '/royal_navy': '皇家海务部',
    '/unlock_destination': '真相浮现',
    '/first_mission_key': '第一幕通关',
    '/list': '页面列表',
    '/ch2_intro': '第二幕 · 登船',
    '/ch2_captain': '温斯洛日记',
    '/ch2_inspector': '里贝拉稽查记录',
    '/ch2_dubang': '杜邦兄弟对话片段'
};