package com.gane.MovieBookingApplication.repository;

import com.gane.MovieBookingApplication.entity.Movie;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface MovieRepository extends JpaRepository<Movie,Long> {

    @Query("SELECT m FROM Movie m WHERE m.genre LIKE %:genre%")
    Optional<List<Movie>> findByGenreContaining(@Param("genre") String genre);

    @Query("SELECT m FROM Movie m WHERE m.language LIKE %:language%")
    Optional<List<Movie>> findByLanguage(@Param("language") String language);

    @Query("SELECT m FROM Movie m WHERE m.name LIKE %:name%")
    Optional<Movie> findByName(@Param("name") String name);

}
