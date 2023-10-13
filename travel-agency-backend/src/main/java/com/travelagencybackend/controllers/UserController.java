package com.travelagencybackend.controllers;

import com.travelagencybackend.entities.JwtResponse;
import com.travelagencybackend.model.User;
import com.travelagencybackend.repo.UserRepo;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.crypto.SecretKey;
import java.util.Date;

@RestController
@RequestMapping("/user")
@CrossOrigin(origins = "http://localhost:4200")
public class UserController {

    @Autowired
    private UserRepo repo;

    @PostMapping("/login")
    public ResponseEntity<?> loginUser(@RequestBody User userData) {

        User user = repo.findByEmail(userData.getEmail());
        SecretKey key = Keys.secretKeyFor(SignatureAlgorithm.HS512);

        if (user.getPassword().equals(userData.getPassword())) {
            String token = Jwts.builder()
                    .setSubject(user.getFirstName())
                    .setIssuedAt(new Date())
                    .setExpiration(new Date((new Date()).getTime() + 864000000))
                    .signWith(SignatureAlgorithm.HS512, key)
                    .compact();
            return ResponseEntity.ok(new JwtResponse(token, user));
        }
        return (ResponseEntity<?>) ResponseEntity.internalServerError();
    }

    @PostMapping("/register")
    public User registerUser(@RequestBody User user) {
        // Save the user data to the database using the repository
        return repo.save(user);
    }
}
