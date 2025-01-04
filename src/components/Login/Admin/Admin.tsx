import React, { useState, useEffect } from "react";
import { supabase } from "@utils/supabaseClient";
import { Link } from "react-router-dom";
import { AdminForm } from "./Admin.styled";
import uuid from "react-uuid";
import {
  FormControl,
  Button,
  InputLabel,
  Input,
  InputAdornment,
  Select,
  MenuItem,
} from "@mui/material";
import EmailIcon from "@mui/icons-material/Email";
import LockIcon from "@mui/icons-material/Lock";

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
    <AdminForm>
      <div className="title">
        <h2>쓰담</h2>
        <p>관리자 로그인</p>
      </div>
      <form>
        <FormControl fullWidth margin="normal">
          <InputLabel htmlFor="email">이메일</InputLabel>
          <Input
            type="email"
            id="email"
            placeholder="email@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="off"
            required
            startAdornment={
              <InputAdornment position="start">
                <EmailIcon />
              </InputAdornment>
            }
          />
        </FormControl>
        <FormControl fullWidth margin="normal">
          <InputLabel htmlFor="password">비밀번호</InputLabel>
          <Input
            type="password"
            id="password"
            placeholder="********"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            startAdornment={
              <InputAdornment position="start">
                <LockIcon />
              </InputAdornment>
            }
          />
        </FormControl>
        {errorMessage && <div style={{ color: "red" }}>{errorMessage}</div>}
        <div className="bottom">
          <div className="text">
            <div className="save">
              <input type="checkbox" id="remember" />
              <label htmlFor="remember">로그인 유지하기</label>
            </div>
            <Link to="./signup">관리자 계정 만들기</Link>
          </div>
          <Button
            type="button"
            onClick={handleLogin}
            variant="contained"
            className="btn"
            fullWidth
          >
            로그인
          </Button>
        </div>
      </form>
    </AdminForm>
  );
};

export const AdminSignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [selectedCenter, setSelectedCenter] = useState("");
  const [centers, setCenters] = useState<string[]>([]);
  const [error, setError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [pwError, setPwError] = useState("");
  const [centerError, setCenterError] = useState("");

  useEffect(() => {
    const fetchCenters = async () => {
      const { data, error } = await supabase.from("list").select("care_nm");
      const uniqueData = [
        ...new Set((data as { care_nm: string }[]).map((item) => item.care_nm)),
      ];

      if (error) {
        setError("Error fetching centers");
        console.error(error);
      } else {
        setCenters(uniqueData);
      }
    };
    fetchCenters();
  }, []);

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();

    setEmailError(!email ? "이메일을 입력하세요" : "");
    setPwError(
      !password
        ? "패스워드를 입력하세요"
        : password.length < 6
          ? "패스워드는 최소 6자 입력하세요"
          : "",
    );
    setCenterError(!selectedCenter ? "담당 센터를 골라주세요 😭" : "");

    try {
      const { error } = await supabase.auth.signUp({
        email: email,
        password: password,
      });

      if (error && error.message === "User already registered") {
        console.error(error.message);
        setError("이미 등록된 관리자입니다.");
        return;
      }

      const { error: insertError } = await supabase.from("admin").insert([
        {
          id: uuid(),
          email: email,
          center: selectedCenter,
        },
      ]);

      if (insertError) {
        console.error(insertError);
        return;
      }

      await supabase.auth.signOut();
      alert("회원가입이 완료되었습니다!");
      window.location.href = "../";
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <AdminForm>
      <div className="title">
        <h2>쓰담</h2>
        <p>관리자 회원가입</p>
      </div>
      <form>
        <FormControl fullWidth margin="normal">
          <InputLabel htmlFor="email">이메일</InputLabel>
          <Input
            type="email"
            id="email"
            placeholder="email@email.com"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setEmailError("");
            }}
            autoComplete="off"
            required
            startAdornment={
              <InputAdornment position="start">
                <EmailIcon />
              </InputAdornment>
            }
          />
          {emailError && emailError.length > 0 && (
            <p className="error">{emailError}</p>
          )}
        </FormControl>
        <FormControl fullWidth margin="normal">
          <InputLabel htmlFor="password">비밀번호</InputLabel>
          <Input
            type="password"
            id="password"
            placeholder="********"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              setPwError("");
            }}
            required
            startAdornment={
              <InputAdornment position="start">
                <LockIcon />
              </InputAdornment>
            }
          />
          {pwError && pwError.length > 0 && <p className="error">{pwError}</p>}
        </FormControl>
        <FormControl fullWidth margin="normal" className="centerSelect">
          <InputLabel id="center-select">보호센터 선택</InputLabel>
          <Select
            label="보호센터 선택"
            labelId="center-select"
            value={selectedCenter}
            onChange={(e) => {
              setSelectedCenter(e.target.value);
              setCenterError("");
            }}
            required
          >
            <MenuItem value="" disabled>
              보호센터 선택
            </MenuItem>
            {centers.map((center) => (
              <MenuItem key={center} value={center}>
                {center}
              </MenuItem>
            ))}
          </Select>
          {centerError && centerError.length > 0 && (
            <p className="error">{centerError}</p>
          )}
        </FormControl>
        <div className="bottom">
          <Button
            type="button"
            onClick={handleSignUp}
            variant="contained"
            className="btn"
            fullWidth
          >
            회원가입
          </Button>
        </div>
      </form>
      {error && <p className="error">{error}</p>}
    </AdminForm>
  );
};
