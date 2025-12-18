package com.gane.MovieBookingApplication.JWT;

import com.gane.MovieBookingApplication.repository.UserRepository;

import com.gane.MovieBookingApplication.service.CustomUserDetailsService;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationContext;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.Collection;
import java.util.List;
import java.util.stream.Collectors;

@Component
public class JWTFilterChain extends OncePerRequestFilter {

    @Autowired
    public JwtService jwtService;

    @Autowired
    public UserRepository userRepository;

    @Autowired
    public ApplicationContext applicationContext;
    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        String authHeader = request
                .getHeader("Authorization");
        String token = null;
        String username = null;

        if(authHeader != null && authHeader.startsWith("Bearer")){
            token = authHeader.substring(7);
            username = jwtService.extractUsername(token);
        }

        if(username != null && SecurityContextHolder.getContext().getAuthentication() == null){
            var userDetails = userRepository.findByUsername(username)
                    .orElseThrow(() -> new RuntimeException("User not found"));

            System.out.println(" Extracted username from token: " + username);
            System.out.println(" Found user in database: " + userDetails.getUsername());
            System.out.println(" User roles: " + userDetails.getAuthorities());

            if(jwtService.validatToken(token,userDetails)){
            	
            	Collection<? extends GrantedAuthority> authorityList =
                        userDetails.getAuthorities();
                System.out.println(" Assigned authorities: " + authorityList);
                UsernamePasswordAuthenticationToken authToken = new
                        UsernamePasswordAuthenticationToken(userDetails,null,authorityList);

                authToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));

                SecurityContextHolder.getContext().setAuthentication(authToken);
            }



        }


        filterChain.doFilter(request,response);
    }


}
