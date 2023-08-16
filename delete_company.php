<?php
// 接收前端传递过来的企业 ID
$companyId = isset($_GET['id']) ? $_GET['id'] : null;

if (!$companyId) {
    // 如果没有传递企业 ID，返回错误信息
    $response = array('success' => false, 'message' => '企业 ID 未提供');
    echo json_encode($response);
} else {
    // 连接数据库
    $servername = "127.0.0.1";
    $username = "root";
    $password = "Ab123456";
    $dbname = "company_database";

    $conn = new mysqli($servername, $username, $password, $dbname);

    if ($conn->connect_error) {
        die("连接数据库失败: " . $conn->connect_error);
    }

    // 执行删除操作
    $sql = "DELETE FROM company_info WHERE id = $companyId";

    if ($conn->query($sql) === TRUE) {
        $response = array('success' => true, 'message' => '删除成功');
    } else {
        $response = array('success' => false, 'message' => '删除失败: ' . $conn->error);
    }

    // 关闭数据库连接
    $conn->close();

    // 返回操作结果给前端
    echo json_encode($response);
}
?>
