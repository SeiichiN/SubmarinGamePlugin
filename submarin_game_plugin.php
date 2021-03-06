<?php
/*
 * @wordpress-plugin
 * Plugin Name: Submarin Game Plugin
 * Description: This is Submarin Game. Short Code is "insert_submarin".
 * Version: 1.0
 * Author: Seiichi Nukayama
 */


function add_files() {
	wp_enqueue_script('submarinGame_js', plugins_url('submarinGame.js', __FILE__), array(), '1.0', true);
	wp_enqueue_style('css-submarin', plugins_url('submarin.css', __FILE__));
//	wp_register_style('css-submarin', plugins_url('submarin.css', __FILE__));
//    wp_enqueue_style('css-submarin');
}
add_action('wp_enqueue_scripts', 'add_files');

function play() {

    ob_start();
?>
    <div class="row">
        <div class="col-md-8">
            <div id="submarin-game">
                <header>
                    <h1>潜水艦ゲーム</h1>
                </header>
                <article>
                    <button id="howto-btn">あそびかた</button>
                    <aside class="des" id="des-howto-play">
                        <header class="clearfix">
                            <h1>あそびかた</h1>
                        </header>
			            <p>この海域には、敵潜水艦が3隻潜んでいます。<br>
				            潜水艦は、1隻で3つのセルを占有しています。<br>
				            あなたに課せられた任務は、敵潜水艦を全隻撃沈することです。<br>
				            49個の各セルをマウス（指）でクリックすることで、敵潜水艦を攻撃できます。
				            もし、20回以下の攻撃で任務を完了することができれば、優秀といえます。<br>
				            さあ、頑張ってください。</p>
		            </aside>
                    <table>
                        <tr>
                            <th></th>
                            <th>A</th>
                            <th>B</th>
                            <th>C</th>
                            <th>D</th>
                            <th>E</th>
                            <th>F</th>
                            <th>G</th>
                        </tr>
                        <?php for ($i = 1; $i <= 7; $i++) { ?>
                            <tr>
                                <th><?php echo $i; ?></th>
                                <?php for ($j = 1; $j <= 7; $j++) {  ?>
                                    <?php $idx = mb_substr("ABCDEFG", ($j-1), 1) . (String)$i; ?>
                                    <td class="select" id="<?php echo $idx; ?>"
                                        onclick="selection('<?php echo $idx; ?>')">.</td>
                                <?php } ?>
                            </tr>
                        <?php } ?>

                    </table>
                    <section class="score">
                        <p id="kekka"></p>
                        <div id="mes1"></div>
                        <div id="mes2"></div>
                        <button id="replay">REPLAY</button>
                    </section>
                </article>
            </div><!-- #submarin-game -->
        </div><!-- col-md-8 -->
    </div><!-- .row -->
    <?php
    return ob_get_clean();
    }
add_shortcode('insert_submarin', 'play');
