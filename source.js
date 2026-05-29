// ==UserScript==
// @name         TETR.IO中文翻译
// @namespace    https://github.com/huanmieSAA/iotranslate
// @version      2.0.2
// @description  将TETR.IO中的大部分可编辑内容翻译成中文。制作鸣谢：mrz,xb，渣渣120，B4093以及方块群友。2.0.2更新：修复开关位置。大家有遇到没翻的文本可以截图发送到xchen5939@gmail.com我会及时添加
// @match        https://*.tetr.io/*
// @grant        GM_registerMenuCommand
// @grant        unsafeWindow
// @grant        GM_getValue
// @grant        GM_setValue
// @run-at       document-start
// @downloadURL https://update.greasyfork.org/scripts/466016/TETRIO%E4%B8%AD%E6%96%87%E7%BF%BB%E8%AF%91.user.js
// @updateURL https://update.greasyfork.org/scripts/466016/TETRIO%E4%B8%AD%E6%96%87%E7%BF%BB%E8%AF%91.meta.js
// ==/UserScript==

(() => {
    "use strict";

    // 定义文本映射表

    const config = {
        replaceGame: GM_getValue('replaceGame', 0), // 是否替换游戏内文本 (1: 启用, 0: 禁用)
        debug: GM_getValue('debug', 0), // 调试 (1: 启用, 0: 禁用)
    };

    const log = (...args) => {
        if (config.debug !== 1) {
            return;
        }

        console.log(GM_info.script.name, ...args);
    };

    // 常规文本
    const textMap = {
        "WINS AGAINST OPENERS": "对开局策略高胜率",
        "WINS AGAINST INF DS'ERS": "对挖掘策略高胜率",
        "WINS AGAINST STRIDERS": "对火力策略高胜率",
        "WINS AGAINST PLONKERS": "对反击策略高胜率",
        "LOSES AGAINST OPENERS": "对开局策略低胜率",
        "LOSES AGAINST INF DS'ERS": "对挖掘策略低胜率",
        "LOSES AGAINST STRIDERS": "对火力策略低胜率",
        "LOSES AGAINST PLONKERS": "对反击策略低胜率",
        "LOW VS": "低VS",
        "LOW APM": "低APM",
        "LOW PPS": "低PPS",
        "HIGH VS": "高VS",
        "HIGH APM": "高APM",
        "HIGH PPS": "高PPS",
        PLONKER: "使用反击策略",
        "INF DS'ER": "使用挖掘策略",
        "LEVEL HEADED": "头脑清醒",
        "GOOD MOOD": "手感火热",
        "BAD MOOD": "手感不佳",
        "OVER CONFIDENT": "过度自信",
        VENGEANCE: "复仇之心",
        STRIDER: "使用火力策略",
        OPENER: "使用开局策略",
        //初始界面文本
        JOIN: "加入",
        "total players": "总玩家数",
        "OF WHICH REGISTERED": "注册玩家数",
        "OF WHICH ANONYMOUS": "匿名玩家数",
        "OF WHICH RANKED": "拥有段位的玩家数",
        "TOTAL ACCOUNTS": "总账号数",
        "games played": "对局场数",
        "hours played": "总游戏时长",
        "TIME PLAYED": "总游戏时长",
        "RECORDS SAVED": "总记录存储",
        "AVG PIECES PER SECOND": "平均PPS",
        "welcome to TETR.IO": "欢迎来到TETR.IO",
        "open in": "打开",
        DESKTOP: "桌面客户端",
        GET: "获取",
        "puzzle together in this modern yet familiar online stacker. play against friends and foes all over the world, or claim a spot on the leaderboards - the stacker future is yours!": "欢迎游玩这款熟悉的现代方块游戏。与世界各地的朋友和对手对战，在排行榜上占据一席之地——方块的未来在您手中！",
        "enter a username to join, or leave it blank to get a random one": "输入用户名登录，或留空生成随机用户名",
        "by joining, you accept the": "加入即表示您接受",
        "terms of use": "使用条款",
        "privacy policy": "隐私政策",
        and: "和",
        rules: "规则",
        "TETR.IO is in ALPHA. please report bugs when you see them!": "TETR.IO处于ALPHA阶段，请在发现问题时报告错误！",
        //注册相关文本
        "want to join?": "想要加入游戏吗",
        "the nickname": "这个昵称",
        "hasn't been registered. do you want to claim it as yours, or play anonymously? you won't be able to submit scores to the leaderboards or play in matchmaking when anonymous.": "没有被注册。请问你是想把它作为你的账号，还是进行匿名游戏？匿名时，你将无法向排行榜提交分数或参加比赛。",
        "stay ANONYMOUS": "保持匿名",
        REGISTER: "注册",
        "let's make things official": "让我们正式开始吧",
        "to register, please choose a password for yourself": "想要注册，请输入密码",
        //登录相关文本
        "good to see you again!": "很高兴再次见到你",
        "the username": "这个用户名",
        "is registered. please enter your password to log in": "是注册了的，输入密码来登录（如果是你）",
        "I FORGOT": "我忘了！",
        LOGIN: "登录",
        "forgot your password?": "忘记了您的密码？",
        "if you have an email address associated with your account, you can reset your password by entering your email.": "如果您的账户关联有电子邮箱，您可以通过它来重置密码。",
        "REQUEST RESET": "请求重置密码",
        "password incorrect": "密码错误",
        "is this you?": "这是你吗？",
        "LOG OUT": "退出登录",
        "welcome back to TETR.IO!": "欢迎回到TETR.IO!",
        "are you": "是你",
        "TETR.IO has a policy of": "TETR.IO有一条政策：",
        "one account per person (anonymous accounts excluded)": "每人仅能拥有一个账户（不包括匿名账户）",
        ". making multiple accounts may result in permanent restriction of all your accounts.": ".开设多个账户可能会导致你的所有账户被永久封禁。",
        "read the": "阅读",
        "full policy": "完整的政策",
        "for more info. in doubt, or if you believe your usage of a second account is justified, please": "如果有疑问，或者你有合理理由使用第二个账户，请联系我们。",
        "contact support": "联系支持",
        "I'M NOT MULTIACCOUNTING": "我没有多账户",
        "just to be sure…": "只是为了确定...",
        SUBMIT: "允许",
        "two-factor authentication": "双重认证",
        "use your authenticator app to get a six-digit code, or use one of your recovery codes.": "使用你的认证器应用程序获得一个六位数的代码，或使用你的一个恢复代码。",
        "reset your password": "重置你的密码",
        "enter a new password to regain access to your account": "输入一个新的密码，重新进入你的账户",
        //删除账号相关文本
        "delete my account": "删除我的账户",
        "DELETE YOUR ACCOUNT?": "删除你的账户？",
        "delete your account": "删除账户",
        "and all attached data?": "和所有关联的数据？",
        "DELETE!": "删除！",
        "this cannot be undone.": "这是不可逆的",
        "THE SONG OF DESTRUCTION CANNOT BE STOPPED.": "毁灭之歌无法停止。",
        "you're certain you want to delete your account? you will lose EVERYTHING, including but not limited to...": "你确定要删除你的账户吗？ 你将失去所有的东西，包括但不限于...",
        "• all your replays": "• 你的所有回放",
        "• all your XP": "• 你的所有经验值",
        "• all your accomplishments": "• 你所有的成就",
        "• all your badges": "• 你所有的徽章",
        "• your TETRA LEAGUE rank": "• 你的TETRA联赛段位",
        "• and more...": "• 等等...",
        DELETE: "删除",
        "you're absolutely, 100% certain you won't regret DELETING YOUR ACCOUNT FOREVER?": "你绝对、100%确定你不会为删除你的账户而后悔，直到永远？",
        "NO REGRETS!": "不后悔！",
        "FINAL WARNING": "最后的警告",
        "DELETE YOUR ACCOUNT AND ALL ITS DATA FOREVER?": "永远删除你的账户和所有数据？",
        "DELETE MY ACCOUNT": "删除我的账号",
        "DELETING IN": "删除中",
        //主菜单文本
        //多人游戏相关文本
        MULTIPLAYER: "多人游戏",
        "play online with friends and foes": "和朋友或陌生人进行在线游戏",
        "NEW GAMEMODE!!": "全新模式！！",
        "leaderboards, achievements, replays and more": "排行榜，成就，回放等等",
        "NEW!": "更新！",
        "scale the tower! how far can you get?": "攀登高塔！你能爬多高？",
        "join public games": "加入公开对局",
        "": "",
        //TETRA联赛相关文本
        "Thank you for playing TETR.IO! After over four years, Season 1 of Tetra League is coming to a close. We've got something exciting coming, so please stay tuned for it!": "感谢您游玩 TETR.IO！经过四年多的时间，Tetra联赛 第一赛季即将结束。我们还将推出更多精彩内容，敬请期待！",
        "You can continue to play Tetra League until the end of the Season, at which point your final standing (if you are ranked) will be memorialized on your profile!": "您可以在赛季结束前继续游玩Tetra联赛，赛季结束后您的最终排名（如果有排名的话）将会记录在您的个人档案中！",
        "Earn a badge that reflects your final placement!": "您将获得一枚对应您最终排名的徽章",
        "July 26th": "7月26日",
        ": Season 1 ends": "：第一赛季结束",
        TIMELINE: "时间表",
        "July 26th through August 2nd: Season 1 Post-Season (unranked, Season 1 rules)": "7 月 26 日至 8 月 2 日： 第一赛季过渡赛阶段（无排名，第一赛季规则）",
        "August 2nd": "8月2日",
        ": Season 2 rules are published": "：公布第二赛季规则",
        "August 2nd through August 16th: Season 2 Pre-Season (unranked, Season 2 rules)": "8 月 2 日至 8 月 16 日： 第二赛季季前赛阶段（无排名，第二赛季规则）",
        "August 16th": "8月16日",
        ": Season 2 begins": "：第二赛季正式开始",
        "GOT IT!": "了解！",
        "TETRA LEAGUE": "TETRA联赛",
        "ANONYMOUS USERS MAY NOT ENTER TETRA LEAGUE": "匿名玩家无法参与TETRA联赛",
        "fight players of your skill in ranked duels": "与水平相当的玩家进行参与排名的对决",
        "this user is playing anonymously": "该用户正在匿名游戏",
        "games won": "获胜次数",
        "IN QUEUE -": "排队中 - ",
        "IN GAME": "游戏中",
        "ENTER MATCHMAKING": "进入匹配",
        "CANCEL MATCHMAKING": "取消匹配",
        "LEAVING EARLY IS PUNISHED": "中途退出会受到惩罚",
        "HOW DOES IT WORK?": "这个模式是怎么运作的？",
        "enter matchmaking and you will be matched up with a player of similar skill in a game of 1v1 VERSUS.": "加入匹配队伍，匹配成功后，您将和一个水平相似的玩家进行一场1对1的对战。",
        "win games to gain TR and rank up! you must play at least 10 games to see your TR. to get a RANK and enter the GLOBAL LEADERBOARDS, keep playing consistently.": "获胜可以获得TR并晋升段位！您必须至少玩10局才能看到您的TR。要获得段位并进入全球排行榜，请持续进行游戏。",
        "if you leave the game early at any point, you must rejoin immediately or you will be penalized. go conquer the ranks!": "如果您在对局中的任何时候提前离开游戏，必须立刻重新加入对局，否则将受到惩罚。去挑战排行榜上的其他玩家吧！",
        LEADERBOARDS: "排行榜",
        "estimated queue time:": "预计等待时间：",
        "MINUTE":"分",
        "FINDING MATCH": "寻找对局中",
        "CLICK TO CANCEL": "单击取消",
        SECONDS: "秒",
        "MATCH FOUND": "已找到对局",
        "JOINING MATCH": "加入对局中",
        "GET READY FOR": "对决",
        "THE NEXT BATTLE": "开始",
        "face off against others and rise up through the ranks!": "与他人对决，并获得段位提升！",
        "Please remember to be civil to your opponent.": "请文明交流。",
        "the results are in!": "对局结果揭晓！",
        "TETRA LEAGUE STANDING": "TETRA联赛数据",
        "How was that game?": "这局游戏怎么样？",
        "Thanks for the feedback!": "感谢反馈！",
        NEXT: "继续",
        "play more games to receive a rank": "玩更多的游戏以获得段位",
        "Off-season": "淡季",
        "OFF-SEASON": "淡季",
        UNRANKED: "无排名",
        "MATCH SUSPENDED": "对局暂停",
        "Your opponent has disconnected, but may still return.": "您的对手已断开连接，但仍有可能重连。",
        "Your will gain points as you wait. If your opponent does not return,you win by default.": "您将会获得一分等待奖励。如果对手没有重连，则您直接获胜。",
        //快速游戏相关文本
        "QUICK PLAY": "快速游戏",
        "jump into a currently ongoing match": "加入正在进行的比赛",
        CHAT: "聊天",
        "our Discord server": "我们的Discord服务器",
        "Welcome to Quick Play chat! Please remember to be civil to your opponents - chat is actively monitored.\n\nThis chat is linked with": "欢迎来到快速游戏聊天室！请文明交流——聊天将被实时监控。 \n\n聊天将链接到",
        "left the room": "离开房间",
        "joined the room": "加入房间",
        disconnected: "断开连接",
        "was yanked from the room": "被踢出房间",
        "started the game": "开始游戏",
        "aborted the game": "终止游戏",
        "ZEN WHILE WAITING": "赛前热身",
        "BACK TO ROOM": "回到房间",
        SPECTATING: "旁观中",
        "CURRENTLY INGAME": "正在游戏中",
        "game finished": "游戏结束",
        "welcome to": "欢迎来到",
        "is a free familiar yet fast-paced online stacker in the same genre as tetris, and played by millions across the globe.": "是一款免费、易上手且快节奏的在线堆叠游戏，玩法与俄罗斯方块类似，在全球范围内拥有数百万玩家。",
        "hover for more info!": "把鼠标悬停在这里以获取更多信息！",
        "your currently set keybinds are:": "您当前的按键绑定是：",
        PLAYING: "游玩",
        "click to switch to SPECTATORS": "点击切换到旁观模式",
        "click to copy url": "点击这里复制链接",
        EDIT: "编辑",
        "you just joined QUICK PLAY - you will play in the next game in this lobby. please wait for the current game to finish. feel free to spectate or play ZEN while waiting!": "您加入了快速游戏 - 请等待结束然后加入下一局。在等待时，您可以选择旁观或游玩单人的禅意模式！",
        "you can change these and many other settings in CONFIG. have fun!": "您可以在设置中更改这些和许多其他设置。祝您玩得愉快！",
        "GAME IN PROGRESS, GOOD LUCK!": "游戏正在进行中，祝你好运!",
        "Super Lobby Mode Engaged - congratulations on hitting 100 players! Joins and leaves will be suppressed, and the winner of games in this room will earn a special profile badge!": "超级房间模式开启--达到了100名玩家! 进退房消息将暂时关闭，本局游戏的赢家将获得一枚特殊的个人资料徽章!",
        "Super Lobby Mode Disengaged": "超级房间模式解除",
        "click to switch to PLAYERS": "点击以切换到游玩模式",
        SPECTATE: "旁观",
        "enter room id or url and hit enter...": "输入房间编号或网址并单击回车...",
        "you just joined QUICK PLAY - the next game will start automatically. please wait just a moment longer!": "你刚刚加入了快速游戏——下一场游戏即将开始。请稍等片刻",
        "PLAYERS (": "玩家数（",
        "welcome to the ZENITH TOWER! send lines and KO enemies to scale the tower.": "欢迎来到天顶之塔！发送垃圾行并击倒敌人即可一步步攀爬高塔",
        "the further up the tower, the stronger the opponents!": "越往上爬，对手越强！",
        "leaderboards reset every week, how far can you get?": "排行榜每周重置，你能爬多高？",
        "LEADERBOARD CYCLES IN":"排行榜更新时间：",
        "ADD OR REMOVE MODS": "添加或移除模组",
        "YOUR FINAL ALTITUDE": "您的最终高度",
        "THIS WEEK'S PERSONAL RANK": "本周个人排名",
        "this is your first game this week, play more to track your improvement": "这是你本周的第一场对局，多多游玩以跟踪你的进步",
        "THIS WEEK'S COUNTRY RANK": "本周地区排名",
        "THIS WEEK'S GLOBAL RANK": "本周全球排名",
        "THIS WEEK'S PERSONAL BEST": "本周个人最高",
        AGAIN: "再来一局",
        EXPERT: "专家模式",
        "joining game…": "正在加入游戏…",
        "a less lenient challenge, for those who dare": "敢于挑战者的选择",
        "EXPERT MODE": "专家模式",
        "reach floor 9 to unlock": "抵达9层解锁",
        "DOUBLE HOLE GARBAGE": "空洞诅咒",
        "garbage may sometimes spawn with two holes": "垃圾行有时会生成两个空洞",
        "reach floor 6 to unlock": "抵达6层解锁",
        "receive double the garbage, cancel double the garbage": "接收双倍的垃圾行，抵消双倍的垃圾行",
        "VOLATILE GARBAGE": "达摩克利斯之剑",
        "MESSIER GARBAGE": "垃圾之乱",
        "reach floor 5 to unlock": "抵达5层解锁",
        "gravity scales up harshly by floor": "重力随楼层急剧增加",
        "reach floor 4 to unlock": "抵达4层解锁",
        "NO HOLD": "禁止暂存",
        "hold piece is disabled": "暂存方块被禁用",
        "reach floor 2 to unlock": "抵达2层解锁",
        "garbage is significantly messier": "垃圾行变得更加混乱",
        "reach floor 3 to unlock": "抵达3层解锁",
        "non-garbage minos are only visible once every five seconds": "非垃圾行方块每五秒显形一次",
        "reach floor 7 to unlock": "抵达7层解锁",
        "all-spins are rewarded, but doing the same clear twice is penalized": "all-spins将启用奖励，但重复使用相同的攻击文本将会受到惩罚",
        "reach floor 8 to unlock": "抵达8层解锁",
        DUO: "双人模式",
        "scale the tower together with someone you hold close": "与好友一起攀登高塔",
        reset: "重置",
        "scale the tower!": "攀上高塔！",
        "challenge the tower!": "挑战高塔！",
        "overthrow the tower!": "炸毁高塔！",
        "waiting for player": "等待玩家",
        "CLICK TO INVITE A FRIEND": "点此邀请好友",
        "READY!": "准备！",
        READY: "准备",
        "": "",
        "": "",
        "": "",
        "": "",
        "": "",
        "": "",
        "": "",
        "": "",
        "": "",
        "": "",
        "": "",
        "": "",
        "": "",
        "": "",
        "": "",
        "": "",
        "": "",
        "": "",
        "": "",
        "": "",
        "": "",
        "": "",
        "": "",
        "": "",
        "": "",
        //自定义游戏相关文本
        "CUSTOM GAME": "自定义游戏",
        "create public and private rooms to play by your rules": "创建公开和私人房间，按照您的规则进行游戏",
        "PUBLIC ROOM": "公开房间",
        "create a public room anyone can join": "创建一个任何人都可以加入的公开房间",
        "PRIVATE ROOM": "私人房间",
        "create a private room for you and friends": "为你和朋友创建一个私人房间",
        "Welcome to chat! Please remember to be civil to your opponents.": "欢迎来到聊天室! 请文明交流。",
        NEW: "新",
        ROOM: "房间",
        MATCH: "比赛",
        GAME: "对局",
        "room name": "房间名",
        "player limit": "人数限制",
        "auto start": "自动开始",
        "allow anonymous users to join": "允许匿名用户加入",
        "allow unranked users to play": "允许未定段用户进行游戏",
        "allow users who are in matchmaking to join": "允许正在排队进行tetra联赛的用户进行游戏",
        "RANK LIMIT": "段位限制",
        "limit by top rank": "按最高段位限制",
        music: "音乐",
        GENERAL: "常规",
        gamemode: "对局模式",
        stock: "命数",
        versus: "竞争",
        "[2 - ∞ players] a battle royale! who can survive the longest?": "[2-∞名玩家]一场大混战！谁能活得最久？",
        PRACTICE: "练习",
        "[2 players] a mode to practice with a friend": "[2名玩家]一个与朋友一起练习的模式",
        EXPERIMENTAL: "实验选项",
        "garbage passthrough": "垃圾行穿透",
        limited: "限制",
        LIMITED: "限制",
        ZERO: "无",
        "opposing attacks in transit always cancel eachother out": "发送过程中的对立攻击总是相互抵消的。",
        "opposing attacks in transit cancel out while garbage is flying": "发送过程中的对立攻击能被抵消，垃圾行偶尔会飞来。",
        CONSISTENT: "相容",
        "opposing attacks in transit cancel out except when garbage is flying": "发送过程中的的对立攻击能被抵消，除非是在垃圾行飞来的时候",
        FULL: "全部",
        "opposing attacks in transit do not cancel eachother out": "发送过程中的对立攻击不会相互抵消",
        "game presets": "对局预设",
        custom: "定制",
        default: "默认设置",
        "tetra league": "tetra联赛",
        CLASSIC: "经典",
        ARCADE: "街机",
        "ENFORCED DELAYS": "延迟块",
        "TETR.IO's premier room settings. optimized for battles with small groups or duels against friends and foes alike!": "TETR.IO的首要房间预设。为与大型团体的战斗或与朋友和敌人的决斗而优化!",
        "settings copied directly from TETR.IO's matchmaking rooms! margin times and match goals are shifted slightly with duels in mind.": "与 TETRA 联赛完全相同的预设！考虑到规则为单挑，临界时间与获胜条件与默认设置有些许不同。",
        "last season's TETRA LEAGUE rules!":"上赛季的TETRA联赛规则！",
        "this party-focused preset uses a nonstandard board size which allows you to infinitely combo.":"这个以派对为主题的预设采用了非标准棋盘尺寸，让你能够无限连击。",
        "this preset is similar to the BATTLE ROYALE gamemode but at a slower pace.":"此预设与“大逃杀”游戏模式类似，但节奏较慢。",
        "BOMBS":"炸弹",
        "versus with an explosive twist! stack pieces on top of garbage to clear it and send devastating attacks to your opponents!":"使对局充满爆炸性转折的预设，在垃圾行上方堆叠消除方块将发送毁灭级打击",
        "an endurance-focused challenge of pure stacking intellect! almost every value is changed to imitate stacker games made many years ago.": "一个以耐力为重点的纯粹堆叠的智力挑战！为模仿多年前的方块游戏，几乎改变了所有参数。",
        "featuring innovative mechanics created for a popular stacker found in arcades, this preset puts a focus on smart stacking and mastery with its custom kick table!": "模仿创新性的街机方块机制，重点是策略堆叠与合理运用特殊的踢墙表。",
        "this preset introduces several forms of enforced handling which introduces a generous skill ceiling! puts a focus on efficient and consistent play, as opposed to deafeningly fast rounds.": "该预设限制了方块移动的延迟，稍微降低了水平上限。重点是高效且稳定的堆叠攻击上，而不是花里胡哨的开局互搏。",
        "LEGACY QUICK PLAY":"经典快速游戏",
        "this legacy preset emulates TETR.IO's QUICK PLAY experience pre 6.4.0":"此经典预设模拟了 TETR.IO 6.4.0 版本之前的“快速游戏”体验",
        "settings copied directly from TETR.IO's quick play room!": "设置直接从TETR.IO的快速游戏中复制!",
        RANDOM: "随机",
        "RANDOM: CALM": "随机：平静",
        "RANDOM: BATTLE": "随机：战斗",
        "pick a completely random BGM for me": "完全随机地为我挑选一首歌",
        "pick a random calmer BGM for me": "随机地为我挑选一首平静的歌",
        "pick a random intenser battle BGM for me": "随机地为我挑选一首更加激烈的战斗之曲",
        "random bag type": "随机BAG类型",
        "keep shuffling a bag of the 7 tetrominoes": "保持随机排列一包7块中包含所有种类的方块",
        "keep shuffling a bag of 2x the 7 tetrominoes": "保持随机排列一包14块中包含所有种类的方块各两块",
        "keep shuffling a bag of the 7 tetrominoes with one random extra tetromino":"保持随机排列一包7块中包含所有种类的方块和额外一块随机方块",
        "keep shuffling a bag of the 7 tetrominoes with two random extra tetrominoes":"保持随机排列一包7块中包含所有种类的方块和额外两块随机方块",
        "keep shuffling a bag of the 7 tetrominoes. the first few bags contain a few extras.":"保持随机排列一包7块中包含所有种类的方块，但前几包多放了几块",
        "random with repetition protection": "具有重复保护的随机性",
        "alternate between 2 tetrominoes": "交替使用2种方块",
        "completely random generation": "完全随机生成",
        "allowed spins": "允许的旋转规则",
        "receive bonuses for spinning T-pieces": "旋转消除T块获得额外攻击",
        "receive bonuses for spinning T-pieces (immobile allowed)":"旋转消除T块获得额外攻击(启用不可移动判定)",
        "receive bonuses for spinning all pieces": "旋转消除所有方块都可以获得额外攻击",
        "receive back-to-back for spinning all pieces":"旋转消除所有方块都可以获得back-to-back奖励",
        "receive bonuses for spinning all pieces (immobile allowed)":"旋转消除所有方块都可以获得额外攻击(启用不可移动判定)",
        "receive bonuses for spinning T-pieces and receive back-to-back for spinning all other pieces": "旋转消除T块获得额外攻击，且非T旋转消除可获得back-to-back奖励",
        "receive bonuses for spinning T-pieces (immobile allowed) and receive back-to-back for spinning all other pieces":"旋转消除T块获得额外攻击(启用不可移动判定)，且非T旋转消除可获得back-to-back奖励",
        "receive bonuses for spinning all pieces BUT attacks are halved except for T-SPINS": "旋转消除所有方块都可以获得额外攻击，但非T攻击攻击力减半，且使用四角判定",
        "everything is a spin because YEAH WHY NOT (O-spin SUPPORTED!)": "所有方块都能旋转消除，为什么不呢？（包括O-Spin！）",
        "receive no spin bonuses": "旋转任何方块都没有额外攻击",
        "combo table": "连击表",
        "disable combo chaining": "禁止连击表",
        "TETR.IO's combo multiplier": "TETR.IO的连击倍增表",
        "classic guideline combo table": "经典规则连击表",
        "modern guideline combo table": "现代规则连击表",
        "allow 180 spins": "允许180度旋转",
        "kick table": "旋转系统",
        "the default natural rotation system with symmetric I-piece rotation": "默认的超级旋转系统和对称的I块旋转",
        "the standard natural rotation system": "默认的超级旋转系统",
        "SRS with more powerful 180 spins": "带有更强大的180度旋转的超级旋转系统",
        "novel rotation system by DR OCELOT": "DR OCELOT的新型旋转系统",
        "the classic rotation system": "经典旋转系统",
        "rotation system used in arcade games": "在街机游戏中使用的旋转系统。",
        "permissive rotation system by WINTERNEBS": "WINTERNEBS的七转八转旋转系统",
        "no kicks possible": "无法踢墙",
        "use hard drop": "允许硬降",
        "use NEXT queue": "允许查看下一个方块",
        "use HOLD queue": "允许查看暂存方块",
        "next pieces": "下一块",
        "show shadow piece": "显示阴影",
        "line clear ARE": "消行延迟",
        ARE: "出块延迟",
        "enforce below handling settings": "强制执行以下灵敏度设置",
        "enforced ARR": "强制ARR",
        "enforced DAS": "强制DAS",
        "enforced SDF": "强制SDF",
        "GRAVITY & MARGIN TIME": "重力和临界时间",
        gravity: "重力",
        "gravity increase": "重力增量",
        "gravity margin time": "重力临界时间",
        "garbage multiplier": "垃圾行加成",
        "garbage margin time": "垃圾行临界时间",
        "garbage increase": "垃圾行增量",
        "lock delay": "锁定延迟",
        "garbage travel speed": "垃圾行飞行速度",
        "garbage cap": "单次垃圾行上限",
        "garbage cap increase": "单次垃圾行上限增量",
        "garbage cap max": "单次垃圾行最大上限",
        "garbage blocking": "垃圾行阻挡",
        none: "无",
        "enable back-to-back chaining": "启用back-to-back连锁增伤",
        "enable back-to-back charging": "启用back-to-back蓄力",
        "rounding mode": "小数处理方式",
        DOWN: "向下取整",
        "all values are rounded down": "所有值均向下取整",
        RNG: "按小数部分随机",
        "weighted randomness is used to smooth values (e.g. 1.23 has a 23% chance to become 2)": "加权性随机，用于平滑值（例如：1.23有23%的机会变成2）",
        "allow manual targeting": "允许手动选定目标",
        "enable clutch clears": "启用clutch消除",
        "disable lockout": "禁用锁定",
        "board width": "游戏区域宽度",
        "board height": "游戏区域高度",
        "WARNING: server restarting soon!": "警告：服务器即将重启！",
        "COMBO BLOCKING": "连击阻挡",
        "incoming garbage will be delayed and reduced on successive line clears": "连击可阻挡并抵消垃圾行",
        "LIMITED BLOCKING": "限制阻挡",
        "incoming garbage can be reduced only once per next immediate piece": "单个方块只能阻挡并抵消一次垃圾行",
        "incoming garbage cannot be blocked": "垃圾行无法阻挡或抵消",
        "enable all clears": "启用全消攻击奖励",
        "all clear garbage": "全消伤害",
        "all clear back-to-back": "全消back-to-back",
        "opener phase": "开启阶段",
        "Seed to use, if": "在此输入种子",
        "is a free-to-win familiar yet fast-paced online stacker in the same genre as tetris, and played by millions across the globe.": " 是一款免费、易上手且快节奏的在线堆叠游戏，玩法与俄罗斯方块类似，在全球范围内拥有数百万玩家。",
        "you just created an online game - you can start the game once two players are in the room (and not spectating)!": "您刚刚创建了一个在线游戏房间 - 只要有两名玩家在房间里（旁观除外），您就可以开始游戏！",
        "you can change these and many other settings in CONFIG.": "您可以在主页-设置中更改这些设置和许多其他设置。",
        "click on the tabs above to explore and/or change room options as you wish. have fun!": "点击上面的标签，随意更改房间选项！祝您玩得愉快！",
        "public room": "公开房间",
        "rank limit": "段位限制",
        "bombs-style garbage": "炸弹式垃圾行",
        "messiness timeout": "垃圾行混乱率",
        "messiness within attack": "攻击行混乱率",
        "avoid same column RNG": "避免同列多次生成垃圾",
        "messiness on change": "混乱率",
        "messiness timeout": "超时混乱",
        "garbage absolute cap": "垃圾行绝对上限",
        "garbage phase": "垃圾行阶段",
        DEFENSIVE: "防守奖励",
        "a bonus is added when defending incoming attacks": "抵消垃圾行时获得额外攻击奖励",
        "no bonus whatsoever": "无额外攻击奖励",
        OFFENSIVE: "攻击奖励",
        "a bonus is added to both defense and offence": "发送和抵消垃圾行都会获得额外攻击奖励",
        "garbage target bonus": "垃圾行目标奖励",
        "garbage entry": "垃圾行输入方式",
        "garbage are": "垃圾行等待时间",
        "garbage queue": "垃圾行队列",
        INSTANT: "即时",
        "garbage enters instantly": "垃圾行立即生成",
        CONTINUOUS: "接续",
        "garbage rolls in one by one": "垃圾行滚滚而来",
        "DELAYED PIECE SPAWN": "延迟生成",
        "garbage rolls in one by one but delays your next piece": "垃圾行逐个输入，但是每段垃圾行延迟生成",
        "You are not the host of this room": "你不是房主",
        HOST: "房主",
        ANON: "匿名",
        "[2 - ∞ players] great for 1v1 and small lobbies!": "[2-∞人] 适合1v1和小规模房间！",
        "[2 - ∞ players] a full-fledged battle royale gamemode great for big lobbies!": "[2-∞人] 完整的大逃杀模式，适合大规模房间！",
        "[2 players] great for live training with a friend! enables undoing and resetting your board": "[2人] 适合与好友实时训练！支持撤销操作和重置棋盘",
        "battle royale": "大逃杀",
        "garbage special bonus": "垃圾行特殊奖励",
        "infinite HOLD": "无限暂存",
        "garbage cap margin": "垃圾上限增长",
        "": "",
        "": "",
        "": "",
        "": "",
        "": "",
        //房间列表相关文本
        "ROOM LISTING": "房间列表",
        "face off against the best in a single lobby shared by all!": "在这个面向所有人的大房间里与高手过招！",
        ROYALE: "超级房间",
        "join public custom games": "加入公开自定义房间",
        REFRESH: "刷新",
        "anons allowed:": "允许匿名：",
        ", unranked allowed:": "，允许未定段：",
        YES: "是",
        NO: "否",
        "and below -": "及以下 - ",
        "INGAME -": "游戏中 - ",
        "LOBBY -": "大厅 - ",
        "pick a room to join!": "选择一个房间加入",
        //TETRA频道相关文本
        "TETRA CHANNEL": "TETRA 频道",
        "TETRA CHANNEL / LEADERBOARDS": "TETRA 频道 / 排行榜",
        "TETRA CHANNEL / ME": "TETRA 频道 / 我的",
        "TETRA CHANNEL / PLAYERS": "TETRA 频道 / 玩家",
        "TETRA CHANNEL / ACHIEVEMENTS": "TETRA 频道 / 成就",
        "top the global leaderboards!": "在全球排行榜中勇争前列！",
        "track your progression!": "跟踪你的进步！",
        "view other players and their achievements!": "查看其他玩家和他们的成就！",
        "view your achievement progress!": "查看你的成就进度！",
        "expert quick play": "专家模式快速游戏",
        "career best": "生涯最佳",
        "Career best:": "生涯最佳：",
        "ago • Career best:": "前 • 生涯最佳：",
        "leaderboards, replays and more": "排行榜、回放等",
        "welcome to TETRA CHANNEL!": "欢迎来到TETRA频道！",
        "VISIT THE TETRA CHANNEL SITE": "访问TETRA频道网站",
        "VIEW FULL LEADERBOARDS, COUNTRY LEADERBOARDS, USER PAGES AND MORE": "查看完整排行榜、地区排行榜、用户页面等",
        LEADERBOARDS: "排行榜",
        "GLOBAL LEADERBOARDS FOR 40 LINES AND BLITZ": "40行竞速和BLITZ模式的全球排行榜",
        ME: "我的",
        "VIEW YOUR OWN RECORDS AND RECENT GAMES": "查看您自己的记录和最近的比赛",
        PLAYERS: "玩家",
        "TETRA LEAGUE LEADERBOARDS AND XP": "TETRA联赛和经验值排行榜",
        "LIVE NOW": "正在直播",
        "TETRA NEWS": "TETRA新闻",
        PLAY: "游玩",
        RECENT: "最近",
        VICTORY: "获胜",
        DEFEAT: "落败",
        "MATCH SUSPENDED": "比赛暂停",
        "Your opponent has disconnected, but may still return.": "你的对手掉线了，但仍可能重新连接。请稍作等待",
        "You will gain points as you wait. If your opponent does not return, you win by default.": "你在等待时会获得该回合胜利。如果倒计时结束后你的对手没有重新连接，本场比赛你将获胜。",
        "VICTORY IN": "获胜倒计时：",
        "BY LEAGUE RATING": "按联赛段位排名",
        "Abandon Match": "挂起比赛",
        "BY XP": "按经验值排名",
        "you forfeited": "你弃权了",
        "only the first 100 are shown. to see the full leaderboard, click VIEW FULL above.": "只显示前100名。要看完整的排行榜，请点击上面的查看完整排行榜。",
        "PIECES PLACED": "放置块数",
        "PIECES per SECOND": "每秒放置块数",
        "KEYS PRESSED": "按键数",
        "KEYS per PIECE": "按键每块",
        OVERVIEW: "回顾",
        STATS: "统计数据",
        "KEYS per SECOND": "每秒按键数",
        HOLDS: "暂存数",
        "LINES per MINUTE": "每分钟行数",
        "maximum COMBO": "最大连击数",
        "maximum back-to-back chain": "最长back-to-back连锁",
        "finesse %": "极简率",
        "finesse faults": "非极简操作",
        "FINAL TIME": "最终时间",
        "FINAL SCORE": "最终得分",
        RESULTS: "比赛结果",
        "got a new personal best in 40 LINES with a time of": "在40行挑战中取得了新的个人最好成绩，时间为",
        "got a new personal best in BLITZ with a score of": "在BLITZ中取得了新的个人最好成绩，得分为",
        "has become a": "成为了",
        "got a new personal best in 5,000,000 BLAST with a time of": "在5,000,000 BLAST中获得了新的个人最佳成绩，时间为",
        "received the": "取得了",
        "got a new personal best in Expert Quick Play with an altitude of":"在专家快速游戏中刷新了个人最佳成绩，高度为",
        "got a new personal best in Quick Play with an altitude of":"在快速游戏中刷新了个人最佳成绩，高度为",
        "has received the gift of":"获赠成为",
        badge: "徽章",
        achieved: "达成",
        rank: "段位",
        SCORES: "分数",
        "LATEST NEWS": "最新动态",
        "VIEW TETRA LEAGUE RECORD": "查看TETRA联赛回放",
        "VIEW PERSONAL BEST": "查看最好成绩",
        "VIEW ALL 40 LINES RECORDS": "查看全部的40行挑战回放",
        Achieved: "达成于",
        months: "月",
        ago: "前",
        "VIEW ALL BLITZ RECORDS": "查看全部的BLITZ回放",
        "VIEW ALL RECENT RECORDS": "查看全部的近期回放",
        RECORD: "回放",
        VIEW: "查看",
        "PLAY TIME": "游戏时长",
        "ONLINE GAMES": "游戏场次",
        "OF WHICH WINS": "获胜场次",
        "ONLINE GAMES WON": "游戏获胜场次",
        EXPAND: "展开",
        "GLOBAL LEADERBOARDS FOR 40 LINES, BLITZ AND QUICK PLAY": "关于40行竞速，BLITZ和快速游戏的全球排行榜",
        "View previous seasons": "查看上赛季",
        "View previous weeks": "查看前周",
        "Back to the present": "返回当前",
        "LEADERBOARD FOR": "排行榜，来自",
        ACHIEVEMENTS: "成就",
        "VIEW YOUR ACHIEVEMENTS AND THEIR PROGRESS": "查看您的成就及其进度",
        "FETING ACHIEVEMENTS...": "",
        POWERLEVELLING: "等级之力",
        "XP gained": "获得XP",
        "No skill without experience.": "熟能生巧。",
        "Greater than the sum of its parts?": "",
        STACKER: "堆叠者",
        "pieces placed": "放置方块",
        "Greater than the sum of its parts?": "拼在一起更好吧？",
        "GARBAGE OFFENSIVE": "垃圾攻势",
        "lines sent": "发送垃圾行",
        "The act of violence and communication of spirit.": "暴力美学的完美体现。",
        ELEGANCE: "优雅",
        "pieces placed with perfect finesse": "用极简放置方块",
        "Path of least resistance.": "干净利落。",
        "CHAMPION OF THE LOBBY": "大厅冠军",
        "largest room to rank first place in": "在最大的房间中获得第一",
        "Biggest fish in a big pond.": "大才大用。",
        "Achievement get!": "获得成就！",
        Elegance: "优雅",
        Stacker: "堆叠者",
        "Garbage Attacker": "垃圾制造者",
        "Clear 40 LINES using only T-Spin Doubles": "仅限使用T-Spin Double完成40行挑战",
        "The ancient tradition of six pieces, all placed to serve the needs of one.": "传统的方块六件套，只为最完美的T块而堆。",
        SPRINTER: "40行爱好者",
        "40 LINES games completed": "完成40行挑战次数",
        "Don't reset.": "永不重开！",
        "SNAKE EYES": "蛇眼",
        "Clear 40 LINES using only Singles": "仅限使用消一完成40行挑战",
        "Death by exactly 40 cuts.": "正好四十次。",
        "1-8 STACKING": "一八堆叠王",
        "Clear 40 LINES using 10 Quads in column 2 or 9": "仅限在第二列或第九列中使用十个消四完成40行挑战",
        "Don't waste the I-Piece!": "我从不浪费I块。",
        "MR. BOARDWIDE": "版面天王",
        "Clear 40 LINES using a Quad in each of the 10 columns": "在每一列中都完成一次消四完成40行挑战",
        "Master of all columns.": "万列归宗！",
        "Clear 40 LINES using only All Clears": "仅限使用10个全消完成40行挑战",
        "To clear without waste is to express the highest form of gratitude.": "一块也不浪费才是对方块的最崇高的敬意。",
        BLITZER: "BLITZ爱好者",
        "points earned in completed BLITZ games": "完成BLITZ挑战获得的分数总和",
        "Two minutes of perfection.": "完美的两分钟。",
        "WABI-SABI": "侘寂",
        "highest BLITZ score obtained without performing any All Clears": "不使用任何全消的情况下获得的最高BLITZ分数",
        "Two minutes of imperfection.": "不完美的两分钟。",
        "NAGA EYES":"纳迦眼",
        "Clear 40 LINES using 40 Spin Singles":"仅限使用40次旋转消一完成40行挑战",
        "The ancient wisdom that lies behind a serpent's gaze.":"蛇的凝视中蕴藏着古老的智慧。",
        "SECRET GRADE": "隐藏段位",
        "A (poorly guarded) secret.": "一个（众所周知的）秘密。",
        CONTENDER: "挑战者",
        "rounds played": "Tetra联赛游玩的总回合数",
        '"Some day, everyone will remember your name!" —Tetra League Ad': "“总有一天，所有人都会记得你的名字！”——Tetra联赛海报",
        "REVERSE SWEEP SPECIALIST": "逆转大师",
        "rounds won with the opponent at match point": "在对手处于赛点时赢得的回合数",
        "Sometimes you need to feel the heat to unlock your best self.": "有时候,你只是需要被推一把。",
        "THE SPIKE OF ALL TIME": "超究极必杀爆发",
        "largest spike sent (base attack, excluding margin time and Surge)": "发动的最大spike数（基本攻击，不包含margin加成和浪涌增压）",
        "Flashy techniques are a staple amongst Tetra League's glory-seeking competitors.": "华丽的技巧是每个想在Tetra联赛中大放异彩的挑战者的标配。",
        "SPEED PLAYER": "速度爱好者",
        "rounds won with a higher PPS than the opponent": "在每秒方块数（PPS）高于对手的情况下获胜的回合数",
        "A simple strategy that can overwhelm even the most poised of masters.": "功夫再高，也怕菜刀。",
        PLONK: "太极爱好者",
        "rounds won with a lower PPS than the opponent": "在每秒方块数（PPS）低于对手的情况下获胜的回合数",
        "Pour intention into each piece, and even a single bag can shake the world.": "慢工出细活。",
        "OPENER MAIN": "开局之王",
        "rounds won within 20 seconds": "在20秒内获胜的回合数",
        "A signature move worthy of being the first strike AND the calling card.": "这不仅是猛烈的爆发，也代表了一种独特的风格。",
        "Spin to win.": "转出胜利。",
        "Feels good, real good.": "好，很好，非常好。",
        "ZENITH EXPLORER": "天顶探索者",
        "highest floor discovered without any mods": "在不启用任何模组的情况下抵达的最高层数",
        "Uncover the mysteries of the Zenith Tower.": "发掘天顶之塔的秘密。",
        "THE LOVERS": "恋人",
        'highest floor discovered with the "DUO" mod': "在双人模式下抵达的最高层数",
        "Love, and resign yourself to the fate of another.": "去爱，去把握命中注定的缘分。",
        "TOWER CLIMBER": "攀塔爱好者",
        "meters climbed": "攀登的米数",
        '"Have I been here before..?"': "“这给我爬哪来了...？”",
        "THE EMPEROR": "皇帝",
        'highest floor discovered with the "Expert Mode" mod': "在启用“专家模式”模组的情况下抵达的最高层数",
        "A display of power for those willing to bear its burden.": "欲戴王冠，必承其重。",
        "WHATEVER IT TAKES": "不计代价",
        "players KO'd in Quick Play": "在快速游戏中击败的玩家数",
        "Mere sacrifices in the pursuit of greatness...": "一将功成万骨枯...",
        "THE RESPONSIBLE ONE": "责任神",
        "highest amount of revivals performed in a single DUO run": "在一局双人模式中完成的最多复活次数",
        '"Could you please stop dying?"': "你能不能少死点？",
        STRENGTH: "力量",
        'highest floor discovered with the "VOLATILE GARBAGE" mod': "在启用“达摩克利斯之剑”模组下抵达的最高层数",
        "Match great obstacles with greater determination.": "以强大的决心应对更大的挑战。",
        "SWAMP WATER": "沼泽水特调",
        'highest floor discovered while using all mods other than "DUO" at the same time': "在启用所有模组的情况下抵达的最高层数（不包括双人模式）",
        "The worst of all worlds.": "这充满恶意的世界。",
        DEADLOCK: "僵局",
        "SWAMP WATER LITE": "沼泽水特调Lite",
        "Comes in 8 different flavors!": "有 8 种不同口味！",
        'highest floor discovered while using 7/8 of the difficulty mods ("Duo" not allowed)': "在启用任意七种模组的情况下抵达的最高层数（不包括双人模式）",
        "BLOCK RATIONING": "方块配给专家",
        'highest total attack within the first 400 pieces placed while using the "Expert Mode" and "Messier Garbage" mods': "在启用“专家模式”和“垃圾之乱”模组的情况下前400块发送的最多垃圾行",
        "Adversity favors the resourceful.": "逆境于智者有益。",
        TALENTLESS: "无才",
        'highest floor discovered while using the "All-Spin" mod without performing any Spins': "在启用“All-Spin”模组且不使用任何特殊旋转的情况下抵达的最高层数",
        "Reaching deep down but coming back empty every time.": "藏锋守拙，从不出手。",
        '"SWAMP WATER LITE"': "“沼泽水特调Lite”",
        '"THE STARVING ARTIST"': "“绝处逢生”",
        '"Comes in 8 different flavors!"': "有 8 种不同口味！",
        '"BLOCK RATIONING"': "方块配给专家",
        '"Adversity favors the resourceful."': "逆境于智者有益。",
        '"TALENTLESS"': "无才",
        '"Reaching deep down but coming back empty every time."': "藏锋守拙，从不出手。",
        '"DEADLOCK"': "“僵局”",
        '"SWAMP WATER"': "“沼泽水特调”",
        '"THE GRANDMASTER"': "“方块大师”",
        '"THE ESCAPE ARTIST"': "“金蝉脱壳”",
        '"EMPEROR\'S DECADENCE"': "“皇帝的懦弱”",
        '"DIVINE MASTERY"': "“天纵奇才”",
        '"A MODERN CLASSIC"': "“现代经典”",
        '"TRAINED PROFESSIONALS"': "“专业团队”",
        "EXPERT DUO": "专家级双人模式",
        'highest floor discovered while using the "No Hold", "Double Hole Garbage" and "Messier Garbage" mods': "在启用“禁止暂存”、“空洞诅咒”和“垃圾之乱”模组的情况下抵达的最高层数",
        '"Escape has become a distant dream, yet still we struggle..."': "“纵使已经深陷泥潭，我们仍会挣扎到最后一刻...”",
        "THE GRANDMASTER": "方块大师",
        'highest floor discovered while using the "Gravity" and "Invisible" mods': "在启用“重力”和“隐形”模组的情况下抵达的最高层数",
        "When the world descends into chaos, the grandmaster remains at peace.": "纵使世界混乱，大师亦巍然不动。",
        "THE ESCAPE ARTIST": "金蝉脱壳",
        '"An impossible situation! A daring illusionist! Will he make it out alive?"': "“绝对不可能逃脱的处境加上一个大胆的魔术师！他能创造奇迹吗？”",
        'garbage lines cleared using Spins while using the "Double Hole Garbage", "Messier Garbage" and "All-Spin" mods': "在启用“空洞诅咒”，“垃圾之乱”和“ALL-SPIN”模组的情况下消除的垃圾行数",
        "EMPEROR'S DECADENCE": "皇帝的懦弱",
        'highest floor discovered while using the "Expert Mode", "Double Hole Garbage" and "No Hold" mods': "在启用“专家模式”，“空洞诅咒”和“禁止暂存”模组的情况下抵达的最高层数",
        "The Devil's lesson in humility.": "吃一堑，长一智。",
        "DIVINE MASTERY": "天纵奇才",
        'highest floor discovered while using the "Expert Mode", "Double Hole Garbage", "Volatile Garbage" and "Messier Garbage" mods': "在启用“专家模式”，“空洞诅咒”，“达摩克利斯之剑”和“垃圾之乱”模组的情况下抵达的最高层数",
        "The universe is yours.": "天下任你闯。",
        TEMPERANCE: "节制",
        'highest floor discovered with the "No Hold" mod': "在启用“禁止暂存”模组的情况下抵达的最高层数",
        "Use each piece as they come and embrace the natural flow of stacking.": "随块而动，随意而堆，块法自然。",
        "WHEEL OF FORTUNE": "命运之轮",
        'highest floor discovered with the "Messier Garbage" mod': "在启用“垃圾之乱”模组的情况下抵达的最高层数",
        "The only constant in life is change.": "计划赶不上变化。",
        "A MODERN CLASSIC": "现代经典",
        'highest floor discovered while using the "No Hold" and "Gravity" mods': "在启用“禁止暂存”和“重力”模组的情况下抵达的最高层数",
        "Times were different back then...": "大人，时代变回去了...",
        "THE DEVIL": "恶魔",
        'highest floor discovered with the "Double Hole Garbage" mod': "在启用“空洞诅咒”模组的情况下抵达的最高层数",
        "Redefine your limits or succumb to his chains.": "突破极限或屈服于他的枷锁。",
        "THE TOWER": "高塔",
        'highest floor discovered with the "Gravity" mod': "在启用“重力”模组的情况下抵达的最高层数",
        "What will you do when it all comes crumbling down?": "当万块倾倒而下，你会做些什么？",
        "THE HERMIT": "隐士",
        'highest floor discovered with the "Invisible" mod': "在启用“隐形”模组的情况下抵达的最高层数",
        "When the outside world fails you, trust the voice within to light a path.": "自助者，天助之。",
        "THE MAGICIAN": "魔术师",
        'highest floor discovered with the "All-Spin" mod': "在启用“All-Spin”模组的情况下抵达的最高层数",
        "Inspiration is nothing short of magic.": "灵感就是你的魔法。",
        "TRAINED PROFESSIONALS": "专业团队",
        'highest floor discovered in a DUO while both players are using the "Expert Mode" mod': "在启用“双人模式”模组且双方均启用“专家模式”模组的情况下抵达的最高层数",
        "Partners in expertise.": "处理方块我们在行。",
        "select a slot to feature an achievement on your profile": "选择一个槽位来在你的个人资料上展示一个成就。",
        "select an achievement to feature it, or select the slot again to cancel": "选择一个成就来展示，或者再次选择该槽位以取消展示。",
        "DETAIL ORIENTED": "精益求精",
        "Clear 40 LINES using as few inputs as possible": "使用尽可能少的输入完成40行挑战",
        "Theoretically efficient can quickly become gloriously impractical.": "“我有一个绝妙的想法，但块速太快，没做完！”",
        "AGAINST ALL ODDS": "迎难而上",
        "games won against players with higher TR": "战胜TR比你高的对手的场次",
        "Embrace the unexpected.": "我就是你的意外。",
        SUPERCHARGED: "浪涌增压",
        "highest Back-to-Back chain reached in Quick Play without any mods": "在不启用任何模组的快速游戏中达到的最高Back-to-Back连锁数",
        '"With this divine power, we\'ll be unstoppable!" —Mathis, Core Engineer': "“有了这种神力，我们将势不可挡！”——马蒂斯，核心工程师",
        "VIP LIST": "贵宾名单",
        "End the week on weekly leaderboards with a high rank. (+10pts to Top 3, +5pts to Top 10, +3pts to Top 25, +1pts to Top 100)": "以尽可能高的排名结算每周排行榜（前三名+10点，前十名+5点，前25名+3点，前100名加1点）",
        "Unparalleled luxury for a select few.": "您注定与众不同。",
        "REDACTED LIST": "⬛⬛名单",
        "AR lost from reworked achievements": "因重做成就而失去的AR数",
        "Shredded documents and blacked-out names.": "被撕碎的文件和被涂黑的名字。",
        "THE STARVING ARTIST": "绝处逢生",
        'highest floor discovered while using the "No Hold" and "All-Spin" mods': "在启用“禁止暂存”和“ALL-Spin”模组的情况下抵达的最高层数",
        "Creativity cultivated through limitation.": "在逆境中成长的创造力。",
        "GUARDIAN ANGEL": "守护天使",
        "highest altitude to perform a successful revive at": "完成救援的最高米数",
        "An angel's intervention.": "天使下凡。",
        "THE CON ARTIST": "瞒天过海",
        'highest floor discovered while using the "Expert Mode", "Volatile Garbage" and "All-Spin" mods': "在启用“专家模式”，“达摩克利斯之剑”和“ALL-Spin”模组的情况下抵达的最高层数",
        "Would the perfect lie not be an art worthy of admiration?": "完美的谎言难道不是一门值得钦佩的艺术吗？",
        "EMPTY BOX": "盒子空空",
        "True minimalism is the art of letting go.": "真正的极简主义是放手的艺术。",
        "highest BLITZ score obtained without using Hold": "在不使用暂存的情况下完成BLITZ挑战获得的最高分数",
        "THE TYRANT": "暴君",
        'highest floor discovered with the reversed "Expert Mode" mod': "在启用逆位“专家模式”模组的情况下抵达的最高层数",
        "Fear, oppression, and limitless ambition.": "恐惧、压迫，以及无限的野心。",
        "fear, oppression, and limitless ambition": "恐惧、压迫，以及无限的野心",
        ASCETICISM: "禁欲",
        'highest floor discovered with the reversed "No Hold" mod': "在启用逆位“禁止暂存”模组的情况下抵达的最高层数",
        "A detachment from even that which is moderate.": "对哪怕是中庸之物的疏离。",
        "a detachment from even that which is moderate": "对哪怕是中庸之物的疏离",
        "LOADED DICE": "灌铅之骰",
        'highest floor discovered with the reversed "Messier Garbage" mod': "在启用逆位“垃圾之乱”模组的情况下抵达的最高层数",
        "In a rigged game, your mind is the only fair advantage.": "在被操纵的游戏中，你的头脑是唯一合理的优势。",
        "in a rigged game, your mind is the only fair advantage": "在被操纵的游戏中，你的头脑是唯一合理的优势",
        FREEFALL: "自由下落",
        'highest floor discovered with the reversed "Gravity" mod': "在启用逆位“重力”模组的情况下抵达的最高层数",
        "The ground you stood on never existed in the first place.": "你所站立的地面在开始时不存在。",
        "the ground you stood on never existed in the first place": "你所站立的地面在开始时不存在",
        "LAST STAND": "背水一战",
        'highest floor discovered with the reversed "Volatile Garbage" mod': "在启用逆位“达摩克利斯之剑”模组的情况下抵达的最高层数",
        "Strength isn't necessary for those with nothing to lose.": "对那些一无所有的人来说，力量并不重要。",
        "strength isn't necessary for those with nothing to lose": "对那些一无所有的人来说，力量并不重要",
        DAMNATION: "天谴",
        'highest floor discovered with the reversed "Double Hole Garbage" mod': "在启用逆位“空洞诅咒”模组的情况下抵达的最高层数",
        "Neither the freedom of life or peace of death.": "生无自由，死无安宁。",
        "neither the freedom of life or peace of death": "生无自由，死无安宁",
        "THE EXILE": "放逐",
        'highest floor discovered with the reversed "Invisible" mod': "在启用逆位“隐形”模组的情况下抵达的最高层数",
        "Never underestimate blind faith.": "永远不要低估盲目的信仰。",
        "never underestimate blind faith": "永远不要低估盲目的信仰",
        "THE WARLOCK": "邪术师",
        'highest floor discovered with the reversed "All-Spin" mod': "在启用逆位“All-Spin”模组的情况下抵达的最高层数",
        "Into realms beyond heaven and earth.": "踏入超脱天地之境界。",
        "into realms beyond heaven and earth": "踏入超脱天地之境界",
        "THE HARBINGER": "先驱",
        "Reach floor 3 in all eight reversed mods": "在启用各个逆位模组的情况下抵达第三层",
        "Weathering the storm of an unfavorable future.": "承受着不利于未来的风暴。",
        COMPETITIVE: "竞争性",
        "This achievement grants extra Achievement Rating to those who place in its Top 100 leaderboard.": "此成就给进入前100的玩家提供额外的AR。",
        HIDDEN: "隐藏",
        "This achievement is only visible to the worthy.": "此成就仅对值得的人可见。",
        UNRANKED: "不予排名",
        "This achievement does not contribute to your Achievement Rating.": "此成就不予提供AR。",
        "this achievement does not have a leaderboard": "此成就不予提供排行榜",
        "GRAND AUDIENCE": "最佳观众",
        'Type a message containing "gg" within 10 seconds after spectating a Quick Play world record being broken': "在观看快速游戏世界纪录被打破后的10秒内在公共频道发送包含“gg”的信息",
        '"You\'re not gonna want to miss this one!" -Arena Ticket Scalper': "“您绝对不想错过这次精彩时刻！” -场馆黄牛",
        "": "",
        "": "",
        "": "",
        "": "",
        //举报相关文本
        REPORT: "举报",
        "please choose a category to report": "请选择向TETR.IO管理员报告",
        "to the TETR.IO moderators for. ": "的违规原因",
        "repeatedly placing false reports may result in a ban.": "重复进行假举报可能会导致封禁。",
        TOXICITY: "有害内容",
        "including, but not limited to toxicity, harassment, unsolicited direct messages, offensive content or bad language.": "包括但不限于有害内容、骚扰、未经请求的直接消息、冒犯性内容或粗言秽语",
        CHEATING: "作弊",
        "including, but not limited to cheating, botting, hacking or otherwise breaking the game or getting an unfair advantage.": "包括但不限于作弊、使用机器人、黑客手段或其他破坏游戏或获得不公平优势的行为。",
        MULTIACCOUNTING: "多个账户",
        "including, but not limited to smurfing, multiaccounting, boosting accounts, throwing games.": "包括但不限于：炸鱼、多开账户、恶意刷分、消极对局等",
        "NSFW/18+ CONTENT": "不宜公开浏览/18+内容",
        "including, but not limited to NSFW (not safe for work) avatars, banners, messages, etc.": "包括但不限于：不宜公开浏览的头像、横幅、信息等",
        SPAM: "垃圾信息",
        "including, but not limited to advertising, message flood, etc.": "包括但不限于广告、刷屏等",
        OTHER: "其他",
        "otherwise not listed abuse against the TETR.IO terms of service, such as users under the age of 13, or rules, such as impersonation.": "其他未列出的违反TETR.IO服务条款的滥用行为，包括但不限于未满13岁的用户、冒名顶替等。",
        CANCEL: "取消",
        //连接错误相关文本
        "CONNECTION ERROR": "连接错误",
        "a connection error has occured and the connection was closed unexpectedly.": "发生了连接错误，连接被意外关闭。",
        "check your internet connection and configuration.": "检查你的互联网连接和配置。",
        "this disconnect was detected to be caused by your network connection.": "系统检测到本次掉线由你的网络连接引起。",
        "SOCKET ID": "帐户ID",
        OK: "彳亍",
        //单人模式相关文本
        SOLO: "单人模式",
        "challenge yourself and top the leaderboards": "挑战自我，登上排行榜的榜首。",
        "press START to begin playing": "按下开始游戏进行游玩",
        //40行竞速相关文本
        "CLEAR 40 LINES!": "消除四十行！",
        "GO!": "开始！",
        "40 LINES": "40行竞速",
        "complete 40 lines as quickly as possible": "尽快消除40行",
        "clear 40 lines in the shortest amount of time possible.": "以最短的时间内消除40行",
        "score doesn't matter here, just go for the world record!": "得分在这里并不重要，尽力争取世界纪录吧！",
        "PERSONAL BEST": "个人最佳",
        OPTIONS: "选项",
        "pro mode": "专业模式",
        "alert on finesse fault": "非极简操作时播放音效提醒",
        "retry on finesse fault": "非极简操作时自动重新开始",
        "stride mode": "快速开局",
        ADVANCED: "高级设置",
        "left counter slot 1": "左侧信息栏槽位1",
        "left counter slot 2": "左侧信息栏槽位2",
        "left counter slot 3": "左侧信息栏槽位3",
        "left counter slot 4": "左侧信息栏槽位4",
        "right counter slot": "右侧信息栏槽位",
        DEFAULT: "默认设置",
        "use the default option": "使用默认设置",
        EMPTY: "空",
        "leave this slot empty": "留空该槽位",
        LINES: "行数",
        TIME: "时间",
        SCORE: "分数",
        "display the score in this slot": "在该槽位中显示得分",
        "SCORE (per piece)": "分数（每块）",
        "display the score and score per piece in this slot": "在该槽位中显示每次放置方块的得分",
        STOPWATCH: "秒表",
        "display the time passed in this slot": "在该槽位中显示此时已用时长时间",
        "display the amount of cleared lines in this slot": "在该槽位中显示已消除的行数",
        PIECES: "块",
        "display the amount of placed pieces and speed in this slot": "在该槽位中显示放置方块的数量和速度",
        INPUTS: "输入",
        "display the amount of buttonpresses in this slot": "在该槽位中显示按键按压量",
        FINESSE: "极简",
        "display your finesse in this slot": "在该槽位中显示你的极简率",
        "FINESSE (SMALLER)": "极简（较小）",
        "display your finesse in this slot (for use on the left-hand side)": "在该槽位中显示你的极简率（在左边显示）",
        HOLD: "暂存",
        "display the amount of held pieces in this slot": "在该槽位中显示暂存过的方块数量",
        "ALL CLEARS": "全消",
        "display the amount of ALL CLEARS in this slot": "在该槽位中显示全消的次数",
        "display the time remaining in this slot": "在该槽位中显示剩余时间",
        TIMER: "计时器",
        LEVEL: "等级",
        "display the current level in this slot": "在该槽位中显示当前等级",
        //BLITZ相关文本
        "TWO-MINUTE BLITZ": "两分钟BLITZ",
        GO: "开始",
        BLITZ: "BLITZ",
        "a two-minute race against the clock": "限时两分钟的打分挑战",
        "get as many points as possible within 2 minutes!": "在2分钟内获得尽可能多的分数！",
        "clear lines to level up and gain more points and speed!": "消行，升级，提速，打分！",
        "---default---": "---默认设置---",
        START: "开始游戏",
        //禅意模式相关文本
        ZEN: "禅意模式",
        "relax or train in this neverending mode": "用于放松或训练的无尽模式",
        "relax or train in a neverending mode! your progress is stored across games.": "在无尽模式中放松或训练！进度会在离开时保存。",
        "adjust the feel or help train using the ZEN SIDEBAR.": "使用禅意模式侧边栏调整心境或进行训练",
        "you can undo and redo placements with CTRL+Z and CTRL+Y!": "你可以用CTRL+Z和CTRL+Y来撤销和重做!",
        //禅意模式局内的文本
        "hover to change settings": "悬停以改变设置",
        LEVELING: "升级",
        SPINS: "旋转方式",
        "KICK TABLE": "旋转系统",
        "COMBO TABLE": "连击表",
        MULTIPLIER: "倍增",
        "CLASSIC GUIDELINE": "经典规则",
        "MODERN GUIDELINE": "现代规则",
        GRAVITY: "重力",
        SUBZERO: "反重力",
        RELAXED: "弱重力",
        ENGAGING: "中重力",
        SPICY: "高重力",
        STATIC: "超重",
        DISPLAY: "显示",
        VERSUS: "对战",
        SPEED: "速度",
        EFFICIENCY: "效率",
        GARBAGE: "垃圾行",
        "BACKFIRE 0.5X": "攻击反弹 0.5倍",
        "BACKFIRE 1X": "攻击反弹 1倍",
        "BACKFIRE 2X": "攻击反弹 2倍",
        "CHEESE LAYER": "奶酪层",
        "layer height": "层高",
        "timer interval": "定时器时间间隔",
        "CHEESE TIMER": "奶酪定时器",
        "UNCLEAR 0.5X": "无抵消 0.5倍",
        "UNCLEAR 1X": "无抵消 1倍",
        "UNCLEAR 2X": "无抵消 2倍",
        "static gravity": "静态重力",
        "cheese messiness %": "垃圾行混乱率",
        NONE: "无",
        //自定义单机相关文本
        CUSTOM: "自定义",
        "play, train and experiment by your rules": "按照自定义的规则进行游戏、训练和实验",
        "play as you wish! replays are not submitted.": "尽情游戏！回放不会被记录",
        OBJECTIVE: "目标",
        "Disable combo chaining": "禁用连击增伤",
        'use random seed (overrides "seed")': "使用随机种子（覆盖种子）",
        seed: "种子",
        SURVIVAL: "生存",
        mode: "模式",
        "garbage messiness %": "垃圾行混乱度",
        "do not spawn any garbage": "不生成任何垃圾行",
        LAYER: "层数",
        "spawn garbage on a timer": "定期生成垃圾行",
        "keep a layer of garbage on the board": "保留一层垃圾行",
        "sticky layer": "粘连层",
        "minimum layer height": "最小层数高度",
        "infinite movement": "无限操作",
        "GRAVITY & LEVELLING": "重力和等级",
        'use levelling (overrides "gravity")': "使用等级系统（覆盖重力设置）",
        "use master levels": "使用MASTER等级",
        "starting level": "起始级别",
        "level speed": "等级速度",
        'use static levelling (overrides "level speed")': "使用静态级别（覆盖等级速度）",
        "level static speed": "静态等级速度",
        "base gravity": "基础重力",
        "allow retry": "允许重新开始",
        "recieve bonuses for spinning all pieces. non T-SPINS attacks are halved. pieces use 4-corner detection": "旋转所有方块可以获得额外攻击。非T旋攻击减半。方块使用四角检测",
        key: "按键", //?
        "final score will be displayed": "最终得分将会显示",
        "final time will be displayed": "最终时间将会显示",
        "final line count will be displayed": "最终行数将会显示",
        "play infinitely": "无限制模式",
        "get to a set amount of lines to clear": "达到设定的消除行数",
        "play for a set amount of time to clear": "在设定的时间内进行游戏并尽可能消除方块",
        "get to a set amount of garbage lines to clear": "达到设定的垃圾行消除数",
        TIMED: "计时模式",
        time: "时间",
        count: "计数",
        "topping out is OK": "允许顶出",
        "display objective behind board": "在游戏板块后面显示目标",
        INTRO: "简介",
        mission: "任务",
        "play countdown": "播放倒计时",
        "countdown count": "倒计时计数",
        "countdown interval": "倒计时间隔",
        "time before countdown": "倒计时开始前的等待时间",
        "time before start": "游戏开始前的等待时间",
        "zoom animation": "缩放动画",
        "NO ANIMATION": "没有动画",
        "display no animation": "不显示动画",
        "display a fast animation": "显示快速动画",
        "display a slow animation": "显示慢速动画",
        CINEMATIC: "电影级动画",
        "display a very slow animation": "显示非常慢的动画",
        META: "META",
        COUNTERS: "信息栏",
        "enforce absolute line count": "强制执行绝对行计数",
        "display progress bar": "显示进度条",
        "display the time remaining in this slot (for TIMED objective)": "在这个槽位中显示此时剩余的时间（用于限时目标）",
        "GARBAGE CLEARED": "已清理垃圾行",
        "display the amount of garbage lines cleared in this slot": "在这个槽位中显示已消除的垃圾行数",
        //设置内文本
        CONFIG: "设置",
        "tweak your":"调整你的",
        "tweak your <>TETRIO<> experience": "调整<>TETRIO<>游戏体验",
        "tweak your settings for a better": "调整设置以享受更好的",
        experience: "游戏体验",
        "DESKTOP V": "桌面客户端 V",
        "you are using the desktop client! you can adjust its extra options on this page:": "你正在使用桌面客户端！您可以在本页面调整附加选项",
        "• hit F11 to go FULL SCREEN": "• 按F11进入全屏模式",
        "• hit F5 to reload": "• 按F5重新加载",
        "• hit CTRL+SHIFT+I to open the CONSOLE": "• 按CTRL+SHIFT+I打开控制台。",
        "as well as edit options you see below": "以及你在下面看到的编辑选项",
        OPTIONS: "选项",
        "SKIP LOGIN SCREEN": "跳过登录界面",
        NEVER: "从不",
        "WHEN NEEDED": "在需要时",
        ALWAYS: "总是",
        "enable HARD VSYNC": "启用垂直同步",
        "FRAMERATE LIMITER": "帧数限制器",
        "VSYNC (CAP FRAMERATE TO OUTPUT)":"启用垂直同步",
        "INSTALL UPDATES AUTOMATICALLY IF POSSIBLE":"启用自动更新",
        "enable DISCORD RICH PRESENCE": "启用DISCORD RICH PRESENCE功能。",
        "flash taskbar icon": "任务栏图标闪烁",
        "streamer compatibility mode (slow!)": "直播串流兼容模式（慢！）。",
        "disable third-party advertisements": "禁用第三方广告",
        "EXIT TETR.IO?": "退出TETR.IO？",
        "i'm a grinch (disable most holiday cheer)": "我是格林奇 （禁用节日特效）",
        "add salt to the board (prevent snow accumulating on it)": "在方块上撒点盐（雪不会堆积在方块上）",
        "CHANGE SETTINGS FOR": "设置",
        "": "",
        "": "",
        //键位文本
        CONTROLS: "键位",
        "forfeit game": "退出游戏",
        "retry game": "重新开始",
        "open chat": "打开聊天框",
        "pick targeting strategy": "选择瞄准目标策略",
        "move in menus": "移动菜单",
        "confirm in menus": "在菜单中确认",
        "back in menus": "返回菜单中",
        "open social overlay": "打开好友列表",
        "controllers can be set up in CUSTOM controls - just press the controller buttons you wish to bind.": "手柄键位可以在自定义中设置 - 只需点击想要更改的键位并按下你想绑定的按键。",
        "controller sensitivity": "按键灵敏度",
        "vibration intensity": "振动强度",
        "targeting strategy even": "瞄准策略:平均",
        "targeting strategy eliminations": "瞄准策略：追击",
        "targeting strategy random": "瞄准策略：随机",
        "targeting strategy payback": "瞄准策略：反击",
        WEAK: "弱",
        STRONG: "强",
        LOW: "低",
        HIGH: "高",
        "[NOT SET]": "[未设置]",
        "hover over a setting for more info": "将鼠标悬停在设置名称上查看详细说明",
        "change account settings": "更改账户设置",
        "targeting strategy 1": "瞄准策略1",
        "targeting strategy 2": "瞄准策略2",
        "targeting strategy 3": "瞄准策略3",
        "targeting strategy 4": "瞄准策略4",
        "press any key or button": "按任何按键以绑定键位",
        "click anywhere to remove the keybind": "点击任何地方都可以删除绑定的按键",
        "menus: up": "菜单：上",
        "menus: down": "菜单：下",
        "menus: left": "菜单：左",
        "menus: right": "菜单：右",
        "menus: confirm": "菜单：确定",
        "menus: back": "菜单：返回",
        "move falling piece left": "向左移动",
        "move falling piece right": "向右移动",
        "soft drop": "软降",
        "hard drop": "硬降",
        "rotate counterclockwise": "逆时针旋转",
        "rotate clockwise": "顺时针旋转",
        "rotate 180": "180度旋转",
        "swap hold piece": "暂存方块",
        //移动灵敏度文本
        HANDLING: "移动灵敏度",
        SLOW: "慢",
        FAST: "快",
        "prevent accidental hard drops": "防止误操作硬降",
        "cancel DAS when changing directions": "改变方向时取消DAS",
        "prefer soft drop over movement": "保持软降优先于移动",
        RESET: "重置",
        TEST: "测试",
        "ROTATION BUFFERING (IRS)": "预输入旋转 (IRS)",
        "HOLD BUFFERING (IHS)": "预输入暂存 (IHS)",
        //音乐及音效相关文本
        "VOLUME & AUDIO": "音乐及音效",
        MUSIC: "音乐",
        SFX: "音效",
        BGM: "音乐",
        stereo: "立体声",
        "scroll to change volume": "使用鼠标滚轮调整音量",
        "mute music when hidden": "最小化窗口时静音",
        "hear next pieces": "下一块音效",
        "hear other players": "其他玩家的音效",
        "hear attacks": "攻击音效",
        "hear climb speed changes":"爬升速度变化音效",
        "do not reset music when retrying": "重新开始时不重置音乐",
        "disable sound entirely": "关闭全部声音",
        QUIET: "静",
        LOUD: "响",
        "NO STEREO": "无立体声",
        "SUPER STEREO": "超级立体声",
        "TWEAK MUSIC": "曲库",
        "select how often you want each song to be picked here, or ban songs if you so desire. click a song's title to play it.": "选择你希望每首歌曲在这里被挑选的频率，或者如果你希望的话，可以禁止歌曲播放。",
        //局内设置相关文本
        GAMEPLAY: "局内设置",
        "ACTION TEXT": "特殊攻击文本特效",
        OFF: "关/零重力",
        SOME: "部分",
        ALL: "所有",
        "board bounciness": "框体弹性",
        STIFF: "固定",
        BOUNCY: "弹跳",
        SHAKY: "抖动",
        "damage shakiness": "受击震动",
        "grid visibility": "网格能见度",
        "board visibility": "背景能见度",
        TRANSPARENT: "透明",
        "shadow visibility": "影子能见度",
        OPAQUE: "不透明",
        "board zoom": "场地尺寸",
        FAR: "远",
        NEAR: "近",
        "show duels side-by-side": "启用1v1时并排显示场地",
        "spin board when you T-spin": "启用T-Spin时旋转场地",
        "alert me when i KO someone": "启用KO对手时提示",
        "enable the fire meter": "启用火力计",
        "warn me when i'm in danger": "启用濒死警告",
        "colored shadow piece": "启用彩色影子",
        "gray out locked HOLD piece": "启用灰色锁定暂存方块",
        //视频与界面相关文本
        "VIDEO & INTERFACE": "视频与界面",
        GRAPHICS: "图形",
        MINIMAL: "极低",
        MEDIUM: "中等",
        ULTRA: "极高",
        CACHING: "缓存",
        OFF: "关",
        BALANCED: "均衡",
        AGGRESSIVE: "激进",
        "particle count": "特效粒子数量",
        FEW: "少",
        LOTS: "多",
        "background visibility": "背景能见度",
        "bloom filter power": "布隆过滤器",
        "chromatic aberration": "色差",
        "flashwave power": "闪光强度",
        make: "使",
        "run slowly to keep other programs running smoothly": "较慢运行以防使其他程序卡顿",
        "render at a low resolution": "低分辨率渲染",
        "less precision on counters": "低精度计时器",
        "always simplify multiplayer thumbnails": "始终简化多人模式缩略图",
        "do not animate background in super lobbies": "禁用超级房间内滚动显示玩家",
        "do not animate background in quick play": "禁用快速游戏中的背景动画",
        "no background in menus": "关闭菜单背景",
        "filter profanity in chat": "过滤聊天中的脏话",
        "hide chat when ingame": "游戏中隐藏聊天栏",
        "hide room IDs": "隐藏房间ID",
        "show emotes in chat": "显示聊天内的表情",
        "show animated emotes in chat": "显示聊天内的动态表情",
        "invert chat colors": "聊天栏反色",
        "darken screen behind chat": "聊天栏暗色背景",
        "keep replay tools open": "一直显示回放工具栏",
        "hide network warning icons": "隐藏网络警告图标",
        "warn me when the game is not focused": "焦点不在游戏时提醒",
        "show the welcome guide": "显示新玩家引导",
        //通知相关文本
        "room configuration updated!":"房间设置已更新！",
        NOTIFICATIONS: "通知",
        "show desktop notifications": "推送系统通知",
        "suppress notifications while ingame": "禁止游戏中的通知",
        "always play notification sounds at full volume": "总是以全音量提示音效",
        "NOTIFY ME WHEN A FRIEND GOES ONLINE": "好友上线时提醒",
        INGAME: "在游戏中",
        "INGAME & DESKTOP": "在游戏中和桌面上",
        "NOTIFY ME WHEN A FRIEND GOES OFFLINE": "朋友下线时通知我",
        "NOTIFY ME WHEN A FRIEND SENDS ME A DIRECT MESSAGE": "当朋友向我发送直接信息时通知我",
        "NOTIFY ME WHEN SOMEONE INVITES ME TO A ROOM": "当有人邀请我加入一个房间时通知我",
        "OTHER NOTIFICATIONS": "其他通知",
        "NOTIFY ME WHEN A NON-FRIEND SENDS ME A DIRECT MESSAGE": "当陌生人直接给我发信息时通知我",
        //个性化相关文本
        CUSTOMIZATION: "个性化",
        "use custom background image": "使用自定义背景图片",
        //导出设置文本
        "EXPORT SETTINGS": "导出设置",
        "download a .TTC file of your config you can drag into": "下载一个存有设置的.TTC文件，你可以拖入",
        "to import":"导入设置",
        //加载文本
        "requesting orders…": "请求命令···",
        "requesting account data…": "正在请求账户数据···",
        "fetching TETRA LEAGUE data…": "获取TETRA 联赛数据中···",
        "joining room…": "加入房间中···",
        "leaving room…": "离开房间中···",
        "creating room…": "创建房间中···",
        "connecting to live servers…": "正在连接到服务器···",
        "SWITCHING SERVER": "正在切换服务器···",
        "SERVER SWITCHED": "服务器已切换",
        "YOU ARE ALREADY IN THE ROOM": "你已在该房间",
        "fetching records…": "获取记录中···",
        "fetching replay…": "获取回放中···",
        "fetching achievements…": "获取成就中···",
        "getting ready to spectate…": "正在准备旁观对局···",
        //账户相关文本
        ACCOUNT: "账户",
        "ORDER HISTORY": "历史订单",
        "view previous orders": "查看以前的订单",
        "SUPPORT OR GIFT": "支持或捐赠",
        "LOG OUT ALL": "登出所有",
        AVATAR: "头像",
        "a nice, 2MB max. image to represent yourself, or a generic identicon if none is chosen.": "用一张漂亮的、最大2MB的图片来作为你自己的头像，如果没有选择的话，可以选择一个通用的标识。",
        REMOVE: "移除",
        CHANGE: "更改",
        BANNER: "横标",
        "a nice, 2MB max. image to display behind your profile and": "一个漂亮的，最大2MB的图片，显示在你的个人资料后面，以及",
        userpage: "个人空间",
        ". target resolution is 1920x240.": ",图片目标分辨率为1920×240",
        "ABOUT ME": "关于我",
        COUNTRY: "地区",
        PRIVACY: "隐私",
        SAVE: "保存",
        "show total time played on my profile": "在我的个人资料中显示总游戏时长",
        "show # of online games won on my profile": "在我的个人资料中显示获胜的游戏对局数",
        "show # of online games played on my profile": "在我的个人资料中显示所玩的总游戏对局数",
        "show my country on my profile": "在我的个人资料中显示我的地区",
        "enable TETRA LEAGUE chat":"启用TETRA联赛聊天",
        "WHO CAN ADD ME AS FRIEND":"谁能加我为好友",
        "This does not apply retroactively.": "这并不具有追溯性。",
        "MY FRIENDS": "我的好友",
        EVERYONE: "所有人",
        "WHO CAN SEE WHETHER I'M ONLINE": "谁能看到我是否在线",
        'e.g. "Online", "Away", "Offline". People who cannot see whether you\'re online cannot invite you to rooms either.': "例如：“在线”、“离开”、“离线”。不能看到你是否在线的人也不能邀请你去房间。",
        NOBODY: "没有人",
        "WHO CAN SEE WHAT I'M DOING": "谁能看到我在做什么",
        'e.g. "Playing 40 LINES", "In TETRA LEAGUE queue", "In Menus"': "例如：“正在进行40行竞速”、“正在进行 TETRA 联赛”、“在主菜单中“",
        "WHO CAN SEE WHAT ROOM I'M IN": "谁能看到我在哪个房间",
        'e.g. "In QUICK PLAY lobby", "In a public custom room". People who can see what room you\'re in can also quickly join said room. Private rooms are always hidden.': "例如：”在快速游戏房间“、”在公开自定义房间“。能看到你在哪个房间的人也能迅速加入这个房间。私人房间总是隐藏的。",
        "WHO CAN SEND ME DIRECT MESSAGES": "谁可以直接给我发信息",
        "WHO CAN SEND ME INVITES TO ROOMS": "谁可以直接邀请我进房间",
        USERNAME: "用户名",
        "this is the name you will show up to others as.": "这是你在别人面前显示的名字。",
        EMAIL: "电子邮箱",
        "this email account will be used for secure account actions, like account recovery.": "这个电子邮件账户将被用于安全的账户操作，如账户恢复。",
        "you do not currently have an email set. if you lose your password, your account cannot be recovered!": "你目前没有设置电子邮件。如果你丢失了密码，你的账户就无法恢复了",
        PASSWORD: "密码",
        "you can change the password used to log in here.": "你可以在这里更改用于登录的密码。",
        "TWO-FACTOR AUTHENTICATION": "双重身份验证",
        "two-factor authentication is": "双重认证",
        "NOT ENABLED": "未启用",
        ENABLE: "启用",
        "RESET RECOVERY CODES": "重置恢复代码",
        DISABLE: "暂停使用",
        CONNECTIONS: "连接",
        "link other accounts with TETR.IO here, or remove them at any time.": "在此链接其他账户与TETR.IO，或随时删除它们。",
        LINK: "链接",
        REMOVE: "移除",
        "display publicly": "公开展示",
        "write a little something about yourself to display on": "写点关于你自己的东西，展示在",
        "your userpage": "你的个人空间",
        ", or leave this blank to disable. simple markdown allowed.": "，或留空禁用。允许简单的标记。",
        "Direct messages from non-friends show up on the NON-FRIENDS tab in the social overlay.": '来自陌生人的直接信息显示在社交叠加中的"陌生人"标签上。',
        "To be able to send you an invite, others will also need to be able to see whether you're online.": "为了能够向你发出邀请，其他人也需要能够看到你是否在线。",
        "ENABLE TWO-FACTOR AUTHENTICATION": "启用双重身份验证",
        "generating tokens…": "正在生成令牌…",
        "scan the following QR code with your favourite authenticator app (like AUTHY or GOOGLE AUTHENTICATOR), then enter the six-digit code into the box below to enable two-factor authentication":
        "使用您喜欢的验证器应用程序（如AUTHY或GOOGLE authenticator）扫描以下二维码，然后在下面的框中输入六位代码以启用双重身份验证",
        "BAD STANDING": "信誉不佳",
        "one or more recent bans on record": "近一次或多次有违禁行为",
        "ONE OR MORE RECENT BANS ON RECORD": "近一次或多次有违禁行为",
        BANNED: "账号封禁中",
        "this user is currently banned. bans are placed when TETR.IO rules or terms of service are broken.": "由于违反TETR.IO规则，该账号目前处于封禁状态",
        "ANONYMOUS ACCOUNT":"匿名账号",
        "Anonymous accounts have no meaningful statistics and cannot save replays.":"匿名账号没有有意义的统计数据，也无法保存回放。",
        "Information about this user is temporarily unavailable.":"目前无法获取此用户的相关信息。",
        "BOT ACCOUNT":"机器人账号",
        "This is an approved bot account. Bots that do not have this tag are banned on sight, together with their creators.":"这是一个已获批准的机器人账号。未标注此标签的机器人及其创建者一经发现即被封禁。",
        "This bot is operated by":"该机器人的作者是",
        //关于相关文本
        ABOUT: "关于",
        "all about":"关于",
        "thank you for playing": "感谢游玩",
        //其他文本
        "pick a game mode": "选择游戏模式",
        "KEEP HOLDING TO FORFEIT": "长按退出",
        "KEEP HOLDING TO RETRY": "长按重试",
        "WINNER!": "获胜！",
        "OUT OF FOCUS": "失去焦点",
        "click to return to TETR.IO": "点击回到TETR.IO",
        "replay will not be saved": "回放将不会被保存",
        MANUAL: "手册",
        "WINNER THIS ROUND": "本轮胜者",
        bgm: "音乐",
        "TETR.IO DESKTOP should open soon!": "TETR.IO 桌面版应该很快就会打开!",
        "you can close this tab once it has opened": "你可以在该标签打开后关闭它",
        "WHAT'S NEW": "更新内容：",
        "Like this update? Please consider <>supporting TETR.IO development<>!": "喜欢这个更新吗？请考虑<>支持TETR.IO开发工作<>！",
        "ALL PATCH NOTES": "全部更新日志",
        "COOL!": "酷诶！",
        CLOSE: "关闭",
        BACK: "返回",
        HOME: "主页",
        EXIT: "退出",
        "an update is required to connect to multiplayer servers. click here to update!": "需要更新以连接到多人游戏服务器。点击这里进行更新！",
        //包含特殊文字
        "Ǳ LEADERBOARDS": "Ǳ 排行榜",
        "Ǳ VIEW FULL": "Ǳ 查看完整排行榜",
        "Ǳ VIEW FULL PROFILE": "Ǳ 查看完整资料",
        "Ǳ MY PAGE": "Ǳ 我的空间",
        "ǹ REMOVE": "ǹ 移除",
        "ǹ CHANGE": "ǹ 更改",
        "ǹ SAVE": "ǹ 保存",
        "ǹ CHANGE": "ǹ 更改",
        //好友系统相关文本
        PEOPLE: "好友",
        "In a": "处于一场",
        "In an": "处于一场",
        "In a private": "处于一场私人",
        online: "在线",
        Online: "在线",
        Spectating: "正在旁观",
        "Nobody's online right now.": "当前没有好友在线",
        private: "私人",
        In: "处于",
        "In a public": "处于一场公开",
        queue: "匹配中",
        "custom room": "自定义房间",
        game: "对局",
        "Spectating a": "正在旁观一场",
        Blocked: "拉黑",
        UNBLOCK: "解除拉黑",
        ONLINE: "在线",
        lobby: "大厅",
        GLOBAL: "全球",
        FRIEND: "加为好友",
        MESSAGE: "发消息",
        ANONYMOUS: "匿名",
        "You haven't added any friends yet. Click the FRIEND button on a profile to friend them.": "您还没有添加任何好友。单击他人资料页上的“加为好友”按钮即可将其加为好友",
        "If someone outside of your friends list messages you, they'll appear here.": "如果有在你好友名单之外的人给你发信息，他们会出现在这里。",
        "Not connected to online servers. Sit tight, we'll try to reconnect you in the background.": "没有连接到在线服务器。稍等片刻，我们会尝试在后台进行重连。",
        "Notifications will appear here.": "这里会显示通知。",
        "In Menus": "在主菜单中",
        "appear as usual": "表示你一切正常",
        AWAY: "离开",
        "appear away, unless you're offline or busy": "显示离开，表示你不在线或很忙",
        BUSY: "正忙",
        "appear busy, unless you're offline. receive no notifications. always enabled in TETRA LEAGUE (unless you're invisible)": "显示很忙，除非你是离线的。不会收到任何通知。在TETRA 联赛中总是启用（除非你隐身了）",
        INVISIBLE: "隐形",
        "appear offline at all times": "始终处于离线状态",
        REPLAY: "回放",
        LIVE: "直播",
        grid: "网格",
        "You forfeited a ranked match": "你放弃了一场排位赛",
        "You have been awarded a loss for this match. Please ensure you have the time and internet connection to play! Repeated forfeits are punished (and will be automatically punished in the future). Thank you for understanding!":
            "你在这场比赛中被判为落败。请确保你有充裕的时间和良好的网络连接来进行比赛! 屡次弃权将受到惩罚（今后将自动受到惩罚）。感谢您的理解!",
        "Spectating a private": "旁观一场私人",
        "Spectating a public": "旁观一场公开",
        "friends list": "好友列表",
        "has added you to their": "已将您加入到TA的",
        has: "已经",
        "friended you back": "互相加为好友",
        Offline: "离线",
        "invited you to": "邀请你",
        "Please be civil. Staff will never ask for your credentials.": "请文明交流。官方永远不会索要您的个人信息。",
        ONLINE: "在线",
        Away: "离开",
        Playing: "正在玩",
        Busying: "正忙",
        "has come online": "上线了",
        "has gone offline": "下线了",
        "online now": "在线",
        "Ending a": "正在结算一场",
        "Ending a private": "正在结算一场私人",
        "You haven't blocked anyone yet.": "你还没有拉黑任何人。",
        BLOCKED: "黑名单",
        "Nobody's online right now": "现在没有人在线",
        "connected to server": "连接到服务器",
        "Ending an": "正在结算一场",
        PROFILE: "个人资料",
        "Couldn't find anyone like that.": "找不到该玩家",
        GIFT: "赠送",
        "- MUTUAL FRIENDS": " - 双向好友",
        "YOUR GIFT HAS BEEN SENT TO": "您的礼物已经赠送给了 ",
        "Thank you very,": " ",
        "much for gifting Supporter — their benefits should be applied instantly. With your support, I can keep developing TETR.IO as we both love it. You're awesome!": "赠送了Supporter - 这将立即生效，有了您的支持，我可以继续开发我们喜爱的TETR.IO，最后再次致以我最诚挚的感谢！",
        "THANK YOU FOR GIFTING!": "感谢您的赠送！",
        very: "非常",
        "has gifted you": "已经赠送您了",
        "": "",
        "": "",
        "": "",
        "": "",
        "": "",
        "": "",
        "": "",
        //错误相关文本
        "DEVELOPMENT BUILD": "开发版本",
        "if you have the feeling you're not supposed to be here, get out": "如果你觉得你不应该在这里，那就出去吧",
        "error loading TETR.IO": "加载TETR.IO出错",
        "an error has occured when trying to load TETR.IO. this usually means your browser does not support TETR.IO.": "加载TETR.IO时发生了一个错误。这常常意味着你的浏览器不支持TETR.IO。",
        "we support the following browsers:": "我们支持以下浏览器：",
        "using TETR.IO desktop? this usually means something's very wrong (usually at TETR.IO's side). hit the button below to reload.": "使用TETR.IO的桌面客户端？这通常意味着有些东西很不对劲（通常在TETR.IO这边）。点击下面的按钮重新加载。",
        RELOAD: "重新加载",
        "TETR.IO requires WEBGL": "TETR.IO需要WEBGL",
        "it seems WEBGL is disabled in your browser. WEBGL is required for the game to render properly.": "看来你的浏览器禁用了WEBGL。游戏需要WEBGL才能正常渲染。",
        "please check your browser settings to ensure HARDWARE ACCELERATION is enabled in your browser, then try again. if that doesn't work, try upgrading your browser.": "请检查您的浏览器设置，确保您的浏览器启用了硬件加速功能，然后再试一次。如果不行，请尝试升级您的浏览器。",
        "TETR.IO DESKTOP is automatically set up to bring the smoothest experience, with far better performance and less setup hassle. install it with the button below!": "TETR.IO桌面客户端的自动设置带来了最流畅的体验，具有更好的性能和更少的设置麻烦。用下面的按钮安装它!",
        "already on desktop? you may need to restart your device.": "使用的已经是桌面版了？你可能需要重新启动设备。",
        "GET TETR.IO DESKTOP!": "下载TETR.IO桌面客户端！",
        "this ban only covers your network (IP). your account is": "这个禁令只包括你的网络（IP）。你的账户是",
        "not banned": "没有被禁用的",
        "! please turn off any VPN/proxy, and/or try from a different network. in most cases, ": "请关闭任何VPN/代理，尝试不同的网络环境，多数情况下可解决",
        "support cannot help you here.": "赞助对解除封禁无效。",
        "if you believe you were banned in error,": "如果你认为你被封禁是错误的，",
        "YOU HAVE BEEN BLOCKED FROM TETR.IO": "您已被阻止进入 TETR.IO 网站",
        "A connection error has occured": "发生了一个连接错误",
        "GAME CANCELLED": "对局中止",
        "THIS GAME WAS CANCELLED BECAUSE A PLAYER HAS LEFT.YOUR RATING WILL NOT BE ADJUSTED.": "由于一名玩家中途退出，本局游戏已中止。你的评分不会受到调整。",
        //活动
        EVENT: "活动",
        LEGACY: "遗留",
        "ROLLING THE SNOWMAN": "滚动的雪雪弗斯",
        'highest floor discovered with the "Snowball Board" mod': "在启用“雪球版面”模组下抵达的最高层数",
        '"No matter how many times you\'re rolled, we all melt in the end." —Snowcrates': "“无论如何努力，冰雪终会融化。” —雪雪弗斯",
        "LIMITED TIME EVENT": "限时活动",
        "SNOWBALL BOARD": "雪球版面",
        "start with a 4x4 board, then roll it larger and larger": "从4X4的版面开始，然后越滚越大！",
        "Play with this": "游玩",
        "all-new mod": "全新模组",
        "and level up the limited": "以获取并升级",
        "Rolling The Snowman": "滚动的雪雪弗斯",
        "achievement.": "成就。",
        "EVENT ENDS IN": "活动结束倒计时：",
        DAYS: "天",
        "At the end of the year, your rank in the achievement will grant you a": "本年度结束时，将会以您的该成就排名会奖励您一个",
        "special badge": "特别徽章",
        "This achievement was part of the December 2024 event. It is no longer available.": "此成就是2024年12月的一部分。它将不再可用。",
        "LOVERS' PROMISE": "真爱之誓",
        "highest altitude reached with your TETR.IO Valentine": "和你的TETR.IO情人一起攀登的最高米数",
        "The impossible promise of an eternity just like this moment.": "沧海桑田，此瞬永恒。",
        "BLEEDING HEARTS": "血心鉴誓",
        'highest floor discovered with the reversed "Duo" mod': "在启用逆位双人模式的情况下抵达的最高层数",
        "Even as we bleed, we keep holding on...": "即使我们遍体鳞伤，依然互助前行...",
        "This achievement was part of the Lover's Day 2025 event. It is no longer available.": "该成就是 2025 年情人节活动的限定成就之一。现已不可获取。",
        "THE FOOL": "愚者",
        'highest floor discovered with the "PENTR.IO" mod': "在启用“PENTR.IO”模组下抵达的最高层数",
        "A journey of one thousand six hundred fifty meters starts with a single step.": "1650米的旅程始于一小步。",
        "A FOOL'S ERRAND": "愚昧的徒劳",
        'Escape floor 1 while using the reversed "PENTR.IO" mod': "在启用“PENTR.IO”模组下抵达第二层",
        "You'll never escape who you are.": "你永远无法改变你是谁。",
        "you'll never escape who you are": "你永远无法改变你是谁",
        "": "",
        "": "",
        "": "",
        "": "",
        "": "",
        //周边
        MERCH: "周边",
        "Welcome to the official TETR.IO merch store": "欢迎光临 TETR.IO 官方商城",
        "You've found the place for all official TETR.IO goodies. Do check out the collection at your leisure!": "你发现了 TETR.IO 官方的所有好物。请在闲暇时查看这些收藏品！",
        "ORIGINAL SOUNDTRACK": "原声音乐",
        "Zenith Tower - TETR.IO Original Soundtrack": "天顶之塔 - TETR.IO 原声音乐",
        "Listen to all the tracks from TETR.IO's Quick Play 2 gamemode in lossless quality, together with additional goodies like sheet music, a piano version and full stems!": "以无损音质聆听 TETR.IO 快速游戏 2 模式中的所有曲目，还有乐谱、钢琴版和完整音轨等其他好东西！",
        "Holidays 2023 - TETR.IO Original Soundtrack": "2023 节日 - TETR.IO 原声音乐",
        "As a 2023 holidays special, our programmer, sound designer and composer Dr Ocelot has created two very special tracks, a main menu remix and a new Blitz song! Remastered in 2024.":
            "作为 2023 年的节日特辑，我们的程序员、音效设计师和作曲家 Ocelot 博士创作了两首非常特别的曲目，其中一首是主菜单混音版音乐，另一首是新的Blitz音乐！在2024 年重新制作。",
        "Holidays 2024 - TETR.IO Original Soundtrack": "2024 节日 - TETR.IO 原声音乐",
        "TETR.IO once again gets a festive makeover, which wouldn't be complete without a new soundtrack! Including new renditions of the 2023 tracks, as well as new tracks for the limited-time Snowball Board event!":
            "TETR.IO 在节日期间再次改头换面，如果没有新的配乐，那就太不COOOOOL了！包括 2023 曲目的全新演绎，以及限时活动雪球版面的新曲目！",
        "Free download": "免费下载",
        "": "",
        "": "",
        "": "",
        "": "",
        "": "",
        "": "",
        "": "",
        "": "",
        "": "",
        "": "",
        "": "",
        "": "",
        "": "",
        "": "",
        "": "",
    };

    // 悬停文本
    const tooltipMap = {
        "Get TETR.IO Desktop": "下载TETR.IO桌面客户端",
        "Get TETR.IO Desktop - the official desktop client": "下载TETR.IO官方桌面客户端",
        "Follow TETR.IO on Twitter - be the first to hear about updates": "在Twitter上关注TETR.IO——率先了解更新",
        "Join the TETR.IO Discord - follow updates, give feedback and have fun": "加入TETR.IO Discord——关注更新、提供反馈并享受乐趣",
        "View the TETR.IO issue tracker - report bugs and pitch ideas to improve TETR.IO": "查看TETR.IO问题追踪器——报告错误并提出改进TETR.IO的想法",
        "Support TETR.IO or gift supporter and get cool benefits!": "支持TETR.IO或赠送支持者身份并获得酷炫福利！",
        "Support TETR.IO or gift supporter status and get cool benefits!": "支持TETR.IO或赠送支持者身份并获得酷炫福利！",
        "Change the way you control TETR.IO": "改变你控制TETR.IO的按键",
        "Change the way TETR.IO feels": "改变你玩TETR.IO的手感",
        "Change the way TETR.IO sounds": "改变TETR.IO的声音",
        "Change the way TETR.IO functions": "改变TETR.IO的功能设置",
        "Change the way TETR.IO looks": "改变TETR.IO的视觉效果",
        "Change the way TETR.IO notifies you": "改变TETR.IO通知你的方式",
        "Add your own personal spin to TETR.IO": "为TETR.IO添加你自己的个人特色",
        "Log out on all devices.": "在所有设备上注销登录。",
        "Log out on this device.": "在当前设备上注销登录。",
        "Remove your avatar.": "删除你的头像。",
        "Set a new avatar.": "设置一个新头像",
        "Remove your banner.": "删除你的横标",
        "Set a new banner.": "设置一个新横标",
        "Save your new bio.": "保存你的新简介",
        "Change the country on display.": "改变显示的地区。",
        "The standard controls, as seen in many stacker games.": "标准控制，在许多方块游戏中都能看到。",
        "A WASD-based layout, that sets piece movement to the left hand and rotation to the right.": "基于WASD的布局，将方块的移动设置为左手，旋转设置为右手。",
        "Custom controls - set them as you wish.": "自定义控制--按你的意愿设置。",
        "For analog sticks and buttons, how sensitive the controls are.": "对于模拟摇杆和按键控制的灵敏度设置。",
        "For controllers, how powerful vibration is. Not all devices and browsers are supported.": "对于控制器来说，振动的力度有多大。不是所有的设备和浏览器都支持。",
        "Automatic Repeat Rate: the speed at which tetrominoes move when holding down movement keys, measured in frames per movement.": "自动重复速率：长按移动键时方块每移动一格所需的时间，单位为帧。",
        "Delayed Auto Shift: the time between the initial keypress and the start of its automatic repeat movement, measured in frames.": "自动移动延迟：从按下移动键到开始连续自动移动所需的时间，单位为帧。",
        "DAS Cut Delay: if not 0, any ongoing DAS movement will pause for a set amount of time after dropping/rotating a piece, measured in frames.": "DAS切断延迟，如果不为0，任何正在进行的DAS运动将在下落/旋转一个方块后暂停一段设定的时间，以帧计算。",
        "Soft Drop Factor: the factor with which soft drops change the gravity speed.": "软降系数：改变软降重力速度的系数。越大越快",
        "If enabled, when a piece locks on its own, the hard drop key becomes unavailable for a few frames. This prevents accidental hard drops.": "当方块自行锁定时，硬降键会有几帧无法使用。这可以防止意外的硬降。",
        "If enabled, DAS charge is cancelled when you change directions.": "如果启用，当你中途改变移动方向时，DAS充能会重新计算。",
        "Reset these settings to the defaults.": "将这些设置重置为默认配置。",
        "Try out these settings.": "试试这些设置吧。",
        "Tweak the music randomizer to your liking.": "根据自己的喜好调整曲库",
        "The volume at which music and jingles play.": "音乐和铃声的播放音量。",
        "The volume at which sound effects play.": "声音效果播放的音量。",
        "How much stereo to apply. A value of 0% means all sound is centered, whereas a value of 100% plays sounds that happen aside your board on different ears.": "应用多少立体声。0%的值意味着所有的声音都在中心位置，而100%的值则是在不同的耳朵上播放发生在你游戏中的声音。",
        "Whether to allow scrolling ingame (or holding ALT and scrolling anywhere) to change the volume.": "是否允许在游戏中用滚轮（或按住ALT并滚动到任何地方）来改变音量。",
        "Whether to play a sound effect that signifies the next piece that'll come up.": "是否播放代表下一个方块的声音效果。",
        "Whether to hear the sounds of other people playing in Multiplayer.": "是否能在多人游戏中听到其他人的声音。",
        "Whether to hear the sounds of attacks going towards and from you.": "是否听到收到和发出攻击的声音。",
        "If enabled, the background music won't reset when you retry a game.": "如果启用，当你重试一场游戏时，背景音乐不会重置。",
        "If enabled, no audio will ever play. This will speed up the game, with a rather obvious drawback.": "如果启用，将永远不会有音频播放。这将加快游戏的速度，但有相当明显的缺点。",
        "Don't display any action text when doing special attacks.": "做特殊攻击时不要显示任何文字特效。",
        "Display only non-distracting action text when doing special attacks.": "在进行特殊攻击时，只显示非干扰性的文字特效。",
        "Display all action text when doing special attacks.": "进行特殊攻击时显示所有文字特效。",
        "How much the board reacts when you move pieces around.": "当你移动方块时，版面的反应有多大。",
        "How much the board reacts when you receive damage.": "当你受到伤害时，版面的反应有多大。",
        "How visible the grid is. 0% makes the grid invisible.": "网格的可见程度。0%使网格不可见。",
        "How visible the board is. 0% makes the board invisible.": "背景的可见度。0%使背景不可见。",
        "How visible the shadow piece is. 0% makes the shadow piece invisible.": "阴影部分的可见程度。0%使阴影部分不可见。",
        "How large the board displays. Values over 100% may cause some elements to not be visible.": "显示多大的版面。超过100%的值可能会导致一些元素不可见。",
        "Whether to display a duel side-by-side. This causes your own board to move slightly to the left.": "是否并排显示决斗.这将使你自己的版面稍微向左移动。",
        "When enabled, the board reacts to T-Spins by rotating a little with it.": "启用后，版面对T-Spin的反应是随着它旋转一点。",
        "If enabled, show a popup when you KO someone or get KO'd.": "如果启用，当你KO某人或被KO时显示一个弹出窗口。",
        "If enabled, fill a fire meter when doing well, illuminating boards that have a lot of fire.": "如果启用，在做得好的时候显示一个火力表，根据打出的火力大小点亮版面。",
        "If enabled, makes the board red and play a warning sound when you're in danger.": "如果启用，在你有危险的时候会使版面变成红色，并播放警告声。",
        "If enabled, colors the shadow piece.": "如果启用，给阴影部分上色。",
        "Override all graphics settings and disable practically everything for the highest performance but worst visuals.": "覆盖所有的图形设置，几乎禁用一切，以获得最高的性能，但视觉效果最差。",
        "No particles or effects. Use on lower-spec computers, if you want to ensure optimum performance, or if you simply dislike the flair.": "没有粒子或效果。如果你想确保最佳性能，或者你只是不喜欢炫耀，请在低规格的计算机上使用。",
        "Less particles and effects.": "更少的粒子效果。",
        "Most of the particles and effects..": "大多数的粒子效果...",
        "ALL THE EFFECTS. Use on high-end computers.": "启用所有效果。在高端电脑上使用。",
        "If enabled, the background music will be muted when TETR.IO is minimized or tabbed away.": "如果启用，当TETR.IO最小化或标签化时，背景音乐将被静音。",
        "Don't cache anything. Might be fastest on some devices.": "不要缓存任何东西。在某些设备上可能是最快的。",
        "Only cache when necessary. Default option.": "默认选项。只在必要时进行缓存。",
        "Cache as much as possible. Might be fastest on some devices.": "尽可能多的缓存。在某些设备上可能是最快的。",
        "Use a compatibility mode for WebGL. If you experience unexplainable flickering, try this mode.": "使用WebGL的兼容模式 如果你遇到无法解释的闪烁，请尝试这种模式",
        "Use WebGL 1. If you see artifacts on screen, try this mode.": "使用WebGL 1。如果你在屏幕上看到伪影，请尝试这个模式。",
        "Use the newest WebGL 2. Best (and default) option, but might not be supported properly on all devices. Some devices/browsers ignore this option and use WebGL 1 - check the Console (F12 -> Console) to see which is being used.":
            "使用最新的WebGL 2.最佳（和默认）选项，但可能不是所有设备都能正确支持。有些设备/浏览器会忽略这个选项，而使用WebGL 1--检查控制台（F12->控制台），看看正在使用的是哪一种。",
        "How many particles to display.": "要显示多少粒子特效。",
        "How visible the background images are. 0% makes the background entirely black.": "背景图像的可见度。0%使背景完全变黑。",
        "If enabled, prioritize power saving over performance.": "如果启用，优先考虑节能而非性能。",
        "If enabled, render blurrier but prettier.": "如果启用，渲染会更模糊但更漂亮。",
        "If enabled, don't show as much precision on in-game counters. Speeds up the game significantly.": "如果启用，在游戏中的计数器上不会显示那么多精度。大大加快了游戏的运行速度。",
        "If enabled, always shows the simpler thumbnails for other players. This increases performance in games between 2 and 10 players, but looks less nice.": "如果启用，总是显示其他玩家的更简单的缩略图。这在2到10个玩家之间的游戏中提高了性能，但看起来不太美观。",
        "If enabled, the background of Super Lobbies (rooms of 100+players) does not animate (outside of the intro).": "如果启用，超级大厅（有100名以上玩家的房间）的背景不会有动画（除了介绍之外）。",
        "If enabled, do not show the background when in menus. This will majorly improve performance in menus, but you will no longer see the background.": "如果启用，在菜单中不显示背景。这将极大地提高菜单的性能，但你将不再看到背景。",
        "If enabled, profanity in chat will be filtered. Note that such filters are never perfect.": "如果启用，聊天中的脏话将被过滤掉。请注意，这样的过滤器永远不会完美。",
        "If enabled, chat will be hidden when ingame.": "如果启用，聊天将在游戏中被隐藏。",
        "If enabled, room IDs will not be shown, to protect you from streamsniping.": "如果启用，房间ID将不被显示，以保护你不被流媒体窃取。",
        "If enabled, show emotes in chat.": "如果启用，在聊天中显示表情。",
        "If enabled, show animated emotes in chat.": "如果启用，在聊天中显示动态表情。",
        "If enabled, chat text shows in black (good for light backgrounds).": "如果启用，聊天文本显示为黑色（对浅色背景有好处）。",
        "If enabled, show a background behind chat messages when typing.": "如果启用，打字时在聊天信息后面显示一个背景。",
        "If enabled, the replay tools do not collapse when you're not using them.": "如果启用，当你不使用这些工具时，回放工具栏不会关闭。",
        "If enabled, network warning icons will not be shown.": "如果启用，将不显示网络警告图标。",
        "If enabled, a warning is shown when TETR.IO is out of focus.": "如果启用，当TETR.IO失焦时，会显示一个警告。",
        "If enabled, show the simple guide with the keybinds in multiplayer lobbies.": "如果启用，在多人游戏大厅中显示带有键盘绑定的简单指南。",
        "If enabled, show notifications outside of the game.": "如果启用，显示游戏外的通知。",
        "If enabled, unimportant notifications don't show ingame, but will be shown after the game.": "如果启用，不重要的通知不会在游戏中显示，但会在游戏后显示。",
        "If enabled, notification sounds always play at full volume.": "如果启用，通知声音总是以全音量播放。",
        "Don't notify me.": "不要通知我。",
        "Only notify me ingame.": "只有在游戏中才会通知我。",
        "Notify me ingame and with a desktop notification.": "在游戏中通知我，并以桌面通知的方式通知我。",
        "If enabled, show a custom background image. If disabled, uses default background.": "如果启用，显示一个自定义的背景图片。如果禁用，则使用默认背景。",
        "Save your new privacy settings.": "保存你的新隐私设置。",
        "If enabled, show how much time you' ve played TETR. IO for.": "如果启用，显示你玩了多长时间的TETR.IO",
        "If enabled, show your amount of online games won on your profile.": "如果启用，在你的个人资料上显示你赢得的在线游戏的数量。",
        "If enabled, show your amount of online games played on your profile.": "如果启用，在你的个人资料上显示你玩过的在线游戏数量。",
        "If enabled, show your country as a flag on your profile.": "如果启用，将你的地区代表旗帜显示在你的个人资料上。",
        "Only people who you're added as friend can add you as friend.": "只有被你加为好友的人才能加你为好友。",
        "Anyone can add you as friend.": "任何人都可以加你为好友。",
        "Nobody can see whether you're online. Not recommended.": "没有人可以看到你是否在线。不建议使用。",
        "Only people who you've added as friend can see whether you're online.": "只有被你加为好友的人可以看到你是否在线。",
        "Anyone can see whether you're online.": "任何人都可以看到你是否在线。",
        "Nobody can see what you're doing.": "没有人可以看到你在做什么。",
        "Only people who you've added as friend can see what you're doing.": "只有被你加为好友的人才能看到你在做什么。",
        "Anyone can see what you're doing.": "任何人都可以看到你在做什么。",
        "Nobody can see what room you're in.": "没有人可以看到你在哪个房间。",
        "Only people who you've added as friend can see what room you're in.": "只有被你加为好友的人才能看到你所在的房间。",
        "Anyone can see what room you're in.": "任何人都可以看到你在哪个房间。",
        "Nobody can send you direct messages.": "没有人可以直接给你发信息。",
        "Only people who you've added as friend can send you direct messages.": "只有被你加为好友的人才能给你发送直接信息。",
        "Anyone can send you direct messages.": "任何人都可以给你发送直接信息。",
        "Nobody can send you invites.": "没有人可以向你发出邀请。",
        "Only people who you've added as friend can send you invites.": "只有被你加为好友的人才能向你发出邀请。",
        "Anyone can send you invites.": "任何人都可以向你发出邀请。",
        "Save your new username.": "保存你的新用户名。",
        "Save your new email.": "保存你的新电子邮箱。",
        "Save your new password.": "保存你的新密码。",
        "Enable two-factor authentication.": "启用双重认证。",
        "Link your Discord account.": "连接你的Discord账户。",
        "Delete your account and everything involved.": "删除你的账户和所有涉及的东西。",
        "Further customize this mode": "进一步自定义这种模式",
        "Show extra info and arrange some info for pro players.": "显示额外的信息，为专业玩家显示一些信息。",
        "Alert me when I make a finesse fault.": "当我有非极简操作时提醒我。",
        "Restart the game when I make a finesse fault.": "当我有非极简操作时，重新开始游戏。",
        "Speeds up animations, disables hold-to-retry and prevents the first piece from being S, Z or O.": "加快动画速度，禁用长按重开的功能，并防止第一个方块是S、Z或O。",
        "The type of metric to display in the first left-hand slot.": "要在游戏左侧第一个信息槽中显示的度量衡的类型。",
        "The type of metric to display in the second left-hand slot.": "要在游戏左侧第二个信息槽中显示的度量衡的类型。",
        "The type of metric to display in the third left-hand slot.": "要在游戏左侧第三个信息槽中显示的度量衡的类型。",
        "The type of metric to display in the fourth left-hand slot.": "要在游戏左侧第四个信息槽中显示的度量衡的类型。",
        "The type of metric to display in the right-hand slot.": "要在游戏右侧第一个信息槽中显示的度量衡的类型。",
        "Open in the standalone TETRA CHANNEL site": "打开独立的TETRA频道网站",
        "Destroy all ZEN progress.": "消除禅意模式的全部进度。",
        "TETRA LEAGUE rank": "TETRA联赛段位",
        "Online games won / online games played": "在线游戏获胜数 / 在线游戏总数",
        "Total time played": "总游玩时间",
        "I enjoyed it!": "我很享受这局游戏！",
        "I did not enjoy it": "我不享受这局游戏",
        "This user is likely a plonker": "该玩家倾向于使用反击策略",
        "This user is likely an opener main": "该玩家倾向于使用开局策略",
        "This user is likely an infnite downstacker": "该玩家倾向于使用挖掘策略",
        "This user is likely a strider": "该玩家倾向于使用火力策略",
        "Amount of players who have friended this person": "有多少个玩家将该玩家添加为好友",
        "The type of system used to generate random pieces.": "用于生成随机方块的系统类型",
        "The type of pieces allowed to do spins.": "不同种类的旋转规则",
        "What combo table to use.": "使用哪种连击表",
        "Whether to reward clearing the entire board": "消除所有方块后是否进行奖励攻击",
        "Whether to use a random seed.": "是否使用随机种子",
        "Amount of time in frames until garbage will always pick a different column.": "超过所选时间后垃圾行总是生成在不同列",
        "Remove all mods.": "移除所有模组",
        "If enabled, at very high speeds soft drop will always take precedence over horizontal movement, for a more consistent game feel.": "如果启用，在高速情况下，软降将始终优先于移动，从而获得更稳定的手感",
        "If enabled, the HOLD piece will be grayed out if it may not be used.": "如果启用，当暂存方块部分显示为灰色时不可用",
        "If enabled, render blurrier graphics. Not very pretty but helps performance.": "如果启用，将呈现更模糊的图形。虽然不是很美观，但有助于提高性能。",
        "If enabled, always shows the simpler thumbnails for other players. This increases performance in games between 2 and 8 players, but looks less nice.": "如果启用，则始终显示其他玩家更简单的缩略图。这可以提高在2到8名玩家之间对局的性能，但看起来会不太好。",
        "If enabled, the background of Quick Play does not animate.": "如果启用，快速游戏的背景不会播放动画",
        "If enabled, the background of Super Lobbies (rooms of 100+ players) does not animate (outside of the intro).": "如果启用，超级房间的背景不会动画化（开始前除外）",
        "If checked, most holiday cheer will be disabled. You're boring.": "如果启用，大部分的节日特效将被禁用，你好无趣。",
        "If checked, there won't be any snow on your stack. The salt is directly sourced from Tetra League.": "如果启用，雪不会堆积在你的方块上。盐由Tetra联盟提供。",
        "Don't allow any rotation inputs between pieces.": "禁止在方块生成间隙输入旋转指令",
        "The next piece rotates if the key is held at the time the piece spawns.": "在方块生成瞬间按住旋转键，该方块将预旋转",
        "The next piece rotates if any rotations are entered between pieces. Multiple inputs stack.": "在方块生成间隙输入的旋转指令将作用于新方块",
        "Don't allow pressing Hold between pieces.": "禁止在方块生成间隙输入暂存指令",
        "The next piece is Held if the key is held at the time the piece spawns.": "在方块生成瞬间按住暂存键，立即触发暂存",
        "The next piece is Held if any hold inputs are entered between pieces.": "在方块生成间隙的暂存指令将作用于新方块",
        "Game mode.": "游戏模式。",
        "Amount of rounds one must win to win the game.": "获胜所需回合数",
        "Amount of rounds one must win over the second place to secure the win.": "获胜所需领先回合数",
        "When not 0, winning this amount of rounds always secures the win regardless of Win By. Only applies when Win By is greater than 1.": "强制胜出回合数（覆盖Win By规则）",
        "Amount of extra lives one has.": "额外生命数量",
        "Name this room will display in the listing as": "房间显示名称",
        "Maximum players in this room. 0 = no limit. Does not apply retroactively.": "房间最大玩家数（0=无限制，不可追溯调整）",
        "Countdown until the room start. 0 = to disable.": "房间启动倒计时（0=禁用）",
        "When enabled, broadcast the room and its info to the public room listing.": "启用房间公开广播",
        "Whether to allow anonymous users to enter this room. Does not apply retroactively.": "是否允许匿名用户加入（不可追溯调整）",
        "Whether to allow users who are in a matchmaking queue to enter this room. Does not apply retroactively.": "是否允许匹配队列中的玩家加入（不可追溯调整）",
        "Whether to allow unranked users to play in this room.": "是否允许无段位玩家加入",
        "The maximum TETRA LEAGUE rank players may have to play in this room.": "房间段位上限",
        "If a rank limit is set, use the players' top ranks instead of their current ranks.": "启用历史最高段位检测",
        "Background song to play. If random, not everyone will hear the same song.": "背景音乐设置（随机模式下玩家听到的曲目可能不同）",
        "This achievement grants extra Achievement Rating to those who place in its Top 100 leaderboard.": "此成就给进入前100的玩家提供额外的AR。",
        "This achievement is only visible to the worthy.": "此成就仅对值得的人可见。",
        "This achievement does not contribute to your Achievement Rating.": "此成就不予提供AR。",
        "hover over a setting for more info": "将鼠标悬停在设置名称上查看详细说明",
        "If enabled, cap the framerate to the screen refresh rate. More reliable, but may leave performance on the table depending on your configuration.": "如果启用此选项，帧率将限制在屏幕刷新率以内。以获得更稳定的游戏体验，但根据您的系统配置不同，可能会导致性能无法充分发挥。",
        "If enabled, automatically download and install updates.": "如果启用此选项，系统将自动下载并安装更新。",
        "If enabled, show your current activity in Discord.": "如果启用此选项，将在 Discord 中显示您的当前状态。",
        "If enabled, the taskbar icon will flash when something important happens.": "如果启用此选项，当发生重要事件时，任务栏图标会闪烁。",
        "If enabled, ANGLE wll run in GL compatibility mode. Use this if your streaming software does not work with TETR.lO out of the box. This may impact performance!": "如果启用此选项，ANGLE将以GL兼容模式运行。如果您的直播串流软件无法直接支持 TETR.lO，请使用此选项。这可能会影响性能！",
        "": "",
        "": "",
    };

    // 特殊文本
    const specialTextMap = {
        "([0-9]+) (SECONDS?|seconds?)": "$1秒",
        "([0-9]+) (MINUTES?|minutes?)": "$1分钟",
        "([0-9]+) (MINUTE?|minute?)": "$1分钟",
        "([0-9]+) (HOURS?|hours?)": "$1小时",
        "([0-9]+) (DAYS?|days?)": "$1天",
        "([0-9]+) (MONTHS?|months?)": "$1个月",
        "([0-9]+) (YEARS?|years?)": "$1年",
        "(.*) FROM NOW": "$1后",
        "(.*) ago": "$1前",
        "JOINED (.*) AGO -": "$1前加入游戏 - ",
        "JOINED (.*) AGO": "$1前加入游戏",
        "loading fonts(.*)": "正在加载字体$1",
        "loading textures(.*)": "正在加载材质$1",
        "loading (.*)": "正在加载$1",
        "home banner data(.*)": "首页横幅数据$1",
        "checking for game updates(.*)": "检查游戏更新$1",
        "(.*) this session": "本次在线时间：$1",
        "(.*) ONLINE": "$1人在线",
        "([0-9]+)% towards next level": "离下一个等级还有$1%",
        "This user's winrate is not heavily affected if they lost their previous match. (.*)": "该玩家的胜率可能不会因他上一场比赛的落败而产生较大影响。$1",
        "This user's winrate is not heavily affected if they won their previous match. (.*)": "该玩家的胜率可能不会因他上一场比赛的获胜而产生较大影响。$1",
        "This user tends to continue losing if they lost their previous match. (.*)": "该玩家的胜率可能会因他上一场比赛的落败而降低。$1",
        "This user tends to continue winning if they won their previous match (.*)": "该玩家的胜率可能会因他上一场比赛的获胜而提高。$1",
        "This user tends to win if they lost their previous match. (.*)": "该玩家的胜率可能会因他上一场比赛的落败而提高。$1",
        "This user tends to lose if they won their previous match. (.*)": "该玩家的胜率可能会因他上一场比赛的获胜而降低。$1",
        "This user has a high winrate against openers. (.*)": "该玩家对开局策略有很高的胜率。$1",
        "This user has a high winrate against striders. (.*)": "该玩家对火力策略有很高的胜率。$1",
        "This user has a high winrate against inf ds'ers. (.*)": "该玩家对挖掘策略有很高的胜率。$1",
        "This user has a high winrate against plonkers. (.*)": "该玩家对反击策略有很高的胜率。$1",
        "This user has a low winrate against openers. (.*)": "该玩家对开局策略有很低的胜率。$1",
        "This user has a low winrate against striders. (.*)": "该玩家对火力策略有很低的胜率。$1",
        "This user has a low winrate against inf ds'ers. (.*)": "该玩家对挖掘策略有很低的胜率。$1",
        "This user has a low winrate against plonkers. (.*)": "该玩家对反击策略有很低的胜率。$1",
        "This user has a low winrate against plonkers. (.*)": "该玩家对反击策略有很低的胜率。$1",
        "This user has a high average VS compared to other players (.*)": "该玩家的VS高于平均水平 $1",
        "This user has a high average APM compared to other players (.*)": "该玩家的APM高于平均水平 $1",
        "This user has a high average PPS compared to other players (.*)": "该玩家的PPS高于平均水平 $1",
        "This user has a low average VS compared to other players (.*)": "该玩家的VS低于平均水平 $1",
        "This user has a low average APM compared to other players (.*)": "该玩家的APM低于平均水平 $1",
        "This user has a low average PPS compared to other players (.*)": "该玩家的PPS低于平均水平 $1",
        "Bottled Snowman(.*)": "瓶装雪人$1",
        "(.*)The remains of a once great snowman...(.*)": "$1曾经是个大雪人$1",
        "(.*)Badge awarded to those with a Bronze rank 'Rolling The Snowman' achievement.": "该徽章颁发给在“滚动的雪雪弗斯”成就中达到青铜级成就的玩家",
        "(.*)Badge awarded to those with a Silver rank 'Rolling The Snowman' achievement.": "该徽章颁发给在“滚动的雪雪弗斯”成就中达到白银级成就的玩家",
        "(.*)Badge awarded to those with a Gold rank 'Rolling The Snowman' achievement.": "该徽章颁发给在“滚动的雪雪弗斯”成就中达到黄金级成就的玩家",
        "(.*)Badge awarded to those with a Platinum rank 'Rolling The Snowman' achievement.": "该徽章颁发给在“滚动的雪雪弗斯”成就中达到铂金级成就的玩家",
        "(.*)Badge awarded to those with a Diamond rank 'Rolling The Snowman' achievement.": "该徽章颁发给在“滚动的雪雪弗斯”成就中达到钻石级成就的玩家",
        "(.*)Badge awarded to those with a top-10 placement in the 'Rolling The Snowman' achievement.": "该徽章颁发给在“滚动的雪雪弗斯”成就中排名前十的玩家",
        "SEASON ([0-9]+) ENDS": "第$1赛季将结束于",
        "SEASON ([0-9]+) STARTS": "第$1赛季将开始于",
        "SEASON ([0-9]+)": "第$1赛季",
        "Winrate (.*)": "胜率 $1",
        "SPECTATE (.*)": "旁观$1",
        "(.+) - INTERFACE": "$1 - 菜单",
        "(.+) - CALM": "$1 - 平静",
        "(.+) - BATTLE": "$1 - 战斗",
        "([0-9]+) GAMES WON": "$1场获胜",
        "([0-9]+) TARGETING YOU": "$1人瞄准你",
        "ago • was #([0-9,]+), no score set this week": "前 • 曾经是#$1，本周无成绩",
        "([0-9:]+) • CLICK TO CANCEL": "$1 • 点击取消",
        "VICTORY IN ([0-9]+)": "在$1秒后获胜",
        "changing (.*) requires a restart to fully go in effect. hit F5 on your keyboard to restart.": "更改 $1 需要重启才能完全生效。按 F5 在你的键盘上重启。",
        "JOINED (.*)":"注册时间：$1",
    };

    // 占位符
    const placeholderMap = {
        "enter room id or url and hit enter...": "输入房间号或网址并按回车键……",
        "enter replay id, url or username and hit enter...": "输入回放id、网址或用户名并按回车键……",
        "background URL (use multiple by separating with commas)": "背景图片地址（多张图片用逗号分隔）",
        "Write something...": "写点什么吧……",
        USERNAME: "用户名",
        email: "电子邮箱",
        "email (optional)": "电子邮箱（可选）",
        "your new password": "请输入你的新密码",
        "your new password, again": "请再次输入你的新密码",
        PASSWORD: "请输入密码",
        "PASSWORD AGAIN": "请再次输入密码",
        "please enter the characters above": "请输入上面的文字",
        "six digits": "六位数",
        "Ǖ find someone…": "Ǖ 搜索用户名……",
        "message...": "发消息……",
        "enter a username to view their profile...": "输入用户名以查看TA的页面",
    };

    // 伪元素（::before, ::after）文本
    const pseudoElementMap = {
        ".replayid::before": "回放id:",
        ".rc_switch_knob::before": "关",
        "input:checked + .rc_switch_knob::before": "开",
    };

    // 按 data-id 精确匹配的“部分替换”映射表
    // key 为 data-id，value 为 [RegExp, replacement]
    const dataIdMap = {
        offline: [/INVISIBLE/g, "隐身"],
    };
    // 双人模式复活文本
    const zenithPromptMap = {
        "Perform a 3-Combo": "完成1次3连击",
        "Clear 2 Doubles": "完成2次消二",
        "Clear a Quad": "完成1次消四",
        "Clear 6 Lines": "消除6行",
        "Clear a Single\nusing an O-Piece": "用O块消一",
        "Clear a Double\nusing an O-Piece": "用O块消二",
        "Clear a Double\nusing an S or Z-Piece": "用S块/Z块消二",
        "Clear a Triple\nusing an L or J-Piece": "用L块/J块消三",
        "Clear 3 lines\nwhile holding an I-Piece": "暂存I块消除三行",
        "Use Hold 8 times": "暂存8次",
        "Rotate 20 times": "旋转20次",
        "Clear 2 Singles in a row": "2连消一",
        "Perform any Spin": "完成1次任意旋转消除",
        "Clear a T-Spin Single": "T旋消一",
        "Clear a T-Spin Double": "T旋消二",
        "Clear an S/Z-Spin": "S/Z旋消除",
        "Clear an L/J-Spin": "L/J旋消除",
        "Perform a 5-Combo": "完成1次5连击",
        "Clear 2 Lines using\nhorizontal I-Pieces": "2次横放I块消一",
        "Place 20 pieces": "放20块",
        "Send 6 Attack": "送出6行攻击",
        "Place 2 O-Pieces\nin a row": "连放2块O",
        "Place 12 pieces while only\nrotating counterclockwise": "只用逆时针旋转连放12块",
        "Clear 6 Singles without\nstarting a combo": "不连击并完成6次消一",
        "Clear 4 Doubles": "完成4次消二",
        "Place 3 pieces in a row\nwithout moving or rotating": "不转不移并连放3块",
        "Place 14 pieces in a row\nwithout clearing any lines": "不消行并连放14块",
        "Clear 2 Doubles\nusing S or Z-Pieces": "用S/Z块完成2次消二",
        "Clear 2 Triples\nusing L or J-Pieces": "用L块/J块完成2次消三",
        "Clear an I-Spin": "完成1次I旋消除",
        "Clear a Quad in the\nupper half of the board": "在上半场地消四",
        "Rotate 80 times": "旋转80次",
        "Clear a Quad\nwhile on a 2+-Combo": "连击消四",
        "Clear 2 Singles in a row\nusing S or Z-Pieces": "用S/Z块完成2连消一",
        "Perform a 3-Combo\nwithout using Hold": "不暂存并完成1次3连击",
        "Perform 3 Spins\nthat don't clear any lines": "完成3次不消除的旋转",
        "Perform 2\nS/Z/L/J-Spins": "完成2次S/Z/J/L旋",
        "Clear a T-Spin Triple": "T旋消三",
        "Place 25 pieces in a row\nwithout using Hold": "不暂存并连放25块",
        "Clear 3 Triples": "完成3次消三",
        "Reach B2B x4": "完成B2B x4",
        "Clear a Quad in\n2 different columns": "完成2次不同列的消四",
        "Use Hold on\n12 pieces in a row": "一直暂存并连放12块",
        "Place 10 pieces without\nreleasing Soft Drop": "一直软降并连放10块",
        "Have part of your stack in\nthe top 3 rows for 3 seconds": "堆到至少第18行保持3秒",
        "Clear 10 Lines without\nclearing with T or I-pieces": "不用T块/I块消10行",
        "Clear an S/Z-Spin Triple": "S/Z旋消三",
        "Clear 2 Doubles consecutively\nusing two O-Pieces": "2连O块消二",
        "Clear 4 T-Spin Minis": "完成4次T旋mini消",
        "Send 14 Attack": "送出14行攻击",
        "Clear 3 Doubles\nwith the same type of piece": "只用一种块消二3次",
        "Clear Garbage\nusing a L/J-Spin": "用L/J旋消除垃圾行",
        "Clear Garbage\nusing a S/Z-Spin": "用S/Z旋消除垃圾行",
        "Place 3 O-Pieces\nin column 1": "在第一列放三块O块",
        "Clear 2 Spins\nin one combo": "一轮连击包含2次旋转消除",
        "Clear a Single with an I-Piece\nwithout moving or rotating": "不转不移完成I块消一",
        "Place 6 Pieces\nwithout releasing DAS": "保持充DAS连放6块",
        "Clear 6 Lines\nusing O-Pieces": "用O块消6行",
        "Clear Spin-Clears\nwith 3 different pieces": "完成三次不同块旋转消除",
        "Clear 4 Quads": "完成4次消四",
        "Place 5 pieces in a row\nwithout moving or rotating": "不转不移并连放5块",
        "Clear an L/J-Spin Triple": "L/J旋消三",
        "Clear 2 Quads in a row": "2连消四",
        "Clear 8 Singles without doing\nother clears or using Hold": "不暂存并8连消一",
        "Have no Garbage Lines on\nyour board for 4 seconds": "场内无垃圾并保持4秒",
        "Rotate 300 times": "转300次",
        "Don't cancel any\ngarbage for 8 seconds": "不抵消垃圾并保持8秒",
        "Clear a T-Spin Double\nwith the Piece pointing up": "T块朝上旋转消二",
        "Clear a Double with an O-Piece\nwithout moving or rotating": "不转不移完成O块消二",
        "Place 3 T-Pieces\nwithout rotating any": "放三块不旋转的T",
        "Clear a T-Spin Double\nwhile on a 2+-Combo": "连击T旋消二",
        "Perform a 7-Combo": "完成1次7连击",
        "Clear an I-Spin Double": "I旋消二",
        "Clear two S/Z-Spin\nDoubles consecutively": "2连S/Z旋消二",
        "Clear two L/J-Spin\nDoubles consecutively": "2连L/J旋消二",
        "Perform a Color Clear": "完成1次色彩消除",
        "Clear 40 Lines": "消除40行",
        "Clear 4 Spins\nin one Combo": "一轮连击包含4次旋转消除",
        "Clear a T-Spin Double/Triple\ncentered in column 1 or 10": "T旋消二/三 但旋转中心在边列",
    };

    // ===== 游戏内替换 =====
    (async () => {
        const { open: XMLHttpRequestOpen, send: XMLHttpRequestSend } = unsafeWindow.XMLHttpRequest.prototype;

        const config = {
            replacements: {
                images: {
                    "res/font/hun.png":
                        "data:image/png;base64,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",
                },
                requests: {
                    "res/font/hun.fnt":
                        "data:font/fnt;base64,aW5mbyBmYWNlPSJIVU4yIiBzaXplPTUyIGJvbGQ9MCBpdGFsaWM9MCBjaGFyc2V0PSIzMi0xMjYsMTY5LDE3NCwxNzcsMTgzLDIwOC0yNTksNDg1LTUxMSw4NzM0LDE5OTY4LDE5OTc3LTE5OTc4LDE5OTgxLDIwMDEzLDIwMTA4LDIwMjE5LDIwMjk0LDIwNDQ1LDIwODA1LDIwODY5LDIwOTg2LTIwOTg3LDIxMDE1LDIxMDQwLDIxMjUzLDIxMzIyLDIxMzMzLDIxNDgyLDIxNTE2LDIxNTQ3LDIyMjM1LDIyMzEyLDIyMzIwLDIyMzMwLDIyMzM0LDIyMzU5LDIyNDAzLDIyNTM0LDIzMzg0LDIzNDM2LDIzNTY5LDI0MTgyLDI0NDI1LDI0NTE1LDI0ODQ3LDI1MTA0LDI1MjY5LDI1MzQ1LDI1OTE1LDI1OTE4LDI2MDU5LDI2MDgwLDI2MTAyLDI2MjQyLDI2Mzk3LDI3MTc4LDI3NDI1LDI4MDQwLDI5OTkyLDMwMzQwLDMwNDUyLDMxMTgxLDMxMTg2LDMxMjI3LDMxNTMyLDMzMjY3LDMzMzk0LDM0ODkyLDM2NzE2LDM2NzE4LTM2NzE5LDM2NzkzLDM2ODMwLDM2ODY1LDM2ODcwLDM4MDI0LDM4NDc3LDM4NTAwIiB1bmljb2RlPTEgc3RyZXRjaEg9MTAwIHNtb290aD0xIGFhPTEgcGFkZGluZz00LDQsNCw0IHNwYWNpbmc9MCwwIG91dGxpbmU9MApjb21tb24gbGluZUhlaWdodD01MiBiYXNlPTQzIHNjYWxlVz03MTAgc2NhbGVIPTcxMCBwYWdlcz0xIHBhY2tlZD0wIGFscGhhQ2hubD0wIHJlZENobmw9NCBncmVlbkNobmw9NCBibHVlQ2hubD00CnBhZ2UgaWQ9MCBmaWxlPSJodW4ucG5nIgpjaGFycyBjb3VudD0yNDgKY2hhciBpZD0zMiB4PTAgeT0wIHdpZHRoPTAgaGVpZ2h0PTAgeG9mZnNldD0wIHlvZmZzZXQ9MCB4YWR2YW5jZT0yMiBwYWdlPS0xIGNobmw9MTUKY2hhciBpZD0zMyB4PTUzMCB5PTY1OCB3aWR0aD0xMiBoZWlnaHQ9NDcgeG9mZnNldD0tNCB5b2Zmc2V0PTUgeGFkdmFuY2U9MTMgcGFnZT0wIGNobmw9MTUKY2hhciBpZD0zNCB4PTIxNyB5PTY3MiB3aWR0aD0yMSBoZWlnaHQ9MTcgeG9mZnNldD0tNCB5b2Zmc2V0PTUgeGFkdmFuY2U9MjIgcGFnZT0wIGNobmw9MTUKY2hhciBpZD0zNSB4PTQ3OSB5PTIwNCB3aWR0aD0zMCBoZWlnaHQ9NDcgeG9mZnNldD0tNCB5b2Zmc2V0PTUgeGFkdmFuY2U9MzEgcGFnZT0wIGNobmw9MTUKY2hhciBpZD0zNiB4PTQ3OSB5PTI1MSB3aWR0aD0zMCBoZWlnaHQ9NDcgeG9mZnNldD0tNCB5b2Zmc2V0PTUgeGFkdmFuY2U9MzEgcGFnZT0wIGNobmw9MTUKY2hhciBpZD0zNyB4PTQxMyB5PTE2MCB3aWR0aD0zNCBoZWlnaHQ9NDIgeG9mZnNldD0wIHlvZmZzZXQ9MTAgeGFkdmFuY2U9MzEgcGFnZT0wIGNobmw9MTUKY2hhciBpZD0zOCB4PTQ3OSB5PTI5OCB3aWR0aD0zMCBoZWlnaHQ9NDcgeG9mZnNldD0wIHlvZmZzZXQ9NSB4YWR2YW5jZT0zMSBwYWdlPTAgY2hubD0xNQpjaGFyIGlkPTM5IHg9NDMgeT02OTIgd2lkdGg9MTIgaGVpZ2h0PTE3IHhvZmZzZXQ9LTQgeW9mZnNldD01IHhhZHZhbmNlPTEzIHBhZ2U9MCBjaG5sPTE1CmNoYXIgaWQ9NDAgeD02ODkgeT0wIHdpZHRoPTIxIGhlaWdodD01NiB4b2Zmc2V0PS00IHlvZmZzZXQ9MSB4YWR2YW5jZT0yMiBwYWdlPTAgY2hubD0xNQpjaGFyIGlkPTQxIHg9Njg5IHk9NTYgd2lkdGg9MjEgaGVpZ2h0PTU2IHhvZmZzZXQ9LTQgeW9mZnNldD0xIHhhZHZhbmNlPTIyIHBhZ2U9MCBjaG5sPTE1CmNoYXIgaWQ9NDIgeD00NzkgeT02NzQgd2lkdGg9MzAgaGVpZ2h0PTMwIHhvZmZzZXQ9LTQgeW9mZnNldD0xNCB4YWR2YW5jZT0zMSBwYWdlPTAgY2hubD0xNQpjaGFyIGlkPTQzIHg9NjU5IHk9MCB3aWR0aD0zMCBoZWlnaHQ9MzAgeG9mZnNldD0tNCB5b2Zmc2V0PTE0IHhhZHZhbmNlPTMxIHBhZ2U9MCBjaG5sPTE1CmNoYXIgaWQ9NDQgeD0xNjIgeT02ODkgd2lkdGg9MTcgaGVpZ2h0PTIxIHhvZmZzZXQ9LTQgeW9mZnNldD00MCB4YWR2YW5jZT0xOCBwYWdlPTAgY2hubD0xNQpjaGFyIGlkPTQ1IHg9NjI5IHk9Njk2IHdpZHRoPTMwIGhlaWdodD0xMiB4b2Zmc2V0PS00IHlvZmZzZXQ9MjMgeGFkdmFuY2U9MzEgcGFnZT0wIGNobmw9MTUKY2hhciBpZD00NiB4PTQzIHk9Njc2IHdpZHRoPTEzIGhlaWdodD0xNiB4b2Zmc2V0PTAgeW9mZnNldD0zNiB4YWR2YW5jZT0xOCBwYWdlPTAgY2hubD0xNQpjaGFyIGlkPTQ3IHg9NTQyIHk9NjU4IHdpZHRoPTIxIGhlaWdodD00NyB4b2Zmc2V0PTAgeW9mZnNldD01IHhhZHZhbmNlPTMxIHBhZ2U9MCBjaG5sPTE1CmNoYXIgaWQ9NDggeD00NzkgeT0zNDUgd2lkdGg9MzAgaGVpZ2h0PTQ3IHhvZmZzZXQ9LTQgeW9mZnNldD01IHhhZHZhbmNlPTMxIHBhZ2U9MCBjaG5sPTE1CmNoYXIgaWQ9NDkgeD02ODkgeT01NjYgd2lkdGg9MTcgaGVpZ2h0PTQ3IHhvZmZzZXQ9LTQgeW9mZnNldD01IHhhZHZhbmNlPTE4IHBhZ2U9MCBjaG5sPTE1CmNoYXIgaWQ9NTAgeD00NzkgeT0zOTIgd2lkdGg9MzAgaGVpZ2h0PTQ3IHhvZmZzZXQ9LTQgeW9mZnNldD01IHhhZHZhbmNlPTMxIHBhZ2U9MCBjaG5sPTE1CmNoYXIgaWQ9NTEgeD00NzkgeT00Mzkgd2lkdGg9MzAgaGVpZ2h0PTQ3IHhvZmZzZXQ9LTQgeW9mZnNldD01IHhhZHZhbmNlPTMxIHBhZ2U9MCBjaG5sPTE1CmNoYXIgaWQ9NTIgeD00NzkgeT00ODYgd2lkdGg9MzAgaGVpZ2h0PTQ3IHhvZmZzZXQ9LTQgeW9mZnNldD01IHhhZHZhbmNlPTMxIHBhZ2U9MCBjaG5sPTE1CmNoYXIgaWQ9NTMgeD00NzkgeT01MzMgd2lkdGg9MzAgaGVpZ2h0PTQ3IHhvZmZzZXQ9LTQgeW9mZnNldD01IHhhZHZhbmNlPTMxIHBhZ2U9MCBjaG5sPTE1CmNoYXIgaWQ9NTQgeD00NzkgeT01ODAgd2lkdGg9MzAgaGVpZ2h0PTQ3IHhvZmZzZXQ9LTQgeW9mZnNldD01IHhhZHZhbmNlPTMxIHBhZ2U9MCBjaG5sPTE1CmNoYXIgaWQ9NTUgeD00NzkgeT02Mjcgd2lkdGg9MzAgaGVpZ2h0PTQ3IHhvZmZzZXQ9LTQgeW9mZnNldD01IHhhZHZhbmNlPTMxIHBhZ2U9MCBjaG5sPTE1CmNoYXIgaWQ9NTYgeD01MDkgeT0wIHdpZHRoPTMwIGhlaWdodD00NyB4b2Zmc2V0PS00IHlvZmZzZXQ9NSB4YWR2YW5jZT0zMSBwYWdlPTAgY2hubD0xNQpjaGFyIGlkPTU3IHg9NTA5IHk9NDcgd2lkdGg9MzAgaGVpZ2h0PTQ3IHhvZmZzZXQ9LTQgeW9mZnNldD01IHhhZHZhbmNlPTMxIHBhZ2U9MCBjaG5sPTE1CmNoYXIgaWQ9NTggeD0wIHk9Njc2IHdpZHRoPTEzIGhlaWdodD0zNCB4b2Zmc2V0PTAgeW9mZnNldD0xOCB4YWR2YW5jZT0yMiBwYWdlPTAgY2hubD0xNQpjaGFyIGlkPTU5IHg9NjU5IHk9MTQxIHdpZHRoPTE3IGhlaWdodD0zOSB4b2Zmc2V0PS00IHlvZmZzZXQ9MTggeGFkdmFuY2U9MTggcGFnZT0wIGNobmw9MTUKY2hhciBpZD02MCB4PTUwOSB5PTk0IHdpZHRoPTMwIGhlaWdodD00NyB4b2Zmc2V0PS00IHlvZmZzZXQ9NSB4YWR2YW5jZT0zMSBwYWdlPTAgY2hubD0xNQpjaGFyIGlkPTYxIHg9NDEzIHk9NjgzIHdpZHRoPTMwIGhlaWdodD0yNiB4b2Zmc2V0PS00IHlvZmZzZXQ9MTggeGFkdmFuY2U9MzEgcGFnZT0wIGNobmw9MTUKY2hhciBpZD02MiB4PTUwOSB5PTE0MSB3aWR0aD0zMCBoZWlnaHQ9NDcgeG9mZnNldD0tNCB5b2Zmc2V0PTUgeGFkdmFuY2U9MzEgcGFnZT0wIGNobmw9MTUKY2hhciBpZD02MyB4PTUwOSB5PTE4OCB3aWR0aD0zMCBoZWlnaHQ9NDcgeG9mZnNldD0tNCB5b2Zmc2V0PTUgeGFkdmFuY2U9MzEgcGFnZT0wIGNobmw9MTUKY2hhciBpZD02NCB4PTUwOSB5PTIzNSB3aWR0aD0zMCBoZWlnaHQ9NDcgeG9mZnNldD0tNCB5b2Zmc2V0PTUgeGFkdmFuY2U9MzEgcGFnZT0wIGNobmw9MTUKY2hhciBpZD02NSB4PTUwOSB5PTI4MiB3aWR0aD0zMCBoZWlnaHQ9NDcgeG9mZnNldD0tNCB5b2Zmc2V0PTUgeGFkdmFuY2U9MzEgcGFnZT0wIGNobmw9MTUKY2hhciBpZD02NiB4PTUwOSB5PTMyOSB3aWR0aD0zMCBoZWlnaHQ9NDcgeG9mZnNldD0tNCB5b2Zmc2V0PTUgeGFkdmFuY2U9MzEgcGFnZT0wIGNobmw9MTUKY2hhciBpZD02NyB4PTUwOSB5PTM3NiB3aWR0aD0zMCBoZWlnaHQ9NDcgeG9mZnNldD0tNCB5b2Zmc2V0PTUgeGFkdmFuY2U9MzEgcGFnZT0wIGNobmw9MTUKY2hhciBpZD02OCB4PTUwOSB5PTQyMyB3aWR0aD0zMCBoZWlnaHQ9NDcgeG9mZnNldD0tNCB5b2Zmc2V0PTUgeGFkdmFuY2U9MzEgcGFnZT0wIGNobmw9MTUKY2hhciBpZD02OSB4PTUwOSB5PTQ3MCB3aWR0aD0zMCBoZWlnaHQ9NDcgeG9mZnNldD0tNCB5b2Zmc2V0PTUgeGFkdmFuY2U9MzEgcGFnZT0wIGNobmw9MTUKY2hhciBpZD03MCB4PTUwOSB5PTUxNyB3aWR0aD0zMCBoZWlnaHQ9NDcgeG9mZnNldD0tNCB5b2Zmc2V0PTUgeGFkdmFuY2U9MzEgcGFnZT0wIGNobmw9MTUKY2hhciBpZD03MSB4PTUwOSB5PTU2NCB3aWR0aD0zMCBoZWlnaHQ9NDcgeG9mZnNldD0tNCB5b2Zmc2V0PTUgeGFkdmFuY2U9MzEgcGFnZT0wIGNobmw9MTUKY2hhciBpZD03MiB4PTUwOSB5PTYxMSB3aWR0aD0zMCBoZWlnaHQ9NDcgeG9mZnNldD0tNCB5b2Zmc2V0PTUgeGFkdmFuY2U9MzEgcGFnZT0wIGNobmw9MTUKY2hhciBpZD03MyB4PTUzOSB5PTAgd2lkdGg9MzAgaGVpZ2h0PTQ3IHhvZmZzZXQ9LTQgeW9mZnNldD01IHhhZHZhbmNlPTMxIHBhZ2U9MCBjaG5sPTE1CmNoYXIgaWQ9NzQgeD01MzkgeT00NyB3aWR0aD0zMCBoZWlnaHQ9NDcgeG9mZnNldD0tNCB5b2Zmc2V0PTUgeGFkdmFuY2U9MzEgcGFnZT0wIGNobmw9MTUKY2hhciBpZD03NSB4PTUzOSB5PTk0IHdpZHRoPTMwIGhlaWdodD00NyB4b2Zmc2V0PS00IHlvZmZzZXQ9NSB4YWR2YW5jZT0zMSBwYWdlPTAgY2hubD0xNQpjaGFyIGlkPTc2IHg9NTM5IHk9MTQxIHdpZHRoPTMwIGhlaWdodD00NyB4b2Zmc2V0PS00IHlvZmZzZXQ9NSB4YWR2YW5jZT0zMSBwYWdlPTAgY2hubD0xNQpjaGFyIGlkPTc3IHg9NTM5IHk9MTg4IHdpZHRoPTMwIGhlaWdodD00NyB4b2Zmc2V0PS00IHlvZmZzZXQ9NSB4YWR2YW5jZT0zMSBwYWdlPTAgY2hubD0xNQpjaGFyIGlkPTc4IHg9NTM5IHk9MjM1IHdpZHRoPTMwIGhlaWdodD00NyB4b2Zmc2V0PS00IHlvZmZzZXQ9NSB4YWR2YW5jZT0zMSBwYWdlPTAgY2hubD0xNQpjaGFyIGlkPTc5IHg9NTM5IHk9MjgyIHdpZHRoPTMwIGhlaWdodD00NyB4b2Zmc2V0PS00IHlvZmZzZXQ9NSB4YWR2YW5jZT0zMSBwYWdlPTAgY2hubD0xNQpjaGFyIGlkPTgwIHg9NTM5IHk9MzI5IHdpZHRoPTMwIGhlaWdodD00NyB4b2Zmc2V0PS00IHlvZmZzZXQ9NSB4YWR2YW5jZT0zMSBwYWdlPTAgY2hubD0xNQpjaGFyIGlkPTgxIHg9NDEzIHk9NTI3IHdpZHRoPTMwIGhlaWdodD01MiB4b2Zmc2V0PS00IHlvZmZzZXQ9NSB4YWR2YW5jZT0zMSBwYWdlPTAgY2hubD0xNQpjaGFyIGlkPTgyIHg9NTM5IHk9Mzc2IHdpZHRoPTMwIGhlaWdodD00NyB4b2Zmc2V0PS00IHlvZmZzZXQ9NSB4YWR2YW5jZT0zMSBwYWdlPTAgY2hubD0xNQpjaGFyIGlkPTgzIHg9NTM5IHk9NDIzIHdpZHRoPTMwIGhlaWdodD00NyB4b2Zmc2V0PS00IHlvZmZzZXQ9NSB4YWR2YW5jZT0zMSBwYWdlPTAgY2hubD0xNQpjaGFyIGlkPTg0IHg9NTM5IHk9NDcwIHdpZHRoPTMwIGhlaWdodD00NyB4b2Zmc2V0PS00IHlvZmZzZXQ9NSB4YWR2YW5jZT0zMSBwYWdlPTAgY2hubD0xNQpjaGFyIGlkPTg1IHg9NTM5IHk9NTE3IHdpZHRoPTMwIGhlaWdodD00NyB4b2Zmc2V0PS00IHlvZmZzZXQ9NSB4YWR2YW5jZT0zMSBwYWdlPTAgY2hubD0xNQpjaGFyIGlkPTg2IHg9NTM5IHk9NTY0IHdpZHRoPTMwIGhlaWdodD00NyB4b2Zmc2V0PS00IHlvZmZzZXQ9NSB4YWR2YW5jZT0zMSBwYWdlPTAgY2hubD0xNQpjaGFyIGlkPTg3IHg9NTM5IHk9NjExIHdpZHRoPTMwIGhlaWdodD00NyB4b2Zmc2V0PS00IHlvZmZzZXQ9NSB4YWR2YW5jZT0zMSBwYWdlPTAgY2hubD0xNQpjaGFyIGlkPTg4IHg9NTY5IHk9MCB3aWR0aD0zMCBoZWlnaHQ9NDcgeG9mZnNldD0tNCB5b2Zmc2V0PTUgeGFkdmFuY2U9MzEgcGFnZT0wIGNobmw9MTUKY2hhciBpZD04OSB4PTU2OSB5PTQ3IHdpZHRoPTMwIGhlaWdodD00NyB4b2Zmc2V0PS00IHlvZmZzZXQ9NSB4YWR2YW5jZT0zMSBwYWdlPTAgY2hubD0xNQpjaGFyIGlkPTkwIHg9NTY5IHk9OTQgd2lkdGg9MzAgaGVpZ2h0PTQ3IHhvZmZzZXQ9LTQgeW9mZnNldD01IHhhZHZhbmNlPTMxIHBhZ2U9MCBjaG5sPTE1CmNoYXIgaWQ9OTEgeD02ODkgeT00NTQgd2lkdGg9MTcgaGVpZ2h0PTU2IHhvZmZzZXQ9LTQgeW9mZnNldD0xIHhhZHZhbmNlPTE4IHBhZ2U9MCBjaG5sPTE1CmNoYXIgaWQ9OTIgeD02ODkgeT0yMjQgd2lkdGg9MjEgaGVpZ2h0PTQ3IHhvZmZzZXQ9MCB5b2Zmc2V0PTUgeGFkdmFuY2U9MzEgcGFnZT0wIGNobmw9MTUKY2hhciBpZD05MyB4PTY4OSB5PTUxMCB3aWR0aD0xNyBoZWlnaHQ9NTYgeG9mZnNldD0tNCB5b2Zmc2V0PTEgeGFkdmFuY2U9MTggcGFnZT0wIGNobmw9MTUKY2hhciBpZD05NCB4PTE2MiB5PTY3MiB3aWR0aD0yNSBoZWlnaHQ9MTcgeG9mZnNldD0tNCB5b2Zmc2V0PTUgeGFkdmFuY2U9MjYgcGFnZT0wIGNobmw9MTUKY2hhciBpZD05NSB4PTQxMyB5PTIwMiB3aWR0aD0zNCBoZWlnaHQ9MTIgeG9mZnNldD0tNCB5b2Zmc2V0PTQ5IHhhZHZhbmNlPTM1IHBhZ2U9MCBjaG5sPTE1CmNoYXIgaWQ9OTYgeD0yMTcgeT02ODkgd2lkdGg9MTcgaGVpZ2h0PTE3IHhvZmZzZXQ9LTQgeW9mZnNldD01IHhhZHZhbmNlPTE4IHBhZ2U9MCBjaG5sPTE1CmNoYXIgaWQ9OTcgeD03NyB5PTY3MiB3aWR0aD0zMCBoZWlnaHQ9MzggeG9mZnNldD0tNCB5b2Zmc2V0PTE0IHhhZHZhbmNlPTMxIHBhZ2U9MCBjaG5sPTE1CmNoYXIgaWQ9OTggeD01NjkgeT0xNDEgd2lkdGg9MzAgaGVpZ2h0PTQ3IHhvZmZzZXQ9LTQgeW9mZnNldD01IHhhZHZhbmNlPTMxIHBhZ2U9MCBjaG5sPTE1CmNoYXIgaWQ9OTkgeD0xMzIgeT02NzIgd2lkdGg9MzAgaGVpZ2h0PTM4IHhvZmZzZXQ9LTQgeW9mZnNldD0xNCB4YWR2YW5jZT0zMSBwYWdlPTAgY2hubD0xNQpjaGFyIGlkPTEwMCB4PTU2OSB5PTE4OCB3aWR0aD0zMCBoZWlnaHQ9NDcgeG9mZnNldD0tNCB5b2Zmc2V0PTUgeGFkdmFuY2U9MzEgcGFnZT0wIGNobmw9MTUKY2hhciBpZD0xMDEgeD0xODcgeT02NzIgd2lkdGg9MzAgaGVpZ2h0PTM4IHhvZmZzZXQ9LTQgeW9mZnNldD0xNCB4YWR2YW5jZT0zMSBwYWdlPTAgY2hubD0xNQpjaGFyIGlkPTEwMiB4PTY1OSB5PTQ3IHdpZHRoPTI1IGhlaWdodD00NyB4b2Zmc2V0PS00IHlvZmZzZXQ9NSB4YWR2YW5jZT0yNiBwYWdlPTAgY2hubD0xNQpjaGFyIGlkPTEwMyB4PTQ0OSB5PTY2NCB3aWR0aD0zMCBoZWlnaHQ9NDMgeG9mZnNldD0tNCB5b2Zmc2V0PTE0IHhhZHZhbmNlPTMxIHBhZ2U9MCBjaG5sPTE1CmNoYXIgaWQ9MTA0IHg9NTY5IHk9MjM1IHdpZHRoPTMwIGhlaWdodD00NyB4b2Zmc2V0PS00IHlvZmZzZXQ9NSB4YWR2YW5jZT0zMSBwYWdlPTAgY2hubD0xNQpjaGFyIGlkPTEwNSB4PTY4OSB5PTI3MSB3aWR0aD0yMSBoZWlnaHQ9NDcgeG9mZnNldD0tNCB5b2Zmc2V0PTUgeGFkdmFuY2U9MjIgcGFnZT0wIGNobmw9MTUKY2hhciBpZD0xMDYgeD01MDkgeT02NTggd2lkdGg9MjEgaGVpZ2h0PTUyIHhvZmZzZXQ9LTQgeW9mZnNldD01IHhhZHZhbmNlPTIyIHBhZ2U9MCBjaG5sPTE1CmNoYXIgaWQ9MTA3IHg9NTY5IHk9MjgyIHdpZHRoPTMwIGhlaWdodD00NyB4b2Zmc2V0PS00IHlvZmZzZXQ9NSB4YWR2YW5jZT0zMSBwYWdlPTAgY2hubD0xNQpjaGFyIGlkPTEwOCB4PTY4OSB5PTMxOCB3aWR0aD0yMSBoZWlnaHQ9NDcgeG9mZnNldD0tNCB5b2Zmc2V0PTUgeGFkdmFuY2U9MjIgcGFnZT0wIGNobmw9MTUKY2hhciBpZD0xMDkgeD0yMzggeT02NzIgd2lkdGg9MzAgaGVpZ2h0PTM4IHhvZmZzZXQ9LTQgeW9mZnNldD0xNCB4YWR2YW5jZT0zMSBwYWdlPTAgY2hubD0xNQpjaGFyIGlkPTExMCB4PTI2OCB5PTY3MiB3aWR0aD0zMCBoZWlnaHQ9MzggeG9mZnNldD0tNCB5b2Zmc2V0PTE0IHhhZHZhbmNlPTMxIHBhZ2U9MCBjaG5sPTE1CmNoYXIgaWQ9MTExIHg9Mjk4IHk9NjcyIHdpZHRoPTMwIGhlaWdodD0zOCB4b2Zmc2V0PS00IHlvZmZzZXQ9MTQgeGFkdmFuY2U9MzEgcGFnZT0wIGNobmw9MTUKY2hhciBpZD0xMTIgeD02MjkgeT0wIHdpZHRoPTMwIGhlaWdodD00MyB4b2Zmc2V0PS00IHlvZmZzZXQ9MTQgeGFkdmFuY2U9MzEgcGFnZT0wIGNobmw9MTUKY2hhciBpZD0xMTMgeD02MjkgeT00MyB3aWR0aD0zMCBoZWlnaHQ9NDMgeG9mZnNldD0tNCB5b2Zmc2V0PTE0IHhhZHZhbmNlPTMxIHBhZ2U9MCBjaG5sPTE1CmNoYXIgaWQ9MTE0IHg9MTA3IHk9NjcyIHdpZHRoPTI1IGhlaWdodD0zOCB4b2Zmc2V0PS00IHlvZmZzZXQ9MTQgeGFkdmFuY2U9MjYgcGFnZT0wIGNobmw9MTUKY2hhciBpZD0xMTUgeD02MjkgeT00Njggd2lkdGg9MzAgaGVpZ2h0PTM4IHhvZmZzZXQ9LTQgeW9mZnNldD0xNCB4YWR2YW5jZT0zMSBwYWdlPTAgY2hubD0xNQpjaGFyIGlkPTExNiB4PTY1OSB5PTk0IHdpZHRoPTI1IGhlaWdodD00NyB4b2Zmc2V0PS00IHlvZmZzZXQ9NSB4YWR2YW5jZT0yNiBwYWdlPTAgY2hubD0xNQpjaGFyIGlkPTExNyB4PTYyOSB5PTUwNiB3aWR0aD0zMCBoZWlnaHQ9MzggeG9mZnNldD0tNCB5b2Zmc2V0PTE0IHhhZHZhbmNlPTMxIHBhZ2U9MCBjaG5sPTE1CmNoYXIgaWQ9MTE4IHg9NjI5IHk9NTQ0IHdpZHRoPTMwIGhlaWdodD0zOCB4b2Zmc2V0PS00IHlvZmZzZXQ9MTQgeGFkdmFuY2U9MzEgcGFnZT0wIGNobmw9MTUKY2hhciBpZD0xMTkgeD02MjkgeT01ODIgd2lkdGg9MzAgaGVpZ2h0PTM4IHhvZmZzZXQ9LTQgeW9mZnNldD0xNCB4YWR2YW5jZT0zMSBwYWdlPTAgY2hubD0xNQpjaGFyIGlkPTEyMCB4PTYyOSB5PTYyMCB3aWR0aD0zMCBoZWlnaHQ9MzggeG9mZnNldD0tNCB5b2Zmc2V0PTE0IHhhZHZhbmNlPTMxIHBhZ2U9MCBjaG5sPTE1CmNoYXIgaWQ9MTIxIHg9NjI5IHk9ODYgd2lkdGg9MzAgaGVpZ2h0PTQzIHhvZmZzZXQ9LTQgeW9mZnNldD0xNCB4YWR2YW5jZT0zMSBwYWdlPTAgY2hubD0xNQpjaGFyIGlkPTEyMiB4PTYyOSB5PTY1OCB3aWR0aD0zMCBoZWlnaHQ9MzggeG9mZnNldD0tNCB5b2Zmc2V0PTE0IHhhZHZhbmNlPTMxIHBhZ2U9MCBjaG5sPTE1CmNoYXIgaWQ9MTIzIHg9Njg5IHk9MTEyIHdpZHRoPTIxIGhlaWdodD01NiB4b2Zmc2V0PS00IHlvZmZzZXQ9MSB4YWR2YW5jZT0yMiBwYWdlPTAgY2hubD0xNQpjaGFyIGlkPTEyNCB4PTY1OSB5PTE4MCB3aWR0aD0xMiBoZWlnaHQ9NjAgeG9mZnNldD0tNCB5b2Zmc2V0PTEgeGFkdmFuY2U9MTMgcGFnZT0wIGNobmw9MTUKY2hhciBpZD0xMjUgeD02ODkgeT0xNjggd2lkdGg9MjEgaGVpZ2h0PTU2IHhvZmZzZXQ9LTQgeW9mZnNldD0xIHhhZHZhbmNlPTIyIHBhZ2U9MCBjaG5sPTE1CmNoYXIgaWQ9MTI2IHg9NjU5IHk9MzAgd2lkdGg9MzAgaGVpZ2h0PTE3IHhvZmZzZXQ9LTQgeW9mZnNldD0xIHhhZHZhbmNlPTMxIHBhZ2U9MCBjaG5sPTE1CmNoYXIgaWQ9MTY5IHg9MzU3IHk9NTA3IHdpZHRoPTQzIGhlaWdodD01MSB4b2Zmc2V0PS00IHlvZmZzZXQ9MSB4YWR2YW5jZT00NCBwYWdlPTAgY2hubD0xNQpjaGFyIGlkPTE3NCB4PTYyOSB5PTEyOSB3aWR0aD0zMCBoZWlnaHQ9NDMgeG9mZnNldD0tNCB5b2Zmc2V0PTEgeGFkdmFuY2U9MzEgcGFnZT0wIGNobmw9MTUKY2hhciBpZD0xNzcgeD0zNTcgeT01NTggd2lkdGg9MzggaGVpZ2h0PTQ3IHhvZmZzZXQ9LTQgeW9mZnNldD01IHhhZHZhbmNlPTM5IHBhZ2U9MCBjaG5sPTE1CmNoYXIgaWQ9MTgzIHg9MzI4IHk9NjcyIHdpZHRoPTE3IGhlaWdodD0xNyB4b2Zmc2V0PS00IHlvZmZzZXQ9MTggeGFkdmFuY2U9MTggcGFnZT0wIGNobmw9MTUKY2hhciBpZD0yMDggeD01NjkgeT0zMjkgd2lkdGg9MzAgaGVpZ2h0PTQ3IHhvZmZzZXQ9LTQgeW9mZnNldD01IHhhZHZhbmNlPTMxIHBhZ2U9MCBjaG5sPTE1CmNoYXIgaWQ9MjA5IHg9NDQ5IHk9NTIgd2lkdGg9MzAgaGVpZ2h0PTUxIHhvZmZzZXQ9LTQgeW9mZnNldD0xIHhhZHZhbmNlPTMxIHBhZ2U9MCBjaG5sPTE1CmNoYXIgaWQ9MjEwIHg9NDQ5IHk9MTAzIHdpZHRoPTMwIGhlaWdodD01MSB4b2Zmc2V0PS00IHlvZmZzZXQ9MSB4YWR2YW5jZT0zMSBwYWdlPTAgY2hubD0xNQpjaGFyIGlkPTIxMSB4PTQ0OSB5PTE1NCB3aWR0aD0zMCBoZWlnaHQ9NTEgeG9mZnNldD0tNCB5b2Zmc2V0PTEgeGFkdmFuY2U9MzEgcGFnZT0wIGNobmw9MTUKY2hhciBpZD0yMTIgeD00NDkgeT0yMDUgd2lkdGg9MzAgaGVpZ2h0PTUxIHhvZmZzZXQ9LTQgeW9mZnNldD0xIHhhZHZhbmNlPTMxIHBhZ2U9MCBjaG5sPTE1CmNoYXIgaWQ9MjEzIHg9NDQ5IHk9MjU2IHdpZHRoPTMwIGhlaWdodD01MSB4b2Zmc2V0PS00IHlvZmZzZXQ9MSB4YWR2YW5jZT0zMSBwYWdlPTAgY2hubD0xNQpjaGFyIGlkPTIxNCB4PTQ0OSB5PTMwNyB3aWR0aD0zMCBoZWlnaHQ9NTEgeG9mZnNldD0tNCB5b2Zmc2V0PTEgeGFkdmFuY2U9MzEgcGFnZT0wIGNobmw9MTUKY2hhciBpZD0yMTUgeD0zNTcgeT02MDUgd2lkdGg9MzggaGVpZ2h0PTM4IHhvZmZzZXQ9LTQgeW9mZnNldD0xMCB4YWR2YW5jZT0zOSBwYWdlPTAgY2hubD0xNQpjaGFyIGlkPTIxNiB4PTQxMyB5PTM2MSB3aWR0aD0zMCBoZWlnaHQ9NTYgeG9mZnNldD0tNCB5b2Zmc2V0PTEgeGFkdmFuY2U9MzEgcGFnZT0wIGNobmw9MTUKY2hhciBpZD0yMTcgeD00NDkgeT0zNTggd2lkdGg9MzAgaGVpZ2h0PTUxIHhvZmZzZXQ9LTQgeW9mZnNldD0xIHhhZHZhbmNlPTMxIHBhZ2U9MCBjaG5sPTE1CmNoYXIgaWQ9MjE4IHg9NDQ5IHk9NDA5IHdpZHRoPTMwIGhlaWdodD01MSB4b2Zmc2V0PS00IHlvZmZzZXQ9MSB4YWR2YW5jZT0zMSBwYWdlPTAgY2hubD0xNQpjaGFyIGlkPTIxOSB4PTQ0OSB5PTQ2MCB3aWR0aD0zMCBoZWlnaHQ9NTEgeG9mZnNldD0tNCB5b2Zmc2V0PTEgeGFkdmFuY2U9MzEgcGFnZT0wIGNobmw9MTUKY2hhciBpZD0yMjAgeD00NDkgeT01MTEgd2lkdGg9MzAgaGVpZ2h0PTUxIHhvZmZzZXQ9LTQgeW9mZnNldD0xIHhhZHZhbmNlPTMxIHBhZ2U9MCBjaG5sPTE1CmNoYXIgaWQ9MjIxIHg9NDQ5IHk9NTYyIHdpZHRoPTMwIGhlaWdodD01MSB4b2Zmc2V0PS00IHlvZmZzZXQ9MSB4YWR2YW5jZT0zMSBwYWdlPTAgY2hubD0xNQpjaGFyIGlkPTIyMiB4PTU2OSB5PTM3NiB3aWR0aD0zMCBoZWlnaHQ9NDcgeG9mZnNldD0tNCB5b2Zmc2V0PTUgeGFkdmFuY2U9MzEgcGFnZT0wIGNobmw9MTUKY2hhciBpZD0yMjMgeD01NjkgeT00MjMgd2lkdGg9MzAgaGVpZ2h0PTQ3IHhvZmZzZXQ9LTQgeW9mZnNldD01IHhhZHZhbmNlPTMxIHBhZ2U9MCBjaG5sPTE1CmNoYXIgaWQ9MjI0IHg9NTY5IHk9NDcwIHdpZHRoPTMwIGhlaWdodD00NyB4b2Zmc2V0PS00IHlvZmZzZXQ9NSB4YWR2YW5jZT0zMSBwYWdlPTAgY2hubD0xNQpjaGFyIGlkPTIyNSB4PTU2OSB5PTUxNyB3aWR0aD0zMCBoZWlnaHQ9NDcgeG9mZnNldD0tNCB5b2Zmc2V0PTUgeGFkdmFuY2U9MzEgcGFnZT0wIGNobmw9MTUKY2hhciBpZD0yMjYgeD01NjkgeT01NjQgd2lkdGg9MzAgaGVpZ2h0PTQ3IHhvZmZzZXQ9LTQgeW9mZnNldD01IHhhZHZhbmNlPTMxIHBhZ2U9MCBjaG5sPTE1CmNoYXIgaWQ9MjI3IHg9NTY5IHk9NjExIHdpZHRoPTMwIGhlaWdodD00NyB4b2Zmc2V0PS00IHlvZmZzZXQ9NSB4YWR2YW5jZT0zMSBwYWdlPTAgY2hubD0xNQpjaGFyIGlkPTIyOCB4PTYyOSB5PTI1OCB3aWR0aD0zMCBoZWlnaHQ9NDIgeG9mZnNldD0tNCB5b2Zmc2V0PTEwIHhhZHZhbmNlPTMxIHBhZ2U9MCBjaG5sPTE1CmNoYXIgaWQ9MjI5IHg9NTY5IHk9NjU4IHdpZHRoPTMwIGhlaWdodD00NyB4b2Zmc2V0PS00IHlvZmZzZXQ9NSB4YWR2YW5jZT0zMSBwYWdlPTAgY2hubD0xNQpjaGFyIGlkPTIzMCB4PTEzIHk9Njc2IHdpZHRoPTMwIGhlaWdodD0zNCB4b2Zmc2V0PS00IHlvZmZzZXQ9MTggeGFkdmFuY2U9MzEgcGFnZT0wIGNobmw9MTUKY2hhciBpZD0yMzEgeD02MjkgeT0xNzIgd2lkdGg9MzAgaGVpZ2h0PTQzIHhvZmZzZXQ9LTQgeW9mZnNldD0xOCB4YWR2YW5jZT0zMSBwYWdlPTAgY2hubD0xNQpjaGFyIGlkPTIzMiB4PTU5OSB5PTAgd2lkdGg9MzAgaGVpZ2h0PTQ3IHhvZmZzZXQ9LTQgeW9mZnNldD01IHhhZHZhbmNlPTMxIHBhZ2U9MCBjaG5sPTE1CmNoYXIgaWQ9MjMzIHg9NTk5IHk9NDcgd2lkdGg9MzAgaGVpZ2h0PTQ3IHhvZmZzZXQ9LTQgeW9mZnNldD01IHhhZHZhbmNlPTMxIHBhZ2U9MCBjaG5sPTE1CmNoYXIgaWQ9MjM0IHg9NTk5IHk9OTQgd2lkdGg9MzAgaGVpZ2h0PTQ3IHhvZmZzZXQ9LTQgeW9mZnNldD01IHhhZHZhbmNlPTMxIHBhZ2U9MCBjaG5sPTE1CmNoYXIgaWQ9MjM1IHg9NjI5IHk9MzAwIHdpZHRoPTMwIGhlaWdodD00MiB4b2Zmc2V0PS00IHlvZmZzZXQ9MTAgeGFkdmFuY2U9MzEgcGFnZT0wIGNobmw9MTUKY2hhciBpZD0yMzYgeD02ODkgeT02MTMgd2lkdGg9MTcgaGVpZ2h0PTQ3IHhvZmZzZXQ9LTQgeW9mZnNldD01IHhhZHZhbmNlPTE4IHBhZ2U9MCBjaG5sPTE1CmNoYXIgaWQ9MjM3IHg9Njg5IHk9NjYwIHdpZHRoPTE3IGhlaWdodD00NyB4b2Zmc2V0PS00IHlvZmZzZXQ9NSB4YWR2YW5jZT0xOCBwYWdlPTAgY2hubD0xNQpjaGFyIGlkPTIzOCB4PTY4OSB5PTM2NSB3aWR0aD0yMSBoZWlnaHQ9NDcgeG9mZnNldD0tNCB5b2Zmc2V0PTUgeGFkdmFuY2U9MjIgcGFnZT0wIGNobmw9MTUKY2hhciBpZD0yMzkgeD02ODkgeT00MTIgd2lkdGg9MjEgaGVpZ2h0PTQyIHhvZmZzZXQ9LTQgeW9mZnNldD0xMCB4YWR2YW5jZT0yMiBwYWdlPTAgY2hubD0xNQpjaGFyIGlkPTI0MCB4PTU5OSB5PTE0MSB3aWR0aD0zMCBoZWlnaHQ9NDcgeG9mZnNldD0tNCB5b2Zmc2V0PTUgeGFkdmFuY2U9MzEgcGFnZT0wIGNobmw9MTUKY2hhciBpZD0yNDEgeD01OTkgeT0xODggd2lkdGg9MzAgaGVpZ2h0PTQ3IHhvZmZzZXQ9LTQgeW9mZnNldD01IHhhZHZhbmNlPTMxIHBhZ2U9MCBjaG5sPTE1CmNoYXIgaWQ9MjQyIHg9NTk5IHk9MjM1IHdpZHRoPTMwIGhlaWdodD00NyB4b2Zmc2V0PS00IHlvZmZzZXQ9NSB4YWR2YW5jZT0zMSBwYWdlPTAgY2hubD0xNQpjaGFyIGlkPTI0MyB4PTU5OSB5PTI4MiB3aWR0aD0zMCBoZWlnaHQ9NDcgeG9mZnNldD0tNCB5b2Zmc2V0PTUgeGFkdmFuY2U9MzEgcGFnZT0wIGNobmw9MTUKY2hhciBpZD0yNDQgeD01OTkgeT0zMjkgd2lkdGg9MzAgaGVpZ2h0PTQ3IHhvZmZzZXQ9LTQgeW9mZnNldD01IHhhZHZhbmNlPTMxIHBhZ2U9MCBjaG5sPTE1CmNoYXIgaWQ9MjQ1IHg9NTk5IHk9Mzc2IHdpZHRoPTMwIGhlaWdodD00NyB4b2Zmc2V0PS00IHlvZmZzZXQ9NSB4YWR2YW5jZT0zMSBwYWdlPTAgY2hubD0xNQpjaGFyIGlkPTI0NiB4PTYyOSB5PTM0MiB3aWR0aD0zMCBoZWlnaHQ9NDIgeG9mZnNldD0tNCB5b2Zmc2V0PTEwIHhhZHZhbmNlPTMxIHBhZ2U9MCBjaG5sPTE1CmNoYXIgaWQ9MjQ3IHg9MzU3IHk9MzQ2IHdpZHRoPTQ3IGhlaWdodD00NyB4b2Zmc2V0PS00IHlvZmZzZXQ9NSB4YWR2YW5jZT00OCBwYWdlPTAgY2hubD0xNQpjaGFyIGlkPTI0OCB4PTYyOSB5PTIxNSB3aWR0aD0zMCBoZWlnaHQ9NDMgeG9mZnNldD0tNCB5b2Zmc2V0PTE0IHhhZHZhbmNlPTMxIHBhZ2U9MCBjaG5sPTE1CmNoYXIgaWQ9MjQ5IHg9NTk5IHk9NDIzIHdpZHRoPTMwIGhlaWdodD00NyB4b2Zmc2V0PS00IHlvZmZzZXQ9NSB4YWR2YW5jZT0zMSBwYWdlPTAgY2hubD0xNQpjaGFyIGlkPTI1MCB4PTU5OSB5PTQ3MCB3aWR0aD0zMCBoZWlnaHQ9NDcgeG9mZnNldD0tNCB5b2Zmc2V0PTUgeGFkdmFuY2U9MzEgcGFnZT0wIGNobmw9MTUKY2hhciBpZD0yNTEgeD01OTkgeT01MTcgd2lkdGg9MzAgaGVpZ2h0PTQ3IHhvZmZzZXQ9LTQgeW9mZnNldD01IHhhZHZhbmNlPTMxIHBhZ2U9MCBjaG5sPTE1CmNoYXIgaWQ9MjUyIHg9NjI5IHk9Mzg0IHdpZHRoPTMwIGhlaWdodD00MiB4b2Zmc2V0PS00IHlvZmZzZXQ9MTAgeGFkdmFuY2U9MzEgcGFnZT0wIGNobmw9MTUKY2hhciBpZD0yNTMgeD00MTMgeT01Nzkgd2lkdGg9MzAgaGVpZ2h0PTUyIHhvZmZzZXQ9LTQgeW9mZnNldD01IHhhZHZhbmNlPTMxIHBhZ2U9MCBjaG5sPTE1CmNoYXIgaWQ9MjU0IHg9NDEzIHk9NjMxIHdpZHRoPTMwIGhlaWdodD01MiB4b2Zmc2V0PS00IHlvZmZzZXQ9NSB4YWR2YW5jZT0zMSBwYWdlPTAgY2hubD0xNQpjaGFyIGlkPTI1NSB4PTU5OSB5PTU2NCB3aWR0aD0zMCBoZWlnaHQ9NDcgeG9mZnNldD0tNCB5b2Zmc2V0PTEwIHhhZHZhbmNlPTMxIHBhZ2U9MCBjaG5sPTE1CmNoYXIgaWQ9MjU2IHg9NDQ5IHk9NjEzIHdpZHRoPTMwIGhlaWdodD01MSB4b2Zmc2V0PS00IHlvZmZzZXQ9MSB4YWR2YW5jZT0zMSBwYWdlPTAgY2hubD0xNQpjaGFyIGlkPTI1NyB4PTYyOSB5PTQyNiB3aWR0aD0zMCBoZWlnaHQ9NDIgeG9mZnNldD0tNCB5b2Zmc2V0PTEwIHhhZHZhbmNlPTMxIHBhZ2U9MCBjaG5sPTE1CmNoYXIgaWQ9MjU4IHg9NDc5IHk9MCB3aWR0aD0zMCBoZWlnaHQ9NTEgeG9mZnNldD0tNCB5b2Zmc2V0PTEgeGFkdmFuY2U9MzEgcGFnZT0wIGNobmw9MTUKY2hhciBpZD0yNTkgeD01OTkgeT02MTEgd2lkdGg9MzAgaGVpZ2h0PTQ3IHhvZmZzZXQ9LTQgeW9mZnNldD01IHhhZHZhbmNlPTMxIHBhZ2U9MCBjaG5sPTE1CmNoYXIgaWQ9NDg1IHg9NDEzIHk9NTMgd2lkdGg9MzYgaGVpZ2h0PTQyIHhvZmZzZXQ9LTUgeW9mZnNldD0xNiB4YWR2YW5jZT0yNiBwYWdlPTAgY2hubD0xNQpjaGFyIGlkPTQ4NiB4PTAgeT00MiB3aWR0aD03MSBoZWlnaHQ9NDggeG9mZnNldD0tMiB5b2Zmc2V0PTAgeGFkdmFuY2U9MzYgcGFnZT0wIGNobmw9MTUKY2hhciBpZD00ODcgeD0wIHk9MjI3IHdpZHRoPTY1IGhlaWdodD01OSB4b2Zmc2V0PS0yIHlvZmZzZXQ9MSB4YWR2YW5jZT0zMCBwYWdlPTAgY2hubD0xNQpjaGFyIGlkPTQ4OCB4PTAgeT0xODAgd2lkdGg9NjcgaGVpZ2h0PTQ3IHhvZmZzZXQ9MCB5b2Zmc2V0PTAgeGFkdmFuY2U9MzQgcGFnZT0wIGNobmw9MTUKY2hhciBpZD00ODkgeD0wIHk9Mjg2IHdpZHRoPTYyIGhlaWdodD01MCB4b2Zmc2V0PTAgeW9mZnNldD0tMyB4YWR2YW5jZT0yOSBwYWdlPTAgY2hubD0xNQpjaGFyIGlkPTQ5MCB4PTM1NyB5PTQ1NCB3aWR0aD00MyBoZWlnaHQ9NTMgeG9mZnNldD0tMyB5b2Zmc2V0PTUgeGFkdmFuY2U9MzggcGFnZT0wIGNobmw9MTUKY2hhciBpZD00OTEgeD00MTMgeT0zMTkgd2lkdGg9MzIgaGVpZ2h0PTQyIHhvZmZzZXQ9LTMgeW9mZnNldD0xNiB4YWR2YW5jZT0yNiBwYWdlPTAgY2hubD0xNQpjaGFyIGlkPTQ5MiB4PTM1NyB5PTM5MyB3aWR0aD00MyBoZWlnaHQ9NjEgeG9mZnNldD0tMyB5b2Zmc2V0PS0zIHhhZHZhbmNlPTM4IHBhZ2U9MCBjaG5sPTE1CmNoYXIgaWQ9NDkzIHg9NDEzIHk9MjY4IHdpZHRoPTMyIGhlaWdodD01MSB4b2Zmc2V0PS0zIHlvZmZzZXQ9NyB4YWR2YW5jZT0yNiBwYWdlPTAgY2hubD0xNQpjaGFyIGlkPTQ5NCB4PTQxMyB5PTk1IHdpZHRoPTM1IGhlaWdodD02NSB4b2Zmc2V0PS00IHlvZmZzZXQ9LTcgeGFkdmFuY2U9MjkgcGFnZT0wIGNobmw9MTUKY2hhciBpZD00OTUgeD00MTMgeT00NzMgd2lkdGg9MzAgaGVpZ2h0PTU0IHhvZmZzZXQ9LTQgeW9mZnNldD00IHhhZHZhbmNlPTI0IHBhZ2U9MCBjaG5sPTE1CmNoYXIgaWQ9NDk2IHg9MzU3IHk9MTg2IHdpZHRoPTU1IGhlaWdodD02MiB4b2Zmc2V0PS03IHlvZmZzZXQ9LTIgeGFkdmFuY2U9MTUgcGFnZT0wIGNobmw9MTUKY2hhciBpZD00OTcgeD0wIHk9MCB3aWR0aD03NyBoZWlnaHQ9NDIgeG9mZnNldD0tNCB5b2Zmc2V0PTUgeGFkdmFuY2U9NzAgcGFnZT0wIGNobmw9MTUKY2hhciBpZD00OTggeD0wIHk9OTAgd2lkdGg9NjkgaGVpZ2h0PTQyIHhvZmZzZXQ9LTQgeW9mZnNldD01IHhhZHZhbmNlPTYxIHBhZ2U9MCBjaG5sPTE1CmNoYXIgaWQ9NDk5IHg9MzU3IHk9OTkgd2lkdGg9NTYgaGVpZ2h0PTQ0IHhvZmZzZXQ9LTMgeW9mZnNldD0zIHhhZHZhbmNlPTUwIHBhZ2U9MCBjaG5sPTE1CmNoYXIgaWQ9NTAwIHg9MCB5PTEzMiB3aWR0aD02OCBoZWlnaHQ9NDggeG9mZnNldD0tMiB5b2Zmc2V0PTAgeGFkdmFuY2U9MzYgcGFnZT0wIGNobmw9MTUKY2hhciBpZD01MDEgeD0wIHk9MzM2IHdpZHRoPTYxIGhlaWdodD02MCB4b2Zmc2V0PS0yIHlvZmZzZXQ9MCB4YWR2YW5jZT0zMCBwYWdlPTAgY2hubD0xNQpjaGFyIGlkPTUwMiB4PTM1NyB5PTI0OCB3aWR0aD01NCBoZWlnaHQ9NDIgeG9mZnNldD0tNCB5b2Zmc2V0PTUgeGFkdmFuY2U9NTAgcGFnZT0wIGNobmw9MTUKY2hhciBpZD01MDMgeD00MTMgeT0wIHdpZHRoPTM2IGhlaWdodD01MyB4b2Zmc2V0PS00IHlvZmZzZXQ9NSB4YWR2YW5jZT0zMCBwYWdlPTAgY2hubD0xNQpjaGFyIGlkPTUwNCB4PTM1NyB5PTY0MyB3aWR0aD0zNyBoZWlnaHQ9NTkgeG9mZnNldD0wIHlvZmZzZXQ9LTEyIHhhZHZhbmNlPTM4IHBhZ2U9MCBjaG5sPTE1CmNoYXIgaWQ9NTA1IHg9NDEzIHk9MjE0IHdpZHRoPTMyIGhlaWdodD01NCB4b2Zmc2V0PTAgeW9mZnNldD0tNyB4YWR2YW5jZT0zMiBwYWdlPTAgY2hubD0xNQpjaGFyIGlkPTUwNiB4PTQ3OSB5PTUxIHdpZHRoPTMwIGhlaWdodD01MSB4b2Zmc2V0PS00IHlvZmZzZXQ9MSB4YWR2YW5jZT0zMSBwYWdlPTAgY2hubD0xNQpjaGFyIGlkPTUwNyB4PTQ3OSB5PTEwMiB3aWR0aD0zMCBoZWlnaHQ9NTEgeG9mZnNldD0tNCB5b2Zmc2V0PTEgeGFkdmFuY2U9MzEgcGFnZT0wIGNobmw9MTUKY2hhciBpZD01MDggeD00NzkgeT0xNTMgd2lkdGg9MzAgaGVpZ2h0PTUxIHhvZmZzZXQ9LTQgeW9mZnNldD0xIHhhZHZhbmNlPTMxIHBhZ2U9MCBjaG5sPTE1CmNoYXIgaWQ9NTA5IHg9NTk5IHk9NjU4IHdpZHRoPTMwIGhlaWdodD00NyB4b2Zmc2V0PS00IHlvZmZzZXQ9NSB4YWR2YW5jZT0zMSBwYWdlPTAgY2hubD0xNQpjaGFyIGlkPTUxMCB4PTQxMyB5PTQxNyB3aWR0aD0zMCBoZWlnaHQ9NTYgeG9mZnNldD0tNCB5b2Zmc2V0PTEgeGFkdmFuY2U9MzEgcGFnZT0wIGNobmw9MTUKY2hhciBpZD01MTEgeD00NDkgeT0wIHdpZHRoPTMwIGhlaWdodD01MiB4b2Zmc2V0PS00IHlvZmZzZXQ9NSB4YWR2YW5jZT0zMSBwYWdlPTAgY2hubD0xNQpjaGFyIGlkPTg3MzQgeD0zNTcgeT0xNDMgd2lkdGg9NTYgaGVpZ2h0PTMwIHhvZmZzZXQ9LTQgeW9mZnNldD0xNCB4YWR2YW5jZT01NyBwYWdlPTAgY2hubD0xNQpjaGFyIGlkPTE5OTY4IHg9MzU3IHk9MTczIHdpZHRoPTU2IGhlaWdodD0xMyB4b2Zmc2V0PS00IHlvZmZzZXQ9MTggeGFkdmFuY2U9NTcgcGFnZT0wIGNobmw9MTUKY2hhciBpZD0xOTk3NyB4PTM1NyB5PTAgd2lkdGg9NTYgaGVpZ2h0PTUyIHhvZmZzZXQ9LTQgeW9mZnNldD01IHhhZHZhbmNlPTU3IHBhZ2U9MCBjaG5sPTE1CmNoYXIgaWQ9MTk5NzggeD0xODkgeT01NiB3aWR0aD01NiBoZWlnaHQ9NTYgeG9mZnNldD0tNCB5b2Zmc2V0PTEgeGFkdmFuY2U9NTcgcGFnZT0wIGNobmw9MTUKY2hhciBpZD0xOTk4MSB4PTEzMyB5PTUwNCB3aWR0aD01NiBoZWlnaHQ9NTYgeG9mZnNldD0tNCB5b2Zmc2V0PTEgeGFkdmFuY2U9NTcgcGFnZT0wIGNobmw9MTUKY2hhciBpZD0yMDAxMyB4PTMwMSB5PTUwNCB3aWR0aD01NiBoZWlnaHQ9NTYgeG9mZnNldD0tNCB5b2Zmc2V0PTEgeGFkdmFuY2U9NTcgcGFnZT0wIGNobmw9MTUKY2hhciBpZD0yMDEwOCB4PTM1NyB5PTUyIHdpZHRoPTU2IGhlaWdodD00NyB4b2Zmc2V0PS00IHlvZmZzZXQ9NSB4YWR2YW5jZT01NyBwYWdlPTAgY2hubD0xNQpjaGFyIGlkPTIwMjE5IHg9NzcgeT01NjAgd2lkdGg9NTYgaGVpZ2h0PTU2IHhvZmZzZXQ9LTQgeW9mZnNldD0xIHhhZHZhbmNlPTU3IHBhZ2U9MCBjaG5sPTE1CmNoYXIgaWQ9MjAyOTQgeD0zMDEgeT00NDggd2lkdGg9NTYgaGVpZ2h0PTU2IHhvZmZzZXQ9LTQgeW9mZnNldD0xIHhhZHZhbmNlPTU3IHBhZ2U9MCBjaG5sPTE1CmNoYXIgaWQ9MjA0NDUgeD0yNDUgeT0yMjQgd2lkdGg9NTYgaGVpZ2h0PTU2IHhvZmZzZXQ9LTQgeW9mZnNldD0xIHhhZHZhbmNlPTU3IHBhZ2U9MCBjaG5sPTE1CmNoYXIgaWQ9MjA4MDUgeD0zMDEgeT01NiB3aWR0aD01NiBoZWlnaHQ9NTYgeG9mZnNldD0tNCB5b2Zmc2V0PTEgeGFkdmFuY2U9NTcgcGFnZT0wIGNobmw9MTUKY2hhciBpZD0yMDg2OSB4PTMwMSB5PTExMiB3aWR0aD01NiBoZWlnaHQ9NTYgeG9mZnNldD0tNCB5b2Zmc2V0PTEgeGFkdmFuY2U9NTcgcGFnZT0wIGNobmw9MTUKY2hhciBpZD0yMDk4NiB4PTEzMyB5PTE2OCB3aWR0aD01NiBoZWlnaHQ9NTYgeG9mZnNldD0tNCB5b2Zmc2V0PTEgeGFkdmFuY2U9NTcgcGFnZT0wIGNobmw9MTUKY2hhciBpZD0yMDk4NyB4PTAgeT02MjAgd2lkdGg9NTYgaGVpZ2h0PTU2IHhvZmZzZXQ9LTQgeW9mZnNldD0xIHhhZHZhbmNlPTU3IHBhZ2U9MCBjaG5sPTE1CmNoYXIgaWQ9MjEwMTUgeD0xODkgeT0zOTIgd2lkdGg9NTYgaGVpZ2h0PTU2IHhvZmZzZXQ9LTQgeW9mZnNldD0xIHhhZHZhbmNlPTU3IHBhZ2U9MCBjaG5sPTE1CmNoYXIgaWQ9MjEwNDAgeD0yNDUgeT0wIHdpZHRoPTU2IGhlaWdodD01NiB4b2Zmc2V0PS00IHlvZmZzZXQ9MSB4YWR2YW5jZT01NyBwYWdlPTAgY2hubD0xNQpjaGFyIGlkPTIxMjUzIHg9MjQ1IHk9NjE2IHdpZHRoPTU2IGhlaWdodD01NiB4b2Zmc2V0PS00IHlvZmZzZXQ9MSB4YWR2YW5jZT01NyBwYWdlPTAgY2hubD0xNQpjaGFyIGlkPTIxMzIyIHg9MTg5IHk9MTEyIHdpZHRoPTU2IGhlaWdodD01NiB4b2Zmc2V0PS00IHlvZmZzZXQ9MSB4YWR2YW5jZT01NyBwYWdlPTAgY2hubD0xNQpjaGFyIGlkPTIxMzMzIHg9NzcgeT01MDQgd2lkdGg9NTYgaGVpZ2h0PTU2IHhvZmZzZXQ9LTQgeW9mZnNldD0xIHhhZHZhbmNlPTU3IHBhZ2U9MCBjaG5sPTE1CmNoYXIgaWQ9MjE0ODIgeD0xMzMgeT0yODAgd2lkdGg9NTYgaGVpZ2h0PTU2IHhvZmZzZXQ9LTQgeW9mZnNldD0xIHhhZHZhbmNlPTU3IHBhZ2U9MCBjaG5sPTE1CmNoYXIgaWQ9MjE1MTYgeD0xODkgeT0zMzYgd2lkdGg9NTYgaGVpZ2h0PTU2IHhvZmZzZXQ9LTQgeW9mZnNldD0xIHhhZHZhbmNlPTU3IHBhZ2U9MCBjaG5sPTE1CmNoYXIgaWQ9MjE1NDcgeD0zMDEgeT0wIHdpZHRoPTU2IGhlaWdodD01NiB4b2Zmc2V0PS00IHlvZmZzZXQ9MSB4YWR2YW5jZT01NyBwYWdlPTAgY2hubD0xNQpjaGFyIGlkPTIyMjM1IHg9NzcgeT01NiB3aWR0aD01NiBoZWlnaHQ9NTYgeG9mZnNldD0tNCB5b2Zmc2V0PTEgeGFkdmFuY2U9NTcgcGFnZT0wIGNobmw9MTUKY2hhciBpZD0yMjMxMiB4PTE4OSB5PTAgd2lkdGg9NTYgaGVpZ2h0PTU2IHhvZmZzZXQ9LTQgeW9mZnNldD0xIHhhZHZhbmNlPTU3IHBhZ2U9MCBjaG5sPTE1CmNoYXIgaWQ9MjIzMjAgeD0xODkgeT0yMjQgd2lkdGg9NTYgaGVpZ2h0PTU2IHhvZmZzZXQ9LTQgeW9mZnNldD0xIHhhZHZhbmNlPTU3IHBhZ2U9MCBjaG5sPTE1CmNoYXIgaWQ9MjIzMzAgeD0xODkgeT0xNjggd2lkdGg9NTYgaGVpZ2h0PTU2IHhvZmZzZXQ9LTQgeW9mZnNldD0xIHhhZHZhbmNlPTU3IHBhZ2U9MCBjaG5sPTE1CmNoYXIgaWQ9MjIzMzQgeD0yNDUgeT01MDQgd2lkdGg9NTYgaGVpZ2h0PTU2IHhvZmZzZXQ9LTQgeW9mZnNldD0xIHhhZHZhbmNlPTU3IHBhZ2U9MCBjaG5sPTE1CmNoYXIgaWQ9MjIzNTkgeD03NyB5PTIyNCB3aWR0aD01NiBoZWlnaHQ9NTYgeG9mZnNldD0tNCB5b2Zmc2V0PTEgeGFkdmFuY2U9NTcgcGFnZT0wIGNobmw9MTUKY2hhciBpZD0yMjQwMyB4PTI0NSB5PTQ0OCB3aWR0aD01NiBoZWlnaHQ9NTYgeG9mZnNldD0tNCB5b2Zmc2V0PTEgeGFkdmFuY2U9NTcgcGFnZT0wIGNobmw9MTUKY2hhciBpZD0yMjUzNCB4PTE4OSB5PTYxNiB3aWR0aD01NiBoZWlnaHQ9NTYgeG9mZnNldD0tNCB5b2Zmc2V0PTEgeGFkdmFuY2U9NTcgcGFnZT0wIGNobmw9MTUKY2hhciBpZD0yMzM4NCB4PTc3IHk9MzM2IHdpZHRoPTU2IGhlaWdodD01NiB4b2Zmc2V0PS00IHlvZmZzZXQ9MSB4YWR2YW5jZT01NyBwYWdlPTAgY2hubD0xNQpjaGFyIGlkPTIzNDM2IHg9MCB5PTM5NiB3aWR0aD01NiBoZWlnaHQ9NTYgeG9mZnNldD0tNCB5b2Zmc2V0PTEgeGFkdmFuY2U9NTcgcGFnZT0wIGNobmw9MTUKY2hhciBpZD0yMzU2OSB4PTI0NSB5PTExMiB3aWR0aD01NiBoZWlnaHQ9NTYgeG9mZnNldD0tNCB5b2Zmc2V0PTEgeGFkdmFuY2U9NTcgcGFnZT0wIGNobmw9MTUKY2hhciBpZD0yNDE4MiB4PTEzMyB5PTU2MCB3aWR0aD01NiBoZWlnaHQ9NTYgeG9mZnNldD0tNCB5b2Zmc2V0PTEgeGFkdmFuY2U9NTcgcGFnZT0wIGNobmw9MTUKY2hhciBpZD0yNDQyNSB4PTMwMSB5PTM5MiB3aWR0aD01NiBoZWlnaHQ9NTYgeG9mZnNldD0tNCB5b2Zmc2V0PTEgeGFkdmFuY2U9NTcgcGFnZT0wIGNobmw9MTUKY2hhciBpZD0yNDUxNSB4PTMwMSB5PTU2MCB3aWR0aD01NiBoZWlnaHQ9NTYgeG9mZnNldD0tNCB5b2Zmc2V0PTEgeGFkdmFuY2U9NTcgcGFnZT0wIGNobmw9MTUKY2hhciBpZD0yNDg0NyB4PTc3IHk9NjE2IHdpZHRoPTU2IGhlaWdodD01NiB4b2Zmc2V0PS00IHlvZmZzZXQ9MSB4YWR2YW5jZT01NyBwYWdlPTAgY2hubD0xNQpjaGFyIGlkPTI1MTA0IHg9MCB5PTQ1MiB3aWR0aD01NiBoZWlnaHQ9NTYgeG9mZnNldD0tNCB5b2Zmc2V0PTEgeGFkdmFuY2U9NTcgcGFnZT0wIGNobmw9MTUKY2hhciBpZD0yNTI2OSB4PTMwMSB5PTIyNCB3aWR0aD01NiBoZWlnaHQ9NTYgeG9mZnNldD0tNCB5b2Zmc2V0PTEgeGFkdmFuY2U9NTcgcGFnZT0wIGNobmw9MTUKY2hhciBpZD0yNTM0NSB4PTI0NSB5PTI4MCB3aWR0aD01NiBoZWlnaHQ9NTYgeG9mZnNldD0tNCB5b2Zmc2V0PTEgeGFkdmFuY2U9NTcgcGFnZT0wIGNobmw9MTUKY2hhciBpZD0yNTkxNSB4PTEzMyB5PTIyNCB3aWR0aD01NiBoZWlnaHQ9NTYgeG9mZnNldD0tNCB5b2Zmc2V0PTEgeGFkdmFuY2U9NTcgcGFnZT0wIGNobmw9MTUKY2hhciBpZD0yNTkxOCB4PTEzMyB5PTU2IHdpZHRoPTU2IGhlaWdodD01NiB4b2Zmc2V0PS00IHlvZmZzZXQ9MSB4YWR2YW5jZT01NyBwYWdlPTAgY2hubD0xNQpjaGFyIGlkPTI2MDU5IHg9NzcgeT0zOTIgd2lkdGg9NTYgaGVpZ2h0PTU2IHhvZmZzZXQ9LTQgeW9mZnNldD0xIHhhZHZhbmNlPTU3IHBhZ2U9MCBjaG5sPTE1CmNoYXIgaWQ9MjYwODAgeD0zMDEgeT0xNjggd2lkdGg9NTYgaGVpZ2h0PTU2IHhvZmZzZXQ9LTQgeW9mZnNldD0xIHhhZHZhbmNlPTU3IHBhZ2U9MCBjaG5sPTE1CmNoYXIgaWQ9MjYxMDIgeD0xMzMgeT0zOTIgd2lkdGg9NTYgaGVpZ2h0PTU2IHhvZmZzZXQ9LTQgeW9mZnNldD0xIHhhZHZhbmNlPTU3IHBhZ2U9MCBjaG5sPTE1CmNoYXIgaWQ9MjYyNDIgeD03NyB5PTI4MCB3aWR0aD01NiBoZWlnaHQ9NTYgeG9mZnNldD0tNCB5b2Zmc2V0PTEgeGFkdmFuY2U9NTcgcGFnZT0wIGNobmw9MTUKY2hhciBpZD0yNjM5NyB4PTMwMSB5PTI4MCB3aWR0aD01NiBoZWlnaHQ9NTYgeG9mZnNldD0tNCB5b2Zmc2V0PTEgeGFkdmFuY2U9NTcgcGFnZT0wIGNobmw9MTUKY2hhciBpZD0yNzE3OCB4PTEzMyB5PTAgd2lkdGg9NTYgaGVpZ2h0PTU2IHhvZmZzZXQ9LTQgeW9mZnNldD0xIHhhZHZhbmNlPTU3IHBhZ2U9MCBjaG5sPTE1CmNoYXIgaWQ9Mjc0MjUgeD0wIHk9NTA4IHdpZHRoPTU2IGhlaWdodD01NiB4b2Zmc2V0PS00IHlvZmZzZXQ9MSB4YWR2YW5jZT01NyBwYWdlPTAgY2hubD0xNQpjaGFyIGlkPTI4MDQwIHg9NzcgeT0wIHdpZHRoPTU2IGhlaWdodD01NiB4b2Zmc2V0PS00IHlvZmZzZXQ9MSB4YWR2YW5jZT01NyBwYWdlPTAgY2hubD0xNQpjaGFyIGlkPTI5OTkyIHg9MzU3IHk9MjkwIHdpZHRoPTUxIGhlaWdodD01NiB4b2Zmc2V0PS00IHlvZmZzZXQ9MSB4YWR2YW5jZT01NyBwYWdlPTAgY2hubD0xNQpjaGFyIGlkPTMwMzQwIHg9MTg5IHk9MjgwIHdpZHRoPTU2IGhlaWdodD01NiB4b2Zmc2V0PS00IHlvZmZzZXQ9MSB4YWR2YW5jZT01NyBwYWdlPTAgY2hubD0xNQpjaGFyIGlkPTMwNDUyIHg9MTg5IHk9NDQ4IHdpZHRoPTU2IGhlaWdodD01NiB4b2Zmc2V0PS00IHlvZmZzZXQ9MSB4YWR2YW5jZT01NyBwYWdlPTAgY2hubD0xNQpjaGFyIGlkPTMxMTgxIHg9MjQ1IHk9MzkyIHdpZHRoPTU2IGhlaWdodD01NiB4b2Zmc2V0PS00IHlvZmZzZXQ9MSB4YWR2YW5jZT01NyBwYWdlPTAgY2hubD0xNQpjaGFyIGlkPTMxMTg2IHg9MjQ1IHk9MzM2IHdpZHRoPTU2IGhlaWdodD01NiB4b2Zmc2V0PS00IHlvZmZzZXQ9MSB4YWR2YW5jZT01NyBwYWdlPTAgY2hubD0xNQpjaGFyIGlkPTMxMjI3IHg9MTMzIHk9NjE2IHdpZHRoPTU2IGhlaWdodD01NiB4b2Zmc2V0PS00IHlvZmZzZXQ9MSB4YWR2YW5jZT01NyBwYWdlPTAgY2hubD0xNQpjaGFyIGlkPTMxNTMyIHg9MjQ1IHk9MTY4IHdpZHRoPTU2IGhlaWdodD01NiB4b2Zmc2V0PS00IHlvZmZzZXQ9MSB4YWR2YW5jZT01NyBwYWdlPTAgY2hubD0xNQpjaGFyIGlkPTMzMjY3IHg9MjQ1IHk9NTYgd2lkdGg9NTYgaGVpZ2h0PTU2IHhvZmZzZXQ9LTQgeW9mZnNldD0xIHhhZHZhbmNlPTU3IHBhZ2U9MCBjaG5sPTE1CmNoYXIgaWQ9MzMzOTQgeD0zMDEgeT0zMzYgd2lkdGg9NTYgaGVpZ2h0PTU2IHhvZmZzZXQ9LTQgeW9mZnNldD0xIHhhZHZhbmNlPTU3IHBhZ2U9MCBjaG5sPTE1CmNoYXIgaWQ9MzQ4OTIgeD03NyB5PTE2OCB3aWR0aD01NiBoZWlnaHQ9NTYgeG9mZnNldD0tNCB5b2Zmc2V0PTEgeGFkdmFuY2U9NTcgcGFnZT0wIGNobmw9MTUKY2hhciBpZD0zNjcxNiB4PTc3IHk9NDQ4IHdpZHRoPTU2IGhlaWdodD01NiB4b2Zmc2V0PS00IHlvZmZzZXQ9MSB4YWR2YW5jZT01NyBwYWdlPTAgY2hubD0xNQpjaGFyIGlkPTM2NzE4IHg9MjQ1IHk9NTYwIHdpZHRoPTU2IGhlaWdodD01NiB4b2Zmc2V0PS00IHlvZmZzZXQ9MSB4YWR2YW5jZT01NyBwYWdlPTAgY2hubD0xNQpjaGFyIGlkPTM2NzE5IHg9MTg5IHk9NTA0IHdpZHRoPTU2IGhlaWdodD01NiB4b2Zmc2V0PS00IHlvZmZzZXQ9MSB4YWR2YW5jZT01NyBwYWdlPTAgY2hubD0xNQpjaGFyIGlkPTM2NzkzIHg9MzAxIHk9NjE2IHdpZHRoPTU2IGhlaWdodD01NiB4b2Zmc2V0PS00IHlvZmZzZXQ9MSB4YWR2YW5jZT01NyBwYWdlPTAgY2hubD0xNQpjaGFyIGlkPTM2ODMwIHg9MCB5PTU2NCB3aWR0aD01NiBoZWlnaHQ9NTYgeG9mZnNldD0tNCB5b2Zmc2V0PTEgeGFkdmFuY2U9NTcgcGFnZT0wIGNobmw9MTUKY2hhciBpZD0zNjg2NSB4PTEzMyB5PTExMiB3aWR0aD01NiBoZWlnaHQ9NTYgeG9mZnNldD0tNCB5b2Zmc2V0PTEgeGFkdmFuY2U9NTcgcGFnZT0wIGNobmw9MTUKY2hhciBpZD0zNjg3MCB4PTEzMyB5PTMzNiB3aWR0aD01NiBoZWlnaHQ9NTYgeG9mZnNldD0tNCB5b2Zmc2V0PTEgeGFkdmFuY2U9NTcgcGFnZT0wIGNobmw9MTUKY2hhciBpZD0zODAyNCB4PTEzMyB5PTQ0OCB3aWR0aD01NiBoZWlnaHQ9NTYgeG9mZnNldD0tNCB5b2Zmc2V0PTEgeGFkdmFuY2U9NTcgcGFnZT0wIGNobmw9MTUKY2hhciBpZD0zODQ3NyB4PTE4OSB5PTU2MCB3aWR0aD01NiBoZWlnaHQ9NTYgeG9mZnNldD0tNCB5b2Zmc2V0PTEgeGFkdmFuY2U9NTcgcGFnZT0wIGNobmw9MTUKY2hhciBpZD0zODUwMCB4PTc3IHk9MTEyIHdpZHRoPTU2IGhlaWdodD01NiB4b2Zmc2V0PS00IHlvZmZzZXQ9MSB4YWR2YW5jZT01NyBwYWdlPTAgY2hubD0xNQo=",

                    "/js/tetrio.js": async () => {
                        const response = await fetch("/js/tetrio.js");
                        const raw = await response.text();

                        return raw.replace(
                            /zenith.ns.zenithprompts(.*?)update\(e\){/gi,
                            `zenith.ns.zenithprompts$1update(e) {
                                const _replaceTexts = ${JSON.stringify(zenithPromptMap)};
                        
                                e = e.map(item => {
                                    if (_replaceTexts[item.label] !== undefined) {
                                        item.label = _replaceTexts[item.label];
                                    }
                            
                                    return item;
                                });
                            `,
                        );
                    },
                },
            },
        };

        const until = async (checker) => {
            while (true) {
                const check = checker();

                await new Promise((resolve) => {
                    setTimeout(async () => {
                        resolve();
                    }, 0);
                });

                if (check) {
                    break;
                }
            }
        };

        unsafeWindow.XMLHttpRequest.prototype.send = function (...args) {
            log("xhr.open", this, args);

            if (this._hooked && GM_getValue('replaceGame', 1) === 1) {
                const _callback = this.onload;

                this.onload = async (...args) => {
                    const urlWithoutQuery = this._url.split("?", 2)[0];

                    if (urlWithoutQuery !== undefined) {
                        let raw = null;

                        if (config.replacements.requests[urlWithoutQuery] !== undefined) {
                            if (typeof config.replacements.requests[urlWithoutQuery] === "string") {
                                raw = await fetch(config.replacements.requests[urlWithoutQuery]).then(async (response) => {
                                    return await response.text();
                                });
                            }

                            if (typeof config.replacements.requests[urlWithoutQuery] === "function") {
                                raw = await config.replacements.requests[urlWithoutQuery]();
                            }
                        }

                        log("xhr:hooked", this, urlWithoutQuery, config.replacements.requests[urlWithoutQuery], raw);

                        if (raw !== null) {
                            Object.defineProperty(this, "response", {
                                value: raw,
                                writable: false,
                            });

                            Object.defineProperty(this, "responseText", {
                                value: raw,
                                writable: false,
                            });
                        }
                    }

                    await _callback.call(this, ...args);
                };
            }

            return XMLHttpRequestSend.call(this, ...args);
        };

        unsafeWindow.XMLHttpRequest.prototype.open = function (...args) {
            log("xhr.open", this, args);

            this._method = args[0];
            this._url = args[1];
            this._async = args[2];

            const urlWithoutQuery = this._url.split("?", 2)[0];

            if (urlWithoutQuery !== undefined) {
                if (config.replacements.requests[urlWithoutQuery] !== undefined && GM_getValue('replaceGame', 1) === 1) {
                    this._hooked = true;
                    args[1] = "data:application/octet-stream;base64,IldPU0hJWkhBWkhBMTIwIg==";
                    log("xhr.open:hooked", ...args);
                }
            }

            return XMLHttpRequestOpen.call(this, ...args);
        };

        unsafeWindow.Image = new Proxy(unsafeWindow.Image, {
            construct(target, args, newTarget) {
                const instance = Reflect.construct(target, args, newTarget);
                log("new Image", target, args, newTarget, instance);

                until(async () => {
                    return instance.getAttribute("src") !== null;
                }).then(async () => {
                    const src = instance.getAttribute("src");
                    log("Image.src:changed", src);

                    if (config.replacements.images[src] !== undefined && GM_getValue('replaceGame', 1) === 1) {
                        log("Image:hooked", src, config.replacements.images[src]);
                        instance.setAttribute("src", config.replacements.images[src]);
                    }
                });

                return instance;
            },
        });
    })();

    const toLowerCaseKeys = (obj) => {
        const result = {};
        for (let key in obj) {
            if (Object.prototype.hasOwnProperty.call(obj, key)) {
                result[key.toLowerCase()] = obj[key];
            }
        }
        return result;
    };

    const lowerTextMap = toLowerCaseKeys(textMap);
    const lowerTooltipMap = toLowerCaseKeys(tooltipMap);
    const lowerPlaceholderMap = toLowerCaseKeys(placeholderMap);
    const lowerPseudoElementMap = toLowerCaseKeys(pseudoElementMap);

    function shouldExclude(node) {
        function isExcluded(currentNode) {
            return (
                currentNode.nodeType === Node.ELEMENT_NODE &&
                (currentNode.getAttribute("data-uid") === "5f4ca7f5fdcc602e78a65bba" ||
                    ["breadcrumbs", "dirtyflag_gfx", "dirtyflag_net", "dirtyflag_state", "dirtyflag_client", "dirtyflag_gl"].includes(currentNode.getAttribute("id")) ||
                    ["user", "leagueplayer_name", "primary", "uniflex-item"].some((className) => currentNode.classList.contains(className)) ||
                    currentNode.className === "chat_message ig_chat_message" ||
                    currentNode.className === "chat_message dm_chat_message" ||
                    currentNode.className === "chat_message ig_chat_message roomownerchat" ||
                    ["supporterchat", "supporterchat_t1", "supporterchat_t2", "supporterchat_t3", "supporterchat_t4"].some((className) => currentNode.classList.contains(className)) ||
                    currentNode.classList.contains("user-tooltip") ||
                    currentNode === document.querySelector(".tetra_modal h2") ||
                    currentNode.getAttribute("data-username") ||
                    currentNode.closest('.room_config_item.room_config_spinner.flex-item.ns'))
            );
        }


        let currentNode = node;
        while (currentNode) {
            if (isExcluded(currentNode)) return true;
            currentNode = currentNode.parentNode;
        }
        return false;
    }

    // 查找最近的祖先 data-id
    function findNearestDataId(node) {
        let current = node.parentNode;
        while (current && current !== document) {
            if (current.nodeType === Node.ELEMENT_NODE) {
                const did = current.getAttribute("data-id");
                if (did && dataIdMap.hasOwnProperty(did)) return did;
            }
            current = current.parentNode;
        }
        return null;
    }

    // 应用 data-id 的部分替换
    function applyDataIdReplaceToText(text, dataId) {
        const rule = dataIdMap[dataId];
        if (!rule) return { text, replaced: false };
        const [pattern, replacement] = rule;
        const newText = text.replace(pattern, replacement);
        return { text: newText, replaced: newText !== text };
    }

    // 将特殊正则映射应用到纯文本
    function applySpecialMaps(text) {
        let out = text;
        for (let [key, value] of Object.entries(specialTextMap)) {
            const re = new RegExp(key, "gi");
            const replaced = out.replace(re, value);
            if (replaced !== out) out = replaced;
        }
        return out;
    }

    // 替换文本节点内容
    function replaceText(node) {
        if (node.nodeType === Node.ELEMENT_NODE) {
            // 占位符替换
            if (node.hasAttribute?.("placeholder")) {
                const ph = node.getAttribute("placeholder");
                if (ph && lowerPlaceholderMap.hasOwnProperty(ph.toLowerCase())) {
                    node.setAttribute("placeholder", lowerPlaceholderMap[ph.toLowerCase()]);
                }
            }

            // 伪元素文本替换
            try {
                let styleSheet = document.styleSheets[0];
                if (!styleSheet) {
                    const styleEl = document.createElement("style");
                    document.head.appendChild(styleEl);
                    styleSheet = styleEl.sheet;
                }
                for (let [key, value] of Object.entries(lowerPseudoElementMap)) {
                    const baseSelector = key.split("::")[0];
                    if (node.matches && node.matches(baseSelector)) {
                        const ruleText = `${key}{content:"${value}";}`;
                        if (styleSheet.insertRule) {
                            styleSheet.insertRule(ruleText, styleSheet.cssRules.length);
                        } else if (styleSheet.addRule) {
                            styleSheet.addRule(key, `content:"${value}";`);
                        }
                    }
                }
            } catch (e) {}
        } else if (node.nodeType === Node.TEXT_NODE) {
            let text = node.nodeValue.trim();
            if (!text) return;

            // data-id 替换（只替换匹配部分）
            const nearestDataId = findNearestDataId(node);
            if (nearestDataId) {
                const { text: newText } = applyDataIdReplaceToText(text, nearestDataId);
                text = newText;
            }

            // 全局整句替换（不覆盖已替换部分 text 中未匹配 data-id 的文本）
            if (lowerTextMap.hasOwnProperty(text.toLowerCase()) && !shouldExclude(node)) {
                text = lowerTextMap[text.toLowerCase()];
            }

            // 特殊正则替换
            text = applySpecialMaps(text);

            node.nodeValue = text;
        }

        // 递归处理子节点
        for (let i of node.childNodes) {
            replaceText(i);
        }
    }

    // 替换悬停文本
    function replaceTooltips(event) {
        const tooltip = event.target;
        let title = tooltip.getAttribute("title");
        if (title) {
            if (lowerTooltipMap.hasOwnProperty(title.toLowerCase())) {
                tooltip.setAttribute("title", lowerTooltipMap[title.toLowerCase()]);
                tooltip.removeAttribute("data-original-title");
            } else {
                title = applySpecialMaps(title);
                tooltip.setAttribute("title", title);
            }
        }
    }

    // MutationObserver 处理新增节点
    function handleMutation(mutationsList) {
        for (let mutation of mutationsList) {
            if (mutation.type === "childList" && mutation.addedNodes.length > 0) {
                for (let node of mutation.addedNodes) {
                    replaceText(node);
                }
            }
        }
    }

    unsafeWindow.addEventListener(
        "load",
        () => {
            // 初始文本替换
            replaceText(document.body);

            // 悬停文本事件
            document.addEventListener(
                "mouseenter",
                (event) => {
                    const target = event.target;
                    if (target.hasAttribute?.("title")) {
                        replaceTooltips(event);
                    }
                },
                true,
            );

            // MutationObserver
            const observer = new MutationObserver(handleMutation);
            observer.observe(document.body, { childList: true, subtree: true });

            // ===== 好友列表专用优化 =====
            let tabKeyTimer = null;
            let isObserverActive = true;
            document.addEventListener("keydown", (event) => {
                if (event.key === "Tab") {
                    clearTimeout(tabKeyTimer);
                    if (isObserverActive) {
                        observer.disconnect();
                        isObserverActive = false;
                    }
                    tabKeyTimer = setTimeout(() => {
                        if (!isObserverActive) {
                            observer.observe(document.body, { childList: true, subtree: true });
                            isObserverActive = true;
                        }
                    }, 500);
                }
            });
        },
        {
            once: true,
        },
    );

    // 注册菜单命令
    GM_registerMenuCommand('切换汉化功能', () => {
        config.replaceGame = config.replaceGame === 1 ? 0 : 1;
        GM_setValue('replaceGame', config.replaceGame);
        log('汉化功能已', config.replaceGame === 1 ? '启用' : '禁用');
        log('XMLHttp劫持功能已', config.replaceGame === 1 ? '启用' : '禁用');
    });

    // 在配置页面添加汉化开关
    function addConfigSwitch() {
        const configView = document.querySelector('[data-menuview="config"]');
        if (!configView) return;

        // 检查是否已添加
        if (document.getElementById('iotranslate-switch')) return;

        const switchContainer = document.createElement('div');
        switchContainer.id = 'iotranslate-switch';
        switchContainer.style.cssText = `
            position: fixed;
            bottom: 20px;
            left: 5px;
            background: rgba(101, 116, 151, 0.2);
            padding: 15px 15px;
            border-radius: 10px;
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            gap: 10px;
            z-index: 999999;
            color: white;
            font-family: sans-serif;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.5);
            width: fit-content;
        `;

        const label = document.createElement('span');
        label.textContent = '双人模式复活文本汉化:';

        const switchButton = document.createElement('button');
        switchButton.textContent = config.replaceGame === 1 ? '已启用' : '已禁用';
        switchButton.style.cssText = `
            padding: 8px 20px;
            border: none;
            border-radius: 5px;
            cursor: pointer;
            font-size: 14px;
            transition: all 0.3s;
            ${config.replaceGame === 1 ? 'background: #4CAF50; color: white;' : 'background: #f44336; color: white;'}
        `;

        switchButton.addEventListener('click', () => {
            config.replaceGame = config.replaceGame === 1 ? 0 : 1;
            GM_setValue('replaceGame', config.replaceGame);
            switchButton.textContent = config.replaceGame === 1 ? '已启用' : '已禁用';
            switchButton.style.background = config.replaceGame === 1 ? '#4CAF50' : '#f44336';
            log('汉化功能已', config.replaceGame === 1 ? '启用' : '禁用');
            log('XMLHttp劫持功能已', config.replaceGame === 1 ? '启用' : '禁用');
        });

        // 添加保存并刷新按钮
        const refreshButton = document.createElement('button');
        refreshButton.textContent = '保存并刷新';
        refreshButton.style.cssText = `
            padding: 8px 20px;
            border: none;
            border-radius: 5px;
            cursor: pointer;
            font-size: 14px;
            transition: all 0.3s;
            background: #2196F3;
            color: white;
            margin-top: 0px;
        `;

        refreshButton.addEventListener('mouseover', () => {
            refreshButton.style.background = '#1976D2';
        });

        refreshButton.addEventListener('mouseout', () => {
            refreshButton.style.background = '#2196F3';
        });

        refreshButton.addEventListener('click', () => {
            GM_setValue('replaceGame', config.replaceGame);
            location.reload();
        });

        // 创建按钮容器,让按钮横向排列
        const buttonRow = document.createElement('div');
        buttonRow.style.cssText = `
            display: flex;
            align-items: center;
            gap: 10px;
            margin-top: 10px;
        `;

        // 将按钮添加到按钮容器
        buttonRow.appendChild(switchButton);
        buttonRow.appendChild(refreshButton);

        // 将所有元素添加到主容器(竖排排列)
        switchContainer.appendChild(label);
        switchContainer.appendChild(buttonRow);

        // 添加红色提示文本
        const warningText = document.createElement('div');
        warningText.textContent = '此功能为woshizhazha120开发的测试功能，在网络条件不佳时可能无法正常生效，开启后如遇到卡顿等游戏内问题请关闭';
        warningText.style.cssText = `
            color: #ff6b6b;
            font-size: 12px;
            text-align: left;
            margin-top: 10px;
            line-height: 1.4;
            max-width: 200px;
        `;
        switchContainer.appendChild(warningText);

        configView.appendChild(switchContainer);
    }

    // 更新开关显示状态
    function updateSwitchVisibility() {
        const switchElement = document.getElementById('iotranslate-switch');
        const rightScroller = document.querySelector('.right_scroller');

        if (switchElement && rightScroller) {
            // 检查是否包含 hidden 或 thidden 类
            const isHidden = rightScroller.classList.contains('hidden') ||
                           rightScroller.classList.contains('thidden');
            switchElement.style.display = isHidden ? 'flex' : 'none';
        }
    }

    // 监听页面变化,检测配置页面和开关显示状态
    const configObserver = new MutationObserver(() => {
        if (document.querySelector('[data-menuview="config"]')) {
            addConfigSwitch();
            updateSwitchVisibility();
        }
    });

    // 专门监听 right_scroller 的 class 变化
    const rightScrollerObserver = new MutationObserver(() => {
        updateSwitchVisibility();
    });

    // 等待页面加载完成后开始监听
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            configObserver.observe(document.body, { childList: true, subtree: true });

            // 监听 right_scroller 元素
            const checkRightScroller = setInterval(() => {
                const rightScroller = document.querySelector('.right_scroller');
                if (rightScroller) {
                    rightScrollerObserver.observe(rightScroller, {
                        attributes: true,
                        attributeFilter: ['class']
                    });
                    clearInterval(checkRightScroller);
                    updateSwitchVisibility();
                }
            }, 100);
        });
    } else {
        configObserver.observe(document.body, { childList: true, subtree: true });
        addConfigSwitch();

        const rightScroller = document.querySelector('.right_scroller');
        if (rightScroller) {
            rightScrollerObserver.observe(rightScroller, {
                attributes: true,
                attributeFilter: ['class']
            });
            updateSwitchVisibility();
        }
    }
})();


