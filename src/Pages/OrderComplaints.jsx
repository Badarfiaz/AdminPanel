'use client'

import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { motion, AnimatePresence } from "framer-motion";
import { ComplaintsFetch } from "../Redux/ComplaintsSlice";
import { AlertCircle, CheckCircle, Clock, Package, User, Mail, Phone, DollarSign, Hash } from 'lucide-react';
import {
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  Typography,
  Chip,
  Box,
  Container,
  Grid,
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";

// Create a custom theme
const theme = createTheme({
  palette: {
    primary: {
      main: "#4a90e2",
    },
    secondary: {
      main: "#f50057",
    },
  },
  typography: {
    fontFamily: '"Inter", "Helvetica", "Arial", sans-serif',
  },
});

function OrderComplaints() {
  const dispatch = useDispatch();
  const { Complaints, loading, error } = useSelector((state) => state.Complains);

  useEffect(() => {
    dispatch(ComplaintsFetch());
  }, [dispatch]);

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case "resolved":
        return "bg-green-100 text-green-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-red-100 text-red-800";
    }
  };

  const getStatusIcon = (status) => {
    switch (status.toLowerCase()) {
      case "resolved":
        return <CheckCircle className="text-green-500" />;
      case "pending":
        return <Clock className="text-yellow-500" />;
      default:
        return <AlertCircle className="text-red-500" />;
    }
  };

  if (loading)
    return (
      <div className="flex items-center justify-center h-screen bg-gradient-to-r from-blue-100 to-purple-100">
        <div className="animate-spin rounded-full h-32 w-32 border-t-4 border-b-4 border-blue-500"></div>
      </div>
    );
  if (error)
    return (
      <div className="flex items-center justify-center h-screen bg-gradient-to-r from-red-100 to-pink-100">
        <Typography variant="h5" className="text-red-500">
          Error: {error}
        </Typography>
      </div>
    );

  return (
    <ThemeProvider theme={theme}>
      <Box className="min-h-screen bg-gradient-to-br from-red-300 via-blue-50 to-red-200">
        <Container maxWidth="lg" className="py-12">
          <Typography
            variant="h2"
            className="text-center mb-12 font-Extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-600 to-purple-600"
          >
            Order Complaints
          </Typography>
          <Box className="overflow-y-auto max-h-[calc(100vh-12rem)]">
            <AnimatePresence>
              <Grid container spacing={4}>
                {Array.isArray(Complaints) && Complaints.length > 0 ? (
                  Complaints.map((complaint) => (
                    <Grid item xs={12} sm={6} md={4} key={complaint["Complaint ID"]}>
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3 }}
                      >
                        <Card className="hover:shadow-xl transition-shadow duration-300 rounded-lg overflow-hidden">
                          <CardHeader
                            title={
                              <Typography variant="h6" noWrap className="font-semibold">
                                {complaint["Product Title"]}
                              </Typography>
                            }
                            action={
                              <Chip
                                icon={getStatusIcon(complaint["Resolution Status"])}
                                label={complaint["Resolution Status"]}
                                className={`${getStatusColor(
                                  complaint["Resolution Status"]
                                )} font-medium`}
                              />
                            }
                            className="bg-gradient-to-r from-gray-50 to-gray-100"
                          />
                          <CardMedia
                            component="img"
                            height="180"
                            image={complaint["Product Image"]}
                            alt={complaint["Product Title"]}
                            className="h-48 object-cover"
                          />
                          <CardContent className="space-y-3">
                            <Typography variant="body2" color="text.secondary" className="flex items-center">
                              <Hash className="w-4 h-4 mr-2" />
                              {complaint["Complaint ID"]}
                            </Typography>
                            <Typography variant="body2" className="flex items-center">
                              <AlertCircle className="w-4 h-4 mr-2 text-red-500" />
                              {complaint["Complaint Description"]}
                            </Typography>
                            <Typography variant="body2" color="text.secondary" className="flex items-center">
                              <Clock className="w-4 h-4 mr-2 text-blue-500" />
                              {new Date(complaint["Complaint Date"]).toLocaleDateString()}
                            </Typography>
                            <Typography variant="body2" color="text.secondary" className="flex items-center">
                              <Package className="w-4 h-4 mr-2 text-purple-500" />
                              {complaint["Order ID"]}
                            </Typography>
                            <Typography variant="body2" className="flex items-center">
                              <User className="w-4 h-4 mr-2 text-green-500" />
                              {complaint["Customer Name"]}
                            </Typography>
                            <Typography variant="body2" color="text.secondary" className="flex items-center">
                              <Mail className="w-4 h-4 mr-2 text-blue-500" />
                              {complaint["Customer Email"]}
                            </Typography>
                            <Typography variant="body2" color="text.secondary" className="flex items-center">
                              <Phone className="w-4 h-4 mr-2 text-green-500" />
                              {complaint["Customer Phone Number"]}
                            </Typography>
                            <Typography variant="body2" className="flex items-center">
                              <Hash className="w-4 h-4 mr-2 text-purple-500" />
                              Quantity: {complaint["Order Quantity"]}
                            </Typography>
                            <Typography variant="body2" className="flex items-center font-semibold">
                              <DollarSign className="w-4 h-4 mr-2 text-green-500" />
                              Total: ${complaint["Order Total Amount"]}
                            </Typography>
                          </CardContent>
                        </Card>
                      </motion.div>
                    </Grid>
                  ))
                ) : (
                  <Grid item xs={12}>
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="text-center text-gray-600"
                    >
                      <Typography variant="h5">No complaints found.</Typography>
                    </motion.div>
                  </Grid>
                )}
              </Grid>
            </AnimatePresence>
          </Box>
        </Container>
      </Box>
    </ThemeProvider>
  );
}

export default OrderComplaints;

