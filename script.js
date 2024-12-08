// 유저는 숫자를 입력할 수 있다
// 유저가 입력한 숫자가 컴퓨터가 뽑은 숫자보다 작으면 Up! 이라고 알려준다
// 유저가 입력한 숫자가 컴퓨터가 뽑은 숫자보다 크면 Down! 이라고 알려준다
// 유저가 입력한 숫자가 컴퓨터가 뽑은 숫자와 일치하다면 That’s right이라고 뜨고 게임이 종료된다.
// 유저는 총 5번의 기회가 있다
// 게임이 종료되면 버튼은 비활성화된다
// 리셋버튼을 누르면 게임이 초기화된다
// 유저가 1~100범위 밖에 숫자를 입력할시에 경고메세지가 뜬다
// 유저가 이미 입력한 값을 또 입력할 시에 경고메세지가 뜬다
// 반응형 UI

let resultRandomNumber      = 0
let computerRandomNumberId  = document.getElementById("random-num-computer")    //PCが選んだランダム数字
let playButton              = document.getElementById("button-click")           //プレイスタートボタン
let userInput               = document.getElementById("user-input")             //ユーザが入力した数字
let upDown                  = document.getElementById("up-down")                //PC数字とユーザ数字の比較
let chancesNum              = document.getElementById("chances-num")            //残りの命
let resetButton             = document.getElementById("reset-button")           //リセットボタン
let chances                 = 5         //命5回
let gameOver                = false     //ゲームオーバ判別
let history                 = []        //重複数字判別

//clickすることによってゲームスタート
playButton.addEventListener("click", play)
resetButton.addEventListener("click", reset)
userInput.addEventListener("focus", function(){userInput.value = ""})

//ランダム数字発生
function computerRandomNumber(){
    resultRandomNumber = Math.floor(Math.random() * 10) + 1
}

//ゲームプレイ中の条件
function play(){
    let userValue = userInput.value

    if(userValue < 1 || userValue > 100){
        upDown.textContent = "１～１００までの数字を入力してください。"
        return
    }
    if(history.includes(userValue)){
        upDown.textContent = "既に入力したことがある数字です。他の数字を入力してください。"
        return
    }

    chances -- ;
    chancesNum.textContent = `残りの命：${chances}`

    if(userValue < resultRandomNumber){
        upDown.textContent = "UP"
    } else if(userValue > resultRandomNumber){
        upDown.textContent = "Down"
    } else {
        upDown.textContent = "正解"
    }

    history.push(userValue)

    if(chances === 0){
        gameOver = true
    }
    if(gameOver == true){
        playButton.disabled = true
        upDown.textContent = "GAME OVER"
        computerRandomNumberId.textContent  = `PCが選んだ数字：${resultRandomNumber}`
    }
}

//リセット
function reset(){
    chancesNum.textContent = "残りの命：5"
    userInput.value = ""
    upDown.textContent = "１～１００までの数字を入力してください。"
    computerRandomNumberId.textContent  = ""
    chances = 5
    gameOver = false
    playButton.disabled = false
    history = []
    computerRandomNumber()
}

//実行（ランダム数字）
computerRandomNumber()