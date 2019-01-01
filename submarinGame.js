/**
 * Submarin -- 潜水艦ゲーム
 * @summery:
 *   7つのマス目に、3個の大きさで潜水艦を配置する。
 *   マス目の番号は、1, 2, 3, 4, 5, 6, 7 とする。
 *   そのうちの3つに潜水艦を配置する（連続）。
 *   それが潜水艦の大きさとなる。
 *   （例）[2, 3, 4]
 *   ユーザーは、何番目のマス目に潜水艦があるかを当てる。
 *   3つ当たれば「撃沈」となる。 * 
 * @reference:
 *   『Head First Java 第２版』（オライリー・ジャパン）
 */
class Submarin {
    constructor() {
        // 潜水艦の配置 -- ['B2', 'B3', 'B4']
        this.locationCells = [];
        // 潜水艦の大きさ -- 要素数
        this.length = 0;
        // 命中した数 -- 3で撃沈
        this.numOfHits = 0;   // 使っていない
        // 潜水艦の名前
        this.name = "none";
        // 反応
        this.result = "";
    }

    // @summery: 配置を決める
    // @param: locs -- ['B2', 'B3', 'B4'] などの配列
    setLocationCells(locs) {
        this.locationCells = locs;
        this.length = this.locationCells.length;
    }

    setName(name) {
        this.name = name;
    }

    getName() {
        return this.name;
    }

    // @ デバッグ用に潜水艦の位置を表示するメソッド
    getLocationCells() {
        return this.locationCells.reduce((a, x) => a += x, "");
    }

    // @summery: ユーザーからの攻撃に対する判定処理
    // @param:  String guess -- ユーザーからの攻撃。 2 とか、3とか。
    checkYourself(guess) {
        this.result = '失敗';

        let newCells = this.locationCells.map(x => {
            let s = "";
            if (x === guess) {
                this.result = '命中';
                this.numOfHits++;
            } else {
                s = x;
            }
            if (this.numOfHits === 3) {
                this.result = '撃沈';
            }
            return s;
        });
            
        this.locationCells = newCells;

        return this.result;
    }
}

class GameHelper {
    
    constructor () {
        this.grid = [];
        for (let i=0; i < GRID_SIZE; i++) {
            this.grid[i] = 0;
        }
        this.subCount = 0;
    }

    // @summery: 潜水艦の配置セルを提案する
    // @param: int subSize -- 潜水艦の大きさ
    locateSubmarin(subSize) {
        let alphaCells = [];
        let alphaCoords = [];  // "a3"などのコードを保持する
        let success = false;   // 配置が適切かどうかを示す
        let attempts = 0;      // 試行回数のカウンタ
        let location = 0;      // 検討対象のセル
        let coords = [];       // 候補となる海域セル番号を保持する
                               // 潜水艦が保持
        let incr = 1;          // 配置を決めるときのセルの増加分
        let x = 0;             // 潜水艦の大きさ（カウンタ用）

        this.subcount++;

        let i = Math.floor(Math.random() * 30);
        if ((i % 2) === 1) {
            incr = GRID_LENGTH;
        } 

        // location には、0 〜 48 の数字がはいる。
        // coords は、潜水艦(セル３つ分)。候補となるlocation番号を保持する。
        while (success === false && attempts++ < 200) {
            // 0〜48のどれかをランダムに選ぶ
            location = Math.floor(Math.random() * GRID_SIZE);
            success = true;
            x = 0;
            // 潜水艦の大きさが subSize -- 3 以下ならば
            while (success === true && x < subSize) {
                // その海域がまだ不使用ならば
                if (this.grid[location] === 0) {
                    coords[x] = location;  // この海域番号を保持する。
                    x++;
                    location += incr;      // 次の海域セル
                    // そのセルが全海域サイズよりも大きければ
                    if (location >= GRID_SIZE) {
                        success = false;
                    }
                    // そのセルが7で割り切れるということは、はみ出ているということ
                    if (x > 0 && location % GRID_LENGTH === 0) {
                                            success = false;
                    }
                } else {             // その海域は使用済み(1)
                    success = false;
                }
            }
        }

        x = 0;      // 潜水艦の大きさ（セルの数）
        let row = 0;
        let col = 0;
        while (x < subSize) {
            // coords[x]には、0 〜 48 の数字が格納されている。
            this.grid[coords[x]] = 1;  // そのセルを使用済みとする。
            row = Math.floor(coords[x] / GRID_LENGTH);   // 縦番号
            col = coords[x] % GRID_LENGTH;               // 横番号
            let alpha = ALPHABET.charAt(col);
            alphaCells[coords[x]] = alpha + (row + 1);
            alphaCoords[x] = alphaCells[coords[x]];
            x++;
        }
        return alphaCoords;
    }
}

/**
 * @summery: 'B4'などのセル指定の結果を得る
 * @param: result -- Map(3) { SeaTiger =>  "失敗", Papiyon => "命中", Mermaid => "撃沈"}
 */
function checkYourGuess(guess) {
    numOfGuess++;

    guess = guess.toUpperCase();

    let result = new Map();

    for (const s of submarinList) {
        result.set(s.getName(), s.checkYourself(guess));
    }

    // console.log(result);

    // result = submarinList.map(ship => ({ nam: ship.getName(), out: ship.checkYourself(guess) }));


    // numOfHitsが3であるもの（=3回命中したもの）がみつかったら、
    if (submarinList.find(s => s.numOfHits === 3)) {
        // numOfHitsが3でないもので配列を作り直す。
        submarinList = submarinList.filter(s => s.numOfHits !== 3);
        // 潜水艦の数を1つ減らす。
        numOfSubmarin--;
    }
    
    return result;
}

