package com.github.bniksic1.security;

import org.springframework.security.config.annotation.SecurityConfigurerAdapter;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.DefaultSecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

public class JsonWebTokenConfigurer extends SecurityConfigurerAdapter<DefaultSecurityFilterChain, HttpSecurity> {
    private JsonWebTokenProvider tokenProvider;

    public JsonWebTokenConfigurer(JsonWebTokenProvider tokenProvider) {
        this.tokenProvider = tokenProvider;
    }

    @Override
    public void configure(HttpSecurity http) throws Exception{
        http.addFilterBefore(new JsonWebTokenFilter(tokenProvider), UsernamePasswordAuthenticationFilter.class);
    }
}
