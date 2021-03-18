package com.github.bniksic1.security;

import io.jsonwebtoken.Claims;
import org.springframework.boot.configurationprocessor.json.JSONException;
import org.springframework.boot.configurationprocessor.json.JSONObject;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Date;

public class JsonWebTokenFilter extends OncePerRequestFilter {
    private JsonWebTokenProvider tokenProvider;

    public JsonWebTokenFilter(JsonWebTokenProvider tokenProvider) {
        this.tokenProvider = tokenProvider;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        String token = request.getHeader("Authorization");
        if(token != null){
            try{
                Claims claims = tokenProvider.getClaimsFromToken(token);
                if(!claims.getExpiration().before(new Date())){
                    Authentication authentication = tokenProvider.getAuthentication(claims.getSubject());
                    if(authentication.isAuthenticated())
                        SecurityContextHolder.getContext().setAuthentication(authentication);
                }
            } catch (RuntimeException e){
                try {
                    SecurityContextHolder.clearContext();
                    response.setContentType("application/json");
                    response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
                    response.getWriter().println(
                            new JSONObject().put("exception", "Expired or invalid JWT token. " + e.getMessage()));
                } catch (IOException | JSONException e1) {
                    e1.printStackTrace();
                }
                return;
            }
        } else
        filterChain.doFilter(request, response);
    }
}
