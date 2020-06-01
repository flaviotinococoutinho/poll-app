package poll.app.mappers;

import org.mapstruct.Mapper;

import poll.app.dto.PollDTO;
import poll.app.models.Poll;

@Mapper(componentModel = "spring")
public interface PollMapper
{
        Poll pollDTOtoPoll ( PollDTO pollDTO );

        PollDTO pollToDTO ( Poll poll );
}
