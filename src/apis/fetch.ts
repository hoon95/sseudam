import { fetchPetData } from "./pet";

fetchPetData()
  .then(() => {
    console.log("펫 데이터 가져오기 완료");
  })
  .catch((error) => {
    console.error("펫 데이터 가져오기 실패:", error);
  });
