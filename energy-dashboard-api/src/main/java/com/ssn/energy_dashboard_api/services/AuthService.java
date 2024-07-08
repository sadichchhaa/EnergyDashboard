package com.ssn.energy_dashboard_api.services;

import com.ssn.energy_dashboard_api.models.User;
import com.ssn.energy_dashboard_api.repository.UserRepository;
import com.ssn.energy_dashboard_api.security.PasswordEncoder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AuthService {
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public AuthService(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public User login(String username, String password) {
        username = username.trim();
        String hashedPassword = passwordEncoder.encode(password);
        User user = userRepository.findByUsernameAndPassword(username, hashedPassword);
        if (user != null) {
            return user;
        }
        return null;
    }

    public User signup(String username, String password, String email) {
        String hashedPassword = passwordEncoder.encode(password);
        User user = new User(username, email, hashedPassword);
        User userCreated = userRepository.save(user);
        return userCreated ;
    }

    public boolean checkIfUserExists(String username, String password, String email) {
        User user = userRepository.findByUsername(username);
        if (user != null) {
            return true;
        }
        return false;
    }
}
