/* eslint-disable react-hooks/exhaustive-deps */
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { fetchDetail } from "@apis/supabase";
import { APIProvider, Map, Marker } from "@vis.gl/react-google-maps";
import axios from "axios";
import { useEffect, useState } from "react";

import { Button, Divider, Tooltip } from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";
import MaleIcon from "@mui/icons-material/Male";
import FemaleIcon from "@mui/icons-material/Female";
import CallIcon from "@mui/icons-material/Call";
import { blue, pink } from "@mui/material/colors";
import {
  Notice,
  Detail,
  BtnContainer,
  Info,
  NoticeTooltip,
} from "./PetDetail.styled";

export const PetDetail = () => {
  const { id } = useParams();

  const { data, isLoading, error } = useQuery({
    queryKey: ["detail", id],
    queryFn: ({ queryKey }) => fetchDetail(queryKey[1]),
  });

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error...</p>;
  console.log(data);
  const item = data[0];

  const NoticeDetail = () => {
    return (
      <NoticeTooltip>
        <li className="title">공고내용</li>
        <li>공고번호 : {item.notice_no}</li>
        <li>공고기간 : {`${item.notice_sdt} - ${item.notice_edt}`}</li>
        <li>발견장소 : {item.happen_place}</li>
      </NoticeTooltip>
    );
  };

  interface LatLng {
    lat: number | null;
    lng: number | null;
  }

  const TooltipMap = () => {
    // lat, lng 가져오기
    const [latLng, setLatLng] = useState<LatLng | null>(null);

    const addr = item.care_addr;
    const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
    const getLatLng = async (address: string) => {
      const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
        address,
      )}&key=${apiKey}`;

      try {
        const response = await axios.get(url);

        if (response.data.status === "OK") {
          const { lat, lng } = response.data.results[0].geometry.location;
          setLatLng({ lat, lng });
        }
      } catch (error) {
        console.error("지도 API 오류: ", error);
      }
    };

    useEffect(() => {
      getLatLng(addr);
    }, [addr, getLatLng]);

    if (latLng) {
      const lat = latLng?.lat ?? 0;
      const lng = latLng?.lng ?? 0;

      return (
        <APIProvider apiKey={apiKey}>
          <Map
            className="map"
            defaultCenter={{ lat: lat, lng: lng }}
            defaultZoom={15}
            gestureHandling={"greedy"}
            disableDefaultUI={true}
          >
            <Marker position={{ lat: lat, lng: lng }} />
          </Map>
        </APIProvider>
      );
    }
  };

  return (
    <Detail>
      <img src={item.popfile} alt="" />

      <div className="title">
        <div className="desc">
          <p className="kind">{item.kind}</p>
          <p className="sex">
            {item.sex_cd === "M" ? (
              <MaleIcon sx={{ color: blue[700] }} />
            ) : (
              <FemaleIcon sx={{ color: pink[700] }} />
            )}
          </p>
          <p className="age">{item.calculated_age}세</p>
          <p>&nbsp;/&nbsp;</p>
          <p className="weight">{item.calculated_weight}kg</p>
          <Tooltip
            title={<NoticeDetail />}
            classes={{ tooltip: "custom-tooltip" }}
          >
            <Notice>
              <InfoIcon />
              <p>공고내용</p>
            </Notice>
          </Tooltip>
        </div>
        <BtnContainer>
          <Button variant="contained" color="success">
            문의하기
          </Button>
          <Button
            variant="contained"
            color="primary"
            className="list"
            onClick={() => history.back()}
          >
            목록
          </Button>
        </BtnContainer>
      </div>
      <Divider className="divider" />
      <Info>
        <li>
          <p>상태</p>
          <p>보호중</p>
        </li>
        <li>
          <p>중성화 여부</p>
          <p>
            {item.neuter_yn === "Y"
              ? "O"
              : item.neuter_yn === "N"
                ? "X"
                : "모름"}
          </p>
        </li>
        <li>
          <p>특이사항</p>
          <p>{item.special_mark}</p>
        </li>
      </Info>
      <Divider className="divider" />
      <Info>
        <li className="careNm">
          <p className="title">보호장소</p>
          <div className="container">
            <div className="text">
              <p>
                {item.care_nm} (담당자 : {item.charge_nm})
              </p>
              <div className="call">
                <CallIcon />
                <p>
                  {item.care_tel} &nbsp;/&nbsp; {item.officetel}
                </p>
              </div>
            </div>
            <TooltipMap />
          </div>
        </li>
      </Info>
    </Detail>
  );
};
