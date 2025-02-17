package poll.app.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import poll.app.services.VoteService;

import javax.servlet.http.HttpServletRequest;
import java.util.List;

@RestController
@RequestMapping ("/api/poll")
@CrossOrigin
public class VoteController
{
        private final VoteService voteService;

        @Autowired
        public VoteController ( VoteService voteService )
        {
                this.voteService = voteService;
        }

        @PostMapping ("/{id}")
        public void vote ( @PathVariable ("id") int id )
        {
                voteService.vote( ( long ) id );
        }

        @PutMapping
        public void voteAll( @RequestBody List<String> voteCodes, HttpServletRequest request ){
                voteService.voteAll(voteCodes, request.getRemoteAddr());
        }
}
