package com.gane.MovieBookingApplication.repository;

import com.gane.MovieBookingApplication.entity.Booking;
import com.gane.MovieBookingApplication.entity.BookingStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface BookingRepository extends JpaRepository<Booking,Long> {

    List<Booking> findByUser_UserId(Long user_id);

    List<Booking> findByShow_ShowId(Long show_id);

    List<Booking> findByBookingStatus(BookingStatus bookingStatus);
}
