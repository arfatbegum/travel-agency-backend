import paypal from 'paypal-rest-sdk';
import prisma from '../../shared/prisma';

export const refundPayPalPayment = async (
  paymentId: string,
  serviceId: string
) => {
  const service = await prisma.service.findUnique({
    where: {
      id: serviceId,
    },
  });
  if (!service) {
    throw new Error('This service is not available');
    }
    
  const paymentAmount = service.price.toFixed(2).toString();

  const refundRequest = {
    amount: {
      total: paymentAmount, 
      currency: 'USD', 
    },
  };

  // Create the refund
  paypal.sale.refund(paymentId, refundRequest, error => {
    if (error) {
      throw new Error('Error refunding PayPal payment');
    } else {
      // Handle the successful refund
    }
  });
};
