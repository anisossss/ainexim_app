import { withStyles } from "arwes";
import { Bar } from "react-chartjs-2";
import "chart.js/auto";

const styles = (theme) => ({});

const getFormattedDate = (date) => {
  const options = { weekday: "short", month: "short", day: "numeric" };
  return new Date(date).toLocaleDateString("en-US", options);
};

const ActiveHours = (props) => {
  const today = new Date();
  const previousDates = Array.from({ length: 6 }, (_, index) => {
    const date = new Date();
    date.setDate(today.getDate() - index - 1);
    return getFormattedDate(date);
  }).reverse();

  const barChartDataDailyPresence = {
    labels: [...previousDates, getFormattedDate(today)],
    datasets: [
      {
        label: "Active Hours",
        fontColor: "blue",
        backgroundColor: "rgba(75,192,192,1)",
        hoverBorderColor: "rgba(2,0,0,1)",
        data: [20, 30, 40, 20, 45, 50, 30],
      },
    ],
  };

  const options = {
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: false,
          },
        },
      ],
      xAxes: [
        {
          ticks: {
          
          },
          options: { 
            legend: {
                labels: {
                    fontColor: "blue",
                    fontSize: 18
                }
            },
          },
        },
      ],
    },
   
  };

  return (
    <Bar
      data={barChartDataDailyPresence}
      options={options}
    />
  );
};

export default withStyles(styles)(ActiveHours);
