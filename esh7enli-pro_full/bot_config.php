<?php
// bot_config.php - ضع هذا الملف على استضافة PHP خاصة بك وليس على GitHub Pages
$botToken = "REPLACE_WITH_YOUR_TOKEN";
$chatId = "REPLACE_WITH_YOUR_CHAT_ID";

function sendTelegramMessage($message) {
    global $botToken, $chatId;
    $url = "https://api.telegram.org/bot$botToken/sendMessage";
    $data = ['chat_id'=>$chatId,'text'=>$message];
    $options = ['http'=>['header'=>"Content-Type:application/x-www-form-urlencoded\r\n",'method'=>'POST','content'=>http_build_query($data)]];
    $context = stream_context_create($options);
    @file_get_contents($url,false,$context);
}
?>
