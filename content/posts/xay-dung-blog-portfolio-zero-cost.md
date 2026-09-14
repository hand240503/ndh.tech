---
title: "Xây dựng Blog & Portfolio cá nhân: Kiến trúc tĩnh Zero-Cost từ Git đến CDN"
date: "2026-09-14"
tags: ["Architecture", "Next.js", "SSG", "Decap CMS", "GitHub Pages", "CI/CD"]
excerpt: "Phân tích chi tiết kiến trúc hệ thống Blog & Portfolio tĩnh chi phí 0đ: từ luồng dữ liệu Git-based, AST Markdown pipeline, xác thực PKCE đến tự động hóa CI/CD."
coverImage: ""
---

Khi xây dựng một trang web cá nhân hay blog kỹ thuật, bài toán thường gặp là: Làm sao để có một hệ sinh thái vừa **hiện đại, tải nhanh, viết bài tiện lợi**, vừa **hoàn toàn làm chủ dữ liệu**, nhưng **chi phí vận hành hàng tháng bằng 0 đồng**?

Bài viết này ghi lại toàn bộ quá trình thiết kế, kiến trúc kỹ thuật và cách triển khai hệ thống Blog & Portfolio đang chạy trên chính website này.

---

## 1. Công nghệ sử dụng (Sơ lược)

Hệ thống được chọn lọc kỹ càng theo tiêu chí: gọn nhẹ, tiêu chuẩn mở, bảo trì thấp và miễn phí trọn đời:

* **Next.js 16 (App Router)**: Framework cốt lõi, chạy ở chế độ tĩnh hoàn toàn (`output: 'export'`).
* **Tailwind CSS + Typography**: Thiết kế giao diện theo mô hình utility-first, sử dụng plugin `@tailwindcss/typography` (`.prose`) để tự động định dạng bài viết.
* **Unified / Remark / Rehype + Highlight.js**: Bộ công cụ AST phân tích Markdown thành HTML và tô màu cú pháp code block (theme GitHub Dark).
* **Decap CMS + DecapBridge (PKCE)**: Giao diện quản trị nội dung trực quan chạy ngay trên trình duyệt, lưu commit trực tiếp vào Git.
* **GitHub Actions & GitHub Pages**: Đường ống CI/CD tự động hóa việc build và mạng lưới máy chủ CDN phục vụ trang tĩnh toàn cầu.

---

## 2. Kiến trúc hệ thống (Phân tích kỹ càng)

Triết lý nền tảng của toàn bộ hệ thống là: **"Mọi thứ bắt đầu và kết thúc ở Git"** (*Git as the Single Source of Truth*). Không có cơ sở dữ liệu (Database), không có máy chủ ứng dụng chạy ngầm (No Server Runtime).

### 2.1. Luồng dữ liệu một chiều (Unidirectional Data Flow)

Hệ thống vận hành theo một chu trình khép kín, một chiều, không phát sinh bất kỳ trạng thái động (state) nào ở phía máy chủ:

```
[Tác giả] 
   │
   ├─► Viết bài qua Decap CMS (/admin) hoặc chỉnh sửa file .md cục bộ
   │
   ▼
[GitHub Repository] (Lưu trữ mã nguồn + thư mục content/)
   │
   ├─► Push trigger kích hoạt Webhook
   │
   ▼
[GitHub Actions CI/CD] 
   │
   ├─► npm ci
   ├─► next build (SSG prerender: quét content/ -> biên dịch ra HTML/CSS/JS tĩnh)
   │
   ▼
[Thư mục tĩnh ./out] 
   │
   ├─► actions/deploy-pages
   │
   ▼
[GitHub Pages CDN] ────► [Độc giả truy cập] (Tải file tĩnh, TTFB siêu tốc)
```

Tất cả các thay đổi về nội dung đều được biểu diễn dưới dạng các **Git Commit**. Điều này mang lại những ưu điểm vượt trội:
1. **Lịch sử phiên bản tuyệt đối**: Mọi bài viết đều có commit log rõ ràng, có thể rollback về bất kỳ thời điểm nào.
2. **Sao lưu phân tán (Distributed Backup)**: Chỉ cần lệnh `git clone`, toàn bộ bài viết, dự án và mã nguồn được tải về máy cá nhân nguyên vẹn.

---

### 2.2. Content Model & Tầng truy xuất dữ liệu (Data Access Layer)

Nội dung không nằm trong bảng cơ sở dữ liệu mà được phân bổ vào các tệp Markdown phẳng có cấu trúc:

* `content/posts/*.md`: Chứa các bài viết blog kèm metadata (tiêu đề, ngày đăng, tags, mô tả tóm tắt).
* `content/projects/*.md`: Chứa các case-study dự án portfolio kèm tech stack, vai trò, đường link live demo/repo.

Tại tầng logic dữ liệu (`src/lib/posts.js` và `src/lib/projects.js`), thư viện `gray-matter` được sử dụng để bóc tách **Frontmatter** (phần header YAML) ra khỏi phần nội dung Markdown:

```javascript
// Đọc nội dung file Markdown và bóc tách metadata
const fileContents = fs.readFileSync(fullPath, "utf8");
const { data, content } = matter(fileContents);
```

---

### 2.3. Pipeline biến đổi Markdown thông qua AST (Abstract Syntax Tree)

