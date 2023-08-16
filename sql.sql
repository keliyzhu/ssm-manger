-- ���������ݿ�
CREATE DATABASE company_database;

-- ʹ���´��������ݿ�
USE company_database;

-- ������ҵ��Ϣ��
CREATE TABLE company_info (
    id INT AUTO_INCREMENT PRIMARY KEY,
    company_name VARCHAR(255) NOT NULL,
    responsible_person VARCHAR(255),
    establishment_date DATE,
    province VARCHAR(50),
    city VARCHAR(50),
    district VARCHAR(50),
    contact_phone VARCHAR(20)
);

-- �����������
INSERT INTO company_info (company_name, responsible_person, establishment_date, province, city, district, contact_phone)
VALUES
    ('ABC Company', 'John Doe', '2022-01-15', 'Example Province', 'Example City', 'Example District', '123-456-7890'),
    ('XYZ Corporation', 'Jane Smith', '2020-06-30', 'Another Province', 'Another City', 'Another District', '987-654-3210'),
    ('123 Industries', 'Michael Johnson', '2021-11-22', 'Yet Another Province', 'Yet Another City', 'Yet Another District', '555-123-4567');
