import React, { useEffect } from "react";
import "./Wallet.css";
import AccountBoxRoundedIcon from "@mui/icons-material/AccountBoxRounded";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import CurrencyRupeeSharpIcon from "@mui/icons-material/CurrencyRupeeSharp";
import KeyboardArrowUpSharpIcon from "@mui/icons-material/KeyboardArrowUpSharp";
import KeyboardArrowDownSharpIcon from "@mui/icons-material/KeyboardArrowDownSharp";
import axios from "axios";
import { API } from "../../constants/API";
import Chart from "../Chart/Chart";
import RevenueBox from "../RevenueBox/RevenueBox";

const Wallet = () => {
  const [month, setMonth] = React.useState("current");
  const [balance, setBalance] = React.useState();
  const balance_fetch = async () => {
    const data = await axios.get(`${API.canteen_server}/api/v1/canteen/wallet`);
    // console.log("data", data.data.wallet);
    let bal = data.data.wallet;
    setBalance(bal);
  };
  useEffect(() => {
    balance_fetch();
  }, []);
  return (
    <div className="home-container">
      <div className="top-components">
        <div className="wallet-box">
          <div className="box-left">
            <p className="box-title">USERS</p>
            <p className="box-value">458</p>
            <p className="box-desc">See All Users</p>
          </div>
          <div className="box-right">
            <div className="box-right-top green">
              <KeyboardArrowUpSharpIcon />
              <p>+5%</p>
            </div>
            <div className="box-right-bottom red">
              <AccountBoxRoundedIcon />
            </div>
          </div>
        </div>

        <div className="admin-box box-report">
          <div className="box-left">
            <p className="box-title">MONTHLY REPORT</p>
            {/* <p className="month-name">Month</p> */}
            <select
              value={month}
              onChange={(e) => {
                setMonth(e.target.value);
                console.log(e.target.value);
              }}
              id="month"
              style={{ padding: "5px" }}
            >
              <option value="current">Current</option>
              <option value="prev">Previous</option>
            </select>
            <a
              href={
                month === "prev"
                  ? `${API.canteen_server}/api/v1/canteen/lastMonthReport`
                  : `${API.canteen_server}/api/v1/canteen/thisMonthReport`
              }
            >
              Generate
            </a>
          </div>
        </div>

        <div className="wallet-box">
          <div className="box-left">
            <p className="box-title">WALLET</p>
            <p className="box-value">₹{balance}</p>
            <p className="box-desc">See Total Balance</p>
          </div>
          <div className="box-right">
            <div className="box-right-top green">
              <KeyboardArrowUpSharpIcon />
              <p>+2%</p>
            </div>
            <div className="box-right-bottom green">
              <CurrencyRupeeSharpIcon />
            </div>
          </div>
        </div>
      </div>

      <div className="bottom-components">
        {/* <div className="bottom-left">
          <div className="revenue-box">
            <RevenueBox />
          </div>
        </div> */}
        <div className="bottom-right">
          <p className="box-title">Last 7 Months (income)</p>
          <Chart />
        </div>
      </div>
    </div>
  );
};

export default Wallet;
