# Hướng dẫn sử dụng .env trong Vite

## Tổng quan
Cách tốt nhất để quản lý biến môi trường trong Vite là sử dụng hệ thống `.env` tích hợp sẵn và `import.meta.env`.

## Các bước đã thực hiện
1.  **Tạo file `.env`**: Chứa các biến môi trường "bí mật" cho môi trường local (đã được thêm vào `.gitignore`).
2.  **Tạo file `.env.example`**: Chứa các key mẫu để developers khác biết cần cấu hình gì.
3.  **Cập nhật `vite-env.d.ts`**: Thêm TypeScript definition để có gợi ý code (IntelliSense) khi gõ `import.meta.env.`.

## Cách sử dụng
Để sử dụng biến môi trường trong code:

```ts
console.log(import.meta.env.VITE_API_URL);
```

**Lưu ý quan trọng**:
- Các biến muốn lộ ra cho Client-side bắt buộc phải bắt đầu bằng **`VITE_`** (VD: `VITE_API_URL`).
- Các biến không bắt đầu bằng `VITE_` sẽ chỉ truy cập được ở server-side (trong `vite.config.ts`).

## Tại sao cách này tối ưu nhất?
| Phương pháp | Ưu điểm | Nhược điểm | Đánh giá |
| :--- | :--- | :--- | :--- |
| **Vite Native (.env)** | Cấu hình sẵn, hỗ trợ TS, an toàn (chỉ lộ `VITE_`), tách biệt dev/prod | Cần prefix `VITE_` | **Khuyên dùng** ✅ |
| **DefinePlugin** | Linh hoạt tên biến | Cấu hình phức tạp hơn, khó type | Không cần thiết |
| **dotenv (npm)** | Quen thuộc với Node.js | Không chạy native trên browser, cần polyfill | Lỗi thời cho Frontend |

## Kiểm tra
Bạn có thể thử log giá trị ra console trong `src/App.tsx` để kiểm tra:
```tsx
useEffect(() => {
  console.log("Current API URL:", import.meta.env.VITE_API_URL);
}, []);
```
