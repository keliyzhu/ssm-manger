<?php
// 获取上传模式（add 或 search）
$mode = $_POST["mode"];

if ($mode === "add") {
    // 处理添加企业逻辑
    // ...
} elseif ($mode === "search") {
    // 处理搜索企业逻辑
    // ...
}

// 返回成功或错误信息
$response = array("success" => true, "message" => "File uploaded successfully.");
echo json_encode($response);
?>
