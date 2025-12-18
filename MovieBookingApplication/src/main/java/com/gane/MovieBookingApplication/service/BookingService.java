package com.gane.MovieBookingApplication.service;

import com.gane.MovieBookingApplication.DTO.BookingDTO;
import com.gane.MovieBookingApplication.entity.Booking;
import com.gane.MovieBookingApplication.entity.BookingStatus;
import com.gane.MovieBookingApplication.entity.Show;
import com.gane.MovieBookingApplication.entity.User;
import com.gane.MovieBookingApplication.repository.BookingRepository;
import com.gane.MovieBookingApplication.repository.ShowRepository;
import com.gane.MovieBookingApplication.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.expression.spel.ast.BooleanLiteral;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

@Service
public class BookingService {

    @Autowired
    public BookingRepository bookingRepository;

    @Autowired
    public UserRepository userRepository;
    @Autowired
    public ShowRepository showRepository;

    public Booking createBooking(BookingDTO bookingDTO){
        Show show = showRepository.findById(bookingDTO.getShowId())
                .orElseThrow(() -> new RuntimeException("No Shows Available"));

        if(!isSeatsAvailable(show.getShowId(),bookingDTO.getNumberOfSeats())){
            throw new RuntimeException("Not enough seats are available");
        }

        if(bookingDTO.getSeatNumbers().size() != bookingDTO.getNumberOfSeats()){
            throw new RuntimeException("Seat Numbers and Number of seats are not matched");
        }

        validateDuplicateSeats(bookingDTO.getShowId(), bookingDTO.getSeatNumbers());

        User user = userRepository.findById(bookingDTO.getUserId())
                .orElseThrow(()->new RuntimeException("User not Found"));

        Booking booking = new Booking();
        booking.setUser(user);
        booking.setShow(show);
        booking.setBookingTime(LocalDateTime.now());
        booking.setBookingStatus(BookingStatus.PENDING);
        booking.setNumberOfSeats(bookingDTO.getNumberOfSeats());
        booking.setPrice(calculateAmount(show.getPrice() ,bookingDTO.getNumberOfSeats()));
        booking.setSeatNumbers(bookingDTO.getSeatNumbers());

        return bookingRepository.save(booking);

    }

    public boolean isSeatsAvailable(Long showId, Integer numberOfSeats){
        Show show = showRepository.findById(showId)
                .orElseThrow(() -> new RuntimeException("No Shows Available"));

        int bookedSeats = show.getBookings().stream()
                .filter(booking -> booking.getBookingStatus() != BookingStatus.CANCELLED)
                .mapToInt(Booking::getNumberOfSeats).sum();

       return ((show.getTheater().getTheaterCapacity() - bookedSeats) >= numberOfSeats);
    }

    public void validateDuplicateSeats(Long showId, List<String> seatNumbers){
        Show show = showRepository.findById(showId)
                .orElseThrow(() -> new RuntimeException("No Shows Available"));

        Set<String> OccupiedSeats = show.getBookings().stream()
                .filter(booking -> booking.getBookingStatus() != BookingStatus.CANCELLED)
                .flatMap(booking -> booking.getSeatNumbers().stream())
                        .collect(Collectors.toSet());

        List<String> duplicateSeats = seatNumbers.stream()
                .filter(OccupiedSeats :: contains).collect(Collectors.toList());

        if(!duplicateSeats.isEmpty()){
            throw new RuntimeException("Seats are already booked");
        }
    }

    public Double calculateAmount(Double price,Integer numberOfSeats){
        return (price * numberOfSeats);
    }

    public List<Booking> getUserBookings(Long user_id){
       return bookingRepository.findByUser_UserId(user_id);
    }

    public List<Booking> getShowBookings(Long show_id){
        return bookingRepository.findByShow_ShowId(show_id);
    }

    public Booking confirmBooking(Long id){
        Booking booking = bookingRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Booking is not available"));

        if(booking.getBookingStatus() != BookingStatus.PENDING){
            throw new RuntimeException("booking status is not pending");
        }

        //payment process

        booking.setBookingStatus(BookingStatus.CONFIRMED);

        return bookingRepository.save(booking);
    }

    public Booking cancelBooking(Long id){
        Booking booking = bookingRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Booking is not available"));

        validateCancellation(booking);

        booking.setBookingStatus(BookingStatus.CANCELLED);

        return bookingRepository.save(booking);

    }

    private void validateCancellation(Booking booking) {
        LocalDateTime showTime = booking.getShow().getShowTime();
        LocalDateTime deadLineTime = showTime.minusHours(1);

        if(LocalDateTime.now().isAfter(deadLineTime)){
            throw new RuntimeException("Cannot Cancel the booking now");
        }

        if(booking.getBookingStatus() == BookingStatus.CANCELLED){
            throw new RuntimeException("Booking already Cancelled");
        }
    }

    public List<Booking> getBookingsByStatus(BookingStatus bookingStatus){
        List<Booking> bookings = bookingRepository.findByBookingStatus(bookingStatus);

        return bookings;
    }

}
