var minutes20 = 1200000;
var countTime = 0;
var countDownFlg = false;
var tblCnt = 0;
var cntFlg = false;
var interY = null
var interB = null
enterCli = document.getElementById('startTime');
enterCli.addEventListener('keypress', pressEnter);
enterCli2 = document.getElementById('startTime2');
enterCli2.addEventListener('keypress', pressEnter2);
befTimeMin = 999
interval75 = 14.5
let aResult = [{ aTime: 0, aColor: "" }];
let cntType
let circleStartInter = 6
let circleCTime = [23.5, 21]
let circleCColor = ["yellow", "yellow"]
let circleCOther = ["線上", "線上", "金網", "線上", "外周", "金網"]

let grandStartInter = 5
let grandCTime = [22.2, 24.5]
let grandCColor = ["rainbow", "yellow"]
let grandCOther = ["-", "外周", "-", "外周", "-", "なし", "-", "線上", "-", "金網", "-", "線上"]

function minusCount75() {
    console.log("minusCount75");

    fix_Count(-1 * document.getElementById('fix_75').value)
}

function plusCount75() {
    console.log("plusCount75");
    fix_Count(document.getElementById('fix_75').value)
}

function fix_Count(fixCount) {
    console.log("fix_Count");
    let tmpResult = [{ aTime: 0, aColor: "" }];
    for (let index = 0; aResult.length - 1 > index; index++) {
        tmpTime = aResult[index].aTime
        if (tmpTime < 0) {
            // aResult[index].aTime
        } else {
            tmpResult.push({ aTime: Number(tmpTime) + Number(fixCount), aColor: aResult[index].aColor })
        }
    }
    tmpResult.sort((a, b) =>
        a.aTime < b.aTime ? 1 : -1);
    aResult = null
    aResult = tmpResult
    tblCnt = 1
    tbl = document.createElement('table');
    tbl.setAttribute('id', 'tbl');
    tbl.setAttribute('border', '2');
    appScr()
    tblElementY = document.getElementsByName(String(cntFalseCnt - 1));
    tblElementY[0].setAttribute('style', 'border: groove thick rgb(255, 62, 191)')
    tblElementB[0].setAttribute('style', 'border: groove thick rgb(255, 62, 191)')

}

function pressEnter(e) {
    console.log("pressEnter");
    if (e.keyCode === 13) {
        calcStart();
    }
    return false;
}

function pressEnter2(e) {
    console.log("pressEnter2");
    if (e.keyCode === 13) {
        calcStart2();
    }
    return false;
}

function calcStart() {
    console.log("calcStart");
    aResult = [{ aTime: 0, aColor: "" }];
    time = document.querySelector('#startTime');
    cntType = "C"
    cntFalseCnt = 0
    tblElementY = null
    tblElementB = null
    firstFY = true
    firstFB = true
    if (interY != null) {
        clearTimeout(interY)
    }
    if (interB != null) {
        clearTimeout(interB)
    }
    calStart();

    return false;
}

function calcStart2() {
    console.log("calcStart2");
    aResult = [{ aTime: 0, aColor: "" }];
    time = document.querySelector('#startTime2');
    cntType = "G"
    cntFalseCnt = 0
    tblElementY = null
    tblElementB = null
    firstFY = true
    firstFB = true
    if (interY != null) {
        clearTimeout(interY)
    }
    if (interB != null) {
        clearTimeout(interB)
    }
    calStart();

    return false;
}

function calStart() {
    console.log("calStart");
    // 時間取得
    time = time.value;
    startInter = 3
    startInterY = 0
    switch (cntType) {
        case "C":
            startInterB = circleStartInter
            break;
        case "G":
            startInterB = grandStartInter
            break;
    }

    calcStart75();
    interY = setTimeout(setFalseNextTimeY, (startInterB - startInter) * 1000);
}


function calcStart75() {
    console.log("calcStart75");
    tblCnt = 1
    tbl = document.createElement('table');
    tbl.setAttribute('id', 'tbl');
    tbl.setAttribute('border', '2');
    stopFlg = 0;
    // 入力時間より分/秒を取得
    timeMin = String(time).slice(0, -2);
    timeSec = String(time).slice(-2);
    timeSet = Number(timeMin) * 60 + Number(timeSec)
        // 時刻表生成
    timeSet -= startInterB
    setCell(timeSet)

    appScr()
}

