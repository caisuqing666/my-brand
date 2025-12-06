type MoodPreviewProps = {
    mood: string;
  };
  
  export function MoodPreview({ mood }: MoodPreviewProps) {
    return (
      <p style={{ marginTop: 16, fontSize: 16 }}>
        ⌨️ 正在输入的心情：{" "}
        {mood ? <strong>{mood}</strong> : "（还没有输入哦～）"}
      </p>
    );
  }
  