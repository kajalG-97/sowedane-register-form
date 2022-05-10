import Paper from "@mui/material/Paper";

import Radio from '@mui/material/Radio';

import FormControlLabel from '@mui/material/FormControlLabel';

import RadioGroup from '@mui/material/RadioGroup';

import Box from "@mui/material/Box";

import { Checkbox, IconButton, Typography } from "@mui/material";

import TextField from "@mui/material/TextField";

import Button from "@mui/material/Button";

import axios from "axios";
import { useState ,useEffect} from "react";

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

import { getOneUserDetail,userError } from '../redux/user/userAction'

import { useParams } from "react-router-dom";

import { updateUserData } from "../redux/user/userAction"



export const EditInfo = () => {

    const navigate = useNavigate();

    const dispatch = useDispatch();

    // const { id } = useParams();
    

    const { user } = useSelector((store) => store.auth);
  

    useEffect(() => {
        getData();
    }, []);


    const { users } = useSelector((store) => store.user);
  
    const [data, setData] = useState({});
 
    const getData = () => {

        axios.get(`https://user-information-project.herokuapp.com/users/${user.user._id}`).then(({ data }) => setData(data))
            .catch((err) => dispatch(userError()));
        dispatch(getOneUserDetail(user.user._id));

    }

    const getformData = (e) => {

        let { id, value } = e.target;

        setData({ ...data, [id]: value });

    };



    const handleRadio = (e) => {

        setData({ ...data, gender: e.target.value });

    }


    const handleChangeCityOption = (e) => {
        setData({ ...data, city: e.target.value });
    }

    const registerHandler = (e) => {


        e.preventDefault();
       
        dispatch(updateUserData(data,user.user._id, toast, navigate));
        
    };



    const cityOption = ["Pune", "Mumbai", "Delhi", "Bangalore", "Hyderabad", "Amritser", "Chennai", "Kolkata"];

   

    const { firstName,
        lastName,
        email,
    
        date_of_birth,
        gender,
       
        mobile,
        city } = data;
//  console.log('gender', gender);
    // return loding ? <img src="https://miro.medium.com/max/1400/1*CsJ05WEGfunYMLGfsT2sXA.gif" /> : error ? <img src="https://cdn.dribbble.com/users/2469324/screenshots/6538803/comp_3.gif" alt="Oops something went wrong" /> : (
    return (
        <>

            <Box style={{ backgroundColor: "#ebe7ff", height: "760px", marginTop: 0 }}
                sx={{
                    display: "flex",
                    flexWrap: "wrap",
                    "& > :not(style)": {
                        m: 1,
                        width: 450,
                        height: 550,
                    },
                    justifyContent: "center",
                    marginTop: "20px",
                    paddingTop: "65px"
                }}
                component="form"
                noValidate
                autoComplete="off"
            >
                <Paper
                    elevation={3}
                    sx={{ padding: "30px", display: "flex", flexDirection: "column" }}
                >
                    <Typography
                        variant="h3"
                        sx={{ fontSize: "25px", fontWeight: "bold", marginBottom: "20px" }}
                    >
                        Edit your Profile
                    </Typography>
                    <Box sx={{ display: "flex", gap: "10px" }}>
                        <TextField
                            id="firstName"
                            // label="First Name"
                            variant="outlined"
                            value = {firstName}
                            sx={{ marginBottom: "25px" }}
                            onChange={getformData}
                        />
                        <TextField
                            id="lastName"
                            // label="Last Name"
                            variant="outlined"
                            value={lastName}
                            sx={{ marginBottom: "25px" }}
                            onChange={getformData}
                        />

                    </Box>
                    <TextField
                        id="email"
                        // label="Email"
                        value = {email}
                        variant="outlined"
                        sx={{ marginBottom: "25px" }}
                        onChange={getformData}
                    />
                    <Box sx={{ display: "flex", justifyContent: "space-between", m: "auto", mb: 2, width: "100%" }}>
                        <Box sx={{ border: 0, ml: 1 }} >
                            <FormLabel id="demo-row-radio-buttons-group-label" sx={{ border: 0, ml: -15 }}>Gender</FormLabel>
                            
                            
                            <RadioGroup row
                                aria-labelledby="demo-row-radio-buttons-group-label"
                                name="row-radio-buttons-group" defaultValue={gender}>
                                <FormControlLabel onChange={handleRadio} id="male" value="male"  control={<Radio color="secondary" />} label="male" />
                                <FormControlLabel onChange={handleRadio} id="female" value="female" control={<Radio color="secondary" />} label="female" />
                            </RadioGroup>
                        </Box>
                        <Box>
                            <FormControl variant="standard" sx={{ m: 1, minWidth: 170 }}>
                                <InputLabel
                                    sx={[
                                        {
                                            color: "#202020",
                                        },
                                        () => ({ "&:hover": { color: "#202020", bgcolor: "#474747" } }),
                                    ]}
                                    id="demo-simple-select-standard-label"
                                >
                                    Select City
                                </InputLabel>
                                <Select
                                    labelId="demo-simple-select-standard-label"
                                    id="demo-simple-select-standard"
                                    value={city}
                                    onChange={handleChangeCityOption}
                                    label="City"
                                    sx={{
                                        width: "100%",

                                        border: "1px solid #b1b1b1",
                                        borderRadius: "5px",
                                        marginBottom: "-6px",
                                        fontSize: "15px",
                                        color: "#888888",
                                    }}
                                >

                                    {cityOption &&
                                        cityOption.map((e) => {
                                            return (
                                                <MenuItem
                                                    key={e}

                                                    id={e}
                                                    value={e}
                                                >
                                                    {e}
                                                </MenuItem>
                                            );

                                        })}
                                </Select>
                            </FormControl>
                        </Box>
                    </Box>

                    <Box sx={{ display: "flex", gap: 1, justifyContent: "space-between", m: "auto", width: "100%" }}>

                        <TextField
                            id="mobile"
                            // label="Mobile Number"
                            value={mobile}
                            variant="outlined"
                            sx={{ marginBottom: "25px" }}
                            onChange={getformData}
                        />
                      
                        <TextField
                            id="date_of_birth" type="Date"
                            // label="Date"
                            value={date_of_birth}
                            variant="outlined"
                            sx={{ marginBottom: "35px" }}
                            onChange={getformData}
                        />
                    </Box>

                  

                    <Button
                        variant="contained"
                        sx={{ backgroundColor: "#572afb", color: "white " }}
                        onClick={registerHandler}
                    >
                       Submit account
                    </Button>
                    
                   
                </Paper>
            </Box>

            <ToastContainer />
        </>
    );

};

