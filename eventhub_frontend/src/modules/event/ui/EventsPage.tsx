import { Box, Typography, Grid, Card, CardContent, Chip, CircularProgress, Pagination as MuiPagination } from '@mui/material';
import { useEvents } from '../hooks/use-events';
import type { Event, Category } from '../model/event.model';

const EventsPage = () => {
  const { events, pagination, status, error, page, setPage } = useEvents();

  if (status === 'loading') return <Box display="flex" justifyContent="center" py={10}><CircularProgress /></Box>;
  if (status === 'error') return <Typography color="error">{error}</Typography>;

  return (
    <Box>
      <Typography variant="h4" mb={3}>Événements</Typography>
      {events.length === 0 ? (
        <Typography color="text.secondary">Aucun événement disponible.</Typography>
      ) : (
        <Grid container spacing={3}>
          {events.map((event: Event) => (
            <Grid item xs={12} sm={6} md={4} key={event.id}>
              <Card variant="outlined">
                <CardContent>
                  <Typography variant="h6">{event.title}</Typography>
                  <Typography variant="body2" color="text.secondary" mb={1}>{event.description}</Typography>
                  <Typography variant="body2">📍 {event.address}, {event.postalcode}</Typography>
                  <Typography variant="body2">🗓 {new Date(event.startDate).toLocaleDateString('fr-FR')}</Typography>
                  <Typography variant="body2">🎟 {event.ticket} places — {event.price === 0 ? 'Gratuit' : `${event.price}€`}</Typography>
                  <Box mt={1} display="flex" gap={0.5} flexWrap="wrap">
                    {event.category.map((cat: Category) => <Chip key={cat.name} label={cat.name} size="small" />)}
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
      {pagination && pagination.totalPages > 1 && (
        <Box display="flex" justifyContent="center" mt={4}>
          <MuiPagination
            count={pagination.totalPages}
            page={page}
            onChange={(_, value) => setPage(value)}
            color="primary"
          />
        </Box>
      )}
    </Box>
  );
};

export default EventsPage;