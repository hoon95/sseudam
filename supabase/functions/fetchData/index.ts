import { createClient } from "npm:@supabase/supabase-js@2.47.13";
import process from "node:process";

interface PetType {
  itemId: number;
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

Deno.serve(async (req) => {
  const authHeader = req.headers.get("Authorization")!;

  // const supabaseUrl = Deno.env.get("SUPABASE_URL") as string;
  // const supabaseAnonKey = Deno.env.get("SUPABASE_ANON_KEY") as string;
  const supabaseUrl = process.env.VITE_SUPABASE_URL as string;
  const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY as string;

  const supabase = createClient(supabaseUrl, supabaseAnonKey, {
    global: { headers: { Authorization: authHeader } },
  });

  async function fetchPetData() {
    const serviceKey = Deno.env.get("API_SERVICE_KEY");

    if (!serviceKey) {
      throw new Error(
        "서비스 키가 설정되지 않았습니다. 환경 변수를 확인하세요.",
      );
    }

    try {
      const response = await fetch(
        "http://apis.data.go.kr/1543061/abandonmentPublicSrvc/abandonmentPublic",
        {
          method: "GET",
          headers: { Authorization: `Bearer ${supabaseAnonKey}` },
          params: {
            serviceKey,
            numOfRows: 5,
            pageNo: 1,
            _type: "json",
          },
        },
      );
      const data = await response.json();

      console.log(data);

      const pets: PetType[] = data.response.body.items.item;

      const savePetsToDB = async () => {
        const currentYear = new Date().getFullYear();

        const { error: deleteError } = await supabase.rpc("truncate_list");

        if (deleteError) {
          console.error("기존 데이터 삭제 오류:", deleteError.message);
          return;
        }

        for (const pet of pets) {
          const kindCd = pet.kindCd;
          const type = kindCd.includes("개")
            ? "강아지"
            : kindCd.includes("고양이")
            ? "고양이"
            : "기타";
          const kind = kindCd.replace(/\[.*?\]\s*/, "").trim();
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
              type,
              kind,
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
      throw error;
    }
  }

  await fetchPetData();

  return new Response("fetchPetData executed successfully", { status: 200 });
});
