function openUploadModal(mode) {
    const modal = document.getElementById("uploadModal");
    modal.style.display = "block";
    // 存储上传模式，以供后续使用
    modal.dataset.uploadMode = mode;
}

function closeUploadModal() {
    const modal = document.getElementById("uploadModal");
    modal.style.display = "none";
}

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
                    // ...
                } else if (mode === "search") {
                    // 处理搜索企业逻辑
                    // ...
                }
                displayCompanies();
                closeUploadModal();
            } else {
                console.error("Error uploading file:", data.message);
            }
        })
        .catch(error => {
            console.error("Error uploading file:", error);
        });
    }
}
