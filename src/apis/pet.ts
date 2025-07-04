import axios from "axios";
import * as dotenv from "dotenv";
import { createClient } from "@supabase/supabase-js";

interface PetType {
  itemId: number;
  desertionNo: number;
  filename: string;
  happenDt: number;
  happenPlace: string;
  upKindNm: string;
  colorCd: string;
  age: string;
  weight: string;
  noticeNo: string;
  noticeSdt: number;
  noticeEdt: number;
  popfile1: string;
  processState: string;
  sexCd: string;
  neuterYn: string;
  specialMark: string;
  careNm: string;
  careTel: string;
  careAddr: string;
  orgNm: string;
  careOwnerNm: string;
  officetel: string;
  noticeComment: string;
  kindNm: string;
}

dotenv.config();

const supabaseUrl = process.env.VITE_SUPABASE_URL as string;
const supabaseKey = process.env.VITE_SERVICE_ROLE as string;
const supabase = createClient(supabaseUrl, supabaseKey);

export const fetchPetData = async () => {
  const serviceKey = process.env.VITE_API_SERVICE_KEY;

  if (!serviceKey) {
    throw new Error("서비스 키가 설정되지 않았습니다. 환경 변수를 확인하세요.");
  }

  try {
    const { data } = await axios.get(
      "http://apis.data.go.kr/1543061/abandonmentPublicService_v2/abandonmentPublic_v2",
      {
        params: {
          serviceKey,
          numOfRows: 1000,
          _type: "json",
        },
      },
    );

    const pets: PetType[] = data.response.body.items.item;

    const savePetsToDB = async () => {
      const currentYear = new Date().getFullYear();

      const { error: deleteError } = await supabase.rpc("truncate_list");

      if (deleteError) {
        console.error("기존 데이터 삭제 오류:", deleteError);
        return;
      }

      for (const pet of pets) {
        const ageMatch = pet.age.match(/^(\d{4})/);
        const ageYear = ageMatch ? parseInt(ageMatch[1], 10) : null;
        const calculatedAge = ageYear ? currentYear - ageYear : null;
        const weightMatch = pet.weight.match(/^([\d.]+)/);
        const calculatedWeight = weightMatch
          ? parseFloat(weightMatch[1])
          : null;

        const { error } = await supabase.from("list").insert([
          {
            desertion_no: pet.desertionNo,
            filename: pet.filename,
            happen_dt: pet.happenDt,
            happen_place: pet.happenPlace,
            upKindNm: pet.upKindNm,
            color_cd: pet.colorCd,
            age: pet.age,
            weight: pet.weight,
            notice_no: pet.noticeNo,
            notice_sdt: pet.noticeSdt,
            notice_edt: pet.noticeEdt,
            popfile: pet.popfile1,
            process_state: pet.processState,
            sex_cd: pet.sexCd,
            neuter_yn: pet.neuterYn,
            special_mark: pet.specialMark,
            care_nm: pet.careNm,
            care_tel: pet.careTel,
            care_addr: pet.careAddr,
            org_nm: pet.orgNm,
            charge_nm: pet.careOwnerNm,
            officetel: pet.officetel,
            notice_comment: pet.noticeComment,
            // type,
            kind: pet.kindNm,
            calculated_age: calculatedAge,
            calculated_weight: calculatedWeight,
          },
        ]);

        if (error) {
          console.error("Supabase 데이터 삽입 오류:", error.message);
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
