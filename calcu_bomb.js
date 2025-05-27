var minutes20 = 1200000;
var countTime = 0;
var countDownFlg = false;
var tblCnt = 0;
var cntFlg = false;
var inter = null
enterCli = document.getElementById('startTime');
enterCli.addEventListener('keypress', pressEnter);
enterCli2 = document.getElementById('startTime2');
enterCli2.addEventListener('keypress', pressEnter2);
befTimeMin = 999
interval75 = 14.5
cntFalseCnt = 1
let aResult = [{ aTime: 0, aColor: "" }];

function pressEnter(e) {
    if (e.keyCode === 13) {
        aResult = [{ aTime: 0, aColor: "" }];
        cntFalseCnt = 1
        calStart();
    }
    return false;
}

function pressEnter2(e) {
    if (e.keyCode === 13) {
        aResult = [{ aTime: 0, aColor: "" }];
        cntFalseCnt = 1
        calStart2();
    }
    return false;
}

function set10minutes() {
    if (inter != null) {
        clearInterval(inter);
    }
    countTime = minutes20;
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
    if (tblCnt > 1) {
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
        // 時間取得
    time = document.querySelector('#startTime');
    time = time.value;
    startInter = 2

    calcStart75();
    if (inter != null) {
        clearInterval(inter);
    }
    inter = setInterval(setFalseNextTime, 0);
}

function calStart2() {
    // 時間取得
    time = document.querySelector('#startTime');
    time = time.value;
    time2 = document.querySelector('#startTime2');
    time2 = time2.value;
    startInter = 1
    calcStart25();
    if (inter != null) {
        clearInterval(inter);
    }
    inter = setInterval(setFalseNextTime, 0);
}

function calcStart25() {
    tblCnt = 1
    result = document.getElementById('result');
    while (result.lastChild) {
        result.removeChild(result.lastChild);
    }
    tbl = document.createElement('table');
    tbl.setAttribute('id', 'tbl');
    tbl.setAttribute('border', '2');
    stopFlg = 0;
    // 入力時間より分/秒を取得
    timeMin = String(time).slice(0, -2);
    timeSec = String(time).slice(-2);
    timeSet = Number(timeMin) * 60 + Number(timeSec)
    bombTimeSet = timeSet - 110

    // 時刻表生成
    setCell("blue", timeSet, interval75)
    setCell("yellow", bombTimeSet, interval75)
    timeMin = String(time2).slice(0, -2);
    timeSec = String(time2).slice(-2);
    timeSet = Number(timeMin) * 60 + Number(timeSec)
    bombTimeSet = timeSet - 110
    aResult = aResult.filter(({ aTime, aColor }) => aTime < timeSet && aColor == "yellow" && aTime > bombTimeSet)
    console.log(aResult);
    setCell("blue", timeSet, 12.5)
    setCell("yellow", bombTimeSet, 12.5)
    appScr()
    if (inter != null) {
        clearInterval(inter);
    }
}


function calcStart75() {
    tblCnt = 1
    result = document.getElementById('result');
    while (result.lastChild) {
        result.removeChild(result.lastChild);
    }
    tbl = document.createElement('table');
    tbl.setAttribute('id', 'tbl');
    tbl.setAttribute('border', '2');
    stopFlg = 0;
    // 入力時間より分/秒を取得
    timeMin = String(time).slice(0, -2);
    timeSec = String(time).slice(-2);
    timeSet = Number(timeMin) * 60 + Number(timeSec)
    bombTimeSet = timeSet - 110

    // 時刻表生成
    setCell("blue", timeSet, interval75)
    setCell("yellow", bombTimeSet, interval75)

    appScr()
    if (inter != null) {
        clearInterval(inter);
    }
}

function setCell(color, bTime, intervalTime) {
    for (let nowTime = bTime; nowTime > 0; nowTime -= intervalTime) {
        arrFind = aResult.find(({ aTime }) => aTime == Math.floor(nowTime))

        if (arrFind != undefined) {
            aResult = aResult.filter(({ aTime }) => aTime != Math.floor(nowTime))
            aResult.push({ aTime: Math.floor(nowTime), aColor: "rainbow" })
        } else {
            aResult.push({ aTime: Math.floor(nowTime), aColor: color })
        }
    }
    aResult.sort((a, b) =>
        a.aTime < b.aTime ? 1 : -1);
}

function appScr() {
    for (let index = 0; aResult.length - 1 > index; index++) {
        timeMin = Math.floor(aResult[index].aTime / 60)
        timeSec = (aResult[index].aTime) % 60
        if (timeMin != befTimeMin) {
            tr = document.createElement('tr');
            tr.setAttribute('id', timeMin);
            td = document.createElement('td');
            td.innerText = timeMin + '分';
            tr.appendChild(td);
        }
        td = document.createElement('td');
        td.setAttribute('id', aResult[index].aColor);
        td.setAttribute('name', index);
        td.innerText = timeSec + '秒';
        tr.appendChild(td);

        // console.log(index + ":" + aResult[index].aTime);
        befTimeMin = timeMin
        tbl.appendChild(tr);
        result.appendChild(tbl);

    }
}

function setFalseNextTime() {

    if (!cntFlg && aResult.length - 1 > cntFalseCnt) {
        clearInterval(inter);
        tblElement = document.getElementsByName(String(cntFalseCnt));
        mm4 = tblElement[0].parentElement.id;
        ss4 = tblElement[0].innerText;

        nextMArea = document.getElementById('nextMinutes');
        nextSArea = document.getElementById('nextSecond');
        nextFloorTime = document.getElementsByName('nextFloorTime');
        nextFloorTime[0].setAttribute('id', tblElement[0].id);
        nextMArea.innerText = String(mm4) + '分';
        nextSArea.innerText = String(ss4);
        if (aResult.length - 2 > cntFalseCnt) {
            tblElement = document.getElementsByName(String(cntFalseCnt - 1));
            mm4Bef = tblElement[0].parentElement.id;
            ss4Bef = tblElement[0].innerText;
            ss4 = Number(ss4.replace("秒", ""));
            ss4Bef = Number(ss4Bef.replace("秒", ""));


            console.log("ss4Bef:" + ss4Bef);
            console.log("ss4:" + ss4);
            if (ss4 <= ss4Bef) {
                intTime = (ss4Bef - ss4 - startInter) * 1000
                console.log("a");

            } else {
                console.log("b");
                intTime = (ss4Bef - ss4 + 60 - startInter) * 1000
            }
            startInter = 0
            console.log(intTime);

        }

        cntFalseCnt += 1;
        inter = setInterval(setFalseNextTime, intTime);
    }
    if (!(aResult.length - 1 > cntFalseCnt)) {
        console.log("終了");
        clearInterval(inter)

    }

}