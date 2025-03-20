import imagemin from "imagemin";
import imageminWebp from "imagemin-webp";

async function convertImages(inputDir, outputDir, quality) {
  try {
    const files = await imagemin([`${inputDir}/**/*.{jpg,png}`], {
      destination: outputDir,
      plugins: [imageminWebp({ quality })],
    });
    console.log("변환 완료된 이미지 파일들:", files);
  } catch (error) {
    console.error("이미지 변환 중 에러 발생:", error);
  }
}

convertImages("src/assets/images", "src/assets/images/dist", 75);
