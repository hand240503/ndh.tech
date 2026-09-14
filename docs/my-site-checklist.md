# ✅ Checklist: my-site (Blog & Portfolio, Static Zero-Cost)

## 1. Tài khoản & dịch vụ (free tier)

- [ ] GitHub — tài khoản + repo mới `my-site` (public, để CI/CD free)
- [ ] GitHub Pages — bật trong Settings > Pages (sau khi đã có workflow)
- [ ] PostHog — đăng ký free tier, lấy API key cho tracking script
- [ ] Uptime Robot — đăng ký, cấu hình monitor sau khi site live
- [ ] Formspree hoặc Getform — đăng ký, lấy endpoint cho form liên hệ
- [ ] Domain riêng (tùy chọn) — nếu muốn dùng thay cho `*.github.io`

## 2. Công cụ trên máy local

- [ ] Node.js 20 (khớp `node-version: "20"` trong workflow) + npm
- [ ] Git đã cấu hình (SSH key hoặc token để push)
- [ ] Editor code (VS Code hoặc tương đương)

## 3. Kiến thức/kỹ năng cần nắm trước khi code

- [ ] Next.js với `output: 'export'` (SSG thuần, không server components cần runtime)
- [ ] `generateStaticParams()` cho dynamic routes
- [ ] Parse frontmatter Markdown bằng `gray-matter`
- [ ] Cấu hình collection trong Decap CMS (`admin/config.yml`)
- [ ] Cơ bản GitHub Actions YAML

## 4. Việc cần làm đầu tiên (Giai đoạn 1 — Nền tảng)

- [ ] `npx create-next-app` → cấu hình `next.config.js` với `output: 'export'`
- [ ] Cài dependency: `gray-matter`, `remark`, `rehype-highlight`, `tailwindcss`
- [ ] Viết `src/lib/posts.js` và `src/lib/projects.js` để đọc file `.md` từ `content/`
- [ ] Tạo 1 bài blog mẫu + 1 project mẫu để test route `[slug]`

## 5. Giai đoạn 2 — Content Management

- [ ] Cài Decap CMS tại `/admin`, cấu hình 2 collection (posts, projects) trong `config.yml`
- [ ] Thiết lập GitHub OAuth cho Decap

## 6. Giai đoạn 3 — CI/CD

- [ ] Viết `.github/workflows/deploy.yml`
- [ ] Kiểm tra GitHub Actions build & deploy thành công
- [ ] Bật GitHub Pages, trỏ custom domain (nếu có)

## 7. Giai đoạn 4 — Vận hành

- [ ] Tích hợp PostHog script + GitHub Action pull thống kê hàng tuần
- [ ] Đăng ký Uptime Robot, thiết lập public status page
- [ ] Gắn form liên hệ qua Formspree/Getform

## 8. Giai đoạn 5 — Hoàn thiện

- [ ] Tối ưu ảnh, SEO metadata (`<meta>`, `sitemap.xml`, `robots.txt`)
- [ ] Viết bài blog đầu tiên ghi lại quá trình xây dựng hệ thống
