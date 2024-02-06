import {
  Words,
  Header as ArwesHeader,
  Highlight,
  withStyles,
  Frame,
  Appear,
} from "arwes";
import { Link } from "react-router-dom";
import Clickable from "../publicComp/Clickable";
import Centered from "../publicComp/Centered";

import { Doughnut } from "react-chartjs-2";
import "chart.js/auto";
const styles = (theme) => ({});

const Progress = (props) => {
  const { classes, ...rest } = props;
  const barChartDataDailyPresence = {
    labels: ["Day 1", "Day 2", "Day 3", "Day 4", "Day 5", "Day 6", "Day 7"],
    datasets: [
      {
        label: "Active Hours",

        backgroundColor: "rgba(75,192,192,1)",
        hoverBorderColor: "rgba(0,0,0,1)",
        data: [20, 30, 40, 20, 45, 50, 30],
      },
    ],
  };
  return (
    <Doughnut
      data={barChartDataDailyPresence}
      options={{
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: true,
              },
            },
          ],
        },
      }}
    />
  );
};

export default withStyles(styles)(Progress);
