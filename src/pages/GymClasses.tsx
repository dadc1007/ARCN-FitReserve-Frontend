import { Button, Card, Spinner } from "@heroui/react";
import { useState } from "react";
import { sileo } from "sileo";

import GymClassCard from "@components/GymClassCard";
import { useAvailableGymClassesByUserQuery } from "@hooks/useGymClassMutations";
import { useCreateReservationMutation } from "@hooks/useReservationHooks";
import { useAuth } from "@context/useAuth";

export default function GymClasses() {
  const { user } = useAuth();
  const { data, isLoading, isError, error, refetch } =
    useAvailableGymClassesByUserQuery(user?.id ?? "");
  const createReservationMutation = useCreateReservationMutation();
  const [reservingClassId, setReservingClassId] = useState<string | null>(null);

  const handleReserve = async (classId: string) => {
    if (!user) {
      return;
    }

    setReservingClassId(classId);

    await sileo.promise(
      createReservationMutation
        .mutateAsync({
          userId: user.id,
          classId,
        })
        .then(() => refetch())
        .finally(() => {
          setReservingClassId(null);
        }),
      {
        loading: { title: "Creating reservation..." },
        success: { title: "Reservation created" },
        error: {
          title: "Could not create reservation",
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
            Gym classes
          </p>
          <h1 className="text-2xl font-semibold tracking-tight">
            Browse the schedule and pick your next workout.
          </h1>
          <p className="text-slate-600">
            Explore available classes and reserve the one that fits your
            schedule.
          </p>
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
              <h2 className="font-semibold">Could not load gym classes</h2>
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
            {data.map((gymClass) => (
              <GymClassCard
                key={gymClass.id}
                gymClass={gymClass}
                isReserving={
                  createReservationMutation.isPending &&
                  reservingClassId === gymClass.id
                }
                onReserve={handleReserve}
              />
            ))}
          </div>
        ) : (
          <Card>
            <Card.Content className="text-center">
              No gym classes are available yet.
            </Card.Content>
          </Card>
        )}
      </div>
    </main>
  );
}
