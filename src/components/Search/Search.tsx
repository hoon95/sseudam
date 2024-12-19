import { useQuery } from "@tanstack/react-query";
import { fetchData } from "@apis/post";

interface PetType {
  desertion_no: number;
  filename: string;
  happen_dt: number;
  happen_place: string;
  kind_cd: string;
  color_cd: string;
  age: string;
  weight: string;
  notice_no: string;
  notice_sdt: number;
  notice_edt: number;
  popfile: string;
  process_state: string;
  sex_cd: string;
  neuter_yn: string;
  special_mark: string;
  care_nm: string;
  care_tel: string;
  care_addr: string;
  org_nm: string;
  charge_nm: string;
  officetel: string;
  notice_comment: string;
}

export const Search = () => {
  const { data, isLoading, error } = useQuery<PetType[]>({
    queryKey: ["petData", "list"],
    queryFn: ({ queryKey }) => fetchData(queryKey[1]),
  });

  if (isLoading) {
    return <p>Loading..</p>;
  }

  if (error) {
    return <p>Error..</p>;
  }

  if (!data) {
    return <p>No data available</p>;
  }

  return (
    <>
      {data.map((item, index) => (
        <div key={index}>
          <div>
            <p>유기번호: {item.desertion_no}</p>
            <img src={item.filename} alt="유기동물 이미지" />
            <p>접수일: {item.happen_dt}</p>
            <p>발견장소: {item.happen_place}</p>
            <p>품종: {item.kind_cd}</p>
            <p>색상: {item.color_cd}</p>
            <p>나이: {item.age}</p>
            <p>체중: {item.weight}</p>
            <p>공고번호: {item.notice_no}</p>
            <p>
              공고날짜: {item.notice_sdt} - {item.notice_edt}
            </p>
            <p>상태: {item.process_state}</p>
            <p>성별: {item.sex_cd}</p>
            <p>중성화여부: {item.neuter_yn}</p>
            <p>특징: {item.special_mark}</p>
            <p>보호소이름: {item.care_nm}</p>
            <p>보호소 전화번호: {item.care_tel}</p>
            <p>보호장소: {item.care_addr}</p>
            <p>관할기관: {item.org_nm}</p>
            <p>담당자: {item.charge_nm}</p>
            <p>담당자 연락처: {item.officetel}</p>
            <p>특이사항: {item.notice_comment}</p>
          </div>
          <hr />
        </div>
      ))}
    </>
  );
};
