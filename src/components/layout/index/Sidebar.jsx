import React, { useState } from "react";
import { Frame, Button, Appear, Words, Col } from "arwes";
import { NavLink, useLocation } from "react-router-dom";
import { MdDashboard } from "react-icons/md";
import { FaTasks } from "react-icons/fa";
import { GrAchievement } from "react-icons/gr";
import { MdOutlineRoomPreferences } from "react-icons/md";
import { FaRegBuilding } from "react-icons/fa";
import { MdOutlineFreeBreakfast } from "react-icons/md";
import { MdDeveloperMode } from "react-icons/md";
import { RiAdminLine } from "react-icons/ri";
import { MdMeetingRoom } from "react-icons/md";
import { MdOutlineSupport } from "react-icons/md";
import { TbDeviceImacSearch } from "react-icons/tb";
import { RiUserSettingsLine } from "react-icons/ri";

const Sidebar = () => {
  const location = useLocation();
  const isActiveRoute = (route) => {
    return location.pathname === route;
  };
  const SidebarItem = ({ title, icon, children }) => {
    const [isActive, setIsActive] = useState(false);

    const handleDropdownToggle = () => {
      setIsActive(!isActive);
    };

    return (
      <Frame className="sidebar-item">
        <Button
          className={`sidebar-button ${isActive ? "highlighted" : ""}`}
          onClick={handleDropdownToggle}
        >
          <div style={{ display: "flex", alignItems: "center" }}>
            {icon}
            <Words>{title}</Words>{" "}
          </div>
          <div style={{ display: "flex", alignItems: "center" }}></div>
        </Button>
        <div className={`sidebar-dropdown ${isActive ? "active" : ""}`}>
          {children}
        </div>
      </Frame>
    );
  };

  return (
    <Appear className="sidebar">
      <Frame>
        <div className="sidebar-item">
          <NavLink to="/dashboard" isActive={() => isActiveRoute("/dashboard")}>
            <Button className="sidebar-button">
              <div style={{ display: "flex", alignItems: "center" }}>
                <MdDashboard />
                <Words> Dashboard</Words>
              </div>
            </Button>
          </NavLink>
        </div>
      </Frame>
      <Frame>
        <div className="sidebar-item">
          <NavLink to="/current-tasks">
            <Button className="sidebar-button">
              <div style={{ display: "flex", alignItems: "center" }}>
                <FaTasks />
                <Words> Current Tasks</Words>
              </div>
            </Button>
          </NavLink>
        </div>
      </Frame>
      <Frame>
        <div className="sidebar-item">
          <NavLink to="/achievements">
            <Button className="sidebar-button">
              <div style={{ display: "flex", alignItems: "center" }}>
                <GrAchievement />
                <Words> Achievements</Words>
              </div>
            </Button>
          </NavLink>
        </div>
      </Frame>
      <SidebarItem
        title="Preferences"
        icon={<MdOutlineRoomPreferences size={20} />}
      >
        <NavLink to="/profile-settings">
          <Button className="sidebar-button">
            <div className="sidebar-list">
              <RiUserSettingsLine />
              <Words> Profile Settings</Words>
            </div>
          </Button>
        </NavLink>

        <NavLink to="/world/mentor">
          <Button className="sidebar-button">
            <div className="sidebar-list">
              <MdOutlineSupport />
              <Words>Mentoring Support</Words>
            </div>
          </Button>
        </NavLink>
      </SidebarItem>
      <SidebarItem title="Departments" icon={<FaRegBuilding />}>
        <NavLink to="/world/departments/web-development-department">
          <Button className="sidebar-button">
            <div className="sidebar-list">
              <MdDeveloperMode />
              <Words>Web Development</Words>{" "}
            </div>
          </Button>
        </NavLink>
        <NavLink to="/world/departments/administration">
          <Button className="sidebar-button">
            <div className="sidebar-list">
              <RiAdminLine />
              <Words>HR & Administration</Words>
            </div>
          </Button>
        </NavLink>

        <NavLink to="/world/departments/training-center">
          <Button className="sidebar-button">
            <div className="sidebar-list">
              <TbDeviceImacSearch />
              <Words>Training Center</Words>
            </div>
          </Button>
        </NavLink>
        <NavLink to="/world/departments/conference-rooms">
          <Button className="sidebar-button">
            <div className="sidebar-list">
              <MdMeetingRoom />
              <Words>Conference rooms</Words>
            </div>
          </Button>
        </NavLink>
        <NavLink to="/world/departments/recreation">
          <Button className="sidebar-button">
            <div className="sidebar-list">
              <MdOutlineFreeBreakfast />
              <Words>Cafeteria & Recreation</Words>
            </div>
          </Button>
        </NavLink>
      </SidebarItem>
    </Appear>
  );
};

export default Sidebar;
