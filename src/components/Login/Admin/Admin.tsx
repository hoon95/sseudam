import React, { useState, useEffect } from "react";
import { supabase } from "@utils/supabaseClient";
import { Link } from "react-router-dom";

export const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    const { user, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setErrorMessage(error.message);
      console.error("Error logging in:", error.message);
    } else {
      console.log("User logged in:", user);
      alert("로그인 성공!");
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <div>
        <label htmlFor="email">이메일</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="password">비밀번호</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      {errorMessage && <div style={{ color: "red" }}>{errorMessage}</div>}{" "}
      {/* 에러 메시지 출력 */}
      <button type="submit">로그인</button>
      <Link to="./signup">회원가입</Link>
    </form>
  );
};

export const AdminSignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [selectedCenter, setSelectedCenter] = useState("");
  const [centers, setCenters] = useState<any[]>([]); // 보호센터 목록
  const [error, setError] = useState("");

  useEffect(() => {
    // 보호센터 목록을 가져오는 API 호출 (예: Supabase에서 센터 목록 가져오기)
    const fetchCenters = async () => {
      const { data, error } = await supabase.from("centers").select("*");
      if (error) {
        setError("Error fetching centers");
      } else {
        setCenters(data);
      }
    };
    fetchCenters();
  }, []);

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedCenter) {
      setError("Please select a protection center.");
      return;
    }

    // 관리자 계정 생성
    try {
      const { user, error } = await supabase.auth.signUp({
        email,
        password,
      });

      if (error) {
        setError(error.message);
        return;
      }

      // 보호센터 정보와 함께 관리자의 데이터를 저장
      const { error: insertError } = await supabase
        .from("admins")
        .insert([{ user_id: user?.id, center_id: selectedCenter }]);

      if (insertError) {
        setError("Error creating admin.");
        return;
      }

      alert("관리자 계정이 생성되었습니다.");
    } catch (err) {
      setError("Error creating admin account.");
    }
  };

  return (
    <div>
      <h2>관리자 회원가입</h2>
      <form onSubmit={handleSignUp}>
        <input
          type="email"
          placeholder="이메일"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="비밀번호"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <select
          value={selectedCenter}
          onChange={(e) => setSelectedCenter(e.target.value)}
          required
        >
          <option value="">보호센터 선택</option>
          {centers.map((center) => (
            <option key={center.id} value={center.id}>
              {center.name}
            </option>
          ))}
        </select>
        <button type="submit">회원가입</button>
      </form>
      {error && <p>{error}</p>}
    </div>
  );
};
