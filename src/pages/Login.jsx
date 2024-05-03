import React, { useContext } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Input,
  Checkbox,
  Button,
} from "@material-tailwind/react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../AuthProvider/AuthProviders";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import axios from "axios";
const Login = () => {
  const { logIn } = useContext(AuthContext);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const location = useLocation();
  // console.log(location)
  const from = location?.state || "/";
  const onSubmit = (data) => {
    const { email, password } = data;
    // console.log(data)
    logIn(email, password)
      .then((result) => {
        if (result.user) {
          Swal.fire({
            title: "Successfully Logged In ",
            text: "Do you want to continue",
            icon: "success",
            confirmButtonText: "Ok",
          });
          navigate(from);
          
          // axios.post('https://movies-server-side.vercel.app/jwt',email)
          // .then(data=>{
          //   console.log(data.data);
          // })
        }
      })
      .catch((err) => {
        console.error(err)
        Swal.fire({
          title: "Try Again! Invalid Credentials",
          text: "Do you want to continue",
          icon: "error",
          confirmButtonText: "Ok",
        });
      });
  };
  return (
    <Card className="w-96">
      <CardHeader
        variant="gradient"
        color="gray"
        className="mb-4 grid h-28 place-items-center"
      >
        <Typography variant="h3" color="white">
          Sign In
        </Typography>
      </CardHeader>
      <CardBody className="flex flex-col gap-4">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <Input
            label="Email"
            size="lg"
            type="email"
            {...register("email", { required: true })}
          />
          <Input
            label="Password"
            size="lg"
            type="password"
            {...register("password", { required: true })}
          />
          <Button type="submit" value="Sign In" variant="gradient" fullWidth>
            Sign In
          </Button>
        </form>
      </CardBody>
      <CardFooter className="pt-0">
        <Typography variant="small" className="mt-6 flex justify-center">
          Don&apos;t have an account?
          <Typography
            as="a"
            href="#signup"
            variant="small"
            color="blue-gray"
            className="ml-1 font-bold"
          >
            <Link to="/register">Sign up</Link>
          </Typography>
        </Typography>
      </CardFooter>
    </Card>
  );
};

export default Login;
