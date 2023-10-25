Step 1: Mở index.html
Step 2: Nhập dữ liệu ExamRoom và ExamSlot mới nhất
Step 3: Import file Excel bên trong, đổi giá trị các cột ExamRoomID thành ExamRoomID vừa mới tạo để tránh bị conflict dữ liệu.
Step 4: Submit, sau đó check Database với ExamSlot mới nhất, quantity đã cập nhật

Chú ý: Nếu cột ExamSlot có quantity = 5, có nghĩa là Student Import chưa đủ nhiều.
Dẫn đến công thức tính quantity không hợp lý.
(TotalStudent / capacity) + subExaminer
Ví dụ: TotalStudent trong một Slot chỉ có 5, capacity = 25, subExaminer = 5
=> (5 / 25) + 5 = 5