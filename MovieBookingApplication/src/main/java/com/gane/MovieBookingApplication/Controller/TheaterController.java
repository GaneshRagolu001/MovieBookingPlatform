package com.gane.MovieBookingApplication.Controller;

import com.gane.MovieBookingApplication.DTO.TheaterDTO;
import com.gane.MovieBookingApplication.entity.Theater;
import com.gane.MovieBookingApplication.service.TheaterService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/theater")
public class TheaterController {

    @Autowired
    public TheaterService theaterService;

    @PostMapping("/addtheater")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Theater> addTheater(@RequestBody TheaterDTO theaterDTO){

        return ResponseEntity.ok(theaterService.addTheater(theaterDTO));
    }

    @GetMapping("/getalltheaters")
    public ResponseEntity<List<Theater>> getAllTheaters(){
        return ResponseEntity.ok(theaterService.getAllTheaters());
    }

    @GetMapping("/gettheaterbymovie/{movie_id}")
    public ResponseEntity<List  <Theater>> getTheaterBymovie(@PathVariable Long movie_id){
        return ResponseEntity.ok(theaterService.getTheaterByMovie(movie_id));
    }

    @GetMapping("/gettheaterbylocation")
    public ResponseEntity<List<Theater>> getTheaterByLocation(@RequestParam String location){
        return ResponseEntity.ok(theaterService.getTheaterByLocation(location));
    }

    @PutMapping("/updatetheater/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Theater> updateTheater(@PathVariable Long id,@RequestBody TheaterDTO theaterDTO){

        return ResponseEntity.ok(theaterService.updateTheater(id,theaterDTO));
    }

    @DeleteMapping("/deletetheater/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Void> deleteTheater(@PathVariable Long id){
        theaterService.deleteTheater(id);
        return ResponseEntity.ok().build();
    }



}
