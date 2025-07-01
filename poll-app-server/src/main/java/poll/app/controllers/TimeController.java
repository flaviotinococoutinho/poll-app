package poll.app.controllers;

import java.time.LocalDateTime;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/time")
@CrossOrigin
public class TimeController {
        @GetMapping
        // Returns the current server date and time
        public LocalDateTime getCurrentTime() {
                return LocalDateTime.now();
        }
}
