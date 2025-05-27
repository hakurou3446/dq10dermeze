let gamePad;
let NowGamePadsButton = new Array(17);
let BeforeGamePadsButton = new Array(17);
let Max_AI_Element
let Max_AI_int = 2
let AI_Count_Element
let AI_Count_int = 1
let MAX_AI_Change_Button_Element
let MAX_AI_Change_Button_Value
let AI_Count_Button_Element
let AI_Count_Button_Value

addEventListener('gamepadconnected', (e) => {
    // パッドが接続されたらインデックスを保存
    gamePad = navigator.getGamepads()[0];
    console.log(gamePad);
});

// 押された瞬間のフレームのみtrueを返す
function pressButton(buttonIndex) {
    return !BeforeGamePadsButton[buttonIndex] && NowGamePadsButton[buttonIndex]
}

// AIをカウントする
function AIplus() {
    AI_Count_int++
    if (AI_Count_int > Max_AI_int) {
        AI_Count_int = 1
    }
    AI_Count_Element.innerText = AI_Count_int
    AIColor()
}

// MAX AIを切り替え
function AIChange() {
    if (Max_AI_int == 2) {
        AIplus()
        Max_AI_int = 3
        Max_AI_Element.style.backgroundColor = 'rgb(110, 252, 141)';
    } else {
        AI_Count_int = 1
        AI_Count_Element.innerText = AI_Count_int
        Max_AI_int = 2
        Max_AI_Element.style.backgroundColor = 'rgb(110, 235, 252)';
    }
    Max_AI_Element.innerText = Max_AI_int
    AIColor()
}

function AIColor() {
    if (AI_Count_int == Max_AI_int) {
        AI_Count_Element.style.backgroundColor = 'yellow';
    } else {
        AI_Count_Element.style.backgroundColor = 'transparent';
    }
}

function ViewLoop() {
    MAX_AI_Change_Button_Element = document.getElementById('MAX_AI_Change_Button_Value');
    MAX_AI_Change_Button_Value = MAX_AI_Change_Button_Element.value;

    AI_Count_Button_Element = document.getElementById('AI_Count_Button_Value');
    AI_Count_Button_Value = AI_Count_Button_Element.value;

    if (gamePad != null) {
        // ゲームパッド情報取得
        gamePad = navigator.getGamepads()[0];
        // 前フレームのゲームパッド情報取得
        for (let i = 0; i < 17; i++) {
            NowGamePadsButton[i] = gamePad.buttons[i].pressed;
        }
        if (NowGamePadsButton.indexOf(true) != -1 && pressButton(MAX_AI_Change_Button_Value)) {
            AIChange()
            Max_AI_Element = document.getElementById('MAX_AI');
            Max_AI_int = Max_AI_Element.innerText;

            AI_Count_Element = document.getElementById('AI_Count');
            AI_Count_int = AI_Count_Element.innerText;

        }
        if (NowGamePadsButton.indexOf(true) != -1 && pressButton(AI_Count_Button_Value)) {
            AIplus()
            Max_AI_Element = document.getElementById('MAX_AI');
            Max_AI_int = Max_AI_Element.innerText;

            AI_Count_Element = document.getElementById('AI_Count');
            AI_Count_int = AI_Count_Element.innerText;

        }

        if (pressButton(NowGamePadsButton.indexOf(true))) {
            switch (NowGamePadsButton.indexOf(true)) {
                case 0:
                    pressed = "B"
                    break;
                case 1:
                    pressed = "A"
                    break;
                case 2:
                    pressed = "Y"
                    break;
                case 3:
                    pressed = "X"
                    break;
                case 4:
                    pressed = "L"
                    break;
                case 5:
                    pressed = "R"
                    break;
                case 6:
                    pressed = "ZL"
                    break;
                case 7:
                    pressed = "ZR"
                    break;
                case 8:
                    pressed = "-"
                    break;
                case 9:
                    pressed = "+"
                    break;
                case 10:
                    pressed = "L stick"
                    break;
                case 11:
                    pressed = "R stick"
                    break;
                case 12:
                    pressed = "↑"
                    break;
                case 13:
                    pressed = "↓"
                    break;
                case 14:
                    pressed = "←"
                    break;
                case 15:
                    pressed = "→"
                    break;
                case 16:
                    pressed = "しいたけ"
                    break;
                default:
                    break;
            }
            console.log("pressed：" + pressed);

        }


        // 前フレームのゲームパッド情報取得
        for (let i = 0; i < 17; i++) {
            BeforeGamePadsButton[i] = gamePad.buttons[i].pressed;

        }
    }
    requestAnimationFrame(ViewLoop);
}
for (let i = 0; i < 17; i++) {
    BeforeGamePadsButton[i] = false;
}
Max_AI_Element = document.getElementById('MAX_AI');
Max_AI_int = Max_AI_Element.innerText;

AI_Count_Element = document.getElementById('AI_Count');
AI_Count_int = AI_Count_Element.innerText;
Max_AI_Element.style.backgroundColor = 'rgb(110, 235, 252)';
ViewLoop();