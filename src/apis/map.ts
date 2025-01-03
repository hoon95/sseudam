import { useEffect } from "react";
import axios from "axios";

export const NaverMapLoader = ({ onLoad }: { onLoad: () => void }) => {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = `https://openapi.map.naver.com/openapi/v3/maps.js?ncpClientId=${import.meta.env.VITE_NAVER_CLIENT_ID}`;
    script.async = true;

    script.onload = () => {
      onLoad();
    };

    script.onerror = () => {
      console.error("Failed to load Naver Map script");
    };

    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, [onLoad]);

  return null;
};

export const getCoordinates = async (address: string) => {
  try {
    const response = await axios.get(
      "https://dapi.kakao.com/v2/local/search/address.json",
      {
        headers: {
          Authorization: `KakaoAK ${import.meta.env.VITE_KAKAO_RESTAPI_KEY}`,
        },
        params: {
          query: address,
        },
      },
    );

    const { documents } = response.data;
    if (documents.length > 0) {
      const latitude = documents[0].y;
      const longitude = documents[0].x;
      return { lat: latitude, lng: longitude };
    } else {
      console.error("주소를 찾을 수 없습니다.");
    }
  } catch (error) {
    console.error("위치 정보 가져오기 실패:", error);
  }
};
