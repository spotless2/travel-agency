package com.travelagencybackend.service;

import com.stripe.exception.StripeException;
import com.stripe.model.PaymentIntent;
import com.travelagencybackend.dto.PaymentInfo;
import org.springframework.stereotype.Service;

@Service
public interface CheckoutService {

    PaymentIntent createPaymentIntent(PaymentInfo paymentInfo) throws StripeException;
}
