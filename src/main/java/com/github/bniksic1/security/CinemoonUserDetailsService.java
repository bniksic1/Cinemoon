package com.github.bniksic1.security;

import com.github.bniksic1.domain.User;
import com.github.bniksic1.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class CinemoonUserDetailsService implements UserDetailsService {
    @Autowired
    private UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String s) throws UsernameNotFoundException {
        Optional<User> user = Optional.ofNullable(userRepository.findFirstByUsernameOrEmail(s, s));

        user.orElseThrow(() -> new UsernameNotFoundException("Username or email not found."));

        return new CinemoonUserDetails(user.get());
    }
}
