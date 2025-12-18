package com.gane.MovieBookingApplication.service;

import com.gane.MovieBookingApplication.DTO.MovieDTO;
import com.gane.MovieBookingApplication.entity.Movie;
import com.gane.MovieBookingApplication.repository.MovieRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class MovieService {

    @Autowired
    private MovieRepository movieRepository;

//    private static final String UPLOAD_DIR = "uploads/";

    public Movie addMovie(MovieDTO movieDTO){
        Movie movie = new Movie();

        movie.setName(movieDTO.getName());
        movie.setGenre(movieDTO.getGenre());
        movie.setDescription(movieDTO.getDescription());
        movie.setLanguage(movieDTO.getLanguage());
        movie.setDuration(movieDTO.getDuration());
        movie.setReleaseDate(movieDTO.getReleaseDate());
        movie.setNormalimgurl(movieDTO.getNormalimgurl());
        movie.setHeaderimgurl(movieDTO.getHeaderimgurl());

       return movieRepository.save(movie);
    }

    public String uploadImage(Long movieId, String url,String type) {
        Movie movie = movieRepository.findById(movieId)
                .orElseThrow(() -> new RuntimeException("Movie not found with id : " + movieId));

        // create a unique file name

//        String fileName = UUID.randomUUID() + "_" + file.getOriginalFilename();
//        Path path = Paths.get(UPLOAD_DIR + fileName);
//        try {
//            Files.createDirectories(path.getParent());
//            Files.write(path,file.getBytes());
//        } catch (IOException e) {
//            throw new RuntimeException(e);
//        }
        String imgurl = url;

        if("normal".equalsIgnoreCase(type)){
            movie.setNormalimgurl(imgurl);
        }else if("header".equalsIgnoreCase(type)) {
            movie.setHeaderimgurl(imgurl);
        }else throw new RuntimeException("Please upload correct format like normal or header");
        movieRepository.save(movie);
        return "movie uploaded successfully";
    }

    public List<Movie> getAllMovies(){
        return movieRepository.findAll();
    }

    public List<Movie> getMoviesByGenre(String genre){


        Optional<List<Movie>> movies = movieRepository.findByGenreContaining(genre);

        if(movies.get().size() > 0) return movies.get();
        else{
            throw new RuntimeException("No movies Found by genre : " + genre);
        }
    }

    public List<Movie> getMoviesByLanguage(String language){

        Optional<List<Movie>> movies = movieRepository.findByLanguage(language);
        if(movies.isPresent()){
            return movies.get();
        }else{
            throw new RuntimeException("No movies Found by language : " + language);
        }
    }

    public Movie getMoviesByTitle(String title){
        Optional<Movie> movie = movieRepository.findByName(title);
        if(movie.isPresent()){
            return movie.get();
        }else {
            throw new RuntimeException("No movies Found by title : " + title);
        }
    }

    public Movie updateMovie(Long id,MovieDTO movieDTO){
        Movie movie = movieRepository.findById(id).orElseThrow(() -> new RuntimeException("No movie found by id : " + id));

        movie.setName(movieDTO.getName());
        movie.setGenre(movieDTO.getGenre());
        movie.setDescription(movieDTO.getDescription());
        movie.setLanguage(movieDTO.getLanguage());
        movie.setDuration(movieDTO.getDuration());
        movie.setReleaseDate(movie.getReleaseDate());

        return movieRepository.save(movie);
    }

    public void deleteMovie(Long id){

        movieRepository.deleteById(id);
    }


    public Movie getMovieById(Long movieId) {
        Movie movie = movieRepository.findById(movieId)
                .orElseThrow(() ->
                        new RuntimeException("Movie not found with id: " + movieId));

        return movie;
    }


}
