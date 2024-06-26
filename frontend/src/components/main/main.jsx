import {
  Box,
  Container,
  IconButton,
  Rating,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import { useState } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import AddShoppingCartOutlinedIcon from "@mui/icons-material/AddShoppingCartOutlined";
import Dialog from "@mui/material/Dialog";
import { Close } from "@mui/icons-material";
import ProductDetails from "./ProductDetails";
import { useGetproductByNameQuery } from "../../Redux/pokemon";

const Main = () => {
  const theme = useTheme();
  const [open, setOpen] = useState(false);

  const handleAlignment = (event, newValue) => {
    setmyData(newValue)
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const allProductsAPI = "products?populate=*";
  const menCategoryAPI =
    "products?populate=*&filters[productCategory][$eq]=Men";
  const womenCategoryAPI =
    "products?populate=*&filters[productCategory][$eq]=Women";

    const [myData, setmyData] = useState(allProductsAPI)
  const { data, error, isLoading } = useGetproductByNameQuery(myData);

  if (error) {
    <Typography variant="h6">
      Error :{" "}
      {
        // @ts-ignore
        error.message
      }
    </Typography>;
  }

  if (isLoading) {
    <Typography variant="h6">LOADING...............</Typography>;
  }

  if (data) {
    return (
      <Container sx={{ py: 9 }}>
        <Stack
          direction={"row"}
          alignItems={"center"}
          justifyContent={"space-between"}
          flexWrap={"wrap"}
          gap={3}
        >
          <Box>
            <Typography variant="h6">Selected Products</Typography>
            <Typography fontWeight={300} variant="body1">
              All our new arrivals in a exclusive brand selection
            </Typography>
          </Box>

          <ToggleButtonGroup
            value={myData}
            exclusive
            onChange={handleAlignment}
            aria-label="text alignment"
            sx={{
              ".Mui-selected": {
                border: "1px solid rgba(233, 69, 96, 0.5) !important",
                color: `${theme.palette.error.main} !important`,
                backgroundColor: "initial !important",
              },
            }}
          >
            <ToggleButton
              className="myButton"
              value={allProductsAPI}
              aria-label="left aligned"
              // @ts-ignore
              sx={{ color: theme.palette.text.primary }}
            >
              All Products
            </ToggleButton>
            <ToggleButton
              className="myButton"
              value={menCategoryAPI}
              aria-label="centered"
              sx={{
                mx: "16px !important",
                // @ts-ignore
                color: theme.palette.text.primary,
              }}
            >
              Men category
            </ToggleButton>
            <ToggleButton
              className="myButton"
              value={womenCategoryAPI}
              aria-label="right aligned"
              // @ts-ignore
              sx={{ color: theme.palette.text.primary }}
            >
              Women category
            </ToggleButton>
          </ToggleButtonGroup>
        </Stack>

        <Stack
          alignItems={"center"}
          direction={"row"}
          flexWrap={"wrap"}
          justifyContent={"space-between"}
        >
          {data.data.map((item) => {
            return (
              <Card
                key={item}
                sx={{
                  maxWidth: 333,
                  mt: 6,
                  ":hover .MuiCardMedia-root": {
                    scale: "1.1",
                    transition: "0.35s",
                    rotate: "1deg",
                  },
                }}
              >
                <CardMedia
                  sx={{ height: 277 }}
                  // @ts-ignore
                  image={`${import.meta.env.VITE_BASE_URL}${
                    item.attributes.productImg.data[0].attributes.url
                  }`}
                  title="green iguana"
                />

                <CardContent>
                  <Stack
                    alignItems={"center"}
                    direction={"row"}
                    justifyContent={"space-between"}
                  >
                    <Typography gutterBottom variant="h6" component="div">
                      {item.attributes.productTitle}
                    </Typography>
                    <Typography variant="subtitle2" component={"p"}>
                      {item.attributes.productPrice}
                    </Typography>
                  </Stack>

                  <Typography variant="body2" color="text.secondary">
                    {item.attributes.productDescription}
                  </Typography>
                </CardContent>

                <CardActions sx={{ justifyContent: "space-between" }}>
                  <Button
                    onClick={handleClickOpen}
                    sx={{ transform: "capitalize" }}
                    size="large"
                  >
                    <AddShoppingCartOutlinedIcon
                      sx={{ mr: 1 }}
                      fontSize="small"
                    />
                    add to cart
                  </Button>
                  <Rating
                    precision={0.1}
                    name="read-only"
                    value={item.attributes.DescriptionRating}
                    readOnly
                  />{" "}
                </CardActions>
              </Card>
            );
          })}
        </Stack>

        <Dialog
          sx={{ ".MuiPaper-root": { minWidth: { xs: "100%", md: 800 } } }}
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <IconButton
            sx={{
              ":hover": { rotate: "180deg", transition: "0.3s", color: "red" },
              position: "absolute",
              right: 8,
              top: 0,
            }}
            onClick={handleClose}
          >
            <Close />
          </IconButton>

          <ProductDetails />
        </Dialog>
      </Container>
    );
  }
};

export default Main;
