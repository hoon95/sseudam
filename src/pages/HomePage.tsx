import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { Preference } from "@components/Preference/Preference";
import { Find } from "@components/Find/Find";
import { Daily } from "@components/Daily/Daily";

export const HomePage = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      offset: 300,
    });
  }, []);

  return (
    <>
      <Preference />
      <Find data-aos="flip-up" />
      <Daily data-aos="flip-up" />
    </>
  );
};
