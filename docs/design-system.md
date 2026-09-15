# Design System — Network & DevOps Learning Journal

Tài liệu này là nguồn tham chiếu duy nhất (single source of truth) khi xây bất kỳ trang nào của site: Trang chủ, Lộ trình, Nhật ký, Dự án, Liên hệ. Mọi trang mới đều phải dùng lại đúng token và quy tắc bên dưới để giữ tính nhất quán.

---

## 1. Ý tưởng thiết kế cốt lõi

- **Ẩn dụ:** cả site được xây trên hình ảnh một phiên làm việc terminal/network — mỗi trang là một "lệnh" khác nhau đang chạy (`traceroute`, `whoami`, `git log`, `docker ps`...).
- **Lộ trình học = một chuỗi tuần tự thật sự** (networking → CCNA → Linux → Docker → Kubernetes → Terraform/CI-CD), nên việc đánh số thứ tự (hop 1, 2, 3...) là hợp lý, không phải trang trí.
- **Không** dùng: nền kem ấm + serif + cam đất; thẻ bo tròn giống nhau xếp lưới kiểu SaaS; nhãn ALL-CAPS; chuỗi mô tả nối bằng dấu chấm giữa (·); nút có mũi tên `→`.
- Site có **2 theme**: sáng và tối, dùng chung một bộ token (chỉ đổi giá trị màu), để có thể làm nút chuyển đổi theme sau này.

---

## 2. Màu sắc (design tokens)

Dùng CSS custom properties, đặt ở `:root`. Không hard-code hex trực tiếp trong component.

| Token | Dark theme | Light theme | Vai trò |
|---|---|---|---|
| `--bg` | `#0B1220` | `#F5F7FA` | Nền chính |
| `--panel` | `#121B2E` | `#FFFFFF` | Nền terminal/panel |
| `--panel-2` | `#0E1626` | `#F0F3F8` | Nền phụ (badge, stat, nav dropdown) |
| `--border` | `#223047` | `#D9E1EC` | Viền hairline |
| `--text` | `#E7ECF3` | `#101826` | Chữ chính |
| `--muted` | `#7C8AA0` | `#5B6B84` | Chữ phụ, label, placeholder |
| `--teal` | `#4FD1C5` | `#0E9488` | Accent trạng thái "OK / hoàn thành / online" |
| `--amber` | `#F0A93B` | `#B4650F` | Accent trạng thái "đang học / in progress" |

**Quy tắc dùng màu:**
- `--teal` chỉ dùng cho: trạng thái hoàn thành, CTA chính, con trỏ nhấp nháy, link đang active.
- `--amber` chỉ dùng cho: trạng thái đang học/đang làm, cảnh báo nhẹ. Không dùng làm màu trang trí ngẫu nhiên.
- Trạng thái "chưa bắt đầu / queued" luôn dùng `--muted`, không bịa thêm màu thứ ba.
- Light theme cần thêm shadow rất nhẹ cho panel (`0 1px 2px rgba(16,24,38,.05)`) vì không đủ tương phản nếu chỉ dựa viền.

---

## 3. Typography

| Vai trò | Font | Weight | Cỡ chữ | Line-height |
|---|---|---|---|---|
| Headline lớn (H1, tên) | Space Grotesk | 700 | `clamp(34px, 5.6vw, 52px)` | 1.12 |
| Tiêu đề section (H2) | Space Grotesk | 600 | 22px | 1.2 |
| Tiêu đề nhỏ (H3, tên hop/bài viết) | Space Grotesk | 600 | 17px | 1.3 |
| Body / terminal text | IBM Plex Mono | 400–500 | 15px | 1.6 |
| Label / caption / status | IBM Plex Mono | 500–600 | 11.5–13px | 1.4 |

**Import:**
```html
<link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=IBM+Plex+Mono:wght@400;500;600&display=swap" rel="stylesheet">
```

**Quy tắc:** Space Grotesk chỉ dùng cho tiêu đề (H1/H2/H3) và số liệu lớn (stat number). Mọi thứ còn lại — kể cả nút bấm — dùng IBM Plex Mono. Không thêm font thứ ba.

---

## 4. Spacing & bo góc

- Thang spacing (px): `4 · 8 · 12 · 16 · 24 · 32 · 48 · 64 · 80`
- Bo góc nhỏ (badge, button, status pill): `4px`
- Bo góc panel/card lớn: `6px`
- Độ rộng nội dung tối đa: `--max-w: 920px`, căn giữa bằng `.wrap`
- Padding ngang mặc định của `.wrap`: `24px`

