import React, { useState, useEffect } from "react";
import "./data.css";
import { useNavigate } from "react-router-dom";

export default function Data() {
  const navigate = useNavigate();
  const [table1Data, setTable1Data] = useState([]);
  const [table2Data, setTable2Data] = useState([]);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://www.7ader.net/GeneralApiV11/api/general",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization:
                "bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1bmlxdWVfbmFtZSI6IjQzIiwicm9sZSI6IjEiLCJuYmYiOjE3MDUzMDcwMDAsImV4cCI6MTcwNTMxMDYwMCwiaWF0IjoxNzA1MzA3MDAwfQ.Bq7DWpeKKVoicInuIydfKIzR02efSZOLLPfSr7iW86E",
            },
            body: JSON.stringify({
              ConnectionStringName: "TeleWare",
              StoredProcedureName: "Channel.GetDashboardStat",
              SpParams: {
                adminID: "43",
              },
            }),
          }
        );

        const data = await response.json();

        setTable1Data(data.table1 || []);
        setTable2Data(data.table2 || []);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="container">
      <div className="Rounded">
        <span className="date"> 11-12-2023-12-1-2024</span>
        <svg
          width="16"
          height="9"
          viewBox="0 0 16 9"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            opacity="0.8"
            d="M1 1L8 8L15 0.999998"
            stroke="white"
            strokeWidth="1.4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>

      <table className="table-1">
        <tr>
          <th>اسم القناة</th> <th>المشروع</th> <th>عدد العملاء</th>
          <th>مكسب القناة</th>
        </tr>
        {table1Data.map((item, index) => (
          <tr key={index}>
            <td>{item.Column1}</td> <td>{item.Project}</td>
            <td>{item.UsersCount}</td> <td>{item.Cash}</td>
          </tr>
        ))}
      </table>

      <table className="table-2">
        <tr>
          <th>اسم القناة</th> <th>عدد العملاء</th>
          <th>مكسب القناة</th>
        </tr>
        {table2Data.map((item, index) => (
          <tr key={index}>
            <td>{item.Channel}</td> <td>{item.UsersCount}</td>{" "}
            <td>{item.Cash}</td>
          </tr>
        ))}
      </table>

      <div className="button">
        <button type="button" className="login-button" onClick={handleLogout}>
          تسجيل خروج
        </button>
      </div>
    </div>
  );
}
