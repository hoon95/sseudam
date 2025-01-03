import { useShareStore } from "@store/store";
import { useState, useEffect } from "react";
import { ShortList, Title } from "./Share.styled";

interface Video {
  id: {
    videoId: string;
  };
  snippet: {
    title: string;
    thumbnails: {
      medium: {
        url: string;
      };
    };
  };
}

export const Youtube = () => {
  const { keyword } = useShareStore();

  const API_KEY = import.meta.env.VITE_YOUTUBE_API_KEY;
  const query = `${keyword} shorts`;
  const maxResults = 4;

  const fetchShortsVideos = async () => {
    try {
      const response = await fetch(
        `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${query}&type=video&videoDuration=short&maxResults=${maxResults}&key=${API_KEY}`,
      );

      if (!response.ok) {
        throw new Error("API 호출 실패");
      }

      const data = await response.json();
      return data.items || [];
    } catch (error) {
      console.error(error);
      return [];
    }
  };

  const [shorts, setShorts] = useState<Video[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVideos = async () => {
      setLoading(true);
      const videos = await fetchShortsVideos();
      setShorts(videos);
      setLoading(false);
    };

    fetchVideos();
  }, [keyword]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <ShortList>
      {shorts.length > 0 ? (
        shorts.map((video) => (
          <li key={video.id.videoId}>
            <a
              href={`https://www.youtube.com/watch?v=${video.id.videoId}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src={video.snippet.thumbnails.medium.url}
                alt={video.snippet.title}
              />
            </a>
          </li>
        ))
      ) : (
        <p className="traffic">트래픽을 초과했어요 😢</p>
      )}
    </ShortList>
  );
};

export const Share = () => {
  return (
    <>
      <Title>
        <h2>Daily Life</h2>
        <p>당신의 취향에 맞는 쇼츠를 추천해요!</p>
      </Title>
      <Youtube />
    </>
  );
};
