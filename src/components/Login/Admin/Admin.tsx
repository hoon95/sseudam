import React, { useState, useEffect } from "react";
import { supabase } from "@utils/supabaseClient";
import { Link, useNavigate } from "react-router-dom";
import { AdminForm } from "./Admin.styled";
import { useRememberStore } from "@store/store";
import { getAdminUser } from "@services/auth";
import Swal from "sweetalert2";
import {
  FormControl,
  Button,
  InputLabel,
  Input,
  InputAdornment,
  Select,
  MenuItem,
  FormGroup,
  FormControlLabel,
  Checkbox,
  IconButton,
} from "@mui/material";
import EmailIcon from "@mui/icons-material/Email";
import LockIcon from "@mui/icons-material/Lock";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

export const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const { checked, setChecked } = useRememberStore();
  const { remember, setRemember } = useRememberStore();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      if (error.message === "Invalid login credentials") {
        setErrorMessage("이메일 또는 비밀번호를 확인하세요");
        console.error("Error logging in:", error.message);
      }
    } else {
      Swal.fire({
        icon: "success",
        title: "로그인 성공",
        text: "관리자님 반갑습니다!",
        timer: 5000,
        customClass: {
          icon: "alertIcon",
        },
        confirmButtonColor: "var(--main)",
      }).then(() => {
        // eslint-disable-next-line @typescript-eslint/no-unused-expressions
        checked ? setRemember(email) : setRemember("");
        window.location.href = "/";
      });
    }
  };

  useEffect(() => {
    if (remember) {
      setEmail(remember);
    }
  }, [remember]);

  const [showPassword, setShowPassword] = useState(false);

  const handleViewPw = () => {
    setShowPassword((prev) => !prev);
  };

  const handleCheck = (event: React.SyntheticEvent) => {
    const target = event.target as HTMLInputElement;
    const isChecked = target.checked;
    setChecked(isChecked);
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
            type={showPassword ? "text" : "password"}
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
            endAdornment={
              <InputAdornment position="end" aria-label="비밀번호 표시">
                <IconButton onClick={handleViewPw} edge="end">
                  {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                </IconButton>
              </InputAdornment>
            }
          />
        </FormControl>
        {errorMessage && <p className="error">{errorMessage}</p>}
        <div className="bottom">
          <div className="text">
            <FormGroup>
              <FormControlLabel
                control={<Checkbox />}
                onChange={handleCheck}
                checked={checked}
                label="아이디 저장"
              />
            </FormGroup>
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
  const [emailError, setEmailError] = useState("");
  const [pwError, setPwError] = useState("");
  const [centerError, setCenterError] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const fetchCenters = async () => {
      const { data, error } = await supabase.from("list").select("care_nm");
      const uniqueData = [
        ...new Set((data as { care_nm: string }[]).map((item) => item.care_nm)),
      ];

      if (error) {
        console.error(error);
      } else {
        setCenters(uniqueData);
      }
    };
    fetchCenters();
  }, []);

  const checkCenter = async (centerName: string) => {
    const { adminUser, adminError } = await getAdminUser();

    if (adminError) {
      console.error("데이터 로드 오류:", adminError);
      return false;
    }

    const userWithCenter = adminUser.find(
      (user: { center: string }) => user.center === centerName,
    );

    if (userWithCenter && userWithCenter.center === selectedCenter) {
      Swal.fire({
        position: "bottom",
        toast: true,
        title: "이미 등록된 센터입니다",
        text: "관리자에게 문의해주세요 🥲",
        customClass: {
          icon: "alertIcon",
          popup: "customToast",
        },
        confirmButtonColor: "var(--main)",
      });

      return true;
    }
    return false;
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();

    const isCenterRegistered = await checkCenter(selectedCenter);
    if (isCenterRegistered) {
      return;
    }

    setEmailError(!email ? "이메일을 입력하세요" : "");
    setPwError(
      !password
        ? "패스워드를 입력하세요"
        : password.length < 6
          ? "패스워드는 최소 6자 입력하세요"
          : "",
    );
    setCenterError(!selectedCenter ? "담당 센터를 골라주세요" : "");

    if (!email || !password || password.length < 6 || !selectedCenter) {
      return;
    }

    checkCenter(selectedCenter);

    try {
      const { error } = await supabase.auth.signUp({
        email: email,
        password: password,
      });

      if (error && error.message === "User already registered") {
        console.error(error.message);

        Swal.fire({
          position: "bottom",
          toast: true,
          title: "이미 등록된 관리자입니다",
          text: "이메일을 확인해주세요 🥲",
          customClass: {
            icon: "alertIcon",
            popup: "customToast",
          },
          confirmButtonColor: "var(--main)",
        });

        return;
      }

      const response = await supabase.auth.getUser();

      const { error: insertError } = await supabase.from("admin").insert([
        {
          id: response.data.user.id,
          email: email,
          center: selectedCenter,
        },
      ]);

      if (insertError) {
        console.error(insertError);
        return;
      }

      await supabase.auth.signOut();

      Swal.fire({
        icon: "success",
        title: "관리자 등록 완료",
        text: "등록이 완료되었습니다!",
        customClass: {
          icon: "alertIcon",
        },
        confirmButtonColor: "var(--main)",
      }).then(() => {
        navigate("/login/admin");
      });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <AdminForm>
      <div className="title">
        <h2>쓰담</h2>
        <p>관리자 등록하기</p>
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
            등록하기
          </Button>
        </div>
      </form>
    </AdminForm>
  );
};
