package com.gane.MovieBookingApplication.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;
import java.util.List;

@Entity
@Data
public class Movie {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long movieId;
    private String name;

    @Column(columnDefinition = "TEXT")
    private String description;

    private String genre;
    private Integer duration;
    private LocalDate releaseDate;
    private String language;

    @Column(length = 1000)
    private String normalimgurl;

    @Column(length = 1000)
    private String headerimgurl;

    @OneToMany(mappedBy = "movie",fetch = FetchType.LAZY)
    @JsonIgnore
    private List<Show> shows;


}
