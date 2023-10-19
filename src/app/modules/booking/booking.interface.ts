export type IBookingFilterRequest = {
    searchTerm?: string | undefined;
}

export type ICreatePaymentJson = {
    intent: string;
    payer: {
        payment_method: string;
    };
    redirect_urls: {
        return_url: string;
        cancel_url: string;
    };
    transactions: {
        amount: {
            total: string;
            currency: string;
        };
        description: string;
    }[];
}

export type PayPalPayment ={
    id: string;
    payment:string | undefined
    
  }
