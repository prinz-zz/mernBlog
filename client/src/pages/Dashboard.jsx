import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import DSidebar from "../components/DSidebar";
import DProfile from "../components/DProfile";

export default function Dashboard() {
  const location = useLocation();
  const [tab, setTab] = useState("");

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get("tab");
    if (tabFromUrl) {
      setTab(tabFromUrl);
    }
  }, [location.search]);

  return (
    <>
      <div className="min-h-screen flex flex-col md:flex-row">
        <div>
        <DSidebar />
        </div>
        {tab === "profile" && <DProfile />}
      </div>
    </>
  );
}
