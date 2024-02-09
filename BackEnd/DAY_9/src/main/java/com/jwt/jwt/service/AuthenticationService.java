package com.jwt.jwt.service;

import java.util.Optional;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.jwt.jwt.dto.request.AuthenticationRequest;
import com.jwt.jwt.dto.request.RegisterRequest;
import com.jwt.jwt.dto.response.AuthenticationResponse;
import com.jwt.jwt.entity.Role;
import com.jwt.jwt.entity.User;
import com.jwt.jwt.repository.UserRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AuthenticationService {

        private final UserRepository userRepository;
        private final PasswordEncoder passwordEncoder;
        private final JwtService jwtService;
        private final AuthenticationManager authenticationManager;

        public AuthenticationResponse register(RegisterRequest request) {
                var user = User
                                .builder()
                                .name(request.getName())
                                .gmail(request.getGmail())
                                .mobno(request.getMobno())
                                .password(passwordEncoder.encode(request.getPassword()))
                                .role(Role.USER)
                                .build();
                userRepository.save(user);
                var jwtToken = jwtService.generateToken(user);
                return AuthenticationResponse.builder()
                                .token(jwtToken)
                                .build();
        }

        public AuthenticationResponse authenticate(AuthenticationRequest request) {
                authenticationManager.authenticate(
                                new UsernamePasswordAuthenticationToken(request.getGmail(), request.getPassword()));
                var user = userRepository.findByGmail(request.getGmail()).orElseThrow();
                var jwtToken = jwtService.generateToken(user);
                return AuthenticationResponse.builder()
                                .token(jwtToken)
                                .build();
        }

        public Optional<User> getDetailsId(String gmail) {
                return userRepository.findById(gmail);
        }

}
