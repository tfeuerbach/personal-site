import * as React from "react";

const EggDot: React.FC = () => {
  const audioRef = React.useRef<HTMLAudioElement | null>(null);

  const togglePlay = React.useCallback(async () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current = null;
      return;
    }

    try {
      const response = await fetch("/media/blops.txt", { cache: "force-cache" });
      const base64 = (await response.text()).trim();
      const audio = new Audio(`data:audio/mpeg;base64,${base64}`);
      audio.loop = true;
      audioRef.current = audio;
      audio.play().catch(() => {
        // If autoplay is blocked, allow second click
        audioRef.current = null;
      });
    } catch (_err) {
      // On error, allow retry
      audioRef.current = null;
    }
  }, []);

  // Cleanup on unmount
  React.useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  const onKeyDown = (e: React.KeyboardEvent<HTMLSpanElement>) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      togglePlay();
    }
  };

  return (
    <span
      onClick={togglePlay}
      onKeyDown={onKeyDown}
      role="button"
      tabIndex={0}
      aria-label="Play/stop a short sound"
      title="Play/stop a short sound"
      style={{ cursor: "pointer" }}
    >
      .
    </span>
  );
};

export default EggDot;
