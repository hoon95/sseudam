import { supabase } from '../utils/supabaseClient';

export const loginWithKakao = async () => {
  const { error } = await supabase.auth.signInWithOAuth({
    provider: 'kakao',
  });

  if (error) throw new Error('카카오 로그인 실패: ' + error.message);
};

export const logout = async () => {
  const { error } = await supabase.auth.signOut();
  if (error) throw new Error('로그아웃 실패: ' + error.message);
};

// 사용자 정보 가져오기
export const getCurrentUser = async () => {
  const { data: user, error } = await supabase.auth.getUser();
  if (error) throw new Error('사용자 정보 가져오기 실패: ' + error.message);
  return user;
};
