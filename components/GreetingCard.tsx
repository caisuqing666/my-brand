type GreetingCardProps = {
  name: string;
  message?: string;
  highlight?: boolean; // 新增：是否高亮
};

export default function GreetingCard({
  name,
  message = "你好，这是默认内容",
  highlight = false, // 默认不高亮
}: GreetingCardProps) {
  const cardStyle = {
    border: "1px solid #ccc",
    borderRadius: "8px",
    padding: "16px",
    marginBottom: "12px",
    backgroundColor: highlight ? "#fffbe6" : "#ffffff", // 高亮时变浅黄色
  };

  return (
    <div style={cardStyle}>
      <h2>
        你好，{name}{" "}
        {highlight && <span style={{ fontSize: "14px" }}>⭐ 重点关注</span>}
      </h2>
      <p>{message}</p>
    </div>
  );
}
