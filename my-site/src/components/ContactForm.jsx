"use client";

import { useState } from "react";

// Thay FORM_ENDPOINT bằng endpoint thật từ Formspree hoặc Getform
// (xem mục 7 - Tech stack, mục 9 - Giới hạn: static site không tự xử lý submit)
const FORM_ENDPOINT = "https://formspree.io/f/REPLACE_ME";

export default function ContactForm() {
  const [status, setStatus] = useState("idle");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("sending");

    const formData = new FormData(e.target);

    try {
      const res = await fetch(FORM_ENDPOINT, {
        method: "POST",
        body: formData,
        headers: { Accept: "application/json" },
      });
      setStatus(res.ok ? "success" : "error");
      if (res.ok) e.target.reset();
    } catch {
      setStatus("error");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <input name="name" placeholder="Tên" required className="border p-2 w-full rounded" />
      <input name="email" type="email" placeholder="Email" required className="border p-2 w-full rounded" />
      <textarea name="message" placeholder="Nội dung" required rows={4} className="border p-2 w-full rounded" />
      <button
        type="submit"
        disabled={status === "sending"}
        className="bg-gray-900 text-white px-4 py-2 rounded disabled:opacity-50"
      >
        {status === "sending" ? "Đang gửi..." : "Gửi"}
      </button>
      {status === "success" && <p className="text-green-600">Đã gửi thành công!</p>}
      {status === "error" && <p className="text-red-600">Có lỗi xảy ra, thử lại sau.</p>}
    </form>
  );
}
