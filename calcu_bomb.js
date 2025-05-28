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

function pressEnter(e) {
    if (e.keyCode === 13) {
        aResult = [{ aTime: 0, aColor: "" }];
        cntFalseCntY = 0
        cntFalseCntB = 0
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
    }
    return false;
}

function pressEnter2(e) {
    if (e.keyCode === 13) {
        aResult = [{ aTime: 0, aColor: "" }];
        cntFalseCntY = 0
        cntFalseCntB = 0
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
        calStart2();
    }
    return false;
}

function set10minutes() {
    if (inter != null) {
        clearTimeout(inter);
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
        clearTimeout(inter);
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
    // 時間取得
    time = document.querySelector('#startTime');
    time = time.value;
    startInter = 4
    startInterY = startInter
    startInterB = startInter

    calcStart75();
    interY = setTimeout(setFalseNextTimeY, 0);
    interB = setTimeout(setFalseNextTimeB, 0);
}

function calStart2() {
    // 時間取得
    time = document.querySelector('#startTime');
    time = time.value;
    time2 = document.querySelector('#startTime2');
    time2 = time2.value;
    startInter = 4
    startInterY = startInter
    startInterB = startInter
    calcStart25();
    interY = setTimeout(setFalseNextTimeY, 0);
    interB = setTimeout(setFalseNextTimeB, 0);
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
    setCell("blue", timeSet, 12.5)
    setCell("yellow", bombTimeSet, 12.5)
    appScr()
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
}

function setCell(color, bTime, intervalTime) {
    for (let nowTime = bTime; nowTime > 0; nowTime -= intervalTime) {
        arrFind = aResult.find(({ aTime }) => aTime == Math.floor(nowTime))

        if (arrFind != undefined) {
            // aResult = aResult.filter(({ aTime }) => aTime != Math.floor(nowTime))
            // aResult.push({ aTime: Math.floor(nowTime), aColor: "rainbow" })
            aResult.push({ aTime: Math.floor(nowTime), aColor: color })
        } else {
            aResult.push({ aTime: Math.floor(nowTime), aColor: color })
        }
    }
    aResult.sort((a, b) =>
        a.aTime < b.aTime ? 1 : -1);
}

function appScr() {
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
        if (aResult[index].aColor == "yellow") {
            td.setAttribute('name', aResult[index].aColor + "_" + yellowIndex);
            yellowIndex++
        } else if (aResult[index].aColor == "blue") {
            td.setAttribute('name', aResult[index].aColor + "_" + blueIndex);
            blueIndex++

        }
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
    if (!cntFlg && aResult.filter(({ aColor }) => aColor == "yellow").length > cntFalseCntY) {
        if (tblElementY != null) {
            tblElementY[0].removeAttribute('style')
        }
        tblElementY = document.getElementsByName("yellow_" + String(cntFalseCntY));
        mm4Y = tblElementY[0].parentElement.id;
        ss4Y = tblElementY[0].innerText;

        tblElementY[0].setAttribute('style', 'border: groove thick rgb(255, 62, 191)')

        nextMAreaY = document.getElementById('nextMinutes_yellow');
        nextSAreaY = document.getElementById('nextSecond_yellow');
        nextFloorTimeY = document.getElementsByName('nextFloorTime_yellow');
        nextFloorTimeY[0].setAttribute('id', tblElementY[0].id);
        nextMAreaY.innerText = String(mm4Y) + '分';
        nextSAreaY.innerText = "0".repeat(2 - String(ss4Y).length) + String(ss4Y);
        if (cntFalseCntY == 0) {
            intTimeY = (aResult[0].aTime - (Number(mm4Y) * 60 + Number(ss4Y.replace("秒", ""))) - Number(startInterY)) * 1000
        } else {
            if (aResult.length - 2 > cntFalseCntY) {
                tblElementAY = document.getElementsByName("yellow_" + String(cntFalseCntY - 1));
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
        cntFalseCntY += 1;
        console.log(intTimeY);
        interY = setTimeout(setFalseNextTimeY, intTimeY);

    }
    if (!(aResult.length - 1 > cntFalseCntY)) {
        console.log("終了");

    }

}

function setFalseNextTimeB() {
    if (!cntFlg && aResult.filter(({ aColor }) => aColor == "blue").length > cntFalseCntB) {
        if (tblElementB != null) {
            tblElementB[0].removeAttribute('style')

        }

        tblElementB = document.getElementsByName("blue_" + String(cntFalseCntB));
        mm4B = tblElementB[0].parentElement.id;
        ss4B = tblElementB[0].innerText;

        tblElementB[0].setAttribute('style', 'border: groove thick rgb(255, 62, 191)')

        nextMAreaB = document.getElementById('nextMinutes_blue');
        nextSAreaB = document.getElementById('nextSecond_blue');
        nextFloorTimeB = document.getElementsByName('nextFloorTime_blue');
        nextFloorTimeB[0].setAttribute('id', tblElementB[0].id);
        nextMAreaB.innerText = String(mm4B) + '分';
        nextSAreaB.innerText = "0".repeat(2 - String(ss4B).length) + String(ss4B);
        if (cntFalseCntB == 0) {
            intTimeB = (aResult[0].aTime - (Number(mm4B) * 60 + Number(ss4B.replace("秒", ""))) - Number(startInterB)) * 1000
        } else {
            if (aResult.length - 2 > cntFalseCntB) {
                tblElementAB = document.getElementsByName("blue_" + String(cntFalseCntB - 1));
                ss4BefB = tblElementAB[0].innerText;
                ss4B = Number(ss4B.replace("秒", ""));
                ss4BefB = Number(ss4BefB.replace("秒", ""));


                if (ss4B <= ss4BefB) {
                    intTimeB = (ss4BefB - ss4B - startInterB) * 1000

                } else {
                    intTimeB = (ss4BefB - ss4B + 60 - startInterB) * 1000
                }
                aResult[0].aTime
            }
        }
        if (intTimeB < 0) {
            startInterB = intTimeB / 1000 * -1
            intTimeB = 0
        } else {
            startInterB = 0
        }
        console.log(intTimeB);
        cntFalseCntB += 1;
        interB = setTimeout(setFalseNextTimeB, intTimeB);

    }
    if (!(aResult.length - 1 > cntFalseCntB)) {
        console.log("終了");

    }

}