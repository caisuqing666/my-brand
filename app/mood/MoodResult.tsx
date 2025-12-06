type MoodResultProps = {
    mood: string;
  };
  
  export function MoodResult({ mood }: MoodResultProps) {
    if (!mood) return null; // 没有心情就什么都不显示
  
    return (
      <p style={{ marginTop: 24 }}>
        💛 你现在的心情是：<strong>{mood}</strong>
      </p>
    );
  }
  