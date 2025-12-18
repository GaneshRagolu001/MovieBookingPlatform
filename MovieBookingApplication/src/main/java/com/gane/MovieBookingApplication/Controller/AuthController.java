package com.gane.MovieBookingApplication.Controller;

import com.gane.MovieBookingApplication.DTO.LoginRequestDTO;
import com.gane.MovieBookingApplication.DTO.LoginResponseDTO;
import com.gane.MovieBookingApplication.DTO.RegisterRequestDTO;
import com.gane.MovieBookingApplication.DTO.UserDTO;
import com.gane.MovieBookingApplication.entity.User;
import com.gane.MovieBookingApplication.repository.UserRepository;
import com.gane.MovieBookingApplication.service.AuthenticationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    public AuthenticationService authenticationService;

    @PostMapping("/registernormaluser")
    public ResponseEntity<User> registerNormalUser(@RequestBody RegisterRequestDTO registerRequestDTO){
        System.out.println("Controller hitted");
        return ResponseEntity.ok(authenticationService.registerNormalUser(registerRequestDTO));
    }

    @PostMapping("/login")
    public ResponseEntity<LoginResponseDTO> login(@RequestBody LoginRequestDTO loginRequestDTO){
        System.out.println("Request hitted!");
        return ResponseEntity.ok(authenticationService.login(loginRequestDTO));
    }

    @GetMapping("/getcurrentuser")
    public ResponseEntity<?> getCurrentUser(Authentication authentication){
        if(authentication == null){
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("User is not authenticated");
        }

        String username = authentication.getName();

        return ResponseEntity.ok(authenticationService.getCurrentUser(username));
    }

}
