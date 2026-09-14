# my-site

Blog & Portfolio tĩnh, zero-cost. Kiến trúc: Next.js (SSG, `output: 'export'`) + Decap CMS + GitHub Actions + GitHub Pages.

## Chạy local

```bash
npm install
npm run dev
```

Mở http://localhost:3000

## Build tĩnh (giống hệt CI sẽ chạy)

```bash
npm run build
```

Output nằm ở thư mục `./out`.

## Việc cần làm tiếp theo

1. Sửa `repo:` trong `admin/config.yml` thành đúng `owner/repo` của bạn.
2. Tạo GitHub OAuth App cho Decap CMS (Settings > Developer settings > OAuth Apps),
   hoặc dùng dịch vụ OAuth provider có sẵn (netlify-cms-github-oauth-provider deploy
   free trên Cloudflare Workers/Vercel).
3. Thay `FORM_ENDPOINT` trong `src/components/ContactForm.jsx` bằng endpoint
   Formspree/Getform thật.
4. Push lên nhánh `master` — GitHub Actions sẽ tự build & deploy.
5. Vào Settings > Pages, chọn Source = "GitHub Actions".
6. Đăng ký Uptime Robot + PostHog theo mục 7, 9 trong tài liệu kiến trúc.
