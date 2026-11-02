(function (global) {
  "use strict";

  const DATA = global.NOVEL_DATA;
  if (!DATA) throw new Error("NOVEL_DATA is missing");

  const KIND_ORDER = ["web", "literary", "genre"];

  const FACETS = [
    {
      id: "kesusu",
      label: "克苏鲁",
      aliases: ["克苏鲁", "洛夫克拉夫特", "旧日支配者", "不可名状", "触手", "诡秘"],
      targets: ["克苏鲁"],
      weight: 1.2
    },
    {
      id: "qunxiang",
      label: "群像",
      aliases: ["群像", "多主角", "众生相", "群戏", "配角出彩"],
      targets: ["群像"],
      weight: 1.15
    },
    {
      id: "wuxianliu",
      label: "无限流",
      aliases: ["无限流", "无限副本", "副本流", "轮回世界", "闯关"],
      targets: ["无限流"],
      weight: 1.2
    },
    {
      id: "xuanyi",
      label: "悬疑",
      aliases: ["悬疑", "推理", "破案", "探案", "刑侦", "侦探", "案件", "罪案"],
      targets: ["悬疑", "推理", "探案", "刑侦"],
      weight: 1.15
    },
    {
      id: "kehuan",
      label: "科幻",
      aliases: ["科幻", "硬科幻", "科学幻想", "未来", "星际", "太空", "宇宙"],
      targets: ["科幻", "硬科幻", "太空", "宇宙"],
      weight: 1.15
    },
    {
      id: "qihuan",
      label: "奇幻",
      aliases: ["奇幻", "西幻", "魔法", "异世界", "剑与魔法"],
      targets: ["西幻", "奇幻"],
      weight: 1.05
    },
    {
      id: "nvxing",
      label: "女性成长",
      aliases: ["女性成长", "女性视角", "女性", "女主", "大女主", "女性主义", "女性向", "女频"],
      targets: ["女性成长", "女性视角", "大女主", "女主"],
      weight: 1.15
    },
    {
      id: "jianghu",
      label: "江湖",
      aliases: ["江湖", "武侠", "侠义", "刀剑", "武林"],
      targets: ["江湖", "武侠"],
      weight: 1.1
    },
    {
      id: "guyan",
      label: "古言",
      aliases: ["古言", "古代言情", "宅斗", "宫斗", "宫廷"],
      targets: ["古言", "宅斗", "宫斗"],
      weight: 1.1
    },
    {
      id: "xianshi",
      label: "现实向",
      aliases: ["现实向", "现实主义", "现实题材", "写实", "严肃文学", "纯文学", "现实小说"],
      targets: ["现实主义", "现实向"],
      weight: 1.15
    },
    {
      id: "zhiyu",
      label: "治愈",
      aliases: ["治愈", "温暖", "暖心", "疗愈", "温柔"],
      targets: ["治愈", "温柔"],
      weight: 1.05
    },
    {
      id: "fantuopia",
      label: "反乌托邦",
      aliases: ["反乌托邦", "极权", "dystopia", "政治寓言"],
      targets: ["反乌托邦"],
      weight: 1.25
    },
    {
      id: "qingxiju",
      label: "轻喜剧",
      aliases: ["轻喜剧", "喜剧", "搞笑", "幽默", "沙雕", "轻松", "下饭", "欢乐"],
      targets: ["轻喜剧", "幽默", "黑色幽默", "轻松"],
      weight: 1.0
    },
    {
      id: "xunhuan",
      label: "时间循环",
      aliases: ["时间循环", "时间循环流", "循环", "重复一天", "时间回溯"],
      targets: ["时间循环"],
      weight: 1.25
    },
    {
      id: "xiaoyuan",
      label: "校园",
      aliases: ["校园", "青春校园", "学生时代", "高中", "大学"],
      targets: ["校园", "青春"],
      weight: 1.0
    },
    {
      id: "dianjing",
      label: "电竞",
      aliases: ["电竞", "电子竞技", "游戏竞技", "网游", "游戏"],
      targets: ["电竞", "竞技"],
      weight: 1.2
    },
    {
      id: "richang",
      label: "日常",
      aliases: ["日常", "种田", "生活流", "慢生活", "家常"],
      targets: ["日常"],
      weight: 1.05
    },
    {
      id: "gufeng",
      label: "古风",
      aliases: ["古风", "古代", "古装", "朝代"],
      targets: ["古风", "古言", "古都", "历史", "宅斗"],
      weight: 0.8
    },
    {
      id: "xianxia",
      label: "仙侠",
      aliases: ["仙侠", "修仙", "修真", "飞升"],
      targets: ["仙侠", "修仙"],
      weight: 1.1
    },
    {
      id: "chuangshu",
      label: "穿书",
      aliases: ["穿书", "书中世界", "穿进书里"],
      targets: ["穿书"],
      weight: 1.25
    },
    {
      id: "xitong",
      label: "系统",
      aliases: ["系统", "系统文", "任务流"],
      targets: ["系统"],
      weight: 1.1
    },
    {
      id: "quanmou",
      label: "权谋",
      aliases: ["权谋", "朝堂", "智斗", "商战"],
      targets: ["权谋", "智斗", "商战"],
      weight: 1.05
    },
    {
      id: "shehuipai",
      label: "社会派",
      aliases: ["社会派", "社会议题", "现实议题"],
      targets: ["社会派"],
      weight: 1.1
    },
    {
      id: "benge",
      label: "本格",
      aliases: ["本格", "密室", "诡计"],
      targets: ["本格"],
      weight: 1.1
    },
    {
      id: "moshi",
      label: "末世",
      aliases: ["末世", "末日", "废土", "灾变"],
      targets: ["末世", "废土"],
      weight: 1.15
    },
    {
      id: "shengcun",
      label: "生存",
      aliases: ["生存", "求生", "荒野"],
      targets: ["生存"],
      weight: 1.0
    },
    {
      id: "ai",
      label: "人工智能",
      aliases: ["人工智能", "AI", "机器人", "仿生人"],
      targets: ["人工智能"],
      weight: 1.2
    },
    {
      id: "saibo",
      label: "赛博朋克",
      aliases: ["赛博朋克", "赛博", "cyberpunk"],
      targets: ["赛博朋克"],
      weight: 1.2
    },
    {
      id: "lishi",
      label: "历史",
      aliases: ["历史", "古代历史", "架空历史", "朝代"],
      targets: ["历史", "古都"],
      weight: 1.0
    },
    {
      id: "jiating",
      label: "家庭",
      aliases: ["家庭", "家族", "亲情", "家人"],
      targets: ["家庭", "家族"],
      weight: 1.0
    },
    {
      id: "aiqing",
      label: "爱情",
      aliases: ["爱情", "言情", "谈恋爱", "感情线", "恋爱", "CP", "cp"],
      targets: ["爱情", "言情", "古言", "现言", "甜宠"],
      weight: 0.9
    },
    {
      id: "shuangwen",
      label: "爽文",
      aliases: ["爽文", "升级流", "开挂", "打脸", "爽"],
      targets: ["爽文", "升级流", "热血"],
      weight: 0.95
    },
    {
      id: "shaonao",
      label: "烧脑",
      aliases: ["烧脑", "高智商", "智斗", "反转"],
      targets: ["烧脑", "智斗", "反转"],
      weight: 0.9
    },
    {
      id: "anhei",
      label: "暗黑",
      aliases: ["暗黑", "黑暗", "致郁", "压抑"],
      targets: ["暗黑"],
      weight: 0.85
    },
    {
      id: "beiju",
      label: "悲剧",
      aliases: ["悲剧", "虐心", "BE", "意难平", "虐"],
      targets: ["悲剧", "意难平", "虐心"],
      weight: 0.9
    },
    {
      id: "tian",
      label: "甜",
      aliases: ["甜", "甜宠", "撒糖", "HE"],
      targets: ["甜宠"],
      weight: 1.0
    },
    {
      id: "chengzhang",
      label: "成长",
      aliases: ["成长", "少年", "自我救赎", "救赎"],
      targets: ["成长", "互相救赎", "救赎"],
      weight: 0.9
    },
    {
      id: "youyi",
      label: "友情",
      aliases: ["友情", "友谊", "伙伴", "朋友"],
      targets: ["友情"],
      weight: 1.0
    },
    {
      id: "gudu",
      label: "孤独",
      aliases: ["孤独", "寂寞"],
      targets: ["孤独"],
      weight: 1.0
    },
    {
      id: "xiangtu",
      label: "乡土",
      aliases: ["乡土", "农村", "乡村", "小镇", "小城"],
      targets: ["乡土", "小城"],
      weight: 1.0
    },
    {
      id: "shanghai",
      label: "上海",
      aliases: ["上海", "沪上", "弄堂"],
      targets: ["上海"],
      weight: 1.15
    },
    {
      id: "xianggang",
      label: "香港",
      aliases: ["香港", "港风", "港岛"],
      targets: ["香港"],
      weight: 1.2
    },
    {
      id: "dongbei",
      label: "东北",
      aliases: ["东北", "钢厂"],
      targets: ["东北"],
      weight: 1.15
    },
    {
      id: "nanjing",
      label: "南京",
      aliases: ["南京", "金陵"],
      targets: ["南京"],
      weight: 1.15
    },
    {
      id: "zhengzhi",
      label: "政治",
      aliases: ["政治", "革命", "极权社会"],
      targets: ["政治", "反乌托邦"],
      weight: 0.95
    },
    {
      id: "shuangnanzhu",
      label: "双男主",
      aliases: ["双男主", "耽美", "BL", "原耽"],
      targets: ["耽美"],
      weight: 1.25
    },
    {
      id: "nanzhu",
      label: "男主",
      aliases: ["男主", "男性视角", "男主文", "男频"],
      targets: ["男主", "男性视角"],
      weight: 0.7
    },
    {
      id: "jingdian",
      label: "经典",
      aliases: ["经典", "名著", "必读"],
      targets: ["经典"],
      weight: 0.85
    },
    {
      id: "wenbi",
      label: "文笔",
      aliases: ["文笔", "文字好", "文学性", "诗意"],
      targets: ["文笔"],
      weight: 0.9
    },
    {
      id: "kongbu",
      label: "恐怖",
      aliases: ["恐怖", "惊悚", "吓人", "灵异"],
      targets: ["恐怖", "诡异"],
      weight: 1.1
    },
    {
      id: "yuyanxue",
      label: "语言学",
      aliases: ["语言学", "语言"],
      targets: ["语言学"],
      weight: 1.2
    },
    {
      id: "zhexue",
      label: "哲学",
      aliases: ["哲学", "思辨"],
      targets: ["哲学"],
      weight: 1.05
    },
    {
      id: "shuxue",
      label: "数学",
      aliases: ["数学", "理科"],
      targets: ["数学"],
      weight: 1.15
    },
    {
      id: "zhengyi",
      label: "正义",
      aliases: ["正义", "反腐", "冤案"],
      targets: ["正义"],
      weight: 1.1
    },
    {
      id: "wangluo",
      label: "网络",
      aliases: ["网络暴力", "网暴", "社交媒体", "网络"],
      targets: ["网络"],
      weight: 1.05
    },
    {
      id: "jiaoyu",
      label: "教育",
      aliases: ["教育", "校园暴力", "原生家庭"],
      targets: ["教育", "创伤"],
      weight: 1.0
    },
    {
      id: "shengtai",
      label: "生态",
      aliases: ["生态", "环保", "自然"],
      targets: ["生态"],
      weight: 1.15
    }
  ];

  const FACET_BY_ID = Object.fromEntries(FACETS.map(function (facet) {
    return [facet.id, facet];
  }));

  const QUICK_IDS = [
    "kesusu", "qunxiang", "wuxianliu", "xuanyi", "kehuan", "qihuan", "nvxing",
    "jianghu", "guyan", "xianshi", "zhiyu", "fantuopia", "qingxiju",
    "xunhuan", "xiaoyuan", "dianjing"
  ];

  const QUICK_CHIPS = QUICK_IDS.map(function (id) {
    return { id: id, label: FACET_BY_ID[id].label };
  });

  const EXCLUDES = [
    { label: "耽美", aliases: ["耽美", "BL", "双男主"], targets: ["耽美"] },
    { label: "悲剧/虐", aliases: ["悲剧", "虐", "BE"], targets: ["悲剧", "虐心", "意难平"] },
    { label: "恐怖", aliases: ["恐怖", "惊悚", "灵异"], targets: ["恐怖", "诡异"] },
    { label: "暗黑压抑", aliases: ["暗黑", "黑暗", "压抑", "致郁"], targets: ["暗黑"] },
    { label: "恋爱", aliases: ["恋爱", "言情", "感情线", "爱情"], targets: ["爱情", "言情", "现言", "古言"] },
    { label: "超长", aliases: ["超长篇"], targets: [] }
  ];

  const EXCLUDE_VERBS = ["不要", "不看", "不想看", "不喜欢", "不是", "拒绝", "排除", "受不了", "别给我", "别推荐"];

  const KIND_FILTERS = [
    { id: "all", label: "全部" },
    { id: "web", label: "网络小说" },
    { id: "literary", label: "现实向" },
    { id: "genre", label: "类型出版" }
  ];

  const STATUS_FILTERS = [
    { id: "all", label: "不限状态" },
    { id: "completed", label: "完结 / 已出版" },
    { id: "ongoing", label: "连载中" }
  ];

  const LENGTH_FILTERS = [
    { id: "all", label: "不限篇幅" },
    { id: "short", label: "短篇" },
    { id: "medium", label: "中篇" },
    { id: "long", label: "长篇" },
    { id: "epic", label: "超长篇" }
  ];

  const SEARCH_SOURCES = {
    qidian: {
      name: "起点中文网",
      note: "官方站内搜索 · 正版阅读",
      url: function (title) {
        return "https://www.qidian.com/search?kw=" + encodeURIComponent(title);
      }
    },
    jjwxc: {
      name: "晋江文学城",
      note: "官方站内搜索 · 正版阅读",
      url: function (title) {
        return "https://www.jjwxc.net/search.php?kw=" + encodeURIComponent(title) + "&t=1";
      }
    },    zongheng: {
      name: "纵横中文网",
      note: "官方站内搜索 · 正版阅读",
      url: function (title) {
        return "https://search.zongheng.com/s?keyword=" + encodeURIComponent(title);
      }
    },
    weread: {
      name: "微信读书",
      note: "电子书 / 出版版 · 以库存为准",
      url: function (title) {
        return "https://weread.qq.com/web/search/books?keyword=" + encodeURIComponent(title);
      }
    }
  };

  const WEREAD_URL = function (title) {
    return "https://weread.qq.com/web/search/books?keyword=" + encodeURIComponent(title);
  };
  const DOUBAN_URL = function (title) {
    return "https://search.douban.com/book/subject_search?search_text=" + encodeURIComponent(title);
  };
  const JD_URL = function (title) {
    return "https://search.jd.com/Search?keyword=" + encodeURIComponent(title);
  };
  const WORLDCAT_URL = function (title) {
    return "https://search.worldcat.org/search?q=" + encodeURIComponent(title);
  };

  function escapeRegExp(value) {
    return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  }

  function compact(value) {
    return String(value || "")
      .toLowerCase()
      .replace(/[^\p{L}\p{N}]+/gu, "");
  }

  function average(values) {
    if (!values.length) return 0;
    const total = values.reduce(function (sum, value) { return sum + value; }, 0);
    return Number((total / values.length).toFixed(1));
  }

  const BOOKS = DATA.books.map(function (book, index) {
    return Object.assign({}, book, {
      index: index,
      score: average(book.scores),
      kindLabel: DATA.KIND_META[book.kind].label,
      kindEn: DATA.KIND_META[book.kind].en,
      statusLabel: book.status === "ongoing"
        ? "连载中"
        : (book.kind === "web" ? "已完结" : "已出版"),
      lengthLabel: DATA.LENGTH_META[book.length].label,
      lengthOrder: DATA.LENGTH_META[book.length].order
    });
  });

  const BOOK_BY_ID = Object.fromEntries(BOOKS.map(function (book) {
    return [book.id, book];
  }));

  const FACET_DF = new Map(FACETS.map(function (facet) {
    const count = BOOKS.filter(function (book) {
      return facet.targets.some(function (target) {
        return book.tags.includes(target);
      });
    }).length;
    return [facet.id, count];
  }));

  function facetSpecificity(facet) {
    const df = FACET_DF.get(facet.id) || 1;
    return facet.weight * Math.max(0.8, Math.log((BOOKS.length + 1) / (df + 1)));
  }

  const ALL_TAGS = Array.from(new Set(BOOKS.flatMap(function (book) {
    return book.tags;
  }))).filter(function (tag) {
    return compact(tag).length >= 2;
  }).sort(function (a, b) {
    return b.length - a.length;
  });

  const NON_THEMATIC_TAGS = new Set(["短篇"]);

  function getQuickChips() {
    return QUICK_CHIPS.slice();
  }

  function parse(rawQuery, chipIds) {
    const raw = String(rawQuery || "").trim();
    const haystack = compact(raw);
    const selectedChips = Array.isArray(chipIds) ? chipIds : [];
    const facetMap = new Map();
    const exclusionMap = new Map();
    let positive = haystack;
    let preferShort = false;
    let preferLong = false;

    function addFacet(facet) {
      if (!facet || facetMap.has(facet.id)) return;
      facetMap.set(facet.id, facet);
    }

    selectedChips.forEach(function (id) {
      addFacet(FACET_BY_ID[id]);
    });

    EXCLUDES.forEach(function (group) {
      group.aliases.forEach(function (alias) {
        const aliasCompact = compact(alias);
        EXCLUDE_VERBS.forEach(function (verb) {
          const pattern = new RegExp(
            escapeRegExp(verb) + "(?:太|很|特别|过于)?" + escapeRegExp(aliasCompact),
            "g"
          );
          if (pattern.test(positive)) {
            exclusionMap.set(group.label, group);
            positive = positive.replace(pattern, " ");
          }
        });
      });
    });

    FACETS.forEach(function (facet) {
      if (facet.id === "nanzhu" && /双男主/.test(positive)) return;
      const hit = facet.aliases.some(function (alias) {
        return positive.includes(compact(alias));
      });
      if (hit) addFacet(facet);
    });

    let status = null;
    if (/(已完结|完本|已完本)/.test(haystack)) {
      status = "completed";
    } else if (/(连载中|未完结|连载|追更)/.test(haystack)) {
      status = "ongoing";
    }

    let length = null;
    if (/(超长篇|超长篇小说)/.test(haystack)) {
      length = "epic";
    } else if (/(短篇|短篇小说)/.test(haystack)) {
      length = "short";
    } else if (/(中篇|中篇小说)/.test(haystack)) {
      length = "medium";
    } else if (/(长篇|长篇小说)/.test(haystack)) {
      length = "long";
    }
    if (!length) {
      preferShort = /(不要太长|别太长|短一点|短一些|篇幅短|不想看太长)/.test(haystack);
      preferLong = /(长一点|够长|篇幅长)/.test(haystack);
    }

    let kind = null;
    if (/(网络小说|网文|网文小说|起点|晋江|纵横)/.test(haystack)) {
      kind = "web";
    } else if (/(现实小说|现实主义小说|严肃文学|纯文学)/.test(haystack)) {
      kind = "literary";
    } else if (/(类型小说|类型出版)/.test(haystack)) {
      kind = "genre";
    }

    const coveredTargets = new Set();
    const coveredLabels = new Set();
    facetMap.forEach(function (facet) {
      coveredLabels.add(facet.label);
      facet.targets.forEach(function (target) {
        coveredTargets.add(target);
      });
    });

    const directTags = ALL_TAGS.filter(function (tag) {
      if (NON_THEMATIC_TAGS.has(tag)) return false;
      if (tag === "男主" && positive.includes("双男主")) return false;
      return positive.includes(compact(tag)) &&
        !coveredTargets.has(tag) &&
        !coveredLabels.has(tag);
    });

    const textMatches = BOOKS.filter(function (book) {
      const title = compact(book.title);
      const author = compact(book.author);
      const titleHit = haystack.length >= 2 && title.length >= 2 &&
        (haystack.includes(title) || title.includes(haystack));
      const authorHit = haystack.length >= 2 && author.length >= 2 &&
        (haystack.includes(author) || author.includes(haystack));
      return titleHit || authorHit;
    }).map(function (book) { return book.id; });

    const openEnded = /(随便|都行|都可以|不知道读什么|书荒|来一本|推荐一本|推荐些|推荐点|有什么好看|好看的|高分|口碑好|找个书|找本书)/.test(haystack);
    const hasSignals = facetMap.size > 0 || directTags.length > 0 || Boolean(status) ||
      Boolean(length) || Boolean(kind) || exclusionMap.size > 0 || preferShort ||
      preferLong || textMatches.length > 0 || openEnded;

    const labels = [];
    facetMap.forEach(function (facet) { labels.push(facet.label); });
    directTags.forEach(function (tag) { labels.push(tag); });

    return {
      raw: raw,
      haystack: haystack,
      facets: Array.from(facetMap.values()),
      directTags: directTags,
      exclusions: Array.from(exclusionMap.values()),
      status: status,
      length: length,
      kind: kind,
      preferShort: preferShort,
      preferLong: preferLong,
      textMatches: textMatches,
      textOnly: textMatches.length > 0 && facetMap.size === 0 && directTags.length === 0 &&
        !status && !length && !kind && exclusionMap.size === 0 && !preferShort && !preferLong,
      openEnded: openEnded,
      labels: Array.from(new Set(labels)),
      hasSignals: hasSignals,
      unrecognized: raw.length > 0 && !hasSignals
    };
  }

  function matchesExclusion(book, parsed) {
    return parsed.exclusions.some(function (group) {
      return group.targets.some(function (target) {
        return book.tags.includes(target);
      });
    });
  }

  function matchBook(book, parsed) {
    let rank = book.score * 2;
    const matched = [];
    let intentWeight = 0;
    let hitWeight = 0;

    parsed.facets.forEach(function (facet) {
      const specificity = facetSpecificity(facet);
      intentWeight += specificity;
      const hit = facet.targets.some(function (target) {
        return book.tags.includes(target);
      });
      if (hit) {
        rank += 85 * facet.weight;
        hitWeight += specificity;
        matched.push(facet.label);
      }
    });

    parsed.directTags.forEach(function (tag) {
      intentWeight += 1;
      if (book.tags.includes(tag)) {
        rank += 48;
        hitWeight += 1;
        matched.push(tag);
      }
    });

    let titleHit = false;
    let authorHit = false;
    let textHit = false;
    if (parsed.textMatches.includes(book.id)) {
      const title = compact(book.title);
      const author = compact(book.author);
      titleHit = parsed.haystack.includes(title) || (title.length >= 2 && title.includes(parsed.haystack));
      authorHit = parsed.haystack.includes(author) || (author.length >= 2 && author.includes(parsed.haystack));
      textHit = titleHit || authorHit;
      if (titleHit) rank += 220;
      if (authorHit) rank += 120;
    }
    if (parsed.textMatches.length) intentWeight += 4;
    if (textHit) hitWeight += 4;

    if (parsed.preferShort) {
      if (book.length === "short") rank += 12;
      else if (book.length === "medium") rank += 6;
      else if (book.length === "long") rank -= 8;
      else if (book.length === "epic") rank -= 18;
    }
    if (parsed.preferLong) {
      if (book.length === "long" || book.length === "epic") rank += 8;
      if (book.length === "short") rank -= 10;
    }

    const uniqueMatched = Array.from(new Set(matched));
    let match = null;
    if ((parsed.raw || parsed.facets.length > 0) && intentWeight > 0 && hitWeight > 0) {
      const coverage = Math.min(1, hitWeight / intentWeight);
      match = Math.round(60 + coverage * 30 + Math.max(0, book.score - 8.4) * 2);
      match = Math.min(99, match);
    }

    return {
      book: book,
      rank: rank,
      match: match,
      matched: uniqueMatched,
      textHit: textHit
    };
  }

  function recommend(parsed, filters, sort) {
    const options = filters || {};
    const kind = options.kind || "all";
    const status = options.status || "all";
    const length = options.length || "all";

    if (parsed.unrecognized) {
      return [];
    }

    const candidates = BOOKS.filter(function (book) {
      if (kind !== "all" && book.kind !== kind) return false;
      if (status === "completed" && book.status === "ongoing") return false;
      if (status === "ongoing" && book.status !== "ongoing") return false;
      if (length !== "all" && book.length !== length) return false;
      if (matchesExclusion(book, parsed)) return false;
      if (parsed.textOnly && !parsed.textMatches.includes(book.id)) return false;
      return true;
    });

    const ranked = candidates.map(function (book) {
      return matchBook(book, parsed);
    }).filter(function (entry) {
      const hasPositiveIntent = parsed.labels.length > 0 || parsed.textMatches.length > 0;
      if (!hasPositiveIntent) return true;
      const labelHit = entry.matched.some(function (label) {
        return parsed.labels.includes(label);
      });
      return labelHit || entry.textHit || parsed.textMatches.includes(entry.book.id);
    });

    const mode = sort || "match";
    ranked.sort(function (a, b) {
      if (mode === "score") {
        return (b.book.score - a.book.score) ||
          (b.rank - a.rank) ||
          a.book.title.localeCompare(b.book.title, "zh-Hans-CN");
      }
      if (mode === "length") {
        return (a.book.lengthOrder - b.book.lengthOrder) ||
          (b.book.score - a.book.score) ||
          (b.rank - a.rank);
      }
      return ((b.match || 0) - (a.match || 0)) ||
        (b.rank - a.rank) ||
        (b.book.score - a.book.score) ||
        a.book.title.localeCompare(b.book.title, "zh-Hans-CN");
    });

    return ranked;
  }

  function getBook(id) {
    return BOOK_BY_ID[id] || null;
  }

  function getBooks() {
    return BOOKS.slice();
  }

  function getCurated() {
    return DATA.curated.map(getBook).filter(Boolean);
  }

  function getStats() {
    const counts = { all: BOOKS.length, web: 0, literary: 0, genre: 0 };
    BOOKS.forEach(function (book) { counts[book.kind] += 1; });
    return counts;
  }

  function getSimilar(bookId, limit) {
    const book = getBook(bookId);
    if (!book) return [];
    const max = limit || 3;
    return BOOKS.filter(function (candidate) {
      return candidate.id !== book.id;
    }).map(function (candidate) {
      const overlap = candidate.tags.filter(function (tag) {
        return book.tags.includes(tag);
      }).length;
      const themeOverlap = candidate.themes.filter(function (theme) {
        return book.themes.includes(theme);
      }).length;
      const kindBonus = candidate.kind === book.kind ? 2 : 0;
      const score = overlap * 3 + themeOverlap * 5 + kindBonus + candidate.score * 0.15;
      return { book: candidate, score: score, overlap: overlap };
    }).filter(function (entry) {
      return entry.overlap >= 2;
    }).sort(function (a, b) {
      return b.score - a.score;
    }).slice(0, max).map(function (entry) {
      return entry.book;
    });
  }

  function getLinks(book) {
    if (!book) return [];
    const links = [];
    if (book.kind === "web") {
      const source = SEARCH_SOURCES[book.source] || SEARCH_SOURCES.qidian;
      links.push({
        type: "read",
        label: source.name,
        note: source.note,
        url: source.url(book.title),
        primary: true
      });
      links.push({
        type: "ebook",
        label: "微信读书",
        note: "出版版 / 电子版 · 以库存为准",
        url: WEREAD_URL(book.title)
      });
    } else {
      links.push({
        type: "read",
        label: "微信读书",
        note: "电子书 / 出版版 · 以库存为准",
        url: WEREAD_URL(book.title),
        primary: true
      });
      links.push({
        type: "buy",
        label: "京东图书",
        note: "纸质书购买",
        url: JD_URL(book.title)
      });
    }

    links.push({
      type: "review",
      label: "豆瓣读书",
      note: "条目、简介与读者书评",
      url: DOUBAN_URL(book.title)
    });

    if (book.kind === "web") {
      links.push({
        type: "buy",
        label: "京东图书",
        note: "实体出版（如有）",
        url: JD_URL(book.title)
      });
    } else {
      links.push({
        type: "library",
        label: "WorldCat 馆藏",
        note: "查询图书馆藏",
        url: WORLDCAT_URL(book.title)
      });
    }

    return links;
  }

  function getCriteria(parsed, filters) {
    const options = filters || {};
    const labels = [];
    if (options.kind && options.kind !== "all") {
      const kindMeta = DATA.KIND_META[options.kind];
      if (kindMeta) labels.push(kindMeta.label);
    }
    if (options.status === "completed") labels.push("已完结 / 已出版");
    if (options.status === "ongoing") labels.push("连载中");
    if (options.length && options.length !== "all") {
      const lengthMeta = DATA.LENGTH_META[options.length];
      if (lengthMeta) labels.push(lengthMeta.label);
    }
    parsed.labels.forEach(function (label) {
      if (!labels.includes(label)) labels.push(label);
    });
    if (parsed.preferShort) labels.push("篇幅尽量短");
    if (parsed.preferLong) labels.push("篇幅尽量长");
    parsed.exclusions.forEach(function (group) {
      const label = "排除 " + group.label;
      if (!labels.includes(label)) labels.push(label);
    });
    return labels;
  }

  function getDaily(seed) {
    const pool = getCurated();
    const date = seed instanceof Date ? seed : new Date();
    const start = new Date(date.getFullYear(), 0, 0);
    const day = Math.floor((date - start) / 86400000);
    return pool[Math.abs(day) % pool.length];
  }

  global.NovelEngine = {
    KIND_ORDER: KIND_ORDER,
    KIND_FILTERS: KIND_FILTERS,
    STATUS_FILTERS: STATUS_FILTERS,
    LENGTH_FILTERS: LENGTH_FILTERS,
    FACETS: FACETS,
    QUICK_CHIPS: QUICK_CHIPS,
    getBooks: getBooks,
    getBook: getBook,
    getCurated: getCurated,
    getStats: getStats,
    getQuickChips: getQuickChips,
    getSimilar: getSimilar,
    getLinks: getLinks,
    getCriteria: getCriteria,
    getDaily: getDaily,
    parse: parse,
    recommend: recommend
  };
})(typeof window !== "undefined" ? window : globalThis);
