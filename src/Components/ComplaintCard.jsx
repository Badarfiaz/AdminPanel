import React from 'react';
import { motion } from 'framer-motion';
import { AlertCircle, Calendar, DollarSign, Mail, Phone, ShoppingCart } from 'lucide-react';
import {
  Card,
  CardHeader,
  CardMedia,
  CardContent,
  CardActions,
  Typography,
  Avatar,
  Button,
  Chip,
} from '@mui/material';

export const ComplaintCard = ({ complaint }) => {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
    >
      <Card sx={{ maxWidth: 345, position: 'relative', overflow: 'hidden' }}>
        <CardMedia
          component="img"
          height="140"
          image={complaint['Product Image']}
          alt={complaint['Product Title']}
        />
        <Chip
          label={complaint['Resolution Status']}
          color={complaint['Resolution Status'] === 'Resolved' ? 'success' : 'error'}
          sx={{
            position: 'absolute',
            top: 8,
            right: 8,
          }}
        />
        <CardHeader
          avatar={
            <Avatar
              alt={complaint['Customer Name']}
              src={`https://api.dicebear.com/6.x/initials/svg?seed=${complaint['Customer Name']}`}
            />
          }
          title={complaint['Customer Name']}
          subheader={`Order ID: ${complaint['Order ID']}`}
        />
        <CardContent>
          <Typography gutterBottom variant="h6" component="div">
            {complaint['Product Title']}
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
            <AlertCircle fontSize="small" color="warning" sx={{ verticalAlign: 'middle', mr: 1 }} />
            {complaint['Complaint Description']}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            <Calendar fontSize="small" sx={{ verticalAlign: 'middle', mr: 1 }} />
            {new Date(complaint['Complaint Date']).toLocaleDateString()}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            <DollarSign fontSize="small" sx={{ verticalAlign: 'middle', mr: 1 }} />
            Total: ${complaint['Order Total Amount']} ({complaint['Order Quantity']} items)
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small" variant="contained" color="primary">
            View Details
          </Button>
          <Button size="small" variant="outlined" color="secondary">
            Contact Customer
          </Button>
        </CardActions>
      </Card>
    </motion.div>
  );
};
