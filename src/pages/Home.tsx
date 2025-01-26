import type React from "react"
import { ThemeProvider } from "@mui/material/styles"
import {
  CssBaseline,
  AppBar,
  Toolbar,
  Typography,
  Button,
  Container,
  Box,
  Grid,
  Card,
  CardContent,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material"
import AttachMoneyIcon from "@mui/icons-material/AttachMoney"
import SecurityIcon from "@mui/icons-material/Security"
import SpeedIcon from "@mui/icons-material/Speed"
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline"
import theme from "./theme"
import { useNavigate } from "react-router-dom"

enum LoanCategory {
  WEDDING = "Wedding",
  HOME_CONSTRUCTION = "Home Construction",
  BUSINESS_STARTUP = "Business Startup",
  EDUCATION = "Education",
}

const HomePage: React.FC = () => {

  const router = useNavigate()

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static" color="primary">
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              LoanCare
            </Typography>
            <Button color="inherit">Home</Button>
            <Button color="inherit">About</Button>
            <Button color="inherit">Services</Button>
            <Button color="inherit">Contact</Button>
          </Toolbar>
        </AppBar>

        <Box
          sx={{
            bgcolor: "background.paper",
            pt: 8,
            pb: 6,
          }}
        >
          <Container maxWidth="sm">
            <Typography component="h1" variant="h2" align="center" color="text.primary" gutterBottom>
              Welcome to LoanCare
            </Typography>
            <Typography variant="h5" align="center" color="text.secondary" paragraph>
              We provide affordable loans to help you achieve your financial goals. Our mission is to support your
              welfare and financial well-being.
            </Typography>
            <Box sx={{ mt: 4, display: "flex", justifyContent: "center" }}>
              <Button onClick={()=>router('/loan/application')} variant="contained" color="primary" size="large">
                Apply Now
              </Button>
            </Box>
          </Container>
        </Box>

        <Container sx={{ py: 8 }} maxWidth="md">
          <Typography variant="h4" align="center" color="text.primary" gutterBottom>
            Our Loan Categories
          </Typography>
          <Grid container spacing={4} justifyContent="center">
            <Grid item xs={12} md={8}>
              <Card>
                <CardContent>
                  <List>
                    {Object.values(LoanCategory).map((category) => (
                      <ListItem key={category}>
                        <ListItemIcon>
                          <CheckCircleOutlineIcon color="primary" />
                        </ListItemIcon>
                        <ListItemText primary={category} />
                      </ListItem>
                    ))}
                  </List>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Container>

        <Container sx={{ py: 8 }} maxWidth="md">
          <Typography variant="h4" align="center" color="text.primary" gutterBottom>
            Why Choose Us
          </Typography>
          <Grid container spacing={4}>
            {[
              {
                icon: <AttachMoneyIcon />,
                title: "Competitive Rates",
                description: "We offer some of the most competitive interest rates in the market.",
              },
              {
                icon: <SecurityIcon />,
                title: "Secure Process",
                description: "Your data and transactions are protected with state-of-the-art security.",
              },
              {
                icon: <SpeedIcon />,
                title: "Fast Approval",
                description: "Get your loan approved quickly with our streamlined process.",
              },
            ].map((feature, index) => (
              <Grid item key={index} xs={12} sm={6} md={4}>
                <Card sx={{ height: "100%", display: "flex", flexDirection: "column", alignItems: "center", p: 2 }}>
                  <Box sx={{ m: 2, color: "primary.main" }}>{feature.icon}</Box>
                  <CardContent sx={{ flexGrow: 1, textAlign: "center" }}>
                    <Typography gutterBottom variant="h5" component="h2">
                      {feature.title}
                    </Typography>
                    <Typography>{feature.description}</Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>

        <Box sx={{ bgcolor: "background.paper", p: 6 }} component="footer">
          <Typography variant="h6" align="center" gutterBottom>
            LoanCare
          </Typography>
          <Typography variant="subtitle1" align="center" color="text.secondary" component="p">
            Empowering your financial future
          </Typography>
          <Typography variant="body2" color="text.secondary" align="center">
            {"Copyright © "}
            LoanCare {new Date().getFullYear()}
            {"."}
          </Typography>
        </Box>
      </Box>
    </ThemeProvider>
  )
}

export default HomePage

