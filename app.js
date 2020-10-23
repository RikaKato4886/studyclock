let status = 0; // 0:停止中で 1:動作中
let time = 0;

const startBtn = document.getElementById("startBtn");
startBtn.addEventListener('click', start);
const stopBtn = document.getElementById("stopBtn")
stopBtn.addEventListener('click', stop);
const resetBtn = document.getElementById("resetBtn");
resetBtn.addEventListener('click', reset)
const timerLabel = document.getElementById('timerLabel');
const img = document.querySelector('.photo');
const message = document.querySelector('.message');

//-------0. Timer Setting by User 何分毎に変更するか決めてもらう --------//

const selectTimeBtn = document.getElementById('selectMinBtn')
const minSetting = document.getElementById('minsetting-container')

function selectedTime(){ //選択してもらう
const input = document.getElementById('selectMin').value //ユーザーの指定番号5 or 10 or 15
  return input*60; //選択してもらった[分]を秒に変更する-->5min * 60sec = 300sec
}

function showTimer(){ //選択した後、タイマーを表示して選択肢を消す
  const timer = document.getElementById('timelabel-container')
    timer.style.display = "block";
    minSetting.style.display = "none";
}

selectTimeBtn.addEventListener('click', selectedTime);
selectTimeBtn.addEventListener('click', showTimer);

//---------------1. Show CurrentTime 現在時刻の表示-----------------//

function realtime() {
  //moment.jsを使いたい 現在時刻の表示
  setInterval(() => {
    let time = moment().format('h:mm:ss a');
    document.getElementById('currentTime').innerHTML = time;
  }, 1000)
}
realtime();

//----------2. Controll Button コントロールボタンの設定------------//

// STARTボタン
function start(){
  // 動作中にする
  status = 1;
  // スタートボタンを押せないようにする
  startBtn.disabled = true;
  timer();
}

// STOPボタン
function stop(){
    // 停止中にする
    status = 0;
    // スタートボタンを押せるようにする
    startBtn.disabled = false;
}

// RESETボタン
function reset(){
    // 停止中にする
    status = 0;
    // タイマーラベルをリセット
    timerLabel.innerHTML = '00:00';
    // タイムを0に戻す
    time = 0;
    // スタートボタンを押せるようにする
    startBtn.disabled = false;
}

//--------------------------3. Timer タイマーの設定-----------------------//

//Minutes and Seconds
let min;
let sec;

function timer(){
    // ステータスが動作中の場合のみ実行
  if (status == 1) {
    setTimeout(() => {
      time++;
      console.log(time)
      // 分・秒・ミリ秒を計算
      min = Math.floor(time/60);
      sec = Math.floor(time);

      if (min < 10) {
        min = "0" + min
      }; //一桁の時はゼロをたす
      if (sec >= 60) {
        sec = sec % 60
      }; //60
      if (sec < 10) {
        sec = "0" + sec
      };  //一桁の時はゼロをたす

      //------------時間ごとに画像とメッセージを変更する-----------//

      switch (time) {
        case 1:  //最初に変える
          changeImage();
          break;
        case selectedTime(): //5min-300sec 10min-600sec 15min-900sec(15分)
          changeImage();
          break;
        case selectedTime()*2: //10min-600sec(10分) 20min-1200sec(20分), 30min-1800(30min)
          changeImage();
          break;
        case selectedTime()*3: //15min-900sec 30min-1800sec, 45min-2700sec(45分)
          changeImage();
          break;
        case selectedTime()*4: //20min-1200sec 40min-2400sec,
        changeImage();
        break;
        case selectedTime()*5: //25min-1500sec
        changeImage();
        break;
      }

      // タイマーラベルを更新
      timerLabel.innerHTML = min + ":" + sec ;

      // 再びtimer()を呼び出す
      timer();
    }, 1000);
  }
}

//--------------------------4. 画像とメッセージをランダムに変更する-----------------------//

function changeImage(){ //数分ごとにimageを変える
  const randomNum = Math.floor(Math.random() * 4) + 1; //1から4をランダムに表示
  img.src = `src/photo/photo-${randomNum}.jpg`
  message.src = `src/message/message-${randomNum}.png`
}

//1. 現在時刻の表示 - done
//2. startボタンをクリックしてからの経過時間を表示 - done
//3. resetボタンでクリア, stop ボタンで停止にする - done
//4. 経過時間10分ごとに画像変更 --> 経過時間を取得し、その都度画像&メッセージを変える
