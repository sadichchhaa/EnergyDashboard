package com.ssn.energy_dashboard_api.controllers;

import com.ssn.energy_dashboard_api.dtos.LoginRequestDto;
import com.ssn.energy_dashboard_api.dtos.LoginResponseDto;
import com.ssn.energy_dashboard_api.dtos.SignUpRequestDto;
import com.ssn.energy_dashboard_api.models.User;
import com.ssn.energy_dashboard_api.repository.UserRepository;
import com.ssn.energy_dashboard_api.security.PasswordEncoder;
import com.ssn.energy_dashboard_api.services.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private AuthService authService;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @CrossOrigin(origins = "*")
    @PostMapping(path = "/login", produces = MediaType.APPLICATION_JSON_VALUE, consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> login(@RequestBody LoginRequestDto request) {
        String username = request.getUsername();
        String password = request.getPassword();

        User user = authService.login(username, password);

        if (user == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid username or password");
        }

        LoginResponseDto userDto = new LoginResponseDto();
        userDto.setUsername(user.getUsername());
        userDto.setUserId(user.getId());

        // Generate a session token (implement secure token generation)
//        String token = generateToken(user);

        return ResponseEntity.ok(Collections.singletonMap("user", userDto));
    }

    @CrossOrigin(origins = "*")
    @PostMapping(path = "/signup", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> signup(@RequestBody SignUpRequestDto request) {
        String username = request.getUsername();
        String password = request.getPassword();
        String email = request.getEmail();

        boolean userExists = authService.checkIfUserExists(username, password, email);

        if (userExists) {
            return ResponseEntity.badRequest().body("Username already exists");
        }

        User user = authService.signup(username, password, email);

        LoginResponseDto userDto = new LoginResponseDto();
        userDto.setUsername(user.getUsername());
        userDto.setUserId(user.getId());

        return ResponseEntity.status(HttpStatus.CREATED)
                .body(Collections.singletonMap("user", userDto));
    }

//    private String generateToken(User user) {
//        String secretKey = "secret_key";
//        long expirationTime = 1000 * 60 * 60 * 24; // 1 day
//
//        return Jwts.builder()
//                .setSubject(user.getUsername())
//                .setIssuedAt(new Date(System.currentTimeMillis()))
//                .setExpiration(new Date(System.currentTimeMillis() + expirationTime))
//                .signWith(SignatureAlgorithm.HS256, secretKey)
//                .compact();
//    }

}
