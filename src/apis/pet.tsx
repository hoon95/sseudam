import axios from "axios";
import { supabase } from "@utils/supabaseClient";

export interface PetType {
  desertionNo: number;
  filename: string;
  happenDt: number;
  happenPlace: string;
  kindCd: string;
  colorCd: string;
  age: string;
  weight: string;
  noticeNo: string;
  noticeSdt: number;
  noticeEdt: number;
  popfile: string;
  processState: string;
  sexCd: string;
  neuterYn: string;
  specialMark: string;
  careNm: string;
  careTel: string;
  careAddr: string;
  orgNm: string;
  chargeNm: string;
  officetel: string;
  noticeComment: string;
}

export const fetchPetData = async () => {
  const serviceKey = import.meta.env.VITE_API_SERVICE_KEY;

  if (!serviceKey) {
    throw new Error("서비스 키가 설정되지 않았습니다. 환경 변수를 확인하세요.");
  }

  try {
    const { data } = await axios.get(
      "http://apis.data.go.kr/1543061/abandonmentPublicSrvc/abandonmentPublic",
      {
        params: {
          serviceKey,
          numOfRows: 100,
          _type: "json",
        },
      },
    );

    const pets: PetType[] = data.response.body.items.item;

    // Supabase DB에 저장
    const savePetsToDB = async () => {
      for (const pet of pets) {
        const { data: insertData, error } = await supabase.from("list").insert([
          {
            desertion_no: pet.desertionNo,
            filename: pet.filename,
            happen_dt: pet.happenDt,
            happen_place: pet.happenPlace,
            kind_cd: pet.kindCd,
            color_cd: pet.colorCd,
            age: pet.age,
            weight: pet.weight,
            notice_no: pet.noticeNo,
            notice_sdt: pet.noticeSdt,
            notice_edt: pet.noticeEdt,
            popfile: pet.popfile,
            process_state: pet.processState,
            sex_cd: pet.sexCd,
            neuter_yn: pet.neuterYn,
            special_mark: pet.specialMark,
            care_nm: pet.careNm,
            care_tel: pet.careTel,
            care_addr: pet.careAddr,
            org_nm: pet.orgNm,
            charge_nm: pet.chargeNm,
            officetel: pet.officetel,
            notice_comment: pet.noticeComment,
          },
        ]);

        if (error) {
          console.error("Supabase 데이터 삽입 오류:", error.message);
        } else {
          console.log("Pet data inserted:", insertData);
        }
      }
    };

    await savePetsToDB();

    return pets;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      if (error.response.status === 429) {
        console.log("트래픽 초과. 잠시 후 다시 시도해주세요.");
      } else {
        console.error(
          "API 요청 오류:",
          error.response.status,
          error.response.statusText,
        );
      }
    } else {
      console.error("알 수 없는 오류:", error);
    }
    throw error;
  }
};
