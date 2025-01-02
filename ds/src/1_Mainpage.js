import React, { useState } from "react";
import "./Styles/App.css";
import "react-toastify/dist/ReactToastify.css";
import { ThemeProvider, createTheme } from '@mui/material/styles';
import MenuBar from './MenuBar.js';
import FlowLogo from './Styles/image/flow_noname_image.png';
import ThemeToggle from "./Components/ThemeToggle.js";
import MapComponent from './Components/MainMapComponent.js';
import flowImage from './Styles/images/dark_logo.png';

const theme = createTheme();

function Main() {

    const [markers, setMarkers] = useState([]); // 마커 상태 추가

    // 마커 추가 함수
    const addMarker = (lat, lng) => {
        setMarkers((prevMarkers) => [
            ...prevMarkers,
            { id: prevMarkers.length + 1, lat, lng }
        ]);
    };


    return (
        <ThemeProvider theme={theme}>
            <div id="mainDiv">
                <header className="header">

                    <a href="https://turbinecrew.co.kr/" target="_blank" rel="noopener noreferrer">
                        <img
                            src={flowImage}
                            alt="Flow" 
                            style={{ width: '450px', height: 'auto' }} 
                        />
                    </a>


                    {/* 메뉴바 */}
                    <MenuBar />
                </header>

                <hr className="custom_hr" />

                {/* Add the map component */}
                <main className="main-content">
                    <MapComponent addMarker={addMarker} /> {/* addMarker prop 전달 */}
                </main>



                <img src={`${process.env.PUBLIC_URL}/컴포지션 1.gif`} alt="Turbine Planner" style={{backgroundColor:"none"}}/>
                <ThemeToggle />
            </div>
        </ThemeProvider>
    );
}

export default Main;
