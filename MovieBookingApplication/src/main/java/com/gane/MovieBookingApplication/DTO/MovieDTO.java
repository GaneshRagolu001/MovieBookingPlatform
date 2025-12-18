package com.gane.MovieBookingApplication.DTO;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Builder;
import lombok.Data;

import java.time.LocalDate;

@Data
@Builder
public class MovieDTO {
    private String name;
    private String description;
    private String genre;
    private Integer duration;
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
    private LocalDate releaseDate;
    private String language;
    private String normalimgurl;
    private String headerimgurl;
}
