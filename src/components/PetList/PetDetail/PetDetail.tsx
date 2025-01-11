import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import { fetchDetail } from "@apis/supabase";
import { NaverMapLoader, getCoordinates } from "@apis/map";
import { useUserStore, useChatStore } from "@store/store";

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
  const { userid, recentSns } = useUserStore();
  const { setChatAdminUser } = useChatStore();
  const { id } = useParams();
  const navigate = useNavigate();

  const { data, isLoading, error } = useQuery({
    queryKey: ["detail", id],
    queryFn: ({ queryKey }) => fetchDetail(queryKey[1]),
  });

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error...</p>;
  const item = data[0];

  const handleChatAdmin = (admin: string) => {
    setChatAdminUser(admin);
    navigate("/chat");
  };

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

  const NaverMap = () => {
    const [isScriptLoaded, setIsScriptLoaded] = useState(false);
    const [latLng, setLatLng] = useState<[number, number]>([0, 0]);

    const handleScriptLoad = () => {
      setIsScriptLoaded(true);
    };

    useEffect(() => {
      const fetchLocation = async () => {
        const location = await getCoordinates(item.care_addr);
        if (location) {
          setLatLng([location.lat, location.lng]);
        }
      };

      fetchLocation();
    }, []);

    useEffect(() => {
      if (
        isScriptLoaded &&
        window.naver &&
        latLng[0] !== 0 &&
        latLng[1] !== 0
      ) {
        const map = new window.naver.maps.Map("map", {
          center: new window.naver.maps.LatLng(latLng[0], latLng[1]),
          zoom: 15,
        });

        new window.naver.maps.Marker({
          position: new window.naver.maps.LatLng(latLng[0], latLng[1]),
          map: map,
        });
      }
    }, [latLng, isScriptLoaded]);

    return (
      <>
        <NaverMapLoader onLoad={handleScriptLoad} />
        <div id="map" style={{ width: "100%", height: "400px" }} />
      </>
    );
  };

  console.log("sns", recentSns);
  console.log("item", item);

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
          {recentSns !== "email" && (
            <Button
              onClick={() => handleChatAdmin(`${item.care_nm}-${userid}`)}
              variant="contained"
              color="success"
            >
              문의하기
            </Button>
          )}

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
            <NaverMap />
          </div>
        </li>
      </Info>
    </Detail>
  );
};
