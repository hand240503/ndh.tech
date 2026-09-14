// Nội dung HTML này đến từ remark/rehype xử lý file Markdown do chính
// tác giả kiểm soát qua Git — không phải input người dùng ngoài — nên
// dùng dangerouslySetInnerHTML ở đây an toàn (xem mục 8 - Bảo mật).
export default function BlogContent({ html }) {
  return (
    <article
      className="prose max-w-none"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
