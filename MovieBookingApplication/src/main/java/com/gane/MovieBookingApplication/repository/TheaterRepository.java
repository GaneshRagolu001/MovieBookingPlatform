package com.gane.MovieBookingApplication.repository;

import com.gane.MovieBookingApplication.entity.Theater;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface TheaterRepository extends JpaRepository<Theater,Long> {

    Optional<List<Theater>> findByTheaterLocation(String location);

    @Query("SELECT DISTINCT s.theater FROM Show s WHERE s.movie.movieId = :movieId")
    List<Theater> findTheatersByMovieId(@Param("movieId") Long movieId);
}
