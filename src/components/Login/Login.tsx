import { useUserStore } from "@store/store";
import { loginWithSns } from "@services/auth";
import { LoginContainer, KakaoIcon } from "./Login.styled";
import { Sns } from "./Login.styled";
import { Link } from "react-router-dom";

// Icon Load
import InstagramIcon from "@mui/icons-material/Instagram";
import GoogleIcon from "@mui/icons-material/Google";
import { Tooltip } from "@mui/material";

const SnsLogin = async (sns: string) => {
  try {
    if (sns === "kakao") {
      await loginWithSns("kakao");
    } else if (sns === "google") {
      await loginWithSns("google");
    }
  } catch (err: unknown) {
    if (err instanceof Error) {
      console.error(err.message);
    }
  }
};

export const Login = () => {
  const { recentSns } = useUserStore();

  return (
    <LoginContainer>
      <div className="text">
        <h2>반려동물을 위한 첫걸음</h2>
        <p>쓰담에서 시작하세요</p>
      </div>
      <Sns>
        <Tooltip
          className="kakao"
          title={recentSns === "kakao" ? "최근 접속한 계정" : null}
          open={true}
          arrow={true}
          placement="right"
          onClick={() => SnsLogin("kakao")}
        >
          <div>
            <KakaoIcon />
            카카오로 시작하기
          </div>
        </Tooltip>
        <Tooltip
          className="instagram"
          title={recentSns === "instagram" ? "최근 접속한 계정" : null}
          open={true}
          arrow={true}
          placement="right"
        >
          <div>
            <InstagramIcon />
            인스타로 시작하기
          </div>
        </Tooltip>
        <Tooltip
          className="google"
          title={recentSns === "google" ? "최근 접속한 계정" : null}
          open={true}
          arrow={true}
          placement="right"
          onClick={() => SnsLogin("google")}
        >
          <div>
            <GoogleIcon />
            구글로 시작하기
          </div>
        </Tooltip>
      </Sns>

      <div className="admin">
        <p className="or">또는</p>
        <Link to="./admin" className="login">
          관리자 로그인
        </Link>
      </div>
    </LoginContainer>
  );
};
