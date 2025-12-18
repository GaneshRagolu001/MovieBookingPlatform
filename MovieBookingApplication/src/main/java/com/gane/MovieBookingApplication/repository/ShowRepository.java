package com.gane.MovieBookingApplication.repository;

import com.gane.MovieBookingApplication.entity.Show;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ShowRepository extends JpaRepository<Show,Long> {

    Optional<List<Show>> findByMovie_MovieId(Long movie_id);

    Optional<List<Show>> findByTheater_TheaterId(Long movie_id);
}
