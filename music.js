const e = sel => document.querySelector(sel);

const g = sel => document.getElementById(sel);

const bindEvent = (element, eventName, callback) => {
  element.addEventListener(eventName, callback);
};

const toggleClass = (element, className) => {
  if (element.classList.contains(className)) {
    element.classList.remove(className);
  } else {
    element.classList.add(className);
  }
};

const removeClassAll = className => {
  var selector = "." + className;
  var elements = document.querySelectorAll(selector);
  for (var i = 0; i < elements.length; i++) {
    var element = elements[i];
    element.classList.remove(className);
  }
};

const a = e("#audio");

const play = g("play"),
  pause = g("pause"),
  prev = g("prev"),
  next = g("next"),
  musicName = g("musicName"),
  musicImg = g("musicImg"),
  bgImage = g("music");

const current = e(".current");
const current1 = e(".current1");
const plus = e(".icon-yinliang-gao");
const minus = e(".icon-yinliang-di");
const singleButton = e(".icon-danquxunhuan");
const line = e(".line");
const allButton = e(".icon-xunhuan");
const randomButton = e(".icon-suijibofang");

const musicAll = i => {
  a.src = "./music/" + music1[i] + ".mp3";
  musicName.innerHTML = music[i];
  bgImage.style.backgroundImage = "url(./image/" + music1[i] + ".jpeg)";
  musicImg.src = "./image/" + music1[i] + ".jpeg";
};
const music = [
  "陈雪凝-绿色",
  "吴青峰-起风了",
  "薛之谦-下雨了",
  "陈雪凝-愚昧",
  "周笔畅-岁月神偷",
  "华晨宇-齐天",
  "刘惜君-我很快乐",
  "华晨宇-我管你"
];
const music1 = ["1", "2", "3", "4", "5", "6", "7", "8"];

let len = music.length;

let num = 0;

let mode = 0;

// 播放
play.onclick = function() {
  pause.classList.remove("show");
  play.classList.add("show");
  if (a.paused) {
    a.play();
  }
};
// 暂停
pause.onclick = () => {
  pause.classList.add("show");
  play.classList.remove("show");
  if (a.played) {
    a.pause();
  }
};
// 上一首
prev.onclick = () => {
  pause.classList.remove("show");
  play.classList.add("show");
  num = (num + len - 1) % len;
  musicAll(num);
  a.play();
};
// 下一首
next.onclick = () => {
  pause.classList.remove("show");
  play.classList.add("show");
  num = (num + 1) % len;
  musicAll(num);
  a.play();
};

//进度条以及播放部分的进度条改变
line.onclick = () => {
  let length = event.offsetX;
  a.currentTime = (length / 280) * a.duration;
  current.style.left = (a.currentTime / a.duration) * 280 + "px";
  current1.style.width = (a.currentTime / a.duration) * 280 + "px";
  pause.classList.remove("show");
  play.classList.add("show");
  a.play();
};
const 定时播放 = () => {
  setInterval(() => {
    current.style.left = (a.currentTime / a.duration) * 280 + "px";
    current1.style.width = (a.currentTime / a.duration) * 280 + "px";
  }, 100);
};
定时播放();

//音量键
const vloCtrl = () => {
  plus.onclick = () => {
    let volNow = a.volume;
    index = 0.1;
    volNow = volNow + index;
    //设定点击高亮一下
    toggleClass(plus, "redColor");
    setTimeout(() => {
      plus.classList.remove("redColor");
    }, 300);
    //声音加到最大的时候提示
    if (volNow >= 1) {
      volNow = 1;
      a.volume = volNow;
      alert("声音已经最大了");
    } else {
      a.volume = volNow;
    }
  };
  minus.onclick = () => {
    let volNow = a.volume;
    index = 0.1;
    volNow = volNow - index;
    //设定点击高亮一下
    toggleClass(minus, "redColor");
    setTimeout(() => {
      minus.classList.remove("redColor");
    }, 300);
    //声音减到最小的时候提示
    if (volNow <= 0) {
      volNow = 0;
      alert("声音已经最小了");
    }
    a.volume = volNow;
  };
};
vloCtrl();

//播放模式
singleButton.onclick = () => {
  removeClassAll("redColor");
  singleButton.classList.add("redColor");
  mode = 0;
  console.log("点击单曲循环mode的值", mode);
};

allButton.onclick = () => {
  removeClassAll("redColor");
  allButton.classList.add("redColor");
  mode = 1;
  console.log("点击列表循环mode的值", mode);
};

randomButton.onclick = () => {
  removeClassAll("redColor");
  randomButton.classList.add("redColor");
  mode = 2;
  console.log("点击随机循环mode的值", mode);
};

//
// }
const endListen = () => {
  a.addEventListener("ended", () => {
    if (mode === 0) {
      console.log("单曲播放");
      singlePlay();
    } else if (mode === 1) {
      listPlay(a);
      console.log("顺序播放");
    } else if (mode === 2) {
      randomPlay(a);
      console.log("随机播放");
    }
  });
};
endListen();

const listPlay = () => {
  for (let i = 0; i < len; i++) {
    if (a.src.slice(-5, -4) == music1[i]) {
      index = (i + 1) % len;
      break;
    }
  }
  musicAll(index);
  a.play();
};

const singlePlay = () => {
  a.play();
};

const randomPlay = () => {
  var index = Math.floor(len * Math.random());
  musicAll(index);
  a.play();
};
