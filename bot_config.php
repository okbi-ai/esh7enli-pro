<?php
// إعدادات بوت اشحنلي برو
$botToken = "8359307937:AAE6IR2Sow4n-O6h1cNinWFrYLS6NG6-xjo";
$chatId = "1211631424";

// دالة إرسال رسالة إلى تيليجرام
function sendTelegramMessage($message) {
    global $botToken, $chatId;
    $url = "https://api.telegram.org/bot$botToken/sendMessage";
    $data = [
        'chat_id' => $chatId,
        'text' => $message
    ];
    $options = [
        'http' => [
            'header' => "Content-Type:application/x-www-form-urlencoded\r\n",
            'method' => 'POST',
            'content' => http_build_query($data)
        ]
    ];
    $context = stream_context_create($options);
    file_get_contents($url, false, $context);
}

// مثال: إشعار عند تشغيل الموقع
sendTelegramMessage("✅ تم تفعيل موقع اشحنلي برو بنجاح!");
?>
