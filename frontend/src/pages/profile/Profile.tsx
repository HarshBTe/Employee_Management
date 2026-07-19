import { useEffect, useState } from "react";
import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  CircularProgress,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import toast from "react-hot-toast";

import DashboardLayout from "../../components/layout/DashboardLayout";

import {
  getMyProfile,
  updateMyProfile,
} from "../../services/employeeService";

const Profile = () => {
  const [loading, setLoading] = useState(true);

  const [image, setImage] = useState<File | null>(null);

  const [profile, setProfile] = useState({
    name: "",
    phone: "",
    email: "",
    employeeId: "",
    department: "",
    designation: "",
    role: "",
    profileImage: "",
  });

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    try {
      const { data } = await getMyProfile();

      setProfile(data.employee);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setProfile({
      ...profile,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async () => {
    const formData = new FormData();

    formData.append("name", profile.name);
    formData.append("phone", profile.phone);

    if (image) {
      formData.append("profileImage", image);
    }

    try {
      await updateMyProfile(formData);

      toast.success("Profile updated successfully.");

      loadProfile();

    } catch (error: any) {

      toast.error(
        error.response?.data?.message ||
          "Update failed."
      );

    }
  };

  if (loading) {
    return (
      <DashboardLayout>
        <Box
          display="flex"
          justifyContent="center"
          mt={10}
        >
          <CircularProgress />
        </Box>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>

      <Typography
        variant="h4"
        fontWeight={700}
        mb={3}
      >
        My Profile
      </Typography>

      <Card
        sx={{
          maxWidth: 700,
        }}
      >
        <CardContent>

          <Stack
            spacing={3}
            alignItems="center"
          >

            <Avatar
              src={
                profile.profileImage
                  ? `http://localhost:5000${profile.profileImage}`
                  : ""
              }
              sx={{
                width: 100,
                height: 100,
              }}
            >
              {profile.name.charAt(0)}
            </Avatar>

            <Button
              variant="outlined"
              component="label"
            >
              Upload Image

              <input
                hidden
                type="file"
                accept="image/*"
                onChange={(e) =>
                  setImage(
                    e.target.files?.[0] || null
                  )
                }
              />

            </Button>

            <TextField
              fullWidth
              label="Employee ID"
              value={profile.employeeId}
              disabled
            />

            <TextField
              fullWidth
              label="Name"
              name="name"
              value={profile.name}
              onChange={handleChange}
            />

            <TextField
              fullWidth
              label="Email"
              value={profile.email}
              disabled
            />

            <TextField
              fullWidth
              label="Phone"
              name="phone"
              value={profile.phone}
              onChange={handleChange}
            />

            <TextField
              fullWidth
              label="Department"
              value={profile.department}
              disabled
            />

            <TextField
              fullWidth
              label="Designation"
              value={profile.designation}
              disabled
            />

            <TextField
              fullWidth
              label="Role"
              value={profile.role}
              disabled
            />

            <Button
              variant="contained"
              onClick={handleSubmit}
            >
              Update Profile
            </Button>

          </Stack>

        </CardContent>
      </Card>

    </DashboardLayout>
  );
};

export default Profile;
