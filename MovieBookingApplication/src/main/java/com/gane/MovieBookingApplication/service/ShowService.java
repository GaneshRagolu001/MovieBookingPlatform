package com.gane.MovieBookingApplication.service;

import com.gane.MovieBookingApplication.DTO.ShowDTO;
import com.gane.MovieBookingApplication.entity.Booking;
import com.gane.MovieBookingApplication.entity.Movie;
import com.gane.MovieBookingApplication.entity.Show;
import com.gane.MovieBookingApplication.entity.Theater;
import com.gane.MovieBookingApplication.repository.MovieRepository;
import com.gane.MovieBookingApplication.repository.ShowRepository;
import com.gane.MovieBookingApplication.repository.TheaterRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ShowService {

    @Autowired
    public ShowRepository showRepository;

    @Autowired
    public MovieRepository movieRepository;

    @Autowired
    public TheaterRepository theaterRepository;

    public Show createShow(ShowDTO showDTO){
        Movie movie = movieRepository.findById(showDTO.getMovieId())
                .orElseThrow(() -> new RuntimeException("No Movie Found for id " + showDTO.getMovieId()));

        Theater theater = theaterRepository.findById(showDTO.getTheaterId())
                .orElseThrow(() -> new RuntimeException("No theater Found for id " + showDTO.getTheaterId()));
        Show show = new Show();
        show.setShowTime(showDTO.getShowTime());
        show.setPrice(showDTO.getPrice());
        show.setMovie(movie);
        show.setTheater(theater);

        return showRepository.save(show);
    }

    public List<Show> getAllshows(){

        return showRepository.findAll();
    }

    public List<Show> getShowsByMovie(Long movie_id){
        Optional<List<Show>> shows = showRepository.findByMovie_MovieId(movie_id);
        if(shows.isPresent()){
            return shows.get();
        }else{
            throw new RuntimeException("No shows found for movie_id : " + movie_id);
        }
    }

    public List<Show> getShowsByTheater(Long theater_id){
        Optional<List<Show>> shows = showRepository.findByTheater_TheaterId(theater_id);
        if(shows.isPresent()){
            return shows.get();
        }else{
            throw new RuntimeException("No shows found for theater_id : " + theater_id);
        }
    }

    public Show updateShow(Long id,ShowDTO showDTO){
        Show show = showRepository.findById(id).
                orElseThrow(()-> new RuntimeException("No show found for id : " + id));
        Movie movie = movieRepository.findById(showDTO.getMovieId())
                .orElseThrow(() -> new RuntimeException("No Movie Found for id " + showDTO.getMovieId()));

        Theater theater = theaterRepository.findById(showDTO.getTheaterId())
                .orElseThrow(() -> new RuntimeException("No Theater Found for id " + showDTO.getTheaterId()));
        show.setShowTime(showDTO.getShowTime());
        show.setPrice(showDTO.getPrice());
        show.setMovie(movie);
        show.setTheater(theater);



        return showRepository.save(show);
    }

    public void deleteShow(Long id){
        if(!showRepository.existsById(id)){
            throw new RuntimeException("No show Available for this id : " + id);
        }

        List<Booking> bookings = showRepository.findById(id).get().getBookings();
        if(!bookings.isEmpty()){
            throw new RuntimeException("Can't delete show with existing bookings");
        }
        showRepository.deleteById(id);
    }
}
