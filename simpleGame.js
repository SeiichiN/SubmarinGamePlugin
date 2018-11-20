/**
 * DotCom -- 潜水艦ゲーム
 * @summery:
 *   7つのマス目に、3個の大きさで潜水艦を配置する。
 *   マス目の番号は、1, 2, 3, 4, 5, 6, 7 とする。
 *   そのうちの3つに潜水艦を配置する（連続）。
 *   それが潜水艦の大きさとなる。
 *   （例）[2, 3, 4]
 *   ユーザーは、何番目のマス目に潜水艦があるかを当てる。
 *   3つ当たれば「撃沈」となる。 * 
 */
class DotCom {
    constructor() {
        // 潜水艦の配置 -- ['2', '3', '4']
        this.locationCells = [];
        // 潜水艦の大きさ -- 要素数
        this.length = 0;
        // 命中した数 -- 3で撃沈
        this.numOfHits = 0;
    }

    // @summery: 配置を決める
    // @param: locs -- ['2', '3', '4'] などの配列
    setLocationCells(locs) {
        this.locationCells = locs;
        this.length = this.locationCells.length;
    }

    // @summery: ユーザーからの攻撃に対する判定処理
    // @param:  String guess -- ユーザーからの攻撃。 2 とか、3とか。
    checkYourself(guess) {
        let result = '失敗';

        let newCells = this.locationCells.filter(x => x !== guess);
        if (newCells.length < this.locationCells.length) {
            result = '命中';
            this.numOfHits++;
        }
        if (newCells.length === 0) {
            result = '撃沈';
        }
        this.locationCells = newCells;
        
        console.log(result);
        console.log(this.locationCells);
    }
}

const dotCom = new DotCom;
dotCom.setLocationCells(['2', '3', '4']);
console.log(dotCom.locationCells);

dotCom.checkYourself('6');
dotCom.checkYourself('3');
dotCom.checkYourself('5');
dotCom.checkYourself('2');
dotCom.checkYourself('4');