function setCell(bTime) {
    console.log("setCell");
    let nowCnt = 0
    let nowCnt2 = 0
    color = ""

    switch (cntType) {
        case "C":
            CTime = circleCTime
            CColor = circleCColor
            break;

        case "G":
            CTime = grandCTime
            CColor = grandCColor
            break;
    }
    for (let nowTime = bTime; nowTime > 0; nowTime -= CTime[nowCnt2]) {
        arrFind = aResult.find(({ aTime }) => aTime == Math.floor(nowTime))
        color = CColor[nowCnt2]
        if (arrFind != undefined) {
            // aResult = aResult.filter(({ aTime }) => aTime != Math.floor(nowTime))
            // aResult.push({ aTime: Math.floor(nowTime), aColor: "rainbow" })
            aResult.push({ aTime: Math.floor(nowTime), aColor: color })
        } else {
            aResult.push({ aTime: Math.floor(nowTime), aColor: color })
        }
        nowCnt++
        nowCnt2 = nowCnt % CTime.length
    }
    aResult.sort((a, b) =>
        a.aTime < b.aTime ? 1 : -1);

}

function appScr() {
    console.log("appScr");
    let result = document.getElementById('result');
    while (result.lastChild) {
        result.removeChild(result.lastChild);
    }
    yellowIndex = 0
    blueIndex = 0

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
        td.setAttribute('name', yellowIndex);
        yellowIndex++
        td.setAttribute('width', "40pt");
        td.innerText = timeSec;
        tr.appendChild(td);

        // console.log(index + ":" + aResult[index].aTime);
        befTimeMin = timeMin
        tbl.appendChild(tr);
        result.appendChild(tbl);
    }
}

function setFalseNextTimeY() {
    console.log("setFalseNextTimeY");
    switch (cntType) {
        case "C":
            cOther = circleCOther
            break;

        case "G":
            cOther = grandCOther
            break;
    }

    nowCnt3 = cOther.length
    if (!cntFlg && aResult.length > cntFalseCnt) {
        if (tblElementY != null) {
            tblElementY[0].removeAttribute('style')
        }
        tblElementY = document.getElementsByName(String(cntFalseCnt));
        mm4Y = tblElementY[0].parentElement.id;
        ss4Y = tblElementY[0].innerText;

        tblElementY[0].setAttribute('style', 'border: groove thick rgb(255, 62, 191)')

        nextMAreaY = document.getElementById('nextMinutes');
        nextSAreaY = document.getElementById('nextSecond');
        nextOAreaY = document.getElementById('nextOther');
        nextFloorTimeY = document.getElementsByName('nextFloorTime');
        nextFloorTimeY[0].setAttribute('id', tblElementY[0].id);
        nextMAreaY.innerText = String(mm4Y) + '分';
        nextSAreaY.innerText = "0".repeat(2 - String(ss4Y).length) + String(ss4Y);
        nextOAreaY.innerText = cOther[cntFalseCnt % nowCnt3];
        if (cntFalseCnt == 0) {
            intTimeY = (aResult[0].aTime - (Number(mm4Y) * 60 + Number(ss4Y.replace("秒", ""))) - Number(startInterY)) * 1000
        } else {
            if (aResult.length - 2 > cntFalseCnt) {
                tblElementAY = document.getElementsByName(String(cntFalseCnt - 1));
                ss4BefY = tblElementAY[0].innerText;
                ss4Y = Number(ss4Y.replace("秒", ""));
                ss4BefY = Number(ss4BefY.replace("秒", ""));


                if (ss4Y <= ss4BefY) {
                    intTimeY = (ss4BefY - ss4Y - startInterY) * 1000

                } else {
                    intTimeY = (ss4BefY - ss4Y + 60 - startInterY) * 1000
                }
                aResult[0].aTime
            }
        }
        if (intTimeY < 0) {
            startInterY = intTimeY / 1000 * -1
            intTimeY = 0
        } else {
            startInterY = 0
        }
        console.log(cOther[cntFalseCnt % nowCnt3]);
        cntFalseCnt += 1;

        interY = setTimeout(setFalseNextTimeY, intTimeY);

    }
    if (!(aResult.length - 1 > cntFalseCnt)) {
        console.log("終了");

    }

}