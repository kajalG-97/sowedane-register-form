import Paper from "@mui/material/Paper";

import Radio from '@mui/material/Radio';

import FormControlLabel from '@mui/material/FormControlLabel';

import RadioGroup from '@mui/material/RadioGroup';

import Box from "@mui/material/Box";

import { Checkbox, IconButton, Typography } from "@mui/material";

import TextField from "@mui/material/TextField";

import Button from "@mui/material/Button";

import GoogleIcon from "@mui/icons-material/Google";

import FacebookIcon from "@mui/icons-material/Facebook";
import axios from "axios";
import { useState, useEffect } from "react";

import { ToastContainer, toast } from "react-toastify";

import FormLabel from '@mui/material/FormLabel';

import "react-toastify/dist/ReactToastify.css";

import { Link, useNavigate } from "react-router-dom";

import { HomeNav } from "./HomeNav";

import { useDispatch, useSelector } from "react-redux";

import { nanoid } from "nanoid";

import InputLabel from "@mui/material/InputLabel";

import MenuItem from "@mui/material/MenuItem";

import FormControl from "@mui/material/FormControl";

import Select from "@mui/material/Select";

import { registerSuccessData } from "../redux/register/registerAction";

import { getOneUserDetail, userError } from '../redux/user/userAction'

import { useParams } from "react-router-dom";

import { updateUserData } from "../redux/user/userAction"
import { UserCard } from "./UserCard";

export const Profile = () => {
    const navigate = useNavigate();

    const dispatch = useDispatch();

    // const { id } = useParams();
    // console.log('id', id);

    const { user } = useSelector((store) => store.auth);
    // console.log('user', user.user._id);

    useEffect(() => {
        getData();
    }, []);


    const { users } = useSelector((store) => store.user);
    // console.log('users', users);



    const getData = () => {

        axios.get(`https://user-information-project.herokuapp.com/users/${user.user._id}`).then(({ data }) => setData(data))
            .catch((err) => dispatch(userError()));
        dispatch(getOneUserDetail(user.user._id));

    }

    return (
        <>
            <Box
                sx={{
                    display: "flex",
                    flexWrap: "wrap",
                    justifyContent: "space-around",
                    gap: 7,

                    width: "95%",
                    m: 3,
                    mt: "100px",
                }}
            >
                <UserCard event={users} />


            </Box>
            <Box>


                <Button
                    sx={[
                        {
                            boxShadow: "0 1px 4px 0 rgba(40, 44, 63, 0.4)",
                            m: 0,
                            color: "#ffffff",
                            bgcolor: "#ed3b58",
                        },
                        () => ({
                            "&:hover": {
                                color: "#fafafa", bgcolor: "#f36c82"
                            }
                        }),
                    ]}
                    value="desc"
                    onClick={()=> navigate("/editpage")}
                    variant="text"
                >
                    Edit Profile
                </Button>
            </Box>
        </>
    )
}