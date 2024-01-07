import * as React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import { Navigate, Outlet } from "react-router-dom";
import CardActions from "@mui/material/CardActions";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { CardHeader } from "@mui/material";
import TextField from "@mui/material/TextField";
import { redirect } from "react-router-dom";
import {
  createBrowserRouter,
  RouterProvider,
  useNavigate,
} from "react-router-dom";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

function BasicModal({ open, handleClose }) {
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("testing");
  };
  return (
    <div>
      <Modal open={open} onClose={handleClose}>
        <Box component="form" onSubmit={handleSubmit}>
          <Card sx={style}>
            <CardHeader title="Thêm cây trồng" />
            <CardContent>
              <Stack spacing={2}>
                <TextField label="Name" variant="outlined" />
                <TextField label="Price" variant="outlined" />
                <TextField
                  label="Detail"
                  multiline
                  maxRows={4}
                  variant="outlined"
                />
              </Stack>
            </CardContent>
            <CardActions>
              <Button type="submit" size="small">
                Đăng ký
              </Button>
              <Button size="small" onClick={() => handleClose()}>
                Cancel
              </Button>
            </CardActions>
          </Card>
        </Box>
      </Modal>
    </div>
  );
}

export default function Crops() {
  const [open, setOpen] = React.useState(false);
  const [data, setData] = React.useState(null);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [redirect, setRedirect] = React.useState(false);
  const handleRedirect = (event) => {
    event.preventDefault();
    setRedirect(true);
  };
  React.useEffect(() => {
    fetch("http://localhost:8000/v0/get_list_product")
      .then((response) => response.json())
      .then((data) => setData(data))
      .catch((error) => {
        console.log(error);
      });
  }, []);
  return (
    <>
      <BasicModal open={open} handleClose={handleClose} />
      <Stack direction="row" spacing={2}>
        <List
          sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
        >
          <ListItem alignItems="flex-start">
            <Button
              variant="outlined"
              onClick={handleOpen}
              startIcon={<AddIcon />}
            >
              Create
            </Button>
          </ListItem>
          <Divider variant="inset" component="li" />
          {data ? (
            data.items.map((item) => (
              <Box
                component="form"
                onSubmit={(event) => {
                  handleRedirect(event);
                }}
              >
                {redirect && (
                  <Navigate
                    to={`${item.id}`}
                    state={{ item: item }}
                    replace={true}
                  />
                )}
                <ListItem
                  onClick={() => {
                    console.log("Test");
                  }}
                  alignItems="flex-start"
                >
                  <ListItemAvatar>
                    <Avatar
                      alt="Remy Sharp"
                      src="/static/images/avatar/1.jpg"
                      variant="square"
                    />
                  </ListItemAvatar>
                  <ListItemText
                    primary={`Tên: ${item.name}`}
                    secondary={
                      <React.Fragment>
                        <Stack>
                          <Typography
                            sx={{ display: "inline" }}
                            component="span"
                            variant="body2"
                            color="text.primary"
                          >
                            Địa điểm: {item.detail}
                          </Typography>
                          <Typography
                            sx={{ display: "inline" }}
                            component="span"
                            variant="body2"
                            color="text.primary"
                          >
                            Ngày: 16/12/2023 - 20/12/2023
                          </Typography>
                        </Stack>
                      </React.Fragment>
                    }
                  />
                  <Button type="submit" variant="outlined" size="small">
                    More Info
                  </Button>
                </ListItem>
                <Divider variant="inset" component="li" />
              </Box>
            ))
          ) : (
            <p>Loading...</p>
          )}
        </List>
        <Divider orientation="vertical" flexItem />
        <Outlet></Outlet>
      </Stack>
    </>
  );
}