---

## 5. Component chuẩn

### Nút (Button)
- Primary: nền `--teal`, chữ đậm tương phản cao (`#06201C` trên dark, trắng/navy đậm trên light), không có mũi tên, hover nâng nhẹ `translateY(-1px)`.
- Secondary: viền `--border`, nền trong suốt, hover đổi viền sang `--teal`.
- Font: IBM Plex Mono 13.5px.

### Badge / tag
- Viền `--border`, nền `--panel-2`, chữ `--muted`.
- Trạng thái "active" (VD: "CCNA — đang ôn"): chữ + viền `--amber`.

### Status pill (dùng trong bảng traceroute, danh sách bài học...)
- `OK`: viền + chữ `--teal`, nền `rgba(teal, 0.08)`.
- `LEARNING`: viền + chữ `--amber`, nền `rgba(amber, 0.08)`, có chấm tròn nhấp nháy phía trước.
- `QUEUED`: viền `--border`, chữ `--muted`, không nền.

### Panel/terminal window
- Header giả lập terminal: 3 chấm tròn bên trái + tên "lệnh" đang chạy.
- Nội dung chia hàng bằng viền dưới mờ (`rgba(border, 0.5)`), không dùng shadow nặng.

### Stat block
- Viền trên dày 3px theo màu trạng thái tương ứng (teal/amber/muted).
- Số lớn dùng Space Grotesk 700, 30px; label dùng Mono 12.5px màu `--muted`.

---

## 6. Layout & breakpoint

- Desktop: layout 1 cột nội dung, max-width 920px, căn trái (không center) — giữ cảm giác "đọc log/terminal".
- Breakpoint mobile: `680px`.
  - Ẩn nav ngang (chuyển sang menu gọn nếu cần).
  - Bảng traceroute ẩn cột "số ngày", chỉ còn số thứ tự / tên chặng / trạng thái.
  - Stat strip chuyển từ 3 cột sang 1 cột, viền trên thay bằng viền trên riêng từng ô.

---

## 7. Chuyển động & khả năng tiếp cận

- Chỉ 2 hiệu ứng chuyển động toàn site: con trỏ nhấp nháy sau tên ở hero, chấm nhấp nháy ở badge "LEARNING". Không thêm hiệu ứng fade/slide cho từng section.
- Bắt buộc tôn trọng `prefers-reduced-motion: reduce` — tắt animation khi user bật.
- `:focus-visible` luôn có viền `--teal` 2px, offset 3px — không bao giờ xoá outline khi focus bằng bàn phím.
- Tương phản màu chữ/nền phải đạt tối thiểu AA (đã kiểm tra với bộ token ở mục 2).

---

## 8. Giọng văn nội dung (content voice)

- Ngôn ngữ: tiếng Việt, giọng trực tiếp, giống ghi chú kỹ thuật cá nhân — không quảng cáo bản thân.
- Câu lệnh/tiêu đề dùng động từ hành động, không dùng câu bị động: "Xem lộ trình học", không phải "Lộ trình học có thể được xem tại đây".
- Tên các chặng học viết dạng slug kỹ thuật (`networking-fundamentals`, `ccna-routing-switching`) để giữ nhất quán với ẩn dụ terminal.
- Không thêm nhãn ALL-CAPS trang trí phía trên tiêu đề.

---

## 9. Cấu trúc trang tham chiếu (sitemap)

| Trang | Vai trò | Thành phần chính dùng lại |
|---|---|---|
| Trang chủ | Giới thiệu + tóm tắt lộ trình | Hero, panel traceroute, stat strip |
| Lộ trình | Chi tiết từng chặng học (breakdown) | Panel traceroute mở rộng, status pill |
| Nhật ký | Danh sách bài viết quá trình học | List card dùng token panel + badge ngày |
| Dự án | Các lab/dự án đã làm (home lab, script...) | Card panel, status pill (hoàn thành/đang làm) |
| Liên hệ | Thông tin liên hệ, CV | Panel đơn giản, button primary "Tải CV" |

Mọi trang mới đều tái sử dụng: `.wrap`, `.panel`, `.badge`, `.status`, `.btn`, thang typography và spacing ở trên — không tạo class/màu mới ngoài hệ thống này trừ khi cập nhật lại chính tài liệu này trước.

---

## 10. File tham chiếu kèm theo

- `index.html` — bản demo trang chủ, theme tối (nguồn tham chiếu component gốc)
- `index-light.html` — bản demo trang chủ, theme sáng
