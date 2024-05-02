import React, { useContext } from "react";
import {
  Card,
  Input,
  Checkbox,
  Button,
  Typography,
} from "@material-tailwind/react";
import { useForm } from "react-hook-form";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { AuthContext } from "../AuthProvider/AuthProviders";
import Swal from "sweetalert2";

const Register = () => {
  const { createUser, updateUserProfile } = useContext(AuthContext);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();

  const onSubmit = (data) => {
    //     console.log(data);
    const { photo, name, email, password } = data;
    createUser(email, password).then((result) => {
      updateUserProfile(name, photo)
        .then(() => {
          const user = result.user;
          Swal.fire({
            title: "Successfully User Created ",
            text: "Do you want to continue",
            icon: "success",
            confirmButtonText: "Ok",
          });
          navigate("/login");
        })
        .catch((err) => {
          Swal.fire({
            title: "Invalid email/password ",
            text: "Do you want to continue",
            icon: "error",
            confirmButtonText: "Ok",
          });
        });
    });
  };

  //   console.log(watch("photo"));
  return (
    <Card color="transparent" shadow={false}>
      <Typography variant="h4" color="blue-gray">
        Sign Up
      </Typography>
      <Typography color="gray" className="mt-1 font-normal">
        Nice to meet you! Enter your details to register.
      </Typography>
      <form
        className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="mb-1 flex flex-col gap-6">
          <Typography variant="h6" color="blue-gray" className="-mb-3">
            User Photo
          </Typography>
          <Input
            size="lg"
            placeholder="photo"
            className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
            labelProps={{
              className: "before:content-none after:content-none",
            }}
            {...register("photo", { required: true })}
          />
          {errors.photo && <span>This field is required</span>}
          <Typography variant="h6" color="blue-gray" className="-mb-3">
            Your Name
          </Typography>
          <Input
            size="lg"
            placeholder="name@mail.com"
            className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
            labelProps={{
              className: "before:content-none after:content-none",
            }}
            {...register("name", { required: true })}
          />
          {errors.name && <span>This field is required</span>}

          <Typography variant="h6" color="blue-gray" className="-mb-3">
            Your Email
          </Typography>
          <Input
            size="lg"
            placeholder="name@mail.com"
            className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
            labelProps={{
              className: "before:content-none after:content-none",
            }}
            {...register("email", { required: true })}
          />
          {errors.email && <span>This field is required</span>}

          <Typography variant="h6" color="blue-gray" className="-mb-3">
            Password
          </Typography>
          <Input
            type="password"
            size="lg"
            placeholder="********"
            className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
            labelProps={{
              className: "before:content-none after:content-none",
            }}
            {...register("password", { required: true })}
          />
          {errors.password && <span>This field is required</span>}
        </div>

        <Button type="submit" value="Sign Up" className="mt-6" fullWidth>
          sign up
        </Button>
        <Typography color="gray" className="mt-4 text-center font-normal">
          Already have an account?{" "}
          <Link to="/login" className="font-medium text-gray-900">
            Sign In
          </Link>
        </Typography>
      </form>
    </Card>
  );
};

export default Register;
