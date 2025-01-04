/* eslint-disable @typescript-eslint/no-explicit-any */
import { useShareStore } from "@store/store";
import { useState, useEffect, useCallback } from "react";
import { ShortList, Title } from "./Share.styled";
import VisibilityIcon from "@mui/icons-material/Visibility";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";

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
  statistics: {
    viewCount: string;
    likeCount: string;
  };
}

export const Youtube = () => {
  const { keyword } = useShareStore();

  const API_KEY = import.meta.env.VITE_YOUTUBE_API_KEY;
  const query = `${keyword}`;
  const maxResults = 4;

  const [shorts, setShorts] = useState<Video[]>([]);
  const [loading, setLoading] = useState(true);

  const getCachedVideos = useCallback(() => {
    const cachedData = localStorage.getItem(`shorts_${query}`);
    if (cachedData) {
      return JSON.parse(cachedData);
    }
    return null;
  }, [query]);

  const setCachedVideos = useCallback(
    (videos: Video[]) => {
      localStorage.setItem(`shorts_${query}`, JSON.stringify(videos));
    },
    [query],
  );

  const fetchShortsVideos = useCallback(async () => {
    try {
      const response = await fetch(
        `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${query}&type=video&videoDuration=short&order=relevance&maxResults=${maxResults}&key=${API_KEY}`,
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
  }, [query, API_KEY, maxResults]);

  const fetchVideoDetails = useCallback(
    async (videoIds: string[]) => {
      try {
        const response = await fetch(
          `https://www.googleapis.com/youtube/v3/videos?part=statistics&id=${videoIds.join(",")}&key=${API_KEY}`,
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
    },
    [API_KEY],
  );

  useEffect(() => {
    const fetchVideos = async () => {
      setLoading(true);

      const cachedVideos = getCachedVideos();
      if (cachedVideos) {
        setShorts(cachedVideos);
        setLoading(false);
        return;
      }

      const videos = await fetchShortsVideos();
      const videoIds = videos.map(
        (video: { id: { videoId: any } }) => video.id.videoId,
      );

      const videoDetails = await fetchVideoDetails(videoIds);

      const videosWithViewCount = videos.map(
        (video: { id: { videoId: any } }) => {
          const videoDetailsData = videoDetails.find(
            (detail: { id: any }) => detail.id === video.id.videoId,
          );
          const viewCount = videoDetailsData?.statistics.viewCount || "0";
          const likeCount = videoDetailsData?.statistics.likeCount || "0";

          return {
            ...video,
            statistics: {
              viewCount,
              likeCount,
            },
          };
        },
      );

      const sortedVideos = videosWithViewCount.sort(
        (
          a: { statistics: { viewCount: string } },
          b: { statistics: { viewCount: string } },
        ) =>
          parseInt(b.statistics.viewCount) - parseInt(a.statistics.viewCount),
      );

      setShorts(sortedVideos);
      setCachedVideos(sortedVideos);
      setLoading(false);
    };

    fetchVideos();
  }, [fetchShortsVideos, fetchVideoDetails, getCachedVideos, setCachedVideos]);

  if (loading) {
    return <div>Loading...</div>;
  }

  console.log(shorts);

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
              <p>{video.snippet.title}</p>
              <div className="likeView">
                <div className="like">
                  <ThumbUpIcon />
                  <p>{`${video.statistics.likeCount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`}</p>
                </div>
                <div className="view">
                  <VisibilityIcon />
                  <p>{`${video.statistics.viewCount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`}</p>
                </div>
              </div>
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
