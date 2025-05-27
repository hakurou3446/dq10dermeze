var minutes10 = 600000;
var countTime = 0;
var countDownFlg = false;
var tblCnt = 0;
var cntFlg = false;
var inter = null
enterCli = document.getElementById('startTime');
enterCli.addEventListener('keypress', pressEnter);
cntFalseCnt = 1

function pressEnter(e) {
    if (e.keyCode === 13) {
        calStart();
    }
    return false;
}

function set10minutes() {
    if (inter != null) {
        clearInterval(inter);
    }
    countTime = minutes10;
    countDownFlg = true;
    cntFlg = true;
    setNowTime();
    setNextTime(mm, ss)

}

function countdown() {
    if ((countTime - 1000) < 0) {
        cntFlg = false;
    }
    if (cntFlg) {
        countTime -= 1000;
        setNowTime();
        setNextTime(mm, ss)
    }
}

function timeStart() {
    if (inter != null) {
        clearInterval(inter);
    }
    cntFlg = true;
}

function timeStop() {
    cntFlg = false;
}

function setNowTime() {
    countTemp = countTime;
    mm = 0;
    ss = 0;
    timeSet = "";
    nokori = document.querySelector('#nokoriTIme');
    mm = Math.floor(countTemp / 60000)
    timeSet = timeSet + String(mm) + '分';
    countTemp = countTemp % 60000;
    ss = Math.floor(countTemp / 1000)
    timeSet = timeSet + String(ss) + '秒';
    nokori.value = timeSet;
    setNextTime(mm, ss)

}

function setNextTime(timeM, timeS) {
    if (tblCnt != 0) {
        timeStr = String(timeM) + ('00' + String(timeS)).slice(-2);
        timeNum = Number(timeStr);
        //console.log(timeStr);
        for (let index = 1; index < tblCnt; index++) {
            tblElement = document.getElementsByName(String(index));
            mmm = tblElement[0].parentElement.id;
            sss = tblElement[0].innerText;
            sss = sss.slice(0, -1);
            sss = ('00' + String(sss)).slice(-2);
            msStr = String(mmm) + String(sss);
            msNum = Number(msStr);
            if (timeNum > msNum) {
                nextMArea = document.getElementById('nextMinutes');
                nextSArea = document.getElementById('nextSecond');
                nextFloorTime = document.getElementsByName('nextFloorTime');
                nextFloorTime[0].setAttribute('id', tblElement[0].id);
                nextMArea.innerText = String(mmm) + '分';
                nextSArea.innerText = String(sss) + '秒';
                break;
            }
            //tblM = Number(tblElement.parentElement[0].innerText.slice(0, -1));
            // console.log(tblElement[0].parentElement.id);
            //console.log(tblElement[0].innerText);
        }
    }
    //console.log(tblCnt);
}

setInterval(countdown, 1000);

function timeMinus() {
    countTime -= 1000;
    setNowTime();
}

function timePlus() {
    countTime += 1000;
    setNowTime();
}

function calStart() {
    cntFalseCnt = 1
        // 開始床状況取得
    yk = Number(document.getElementById('yuka').value)
        // 時間取得
    time = document.querySelector('#startTime');
    time = time.value;
    calcStart();
    if (inter != null) {
        clearInterval(inter);
    }
    if (!cntFlg && cntFalseCnt < tblCnt) {
        cntFalseCnt += 1;
        tblElement = document.getElementsByName(String(cntFalseCnt));

        mm4 = tblElement[0].parentElement.id;
        ss4 = tblElement[0].innerText;

        nextMArea = document.getElementById('nextMinutes');
        nextSArea = document.getElementById('nextSecond');
        nextFloorTime = document.getElementsByName('nextFloorTime');
        nextFloorTime[0].setAttribute('id', tblElement[0].id);
        nextMArea.innerText = String(mm4) + '分';
        nextSArea.innerText = String(ss4);
        inter = setInterval(setFalseNextTime, 13750);
    }
}

function setFalseNextTime() {
    if (!cntFlg && cntFalseCnt < tblCnt) {
        clearInterval(inter);
        cntFalseCnt += 1;
        tblElement = document.getElementsByName(String(cntFalseCnt));
        mm4 = tblElement[0].parentElement.id;
        ss4 = tblElement[0].innerText;

        nextMArea = document.getElementById('nextMinutes');
        nextSArea = document.getElementById('nextSecond');
        nextFloorTime = document.getElementsByName('nextFloorTime');
        nextFloorTime[0].setAttribute('id', tblElement[0].id);
        nextMArea.innerText = String(mm4) + '分';
        nextSArea.innerText = String(ss4);
        inter = setInterval(setFalseNextTime, 17750);
    }

}


