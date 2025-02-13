import React, { useState, useRef, useEffect } from "react";
import { ThemeProvider, createTheme } from '@mui/material/styles';
import MenuBar from './MenuBar';
import ThemeToggle from "./Components/ThemeToggle.js";
import MapSection from "./Components/1_MapSection.js";
import BottomSection from "./Components/1_BottomSection.js";
import { loadCsvData, loadDroneData } from "./Components/1_DataLoader.js";

import "./Styles/1_Mainpage.css";

import Header from './Components/Header.js'; // 헤더 통일

const theme = createTheme();

function MainPage() {
    const [csvData, setCsvData] = useState([]); // CSV 데이터 저장
    const [droneData, setDroneData] = useState([]); // 드론 데이터 저장
    const [filterID, setFilterID] = useState([]); // 표시할 Clebine 및 Drone ID 관리
    const mapSectionRef = useRef(null); // MapSection에 대한 참조
    const [isDarkMode, setIsDarkMode] = useState(false); // 다크 모드 상태 감지

    // 다크 모드 상태 감지
    useEffect(() => {
        const handleDarkModeChange = () => {
            setIsDarkMode(document.body.classList.contains('dark-mode'));
        };

        handleDarkModeChange(); // 초기 다크 모드 상태 확인
        const observer = new MutationObserver(handleDarkModeChange);
        observer.observe(document.body, { attributes: true, attributeFilter: ['class'] });

        return () => observer.disconnect();
    }, []);

    const reposition = (type, id) => {
        console.log("reposition 함수 호출:", type, id);
        if (mapSectionRef.current && mapSectionRef.current.reposition) {
            mapSectionRef.current.reposition(type, id);
        } else {
            console.error("reposition 함수가 정의되지 않았습니다.");
        }
    };
    useEffect(() => {
        const fetchData = async () => {
            try {
                // CSV 데이터 로드
                const csv = await loadCsvData("/mockup.csv");
                setCsvData(csv);

                // 드론 데이터 로드
                const drone = await loadDroneData();
                setDroneData(drone);
            } catch (error) {
                console.error("데이터 로드 실패:", error);
            }
        };

        fetchData();
    }, []);


    // Visibility 토글
    const toggleFilterID = (type, id) => {
        const targetID = `${type}-${id}`;
        setFilterID((prev) =>
            prev.includes(targetID)
                ? prev.filter((item) => item !== targetID)
                : [...prev, targetID]
        );
    };


    const turnOnButton = (type) => {
        const allIDs =
            type === "clebine"
                ? csvData.map((row) => `clebine-${row.ID}`)
                : droneData.map((drone) => `drone-${drone.droneId}`);
        setFilterID((prev) => [...new Set([...prev, ...allIDs])]);
    };
    const turnOffButton = (type) => {
        setFilterID((prev) =>
            type === "clebine"
                ? prev.filter((id) => !id.startsWith("clebine-"))
                : prev.filter((id) => !id.startsWith("drone-"))
        );
    };

    // 모든 ID를 기본적으로 filterID에 추가
    useEffect(() => {
        console.log("droneData:", droneData);
        if (csvData.length > 0 || droneData.length > 0) {
            const allIDs = [
                ...csvData.map((row) => `clebine-${row.ID}`),
                ...droneData.map((drone) => `drone-${drone.droneId}`),
            ];
            setFilterID(allIDs); // filterID를 모든 ID로 초기화
        }
    }, [csvData, droneData]);

    return (
        <ThemeProvider theme={theme}>
            <div id="mainDiv">
                <header className="header">
                    <a href="https://turbinecrew.co.kr/" target="_blank" rel="noopener noreferrer">
                        <img
                            alt="Flow"
                        />
                    </a>
                    <MenuBar />
                </header>
                {/*<Header /> 헤더 통일해야할 때 해당 부분 사용*/} 

                <hr className="custom_hr" />

                <main className="main-content">
                    {/* Map Section */}
                    <MapSection
                        filterID={filterID}
                        setFilterID={setFilterID}
                        csvData={csvData}
                        droneData={droneData}
                        ref={mapSectionRef}
                        isDarkMode={isDarkMode}
                    />
                    <BottomSection
                        csvData={csvData}
                        droneData={droneData}
                        toggleFilterID={toggleFilterID}
                        filterID={filterID}
                        turnOnButton={turnOnButton}
                        turnOffButton={turnOffButton}
                        reposition={reposition}
                        isDarkMode={isDarkMode}
                    />

                </main>

                <ThemeToggle/>
            </div>
        </ThemeProvider>
    );
}

export default MainPage;
