// 故事内容数据 - 所有文案内容都在这里
const STORY_DATA = {
    act1: {
        '/official_draft': {
            title: '征召信',
            content: `
                <div class="desc">
                    你是一个普通的刚毕业的航海测绘师。因为家里都是海员，从小你就听爸爸和爷爷讲在大海上航行的故事，所以你也选择进修了这个方向。<br><br>
                    今天你收到了一封征召令：
                </div>

                <div class="letter">
皇家海务部 · 临时征召令（节选）

候选人（登记号 ███-2A）：

根据《帝国海务征召条例》第7条紧急授权，你被正式列为本次征召对象。基于你所具备的航行记录、地图绘制或数学测算能力，现责令你自本函签署之时起七十二小时内，携个人测绘工具、航行日志及相关档案至港口登记处报到，不得延误。

本次任务涉及远洋航线作业，全程须严格遵循附录所列补给标准与海事信号制度。你及同期征召人员须无条件服从指令。

附注（部分内容涂黑）：……。

任何申诉仅限签收当日以书面形式提交，逾期视为放弃申诉权，并接受相应处分。

—— 皇家海务部

（右下角有污渍与潦草笔迹："他们知道了……"）
                </div>

                <div class="desc">
                    这笔迹怎么这么像艾登的？自从上次和他说了那件事之后他就消失了，难道？立刻出发去问问他的近况，毕竟我们是海事学院的同学。<br><br>
                    而且最近也没听说有什么紧急的战事或者计划，怎么会开始紧急征召我这种刚毕业的人呢？不过无所谓了，大海，我来啦！嗷！
                </div>

                <div class="desc" style="margin-top: 30px; font-weight: bold;color:#fff;text-shadow:0px 0px 10px #fff;">
                    请在搜索框内输入你认为可以推进故事的关键词。<br>输入正确关键词可解锁新的页面并获得更多线索。<br>
                    如果你卡住了，可以搜索关键词"list"回溯你打开过的所有页面，继续找更多的关键词。<br>
                    建议可以准备一张纸和一支笔记录你认为重要的线索。<br>
                    加油！<br>
                </div>
            `
        },

        '/aiden': {
            title: '艾登',
            content: `
                <div class="desc">
                    到了艾登家门口。非常安静，完全没有人的感觉。<br><br>
                    只能去我俩的秘密基地看一下。<br><br>

                    竟然有封信：<br>
                    （纸张破裂，字迹颤抖）<br><br>

                    我不知道你看不看得到这封信。事情发展到今天，我已经没得选了。<br><br>

                    他们让我说出一切。他们说如果我不开口，就会找我母亲。昨天晚上，他们在码头拦住我，把我按倒在地。我听到自己肋骨碎裂的声音。<br><br>

                    可我真的没有完整的那张图。那是你保存的。<br><br>

                    我只敢在纸上放四个"旗号"，你懂的，就是我们小时候用来练习字母的海事旗：<br><br>

                    第一面：蓝-白-红-白-蓝。<br>
                    第二面：蓝-白-蓝-白-蓝-白-蓝。七横<br>
                    第三面：蓝-白-红-白-蓝。<br>
                    第四面：黄-红-黄-红-黄。<br><br>

                    请……请你自己看懂。若我不在了，别怪我没告诉你实情。<br><br>

                    ——艾登<br><br>

                    （末尾撕掉一角）<br><br>
                </div>

                <div class="desc">
                    天啊！发生了什么事情，该不会？？？我得问问周围有没有邻居知道艾登到底怎么了！
                </div>
            `
        },

        '/neighbor_testimony': {
            title: '邻居证词',
            content: `
                <div class="desc">
                    邻居证词（手写）<br><br>

                    上周有一天，我听见隔壁那孩子（艾登）的屋子传来响声。我起初以为是争吵，可很快就听到重物倒地与闷哼。<br>

                    我从门缝往外探，看见两个陌生男人押着艾登向巷外走。他们的话我听得很清楚：<br><br>

                    "你欠的不是钱，是命。"<br><br>

                    "把图交出来。那玩意儿比你命值钱。"<br><br>

                    艾登说他没有，他们就掐着他脖子往墙上撞。我想报警，可那两个家伙盯了我一眼，我就不敢动了。<br><br>

                    ——邻居 L<br><br>
                </div>
            `
        },

        '/burned_map_fragment': {
            title: '旧航图',
            content: `
                <div class="desc">
                    旧航图碎片描述<br><br>

                    碎片边缘呈烧焦形状。可辨识信息如下：<br><br>

                    一：经度线旁褪色的墨迹写着"71°0X′"，纬度被海水溅得模糊。<br>
                    I. <span style="font-weight: bold;">Western</span> meridian fades at "71°0X′", salt-mist erasing its parallel.<br><br>

                    二：手绘龙骨船搁浅在"鲑鱼河口"，桨叶刻着倒转的日轮。<br>
                    II. <span style="font-weight: bold;">New</span>-built keel lies stranded where salmon rivers meet the tide, oar-blades carved with inverted sun-runes.<br><br>

                    三：远处朱砂描出"三烟柱"山形，峰顶飘着折断的乌鸦羽。<br>
                    III. <span style="font-weight: bold;">World</span>-edge peaks, the "Three Smoke-Pillars", sketched in cinnabar, a broken raven-feather drifting above.<br><br>

                    四：左下角羊皮焦黑，只剩半个"Skræling"字母在喘息。<br>
                    IV. <span style="font-weight: bold;">Land</span>-scroll corner charred, only half the word "Skræling" still breathes.<br><br>
                </div>
            `
        },

        '/flag_lexicon': {
            title: '旗语索引',
            content: `
                <div class="desc">
                    <h3 style="text-align:center; color: #c4a46a;">海事旗语（ICS）字母 & 数字旗列表</h3>
                    
                    <table class="flag-table">
                        <thead>
                            <tr>
                                <th>字母/数字</th>
                                <th>旗名</th>
                                <th class="desc">纯文字描述（颜色分区顺序）</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr><td>A</td><td>Alfa</td><td class="desc">白-蓝-白 三横</td></tr>
                            <tr><td>B</td><td>Bravo</td><td class="desc">红-白-红 三横</td></tr>
                            <tr><td>C</td><td>Charlie</td><td class="desc">蓝-白-蓝-白-蓝 五竖</td></tr>
                            <tr><td>D</td><td>Delta</td><td class="desc">黄-白-黄 三竖</td></tr>
                            <tr><td>E</td><td>Echo</td><td class="desc">蓝-红-蓝 三横</td></tr>
                            <tr><td>F</td><td>Foxtrot</td><td class="desc">白-红-白-红-白 五竖</td></tr>
                            <tr><td>G</td><td>Golf</td><td class="desc">蓝-黄-蓝-黄-蓝 五横</td></tr>
                            <tr><td>H</td><td>Hotel</td><td class="desc">白-红-白-红-白 五横</td></tr>
                            <tr><td>I</td><td>India</td><td class="desc">黄-蓝-黄 三横</td></tr>
                            <tr><td>J</td><td>Juliet</td><td class="desc">蓝-白-蓝-白-蓝-白-蓝 七竖</td></tr>
                            <tr><td>K</td><td>Kilo</td><td class="desc">黄-蓝-黄-蓝-黄 五横</td></tr>
                            <tr><td>L</td><td>Lima</td><td class="desc">黄-红-黄-红-黄 五竖</td></tr>
                            <tr><td>M</td><td>Mike</td><td class="desc">白-蓝-白-蓝-白 五横</td></tr>
                            <tr><td>N</td><td>November</td><td class="desc">蓝-白-蓝-白-蓝-白-蓝 七横</td></tr>
                            <tr><td>O</td><td>Oscar</td><td class="desc">黄-红-白-黄-红-白-黄 七竖</td></tr>
                            <tr><td>P</td><td>Papa</td><td class="desc">蓝底，中央白色方块</td></tr>
                            <tr><td>Q</td><td>Quebec</td><td class="desc">黄底，中央蓝色方块</td></tr>
                            <tr><td>R</td><td>Romeo</td><td class="desc">红-白-红-白-红 五横</td></tr>
                            <tr><td>S</td><td>Sierra</td><td class="desc">白-蓝-白-蓝-白 五竖</td></tr>
                            <tr><td>T</td><td>Tango</td><td class="desc">红-黄-红-黄-红 五竖</td></tr>
                            <tr><td>U</td><td>Uniform</td><td class="desc">红-白-红-白-红-白-红 七横</td></tr>
                            <tr><td>V</td><td>Victor</td><td class="desc">白-红-白-红-白-红-白 七竖</td></tr>
                            <tr><td>W</td><td>Whiskey</td><td class="desc">蓝-白-红-白-蓝 五横</td></tr>
                            <tr><td>X</td><td>X-ray</td><td class="desc">白-蓝-白-蓝-白-蓝-白 七竖</td></tr>
                            <tr><td>Y</td><td>Yankee</td><td class="desc">黄-蓝-黄-蓝-黄 五竖</td></tr>
                            <tr><td>Z</td><td>Zulu</td><td class="desc">黄-红-白-蓝-黄-红-白-蓝-黄 九横</td></tr>
                            <tr><td>0</td><td>Zero</td><td class="desc">四横：红-黄-红-黄</td></tr>
                            <tr><td>1</td><td>One</td><td class="desc">白底 + 左侧红竖条</td></tr>
                            <tr><td>2</td><td>Two</td><td class="desc">蓝底 + 左侧红竖条</td></tr>
                            <tr><td>3</td><td>Three</td><td class="desc">红底 + 左侧白竖条</td></tr>
                            <tr><td>4</td><td>Four</td><td class="desc">黄底 + 左侧红竖条</td></tr>
                            <tr><td>5</td><td>Five</td><td class="desc">蓝底 + 左侧白竖条</td></tr>
                            <tr><td>6</td><td>Six</td><td class="desc">黑底 + 左侧白竖条</td></tr>
                            <tr><td>7</td><td>Seven</td><td class="desc">左黄右红 两竖区</td></tr>
                            <tr><td>8</td><td>Eight</td><td class="desc">左白右红 两竖区</td></tr>
                            <tr><td>9</td><td>Nine</td><td class="desc">左蓝右白 两竖区</td></tr>
                        </tbody>
                    </table>
                </div>
            `
        },

        '/academy': {
            title: '海事学院',
            content: `
                <div class="desc">
                    个人航行日记（节选）<br><br>

                    我预感这个学期之后还是继续绘制港湾地图，没有办法和舰队出海。实在太无聊了。<br><br>

                    今天又爬到阁楼去翻爷爷的旧航图时，发现有一页右下角被火星烧焦了一块，只剩锯齿状边缘。<br><br>

                    那张图是我和艾登在小的时候就看到过。当时我们常常用木船比赛，在图上看谁跑的快跑得远。那时候似乎还是完整的一张图。<br><br>

                    烧焦处原先写着什么？我记得似乎是一些奇怪的信息，小时候看不懂。也许我应该从残余的碎片仔细辨认一下……<br><br>
                </div>
            `
        },

        '/royal_navy': {
            title: '皇家海务部',
            content: `
                <div class="desc">
                    远征舰队登记简表（节选）<br><br>

                    舰名：黑曜石号（Obsidian）<br>
                    指挥官：阿尔契巴尔德·温斯洛<br>
                    水手长：威廉·哈克特<br>
                    随行稽查官：西奥多西奥·里贝拉<br>
                    船员若干：皮埃尔-马里·杜邦、埃德加·普劳德、路易吉·康塔里尼、卡斯帕·索伦森……<br><br>

                    备注：本次远征目的暂不公开。所有补给与航图由皇家学者审查后封存。<br><br>
                </div>
            `
        },

        '/unlock_destination': {
            title: '真相浮现',
            content: `
                <div class="desc">
                    现在我明白了，我似乎因为爷爷的那个航图被卷入了一趟不得不出发的航程。
                </div>
                
                <div class="unlock-section">
                    <div id="unlock-instruction">
                        <p style="color: #c4a46a; margin-bottom: 15px;">请输入完整的目的地或舰船名称来继续。</p>
                    </div>
                    <input type="text" id="unlockInput" placeholder="">
                    <button onclick="handleUnlock()" id="unlockButton">开启航程</button>
                </div>
            `
        },

        '/first_mission_key': {
            title: '第一幕通关',
            content: `
                <div class="success-badge">
                    第一幕通关页<br><br>

                    你已成功拼合散落在文件、日记、证词与旗语中的所有线索。<br><br>

                    ——目的地已显现。<br>
                    ——远征队航向已不可逆转。<br>
                    ——你将在下一幕登上"黑曜石号"。
                </div>
                
                <div class="desc">
                    恭喜你完成了第一幕的挑战！所有的线索都已汇集，真相浮出水面。<br><br>
                    准备好迎接第二幕的冒险了吗？
                </div>

                <div style="text-align: center; margin-top: 30px;">
                    <button onclick="navigateTo('/ch2_intro')" class="second-act-btn">
                        第二幕
                    </button>
                </div>
            `
        },

        '/list': {
            title: '已发现页面列表',
            content: `
                <div class="desc">
                    以下是你在探索过程中发现的所有页面。点击页面名称可以快速跳转。
                </div>
                
                <div id="allPageLinks" style="margin-top: 20px;">
                    <!-- 动态生成页面链接 -->
                </div>
            `
        }
    },

    act2: {
        '/ch2_intro': {
            title: '第二幕 · 登船',
            content: `
    <!-- 信纸样式的内容 -->
        <div class="parchment-paper">
            <div class="ink-blot ink-blot-1"></div>
            <div class="ink-blot ink-blot-2"></div>
            
            <div class="parchment-title">第二幕 · 登船</div>
            
            <div class="parchment-date"> 8 月 3 日</div>
            
            <div class="parchment-content">
<div class="desc">

                晨雾尚未散尽，斯洛哈港的码头还浸在微凉的湿气里。<br>
圣瓦罗斯河的水流轻拍着岸边，三艘帆船静立水中，桅杆顶端的王室旗帜在雾中若隐若现 —— 这便是此次紧急秘密征召的远航船队，全部家当仅由旗舰 “黑曜石号” 号、“赫拉克勒斯” 号与 “西风尽头” 号组成，没有浩荡的舰群，唯有甲板上忙碌的身影泄露着远征的秘密。​<br>
旗舰  “黑曜石号” 号是船队的核心，110 吨的排水量在当时已算中型帆船，23 米长的船身覆盖着深褐色船壳，三根桅杆笔直挺立，挂着镶有纹章的帆布，甲板长约 18 米，两侧架设着 4 门迫击炮与 1 门轻型舰炮，既是航行的依靠，也是防身的武器。船尾的舵楼稍显高耸，那里将是船长指挥航程的位置，而甲板下方的船舱低矮逼仄，船员甚至无法直立，仅能蜷身休息。右侧的 “平塔” 号体型稍小，90 吨的排水量让它更显轻快，船长是经验丰富的阿尔契巴尔德·温斯洛，这艘船以速度见长，船体长度不及旗舰一半，却在后续航程中扮演了重要角色。<br>
最外侧的 “西风尽头” 号和“赫拉克勒斯” 号仅有 60 吨，由杜邦兄弟，皮埃尔和马里执掌，船身纤细，在雾中如同一片漂浮的柳叶，却分别承载着 22 和26名船员的性命。三艘船的甲板上都堆放着木桶，有的装着可支撑六个月的硬饼干与咸肉，有的盛着极易变质的淡水，桶沿已凝结出带着朽木铁锈味的水珠，还有准备与新大陆原住民”交易的布匹和小饰品。<br>​
旗舰 “黑曜石号” 号的 39 人里，既有指挥官温斯洛亲自挑选的航海老手，也有王室指派的随行稽查官西奥多西奥·里贝拉，后者紧攥着文书袋，要随时记录航程中的每一笔花销与发现。“赫拉克勒斯” 号的 26 人中夹杂着几个面色桀骜的汉子，他们是因参与斗殴入狱、以远航抵罪的犯人，此刻正好奇地抚摸着船舷的炮管。杜邦兄弟正站在各自的船头清点物资，作为船队的投资者，他们的眉头始终微蹙，显然清楚这场赌局的风险 —— 一旦失败，不仅财富尽失，性命也恐难保全。​<br>

阿尔契巴尔德·温斯洛最后踏上 “圣玛丽亚” 号的踏板。这位红头发、蓝眼睛的欧洲人穿着褪色的航海服，靴底还沾着码头的泥沙。他回头望了一眼岸上寥寥几位送行的渔夫，又低头摸了摸怀中的航海图，那上面用红笔标注着想象中 “新大陆” 的轮廓。晨雾渐散，第一缕阳光照在船帆上，船员们纷纷拉起绳索，帆布在风中展开，发出猎猎声响。稽查官走到指挥官温斯洛身边，举起王室委任状再次确认：“航海司令，一切就绪。” 船长点点头，目光投向雾色渐开的海平面，声音低沉却坚定：“我们即将驶向未知的海洋，去寻找通往新大陆的航线，为王室带回财富与荣耀！” 船员们纷纷停下手中的活，目光集中在他身上，有兴奋，有紧张，也有不安。
                </div>
 </div>
            `
        },

        '/ch2_captain': {
            title: '温斯洛日记',
            content: `
                <div class="letter">
8月2日<br><br>

皇家海务部的命令来得突然，要求我立即接手"黑曜石号"的指挥权。<br><br>

那个叫艾登的年轻人失踪了，据说与一张旧航图有关。现在他们又征召了一个刚毕业的测绘师——正是艾登的同学。<br><br>

这绝非巧合。里贝拉那双眼睛时刻在监视着一切，我知道他是海务部派来盯着我的。<br><br>

我们必须找到那个地方，在其他人之前。那张图上标记的位置……如果传说是真的……<br><br>

（墨迹在此处晕开）
                </div>
            `
        },

        '/ch2_inspector': {
            title: '里贝拉稽查记录',
            content: `
                <div class="letter">
稽查官日志 · 机密<br><br>

对象：阿尔契巴尔德·温斯洛指挥官<br>
状态：需密切监视<br><br>

温斯洛与那张失踪的航图有间接关联。他的祖父曾是"西方新大陆"探险队的成员。<br><br>

新征召的测绘师需重点观察。他与失踪人员艾登关系密切，可能掌握关键信息。<br><br>

杜邦兄弟行为可疑，频繁在深夜密谈。需查明其真实目的。<br><br>

任务优先级：确保航图目的地信息不外泄，必要时采取极端措施。<br><br>

——里贝拉
                </div>
            `
        },

        '/ch2_dubang': {
            title: '杜邦兄弟对话片段',
            content: `
                <div class="letter">
（深夜，货舱角落）<br><br>

皮埃尔：他们都在找那张图，但我们有优势。<br><br>

马里：父亲临终前说的话你还记得吗？"在鲑鱼河口，倒转的日轮下。"<br><br>

皮埃尔：温斯洛不知道我们是谁。他若知道我们是老杜邦的儿子……<br><br>

马里：嘘！有人来了。<br><br>

皮埃尔：记住，那宝藏本该属于我们家族。这次绝不能失手。<br><br>

（脚步声接近，对话中止）
                </div>
            `
        }
    }
};

// 图片资源配置 - 后续添加图片时在这里注册
const IMAGE_ASSETS = {
    characters: {
        // 示例：'aiden': 'images/characters/aiden.jpg',
        // 后续添加角色图片在这里
    },
    maps: {
        // 示例：'old_map': 'images/maps/old-map.jpg',
        // 后续添加地图图片在这里
    },
    items: {
        // 示例：'compass': 'images/items/compass.png',
        // 后续添加物品图片在这里
    }
};