function checkUsedCell(cell) {

    if (usedCells.find(x => x === cell)) {
        console.log('used!');
        return true;
    } else {
        console.log('not used');
        usedCells.push(cell);
        return false;
    }
}


/**
 * @summery: セルを指定したあとの処理。
 *           画面に「命中」とかの表示をする。
 * @param: ユーザの入力したセル（文字列 ex.'B3'）
 */
function selection(cell) {

    if (numOfSubmarin === 0) return false;
    if (checkUsedCell(cell)) return false;

    // res -- Map(3) { SeaTiger → "失敗", Papiyon → "命中", Mermaid → "失敗" }
    const res = checkYourGuess(cell);

    // デバッグ用
    // console.log(submarinList.map(x => x.getLocationCells()));
    // console.log(res);
    
    // ドキュメントに表示する
	const ele = document.getElementById(cell);
    const message1 = document.getElementById('mes1');
    const message2 = document.getElementById('mes2');
    const hantei = document.getElementById('kekka');
    const replay = document.getElementById('replay');
    replay.onclick = (() => {
        // location.reload();
        message1.textContent = "";
        message2.textContent = "";
        hantei.textContent = "";
        replay.setAttribute("style", "display: none");
        init();
    });
        

    let hit = false;
    for (const [k, v] of res) {
        switch(v) {
            case "命中":
 		        ele.textContent = "@";
                hantei.textContent = "命中";
                hit = true;
                break;
            case "撃沈":
 		        ele.textContent = "@";
                hantei.textContent = k + "を撃沈";
                hit = true;
                break;
            default:
                ele.textContent = "x";
                hantei.textContent = "失敗";
                break;
        }
        if (hit) break;
    }
                
    if (numOfSubmarin === 0) {
        message1.textContent = "おめでとう。全て撃沈しました。";
        message2.textContent = "あなたの攻撃回数は、" + numOfGuess + "回です。";
        replay.setAttribute("style", "display: block");
        return false;
    }
}

/**
 * ここでonclickの設定をしてもうまくいかなかった。
 * しかたないので、htmlの中にonclickを入れた。
 * だから、この関数は使っていない。
 */
function play() {

    const alpha = "ABCDEFG";
    let al = "";

    for (let i = 0; i < 7; i++) {
        al = alpha.substr(i, 1);
        for (let j = 1; j <= 7; j++) {
            cell = al + j.toString();
            // console.log(cell);
            document.getElementById(cell).onclick = selection; // (cell);
        }
    }
}

function initCells() {
    const alpha = "ABCDEFG";
    let al = "";

    for (let i = 0; i < 7; i++) {
        al = alpha.substr(i, 1);
        for (let j = 1; j <= 7; j++) {
            cell = al + j.toString();
            // console.log(cell);
            document.getElementById(cell).textContent = '.';
        }
    }
    
}



function init() {
    usedCells.length = 0;
    let loc = [];
    numOfGuess = 0;    // 攻撃回数をゼロにセット
    submarinList.length = 0;    // 潜水艦リストを空にする
    numOfSubmarin = 3;

    initCells();
    
    const numOfCells = 3;             // 潜水艦の大きさ
    const submarin1 = new Submarin();
    const submarin2 = new Submarin();
    const submarin3 = new Submarin();

    const game = new GameHelper();

    loc = game.locateSubmarin(numOfCells);
    submarin1.setLocationCells(loc);
    submarin1.setName('SeaTiger');
    // console.log(submarin1.getName() + ":" + submarin1.getLocationCells());

    loc = game.locateSubmarin(numOfCells);
    submarin2.setLocationCells(loc);
    submarin2.setName('Papiyon');
    // console.log(submarin2.getName() + ":" + submarin2.getLocationCells());

    loc = game.locateSubmarin(numOfCells);
    submarin3.setLocationCells(loc);
    submarin3.setName('Mermaid');
    // console.log(submarin3.getName() + ":" + submarin3.getLocationCells());

    submarinList.push(submarin1);
    submarinList.push(submarin2);
    submarinList.push(submarin3);
}


function howto() {
    const OPEN_HOWTO = document.getElementById('howto-btn');
    const DES_BOX = document.getElementById('des-howto-play');

    let switch_text = "off";
    
    OPEN_HOWTO.onclick = (() => {
        switch (switch_text) {
            case "off" :
                DES_BOX.setAttribute("style", "display: block");
                OPEN_HOWTO.textContent = "と　じ　る";
                switch_text = "on";
                break;
            case "on" :
                DES_BOX.setAttribute("style", "display: none");
                OPEN_HOWTO.textContent = "あそびかた";
                switch_text = "off";
                break;
        }
    });
}


// 広域変数・定数
const ALPHABET = "ABCDEFG";
const GRID_LENGTH = 7;
const GRID_SIZE = 49;
let cell = "";
let usedCells = [];       // そのセルが未使用かどうか

let numOfGuess = 0;       // 攻撃回数
let numOfSubmarin = 3;    // 潜水艦の数

/**
 * データのオブジェクト
 * submarinList
 * [{ locationCells: ['D2', 'E2', 'F2'] ,
 *    name:          'SeaTiger',
 *    numOfHits:     0,
 *    result:        '失敗''},
 *  { locationCells: ['C5', 'D5', 'E5'] ,
 *    name:          'Papiyon',
 *    numOfHits:     0,
 *    result:        '失敗''},
 *  { locationCells: ['C7', 'D7', 'E7'] ,
 *    name:          'MerMaid',
 *    numOfHits:     0,
 *    result:        '失敗''}]
 */
let submarinList = [];    // 潜水艦オブジェクトの配列

window.onload = (() => {
    init();
    howto();
    // play(); //  <== onclickをスクリプト内に入れるにはどうすればいいか？
});

