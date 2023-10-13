package com.travelagencybackend.controllers;

import com.stripe.exception.StripeException;
import com.stripe.model.PaymentIntent;
import com.travelagencybackend.dto.PaymentInfo;
import com.travelagencybackend.service.CheckoutService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
public class CheckoutController {

    @Autowired
    private CheckoutService checkoutService;

    @RequestMapping(value = "/payment-intent", method = RequestMethod.POST)
    @CrossOrigin("http://localhost:4200")
    public ResponseEntity<String> createPaymentIntent(@RequestBody PaymentInfo paymentInfo) throws StripeException {

        PaymentIntent paymentIntent = checkoutService.createPaymentIntent(paymentInfo);

        String paymentStr = paymentIntent.toJson();

        return new ResponseEntity<>(paymentStr, HttpStatus.OK);
    }
}
