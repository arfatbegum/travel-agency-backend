import paypal from 'paypal-rest-sdk';
import prisma from '../../shared/prisma';

export const refundPayPalPayment = async (
  paymentId: string,
  packageId: string
) => {
  const tourPackage = await prisma.package.findUnique({
    where: {
      id: packageId,
    },
  });
  if (!tourPackage) {
    throw new Error('This Package is not available');
    }
    
  const paymentAmount = tourPackage.price.toFixed(2).toString();

  const refundRequest = {
    amount: {
      total: paymentAmount, 
      currency: 'USD', 
    },
  };

  paypal.sale.refund(paymentId, refundRequest, (error) => {
    if (error) {
      console.error('Error refunding PayPal payment:', error);
      throw new Error('Error refunding PayPal payment');
    } else {
      // Handle the successful refund
    }
  });
};
