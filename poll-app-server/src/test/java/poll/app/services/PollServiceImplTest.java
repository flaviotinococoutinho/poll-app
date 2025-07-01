package poll.app.services;

import static org.junit.Assert.*;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

import java.lang.reflect.Method;
import java.util.HashSet;
import java.util.Set;

import org.junit.Test;

import poll.app.repositories.PollRepository;
import poll.app.repositories.VoteRepository;

public class PollServiceImplTest {

    @Test
    public void generateRandomString_producesUniqueCodes() throws Exception {
        Set<String> usedCodes = new HashSet<>();

        PollRepository pollRepository = mock(PollRepository.class);
        VoteRepository voteRepository = mock(VoteRepository.class);

        when(pollRepository.existsByCode(anyString())).thenAnswer(inv -> usedCodes.contains(inv.getArgument(0)));
        when(voteRepository.existsByCode(anyString())).thenAnswer(inv -> usedCodes.contains(inv.getArgument(0)));

        PollServiceImpl service = new PollServiceImpl(pollRepository, null, voteRepository);

        Method method = PollServiceImpl.class.getDeclaredMethod("generateRandomString", int.class);
        method.setAccessible(true);

        for (int i = 0; i < 100; i++) {
            String code = (String) method.invoke(service, 8);
            assertFalse("Duplicate code generated", usedCodes.contains(code));
            usedCodes.add(code);
        }
    }
}
