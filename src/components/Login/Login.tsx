import { loginWithKakao } from "../../services/auth";
import { LoginContainer, KakaoIcon } from "./Login.styled";
import { Sns } from "./Login.styled";
import { Link } from "react-router-dom";

// Icon Load
import InstagramIcon from "@mui/icons-material/Instagram";
import GoogleIcon from "@mui/icons-material/Google";

const KakaoLogin = async () => {
  try {
    await loginWithKakao();
    alert('Success');
  } catch (err: any) {
    console.error(err.message);
    alert('Failed to Login');
  }
}

export const Login = () => {
  return (
    <LoginContainer>
      <div className="text">
        <h2>반려동물을 위한 첫걸음</h2>
        <p>쓰담에서 시작하세요</p>
      </div>
      <Sns>
        <button className="kakao" onClick={ KakaoLogin }>
          <KakaoIcon />
          카카오로 시작하기
        </button>
        <button className="instagram">
          <InstagramIcon />
          인스타로 시작하기
        </button>
        <button className="google">
          <GoogleIcon />
          구글로 시작하기
        </button>
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
