import { Login } from "@components/Login/Login";
import { useUserStore } from "@store/store";

export const LoginPage = () => {
  const { userLogin } = useUserStore();

  if (userLogin) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          paddingTop: "calc(var(--gap) * 10)",
        }}
      >
        <p style={{ fontSize: "var(--text-md)" }}>이미 로그인 중입니다.</p>
      </div>
    );
  }

  return <Login />;
};
