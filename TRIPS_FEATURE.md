# Feature: Poseidon Search and Bookings

## Overview
Implementation of the trips search and booking flow, including reservation confirmation and accompaniment tracking for different user profiles.

## Architecture

### Module Structure
- `pages/`: Main page components (MyTrips, SearchTrips, TripDetails, ReservationConfirmed, MyAccompaniments)
- `components/`: Reusable components (TripCard, AvailableTripCard, ButtonPrimary, ButtonSecondary, MapComponent)
- `types/`: TypeScript interfaces (Trip, AvailableTrip, TripDetails)
- `hooks/`: Custom hooks for responsive design

### Key Features

#### 1. MyTrips / MyAccompaniments
Routes users based on profile type:
- **Passenger**: Shows scheduled and historical trips
- **Accompanist**: Shows scheduled and historical accompaniments

Profile detection via `localStorage.getItem('userProfile')`

#### 2. SearchTrips
- Search form with destination and departure time
- Grid display of available trips (6 per search)
- Integration with TripDetails for booking

#### 3. TripDetails
- Complete trip information (driver, vehicle, summary, pricing)
- Interactive map component (placeholder for Google Maps API)
- Payment method selection (4 options)
- Reservation confirmation flow

#### 4. ReservationConfirmed
- Confirmation screen after booking
- Trip summary in 2-column layout
- Cancellation modal with confirmation
- Action buttons for tracking and chat

#### 5. MyAccompaniments
- Dedicated flow for accompanists
- Accompaniment cards with driver/passenger info
- Chat and details buttons
- Tab-based organization (Programados/Historial)

## Navigation Flow

### Passenger Flow
```
MyTrips → SearchTrips → TripDetails → ReservationConfirmed
```

### Accompanist Flow
```
MyTrips (redirects to) → MyAccompaniments
```

## Data Models

### Trip (for MyTrips display)
- Basic trip info: route, date, time, driver name, status

### AvailableTrip (for search results)
- Enhanced trip data: rating, vehicle type, available seats, pricing

### TripDetails (for booking and confirmation)
- Complete trip information including vehicle details, payment methods, total pricing

## Styling
- Tailwind CSS with custom rounded corners (rounded-2xl)
- Responsive grid layouts (grid-cols-1 md:grid-cols-2 lg:grid-cols-3)
- Custom button components with variants
- Card-based UI structure for consistency

## Future Improvements
- Integrate Google Maps API with actual location data
- Connect to real backend API instead of mock data
- Implement user authentication context
- Add payment processing integration
- Real-time trip tracking
- Chat functionality with drivers/passengers
