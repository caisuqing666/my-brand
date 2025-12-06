"use client";

type PostCardProps = {
  id: number;
  title: string;
  body: string;
};

export default function PostCard({ id, title, body }: PostCardProps) {
  return (
    <li
      style={{
        marginBottom: "16px",
        padding: "12px 16px",
        border: "1px solid #ddd",
        borderRadius: "8px",
      }}
    >
      <h2 style={{ margin: "0 0 8px" }}>
        {id}. {title}
      </h2>
      <p style={{ margin: 0 }}>{body}</p>
    </li>
  );
}
