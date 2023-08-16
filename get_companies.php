<?php
// 数据库连接信息
$servername = "127.0.0.1";
$username = "root";
$password = "Ab123456";
$dbname = "company_database";

// 创建连接
$conn = new mysqli($servername, $username, $password, $dbname);

// 检查连接是否成功
if ($conn->connect_error) {
    die("数据库连接失败：" . $conn->connect_error);
}

// 查询数据库中的企业信息
$sql = "SELECT * FROM company_info";
$result = $conn->query($sql);

// 将查询结果转换为关联数组
$companies = array();
if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $companies[] = $row;
    }
}

// 关闭数据库连接
$conn->close();

// 将查询结果以 JSON 格式返回给前端
header('Content-Type: application/json');
echo json_encode($companies);



// ...
$page = isset($_GET['page']) ? intval($_GET['page']) : 1;
$limit = isset($_GET['limit']) ? intval($_GET['limit']) : 10;

// 计算偏移量
$offset = ($page - 1) * $limit;

// 查询总条数
$totalQuery = "SELECT COUNT(*) as total FROM company_info";
$totalResult = $conn->query($totalQuery);
$totalItems = $totalResult->fetch_assoc()['total'];

// 查询分页数据
$query = "SELECT * FROM company_info LIMIT $offset, $limit";
$result = $conn->query($query);

// ...
$companies = array();
while ($row = $result->fetch_assoc()) {
    $companies[] = $row;
}

$response = array('totalItems' => $totalItems, 'companies' => $companies);
header('Content-Type: application/json'); // 设置正确的响应头
echo json_encode($response, JSON_UNESCAPED_UNICODE); // 使用 JSON_UNESCAPED_UNICODE 保留 Unicode 字符
// ...



?>


