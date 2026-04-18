import { Button, Card, Spinner } from "@heroui/react";
import { useState } from "react";
import { sileo } from "sileo";

import ReservationCard from "@components/ReservationCard";
import { useAuth } from "@context/useAuth";
import {
  useCancelReservationMutation,
  useReservationsByUserQuery,
} from "@hooks/useReservationHooks";

export default function Reservations() {
  const { user } = useAuth();
  const { data, isLoading, isError, error, refetch } =
    useReservationsByUserQuery(user?.id ?? "");
  const cancelReservationMutation = useCancelReservationMutation();
  const [cancellingReservationId, setCancellingReservationId] = useState<
    string | null
  >(null);

  const handleCancel = async (reservationId: string) => {
    setCancellingReservationId(reservationId);

    await sileo.promise(
      cancelReservationMutation
        .mutateAsync(reservationId)
        .then(() => refetch())
        .finally(() => {
          setCancellingReservationId(null);
        }),
      {
        loading: { title: "Cancelling reservation..." },
        success: { title: "Reservation cancelled" },
        error: {
          title: "Could not cancel reservation",
          description: "Please try again.",
        },
      },
    );
  };

  return (
    <main className="min-h-[calc(100vh-4.5rem)] px-4 py-10">
      <div className="mx-auto flex max-w-7xl flex-col gap-8">
        <section className="space-y-4">
          <p className="text-sm uppercase tracking-[0.25em] text-cyan-600">
            Reservations
          </p>
          <h1 className="text-2xl font-semibold tracking-tight">
            Manage your current reservations.
          </h1>
        </section>

        {isLoading ? (
          <div className="flex min-h-[40vh] items-center justify-center">
            <Spinner color="accent" size="lg" />
          </div>
        ) : isError ? (
          <Card className="text-center">
            <Card.Header>
              <p className="text-xs uppercase tracking-[0.25em] text-red-600">
                Error
              </p>
            </Card.Header>
            <Card.Content>
              <h2 className="font-semibold">Could not load reservations</h2>
              <p className="text-slate-600">
                {error instanceof Error
                  ? error.message
                  : "Try again in a moment."}
              </p>
            </Card.Content>
            <Card.Footer>
              <Button
                className="mx-auto"
                variant="secondary"
                onPress={() => refetch()}
              >
                Retry
              </Button>
            </Card.Footer>
          </Card>
        ) : data && data.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {data.map((reservation) => (
              <ReservationCard
                key={reservation.id}
                reservation={reservation}
                isCancelling={
                  cancelReservationMutation.isPending &&
                  cancellingReservationId === reservation.id
                }
                onCancel={handleCancel}
              />
            ))}
          </div>
        ) : (
          <Card>
            <Card.Content className="text-center">
              You do not have reservations yet.
            </Card.Content>
          </Card>
        )}
      </div>
    </main>
  );
}