Thay vì dùng Regex hoặc các bộ chuyển đổi thô sơ dễ dính lỗi bảo mật XSS, dự án sử dụng hệ sinh thái **Unified**:

```
Markdown thô (String)
   │
   ▼ [remark-parse]
Markdown AST (mdast)
   │
   ▼ [remark-rehype]
HTML AST (hast)
   │
   ▼ [rehype-highlight]  <-- Phân tích cú pháp code và gắn class hljs-*
Tokenized HTML AST
   │
   ▼ [rehype-stringify]
HTML String an toàn hoàn chỉnh
```

Toàn bộ quá trình parse cú pháp và tô màu code diễn ra **ngay tại thời điểm build (Build-time)**, độc giả khi truy cập sẽ nhận ngay HTML đã được tô màu sẵn mà không cần trình duyệt phải chạy thư viện JavaScript nặng nề để highlight lại.

---

### 2.4. Static Site Generation (SSG) với Next.js 16 App Router

Trang sử dụng định tuyến động của Next.js `[slug]` kết hợp hàm `generateStaticParams()`:

```javascript
// Next.js sẽ gọi hàm này lúc build để duyệt toàn bộ file markdown
export function generateStaticParams() {
  return getAllPostSlugs();
}

// Render sẵn từng trang bài viết thành file HTML vật lý
export default async function BlogPostPage({ params }) {
  const { slug } = await params; // Cú pháp Promise của Next.js 16
  const post = await getPostBySlug(slug);
  return <BlogContent html={post.contentHtml} />;
}
```

Khi chạy `next build`, Next.js sẽ sinh ra cấu trúc cây thư mục tĩnh tương ứng trong `./out`:
* `out/index.html`
* `out/blog/index.html`
* `out/blog/hello-world/index.html`
* `out/projects/index.html`
* `out/projects/sample-project/index.html`

Đồng thời, cấu hình `basePath: isProd ? "/ndh.tech" : ""` giúp website tương thích tự động: khi chạy local là gốc `/`, khi đẩy lên GitHub Pages sẽ tự khớp với subpath `/ndh.tech/` mà không bị lỗi 404 tài nguyên CSS/JS.

---

### 2.5. Cơ chế xác thực PKCE với DecapBridge cho CMS trên nền tảng tĩnh

Một thách thức lớn của CMS nền tảng tĩnh trên GitHub Pages là: **GitHub OAuth bắt buộc phải có máy chủ bí mật (Client Secret) để trao đổi Access Token**, trong khi GitHub Pages chỉ là hosting tĩnh.

Hệ thống giải quyết triệt để vấn đề này bằng việc ứng dụng chuẩn **OAuth 2.0 PKCE (Proof Key for Code Exchange)** thông qua dịch vụ trung gian **DecapBridge**:
1. Khi bấm **Login**, Decap CMS sinh ra một cặp khóa mật mã ngẫu nhiên (`code_verifier` và `code_challenge`).
2. Trình duyệt gửi `code_challenge` sang GitHub.
3. Sau khi người dùng đồng ý, GitHub trả về authorization code.
4. Trình duyệt gửi lại `code` cùng `code_verifier` nguyên bản cho Git Gateway để đối chiếu và cấp quyền ghi vào repository.

Nhờ đó, tác giả có thể mở trình duyệt trên điện thoại hoặc bất kỳ máy tính nào, truy cập `/admin/`, đăng nhập 1 chạm qua tài khoản GitHub và viết bài mà không cần phải cài đặt bất kỳ server backend nào.

---

### 2.6. Mô hình bảo mật & Hiệu năng Zero-Cold-Start

* **Bảo mật tuyệt đối**: Vì không có cơ sở dữ liệu hay runtime backend, kẻ tấn công không thể thực hiện SQL Injection, RCE (Remote Code Execution) hay tấn công vào các endpoint quản trị.
* **Thời gian đáp ứng siêu nhanh (0ms Cold Start)**: Các trang được CDN của GitHub Pages phân phối trực tiếp từ bộ nhớ đệm tại rìa mạng (Edge Cache), đạt điểm số Google Lighthouse gần như tối đa.

---

## 3. Cách triển khai (Sơ lược)

Quy trình triển khai hệ sinh thái này gồm 4 bước chính:

1. **Khởi tạo mã nguồn**: Dựng dự án Next.js App Router, cấu hình file `next.config.js` với cờ `output: "export"`.
2. **Cấu hình CMS**: Tạo file `public/admin/index.html` (nhúng thư viện Decap CMS) và `public/admin/config.yml` (khai báo các collection bài viết, dự án).
3. **Tích hợp DecapBridge**: Đăng ký trang web tại DecapBridge để lấy endpoint PKCE gắn vào `config.yml`.
4. **Tự động hóa CI/CD**: Viết file `.github/workflows/deploy.yml` để mỗi khi có commit mới vào nhánh `main`, GitHub Actions sẽ tự động cài thư viện, build Next.js và đẩy thư mục `./out` lên GitHub Pages.

---

## 4. Lời kết

Kiến trúc tĩnh kết hợp Git-based CMS là minh chứng rõ ràng cho việc: **Không cần hạ tầng phức tạp hay chi phí hàng tháng, ta vẫn có thể xây dựng một hệ thống xuất bản nội dung chuyên nghiệp, tốc độ cao và bền vững theo thời gian.**
