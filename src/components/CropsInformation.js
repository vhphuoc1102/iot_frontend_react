import { useParams } from "react-router-dom";
import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { CardHeader } from "@mui/material";
import Divider from "@mui/material/Divider";
import Stack from "@mui/material/Stack";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import { useLocation } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { LineChart } from "@mui/x-charts/LineChart";
import { Line } from "react-chartjs-2";
import "chartjs-plugin-streaming";
import moment from "moment";
import "./Graph.css";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import TableFooter from "@mui/material/TableFooter";
import Grid from "@mui/material/Grid";
import CircleIcon from "@mui/icons-material/Circle";
const CardInfo = ({ name, detail }) => {
  return (
    <Card variant="outlined">
      <React.Fragment>
        <CardHeader title="Thông tin cơ bản" />
        <Divider />
        <CardContent>
          <Typography variant="h7" component="div" gutterBottom>
            Tên: {name}
          </Typography>
          <Typography variant="h7" component="div" gutterBottom>
            Địa điểm: {detail}
          </Typography>
          <Typography variant="h7" component="div" gutterBottom>
            Thời gian: 3 ngày
          </Typography>
        </CardContent>
      </React.Fragment>
    </Card>
  );
};
const CardMonitor = () => {
  return (
    <Card variant="outlined">
      <React.Fragment>
        <CardHeader title="Thông tin giám sát" />
        <Divider />
        <CardContent>
          <Typography variant="h7" component="div" gutterBottom>
            Nhiệt độ: 25 - 30
          </Typography>
          <Typography variant="h7" component="div" gutterBottom>
            Độ ẩm: 30 - 40
          </Typography>
          <Typography variant="h7" component="div" gutterBottom>
            Thời gian mùa vụ: 3 ngày
          </Typography>
          <Typography variant="h7" component="div" gutterBottom>
            Thời gian chiếu sáng: 10h
          </Typography>
        </CardContent>
      </React.Fragment>
    </Card>
  );
};
const CardDashboard = ({ name }) => {
  const [data, setData] = React.useState(null);
  const [deviceStatus, setDeviceStatus] = React.useState({
    led: 0,
    pump: 0,
    mode: 0,
  });
  const [apiCalled, setApiCalled] = React.useState(false);
  const { token } = useAuth();
  const getRealTime = async () => {
    await fetch("http://localhost:8000/v0/get_real_time", {
      method: "POST",
      body: JSON.stringify({
        crop: name,
        token: token,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setData(data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const getDevice = async () => {
    await fetch("http://localhost:8000/v0/get_device_status", {
      method: "POST",
      body: JSON.stringify({
        crop: name,
        token: token,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setDeviceStatus(data.result);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const setLight = async (led) =>
    await fetch("http://localhost:8000/v0/set_light", {
      method: "POST",
      body: JSON.stringify({
        crop: name,
        led: led,
        token: token,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setApiCalled(false);
      })
      .catch((error) => {
        console.log(error);
      });
  const setPump = async (pump) =>
    await fetch("http://localhost:8000/v0/set_pump", {
      method: "POST",
      body: JSON.stringify({
        crop: name,
        pump: pump,
        token: token,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setApiCalled(false);
      })
      .catch((error) => {
        console.log(error);
      });
  const setManual = async () =>
    await fetch("http://localhost:8000/v0/set_manual", {
      method: "POST",
      body: JSON.stringify({
        crop: name,
        token: token,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setApiCalled(false);
      })
      .catch((error) => {
        console.log(error);
      });
  const setAuto = async () =>
    await fetch("http://localhost:8000/v0/set_auto", {
      method: "POST",
      body: JSON.stringify({
        crop: name,
        token: token,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setApiCalled(false);
      })
      .catch((error) => {
        console.log(error);
      });

  React.useEffect(() => {
    // Call the function for the first time
    getRealTime();
    getDevice();

    // Then set up the interval to call the function every 1 seconds
    const interval = setInterval(getRealTime, 1000);
    // const internalDevice = setInterval(getDevice,1000);

    // Clean up the interval on component unmount
    return () => clearInterval(interval);
  }, []);
  React.useEffect(() => {
    if (apiCalled) {
      setLight(deviceStatus.led);
      setPump(deviceStatus.pump);
      if (deviceStatus.mode === 1) setAuto();
      else setManual();
    }
  }, [deviceStatus]);
  const handleSwitchLight = () => {
    setDeviceStatus({
      ...deviceStatus,
      led: deviceStatus.led === 1 ? 0 : 1,
    });
    setApiCalled(true);
  };
  const handleSwitchPump = () => {
    setDeviceStatus({
      ...deviceStatus,
      pump: deviceStatus.pump === 1 ? 0 : 1,
    });
    setApiCalled(true);
  };
  const handleSwitchMode = () => {
    setDeviceStatus({
      ...deviceStatus,
      mode: deviceStatus.mode === 1 ? 0 : 1,
    });
    setApiCalled(true);
  };
  return (
    <Card variant="outlined">
      <React.Fragment>
        <CardHeader title="Bảng điều khiển" action="" />

        <Divider />

        <CardContent>
          <Grid container spacing={2}>
            <Grid item xs={8}>
              <FormGroup>
                <FormControlLabel
                  control={
                    <Switch
                      checked={deviceStatus && deviceStatus.mode === 1}
                      onChange={() => {
                        handleSwitchMode();
                      }}
                    />
                  }
                  label="Chế độ tự động"
                />
                <FormControlLabel
                  control={
                    <Switch
                      checked={deviceStatus && deviceStatus.pump === 1}
                      onChange={() => {
                        // console.log(deviceStatus.pump);
                        handleSwitchPump();
                      }}
                      disabled={deviceStatus && deviceStatus.mode === 0}
                    />
                  }
                  label="Máy bơm nước"
                />
                <FormControlLabel
                  control={
                    <Switch
                      checked={deviceStatus && deviceStatus.led === 1}
                      onChange={() => {
                        // console.log(deviceStatus.pump);
                        handleSwitchLight();
                      }}
                      disabled={deviceStatus && deviceStatus.mode === 0}
                    />
                  }
                  label="Đèn"
                />
              </FormGroup>
            </Grid>
            <Grid item xs={4}>
              <div style={{ display: "flex", gap: "5px" }}>
                <CircleIcon
                  color={
                    data && data.result.state.ledState === 1
                      ? "success"
                      : "error"
                  }
                />{" "}
                <div>Tình trạng đèn</div>
              </div>
              <div style={{ display: "flex", gap: "5px" }}>
                <CircleIcon
                  color={
                    data && data.result.state.pumpState === 1
                      ? "success"
                      : "error"
                  }
                />{" "}
                <div>Tình trạng máy bơm</div>
              </div>
            </Grid>
          </Grid>

          <Typography gutterBottom></Typography>
          <Typography
            variant="h7"
            component="div"
            sx={{ fontWeight: "bold" }}
            gutterBottom
          >
            Nhiệt độ:
          </Typography>
          <Typography variant="h6" component="div" gutterBottom>
            {data && data.result.temperature}
          </Typography>
          <Typography
            variant="h7"
            component="div"
            sx={{ fontWeight: "bold" }}
            gutterBottom
          >
            Độ ẩm:
          </Typography>
          <Typography variant="h6" component="div" gutterBottom>
            {data && data.result.humidity}
          </Typography>
          <Typography
            variant="h7"
            component="div"
            sx={{ fontWeight: "bold" }}
            gutterBottom
          >
            Độ ẩm đất:
          </Typography>
          <Typography variant="h6" component="div" gutterBottom>
            {data && data.result.soil}
          </Typography>
          <Typography
            variant="h7"
            component="div"
            sx={{ fontWeight: "bold" }}
            gutterBottom
          >
            Thời gian mùa vụ:
          </Typography>
          <Typography
            variant="h7"
            component="div"
            sx={{ fontWeight: "bold" }}
            gutterBottom
          >
            Thời gian chiếu sáng: {data && data.result.illuminated_time}
          </Typography>
        </CardContent>
      </React.Fragment>
    </Card>
  );
};
const CardGraph = ({ name }) => {
  const Chart = require("react-chartjs-2").Chart;

  const chartColors = {
    red: "rgb(255, 99, 132)",
    orange: "rgb(255, 159, 64)",
    yellow: "rgb(255, 205, 86)",
    green: "rgb(75, 192, 192)",
    blue: "rgb(54, 162, 235)",
    purple: "rgb(153, 102, 255)",
    grey: "rgb(201, 203, 207)",
  };

  const color = Chart.helpers.color;
  const data = {
    datasets: [
      {
        label: "Temperature (",
        backgroundColor: color(chartColors.red).alpha(0.5).rgbString(),
        borderColor: chartColors.red,
        fill: false,
        lineTension: 0,
        borderDash: [8, 4],
        data: [],
      },
      {
        label: "Humidity",
        backgroundColor: color(chartColors.green).alpha(0.5).rgbString(),
        borderColor: chartColors.green,
        fill: false,
        lineTension: 0,
        borderDash: [8, 4],
        data: [],
      },
      {
        label: "Soil",
        backgroundColor: color(chartColors.purple).alpha(0.5).rgbString(),
        borderColor: chartColors.purple,
        fill: false,
        lineTension: 0,
        borderDash: [8, 4],
        data: [],
      },
    ],
  };

  const options = {
    elements: {
      line: {
        tension: 0.5,
      },
    },
    scales: {
      xAxes: [
        {
          type: "realtime",
          distribution: "linear",
          realtime: {
            onRefresh: function (chart) {
              getRealTime(chart);
            },
            delay: 3000,
            time: {
              displayFormat: "h:mm",
            },
          },
          ticks: {
            displayFormats: 1,
            maxRotation: 0,
            minRotation: 0,
            stepSize: 1,
            maxTicksLimit: 20,
            minUnit: "second",
            source: "auto",
            autoSkip: true,
            callback: function (value) {
              return moment(value, "HH:mm:ss").format("hh:mm:ss");
            },
          },
        },
      ],
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
            max: 50,
          },
        },
      ],
    },
  };
  const { token } = useAuth();
  const getRealTime = async (chart) => {
    await fetch("http://localhost:8000/v0/get_real_time", {
      method: "POST",
      body: JSON.stringify({
        crop: name,
        token: token,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        chart.data.datasets[0].data.push({
          x: moment(),
          y: data.result.temperature,
        });
        chart.data.datasets[1].data.push({
          x: moment(),
          y: data.result.humidity,
        });
        chart.data.datasets[2].data.push({
          x: moment(),
          y: data.result.soil,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <Card variant="outlined">
      <React.Fragment>
        <CardHeader title="Biểu đồ" />
        <Divider />
        <CardContent>
          <div className="graph">
            <Line data={data} options={options} />
          </div>
        </CardContent>
      </React.Fragment>
    </Card>
  );
};
const CardHistory = ({ name }) => {
  function createData(
    createAt,
    ledState,
    pumpState,
    humidity,
    night,
    soil,
    temp
  ) {
    return { createAt, ledState, pumpState, humidity, night, soil, temp };
  }
  const [rows, setRows] = React.useState([]);
  const { token } = useAuth();
  const getData = async () => {
    await fetch("http://localhost:8000/v0/get_data", {
      method: "POST",
      body: JSON.stringify({
        crop: name,
        token: token,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setRows(
          data.data
            .map((item) =>
              createData(
                item.createAt,
                item.state.ledState,
                item.state.pumpState,
                item.humidity,
                item.night,
                item.soil,
                item.temperature
              )
            )
            .reverse()
        );
      })
      .catch((error) => {
        console.log(error);
      });
  };
  React.useEffect(() => {
    getData();
  }, []);

  return (
    <Card variant="outlined">
      <React.Fragment>
        <CardHeader title="Lịch sử" />
        <Divider />
        <CardContent>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Create At</TableCell>
                  <TableCell>Led state</TableCell>
                  <TableCell>Pump state</TableCell>
                  <TableCell>Humidity</TableCell>
                  <TableCell>Night</TableCell>
                  <TableCell>Soil</TableCell>
                  <TableCell>Temperature</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row) => (
                  <TableRow
                    key={row.name}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {row.createAt}
                    </TableCell>
                    <TableCell>{row.ledState}</TableCell>
                    <TableCell>{row.pumpState}</TableCell>
                    <TableCell>{row.humidity}</TableCell>
                    <TableCell>{row.night}</TableCell>
                    <TableCell>{row.soil}</TableCell>
                    <TableCell>{row.temp}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
              <TableFooter>
                <div style={{ padding: "10px" }}>
                  <Button variant="contained" onClick={() => getData()}>
                    Reload
                  </Button>
                </div>
              </TableFooter>
            </Table>
          </TableContainer>
        </CardContent>
      </React.Fragment>
    </Card>
  );
};
export default function CropsInformation() {
  const { state } = useLocation();
  const { item } = state;
  return (
    <Stack spacing={2} sx={{ minWidth: 800 }}>
      <div></div>
      <CardInfo name={`${item.name}`} detail={`${item.detail}`} />
      <CardMonitor />
      <CardHistory name={`${item.name}`} />
      <CardGraph name={`${item.name}`} />
      <CardDashboard name={`${item.name}`} />
    </Stack>
  );
}
