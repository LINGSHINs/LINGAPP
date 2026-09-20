export const INTERVALS=[5*60000,30*60000,12*3600000,86400000,3*86400000,7*86400000,15*86400000,30*86400000];
export function fresh(){return {right:0,wrong:0,stage:0,due:0,last:0,streak:0,mastered:false,star:false,note:''}}
export function grade(old,correct,now=Date.now()) {const s={...fresh(),...old};s[correct?'right':'wrong']++;s.streak=correct?s.streak+1:0;s.last=now;if(!correct){s.stage=0;s.mastered=false;s.due=now+INTERVALS[0]}else if(!s.due||now>=s.due){s.stage=Math.min(s.stage+1,INTERVALS.length);s.mastered=s.stage>=INTERVALS.length;s.due=s.mastered?0:now+INTERVALS[s.stage]}return s}
export function checkAnswer(q,selected){return [...new Set(selected)].sort().join('')===q.answer}
export function shuffle(a){a=[...a];for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]]}return a}
export function filterBank(bank,cfg,stats={},now=Date.now()){return bank.filter(q=>(!cfg.dept||cfg.dept==='全部部门'||q.dept===cfg.dept)&&(!cfg.type||cfg.type==='全部题型'||q.type===cfg.type)&&(cfg.dept&&cfg.dept!=='全部部门'&&cfg.numbering!=='global'?Number(q.sourceId):q.id)>=(Number(cfg.from)||1)&&(cfg.dept&&cfg.dept!=='全部部门'&&cfg.numbering!=='global'?Number(q.sourceId):q.id)<=(Number(cfg.to)||bank.length)&&(!cfg.wrong||(stats[q.id]?.wrong>0&&!stats[q.id]?.mastered))&&(!cfg.star||stats[q.id]?.star)&&(!cfg.due||(stats[q.id]?.due>0&&stats[q.id].due<=now&&!stats[q.id].mastered)))}
export const MODES=[['sequence','顺序刷题','list','按题库顺序，一题一题稳步积累。'],['random','乱序刷题','shuffle','打散题目顺序，避免依赖位置记忆。'],['exam','组卷练习','file','按题型配比抽题，计时作答，交卷后统一评分。'],['department','按部门刷题','building','聚焦一个部门，建立完整知识结构。'],['review','间隔复习','brain','优先复习到期题目，用间隔练习巩固长期记忆。'],['loop','循环攻克','repeat','选择部门与题号范围；错题间隔重现，到期答对推进记忆阶段。'],['read','背题模式','book','同时展示题目、选项和答案，便于理解与背诵。'],['flash','闪卡记忆','layers','先回忆，再翻卡；诚实标记记住或忘记。'],['quick','快答模式','bolt','倒计时结束回显答案，停留后自动进入下一题。'],['game','闯关记忆','game','三次失误机会，每五题升一关，挑战自己的连续答对纪录。']];
export const EGGS=[
['sprint','60 秒冲刺','bolt','一分钟内能答对多少题？总计时结束自动结算。'],
['survival','三命生存','heart','仅有三次失误机会，看看能走多远。'],
['streak','十连击','flame','连续答对十题完成挑战，答错连击归零。'],
['boss','错题首领','shield','按历史错误次数排序，先攻克最难的一题。'],
['reverse','倒序旅行','rewind','从范围内最后一题出发，反方向扫清盲区。'],
['relay','部门接力','building','题目按部门轮流出现，练习快速切换知识。'],
['ladder','题型阶梯','stairs','判断、单选、多选，逐级提高挑战。'],
['blind','盲选回忆','eye','先隐藏选项，想出自己的答案后再展开作答。'],
['confidence','信心校准','target','作答前标记信心，找出“以为自己会”的题。'],
['eliminate','排除大师','minus','先选出全部错误选项；系统反向判分。'],
['pair','答案连线','link','把三道题与对应的答案内容配对。'],
['pomo','番茄专注','clock','25 分钟专注练习，结束后提醒休息。'],
['daily','每日盲盒','gift','每天固定十道题，不同日子有不同组合。'],
['spaced','五题回声','repeat','每组五题，错题在至少三次其他作答后再次出现。'],
['marathon','知识马拉松','flag','跨部门随机抽取 100 题，挑战耐力。'],
['precision','满分守护','diamond','任意一题答错即结束，积累无失误成绩。'],
['dice','骰子漫游','shuffle','每答完一题，随机跳到一个尚未作答的位置。'],
['new','未见之地','compass','只抽取从未作答的题，拓宽知识覆盖面。'],
['slow','深呼吸','wind','先静心阅读八秒，再开放选项作答。'],
['repair','遗忘修复','spark','按距离上次作答的时间从长到短复习旧题。']];
const RAW=[['知一 · 青绿',158,0,'leaf','clean'],['宝可梦 · 点阵',86,0,'pixel','pixel'],['掌机 GBA',257,0,'pixel','pixel'],['赛博朋克',185,1,'rain','neon'],['星露谷农场',105,0,'leaf','pixel'],['新海诚 · 晴空',207,0,'spark','clean'],['水墨山河',165,0,'ink','serif'],['iOS 27 · 液态玻璃',215,0,'bubble','glass'],['樱花来信',335,0,'petal','clean'],['午夜图书馆',230,1,'star','serif'],['深海呼吸',195,1,'bubble','clean'],['日落橘子海',24,0,'spark','clean'],['极光漫游',158,1,'ribbon','neon'],['月球基地',216,1,'star','clean'],['森林露营',140,0,'leaf','clean'],['沙丘旅人',36,0,'dust','clean'],['复古终端',120,1,'rain','pixel'],['蓝图计划',215,1,'cross','clean'],['奶油咖啡',28,0,'dust','serif'],['薄荷汽水',165,0,'bubble','clean'],['葡萄星云',276,1,'star','neon'],['桃桃乌龙',17,0,'petal','clean'],['黑金剧院',45,1,'spark','serif'],['北欧雪原',205,0,'snow','clean'],['莫奈花园',125,0,'petal','serif'],['梵高星夜',226,1,'ribbon','serif'],['包豪斯',8,0,'cross','clean'],['孟菲斯',289,0,'cross','clean'],['瑞士红',355,0,'dust','clean'],['日式和纸',39,0,'ink','serif'],['竹影清风',96,0,'leaf','serif'],['青花瓷',217,0,'ink','serif'],['敦煌飞天',18,0,'ribbon','serif'],['故宫朱红',2,0,'dust','serif'],['宋韵天青',176,0,'rain','serif'],['雨夜东京',308,1,'rain','neon'],['蒸汽波',295,0,'ribbon','neon'],['街机 1988',13,1,'pixel','pixel'],['俄罗斯方块',201,1,'pixel','pixel'],['像素地牢',37,1,'spark','pixel'],['塞尔达 · 旷野',150,0,'leaf','clean'],['动物森友会',155,0,'petal','clean'],['马里奥 · 云朵',4,0,'bubble','pixel'],['精灵球 · 红白',356,0,'cross','pixel'],['皮卡丘 · 闪电',48,0,'spark','pixel'],['杰尼龟 · 水波',190,0,'bubble','pixel'],['妙蛙种子 · 叶语',121,0,'leaf','pixel'],['小火龙 · 余烬',20,0,'spark','pixel'],['宇宙黑洞',260,1,'ribbon','neon'],['星际航行',210,1,'star','clean'],['玫瑰石英',328,0,'petal','glass'],['冰川棱镜',190,0,'snow','glass'],['晨雾山谷',173,0,'dust','clean'],['银翼未来',200,1,'cross','neon'],['午夜抹茶',95,1,'leaf','clean'],['纯白专注',165,0,'dust','clean']];
export const SKINS=RAW.map(([name,h,dark,particle,style],i)=>({id:i,name,h,dark,particle,style,accent:i===0?'#137b69':`hsl(${h} ${dark?65:55}% ${dark?68:32}%)`,bg:i===0?'#f5f7f7':`hsl(${h} ${dark?16:24}% ${dark?9:96}%)`,surface:dark?`hsl(${h} 14% 14%)`:'#ffffff',text:dark?'#eff5f3':'#202e2c',muted:dark?'#a9b7b4':'#657571',line:dark?`hsl(${h} 12% 23%)`:'#e4eae7',soft:`hsl(${h} ${dark?23:36}% ${dark?20:93}%)`,symbol:['book','diamond','game','bolt','leaf','sun','wind','layers','spark','moon','bubble','sun','wave','compass','leaf','flag','terminal','file','book','bubble','star','leaf','diamond','snow','flower','star','shapes','shapes','target','file','leaf','wave','wind','building','wave','rain','sun','game','grid','shield','compass','leaf','game','target','bolt','wave','leaf','flame','moon','star','diamond','snow','wind','terminal','leaf','book'][i]}));
export const PARTICLES={leaf:'落叶',pixel:'像素方块',rain:'光雨',spark:'微光',ink:'墨点',bubble:'浮泡',petal:'花瓣',star:'星屑',ribbon:'流线',dust:'浮尘',cross:'几何十字',snow:'细雪'};