function rainbow1Start() {
    tmSet = "";
    cntTemp = countTime;
    ww = Math.floor(cntTemp / 60000)
    tmSet = tmSet + String(ww);
    cntTemp = cntTemp % 60000;
    tt = Math.floor(cntTemp / 1000);
    time = tmSet + String(tt);
    yk = Number(document.getElementById('yukaButton').value)
    calcStart();
}

function calcStart() {
    tblCnt = 1
    result = document.getElementById('result');
    while (result.lastChild) {
        result.removeChild(result.lastChild);
    }
    tbl = document.createElement('table');
    tbl.setAttribute('id', 'tbl');
    tbl.setAttribute('border', '2');
    var box = []; //20220606 ADD しゅ
    stopFlg = 0; //20220606 ADD しゅ
    // 入力時間より分/秒を取得
    timeMin = String(time).slice(0, -2);
    timeSec = String(time).slice(-2);
    // 分
    // 時刻表生成
    for (let indexM = timeMin; indexM >= 0; indexM--) {
        tr = document.createElement('tr');
        tr.setAttribute('id', indexM);
        td = document.createElement('td');
        td.innerText = indexM + '分';
        tr.appendChild(td);
        for (indexS = timeSec; indexS >= 0; indexS -= 17.75) {
            td = document.createElement('td');
            td.innerText = Math.round(indexS) + '秒';
            td.setAttribute('name', tblCnt);
            tblCnt++;
            box.push(Math.round(indexS)); //20220606 ADD しゅ
            switch (yk) {
                case 1:
                case 2:
                    td.setAttribute('id', 'rainbow');
                    yk++;
                    break;
                default:
                    td.setAttribute('id', 'yellow');
                    yk = 1;
                    break;
            }
            tr.appendChild(td);
        }
        timeSec = indexS + 60
        if (Math.round(timeSec) == 60) {
            td = document.createElement('td');
            switch (yk) {
                case 1:
                case 2:
                    td.setAttribute('id', 'rainbow');
                    yk++;
                    break;
                default:
                    td.setAttribute('id', 'yellow');
                    yk = 1;
                    break;
            }
            td.innerText = '00秒';
            td.setAttribute('name', tblCnt);
            tblCnt++;
            tr.appendChild(td);
            timeSec -= 17.75;

        }
        tbl.appendChild(tr);
        result.appendChild(tbl);
    }
    // 初回音声(12.25秒)
    timer1 = setTimeout(announcement, 7750);
}

//初回音声
function announcement() {
    target = document.getElementById("test");
    target.innerText = "7.75秒経過 虹2回目";
    voice('虹･･･2回目');
    floor = 2;
    stopFlg = 1;
    // 2回目以降音声(17.75秒ごと)
    timer2 = setInterval(secondAnnouncement, 17750);
}

//2回目以降音声
function secondAnnouncement() {
    target = document.getElementById("test");
    floor++;
    //1 = 虹1回目, 2 = 虹2回目, それ以外 = 黄円床
    switch (floor) {
        case 1:
            console.log('虹1回目');
            voice('虹･･･1回目');
            target.innerText = "虹1回目";
            break;
        case 2:
            console.log('虹2回目');
            voice('虹･･･2回目');
            target.innerText = "虹2回目";
            floor++;
            break;
        default:
            console.log('黄円床');
            voice('黄色床');
            target.innerText = "黄円床";
            floor = 0;
            break;
    }
}

// 音声終了
function soundStop() {
    clearTimeout(timer1);
    if (stopFlg == 1) {
        clearInterval(timer2);
    }
}

//音声読み上げ
function voice(floorText) {
    // テキストを取得

    // ブラウザにWeb Speech API Speech Synthesis機能があるか判定
    if ('speechSynthesis' in window) {
        // 発言を設定
        const uttr = new SpeechSynthesisUtterance()
        uttr.text = floorText
            // 発言を再生
        window.speechSynthesis.speak(uttr)

    } else {
        alert('大変申し訳ありません。このブラウザは音声合成に対応していません。')
    }
}