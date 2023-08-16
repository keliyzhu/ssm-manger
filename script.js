// 打开上传模态框
function openUploadModal(mode) {
    const modal = document.getElementById("uploadModal");
    modal.style.display = "block";
    modal.dataset.uploadMode = mode;
}

// 关闭上传模态框
function closeUploadModal() {
    const modal = document.getElementById("uploadModal");
    modal.style.display = "none";
}

// 处理文件上传
function uploadFile() {
    const modal = document.getElementById("uploadModal");
    const mode = modal.dataset.uploadMode;
    const fileInput = document.getElementById("excelFile");
    const file = fileInput.files[0];

    if (file) {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("mode", mode);

        fetch("upload.php", {
            method: "POST",
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                if (mode === "add") {
                    // 处理添加企业逻辑
                    addCompaniesFromFile();
                } else if (mode === "search") {
                    // 处理搜索企业逻辑
                    searchCompaniesFromFile();
                }
                displayCompanies(); // 刷新企业列表
                closeUploadModal(); // 关闭模态框
            } else {
                console.error("Error uploading file:", data.message);
            }
        })
        .catch(error => {
            console.error("Error uploading file:", error);
        });
    }
}

// 从上传的文件中添加企业
function addCompaniesFromFile() {
    // 在这里添加逻辑来解析 Excel 文件并将数据插入数据库
    // ...
}

// 从上传的文件中搜索企业
function searchCompaniesFromFile() {
    // 在这里添加逻辑来解析 Excel 文件并进行数据库查询
    // ...
}

// 显示所有企业信息
// 显示所有企业信息
function displayCompanies() {
    const tableBody = document.getElementById("companyList");
    tableBody.innerHTML = "";

    // 发送异步请求到后端获取数据
    fetch("get_companies.php")
        .then(response => response.json())
        .then(data => {
            data.forEach(company => {
                const row = document.createElement("tr");
                row.innerHTML = `
                    <td>${company.company_name}</td>
                    <td>${company.responsible_person}</td>
                    <td>${company.establishment_date}</td>
                    <td>${company.province}</td>
                    <td>${company.city}</td>
                    <td>${company.district}</td>
                    <td>${company.contact_phone}</td>
                    <td>
                        <button onclick="deleteCompany(${company.id})">删除</button>
                    </td>
                `;
                tableBody.appendChild(row);
            });
        })
        .catch(error => {
            console.error("Error fetching companies:", error);
        });
}

// ...



// 删除企业信息
function deleteCompany(id) {
    if (confirm("确认要删除该企业吗？")) {
        // 发送异步请求到后端删除数据
        fetch(`delete_company.php?id=${id}`, {
            method: "DELETE"
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                displayCompanies(); // 更新企业列表
            } else {
                console.error("Error deleting company:", data.message);
            }
        })
        .catch(error => {
            console.error("Error deleting company:", error);
        });
    }
}



// 页面加载时显示所有企业信息
window.onload = function() {
    displayCompanies();
};



let currentPage = 1;
let itemsPerPage = 10;
let totalItems = 0;

function updatePagination() {
    itemsPerPage = parseInt(document.getElementById("itemsPerPage").value);
    currentPage = 1;
    displayCompanies();
}

function previousPage() {
    if (currentPage > 1) {
        currentPage--;
        displayCompanies();
    }
}

function nextPage() {
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    if (currentPage < totalPages) {
        currentPage++;
        displayCompanies();
    }
}

function displayCompanies() {
    const tableBody = document.getElementById("companyList");
    tableBody.innerHTML = "";

    fetch(`get_companies.php?page=${currentPage}&limit=${itemsPerPage}`)
        .then(response => response.json())
        .then(data => {
            totalItems = data.totalItems;
            document.getElementById("totalItems").textContent = `总条数：${totalItems}`;

            data.companies.forEach(company => {
                // ...
            });

            const totalPages = Math.ceil(totalItems / itemsPerPage);
            const pagination = document.getElementById("pagination");
            pagination.style.display = totalPages > 1 ? "block" : "none";
        })
        .catch(error => {
            console.error("Error fetching companies:", error);
        });
}
