package com.gane.MovieBookingApplication.service;

import com.gane.MovieBookingApplication.DTO.TheaterDTO;
import com.gane.MovieBookingApplication.entity.Theater;
import com.gane.MovieBookingApplication.repository.TheaterRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class TheaterService {

    @Autowired
    public TheaterRepository theaterRepository;

    public Theater addTheater(TheaterDTO theaterDTO){
        Theater theater = new Theater();
        theater.setTheaterName(theaterDTO.getTheaterName());
        theater.setTheaterLocation(theaterDTO.getTheaterLocation());
        theater.setTheaterCapacity(theaterDTO.getTheaterCapacity());
        theater.setTheaterScreenType(theaterDTO.getTheaterScreenType());

        return theaterRepository.save(theater);
    }

    public List<Theater> getTheaterByLocation(String location){

        Optional<List<Theater>> theaters = theaterRepository.findByTheaterLocation(location);
        if(theaters.isPresent()){
            return theaters.get();
        }else{
            throw new RuntimeException("No theater Present in this location : " + location);
        }
    }

    public Theater updateTheater(Long id,TheaterDTO theaterDTO){
        Theater theater = theaterRepository.findById(id).orElseThrow(() -> new RuntimeException("No theater present for id : " + id));
        theater.setTheaterName(theaterDTO.getTheaterName());
        theater.setTheaterLocation(theaterDTO.getTheaterLocation());
        theater.setTheaterCapacity(theaterDTO.getTheaterCapacity());
        theater.setTheaterScreenType(theaterDTO.getTheaterScreenType());

        return  theaterRepository.save(theater);
    }

    public void deleteTheater(Long id){
        theaterRepository.deleteById(id);
    }

    public List<Theater> getTheaterByMovie(Long movieId) {
        List<Theater> theaters = theaterRepository.findTheatersByMovieId(movieId);

        if (theaters.isEmpty()) {
            throw new RuntimeException("No theater present for this movie: " + movieId);
        }

        return theaters;
    }


    public List<Theater> getAllTheaters() {
        List<Theater> theaters = theaterRepository.findAll();
        if(theaters.isEmpty()){
            throw new RuntimeException("No theaters present");
        }

        return theaters;
    }
}
