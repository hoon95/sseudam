import { supabase } from "@utils/supabaseClient";
import Swal from "sweetalert2";

export const loginWithSns = async (sns: string) => {
  try {
    await Swal.fire({
      icon: "success",
      title: "환영해요 🐶",
      text: "처음이라면 회원가입을 진행할게요!",
      customClass: {
        icon: "alertIcon",
      },
      confirmButtonColor: "var(--main)",
    });

    const { error } = await supabase.auth.signInWithOAuth({
      provider: sns,
    });

    if (error) {
      Swal.fire({
        title: "로그인에 실패했습니다",
        text: "잠시 후 다시 시도해주세요",
        customClass: {
          icon: "alertIcon",
        },
        confirmButtonColor: "var(--main)",
      });
    }
  } catch (err) {
    console.error(err);
  }
};

export const logout = async () => {
  const { error } = await supabase.auth.signOut();
  window.location.href = "/login";
  if (error) throw new Error("로그아웃 실패: " + error.message);
};

export const getCurrentUser = async () => {
  const { data: user, error } = await supabase.auth.getUser();
  if (error) throw new Error("사용자 정보 가져오기 실패: " + error.message);
  return user;
};
