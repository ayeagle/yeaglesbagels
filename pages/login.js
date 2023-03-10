import Waves from "@components/pomodomo/Waves";
import Break from '@components/pomodomo/Break';
import Button from "@components/pomodomo/Button";
import NavBar from "@components/bio/navbar";
import BasicPageTop from "@components/bio/BasicPageTop";
import BasicPageBottom from "@components/bio/BasicPageBottom";
import SVGSpacers from "@components/bio/SVGSpacers";
import Resizer from "@components/functional/Resizer";
import { useEffect, useState } from "react";
import PNGSpacers from "@components/bio/PNGSpacers";
import styles from './master.module.css';
import Iceland from "@components/bio/Iceland";
import NavButton from "@components/bio/NavButton";
import Carousel from "@components/bio/Carousel";
import Typing from "@components/bio/Typing";
import Flood from "@components/bio/Flood";
import Flood2 from "@components/bio/Flood2";
import { useSelector, useDispatch } from "react-redux";
import Spacer from "@components/bio/Spacer";
import axios from "node_modules/axios/index";
import LoginWindow from "@components/bio/LoginWindow";
import SignupLogin from "@components/bio/SignupLogin";
import ActualLogin from "@components/bio/ActualLogin";
import UserPreferences from "@components/bio/UserPreferences";


export default function Login({ path = 'choose' }) {
    const [height, updateHeight] = useState(0)
    const [width, updateWidth] = useState(0)
    const dispatch = useDispatch();
    const state = useSelector((state) => state);
    const [limiter, setLimiter] = useState(0)

    const [loginOrSignup, setLoginOrSignUp] = useState(path)

    const [loginExperience, setLoginExperience] = useState(false)

    const route = () => {
        switch (loginOrSignup) {
            case "choose":
                return <SignupLogin setLoginOrSignUp={setLoginOrSignUp} />

            case "login":
                return <ActualLogin setLoginOrSignUp={setLoginOrSignUp} />

            case "sign up":
                return <LoginWindow setLoginOrSignUp={setLoginOrSignUp} />

            case "logged in":
                return <UserPreferences setLoginOrSignUp={setLoginOrSignUp}  />

            default:
                return <SignupLogin setLoginOrSignUp={setLoginOrSignUp} />

        }
    }

    useEffect(() => {

        if (localStorage.getItem('username') != 'null') setLoginOrSignUp('logged in')



    }, [])



    useEffect(() => {
        // Update the height and width state when the component is mounted
        updateHeight(window.innerHeight)
        updateWidth(window.innerWidth)
        console.log("this is the height (useeffect) ==> " + height)
        console.log("this is the width (useeffect) ==> " + width)

        function handleWindowResize() {
            // Update the height and width state when the window is resized
            updateHeight(window.innerHeight)
            updateWidth(window.innerWidth)
        }

        // Add the event listener
        window.addEventListener('resize', handleWindowResize)

        let userId = 20 //document.cookie.substr( document.cookie.indexOf("=")+1, document.cookie.indexOf("=") + 36)
        // let activity = "loading the about page"
        let timestamp = new Date().toISOString()

        // console.log("CLIENT SIDE: session id value is " +userId + " and the type of this is " + typeof(userId))
        // console.log("CLIENT SIDE: activity value is " +activity + " and the type of this is " + typeof(activity))
        // console.log("CLIENT SIDE: timestamp value is " +timestamp + " and the type of this is " + typeof(timestamp))



        if (limiter <= 3) {
            setLimiter(limiter + 1)
            LogActivity(userId, "loaded login page")
        }


        setLoginExperience(route())

        // Clean up the event listener when the component unmounts
        return () => {
            window.removeEventListener('resize', handleWindowResize)
        }
    }, [loginOrSignup])




    return (
        <div className={styles.master}>
            <Flood />
            <BasicPageTop />
            <NavBar />


            <SVGSpacers type="bot" num="2" width={width} />

            <Spacer />
            <Spacer />
            {loginExperience}
            {/* <LoginWindow /> */}
            <Spacer />

            <Spacer />

            <Spacer />


            <SVGSpacers type="top" num="2" width={width} />
            <div className={styles.box}>
                <BasicPageBottom />
            </div>


        </div>
    )
}
