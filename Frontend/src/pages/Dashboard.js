import React, { useEffect, useState } from "react";
import { AppBar, Toolbar, Typography, Button, Drawer, List, ListItem, ListItemText, Box, Card, CardContent, CardMedia, Modal, Radio, RadioGroup, FormControlLabel } from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const drawerWidth = 240;

const PaymentModal = ({ open, handleClose, product, paymentOptions }) => {
  const [selectedPayment, setSelectedPayment] = useState('');
  const [paymentStatus, setPaymentStatus] = useState('');

  const handlePayment = async () => {
    try {
      const response = await axios.post('/api/payment/intialize/', {
        gateway: selectedPayment,
        amount: product.price,
        currency: 'USD'
      });

      if (response.data.success) {
        if (selectedPayment === 'PayPal') {
          window.location.href = response.data.approvalUrl;
        } else if (selectedPayment === 'Stripe') {
          // Handle Stripe payment flow
          setPaymentStatus('Payment Successful!');
        }
      }
    } catch (error) {
      setPaymentStatus('Payment Failed. Please try again.');
    }
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
    >
      <Box sx={{ bgcolor: 'background.paper', p: 4, borderRadius: 2, width: 400 }}>
        <Typography variant="h6" sx={{ mb: 2 }}>
          Select Payment Method for {product?.productName}
        </Typography>
        <RadioGroup
          value={selectedPayment}
          onChange={(e) => setSelectedPayment(e.target.value)}
        >
          {paymentOptions.map((option) => (
            <FormControlLabel
              key={option.id}
              value={option.name}
              control={<Radio />}
              label={`${option.name} (${option.currency})`}
            />
          ))}
        </RadioGroup>
        {paymentStatus && (
          <Typography color={paymentStatus.includes('Success') ? 'success.main' : 'error.main'} sx={{ my: 2 }}>
            {paymentStatus}
          </Typography>
        )}
        <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
          <Button onClick={handleClose}>Cancel</Button>
          <Button 
            variant="contained" 
            onClick={handlePayment}
            disabled={!selectedPayment}
          >
            Pay Now
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

const Dashboard = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [paymentOptions, setPaymentOptions] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    axios.get("/api/product")
      .then(response => setProducts(response.data))
      .catch(error => console.error("Error fetching products:", error));

    axios.get("/api/payment/options")
      .then(response => setPaymentOptions(response.data.payment_options))
      .catch(error => console.error("Error fetching payment options:", error));
  }, []);

  const handleProductClick = (product) => {
    setSelectedProduct(product);
    setModalOpen(true);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: "border-box" },
        }}
      >
        <Toolbar />
        <List>
          {['Home', 'Products'].map((text) => (
            <ListItem button key={text} onClick={() => navigate(`/${text.toLowerCase()}`)}>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
      </Drawer>

      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <AppBar position="fixed" sx={{ width: `calc(100% - ${drawerWidth}px)`, ml: `${drawerWidth}px` }}>
          <Toolbar>
            <Typography variant="h6" sx={{ flexGrow: 1 }}>
              User Dashboard
            </Typography>
            <Button color="inherit" onClick={() => {
              localStorage.removeItem("token");
              navigate("/");
            }}>
              Logout
            </Button>
          </Toolbar>
        </AppBar>

        <Toolbar />
        <Typography variant="h4" sx={{ mt: 4 }}>
          Product Listings
        </Typography>
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2, mt: 2 }}>
          {products.map((product) => (
            <Card 
              key={product._id} 
              sx={{ 
                maxWidth: 345,
                cursor: 'pointer',
                '&:hover': { transform: 'scale(1.02)', transition: 'transform 0.2s' }
              }}
              onClick={() => handleProductClick(product)}
            >
              <CardMedia
                component="img"
                height="140"
                image="sample.jpg"
                alt={product.productName}
              />
              <CardContent>
                <Typography gutterBottom variant="h6" component="div">
                  {product.productName}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Price: ${product.price}
                </Typography>
              </CardContent>
            </Card>
          ))}
        </Box>

        <PaymentModal 
          open={modalOpen}
          handleClose={() => setModalOpen(false)}
          product={selectedProduct}
          paymentOptions={paymentOptions}
        />
      </Box>
    </Box>
  );
};

export default Dashboard;
