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
      <form onSubmit={handleLogin}>
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
          <Button type="submit" variant="contained" className="btn" fullWidth>
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

    try {
      const { user, error } = await supabase.auth.signUp({
        email: email,
        password: password,
      });

      console.error(error);

      if (error && error.message === "User already registered") {
        setError("이미 등록된 유저입니다.");
      }

      console.log("유저: ", user);

      if (email && password && selectedCenter) {
        const { error: insertError } = await supabase.from("admin").insert([
          {
            id: uuid(),
            email: email,
            password: password,
            center: selectedCenter,
          },
        ]);

        if (insertError) {
          setError("Error INSERT admin.");
          return;
        }
      } else if (!selectedCenter) {
        setError("담당 센터를 골라주세요 😭");
      }
    } catch (err) {
      console.error(err);
      setError("Error creating admin account.");
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
        <FormControl fullWidth margin="normal" className="centerSelect">
          <InputLabel id="center-select">보호센터 선택</InputLabel>
          <Select
            label="보호센터 선택"
            labelId="center-select"
            value={selectedCenter}
            onChange={(e) => setSelectedCenter(e.target.value)}
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
      {error && <p>{error}</p>}
    </AdminForm>
  );
};
