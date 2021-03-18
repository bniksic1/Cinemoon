package com.github.bniksic1.repository;

import com.github.bniksic1.domain.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

@Repository
public interface UserRepository extends JpaRepository<User, Integer> {
    User findFirstByUsernameOrEmail(String username, String email);

    @Transactional
    @Modifying
    @Query("UPDATE User SET plan.id = :planId WHERE id = :userId")
    void updateUserPlanById(@Param("planId") Integer planId, @Param("userId") Integer userId);
}
