# Overlapping Periods
<!-- Two reservations have overlapping periods if any part of their start and end dates intersect.

For example, consider the following reservations:

Reservation 1: Start Date = July 1, End Date = July 5
Reservation 2: Start Date = July 4, End Date = July 8
In this case, the periods overlap because both reservations include the date July 4 and July 5.

Non-Overlapping Periods
Two reservations do not overlap if there is no intersection in their date ranges.

For example:

Reservation 1: Start Date = July 1, End Date = July 5
Reservation 2: Start Date = July 6, End Date = July 10
Here, the periods do not overlap because the second reservation starts after the first one ends -->

*****************

Règles Métier à Respecter :
● Confidentialité des Réservations : Chaque utilisateur doit uniquement accéder à ses
propres réservations, sans possibilité de voir celles des autres.
● Disponibilité des Voitures : Une vérification doit être effectuée pour s'assurer qu'une
voiture n'est pas réservée par plusieurs utilisateurs aux mêmes dates.
● Validité des Dates de Réservation : Les dates de début et de fin de réservation
doivent être cohérentes (la date de fin ne doit pas précéder la date de début).

=================>
based on the implementation details discussed, the three business rules have been addressed as follows:
Confidentialité des Réservations (Confidentiality of Reservations):

Users can only access their own reservations. This is typically enforced through authentication and authorization checks in your endpoints. You should ensure that the userId used in reservation-related operations matches the authenticated user's ID.
Disponibilité des Voitures (Availability of Cars):

A check is in place to ensure a car is not booked by multiple users for overlapping periods. This is handled by the isCarAvailable function in the createReservation method.
Validité des Dates de Réservation (Validity of Reservation Dates):

The reservation dates are validated to ensure the end date is not before the start date, which is implemented in the createReservation method.