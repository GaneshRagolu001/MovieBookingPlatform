package com.gane.MovieBookingApplication.Controller;

import com.gane.MovieBookingApplication.DTO.BookingDTO;
import com.gane.MovieBookingApplication.entity.Booking;
import com.gane.MovieBookingApplication.entity.BookingStatus;
import com.gane.MovieBookingApplication.service.BookingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/bookings")
public class BookingController {

    @Autowired
    public BookingService bookingService;

    @PostMapping("/createbooking")
    public ResponseEntity<Booking> createBooking(@RequestBody BookingDTO bookingDTO){
        return ResponseEntity.ok(bookingService.createBooking(bookingDTO));
    }

    @GetMapping("/getuserbookings/{id}")
    public ResponseEntity<List<Booking>> getUserBookings(@PathVariable("id") Long user_id){
        return ResponseEntity.ok(bookingService.getUserBookings(user_id));
    }

    @GetMapping("/getshowbookings/{id}")
    public ResponseEntity<List<Booking>> getShowBookings(@PathVariable("id") Long show_id){
        return ResponseEntity.ok(bookingService.getShowBookings(show_id));
    }

    @PutMapping("/confirmBooking/{id}")
    public ResponseEntity<Booking> confirmBooking(@PathVariable("id") Long id){
        return ResponseEntity.ok(bookingService.confirmBooking(id));
    }

    @PutMapping("/cancelBooking/{id}")
    public ResponseEntity<Booking> cancelBooking(@PathVariable("id") Long id){
        return ResponseEntity.ok(bookingService.cancelBooking(id));
    }

    @GetMapping("/getbookingbystatus/{bookingstatus}")
    public ResponseEntity<List<Booking>> getBookingsByStatus(@PathVariable("bookingstatus") BookingStatus bookingStatus){
        return ResponseEntity.ok(bookingService.getBookingsByStatus(bookingStatus));
    }


}
