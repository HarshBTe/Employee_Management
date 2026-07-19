import "./Login.css";

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

import {
  Paper,
  Typography,
  TextField,
  Button,
  InputAdornment,
  IconButton,
  Avatar,
  Box,
  CircularProgress,
} from "@mui/material";

import {
  EmailOutlined,
  LockOutlined,
  Visibility,
  VisibilityOff,
  BusinessCenter,
} from "@mui/icons-material";

import { useAuth } from "../../context/AuthContext";

interface LoginFormData {
  email: string;
  password: string;
}

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>();

  const onSubmit = async (data: LoginFormData) => {
    try {
      setLoading(true);

      await login(data);

      toast.success("Login successful!");

      navigate("/");
    } catch (error: any) {
      toast.error(
        error?.response?.data?.message || "Invalid email or password"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className="circle circle1"></div>
      <div className="circle circle2"></div>

      <Paper elevation={0} className="login-card">
        <Avatar className="login-avatar">
          <BusinessCenter />
        </Avatar>

        <Typography
          variant="h4"
          fontWeight="bold"
          gutterBottom
        >
          Employee EMS
        </Typography>

        <Typography
          color="text.secondary"
          mb={4}
        >
          Sign in to continue
        </Typography>

        <Box
          component="form"
          onSubmit={handleSubmit(onSubmit)}
        >
          <TextField
            fullWidth
            margin="normal"
            label="Email Address"
            placeholder="Enter your email"
            autoComplete="email"
            error={!!errors.email}
            helperText={errors.email?.message}
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^\S+@\S+\.\S+$/,
                message: "Enter a valid email",
              },
            })}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <EmailOutlined />
                </InputAdornment>
              ),
            }}
          />

          <TextField
            fullWidth
            margin="normal"
            label="Password"
            placeholder="Enter your password"
            type={showPassword ? "text" : "password"}
            autoComplete="current-password"
            error={!!errors.password}
            helperText={errors.password?.message}
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 6,
                message: "Password must be at least 6 characters",
              },
            })}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LockOutlined />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    edge="end"
                    onClick={() =>
                      setShowPassword((prev) => !prev)
                    }
                  >
                    {showPassword ? (
                      <VisibilityOff />
                    ) : (
                      <Visibility />
                    )}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            size="large"
            className="login-btn"
            disabled={loading}
          >
            {loading ? (
              <CircularProgress
                size={24}
                color="inherit"
              />
            ) : (
              "Sign In"
            )}
          </Button>
        </Box>
      </Paper>
    </div>
  );
};

export default Login;